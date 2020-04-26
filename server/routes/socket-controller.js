const UserTrackerModule = require('../models/user-tracker')

let userTracker = new UserTrackerModule();
let timesEmitted = 0;

function onSearchPotentialContact(socket, user) {

  socket.on('searchPotentialContact', async userSearch => {

      console.log(userSearch);

      let suggestions = await userTracker.searchTopFive(user.email, userSearch)

      console.log(suggestions);
   
      socket.emit('searchPotentialContact', suggestions);
      timesEmitted += 1;
      console.log(timesEmitted);
    
  });
}


module.exports = {
  onSearchPotentialContact: onSearchPotentialContact
}

