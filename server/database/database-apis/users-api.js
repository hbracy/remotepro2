const coreDb = require('../core-db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function findUserFromEmail(email) {
  const db = await coreDb.getOrConnect();
  return db.collection('users').findOne({email: email});
}

async function insertUser(email, password) {
  password = await bcrypt.hash(password, saltRounds);
  const db = await coreDb.getOrConnect();

  try {
  	let newUser = await db.collection('users').insertOne({
     'email': email,
     'password': password,
     
    });
    return newUser.ops[0];
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function verifyEmailAndPassword(email, password) {

  const db = await coreDb.getOrConnect();

  try {
    let user = await db.collection('users').findOne({
     'email': email,
    });
    let isMatch = password = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    return false;
  } catch (err) {
    return false;
  }  

  return email;
}

async function deleteUser(email) {
  const db = await coreDb.getOrConnect();

  try {
    let deleteReport = await db.collection('users').deleteOne({
     "email": email,
    });
    return deleteReport.result.ok;
  } catch (err) {
    return false;
  }

}

async function updateUserWithOrg(org, user) {
  const db = await coreDb.getOrConnect();
  const query = {'email': user.email};
  // console.log(org);
  const operation = {
    $addToSet: {
      "orgs": org.org_name
    }
  };

  const options = {
    returnOriginal: false, // Return the new record
    projection: { // Only return the following
      email: 1,
      orgs: 1,
    },
  };

  try {
    let result = await db.collection('users').findOneAndUpdate(query, operation, options);
    console.log(result.value);
    return result.value;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function getTopFiveWithName(userEmail, userSearch) {
  const db = await coreDb.getOrConnect();
  const query =  {$and: [{'email': { $regex: userSearch }}, {'email': {$ne: userEmail}}]}

  const options = {
    limit: 5,
    projection: {
      email: 1,
      name: 1,
    }
  }

  try {
    let result = await db.collection('users').find(query, options).toArray();
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }


}


async function addContactToUser(contactEmail, userEmail) {
  const db = await coreDb.getOrConnect();
  const query = {'email': userEmail};
  // console.log(org);
  const operation = {
    $addToSet: {
      "contacts": {
        email: contactEmail,
        name: 'Hard Coded Name',
      }
    }
  };

  const options = {
    returnOriginal: false, // Return the new record
    projection: { // Only return the following
      email: 1,
      orgs: 1,
      contacts: 1,
    },
  };

  try {
    let result = await db.collection('users').findOneAndUpdate(query, operation, options);
    console.log(result.value);
    return result.value;
  } catch (err) {
    console.error(err);
    return false;
  }


}



module.exports = {
  findUserFromEmail: findUserFromEmail,
  insertUser: insertUser,
  deleteUser: deleteUser,
  verifyEmailAndPassword: verifyEmailAndPassword,
  updateUserWithOrg: updateUserWithOrg,
  getTopFiveWithName: getTopFiveWithName,
  addContactToUser: addContactToUser
}




