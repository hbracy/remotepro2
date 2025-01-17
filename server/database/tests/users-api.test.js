const assert = require('assert');
// const coreDb = require('../core-db');
let usersAPI = require('../database-apis/users-api');

describe('User Collection', function() {
  const testEmail = 'cynical_peace@gmail.com';
  const testPassword = 'safadsubhijnoo'
  describe('#insertUser()', () => {
    it('should return the user upon inserting a new user to the database', async () => {
      const insertStatus = await usersAPI.insertUser(testEmail, 'safadsubhijnoo');
      assert.equal(insertStatus.email, testEmail);
    });
  });

  describe('#findUserFromEmail()', () => {
    it('should return the user document', async () => {
      let user = await usersAPI.findUserFromEmail(testEmail)
      assert.notEqual(user, null);
      assert.equal(user.email, testEmail)
    });
  });

  describe('#updateUserWithOrg()', () => {
    it('should return the user with the new org info', async () => {

      const toUpdateUser = {
        email: testEmail
      }

      const newOrg = {
        org_name: 'myTestOrgName'
      }

      const user = await usersAPI.updateUserWithOrg(newOrg, toUpdateUser);
      // console.log(user);
      assert.deepEqual(user.orgs[user.orgs.length - 1], newOrg.org_name);
    });
  });


  describe('#verifyEmailAndPassword()', () => {
    it('should return true upon inserting a deleting user from the database', async () => {
      const user = await usersAPI.verifyEmailAndPassword(testEmail, testPassword);
      assert.equal(user.email, testEmail);
    });
  });

  describe('#deleteUser()', () => {
    it('should return true upon inserting a deleting user from the database', async () => {
      const deleteStatus = await usersAPI.deleteUser(testEmail);
      assert.equal(deleteStatus, true);
    });
  });




});
