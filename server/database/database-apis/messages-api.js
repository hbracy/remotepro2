const coreDb = require('../core-db');
const ObjectId = require('mongodb').ObjectID;

async function getUsersInConversation(conversationId) {
  const db = await coreDb.getOrConnect();
  let users = null;
  try {
    let conversation = await db.collection('conversations').findOne({'_id': new ObjectId(conversationId)});
    users = conversation.participants;
  } catch (err) {
    console.log(err);
    users = false;
  }
  console.log(users);
  return users;
}

async function getConversations(email) {
  const db = await coreDb.getOrConnect();
  let conversations = null;
  try {
    conversations = await db.collection('conversations').find({'participants': email}).toArray();
  } catch (err) {
    console.log(err);
    conversations = false;
  }
  console.log(conversations);
  return conversations;

}


async function addConversation(firstEmail, secondEmail) {
  const db = await coreDb.getOrConnect();
  // alphabetically sorting so that seraching is faster
  let sortedArray = [firstEmail, secondEmail]
  sortedArray.sort((a, b) => a.localeCompare(b));

  const query = { participants: sortedArray }
  console.log(sortedArray);
  const operation = {
    $set: {
      'participants': sortedArray
    }
  };

  const options = {
    upsert: true, 
    returnOriginal: false, // Return the new record

  };

  try {
    let result = await db.collection('conversations').findOneAndUpdate(query, operation, options);
    return result.value;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function sendMessage(fromEmail, conversationId, message) {
  const db = await coreDb.getOrConnect();

  const toInsert = {'conversationId': conversationId, fromEmail: fromEmail, message: message };

  try {
    let result = await db.collection('messages').insertOne(toInsert);
    console.log(result)
    return result.ops[0];
  } catch (err) {
    console.error(err);
    return false;
  }

}

async function getMessages(conversationId) {
  const db = await coreDb.getOrConnect();
  let result = [];
  console.log(conversationId)
  try {
    result = await db.collection('messages').find({conversationId: conversationId}).toArray();
  } catch (err) {
    result = false;
  }

  return result;

}



module.exports = {
  addConversation: addConversation,
  sendMessage: sendMessage,
  getMessages: getMessages,
  getConversations: getConversations,
  getUsersInConversation: getUsersInConversation
}




