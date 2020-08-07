let messagesAPI = require('../database/database-apis/messages-api');
const fs = require('fs');

function getConversations(socket, user) {
  socket.on('getConversations', async data => {
    let workItem = await messagesAPI.getConversations(user.email);
    socket.emit('getConversations', workItem);
  });
}

function sendCallRequest(socket, user, activeUsers) {
  socket.on('sendCallRequest', async data => {
    let usersInConversation = await messagesAPI.getUsersInConversation(data.conversationId);
    let answered = false;

    // timeout if no answeredCallRequest
    usersInConversation.map(toCallEmail => {
      if (user.email != toCallEmail) {
        let toCallSocket = activeUsers[toCallEmail].socket;
        toCallSocket.emit('callRequest', user.email);
        toCallSocket.once('answeredCallRequest', () => {
          socket.emit('answeredCallRequest', toCallEmail);
          fs.readFile('ice_servers.json', 'utf8', function (err, data) {
            if (err) throw err;
            setupCall(socket, toCallSocket, data);

          });
        });
      }
    });
  })
}

function setupCall(callingSocket, answeringSocket, iceServerData) {
  callingSocket.emit('iceServers', JSON.parse(iceServerData));
  answeringSocket.emit('iceServers', JSON.parse(iceServerData));

  // Handle the signaling logic
  callingSocket.once('offer', function (offerData) {
    console.log("RECIEVING OFFER:", offerData)
    answeringSocket.emit('offer', offerData);
  });
  
  answeringSocket.once('answer', function (answerData) {
    console.log("RECIEVING ANSWER:", answerData)
    callingSocket.emit('answer', answerData);
  });
}

module.exports = {
  getConversations: getConversations,
  sendCallRequest: sendCallRequest
}

