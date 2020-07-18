let socketListeners = require("../routes/socket-controller.js");
let workItemController = require("../routes/work-item-controller.js");

const tools = require('../tools');

module.exports = function(socket) {

  // Protect listeners
  socket.on('authorization', token => {
    const validUser = tools.validateToken(token);
    if (validUser) {
      // socketTracker.addEmailToSocket(socket, validUser.email);
      // Register protected listeners here
      socketListeners.onSearchPotentialContact(socket, validUser);
      socketListeners.getMessages(socket, validUser);
      socketListeners.sendMessage(socket, validUser);
      workItemController.getWorkItem(socket, validUser);
      workItemController.addWorkLane(socket, validUser);
      workItemController.addWorkItem(socket, validUser);
      workItemController.changeWorkItemStatus(socket, validUser);


    } else {
      socket.emit('mustLogin', 'Please login');
    }
  });

  // Register unprotected listeners here


}

