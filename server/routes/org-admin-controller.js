// const express = require('express');
// const router = express.Router();
const UserTrackerModule = require('../models/user-tracker')
let sessionStoreAPI = require('../database/database-apis/session-store-api');

let userTracker = new UserTrackerModule();


function orgAdminController(router) {

  // const sessionsTracker = new SessionsTrackerModule();

  // respond with "hello world" when a GET request is made to the homepage
  router.post('/reserved/test', function (req, res) {
    res.send(req.user);
  });

  router.post('/reserved/createNewOrg', function (req, res) {
    console.log('YEAHAHHHH')
  });



}

module.exports = {
  orgAdminController: orgAdminController,
};

















