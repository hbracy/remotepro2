let socketListeners = require("../routes/socket-controller.js");
let workItemController = require("../routes/work-item-controller.js");
let calendarController = require("../routes/calendar-controller.js");
let orgAdminController = require("../routes/org-admin-controller.js");
let conversationController = require("../routes/conversation-controller.js");
let storageController = require("../routes/storage-controller.js");


const tools = require('../tools');
let activeUsers = {};

module.exports = function(socket, storageTracker) {

  // Protect listeners
  socket.on('authorization', token => {
    const validUser = tools.validateToken(token);
    if (validUser) {
      console.log('REGISTERING AUTHENTICATED SOCKETS');
      console.log('VALID USER', validUser);

      activeUsers[validUser.email] = {
        userInfo: validUser,
        socket: socket
      }
      // socketTracker.addEmailToSocket(socket, validUser.email);
      // Register protected listeners here
      socketListeners.onSearchPotentialContact(socket, validUser);
      socketListeners.getMessages(socket, validUser);
      socketListeners.sendMessage(socket, validUser);
      workItemController.getInitialWorkItem(socket, validUser);
      workItemController.getWorkItem(socket, validUser);
      workItemController.addWorkLane(socket, validUser);
      workItemController.addWorkItem(socket, validUser);
      workItemController.changeWorkItemStatus(socket, validUser);
      workItemController.deleteWorkItem(socket, validUser);
      calendarController.createEvent(socket, validUser);
      calendarController.getEvents(socket, validUser);
      calendarController.changeEventDetails(socket, validUser);
      orgAdminController.getUserOrgs(socket, validUser);
      orgAdminController.searchMembersToAddToGroup(socket, validUser);
      orgAdminController.addMemberToGroup(socket, validUser);
      conversationController.getConversations(socket, validUser);
      conversationController.sendCallRequest(socket, validUser, activeUsers);
      storageController.saveFile(socket, storageTracker, validUser);

      socket.emit('authorized', {token: token, username: validUser.email})
    } else {
      socket.emit('mustLogin', 'Please login');
    }
  });

  // Register unprotected listeners here


}

