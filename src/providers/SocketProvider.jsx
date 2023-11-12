import React, { useState, useContext, useEffect, useCallback } from 'react';
import keys from '../config/settings';
import socketIOClient from 'socket.io-client';
import {
  getUserAccessToken,
  isUserTeacher,
  getCurrentUser
} from '../services/cognito.service';
import awsExports from '../aws-exports';

export const socketContext = React.createContext(null);

const baseSocketConfig = {
  reconnection: true,
  forceNew: true,
  transports: ['polling', 'websocket']
};

const SOCKET_TYPE = {
  public: 'public',
  private: 'private'
};

class WebSocket {
  instance = null;

  constructor(type, authParams) {
    this._type = type;
    this._authParams = authParams;
  }

  async _getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = this._createInstance();
      return this.instance;
    }
  }

  async _createInstance() {
    let instance = null;
    switch (this._type) {
      case SOCKET_TYPE.public: {
        instance = await this._createPublicSocket();
        break;
      }
      case SOCKET_TYPE.private: {
        instance = await this._createWhiteBoardSocket();
        break;
      }
      default: {
        instance = await this._createPublicSocket();
      }
    }
    return instance;
  }

  async _createPublicSocket() {
    const wsEndPoint = keys.apiURL;
    const socket = socketIOClient(wsEndPoint, baseSocketConfig);
    return socket;
  }

  async _createWhiteBoardSocket() {
    let socket = null;
    try {
      const wsEndPoint = `${keys.apiURL}whiteBoard`;
      const authParams = { query: this._authParams };
      const socketConfig = { ...baseSocketConfig, ...authParams };
      socket = socketIOClient(wsEndPoint, socketConfig);
      return socket;
    } catch (error) {
      console.error('error creating private socket');
      console.error(error.message);
      return socket;
    }
  }

  async on(event, callback) {
    const instance = await this._getInstance();
    if (instance) {
      return instance.on(event, callback);
    }
    throw new Error('Not socket instance available');
  }

  async emit(event, payload) {
    const instance = await this._getInstance();
    if (instance) {
      return instance.emit(event, payload);
    }
    throw new Error('Not socket instance available');
  }
}

// Socket Manager can be use to get acces to socket in simple JS files like redux actions
export class SocketManager {
  static publicSocket = new WebSocket(SOCKET_TYPE.public);
  static whiteBoardSocket = null;
}

function onError(err) {
  console.error(err.message ? err.message : err);
}

const SocketProvider = ({ children }) => {
  const [publicSocket] = useState(SocketManager.publicSocket);
  const [whiteBoardSocket, setWhiteBoardSocket] = useState(
    SocketManager.whiteBoardSocket
  );

  useEffect(() => {
    publicSocket.on('connect_error', onError);
    publicSocket.on('error', onError);
  }, [publicSocket]);

  const _getAuthParams = useCallback(async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Not user Signed in');
    }
    const token = await getUserAccessToken();
    const isTeacher = await isUserTeacher();
    const graphqlEndpoint = awsExports['aws_appsync_graphqlEndpoint'];
    return {
      userId: user.attributes.sub,
      token,
      graphqlEndpoint,
      isTeacher
    };
  }, []);

  const createWhiteBoardSocket = useCallback(
    async classRoomId => {
      const authParams = await _getAuthParams();
      // disconnect the curent instance if there is one
      if (SocketManager.whiteBoardSocket) {
        const socket = await SocketManager.whiteBoardSocket.instance;
        socket.disconnect();
      }
      // create a new connection
      SocketManager.whiteBoardSocket = new WebSocket(SOCKET_TYPE.private, {
        classRoomId,
        ...authParams
      });
      setWhiteBoardSocket(SocketManager.whiteBoardSocket);
      return new Promise((resolve, reject) => {
        // Event when the backend is Down
        SocketManager.whiteBoardSocket.on('connect_error', error => {
          onError(error);
          reject(error);
        });
        // Event wheren there are errors in credentials, permissions etc
        SocketManager.whiteBoardSocket.on('error', error => {
          onError(error);
          reject(error);
        });
        // succesfully conected to backend
        SocketManager.whiteBoardSocket.on('connect', () => {
          resolve();
        });
      });
    },
    [_getAuthParams]
  );

  return (
    <socketContext.Provider
      value={{ publicSocket, whiteBoardSocket, createWhiteBoardSocket }}
    >
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(socketContext);
  if (context === undefined) {
    throw new Error('useSocket can only be used inside SocketProvider');
  }
  return context;
};

export default SocketProvider;
