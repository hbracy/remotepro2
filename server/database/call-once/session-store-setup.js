const coreDb = require('../core-db');
let db = coreDb.get();

function setupSessionStore() {
  console.log('SETTING UP SESSION STORE')
  db.collection('session_store').createIndex( { "createdAt": 1 }, { expireAfterSeconds: 86400 } )
}

function insertToSessionStore() {
  console.log('HARD CODE INSERT INTO SESSION STORE')
  db.collection('session_store').updateOne({}, {$unset: {session_id:1}});
  db.collection('session_store').insertOne({
   'createdAt': new Date(),
   'user_id': 2,
   'session_id': 4
  });

}

module.exports = {
  setupSessionStore: setupSessionStore,
  insertToSessionStore: insertToSessionStore
}