const coreDb = require('../core-db');


async function checkSession(sid) {
  const db = await coreDb.getOrConnect();
  return db.collection('session_store').findOne({session_id: sid});

}

async function upsertSession(uid, sid) {
  const db = await coreDb.getOrConnect();
  const query = {'user_id': uid};
  const operation = {
    $set: {
      "createdAt": new Date(),
      "user_id": uid,
      "session_id": sid
    }
  };
  const options = {upsert: true};
  let result = await db.collection('session_store').findOneAndUpdate(query, operation, options)

	return result.value;
}

module.exports = {
  checkSession: checkSession,
  upsertSession: upsertSession
}




