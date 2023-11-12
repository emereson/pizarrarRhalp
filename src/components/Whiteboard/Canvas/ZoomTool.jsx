import React, { Component } from 'react';
import { TOOLS } from '../../../enums/whiteBoard.enum';

class ZoomTool extends Component {
  onMouseMove = event => {};

  onMouseUp = event => {};

  onMouseDown = e => {
    e.evt.preventDefault();
    const isZoomIn = this.props.currentTool === TOOLS.ZOOMIN;
    const isZoomOut = this.props.currentTool === TOOLS.ZOOMOUT;
    if ((this.props.scale >= 1000 && isZoomIn) || (this.props.scale <= 0.2 && isZoomOut))
      return;

    const stage = e.target.getStage();
    const pointTo = {
      x: stage.getPointerPosition().x / this.props.scale - stage.x() / this.props.scale,
      y: stage.getPointerPosition().y / this.props.scale - stage.y() / this.props.scale
    };

    let newScale = this.props.scale;
    if (isZoomIn) {
      newScale += 0.1;
    }
    if (isZoomOut) {
      newScale -= 0.1;
    }

    const stageX = -(pointTo.x - stage.getPointerPosition().x / newScale) * newScale;
    const stageY = -(pointTo.y - stage.getPointerPosition().y / newScale) * newScale;

    this.props.onZoomChange(newScale, stageX, stageY);
    this.functionShowZoomCartel();
  };

  functionShowZoomCartel = () => {
    const { onShowZoomCartel, onHideZoomCartel } = this.props;

    onShowZoomCartel();

    clearTimeout(this.zoomCartelTimeout);
    this.zoomCartelTimeout = setTimeout(() => {
      onHideZoomCartel();
    }, 1000);
  };

  render() {
    return null;
  }
}

export default ZoomTool;
