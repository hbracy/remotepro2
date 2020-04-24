const orgsAPI = require('../database/database-apis/orgs-api');
const usersAPI = require('../database/database-apis/users-api');

function OrgTracker() {

  this.createNewOrg = async function createNewOrg(adminUser, orgName) {

    const org = await orgsAPI.findOrgFromName(orgName);
    console.log("EXISTING ORG", org);
    if (!org) {

      const adminLevel = 1;
      const orgReferenceToUser = {
        email: adminUser.email,
        _id: adminUser._id,
        adminLevel: adminLevel
      }

      const newOrg = await orgsAPI.insertOrg(orgName, orgReferenceToUser);

      const updatedUser = await orgsAPI.updateUserWithOrg(orgName, adminUser);


      
// && updatedUser
      if (newOrg && updatedUser) {
        return newOrg;

      }
      // const orgUserPair = 

    } 

    return false;

  }




  return this;
}


module.exports = OrgTracker




