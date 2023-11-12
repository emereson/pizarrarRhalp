// TODO refactor redux implementation to Apollo Client
import { SocketManager } from '../../providers/SocketProvider';
import { TOOLS } from '../../enums/whiteBoard.enum';
import API, { graphqlOperation } from '@aws-amplify/api';
import { shapesByClassRoomByPage, getClassRoom } from '../../graphql/queries';
import { updateClassRoom } from '../../graphql/mutations';
import { WhiteBoardRepository } from '../../components/Whiteboard/Canvas/WhiteBoardRepository';
import Throttle from 'lodash.throttle';
import { whiteBoardImagesSelector } from '../reducers/whiteBoardReducer';
import { S3Service } from '../../services/S3.service';

const s3Service = new S3Service('public');

export const SET_CLASSROOM = 'SET_CLASSROOM';
export const SET_PAGE = 'SET_PAGE';
export const INITIALIZE = 'INITIALIZE';
export const PENCIL_MOVING = 'PENCIL_MOVING';
export const ERASER_MOVING = 'ERASER_MOVING';
export const CIRCLE_MOVING = 'CIRCLE_MOVING';
export const SQUARE_MOVING = 'SQUARE_MOVING';
export const SEGMENT_MOVING = 'SEGMENT_MOVING';
export const ARROW_MOVING = 'ARROW_MOVING';
export const CURVED_ARROW_MOVING = 'CURVED_ARROW_MOVING';
export const CIRCLE_UP = 'CIRCLE_UP';
export const SQUARE_UP = 'SQUARE_UP';
export const SEGMENT_UP = 'SEGMENT_UP';
export const ARROW_UP = 'ARROW_UP';
export const PENCIL_UP = 'PENCIL_UP';
export const ERASER_UP = 'ERASER_UP';
export const CURVED_ARROW_UP = 'CURVED_ARROW_UP';
export const LOCAL_PENCIL_UP = 'LOCAL_PENCIL_UP';
export const CLEAR_ALL = 'CLEAR_ALL';
export const DRAW_EVENT = 'DRAW_EVENT';
export const UNDO = 'UNDO';
export const REDO = 'REDO';
export const REMOVE_SHAPE = 'REMOVE_SHAPE';
export const ADD_SHAPE = 'ADD_SHAPE';
export const SAVE_TEXT = 'SAVE_TEXT';
export const SET_CANVAS_IMAGE = 'SET_CANVAS_IMAGE';
export const SET_OPEN_GALLERY = 'SET_OPEN_GALLERY';

const request = name => ({
  REQUEST_ACTIVE: `${name}-REQUEST_ACTIVE`,
  REQUEST_INACTIVE: `${name}-REQUEST_INACTIVE`,
  PENDING_REQUEST: `${name}-PENDING_REQUEST`,
  REQUEST_ERROR: `${name}-REQUEST_ERROR`
});

export const updatePageRequest = request('page');
export const fetchShapesRequest = request('shapes');

const loadShapes = async (classRoomId, page) => {
  const payload = {};
  return getShapes(classRoomId, page);
  async function getShapes(classRoomId, page, nextToken = null) {
    try {
      const result = await API.graphql(
        graphqlOperation(shapesByClassRoomByPage, {
          classRoomId,
          nextToken,
          pageUpdatedAt: {
            beginsWith: { page }
          }
        })
      );
      const items = result.data.shapesByClassRoomByPage.items;
      const nextTokenResult = result.data.shapesByClassRoomByPage.nextToken;
      items.forEach(item => {
        if (item.payload && item.payload !== '') {
          payload[item.id] = JSON.parse(item.payload);
        }
      });
      if (nextTokenResult) {
        return {
          ...payload,
          ...(await getShapes(classRoomId, page, nextTokenResult))
        };
      }
      return payload;
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchPageData = payload => async (dispatch, getState) => {
  try {
    if (!getState().whiteBoard.shapesRequestActive) {
      dispatch({ type: INITIALIZE, payload: {} });
      dispatch({ type: fetchShapesRequest.REQUEST_ACTIVE });
      const shapes = await loadShapes(getState().whiteBoard.classRoomId, payload.page);
      dispatch({ type: INITIALIZE, payload: shapes });
      dispatch({ type: fetchShapesRequest.REQUEST_INACTIVE });
      const pendingRequest = getState().whiteBoard.shapesPendingRequest;
      if (pendingRequest) {
        dispatch({ type: fetchShapesRequest.PENDING_REQUEST, payload: null });
        return dispatch(fetchPageData(pendingRequest));
      }
    } else {
      dispatch({ type: fetchShapesRequest.PENDING_REQUEST, payload });
    }
  } catch (error) {
    dispatch({ type: fetchShapesRequest.REQUEST_INACTIVE });
    dispatch({ type: fetchShapesRequest.REQUEST_ERROR, payload: error });
    console.log(error);
  }
};

export const requestUpdatePage = payload => async (dispatch, getState) => {
  try {
    const { whiteBoard } = getState();
    SocketManager.whiteBoardSocket.emit(SET_PAGE, payload);
    dispatch({ type: INITIALIZE, payload: {} });
    dispatch(setPage(payload));
    dispatch(fetchPageData({ page: payload.page }));
    const classRoomId = whiteBoard.classRoomId;
    await API.graphql(
      graphqlOperation(updateClassRoom, {
        input: {
          id: classRoomId,
          page: payload.page
        }
      })
    );
  } catch (error) {
    dispatch({ type: updatePageRequest.REQUEST_ERROR });
    console.log(error);
  }
};

export const loadWhiteBoardState = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INITIALIZE, payload: {} });
    const { whiteBoard } = getState();
    const classRoomId = whiteBoard.classRoomId;
    const classRoom = await API.graphql(
      graphqlOperation(getClassRoom, { id: classRoomId })
    );
    const page = classRoom.data.getClassRoom.page;
    dispatch(setPage({ page }));
    return dispatch(fetchPageData({ page }));
  } catch (error) {
    console.log(error);
  }
};

export const setClassRoom = payload => dispatch => {
  dispatch({ type: SET_CLASSROOM, payload });
};

export const setPage = payload => dispatch => {
  dispatch({ type: SET_PAGE, payload });
};

export const initialize = payload => dispatch => {
  dispatch({ type: INITIALIZE, payload });
};

export const pencilMoving = payload => dispatch => {
  dispatch({ type: PENCIL_MOVING, payload });
};

export const eraserMoving = payload => dispatch => {
  dispatch({ type: ERASER_MOVING, payload });
};

export const circleMoving = payload => dispatch => {
  dispatch({ type: CIRCLE_MOVING, payload });
};

export const squareMoving = payload => dispatch => {
  payload.shapeType = TOOLS.SQUARE;
  dispatch({ type: SQUARE_MOVING, payload });
};

export const segmentMoving = payload => dispatch => {
  payload.shapeType = TOOLS.SEGMENT;
  dispatch({ type: SEGMENT_MOVING, payload });
};

export const arrowMoving = payload => dispatch => {
  payload.shapeType = TOOLS.ARROW;
  dispatch({ type: ARROW_MOVING, payload });
};

export const curvedArrowMoving = payload => dispatch => {
  dispatch({ type: CURVED_ARROW_MOVING, payload });
};
export const circleUp = payload => dispatch => {
  // payload.shapeType= TOOLS.CIRCLE;
  dispatch({ type: CIRCLE_UP, payload });
};

export const squareUp = payload => dispatch => {
  payload.shapeType = TOOLS.SQUARE;
  dispatch({ type: SQUARE_UP, payload });
};

export const segmentUp = payload => dispatch => {
  payload.shapeType = TOOLS.SEGMENT;
  dispatch({ type: SEGMENT_UP, payload });
};

export const arrowUp = payload => dispatch => {
  payload.shapeType = TOOLS.ARROW;
  dispatch({ type: ARROW_UP, payload });
};

export const pencilUp = payload => dispatch => {
  payload.shapeType = TOOLS.PENCIL;
  dispatch({ type: PENCIL_UP, payload });
};

export const curvedArrowUp = payload => dispatch => {
  payload.shapeType = TOOLS.CURVED_ARROW;
  dispatch({ type: CURVED_ARROW_UP, payload });
};

export const localPencilUp = payload => dispatch => {
  dispatch({ type: LOCAL_PENCIL_UP, payload });
};

export const eraserUp = payload => dispatch => {
  payload.shapeType = TOOLS.ERASER;
  dispatch({ type: ERASER_UP, payload });
};

export const notifyEvent = payload => () => {
  SocketManager.whiteBoardSocket.emit(payload.eventType, payload);
};

const sendDrawnotification = Throttle(payload => {
  SocketManager.whiteBoardSocket.emit(DRAW_EVENT, payload);
}, 20);

export const notifyDrawEvent = payload => () => {
  sendDrawnotification(payload);
};

export const saveText = payload => dispatch => {
  payload.shapeType = TOOLS.TEXT;
  dispatch({ type: SAVE_TEXT, payload });
  const whiteBoardEvent = new WhiteBoardRepository(payload);
  whiteBoardEvent.save();
};

export const undo = () => (dispatch, getState) => {
  const { whiteBoard } = getState();
  const latestShapeId = Array.from(whiteBoard.localShapesIds)[
    whiteBoard.localShapesIds.size - 1
  ];
  if (latestShapeId) {
    const payload = { id: latestShapeId };
    SocketManager.whiteBoardSocket.emit(REMOVE_SHAPE, payload);
    WhiteBoardRepository.requestDeleteWhiteBoardEvent(latestShapeId);
    dispatch({ type: UNDO, payload });
    dispatch({ type: REMOVE_SHAPE, payload });
  }
};

export const redo = () => (dispatch, getState) => {
  const { whiteBoard } = getState();
  const latestUndoneShape = whiteBoard.undoneShapes[whiteBoard.undoneShapes.length - 1];
  if (latestUndoneShape) {
    const payload = latestUndoneShape;
    SocketManager.whiteBoardSocket.emit(ADD_SHAPE, payload);
    const whiteBoardEvent = new WhiteBoardRepository(payload);
    whiteBoardEvent.save();
    dispatch({ type: REDO, payload });
    dispatch({ type: ADD_SHAPE, payload });
  }
};

const _removeCanvasImageHelper = (image, dispatch) => {
  if (!image.isFromGallery) {
    s3Service.deleteFile(image.originalUrl);
  }
  dispatch({ type: REMOVE_SHAPE, payload: image });
  WhiteBoardRepository.requestDeleteWhiteBoardEvent(image.id);
};

export const clearWhiteBoard = () => (dispatch, getState) => {
  const state = getState();
  const canvasImage = whiteBoardImagesSelector(state);
  if (canvasImage) {
    _removeCanvasImageHelper(canvasImage.image, dispatch);
  }
  for (const id in state.whiteBoard.shapes) {
    WhiteBoardRepository.requestDeleteWhiteBoardEvent(id);
  }
  dispatch(clearAll());
  dispatch(notifyEvent({ eventType: CLEAR_ALL }));
};

export const clearAll = () => dispatch => {
  dispatch({ type: CLEAR_ALL });
};

export const setCanvasImage = payload => dispatch => {
  // check if there is alreay an image and remove it
  dispatch(deleteCanvasImage());
  dispatch({ type: SET_CANVAS_IMAGE, payload });
  dispatch(notifyEvent({ eventType: SET_CANVAS_IMAGE, ...payload }));
};

export const deleteCanvasImage = () => (dispatch, getState) => {
  const canvasImage = whiteBoardImagesSelector(getState());
  if (canvasImage) {
    _removeCanvasImageHelper(canvasImage.image, dispatch);
    SocketManager.whiteBoardSocket.emit(REMOVE_SHAPE, canvasImage.image);
  }
};

export const setOpenGallery = open => dispatch => {
  dispatch({ type: SET_OPEN_GALLERY, open });
};
