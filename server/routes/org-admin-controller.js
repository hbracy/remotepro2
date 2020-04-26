const OrgTrackerModule = require('../models/org-tracker')

let orgTracker = new OrgTrackerModule();

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
};

















