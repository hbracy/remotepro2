let socketListeners = require("../routes/socket-controller.js");
const tools = require('../tools');





module.exports = function(socket) {

  // Protect listeners
  socket.on('authorization', token => {
    const validUser = tools.validateToken(token);
    if (validUser) {
      // Register protected listeners here
     socketListeners.onSearchPotentialContact(socket, validUser);





    } else {
      socket.emit('mustLogin', 'Please login');
    }
  });


  // Register unprotected listeners here



}

