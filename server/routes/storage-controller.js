
function saveFile(socket, storageTracker, user) {
  socket.on('saveFile', async fileData => {
    console.log('saveFile', fileData);
    let bucket = fileData.fileTitle.split('/')[0];
    fileData.fileTitle = fileData.fileTitle.replace(bucket + '/', '');
    console.log(bucket);
    let success = await storageTracker.saveFile(user, bucket, fileData);
    console.log('IS SUCCESS?',success)
    socket.emit('saveFile', success);
  });
}


function storageController(router, storageTracker) {





  // const sessionsTracker = new SessionsTrackerModule();

  router.post('/generateSignedUrl/:bucket', async (req, res) => {
    let signedUrl = await storageTracker.generateUrlToUploadFile(req.params.bucket, req.body.filename);
    res.send(signedUrl);
  });


  // respond with "hello world" when a GET request is made to the homepage
  router.get('/:bucket/:pathname*', async (req, res) => {
    // console.log(req.params)
    console.log('THIS IS THE BUCKET', req.params.bucket);
    let pathname
    if (req.params['0']) {
      pathname = req.params.pathname + req.params['0'];
    } else {
      pathname = req.params.pathname;
    }
    // console.log('Bucket:', req.params.bucket, 'Params:', pathname);

    let result;
    if (pathname.includes('.')) {
      result = await storageTracker.generateUrlToUploadFile(req.params.bucket, pathname);
      result = {
        signedUrl: result
      }
    } else {

      result = await storageTracker.getFileList(req.params.bucket, pathname);
    }
    // console.log('RESPONSE FROM /files/' + req.params.bucket + '/' + pathname, result);
    res.send(result);
  });

}
module.exports = {
  storageController: storageController,
  saveFile: saveFile
  // userTracker: userTracker
};
