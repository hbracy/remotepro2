const assert = require('assert');
// const coreDb = require('../core-db');
let filesAPI = require('../database-apis/files-api.js');

describe('Files Collection', function() {
  const testEmail = 'test3';
  const toCompareFileInsert = {
    fileURL: 'https://myfile1.com',
  }

  describe('#insertFileForEmail()', () => {
    it('should return the inserted file document for a given user', async () => {
      const fileInfo = await filesAPI.insertFileForEmail(testEmail, toCompareFileInsert.fileURL);
      assert.equal(toCompareFileInsert.fileURL, fileInfo.filenames[0]);
    });

    it('should not duplicate the above insert with the same filename ', async () => {
      const fileInfo = await filesAPI.insertFileForEmail(testEmail, toCompareFileInsert.fileURL);
      assert(fileInfo.filenames.length < 2);
    });
  });

  describe('#getFilesFromEmail()', () => {
    const compareToURLs = [
      'https://myfile1.com',
    ];

    it('should return an array of urls for which the user with the email has permission to access', async () => {
      const resultArray = await filesAPI.getFilesFromEmail(testEmail);
      assert.deepEqual(resultArray, compareToURLs);
    });
    
  });


  // More tests go here

});
