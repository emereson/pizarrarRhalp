/** Cursor icons */
import { whiteBoardContext } from '../WhiteBoardProvider';
import { v1 as uuidv1 } from 'uuid';
import * as Actions from '../../../store/actions/WhiteBoardActions';
import { TOOLS } from '../../../enums/whiteBoard.enum';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  notifyDrawEvent,
  circleMoving,
  circleUp
} from '../../../store/actions/WhiteBoardActions';
import { WhiteBoardRepository } from './WhiteBoardRepository';
import { ToolTemplate } from './ToolTemplate';
import { getStagePointerPosition } from './utils';

let currentId;
let from = {};
let to = {};
let payload = null;

class CircleTool extends ToolTemplate {
  static contextType = whiteBoardContext;

  onMouseDown = event => {
    this.whiteBoardEvent = new WhiteBoardRepository(payload);
    const { x, y } = getStagePointerPosition(event.currentTarget.getStage());

    from = {
      x,
      y
    };
    currentId = uuidv1();
  };

  onMouseMove = async event => {
    to = getStagePointerPosition(event.currentTarget.getStage());
    const radiusX = Math.abs(to.x - from.x);
    const radiusY = Math.abs(to.y - from.y);

    payload = {
      classRoomId: this.props.classRoomId,
      page: this.props.page,
      socketId: this.context.socketId,
      id: currentId,
      x: from.x,
      y: from.y,
      radiusX,
      radiusY,
      color: this.context.color,
      fill: this.context.isFilledCircle ? this.context.color : undefined,
      size: this.context.size,
      opacity: this.context.opacity,
      shapeType: TOOLS.CIRCLE,
      eventType: Actions.CIRCLE_MOVING
    };
    this.props.circleMoving({ ...payload, local: true });
    this.props.notifyDrawEvent({ ...payload, eventType: Actions.CIRCLE_MOVING });
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
  return bindActionCreators({ notifyDrawEvent, circleMoving, circleUp }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  CircleTool
);
