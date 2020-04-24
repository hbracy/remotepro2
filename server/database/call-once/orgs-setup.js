const coreDb = require('../core-db');
let db = coreDb.get();

function setupOrgs() {
  console.log('SETTING UP ORGS')
  db.collection('orgs').createIndex( { 'org_name': 1 }, { unique: true } );

}



module.exports = {
  setupOrgs: setupOrgs,
}

