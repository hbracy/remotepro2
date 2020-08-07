const coreDb = require('../core-db');
const ObjectId = require('mongodb').ObjectID;


async function addMemberToGroup(memberId, email, orgId) {
  const db = await coreDb.getOrConnect();
  const query = {'_id': new ObjectId(orgId)};

  const operation = {
    $addToSet: {
      "users": {email: email, _id: memberId, adminLevel: 2}
    }
  };

  const options = {
    returnOriginal: false, // Return the new record
    projection: { // Only return the following
      org_name: 1,
      users: 1,
    },
  };

  try {
    let result = await db.collection('orgs').findOneAndUpdate(query, operation, options);
    console.log(result.value);
    return result.value;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function searchMembersToAddToGroup(email, searchInput, orgId) {
  const db = await coreDb.getOrConnect();
  let suggestions;
  try {
    const org = await db.collection('orgs').findOne({$and: [{'users.email': email}, {'users.adminLevel': 1}, {'_id': new ObjectId(orgId)}]});
    if (org.parent) {
      // Search the org
      suggestions = [];
    } else {
      // Search everywhere
      const query =  {$and: [{'email': { $regex: new RegExp('^' + searchInput, 'i') }}, {'email': {$ne: email}}]}
      const options = {
        limit: 20,
        projection: {
          email: 1,
          name: 1,
        }
      }
      suggestions = await db.collection('users').find(query, options).toArray();
      console.log(suggestions);
    }
  } catch (err) {
    console.log(err);
    suggestions = false;
  }
  return suggestions;
}


async function getUserOrgs(email) {
  const db = await coreDb.getOrConnect();
  let userOrgs = null;
  try {
    userOrgs = await db.collection('orgs').find({$and: [{'users.email': email}, {'users.adminLevel': 1}]}).toArray();
  } catch (err) {
    console.log(err);
    userOrgs = false;
  }
  console.log(userOrgs);
  return userOrgs;
}

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
  insertOrg: insertOrg,
  getUserOrgs: getUserOrgs,
  searchMembersToAddToGroup: searchMembersToAddToGroup,
  addMemberToGroup: addMemberToGroup,
}



