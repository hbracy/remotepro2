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
const io = require('socket.io')(server);
const os = require('os');
const { Storage } = require('@google-cloud/storage');


// Custom Imports
const consoleDBLog = require('./tools').consoleDBLog;
const coreDb = require('./database/core-db');
// const SocketTracker = require('./models/SocketTracker.js')

// Library Variables
const MongoClient = mongodb.MongoClient

// My Global Variables
const localhost = '0.0.0.0';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const projectId = 'remotepro'
const keyFilename = os.homedir() + '/secrets/remotepro2.json'
const storage = new Storage({projectId: projectId, keyFilename: keyFilename});


//Pre DB Setup
io.origins('*:*')
app.use(cors())
app.options('*', cors());


// Connect to the DB
coreDb.connect().then((db) => {
  // console.log(db);

  // Post DB setup
  require('./startup/register-routes')(app, storage);

  // One time functions. ALWAYS COMMENT OUT WHEN DONE
  // require('./database/call-once/session-store-setup.js').setupSessionStore();
  // require('./database/call-once/session-store-setup.js').insertToSessionStore();
  // require('./database/call-once/users-setup.js').setupUsers();
  // require('./database/call-once/orgs-setup.js').setupOrgs();
  // require('./database/call-once/storage-setup.js').setupStorage(storage);
  // require('./database/call-once/work-items-setup.js').setupWorkItems();

  // Start the http server
  server.listen(port, hostname, () => {
    consoleDBLog('Server running at http://' + hostname + ':' + port + '/');
  });

  // let socketTracker = new SocketTracker();
  // Start the websocket server
  io.on('connection', function (socket) {

    // When the connection is opened
    // clients[socket.id] = new Client(socket);
    // Make appropriate logs
    let ipAddress = socket.request.connection.remoteAddress;
    consoleDBLog('NEW CONNECTION FROM', ipAddress);

    socket.emit('serverConnection', "CONNECTED TO SERVER");
    // socketTracker.addSocket(socket);
    //Register socket listeners
    require('./startup/register-socket-listeners')(socket);

  });
}).catch((err) =>{
  console.log(err);
});



// Imports the Google Cloud client library.

// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md




// async function getBuckets() {
//   try {
//   const [buckets] = await storage.getBuckets();
 
//   console.log('Buckets:');
//   buckets.forEach((bucket) => { 
//     console.log(bucket.name);
//   });
// } catch (err) {
//   console.error('ERROR:', err);
// }


// }

// getBuckets()

// const bucketName = 'my-remote-probuclet';

// async function createBucket() {
//   // Creates the new bucket
//   await storage.createBucket(bucketName);
//   console.log(`Bucket ${bucketName} created.`);
// }

// createBucket().catch(console.error);




// Makes an authenticated API request.



// +--------------------------------------------------------------------+
// |                                 Basic Structure                    |
// |                                                    +------------+  |
// |                                                    |Router      |  |
// |                                                    |Express     <------+ request
// |                                                    |            |  |
// |                                                    +----+-------+  |
// |                                                         |          |
// |                                                         |          |
// |                                                 +-------v-------+  |
// |                                                 | Routes/Listene|  |
// |  +-------------+         +-------------+        | rs           +-------> response
// |  | database    |         |   models    |        | +-----------+ |  |
// |  |try/catching <--------->BusinessLogic<------->| |Protected  |    |
// |  |             |         |             |        | |routes     | |  |
// |  +-------------+         +------^------+        | +-----------+ |  |
// |                                 |               +---------------+  |
// |                                 |               +---------------+  |
// |                                 |               | Listeners     |  |
// |                                 |               | +-----------+ |  |
// |                                 +---------------+ |Protected  | |  |
// |                                                 | |listeners  | |  |
// |                                                 | +-----------+ |  |
// |                                                 +---------------+  |
// |                                                        ^           |
// |                                                        |           |
// |                                                 +------v--------+  |
// |                                                 | Socket      <--------> on/emit
// |                                                 |               |  |
// |                                                 +---------------+  |
// +--------------------------------------------------------------------+


// From asciiflow.com



