const assert = require('assert');
const axios = require('axios');


// const coreDb = require('../core-db');

describe('Storage Controller', function() {
  const testEmail = 'test6';
  const testPassword = 'test6';
  const testFileList = ['testdir/testFile.txt'];

  // describe('#/getPublicFileList', () => {
  //   it('should return the list of public file names', async () => {
  //     let response = await axios.get('http://localhost:3000/remotepro/getPublicFileList');
  //     assert.deepEqual(testFileList, response.data);
  //   });
  // });

  describe('#/generateSignedUrl', () => {
    it('should return a signedUrl', async () => {
      let response = await axios.post('http://localhost:3000/generateSignedUrl/remotepro', {filename: 'mysuperDuperFile.txt'});
      assert.equal(response.data[0].includes('mysuperDuperFile.txt'), true);
    });
  });


});
