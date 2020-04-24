const coreDb = require('../core-db');



async function findOrgFromName(name) {
  const db = await coreDb.getOrConnect();
  return db.collection('orgs').findOne({org_name: name});
}

async function insertOrg(orgName, adminUser) {
  const db = await coreDb.getOrConnect();
  // console.log(adminUser, orgName);

  const query = {'org_name': orgName};
  const operation = {
    $addToSet: {
      "users": adminUser
    }
  };
  const options = {
    upsert: true, 
    returnOriginal: false,
    projection: {
      org_name: 1,
      'users.email': 1,
      'users.adminLevel': 1,
    },
  };


  try {
    let result = await db.collection('orgs').findOneAndUpdate(query, operation, options);
    return result.value;
  } catch (err) {
    console.error(err);
    return false;
  }
}



module.exports = {
  findOrgFromName: findOrgFromName,
  insertOrg: insertOrg
}



