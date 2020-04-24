const assert = require('assert');
// const coreDb = require('../core-db');
let sessionAPI = require('../database-apis/session-store-api');

describe('Session Collection', function() {
  const testEmail = 'cynical_peace@gmail.com';
  const testSessionId = 'safadsubhijnoo';

  describe('#createSession()', () => {
    it('should return new session upon inserting a new session to the database', async () => {
      const inserted = await sessionAPI.upsertSession(testEmail, testSessionId);
      assert.equal(inserted.user_id, testEmail);
      assert.equal(inserted.session_id, testSessionId);
    });
  });


  // More tests go here

});
