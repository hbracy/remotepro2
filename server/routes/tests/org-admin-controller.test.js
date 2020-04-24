const assert = require('assert');
const axios = require('axios');

// const coreDb = require('../core-db');

describe('Org Admin Controller', function() {
  const testEmail = 'test3';
  const testPassword = 'test3';

  describe('#reserved/test', () => {
    it('should return the user upon making a request to the user', async () => {

      let response = await axios.post('http://localhost:3000/authenticate/login', {
        email: testEmail,
        password: testEmail
      });

      assert.equal(response.data.email, testEmail);
      let authToken = response.data.authToken;

      response = await axios.post('http://localhost:3000/reserved/test', {someRequest: 'hello'}, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      });
      assert.equal(response.data.email, testEmail);
    });

    it('should return false upon sending a malformed token', async () => {

      let badToken = 'thisisAbadEtokeninsasf';

      response = await axios.post('http://localhost:3000/reserved/test', {someRequest: 'hello'}, {
        headers: {
          'Authorization': 'Bearer ' + badToken
        }
      });
      assert.equal(response.data, false);
    });

    it('should return false upon sending an old token', async () => {

      let badToken = 'eyJhbGciOiJIUzI1NiIsInR39CI6IkpXVCJ9.eyJlbWFpbCI6IjE3OTI1IiwiX2lkIjoiNWVhMjE5M2IyN2IzMmYzZTQ0MzkwMGUwIiwiaWF0IjoxNTg3NjgxNTk1LCJleHAiOjE1ODc3Tmc5OTV9.RUVrHGmcAZmeqt4yjV6x615LRUYTuoMqG47Z63Ntxlw';
      
      response = await axios.post('http://localhost:3000/reserved/test', {someRequest: 'hello'}, {
        headers: {
          'Authorization': 'Bearer ' + badToken
        }
      });
      assert.equal(response.data, false);
    });
  });
});











