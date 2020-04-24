'use strict';

// Imports
const http = require('http');
const express = require('express');
const app = express();
const server = http.Server(app);
// const io = require('socket.io')(server);
const path = require('path');
const mongodb = require('mongodb');
const cors = require('cors');
require('dotenv').config();
// const bodyParser = require('body-parser');

// Custom Imports
const consoleDBLog = require('./tools').consoleDBLog;
const coreDb = require('./database/core-db');

// Library Variables
const MongoClient = mongodb.MongoClient

// My Global Variables
const localhost = '0.0.0.0';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

//Pre DB Setup
// io.origins('*:*')
app.use(cors())
app.options('*', cors());

// Connect to the DB
coreDb.connect().then((db) => {
  // console.log(db);

  // Post DB setup
  require('./startup/register-routes')(app);

  // One time functions. ALWAYS COMMENT OUT WHEN DONE
  // require('./database/call-once/session-store-setup.js').setupSessionStore();
  // require('./database/call-once/session-store-setup.js').insertToSessionStore();
  // require('./database/call-once/users-setup.js').setupUsers();
  // require('./database/call-once/orgs-setup.js').setupOrgs();


  // Start the server
  server.listen(port, hostname, () => {
    consoleDBLog('Server running at http://' + hostname + ':' + port + '/');
  });
}).catch((err) =>{
  console.log(err);
});


// +--------------------------------------------------------------------+
// |                                 Basic Structure                    |
// |                                                    +------------+  |
// |                                                    |Router      |  |
// |                                                    |Express     <------+ request
// |                                                    |            |  |
// |                                                    +----+-------+  |
// |                                                         |          |
// |                                                         |          |
// |                                                         |          |
// |                                                         |          |
// |  +-------------+         +-------------+          +-----v------+   |
// |  | database    |         |   models    |          |routes      |   |
// |  |try/catching <--------->BusinessLogic<---------->Controller  +-------> response
// |  |             |         |             |          |            |   |
// |  +-------------+         +-------------+          +------------+   |
// |                                                                    |
// |                                                                    |
// +--------------------------------------------------------------------+










