let calendarAPI = require('../database/database-apis/calendar-api');

function createEvent(socket, user) {
  socket.on('createEvent', async newEvent => {
    console.log(newEvent, user);
    let createdEvent = await calendarAPI.createEvent(user, newEvent);
    socket.emit('createEvent', createdEvent);
  });
}

function getEvents(socket, user) {
  socket.on('getEvents', async () => {
    let events = await calendarAPI.getEvents(user);
    socket.emit('getEvents', events);
  });
}

function changeEventDetails(socket, user) {
  socket.on('changeEventDetails', async updatedEvent => {
    let event = await calendarAPI.changeEventDetails(user, updatedEvent);
    let events = await calendarAPI.getEvents(user);
    socket.emit('changeEventDetails', events);
  });
}


module.exports = {
  createEvent: createEvent,
  getEvents: getEvents,
  changeEventDetails: changeEventDetails,
}

