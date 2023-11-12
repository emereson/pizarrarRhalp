import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Rnd } from 'react-rnd';
import { useParams } from 'react-router-dom';
import useSlides from '../hooks/useSlides';
import { S3Service } from 'services/S3.service';
import { useEffect } from 'react';
import { getImageBase64FromUrl } from '../functions/utils';
import { useRef } from 'react';
import debounce from 'lodash.debounce';

const s3Service = new S3Service('public', 'image/png');

function ResizableImage({
  imageUrl,
  object,
  styles,
  changeDraftImage,
  deleteImage,
  preventMoving,
  AnchorPoint,
  returnOnlyImg,
  parentId,
  setAnchorPoint
}) {
  const lastPositions = useRef({
    x: document.getElementById(parentId)?.getBoundingClientRect().width,
    y: document.getElementById(parentId)?.getBoundingClientRect().height
  });

  const updateLastPositions = debounce(element => {
    lastPositions.current = element;
  }, 400);

  const calculatingFixedResults = element => {
    // calculation body

    let results = {
      x: 0,
      y: 0
    };
    const percentofchange = {
      x: Math.abs((element.x / lastPositions.current.x) * 100 - 100),
      y: Math.abs((element.y / lastPositions.current.y) * 100 - 100)
    };

    if (percentofchange.x > 0 || percentofchange.y > 0) {
      results = {
        x: (percentofchange.y / 100) * element.x,
        y: (percentofchange.x / 100) * element.y
      };
    }

    // end of the flow
    updateLastPositions(element);
    return results;
  };

  const convertMeasuresInPX = useCallback(
    (m, preventFixedCalc) => {
      const element = {
        x: document.getElementById(parentId)?.getBoundingClientRect().width,
        y: document.getElementById(parentId)?.getBoundingClientRect().height
      };

      let xMeasure = m?.x; // real part
      let yMeasure = m?.y; //imaginary

      if (typeof xMeasure === 'string') xMeasure = Number(xMeasure);
      if (typeof yMeasure === 'string') yMeasure = Number(yMeasure);

      let results = {
        x: (xMeasure / 100) * element.x,
        y: (yMeasure / 100) * element.y
      };

      if (!preventFixedCalc && object.fixed) {
        const calcs = calculatingFixedResults(element);
        if (calcs) {
          results = {
            x: results.x - calcs.x,
            y: results.y - calcs.y
          };
        }
      }

      return results;
    },
    [object]
  );

  const [Dimentions, setDimentions] = useState({
    // this state, only must receive measures in percentages!
    x: object.x || 10,
    y: object.y || 10,
    //
    width: object.width || 30,
    height: object.height || 'fit-content'
  });
  const [positionsP, setPositionsP] = useState({
    x:
      typeof Dimentions.x === 'string'
        ? parseFloat(Dimentions.x).toFixed(20)
        : Dimentions.x,
    y:
      typeof Dimentions.y === 'string'
        ? parseFloat(Dimentions.y).toFixed(20)
        : Dimentions.y
  });
  const dimentionsP = {
    x:
      typeof Dimentions.width === 'string'
        ? parseFloat(Dimentions.width).toFixed(20)
        : Dimentions.width,
    y:
      typeof Dimentions.height === 'string'
        ? parseFloat(Dimentions.height).toFixed(20)
        : Dimentions.height
  };
  const { slideId } = useParams();
  const { deleteSlideImage } = useSlides(slideId);
  const [Hover, setHover] = useState(false);
  const [ImageOnEditing, setImageOnEditing] = useState(null);
  const [Base64, setBase64] = useState(null);

  const objectUpdate = useCallback(
    newDimentions => {
      if (newDimentions || Dimentions) {
        changeDraftImage(null, object, newDimentions || Dimentions);
      }
    },
    [Dimentions, object, changeDraftImage]
  );

  const handleContextMenu = e => {
    e.preventDefault();
    setAnchorPoint({ anchor: null });
    if (window.innerWidth > 750)
      setAnchorPoint({ anchor: e.target, type: 'image', item: object });
  };

  const handleDrag = (e, d) => {
    let rect = d.node.parentElement.getBoundingClientRect();
    const parentElement = document.getElementById(parentId).getBoundingClientRect();
    let limitX = parentElement.width;
    let limitY = parentElement.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // % conversions
    const measuresInPercentages = {
      x: (d.x / limitX) * 100,
      y: (d.y / limitY) * 100
    };
    if (x < -50 || y < -50 || x > limitX || y > limitY) {
      setDimentions({ ...Dimentions, x: 20, y: 10 });
      objectUpdate({ ...Dimentions, x: 20, y: 10 });
    } else {
      const newstate = {
        x: measuresInPercentages.x,
        y: measuresInPercentages.y
      };
      setDimentions({
        ...Dimentions,
        ...newstate
      });
      objectUpdate({
        ...Dimentions,
        ...newstate
      });
      setPositionsP(newstate);
    }
  };

  const handleResizing = (e, direction, ref, delta, position) => {
    const parentElement = document.getElementById(parentId).getBoundingClientRect();
    let limitX = parentElement.width;
    let limitY = parentElement.height;
    const positionInPercentage = {
      x: (position.x / limitX) * 100,
      y: (position.y / limitY) * 100
    };
    const measuresInPercentages = {
      width: (ref.offsetWidth / limitX) * 100,
      height: (ref.offsetHeight / limitY) * 100,
      ...positionInPercentage
    };
    setDimentions(measuresInPercentages);
    objectUpdate(measuresInPercentages);
  };

  useEffect(() => {
    if (!imageUrl.includes('base64')) {
      s3Service.getPresignedUrl(imageUrl).then(realUrl => {
        getImageBase64FromUrl(realUrl).then(base64 => {
          setBase64(base64);
        });
      });
    } else {
      setBase64(imageUrl);
    }
  }, [returnOnlyImg, preventMoving, object]);

  const refreshStates = () => {
    setHover(true);
    setHover(false);
  };

  const refreshPositionP = useCallback(() => {
    let x = object.x;
    let y = object.y;
    if (x === 'NaN') x = 10;
    if (y === 'NaN') y = 10;
    if (typeof x === 'string') Number(parseFloat(x).toFixed(20));
    if (typeof y === 'string') Number(parseFloat(y).toFixed(20));
    const newstate = { x, y };
    setPositionsP(newstate);
  }, [object.x, object.y]);

  useEffect(() => {
    if (
      !preventMoving &&
      !returnOnlyImg &&
      ((isNaN(convertMeasuresInPX(positionsP).x) &&
        isNaN(convertMeasuresInPX(positionsP).y)) ||
        (object.x === 'NaN' && object.y === 'NaN'))
    ) {
      refreshPositionP();
    }
  }, []);

  useEffect(() => {
    let doit;
    const func = () => {
      clearTimeout(doit);
      doit = setTimeout(refreshStates, 100);
    };

    window.addEventListener('resize', func);

    return () => {
      window.removeEventListener('resize', func);
    };
  }, []);

  useEffect(() => {
    if (object.draftUrl) {
      s3Service.getPresignedUrl(object.draftUrl).then(realUrl => {
        setImageOnEditing(realUrl);
      });
    }
  }, [object, imageUrl]);

  if (returnOnlyImg) {
    const positionsP = {
      x: object.x
        ? typeof object.x === 'string'
          ? parseFloat(object.x)
          : object.x
        : typeof Dimentions.x === 'string'
        ? parseFloat(Dimentions.x)
        : Dimentions.x,
      y: object.y
        ? typeof object.y === 'string'
          ? parseFloat(object.y)
          : object.y
        : typeof Dimentions.y === 'string'
        ? parseFloat(Dimentions.y)
        : Dimentions.y
    };
    const dimentionsP = {
      x: object.width
        ? typeof object.width === 'string'
          ? parseFloat(object.width)
          : object.width
        : typeof Dimentions.width === 'string'
        ? parseFloat(Dimentions.width)
        : Dimentions.width,
      y: object.height
        ? typeof object.height === 'string'
          ? parseFloat(object.height)
          : object.height
        : typeof Dimentions.height === 'string'
        ? parseFloat(Dimentions.height)
        : Dimentions.height
    };

    return (
      <img
        src={Base64}
        className={[styles.resizableImages, styles.noBorderRadius].join(' ')}
        alt="resizableimage"
        style={{
          width: convertMeasuresInPX(dimentionsP, true).x,
          position: 'absolute',
          top: convertMeasuresInPX(positionsP).y,
          left: convertMeasuresInPX(positionsP).x
        }}
      />
    );
  }

  if (preventMoving) {
    return (
      <div
        style={{
          width: Boolean(object.width)
            ? convertMeasuresInPX(dimentionsP, true).x + 'px'
            : '320px',
          height: Boolean(object.height)
            ? convertMeasuresInPX(dimentionsP, true).y + 'px'
            : 'fit-content',
          position: 'absolute',
          top: Boolean(object.y) ? convertMeasuresInPX(positionsP).y + 'px' : '0px',
          left: Boolean(object.x) ? convertMeasuresInPX(positionsP).x + 'px' : '0px'
        }}
        className={styles.preventMovingContainer}
      >
        <img src={Base64} className={styles.resizableImages} alt="resizableimage" />
      </div>
    );
  }

  if (
    !preventMoving &&
    !returnOnlyImg &&
    !isNaN(convertMeasuresInPX(positionsP).x) &&
    !isNaN(convertMeasuresInPX(positionsP).y)
  ) {
    return (
      <>
        <Rnd
          size={{
            width: convertMeasuresInPX(dimentionsP, true).x,
            height: isNaN(convertMeasuresInPX(dimentionsP, true).y)
              ? 'fit-content'
              : convertMeasuresInPX(dimentionsP).y
          }}
          position={{
            x: convertMeasuresInPX(positionsP).x,
            y: convertMeasuresInPX(positionsP).y
          }}
          onDragStop={handleDrag}
          onResize={handleResizing}
          style={{ transform: `rotate(${object?.rotationZ}deg)` }}
          className={styles.resizableImages__dottedBorder}
        >
          <div
            style={{ width: '100%', height: '100%' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onContextMenu={handleContextMenu}
          >
            {Hover && (
              <>
                <div className={styles.verticalDots} style={{ left: -11, top: -5 }}>
                  <div className={styles.grabDot}></div>
                  <div className={styles.grabDot}></div>
                  <div className={styles.grabDot}></div>
                </div>
                <div className={styles.verticalDots} style={{ right: -11, top: -5 }}>
                  <div className={styles.grabDot}></div>
                  <div className={styles.grabDot}></div>
                  <div className={styles.grabDot}></div>
                </div>
                <div className={styles.horizontalDots} style={{ left: 0, top: -11 }}>
                  <div className={styles.grabDot}></div>
                </div>
                <div className={styles.horizontalDots} style={{ left: 0, bottom: -11 }}>
                  <div className={styles.grabDot}></div>
                </div>
              </>
            )}
            <img
              src={Base64}
              draggable={false}
              className={styles.resizableImages}
              alt="resizableimage"
            />
          </div>
        </Rnd>
      </>
    );
  }

  return <></>;
}

export default React.memo(ResizableImage);
