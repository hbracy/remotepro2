const express = require("express");
// let session = require('express-session');

let router = express.Router();


let indexController = require("../routes/index");
let authenticationController = require("../routes/authentication-controller").authenticationController;
let orgAdminController = require("../routes/org-admin-controller").orgAdminController;

const tools = require('../tools');

module.exports = function(app) {

  app.use(express.json());
  app.use(router);
  indexController(router);
  authenticationController(router);

  // Protect all reserved routes
  router.use('/reserved', function(req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.headers.authorization;
    if (!token) return; //if no token, continue

    token = token.replace('Bearer ', '');

    const validUser = tools.validateToken(token);

    if (validUser) {
      // console.log('VALID TOKEN')
      req.user = validUser;
      next();
    } else {
      // console.log('NOT VALID TOKEN')
      res.send(false);
    }
  });

  orgAdminController(router);

};