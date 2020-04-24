const assert = require('assert');
const axios = require('axios');

// const coreDb = require('../core-db');

describe('Authentication Controller', function() {
  const testEmail = 'test6';
  const testPassword = 'test6';

  describe('#/authenticate/login', () => {
    it('should return the user upon making a request to the user', async () => {

      let response = await axios.post('http://localhost:3000/authenticate/login', {
        email: testEmail,
        password: testPassword
      });
      assert.equal(response.data.email, testEmail);
    });
  });

  describe('#/authenticate/signup', () => {
    it('should return the user upon making a request to signup', async () => {
      let randomEmail = Math.floor(Math.random() * Math.floor(100000)).toString();
      let randomPassword = Math.floor(Math.random() * Math.floor(100000)).toString();
      let response = await axios.post('http://localhost:3000/authenticate/signup', {
        email: randomEmail,
        password: randomPassword
      });
      assert.equal(response.data.email, randomEmail);

    });
  });

  describe('#/authenticate', () => {
    it('should signup and request with the auth token- then return the auth_token', async () => {
      let randomEmail = Math.floor(Math.random() * Math.floor(100000)).toString();
      let randomPassword = Math.floor(Math.random() * Math.floor(100000)).toString();
      let response = await axios.post('http://localhost:3000/authenticate/signup', {
        email: randomEmail,
        password: randomPassword
      });
      assert.equal(response.data.email, randomEmail);

      let authToken = response.data.authToken;
      response = await axios.post('http://localhost:3000/authenticate', {
        authToken: authToken,
      });
      assert.equal(response.data.authToken, authToken);

    });
  });

});











