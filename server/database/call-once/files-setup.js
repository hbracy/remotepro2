const coreDb = require('../core-db');
let db = coreDb.get();

function setupFiles() {
  console.log('SETTING UP FILES')
  // db.collection('users').createIndex( { 'email': 1 }, { unique: true } )
  // db.collection('files').createIndex( { "createdAt": 1 }, { expireAfterSeconds: 86400 } )

}



module.exports = {
  // setupUsers: setupUsers,
}

