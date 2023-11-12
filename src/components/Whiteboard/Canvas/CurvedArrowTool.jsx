import { whiteBoardContext } from '../WhiteBoardProvider';
import { v1 as uuidv1 } from 'uuid';
import * as Actions from '../../../store/actions/WhiteBoardActions';
import { TOOLS } from '../../../enums/whiteBoard.enum';
import { bindActionCreators } from 'redux';
import {
  notifyDrawEvent,
  curvedArrowMoving,
  curvedArrowUp
} from '../../../store/actions/WhiteBoardActions';
import { connect } from 'react-redux';
import { ToolTemplate } from './ToolTemplate';
import { WhiteBoardRepository } from './WhiteBoardRepository';
import { getStagePointerPosition } from './utils';

let currentId;
let points = [];
let coordinates = {};
/** max points a pencil stroke can have to save internet bandwidth */
class CurvedArrowTool extends ToolTemplate {
  static contextType = whiteBoardContext;

  constructor(props) {
    super(props);
    this.state = { path: '' };
  }

  midPoint = (p1, p2) => {
    return {
      x: Math.trunc(p1.x + (p2.x - p1.x) / 10),
      y: Math.trunc(p1.y + (p2.y - p1.y) / 10)
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
    console.log(p1);
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

    const arrowPoints = points.reduce((acc, val) => acc.concat(val.x, val.y), []); // [1, 2, 3, 4]

    this.setState({ path: data });
    const payload = {
      classRoomId: this.props.classRoomId,
      page: this.props.page,
      socketId: this.context.socketId,
      id: currentId,
      points: arrowPoints,
      data,
      color: this.context.color,
      size: this.context.size,
      fill: this.context.color,
      opacity: this.context.opacity,
      shapeType: TOOLS.CURVED_ARROW,
      eventType: Actions.CURVED_ARROW_MOVING
    };

    this.props.curvedArrowMoving(payload);
    this.props.notifyDrawEvent({ ...payload, eventType: Actions.CURVED_ARROW_MOVING });
    window.sessionStorage.setItem('isNewWhiteboardModification', 'true');
    this.save(payload);
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
    { notifyDrawEvent, curvedArrowMoving, curvedArrowUp },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  CurvedArrowTool
);
