const coreDb = require('../core-db');




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
}




