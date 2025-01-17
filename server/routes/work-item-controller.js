const WorkItemTracker = require('../models/work-item-tracker')
let workItemsAPI = require('../database/database-apis/work-items-api');
let usersAPI = require('../database/database-apis/users-api');


let workItemTracker = new WorkItemTracker();

function getWorkItem(socket, user) {
  socket.on('getWorkItem', async data => {
    let workItem = await workItemTracker.getWorkItem(user, data.workItemId);
    socket.emit('getWorkItem', workItem);
  });
}

function getInitialWorkItem(socket, user) {
  socket.on('getInitialWorkItem', async data => {
    // console.log('HERE', data);
    let workItem = await workItemsAPI.getWorkItem(user, null);
    socket.emit('getWorkItem', workItem);
  });
}

function addWorkLane(socket, user) {
  socket.on('addWorkLane', async data => {
    // console.log('HERE', data);
    let success = await workItemsAPI.addWorkLane(user, data.workItemId, data.laneId);
    socket.emit('addWorkLane', success);
  });
}

function addWorkItem(socket, user) {
  socket.on('addWorkItem', async workItem => {
    console.log('ADDING WORK ITEM:', workItem);
    let updated = await workItemsAPI.addWorkItem(user, workItem);
    socket.emit('addWorkItem', updated.value);
  });
}

function changeWorkItemStatus(socket, user) {
  socket.on('changeStatus', async changeStatusData => {
    // console.log('changeStatusData', changeStatusData);
    let updatedParent = await workItemsAPI.changeWorkItemStatus(user, changeStatusData);
    let result = await usersAPI.accountForWorkItemStatusChange(user, changeStatusData);
    socket.emit('changeStatus', updatedParent.value);
  });
}

function deleteWorkItem(socket, user) {
  socket.on('deleteWorkItem', async workItemId => {
    // console.log('deleteWorkItem', workItemId);
    let updatedParent = await workItemsAPI.deleteWorkItem(user, workItemId);
    socket.emit('deleteWorkItem', updatedParent.value);
  });
}


module.exports = {
  getWorkItem: getWorkItem,
  addWorkLane: addWorkLane,
  addWorkItem: addWorkItem,
  changeWorkItemStatus: changeWorkItemStatus,
  deleteWorkItem: deleteWorkItem,
  getInitialWorkItem: getInitialWorkItem,
  
}

