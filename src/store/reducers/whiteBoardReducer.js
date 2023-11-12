import * as Actions from '../actions/WhiteBoardActions';
import { createSelector } from 'reselect';
import { SHAPE_TYPES } from '../../enums/whiteBoard.enum';

const initialState = {
  classRoomId: null,
  page: '',
  shapes: {},
  localShapesIds: new Set(),
  undoneShapes: [],
  openGallery: false,
  errors: {}
};

const whiteBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INITIALIZE: {
      return {
        ...state,
        shapes: action.payload
      };
    }
    case Actions.updatePageRequest.REQUEST_ACTIVE: {
      return {
        ...state,
        pageRequestActive: true
      };
    }
    case Actions.fetchShapesRequest.REQUEST_ACTIVE: {
      return {
        ...state,
        shapesRequestActive: true
      };
    }
    case Actions.updatePageRequest.REQUEST_INACTIVE: {
      return {
        ...state,
        pageRequestActive: false
      };
    }
    case Actions.fetchShapesRequest.REQUEST_INACTIVE: {
      return {
        ...state,
        shapesRequestActive: false
      };
    }
    case Actions.fetchShapesRequest.REQUEST_ERROR: {
      return {
        ...state,
        errors: { ...state.errors, ...action.payload }
      };
    }
    case Actions.updatePageRequest.PENDING_REQUEST: {
      return {
        ...state,
        pagePendingRequest: action.payload
      };
    }
    case Actions.fetchShapesRequest.PENDING_REQUEST: {
      return {
        ...state,
        shapesPendingRequest: action.payload
      };
    }
    case Actions.updatePageRequest.REQUEST_ERROR: {
      return {
        ...state,
        errors: { ...state.errors, ...action.payload }
      };
    }
    case Actions.SET_CLASSROOM: {
      return {
        ...state,
        classRoomId: action.payload.classRoomId
      };
    }
    case Actions.SET_PAGE: {
      const page = action.payload.page;

      return {
        ...state,
        page,
        undoneShapes: [],
        localShapesIds: new Set()
      };
    }
    case Actions.PENCIL_MOVING:
    case Actions.ERASER_MOVING:
    case Actions.CIRCLE_MOVING:
    case Actions.SQUARE_MOVING:
    case Actions.SEGMENT_MOVING:
    case Actions.ARROW_MOVING:
    case Actions.CURVED_ARROW_MOVING:
    case Actions.SAVE_TEXT:
    case Actions.SET_CANVAS_IMAGE: {
      return {
        ...state,
        shapes: { ...state.shapes, [action.payload.id]: action.payload },
        localShapesIds: action.payload.isRemote
          ? state.localShapesIds
          : state.localShapesIds.add(action.payload.id)
      };
    }
    case Actions.REMOVE_SHAPE: {
      const key = action.payload.id;
      // eslint-disable-next-line no-unused-vars
      const { [key]: shape, ...rest } = state.shapes;
      return {
        ...state,
        shapes: { ...rest }
      };
    }
    case Actions.ADD_SHAPE: {
      return {
        ...state,
        shapes: { ...state.shapes, [action.payload.id]: action.payload }
      };
    }
    case Actions.UNDO: {
      const shape = state.shapes[action.payload.id];
      state.localShapesIds.delete(action.payload.id);
      return {
        ...state,
        undoneShapes: [...state.undoneShapes, shape]
      };
    }
    case Actions.REDO: {
      return {
        ...state,
        localShapesIds: state.localShapesIds.add(action.payload.id),
        undoneShapes: state.undoneShapes.filter(shape => shape.id !== action.payload.id)
      };
    }
    case Actions.CLEAR_ALL: {
      return {
        ...state,
        currentPencilStrokes: {},
        shapes: {},
        localShapesIds: new Set(),
        undoneShapes: []
      };
    }
    case Actions.SET_OPEN_GALLERY: {
      return {
        ...state,
        openGallery: action.open
      };
    }
    default:
      return state;
  }
};

/** SELECTORS */
const shapesFilter = state => state.whiteBoard.shapes || [];

export const whiteBoardShapesSelector = createSelector([shapesFilter], shapes => {
  const shapesArray = Object.entries(shapes);
  // filter the shapes
  const filteredArray = shapesArray.filter(
    ([, value]) => value.shapeType !== SHAPE_TYPES.IMAGE
  );
  const result = Object.fromEntries(filteredArray);
  return result;
});

export const whiteBoardImagesSelector = createSelector([shapesFilter], shapes => {
  const shapesArray = Object.entries(shapes);
  // filter the shapes
  const filteredArray = shapesArray.filter(
    ([, value]) => value.shapeType === SHAPE_TYPES.IMAGE
  );
  // wer are currently suporting only one image rendered at a time
  const result = Object.fromEntries(filteredArray.slice(0, 1));
  const imageData = Object.values(result)[0];
  // FIX for cors issue with canvas2html and s3 images see: https://github.com/niklasvh/html2canvas/issues/1544#issuecomment-478033005
  // Add timestamp to image url to avoid cache cors issues
  if (imageData && imageData.url) {
    // url without query params
    imageData.originalUrl = imageData.url;
    const image = imageData.url.includes('?')
      ? imageData.url.split('?')[0]
      : imageData.url;
    const timestamp = new Date().getTime();
    imageData.url = `${image}?v=${timestamp}`;
  }
  return filteredArray.length ? { image: imageData } : null;
});

export default whiteBoardReducer;
