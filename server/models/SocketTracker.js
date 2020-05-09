// let messagesAPI = require('../database/database-apis/messages-api');
// let sessionStoreAPI = require('../database/database-apis/session-store-api');

const consoleDBLog = require('../tools').consoleDBLog;



function SocketTracker() {


  let activeSocketSet = {};

  this.addSocket = function addSocket(socket) {
    // console.log(fromEmail, toEmail, conversationId, message);
    let socketObject = { 
      socket: socket
    }
    activeSocketSet[socket.id] = socketObject;
    console.log(activeSocketSet);

    return activeSocketSet[socket.id]
  }

  this.addEmailToSocket = function addEmailToSocket(socket, email) {
    let socketObject = {
      socket: socket,
      email: email
    }

    activeSocketSet[socket.id] = socketObject;
    console.log(activeSocketSet);
    return activeSocketSet[socket.id];
  }

  this.getSocketFromEmail = function getSocketFromEmail(email) {
    
  }

  return this;
}


module.exports = SocketTracker



