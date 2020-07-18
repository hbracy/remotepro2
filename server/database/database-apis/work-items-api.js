const coreDb = require('../core-db');
const ObjectId = require('mongodb').ObjectID;

async function getWorkItem(user, workItemId) {
  const db = await coreDb.getOrConnect();
  let workItem = {};
  try {
    workItem = await db.collection('workItems').findOne({'_id': new ObjectId(workItemId)});
  } catch (err) {
    console.log(err);
    workItem = false;
  }
  return workItem;
}

async function addWorkLane(user, workItemId, laneId) {
  const db = await coreDb.getOrConnect();
  let success = false;
  const query = {'_id': new ObjectId(workItemId)};
  const options = {upsert: true};

  try {
    // Must first check the max order inserted and if the lane already exists
    workItem = await db.collection('workItems').findOne(query);
    let maxOrder = 0;
    workItem.lanes.map(lane => {
      if (lane.id == laneId) {
        success = false;
        return success;
      }
      if (lane.order > maxOrder) {
        maxOrder = lane.order;
      }
    });

    let newLane = {id: laneId, order: maxOrder + 1};
    const operation = {
      $addToSet: {
        'lanes': newLane
      }
    };
    success = await db.collection('workItems').findOneAndUpdate(query, operation, options);

  } catch (err) {
    console.log(err);
    success = false;
  }
  return success;
}

async function addWorkItem(user, workItem) {
  const db = await coreDb.getOrConnect();
  let updated = null;
  // Add workItem to parent
  // Give it order
  // Add workItem on it's own

  const parentQuery = {'_id': new ObjectId(workItem.parent)};

  try {
    let inserted = await db.collection('workItems').insertOne(workItem);
    inserted = inserted.ops[0];
    console.log('INSERTED:', inserted);
    parentWorkItem = await db.collection('workItems').findOne(parentQuery);
    console.log('PARENT WORK ITEM:', parentWorkItem);

    let maxOrder = 0;
    parentWorkItem.subItems.map(subItem => {
      if (subItem.status == inserted.status && subItem.order > maxOrder) {
        maxOrder = subItem.order;
      }
    });

    let newSubItem = {id: inserted._id, order: maxOrder + 1, title: inserted.title, status: inserted.status, assignee: inserted.assignee};
    const operation = {
      $addToSet: {
        'subItems': newSubItem
      }
    };
    const options = {
      returnOriginal: false,
    };
    updated = await db.collection('workItems').findOneAndUpdate(parentQuery, operation, options);
  } catch (err) {
    console.log(err);
    updated = false;
  }
  return updated;
}

async function changeWorkItemStatus(user, changeWorkItemStatusData) {
  const db = await coreDb.getOrConnect();
  let updatedParent = null;
  const childQuery = {'_id': new ObjectId(changeWorkItemStatusData._id)};
  const parentQuery = {'_id': new ObjectId(changeWorkItemStatusData.parent), 'subItems.id': new ObjectId(changeWorkItemStatusData._id)};

  try {

    const operationOnChild = {
      $set: {
        'status': changeWorkItemStatusData.newStatus
      }
    };


    let updated = await db.collection('workItems').findOneAndUpdate(childQuery, operationOnChild);
    console.log('OP ON CHILD', updated);

    // See https://docs.mongodb.com/manual/reference/operator/update/positional/ for more info
    const operationOnParent = {
      $set: {
        'subItems.$.status': changeWorkItemStatusData.newStatus,
        'subItems.$.order': changeWorkItemStatusData.order
      }
    };
    const options = {
      returnOriginal: false,
    };

    updatedParent = await db.collection('workItems').findOneAndUpdate(parentQuery, operationOnParent, options);
    console.log('OP ON PARENT:', updatedParent);

  } catch (err) {
    console.log(err);
    updatedParent = null;
  }
  return updatedParent;
}

module.exports = {
  // sendMessage: sendMessage,
  getWorkItem: getWorkItem,
  addWorkLane: addWorkLane,
  addWorkItem: addWorkItem,
  changeWorkItemStatus: changeWorkItemStatus,
}




