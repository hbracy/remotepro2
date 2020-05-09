let messagesAPI = require('../database/database-apis/messages-api');
// let sessionStoreAPI = require('../database/database-apis/session-store-api');

const consoleDBLog = require('../tools').consoleDBLog;


function MessageTracker() {

  this.sendMessage = async function sendMessage(fromEmail, conversationId, message) {
    // console.log(fromEmail, toEmail, conversationId, message);
    let newMessage = await messagesAPI.sendMessage(fromEmail, conversationId, message);
    return  newMessage
  }

  this.getMessages = async function getMessages(conversationId) {
    console.log('ConversationId', conversationId);
    let messages = await messagesAPI.getMessages(conversationId);
    // console.log('messages', messages);

    return messages;
  }


  return this;
}


module.exports = MessageTracker



