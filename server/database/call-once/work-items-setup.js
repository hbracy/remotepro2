const coreDb = require('../core-db');
let db = coreDb.get();

async function setupWorkItems() {
  console.log('SETTING UP WORK ITEMS')
  // db.collection('workItems').createIndex( { 'id': 1 }, { unique: true } )
  // db.collection('workItems').dropIndex({ 'id': 1 });

  let testWorkItem = {
    title: 'Finish Remote Pro',
    status: 'Doing',
    assignee: 'test3',
    creator: 'test3',
    parent: null,
    description: 'Remote Pro is a personal project that I hope to eventually sell to businesses so that they can scale their remote operations.'
    lanes: [
      {id: 'To Do', order: 0},
      {id: 'Doing', order: 1},
      {id: 'Done', order: 2}
    ],
    comments: [
      {
        creator: 'test3',
        dateCreated: '2020-07-14T15:28:04.099Z',
        text: 'This here is a comment'
      },
      {
        creator: 'test3',
        dateCreated: '2020-07-14T15:28:05.099Z',
        text: 'This here is a comment 2'

      },
      {
        creator: 'test3',
        dateCreated: '2020-07-14T15:28:06.099Z',
        text: 'This here is a comment 3'
      }
    ],
    subItems: [
      // {
      //   title: 'Display Work Viewer',
      //   order: 4,
      //   id: '3',
      //   status: 'Doing',
      //   assignee: 'test3',
      // },
      // {
      //   title: 'Establish Work Viewer API',
      //   order: 2,
      //   id: '4',
      //   status: 'To Do',
      //   assignee: 'test3',
      // },
      // {
      //   title: 'Connect Front End With Back End',
      //   order: 1,
      //   id: '5',
      //   status: 'To Do',
      //   assignee: 'test3',
      // },
      // {
      //   title: 'Establish Testing Suite',
      //   order: 1,
      //   id: '6',
      //   status: 'Done',
      //   assignee: 'test3',
      // }
    ]
  }

  try {
    let result = await db.collection('workItems').insertOne(testWorkItem);
    console.log(result)
    return result.ops[0];
  } catch (err) {
    console.error(err);
    return false;
  }


}


module.exports = {
  setupWorkItems: setupWorkItems,
}

