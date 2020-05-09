const UserTrackerModule = require('../models/user-tracker')
const MessageTracker = require('../models/message-tracker')

let userTracker = new UserTrackerModule();
let messageTracker = new MessageTracker();

// let timesEmitted = 0;

function onSearchPotentialContact(socket, user) {

  socket.on('searchPotentialContact', async userSearch => {

      console.log(userSearch);

      let suggestions = await userTracker.searchTopFive(user.email, userSearch)

      // console.log(suggestions);
   
      socket.emit('searchPotentialContact', suggestions);
      // timesEmitted += 1;
      // console.log(timesEmitted);
    
  });
}


function getMessages(socket, user) {
  socket.on('getMessages', async data => {
    let messages = await messageTracker.getMessages(data.conversationId);
    socket.emit('getMessages', messages)
  });
}

function sendMessage(socket, user) {
  socket.on('sendMessage', async messageInfo => {
    if (messageInfo.conversationId) {
      // this shouldn't be called every time
      socket.join(messageInfo.conversationId);
      let sentMessage = await messageTracker.sendMessage(user.email,messageInfo.conversationId, messageInfo.message);
      let messages = await messageTracker.getMessages(messageInfo.conversationId);
      socket.emit('getMessages', messages);
      // emit for all other sockets
      socket.to(messageInfo.conversationId).emit('getMessages', messages);
    }
  })



}



module.exports = {
  onSearchPotentialContact: onSearchPotentialContact,
  getMessages: getMessages,
  sendMessage: sendMessage
}

