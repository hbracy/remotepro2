let orgsAPI = require('../database/database-apis/users-api');


function OrgTracker() {


  this.createNewOrg = async function createNewOrg(adminUser, orgName) {
    let toReturn = false;

    let org = await orgsAPI.findOrgFromName(orgName);
    if (!org) {
      let newOrg = await orgsAPI.insertOrg(orgName, adminUser);

      let adminLevel = 1;
      let updatedUser = await usersAPI.updateUserWithOrg(orgName, adminUser, adminLevel);
      


    } 

    return toReturn;

  }




  return this;
}


module.exports = OrgTracker




