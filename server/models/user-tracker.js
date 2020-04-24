let usersAPI = require('../database/database-apis/users-api');
// let sessionStoreAPI = require('../database/database-apis/session-store-api');

const consoleDBLog = require('../tools').consoleDBLog;
const generateToken = require('../tools').generateToken;
const validateToken = require('../tools').validateToken;


function UserTracker() {

  this.createUser = async function createUser(email, password) {
    let toReturn = false;
    // console.log('ATTEMPTING TO CREATE USER WITH EMAIL: ' + email);
    // console.log(username, password); 

    let user = await usersAPI.findUserFromEmail(email)
    if (user) {
      // console.log(user)
      console.log(email + ' ALREADY EXISTS, CANNOT CREATE USER')
      return toReturn;
    } else {
      let newUser = await usersAPI.insertUser(email, password);
      if (newUser) {
        let authToken = await generateToken(newUser);
        toReturn = {
          email: newUser.email,
          authToken: authToken,
        }
        consoleDBLog('CREATED USER', newUser.email);
      }

      return toReturn
    }
  }

  this.loginUser = async function loginUser(email, password) {
    // console.log('ATTEMPTING TO LOGIN USER WITH EMAIL: ' + email);
    let toReturn = false;
    // console.log(username, password); 

    let user = await usersAPI.verifyEmailAndPassword(email, password);
    if (user) {
      // console.log(user)
      // console.log(user.email + ' VERIFICATION SUCCESS')
      toReturn = user;

      let authToken = await generateToken(user);
      toReturn = {
        email: user.email,
        authToken: authToken,
      }
      consoleDBLog('LOGGED IN USER', email);

      return toReturn;
    } else {
      consoleDBLog(user.email + ' BAD LOGIN');
      return toReturn
    }

  }

  this.authenticateUser = function authenticateUser(authToken) {
    let toReturn = validateToken(authToken);
    return toReturn;


  }




  return this;
}


module.exports = UserTracker


