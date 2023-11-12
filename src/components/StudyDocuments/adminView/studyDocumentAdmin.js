// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { S3Service } from '../../../services/S3.service';
import { SLIDE_ELEMENT_TYPES } from 'enums/constants.enum';
import {
  CREATE_SLIDE,
  CREATE_STUDY_DOCUMENT_ELEMENT,
  UPDATE_ORDER_SLIDE,
  UPDATE_STUDY_DOCUMENT_ELEMENT,
  DELETE_SLIDE,
  DELETE_STUDY_DOCUMENT_ELEMENT
} from '../graphQl/mutations';

import { GET_LEVEL } from '../graphQl/queries';

import {
  studyDocumentContainer,
  itemLists,
  miniatura,
  miniaturaItemIz,
  miniaturaItemD,
  preview,
  btnList,
  btn,
  textareaStyle
} from './studyDocumentAdminStyles';

import { ReactComponent as PlusIcon } from 'assets/studyDocuments/plus.svg';
import { ReactComponent as BackgroundIcon } from 'assets/studyDocuments/background.svg';
import { ReactComponent as TrashIcon } from 'assets/studyDocuments/trash-icon.svg';
import { ReactComponent as BackIcon } from 'assets/studyDocuments/back.svg';
import { ReactComponent as OkIcon } from 'assets/studyDocuments/correcto.svg';
import { ReactComponent as LetterIcon } from 'assets/studyDocuments/letterWhite.svg';
import { ReactComponent as UndoIcon } from 'assets/studyDocuments/undo-white.svg';

import preIcon from 'assets/studyDocuments/pre.png';
import ShowLoading from '../common/showLoading';

//CONFIGURACIÓN DEL SERVICIO S3 AWS
const s3Service = new S3Service('public', 'image/png');

const ItemLists = ({ itemLists, orderSlides, selected, selectedElemet }) => {
  const itemsOrd = orderSlides.map(id => {
    return itemLists.find(x => x.id === id);
  });

  const selectedStyle = selected !== null ? selected.id : null;

  return itemsOrd.map((item, index) => {
    return (
      <div css={miniatura} key={index} onClick={() => selectedElemet(item.id)}>
        <p css={miniaturaItemIz}>{index + 1}</p>
        {item ? (
          <ShowElementMin
            elements={item}
            selected={selectedStyle === item.id ? true : false}
          />
        ) : (
          <ShowLoading
            styles={{ position: 'absolute', top: '50%', left: '50%', color: 'white' }}
          />
        )}
      </div>
    );
  });
};

const ShowElementMin = ({ elements, selected }) => {
  if (elements === undefined) {
    return <div></div>;
  }

  const element = elements && elements.studyDocumentElements.items;

  if (element.length > 0) {
    if (element[0].type === SLIDE_ELEMENT_TYPES.IMAGE) {
      return (
        <div css={miniaturaItemD(selected)}>
          <img
            src={JSON.parse(element[0].value).url}
            alt={JSON.parse(element[0].value).url}
          />
        </div>
      );
    }

    if (element[0].type === SLIDE_ELEMENT_TYPES.TEXT) {
      let content = JSON.parse(element[0].value);
      return (
        <div css={miniaturaItemD(selected)}>
          <p style={{ fontSize: '80%', textAlign: 'center', paddingTop: '10px' }}>
            {content.text && content.text.length > 50
              ? content.text.substr(0, 49)
              : content.text}
          </p>
        </div>
      );
    }
  }

  return <div css={miniaturaItemD(selected)}></div>;
};

const ShowElement = ({
  elements,
  cancel,
  updateElementToDocument,
  deleteDocumentElement
}) => {
  const element = elements.studyDocumentElements.items;

  if (element.length > 0) {
    if (element[0].type === SLIDE_ELEMENT_TYPES.IMAGE) {
      return (
        <>
          <img src={JSON.parse(element[0].value).url} alt={''} />
          <div>
            <button
              type="button"
              onClick={() => deleteDocumentElement(element[0].id)}
              css={btn}
            >
              <TrashIcon />{' '}
            </button>
          </div>
        </>
      );
    }

    if (element[0].type === SLIDE_ELEMENT_TYPES.TEXT) {
      let content = JSON.parse(element[0].value);
      return (
        <>
          <TextArea
            id={element[0].id}
            valueElement={content.text}
            type={element[0].type}
            cancel={cancel}
            updateElementToDocument={updateElementToDocument}
            deleteDocumentElement={deleteDocumentElement}
          />
        </>
      );
    }
  }

  return <div></div>;
};

const TextArea = ({
  id,
  valueElement,
  type,
  cancel,
  updateElementToDocument,
  deleteDocumentElement
}) => {
  const inputTextArea = useRef(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(valueElement);
  }, [valueElement]);

  const changeTextArea = event => setValue(event.target.value);

  return (
    <>
      <textarea
        ref={inputTextArea}
        onChange={event => changeTextArea(event)}
        value={value}
        css={textareaStyle}
      >
        Write something here
      </textarea>
      <button
        type="button"
        onClick={() => deleteDocumentElement(id)}
        css={btn}
        title="delete text element"
      >
        <TrashIcon />{' '}
      </button>
      <button type="button" onClick={() => cancel()} css={btn}>
        <BackIcon />
      </button>
      <button
        type="button"
        onClick={() => updateElementToDocument(id, value, type)}
        css={btn}
      >
        <OkIcon />
      </button>
    </>
  );
};

const StudyDocumentAdmin = ({
  data,
  orderSlides,
  level,
  selectedIndex,
  isEdit,
  setIsEdit,
  setSelectedIndex
}) => {
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);
  const [page, setPage] = useState(null);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [valueElement, setValueElement] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const inputFile = useRef(null);
  const inputTextArea2 = useRef(null);

  const [createStudyDocumentSlide, { error: errorCreateDocument }] =
    useMutation(CREATE_SLIDE);
  const [deleteStudyDocumentSlide] = useMutation(DELETE_SLIDE);
  const [deleteStudyDocumentElement, { error: erroDeleteSliderDocElement }] = useMutation(
    DELETE_STUDY_DOCUMENT_ELEMENT
  );
  const [createStudyDocumentElement, { loading: createDocumentElementLoading }] =
    useMutation(CREATE_STUDY_DOCUMENT_ELEMENT);
  const [updateStudyDocumentElement] = useMutation(UPDATE_STUDY_DOCUMENT_ELEMENT);
  const [updateLevel] = useMutation(UPDATE_ORDER_SLIDE);

  //TODO:: REVISAR
  useEffect(() => {
    if (data) {
      if (selectedIndex) {
        //setSelected(data[selectedIndex]);
        setPage(selectedIndex + 1);
      }
    }
  }, []);

  const createDocumentSlide = async () => {
    let input = {};

    const sliderId = await createStudyDocumentSlide({
      variables: { levelId: level }
    });

    if (errorCreateDocument) {
      return;
    }

    if (sliderId) {
      if (selected === null) {
        const newElement = [...orderSlides];

        newElement.push(sliderId.data.createStudyDocumentSlide.id);

        input = {
          id: level,
          orderArray: JSON.stringify(newElement)
        };
      } else {
        const indexSelected = orderSlides.findIndex(item => item === selected.id);

        const arrB = [...orderSlides];

        arrB.splice(indexSelected + 1, 0, sliderId.data.createStudyDocumentSlide.id);

        input = {
          id: level,
          orderArray: JSON.stringify(arrB)
        };
      }

      updateLevel({
        variables: input,
        refetchQueries: [
          {
            query: GET_LEVEL,
            variables: { id: level }
          }
        ]
      });
    }
  };

  const removeElemet = async () => {
    if (!selected) {
      return;
    }

    await deleteStudyDocumentSlide({
      variables: { id: selected.id },
      refetchQueries: [
        {
          query: GET_LEVEL,
          variables: { id: level }
        }
      ]
    });

    let deleteElementInLists = orderSlides.filter(item => item !== selected.id);

    updateLevel({
      variables: {
        id: level,
        orderArray: JSON.stringify(deleteElementInLists)
      },
      refetchQueries: [
        {
          query: GET_LEVEL,
          variables: { id: level }
        }
      ]
    });

    setSelected(null);
    setType(null);
  };

  const selectedElemet = id => {
    const index = data.findIndex(el => el.id === id);
    const iPage = orderSlides.findIndex(item => item === id);

    setPage(iPage + 1);
    setSelectedIndex(index);
    setSelected(data[index]);
  };

  const selectedBackground = () => {
    if (selected && imageUrl === null) {
      selectType(SLIDE_ELEMENT_TYPES.IMAGE);
      inputFile.current.click();
    }
  };

  const uploadFile = async file => {
    try {
      setIsLoadingImg(true);
      if (file) {
        const fileUrl = await s3Service.uploadImage({
          name: 'slides/' + file.name,
          blob: file
        });
        setIsLoadingImg(false);
        setImageUrl(fileUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectType = type => {
    if (selected) {
      return setType(type);
    }
  };

  const createElementToDocument = () => {
    let value =
      type === SLIDE_ELEMENT_TYPES.IMAGE
        ? JSON.stringify({
            url: imageUrl
          })
        : JSON.stringify({
            text: valueElement
          });

    let input = {
      pageId: selected.id,
      type: type,
      value: value
    };

    createStudyDocumentElement({
      variables: input,
      refetchQueries: [
        {
          query: GET_LEVEL,
          variables: { id: level }
        }
      ]
    });

    if (!createDocumentElementLoading) {
      cancel();
    }
  };

  const updateElementToDocument = (id, valueElement, type) => {
    let value =
      type === SLIDE_ELEMENT_TYPES.IMAGE
        ? JSON.stringify({
            url: valueElement
          })
        : JSON.stringify({
            text: valueElement
          });

    let input = {
      id: id,
      type: type,
      value: value
    };

    updateStudyDocumentElement({
      variables: input,
      refetchQueries: [
        {
          query: GET_LEVEL,
          variables: { id: level }
        }
      ]
    });

    if (!createDocumentElementLoading) {
      setType('');
    }
  };

  const deleteDocumentElement = async id => {
    if (!selected) {
      return;
    }

    const element = selected.studyDocumentElements.items;
    const image = JSON.parse(element[0].value);

    deleteStudyDocumentElement({
      variables: { id: id },
      refetchQueries: [
        {
          query: GET_LEVEL,
          variables: { id: level }
        }
      ]
    });

    if (erroDeleteSliderDocElement === undefined) {
      //ONLY IMAGE IN AWS S3
      if (element[0].type === SLIDE_ELEMENT_TYPES.IMAGE) {
        const responseS3 = await s3Service.deleteFile(image.url);
        console.log(responseS3);
      }
    }

    setSelected(null);
    setType(null);
  };

  const cancel = () => {
    setSelected(null);
    setType('');
    setPage(null);
    setImageUrl(null);
    setValueElement('');
  };

  return (
    <div css={studyDocumentContainer}>
      {/*BOTONES DE ACTION*/}
      <div css={btnList}>
        <Link to="/learning-content">
          <button type="button" css={btn}>
            <UndoIcon />
          </button>
        </Link>
        <button type="button" onClick={() => createDocumentSlide()} css={btn}>
          <PlusIcon />
        </button>
        <button type="button" onClick={() => removeElemet()} css={btn}>
          <TrashIcon />
        </button>
        <button
          type="button"
          onClick={() => selectType(SLIDE_ELEMENT_TYPES.TEXT)}
          css={btn}
        >
          <LetterIcon />
        </button>
        <button type="button" onClick={() => selectedBackground()} css={btn}>
          <BackgroundIcon />
        </button>
        <button type="button" onClick={() => selectedBackground()} css={btn}>
          test
        </button>
        <button type="button" onClick={() => setIsEdit(!isEdit)} css={btn}>
          <img src={preIcon} alt="edit" style={{ width: '17px', height: '17px' }} />
        </button>
      </div>

      {/*LISTADO DE SLIDER EN VISTA MINIATURA*/}
      <div css={itemLists(data.length)}>
        {data && (
          <ItemLists
            itemLists={data}
            orderSlides={orderSlides}
            selected={selected}
            selectedElemet={selectedElemet}
          />
        )}
      </div>

      {/*MUESTRA EL DOCUMENTO SELECCIONADO */}
      <div css={preview(selected)}>
        {isLoadingImg && (
          <ShowLoading
            styles={{
              textAlign: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '25px',
              height: '30px',
              color: 'white'
            }}
          />
        )}

        {selected && imageUrl !== null && (
          <>
            <img src={imageUrl} alt={''} />
            <div>
              <button type="button" onClick={() => cancel()} css={btn}>
                <BackIcon />{' '}
              </button>
              <button type="button" onClick={() => createElementToDocument()} css={btn}>
                <OkIcon />
              </button>
            </div>
          </>
        )}

        {selected && type === SLIDE_ELEMENT_TYPES.TEXT && (
          <>
            <textarea
              ref={inputTextArea2}
              value={valueElement}
              onChange={event => setValueElement(event.target.value)}
              css={textareaStyle}
            >
              Write something here
            </textarea>
            <button type="button" onClick={() => cancel()} css={btn}>
              <TrashIcon />{' '}
            </button>
            <button
              type="button"
              onClick={() => createElementToDocument(SLIDE_ELEMENT_TYPES.TEXT)}
              css={btn}
            >
              <OkIcon />
            </button>
          </>
        )}

        {selected && (
          <>
            <span> {'Page ' + page}</span>
            <ShowElement
              elements={selected}
              cancel={cancel}
              updateElementToDocument={updateElementToDocument}
              deleteDocumentElement={deleteDocumentElement}
            />
          </>
        )}

        <input
          type="file"
          ref={inputFile}
          value=""
          onChange={e => uploadFile(e.target.files[0])}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default StudyDocumentAdmin;
