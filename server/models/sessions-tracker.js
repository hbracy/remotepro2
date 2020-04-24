
let sessionStoreAPI = require('../database/database-apis/session-store-api');

function SessionTracker() {

  this.checkSession = function checkSession(sid) {
    return sessionStoreAPI.checkSession(sid);

  }

  function createSession(uid, sid) {

  }


  return this;
}


module.exports = SessionTracker



