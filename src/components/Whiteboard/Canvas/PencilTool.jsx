import { whiteBoardContext } from '../WhiteBoardProvider';
import { v1 as uuidv1 } from 'uuid';
import * as Actions from '../../../store/actions/WhiteBoardActions';
import { TOOLS } from '../../../enums/whiteBoard.enum';
import { bindActionCreators } from 'redux';
import {
  notifyDrawEvent,
  pencilMoving,
  pencilUp,
  localPencilUp
} from '../../../store/actions/WhiteBoardActions';
import { connect } from 'react-redux';
import { ToolTemplate } from './ToolTemplate';
import { WhiteBoardRepository } from './WhiteBoardRepository';
import { getStagePointerPosition } from './utils';

let currentId;
let points = [];
let coordinates = {};
/** max points a pencil stroke can have to save internet bandwidth */
const MAX_POINTS = 100;
class PencilTool extends ToolTemplate {
  static contextType = whiteBoardContext;

  constructor(props) {
    super(props);
    this.state = { path: '' };
  }

  midPoint = (p1, p2) => {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2
    };
  };

  onMouseDown = event => {
    this.whiteBoardEvent = new WhiteBoardRepository();
    points = [];
    coordinates = getStagePointerPosition(event.currentTarget.getStage());
    currentId = uuidv1();
    points.push(coordinates);
  };

  onMouseMove = event => {
    coordinates = getStagePointerPosition(event.currentTarget.getStage());

    points.push(coordinates);
    let p1 = points[0];
    let p2 = points[1];
    let path = `M${p1.x},${p1.y}`;
    for (var i = 1, len = points.length; i < len; i++) {
      // we pick the point between pi+1 & pi+2 as the
      // end point and p1 as our control point
      const midPoint = this.midPoint(p1, p2);
      path = `${path}Q${p1.x},${p1.y},${midPoint.x},${midPoint.y}`;
      p1 = points[i];
      p2 = points[i + 1];
    }
    const data = `${path}L${p1.x},${p1.y}`;

    this.setState({ path: data });
    const payload = {
      classRoomId: this.props.classRoomId,
      page: this.props.page,
      socketId: this.context.socketId,
      id: currentId,
      data,
      color: this.context.color,
      size: this.context.size,
      opacity: this.context.opacity,
      shapeType: TOOLS.PENCIL,
      eventType: Actions.PENCIL_MOVING
    };
    this.props.pencilMoving(payload);
    this.props.notifyDrawEvent({ ...payload, eventType: Actions.PENCIL_MOVING });
    window.sessionStorage.setItem('isNewWhiteboardModification', 'true');

    this.save(payload);
    if (points.length === MAX_POINTS) {
      this.whiteBoardEvent = null;
      currentId = uuidv1();
      points = points.reverse().slice(0, 1);
    }
  };

  onMouseUp = () => {
    points = [];
    this.setState({ path: '' });
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
  return bindActionCreators(
    { notifyDrawEvent, pencilMoving, pencilUp, localPencilUp },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  PencilTool
);
