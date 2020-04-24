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




module.exports = {
  findUserFromEmail: findUserFromEmail,
  insertUser: insertUser,
  deleteUser: deleteUser,
  verifyEmailAndPassword: verifyEmailAndPassword,
}




