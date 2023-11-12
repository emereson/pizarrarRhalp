import { Component } from 'react';
import { TOOLS } from '../../../enums/whiteBoard.enum';
import { getStagePointerPosition } from './utils';

export class HandTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevPosition: null
    };
  }

  onMouseMove = e => {
    if (this.state.prevPosition === null) return;
    const stage = e.target.getStage();
    const newPosition = [e.evt.clientX, e.evt.clientY];
    this.props.onStageMove(
      newPosition[0] - this.state.prevPosition[0],
      newPosition[1] - this.state.prevPosition[1]
    );

    this.setState({
      prevPosition: [e.evt.clientX, e.evt.clientY]
    });
  };

  onMouseUp = e => {
    e.evt.preventDefault();
    this.setState({
      prevPosition: null
    });
  };

  onMouseDown = e => {
    e.evt.preventDefault();
    this.setState({
      prevPosition: [e.evt.clientX, e.evt.clientY]
    });
  };

  render() {
    return null;
  }
}

export default HandTool;
