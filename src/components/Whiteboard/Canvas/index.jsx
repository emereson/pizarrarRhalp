import React, { Component, Fragment } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import './styles.scss';

/** Cursor icons */
import pencilIcon from 'assets/whiteboard/pencil-icon.svg';
import eraserIcon from 'assets/whiteboard/eraser-icon.svg';
import { TOOLS } from '../../../enums/whiteBoard.enum';
import { Stage, FastLayer, Image, Layer } from 'react-konva';
import { connect } from 'react-redux';
import * as Actions from '../../../store/actions/WhiteBoardActions';
import {
  whiteBoardShapesSelector,
  whiteBoardImagesSelector
} from '../../../store/reducers/whiteBoardReducer';
import { bindActionCreators } from 'redux';
import HandTool from './HandTool';

/** TOOLS */
import PencilTool from './PencilTool';
import EraserTool from './EraserTool';
import CircleTool from './CircleTool';
import SquareTool from './SquareTool';
import SegmentTool from './SegmentTool';
import ArrowTool from './ArrowTool';
import TextTool from './TextTool';
import CurvedArrowTool from './CurvedArrowTool';
import ZoomTool from './ZoomTool';

/** TOOLS */

/** Rendered elements */
import RenderedShapes from './RenderedShapes';
import { socketContext } from '../../../providers/SocketProvider';
import SaveImageButtons from '../Gallery/SaveImageButtons';
import debounce from 'lodash.debounce';

import WhiteBoardInfo from './WhiteBoardInfo';

import classNames from 'classnames';
import URLImage from './URLImage';
import ModalSaveImage from '../Gallery/ModalSaveImage/ModalSaveImage';

class Canvas extends Component {
  zoomCartelTimeout = null;
  static contextType = socketContext;

  constructor(props) {
    super(props);

    this.state = {
      stageWidth: 1000,
      stageHeight: 1000,
      containerWidth: 0,
      containerHeight: 0,
      loading: false,
      modalOpen: false,
      savedFile: false,
      imageLoaded: true,
      scale: 1,
      stageX: undefined,
      stageY: undefined,
      offsetX: 0,
      offsetY: 0,
      showZoomCartel: false
    };

    this.stage = React.createRef();
    this.stageContainer = React.createRef();
  }

  componentDidMount() {
    this.registerEvents();
    window.addEventListener('resize', this.updateDimensions);
    this.imageRef = React.createRef();
    this.canvasRef = React.createRef();
    this.pencilTool = React.createRef();
    this.eraserTool = React.createRef();
    this.textTool = React.createRef();
    this.circleTool = React.createRef();
    this.squareTool = React.createRef();
    this.segmentTool = React.createRef();
    this.arrowTool = React.createRef();
    this.curvedArrowTool = React.createRef();
    this.zoomTool = React.createRef();
    this.handTool = React.createRef();
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isCrystalTheme !== this.props.isCrystalTheme) {
      this.updateDimensions();
    }

    if (this.props.isCrystalTheme !== prevProps.isCrystalTheme && this.imageRef.current) {
      this.onLoadImage();
    }
  }

  onResize = debounce(() => {
    this.updateDimensions();
  }, 50);

  updateDimensions = () => {
    const containerWidth = this.stageContainer.current?.offsetWidth;
    const containerHeight = this.stageContainer.current?.offsetHeight;
    if (
      containerWidth !== this.state.containerWidth ||
      containerHeight !== this.state.containerHeight
    ) {
      this.setState({ containerWidth, containerHeight });
    }
  };

  async registerEvents() {
    const { whiteBoardSocket } = this.context;
    whiteBoardSocket.on(Actions.CLEAR_ALL, () => {
      this.props.clearAll();
    });
    whiteBoardSocket.on(Actions.DRAW_EVENT, payload => {
      this.dispathRemoteEvent(payload.eventType, payload);
    });
    whiteBoardSocket.on(Actions.REMOVE_SHAPE, payload => {
      this.dispathRemoteEvent(Actions.REMOVE_SHAPE, payload);
    });
    whiteBoardSocket.on(Actions.ADD_SHAPE, payload => {
      this.dispathRemoteEvent(Actions.ADD_SHAPE, payload);
    });
    whiteBoardSocket.on(Actions.SET_PAGE, payload => {
      this.dispathRemoteEvent(Actions.SET_PAGE, payload);
      this.props.fetchPageData(payload);
    });
  }

  dispathRemoteEvent(type, payload) {
    this.props.dispatch({ type, payload: { ...payload, isRemote: true } });
  }

  onLoadImage() {
    this.setState({ imageLoaded: true });
  }

  getCursor() {
    switch (this.props.whiteBoardContext.selectedTool) {
      case TOOLS.PENCIL: {
        return `cursor: url(${pencilIcon}) 0 28, auto`;
      }
      case TOOLS.ERASER: {
        return `cursor: url(${eraserIcon}) 0 28, auto`;
      }
      case TOOLS.TEXT: {
        return `cursor: text`;
      }
      case TOOLS.ZOOMIN: {
        return `cursor: zoom-in`;
      }
      case TOOLS.ZOOMOUT: {
        return `cursor: zoom-out`;
      }
      default: {
        return `cursor: auto`;
      }
    }
  }
  getSelectedTool = () => {
    switch (this.props.whiteBoardContext.selectedTool) {
      case TOOLS.PENCIL:
        return this.pencilTool.current;
      case TOOLS.ERASER:
        return this.eraserTool.current;
      case TOOLS.CIRCLE:
        return this.circleTool.current;
      case TOOLS.SQUARE:
        return this.squareTool.current;
      case TOOLS.SEGMENT:
        return this.segmentTool.current;
      case TOOLS.ARROW:
        return this.arrowTool.current;
      case TOOLS.CURVED_ARROW:
        return this.curvedArrowTool.current;
      case TOOLS.ZOOMIN:
        return this.zoomTool.current;
      case TOOLS.ZOOMOUT:
        return this.zoomTool.current;
      case TOOLS.HAND:
        return this.handTool.current;
      default:
        return null;
    }
  };

  onCanvasEvent = (event, eventCallback) => {
    const selectedTool = this.getSelectedTool();
    if (selectedTool) {
      eventCallback(selectedTool, event);
    }
  };

  onMouseDown = (selectedTool, event) => {
    selectedTool.onMouseDown && selectedTool.onMouseDown(event);
  };

  onMouseMove = (selectedTool, event) => {
    if (event.evt.type === 'touchmove' || event.evt.buttons === 1) {
      event.evt.stopPropagation();
      selectedTool.onMouseMove(event);
      this.props.whiteBoardContext.setIsDrawing(true);
      this.resetIsDrawing();
    }
  };

  onMouseUp = (selectedTool, event) => {
    selectedTool.onMouseUp && selectedTool.onMouseUp(event);
  };

  onMouseLeave = (selectedTool, event) => {
    this.onMouseMove(selectedTool, event);
    selectedTool.onMouseLeave && selectedTool.onMouseLeave(event);
  };

  resetIsDrawing = debounce(() => {
    this.props.whiteBoardContext.setIsDrawing(false);
  }, 500);

  resetModeModal = () => {
    this.setState({ modalOpen: false });
  };

  setSavedFile = () => {
    this.setState({ savedFile: true });
    setTimeout(() => {
      this.setState({ savedFile: false });
    }, 3000);
  };

  setStateCall = state => this.setState({ ...state });

  handleZoomChange = (scale, x, y) => {
    this.setState({ scale, stageX: x, stageY: y });
  };

  handleStageMove = (offsetX, offsetY) => {
    const inverseScale = 1 / this.state.scale;
    const newOffsetX = this.state.offsetX - offsetX * inverseScale;
    const newOffsetY = this.state.offsetY - offsetY * inverseScale;
    this.setState({ offsetX: newOffsetX, offsetY: newOffsetY });
  };

  handleWheel = e => {
    e.evt.preventDefault();
    const scaleBy = e.evt.deltaY > 0 ? 1.02 : 0.98;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = oldScale / scaleBy;

    this.setState(
      {
        scale: newScale,
        stageX: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
        stageY: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        showZoomCartel: true
      },
      () => {
        clearTimeout(this.zoomCartelTimeout);
        this.zoomCartelTimeout = setTimeout(() => {
          this.setState({ showZoomCartel: false });
        }, 1000);
      }
    );
  };

  handleShowZoomCartel = () => {
    this.setState({ showZoomCartel: true });
  };

  handleHideZoomCartel = () => {
    this.setState({ showZoomCartel: false });
  };

  handleStageMove = (offsetX, offsetY) => {
    let newOffsetX = this.state.offsetX - offsetX;
    let newOffsetY = this.state.offsetY - offsetY;
    if (Math.abs(newOffsetX) > this.state.stageWidth) newOffsetX = this.state.offsetX;
    if (Math.abs(newOffsetY) > this.state.stageHeight) newOffsetY = this.state.offsetY;
    this.setState({ offsetX: newOffsetX, offsetY: newOffsetY });
  };

  handleWheel = e => {
    e.evt.preventDefault();

    const scaleBy = e.evt.deltaY > 0 ? 1.02 : 0.98;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = oldScale / scaleBy;

    this.setState(
      {
        scale: newScale,
        stageX: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
        stageY: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        showZoomCartel: true
      },
      () => {
        clearTimeout(this.zoomCartelTimeout);
        this.zoomCartelTimeout = setTimeout(() => {
          this.setState({ showZoomCartel: false });
        }, 1000);
      }
    );
  };

  handleShowZoomCartel = () => {
    this.setState({ showZoomCartel: true });
  };

  handleHideZoomCartel = () => {
    this.setState({ showZoomCartel: false });
  };

  render() {
    const { scale, showZoomCartel } = this.state;

    const stageStyles = css`src="/static/icons/save2.svg"
      background: transparent;
      position: fixed;
      ${this.getCursor()};
    `;

    return (
      <Fragment>
        {/* Tool components */}
        <PencilTool ref={this.pencilTool} />
        <EraserTool ref={this.eraserTool} />
        <ZoomTool
          containerWidth={this.state.containerWidth}
          containerHeight={this.state.containerHeight}
          onZoomChange={this.handleZoomChange}
          currentTool={this.props.whiteBoardContext.selectedTool}
          ref={this.zoomTool}
          scale={scale}
          onShowZoomCartel={this.handleShowZoomCartel}
          onHideZoomCartel={this.handleHideZoomCartel}
        />
        <HandTool ref={this.handTool} onStageMove={this.handleStageMove} />
        <TextTool
          ref={this.textTool}
          stageRef={this.stage}
          containerWidth={this.state.containerWidth}
        />
        <CircleTool ref={this.circleTool} />
        <SquareTool ref={this.squareTool} />
        <SegmentTool ref={this.segmentTool} />
        <ArrowTool ref={this.arrowTool} />
        <CurvedArrowTool ref={this.curvedArrowTool} />
        {/* Tool components */}

        <div
          className={classNames('d-flex', 'noselect', {
            'current-page-indicator-modern': this.props.isCrystalTheme,
            'current-page-indicator-clasic': !this.props.isCrystalTheme
          })}
          style={{ flexDirection: window.innerWidth < 750 ? 'column' : 'row' }}
        >
          <WhiteBoardInfo page={this.props.page} />

          <SaveImageButtons
            state={{ ...this.state }}
            setState={this.setStateCall}
            canvasImage={this.props.canvasImage}
            deleteImage={this.props.deleteCanvasImage}
            setOpenGallery={this.props.setOpenGallery}
            showMessage={this.state.savedFile}
          />
        </div>

        <div id="capture" ref={this.stageContainer} className="noselect">
          {showZoomCartel && <div className="zoomScale">{Math.round(scale * 100)}%</div>}

          {/* Canvas Render components */}
          <Stage
            ref={this.stage}
            css={stageStyles}
            width={this.state.containerWidth}
            height={this.state.containerHeight}
            scaleX={scale}
            scaleY={scale}
            offsetX={this.state.offsetX}
            offsetY={this.state.offsetY}
            x={this.state.stageX}
            y={this.state.stageY}
            onWheel={this.handleWheel}
            onMouseDown={e => {
              this.onCanvasEvent(e, this.onMouseDown);
            }}
            onTouchStart={e => {
              this.onCanvasEvent(e, this.onMouseDown);
            }}
            onMouseMove={e => {
              this.onCanvasEvent(e, this.onMouseMove);
            }}
            onTouchMove={e => {
              this.onCanvasEvent(e, this.onMouseMove);
            }}
            onMouseUp={e => {
              this.onCanvasEvent(e, this.onMouseUp);
            }}
            onTouchEnd={e => {
              this.onCanvasEvent(e, this.onMouseUp);
            }}
            onMouseLeave={e => {
              this.onCanvasEvent(e, this.onMouseLeave);
            }}
          >
            <Layer>
              {this.props.canvasImage && (
                <URLImage
                  src={this.props.canvasImage.image.url}
                  x={40}
                  y={45}
                  ref={this.imageRef}
                  alt="whiteboard-img"
                  onLoad={() => this.onLoadImage()}
                />
              )}
            </Layer>
            <Layer>
              <RenderedShapes shapes={this.props.shapes} />
            </Layer>
          </Stage>
        </div>

        <ModalSaveImage
          show={this.state.modalOpen}
          onHide={this.resetModeModal}
          canvasImage={this.props.canvasImage}
          savedFile={this.setSavedFile}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  page: state.whiteBoard.page,
  shapes: whiteBoardShapesSelector(state),
  canvasImage: whiteBoardImagesSelector(state)
});

const mapDispatchToProps = dispatch => {
  const { fetchPageData, clearAll, deleteCanvasImage, setOpenGallery } = Actions;

  return {
    dispatch,
    ...bindActionCreators(
      { fetchPageData, clearAll, deleteCanvasImage, setOpenGallery },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
