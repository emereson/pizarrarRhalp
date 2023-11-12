/** Cursor icons */
import { whiteBoardContext } from '../WhiteBoardProvider';
import { v1 as uuidv1 } from 'uuid';
import * as Actions from '../../../store/actions/WhiteBoardActions';
import { bindActionCreators } from 'redux';
import {
  notifyDrawEvent,
  squareMoving,
  squareUp
} from '../../../store/actions/WhiteBoardActions';
import { connect } from 'react-redux';
import { WhiteBoardRepository } from './WhiteBoardRepository';
import { ToolTemplate } from './ToolTemplate';
import { getStagePointerPosition } from './utils';

let currentId;
let from = {};
let to = {};
let payload = null;

class SquareTool extends ToolTemplate {
  static contextType = whiteBoardContext;

  onMouseDown = event => {
    this.whiteBoardEvent = new WhiteBoardRepository(payload);
    from = getStagePointerPosition(event.currentTarget.getStage());
    currentId = uuidv1();
  };

  onMouseMove = event => {
    to = getStagePointerPosition(event.currentTarget.getStage());
    const width = to.x - from.x;
    const height = to.y - from.y;
    payload = {
      classRoomId: this.props.classRoomId,
      page: this.props.page,
      id: currentId,
      x: from.x,
      y: from.y,
      width,
      height,
      color: this.context.color,
      fill: this.context.isFilledSquare ? this.context.color : undefined,
      size: this.context.size,
      opacity: this.context.opacity
    };
    this.props.squareMoving(payload);
    this.props.notifyDrawEvent({ ...payload, eventType: Actions.SQUARE_MOVING });
    window.sessionStorage.setItem('isNewWhiteboardModification', 'true');
    this.save(payload);
  };

  render() {
    return null;
  }
}

// TODO move this to context, query classRoom and page with graphql
const mapStateToProps = state => {
  return {
    classRoomId: state.whiteBoard.classRoomId,
    page: state.whiteBoard.page
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ notifyDrawEvent, squareMoving, squareUp }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  SquareTool
);
