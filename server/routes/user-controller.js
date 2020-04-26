// const express = require('express');
// const router = express.Router();
const UserTrackerModule = require('../models/user-tracker')

let userTracker = new UserTrackerModule();


function userController(router) {

  // const sessionsTracker = new SessionsTrackerModule();

  // respond with "hello world" when a GET request is made to the homepage
  router.post('/authenticate', function (req, res) {
    console.log('GETTING REQUEST FOR /authenticate');

    let result = userTracker.authenticateUser(req.body.authToken);
    if (result) {
      result.authToken = req.body.authToken;
    }

    // console.log('RESPONSE FROM /authenticate/authenticate', result);
    res.send(result);
    
  });

  router.post('/authenticate/login', async function (req, res) {
    console.log('GETTING REQUEST FOR /authenticate/login');

    let email = req.body.email;
    let password = req.body.password;

    let toSend = await userTracker.loginUser(email, password);

    // console.log('RESPONSE FROM /authenticate/login', toSend);
    res.send(toSend)
  });

  router.post('/authenticate/signup', async function (req, res) {
    console.log('GETTING REQUEST FOR /authenticate/signup');

    let email = req.body.email;
    let password = req.body.password;
    let toSend = await userTracker.createUser(email, password);

    // console.log('RESPONSE FROM /authenticate/signup:', toSend);
    res.send(toSend)
  });


  router.post('/reserved/addContact', async function (req, res) {
    console.log('GETTING REQUEST FOR /reserved/addContact');
    let toSend = false;
    if (req.body.contactEmail != req.user.email) {
      toSend = await userTracker.addContactToUser(req.body.contactEmail, req.user.email);
    }
    // console.log('RESPONSE FROM /authenticate/signup:', toSend);
    res.send(toSend)
  });


}

module.exports = {
  userController: userController,
  userTracker: userTracker
};

















