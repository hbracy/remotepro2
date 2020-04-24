const coreDb = require('../core-db');
let db = coreDb.get();

function setupUsers() {
  console.log('SETTING UP USERS')
  // db.collection('users').createIndex( { 'email': 1 }, { unique: true } )
  db.collection('users').createIndex( { "createdAt": 1 }, { expireAfterSeconds: 86400 } )

}



module.exports = {
  setupUsers: setupUsers,
}

