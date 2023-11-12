import { API, graphqlOperation } from 'aws-amplify';
// import { Auth } from 'aws-amplify';
// TODO dont use generated mutations
import {
  createWhiteBoardEvent,
  updateWhiteBoardEvent,
  deleteWhiteBoardEvent
} from '../../../graphql/mutations';
import Debounce from 'lodash.debounce';
import awsExports from '../../../aws-exports';
import { getUserIdToken } from '../../../services/cognito.service';

export class WhiteBoardRepository {
  _payload = null;

  constructor(payload) {
    this._payload = payload;
  }

  set payload(payload) {
    this._payload = payload;
  }

  get payload() {
    return this._payload;
  }

  save() {
    return this.upsertWhiteBoardEvent(this.payload.id, this.payload);
  }

  static requestDeleteWhiteBoardEvent = async id => {
    try {
      await API.graphql(
        graphqlOperation(deleteWhiteBoardEvent, {
          input: {
            id
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  upsertWhiteBoardEvent = Debounce(async (id, payload) => {
    try {
      await this.requestCreateWhiteBoardEvent(
        id,
        payload.classRoomId,
        payload.page,
        payload
      );
    } catch (error) {
      this.requestUpdateWhiteBoardEvent(id, payload.classRoomId, payload.page, payload);
    }
  }, 100);

  requestCreateWhiteBoardEvent = async (id, classRoomId, page, payload) => {
    return API.graphql(
      graphqlOperation(createWhiteBoardEvent, {
        input: {
          id,
          classRoomId,
          page,
          payload: JSON.stringify(payload),
          updatedAt: new Date()
        }
      })
    );
  };

  requestUpdateWhiteBoardEvent = async (id, classRoomId, page, payload) => {
    try {
      await API.graphql(
        graphqlOperation(updateWhiteBoardEvent, {
          input: {
            id,
            classRoomId,
            page,
            payload: JSON.stringify(payload),
            updatedAt: new Date()
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
