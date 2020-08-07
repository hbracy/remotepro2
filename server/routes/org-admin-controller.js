const OrgTrackerModule = require('../models/org-tracker')
const orgsAPI = require('../database/database-apis/orgs-api');
const usersAPI = require('../database/database-apis/users-api');

let orgTracker = new OrgTrackerModule();

function addMemberToGroup(socket, user) {
  socket.on('addMemberToGroup', async data => {
    let result;
    if (data.memberId) {
      result = await orgsAPI.addMemberToGroup(data.memberId, data.email, data.orgId);
      console.log('RESULT1', result);
      result = await usersAPI.updateUserWithOrg({_id: data.orgId}, {email: data.email});
      console.log('RESULT2', result);
    } else {
      // send email to data.email
    }
    socket.emit('addMemberToGroup', result);
  });
}

function searchMembersToAddToGroup(socket, user) {
  socket.on('searchMembersToAddToGroup', async data => {
    let searchResults = await orgsAPI.searchMembersToAddToGroup(user.email, data.searchInput, data.orgId);
    socket.emit('searchMembersToAddToGroup', searchResults);
  });
}

function getUserOrgs(socket, user) {
  socket.on('getUserOrgs', async data => {
    let userOrgs = await orgsAPI.getUserOrgs(user.email);
    socket.emit('getUserOrgs', userOrgs);
  });
}


function orgAdminController(router) {

  // const sessionsTracker = new SessionsTrackerModule();

  // respond with "hello world" when a GET request is made to the homepage
  router.post('/reserved/test', function (req, res) {
    res.send(req.user);
  });

  router.post('/reserved/createNewOrg', async function (req, res) {
    console.log('GETTING REQUEST FOR /reserved/createNewOrg');
    // console.log(req.user);

    let adminUser = req.user;
    let orgName = req.body.orgName;

    let toSend = await orgTracker.createNewOrg(adminUser, orgName);

    res.send(toSend);
  });
}


module.exports = {
  orgAdminController: orgAdminController,
  getUserOrgs: getUserOrgs,
  searchMembersToAddToGroup: searchMembersToAddToGroup,
  addMemberToGroup: addMemberToGroup,
};

















