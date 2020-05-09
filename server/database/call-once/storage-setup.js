


function setupStorage(storage) {

	async function createBucket() {
	  // Creates the new bucket
    let bucketName = 'remotepro';
	  await storage.createBucket(bucketName);
	  console.log('Bucket', bucketName, 'created.');
	}

	createBucket().catch(console.error);

}


module.exports = {
  setupStorage: setupStorage,
}

