import React, { Component } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
/** Cursor icons */
import { whiteBoardContext } from '../WhiteBoardProvider';
import { v1 as uuidv1 } from 'uuid';
import * as Actions from '../../../store/actions/WhiteBoardActions';
import { TOOLS } from '../../../enums/whiteBoard.enum';
import { bindActionCreators } from 'redux';
import {
  notifyDrawEvent,
  eraserMoving,
  eraserUp
} from '../../../store/actions/WhiteBoardActions';
import { connect } from 'react-redux';
import { WhiteBoardRepository } from './WhiteBoardRepository';
import { ToolTemplate } from './ToolTemplate';
import { getStagePointerPosition } from './utils';

let currentId;
let payload = null;

class EraserTool extends ToolTemplate {
  static contextType = whiteBoardContext;

  constructor(props) {
    super(props);
    this.state = { path: '' };
  }

  eraserSize = baseSize => {
    return baseSize * 2 + 16;
  };

  onMouseDown = event => {
    this.whiteBoardEvent = new WhiteBoardRepository(payload);
    currentId = uuidv1();
  };

  onMouseMove = event => {
    const coordinates = getStagePointerPosition(event.currentTarget.getStage());
    const { path } = this.state;
    const data = `${path}L${coordinates.x},${coordinates.y}`;
    this.setState({ path: data });
    payload = {
      classRoomId: this.props.classRoomId,
      page: this.props.page,
      id: currentId,
      data,
      color: 'white',
      size: this.eraserSize(this.context.size),
      shapeType: TOOLS.ERASER,
      eventType: Actions.ERASER_MOVING
    };
    this.props.eraserMoving(payload);
    this.props.notifyDrawEvent({ ...payload, eventType: Actions.ERASER_MOVING });
    window.sessionStorage.setItem('isNewWhiteboardModification', 'true');
    this.save(payload);
  };

  onMouseUp = event => {
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
  return bindActionCreators({ notifyDrawEvent, eraserMoving, eraserUp }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  EraserTool
);
