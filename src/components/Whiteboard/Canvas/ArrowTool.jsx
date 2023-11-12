import React, { Component } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
/** Cursor icons */
import { whiteBoardContext } from '../WhiteBoardProvider';
import { v1 as uuidv1 } from 'uuid';
import * as Actions from '../../../store/actions/WhiteBoardActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  notifyDrawEvent,
  arrowMoving,
  arrowUp
} from '../../../store/actions/WhiteBoardActions';
import { WhiteBoardRepository } from './WhiteBoardRepository';
import { ToolTemplate } from './ToolTemplate';
import { getStagePointerPosition } from './utils';

let currentId;
let from = {};
let to = {};
let payload = null;

class ArrowTool extends ToolTemplate {
  static contextType = whiteBoardContext;

  onMouseDown = event => {
    this.whiteBoardEvent = new WhiteBoardRepository(payload);
    from = getStagePointerPosition(event.currentTarget.getStage());
    currentId = uuidv1();
  };

  onMouseMove = event => {
    to = getStagePointerPosition(event.currentTarget.getStage());
    const points = [from.x, from.y, to.x, to.y];
    payload = {
      classRoomId: this.props.classRoomId,
      page: this.props.page,
      id: currentId,
      points,
      lineCap: 'round',
      fill: this.context.color,
      color: this.context.color,
      size: this.context.size,
      opacity: this.context.opacity
    };
    this.props.arrowMoving(payload);
    this.props.notifyDrawEvent({ ...payload, eventType: Actions.ARROW_MOVING });
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
  return bindActionCreators({ notifyDrawEvent, arrowMoving, arrowUp }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  ArrowTool
);
