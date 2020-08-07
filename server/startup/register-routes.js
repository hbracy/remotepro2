const express = require("express");
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
let router = express.Router();


let indexController = require("../routes/index");
let userController = require("../routes/user-controller").userController;
let orgAdminController = require("../routes/org-admin-controller").orgAdminController;
let storageController = require("../routes/storage-controller.js").storageController;

const tools = require('../tools');

module.exports = function(app, storageTracker) {

  app.use(express.json());
  app.use(router);
  indexController(router);


  // Construct a schema, using GraphQL schema language



  // Protect all reserved routes
  router.use('/reserved', function(req, res, next) {
    // check header or url parameters or post parameters for token
    console.log(req.headers)
    let token = req.headers.authorization;
    if (!token) return; //if no token, continue

    token = token.replace('Bearer ', '');

    const validUser = tools.validateToken(token);

    if (validUser) {
      console.log('VALID TOKEN')
      req.user = validUser;
      next();
    } else {
      console.log('NOT VALID TOKEN')
      res.send(false);
    }
  });

  userController(router);

  // give access to public files
  storageController(router, storageTracker);


  orgAdminController(router);

};