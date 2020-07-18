let workItemsAPI = require('../database/database-apis/work-items-api');

function WorkItemTracker() {

  this.getWorkItem = async function getWorkItem(user, workItemId) {
    console.log('workItemId', workItemId);
    let workItem = await workItemsAPI.getWorkItem(user, workItemId);
    console.log('returned', workItem);
    return workItem;
  }


  // this.sendMessage = async function sendMessage(fromEmail, conversationId, message) {
  //   // console.log(fromEmail, toEmail, conversationId, message);
  //   let newMessage = await messagesAPI.sendMessage(fromEmail, conversationId, message);
  //   return  newMessage
  // }

  return this;
}


module.exports = WorkItemTracker



