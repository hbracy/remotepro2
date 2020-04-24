// getFilesFromEmail

const coredb = require('../core-db');


async function getFilesFromEmail(email) {
  const db = await coredb.getOrConnect();

  const result = await db.collection('users').findOne( {email: email} );
  const filenames = result.filenames;
  return filenames;

}



async function insertFileForEmail(email, filename) {
  const db = await coredb.getOrConnect();

  const query = {'email': email};
  const operation = {
    $addToSet: {
      "filenames": filename
    }
  };
  const options = {upsert: true};

  try {
    let result = await db.collection('users').findOneAndUpdate(query, operation, options);
    return result.value;
  } catch (err) {
    console.error(err);
    return false;
  }


}

module.exports = {
  insertFileForEmail: insertFileForEmail,
  getFilesFromEmail: getFilesFromEmail
}





