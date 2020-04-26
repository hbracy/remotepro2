import socketIOClient from "socket.io-client";


const initialState = {
  socketConnection: ''
}

export default function socketReducer(state = initialState, action) {
  switch (action.type) {
    case 'CONNECT_TO_SOCKET':
      console.log("DISPATCHING CONNECT_TO_SOCKET");
      const socket = socketIOClient('http://localhost:3000');
      socket.on('serverConnection', data => {
        console.log(data);
        socket.on('mustLogin', data => {
          localStorage.removeItem('jwtToken');
        });
        socket.emit('authorization', localStorage.getItem('jwtToken'));
      });
      return {
        ...state,
        socketConnection: socket
      };

    default:
      return state;
  }
}
