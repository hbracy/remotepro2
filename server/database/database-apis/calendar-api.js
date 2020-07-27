const coreDb = require('../core-db');
const ObjectId = require('mongodb').ObjectID;

async function createEvent(user, newEvent) {
  const db = await coreDb.getOrConnect();
  let createdEvent = null;
  console.log(newEvent);
  newEvent.creator = user.email
  newEvent.participants = [user.email]
  newEvent.start = new Date(newEvent.start);
  newEvent.end = new Date(newEvent.end);
  newEvent.allDay = newEvent.allDay


  try {
    createdEvent = await db.collection('events').insertOne(newEvent);
    createdEvent = createdEvent.ops[0];
  } catch (err) {
    console.log(err);
    createdEvent = false;
  }
  console.log(createdEvent);
  return createdEvent;
}

async function getEvents(user) {
  const db = await coreDb.getOrConnect();
  let events = null;
  try {
    // events = await db.collection('events').aggregate([{$addFields: {'date': {$dateFromString: { dateString: '$start'}}}}, {$match: {'participants': user.email}}]).toArray();
    events = await db.collection('events').find({'participants': user.email}).toArray();
  } catch (err) {
    console.log(err);
    events = false;
  }
  console.log(events);
  return events;
}

async function changeEventDetails(user, updatedEvent) {
  const db = await coreDb.getOrConnect();
  let event = null;
  const query = {'_id': new ObjectId(updatedEvent._id)};
  const operation = {
    $set: {
      'start': updatedEvent.start,
      'end': updatedEvent.end,
      'title': updatedEvent.title,
      'creator': updatedEvent.creator,
      'participants': updatedEvent.participants,
    }
  }
  const options = {
    returnOriginal: false,
  };

  try {
    event = await db.collection('events').findOneAndUpdate(query, operation, options);
  } catch (err) {
    console.log(err);
    event = false;
  }
  console.log(event);
  return event;
}



module.exports = {
  getEvents: getEvents,
  createEvent: createEvent,
  changeEventDetails: changeEventDetails,
}

