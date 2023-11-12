import { Component } from 'react';
import { WhiteBoardRepository } from './WhiteBoardRepository';

export class ToolTemplate extends Component {
  whiteBoardEvent;

  save(payload) {
    if (!this.whiteBoardEvent) {
      this.whiteBoardEvent = new WhiteBoardRepository(payload);
    } else {
      this.whiteBoardEvent.payload = payload;
    }
    this.whiteBoardEvent.save();
  }
}
