const assert = require('assert');

const orgsAPI = require('../database-apis/orgs-api.js');




describe('orgs-api', function() {
  const existingTestOrg = {
    _id: '5ea324336f6f7965847ea4af',
    org_name: 'myTestOrgName',
    users: [
      { email: 'test3', _id: '5ea1d04ea1dca8463ccbd60b', adminLevel: 1 }
    ]
  };
  const existingTestUser = { 
    email: 'test3', 
    _id: '5ea1d04ea1dca8463ccbd60b', 
    adminLevel: 1 
  };

  let randomTestOrgName = Math.floor(Math.random() * Math.floor(100000)).toString();
  let randomUser = {
   email: Math.floor(Math.random() * Math.floor(100000)).toString(),
   _id: '00000',
   adminLevel: 1
  };

  const userThatDoesntExist = {

  }

  describe('#insertOrg()', () => {
    it('should return the updated org from an org that already exists', async () => {
      const org = await orgsAPI.insertOrg(existingTestOrg.org_name, randomUser);

      assert.deepEqual(org.users[org.users.length - 1].email, randomUser.email);
    });

    it('should return the new org from random inputs', async () => {
      const org = await orgsAPI.insertOrg(randomTestOrgName, randomUser);
      assert.deepEqual(org.users[org.users.length - 1].email, randomUser.email);
    });






  });

  // describe('#findOrgFromName()', () => {
  //   it('should return the org from the given name', async () => {
  //     const fileInfo = await orgsAPI.findOrgFromName(testOrgName);
  //     assert.equal(toCompareFileInsert.fileURL, fileInfo.filenames[0]);
  //   });
  // });

});






