let usersAPI = require('../database/database-apis/users-api');
let messagesAPI = require('../database/database-apis/messages-api');

// let sessionStoreAPI = require('../database/database-apis/session-store-api');

const consoleDBLog = require('../tools').consoleDBLog;
const generateToken = require('../tools').generateToken;
const validateToken = require('../tools').validateToken;


function StorageTracker(storage) {

  this.generateUrlToUploadFile = async function generateUrlToUploadFile(bucket, filename) {
    let nowDate = new Date();
    const config = {
      version: 'v4',
      action: 'read',
      expires: nowDate.getTime() + (15 * 60 * 1000), // 15 minutes

    };
    try {
      let signedUrl = await storage.bucket(bucket).file(filename).getSignedUrl(config);
      console.log('SIGNED URL', signedUrl);

      // signedUrl = signedUrl[0].replace('https://storage.googleapis.com', 'https://storage.cloud.googleapis.com') // bug in node js google client

      return signedUrl[0];
    } catch(err) {
      console.error(err);
    }

  }


  this.getFileList = async function getFileList(bucket, pathname) {
    let prefix = '/'
    const options = {
      prefix: pathname,
      // delimiter : '/'
    };
    // let deli
    // if (delimiter) {
    //   options.delimiter = delimiter;
    // }

    try {
      const [files] = await storage.bucket(bucket).getFiles(options);
      // console.log('yuhoiobpvouhbijYUHOPIBHVBPJIVOUHBIPJU', files);
      let fileNames = []
      files.forEach((files) => { 
        fileNames.push(files.name);
      });
      // console.log('YEAHBABY', fileNames);
      // console.log('PATHNAME', pathname);
      let toReturnFileNames = listSubdirectoriesOnly(pathname, fileNames);
      // console.log('YEAHBABY2 ', toReturnFileNames);

      return toReturnFileNames
    } catch (err) {
      console.error('ERROR:', err);
    }

    return false

  }

  function listSubdirectoriesOnly(parentName, files) {
    let children = new Set();
    files.forEach(name => {
      name = name.replace(parentName, '');
      const splitString = name.split('/')
      console.log('SPLIT STRING', splitString);
      let childName = splitString.slice(1, 2).toString();
      if (childName != '') {
        children.add(childName);
      }
    });
    return Array.from(children);
  }

  return this;
}


module.exports = StorageTracker

