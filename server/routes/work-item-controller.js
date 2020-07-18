const WorkItemTracker = require('../models/work-item-tracker')
let workItemsAPI = require('../database/database-apis/work-items-api');

let workItemTracker = new WorkItemTracker();

function getWorkItem(socket, user) {
  socket.on('getWorkItem', async data => {
    let workItem = await workItemTracker.getWorkItem(user, data.workItemId);
    socket.emit('getWorkItem', workItem);
  });
}

function addWorkLane(socket, user) {
  socket.on('addWorkLane', async data => {
    console.log('HERE', data);
    let success = await workItemsAPI.addWorkLane(user, data.workItemId, data.laneId);
    socket.emit('addWorkLane', success);
  });
}

function addWorkItem(socket, user) {
  socket.on('addWorkItem', async workItem => {
    console.log('WORK ITEM', workItem);
    let updated = await workItemsAPI.addWorkItem(user, workItem);
    socket.emit('addWorkItem', updated.value);
  });
}

function changeWorkItemStatus(socket, user) {
  socket.on('changeStatus', async changeStatusData => {
    console.log('changeStatusData', changeStatusData;
    let updatedParent = await workItemsAPI.changeWorkItemStatus(user, changeStatusData);
    socket.emit('changeStatus', updatedParent.value);
  });
}




// function sendMessage(socket, user) {
//   socket.on('sendMessage', async messageInfo => {
//     if (messageInfo.conversationId) {
//       // this shouldn't be called every time
//       socket.join(messageInfo.conversationId);
//       let sentMessage = await messageTracker.sendMessage(user.email,messageInfo.conversationId, messageInfo.message);
//       let messages = await messageTracker.getMessages(messageInfo.conversationId);
//       socket.emit('getMessages', messages);
//       // emit for all other sockets
//       socket.to(messageInfo.conversationId).emit('getMessages', messages);
//     }
//   })
// }



module.exports = {
  getWorkItem: getWorkItem,
  addWorkLane: addWorkLane,
  addWorkItem: addWorkItem,
  changeWorkItemStatus: changeWorkItemStatus,
}

