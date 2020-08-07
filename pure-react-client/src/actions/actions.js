import * as React from 'react';
import { store } from '../components/App.js';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import fs from 'fs';
import readline from 'readline';
import Notifications from 'react-notification-system-redux';

import setupCall from './CallingLogic.js'

import Container from '../components/Container.js';
import HeaderButton from '../components/HeaderButton.js';

// import google from 'googleapis';

// import fs = from'react-native-fs');

export const TOGGLE_LOGINSIGNUP = 'TOGGLE_LOGINSIGNUP';
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
export const TOGGLE_SIGNUP = 'TOGGLE_SIGNUP';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_MESSAGE = 'TOGGLE_MESSAGE';
export const TOGGLE_SETTING_MODAL = 'TOGGLE_SETTING_MODAL';
export const TOGGLE_IS_LOGGED_IN = 'TOGGLE_IS_LOGGED_IN';
export const TOGGLE_ADD_CONTACT_MODAL = 'TOGGLE_ADD_CONTACT_MODAL';
export const CONNECT_TO_SOCKET = 'CONNECT_TO_SOCKET';
export const GET_SOCKET_CONNECTION = 'GET_SOCKET_CONNECTION';
export const SET_CONTACTS = 'SET_CONTACTS';
export const GET_CONTACTS_START = 'GET_CONTACTS_START';
export const RECIEVED_CONTACTS = 'RECIEVED_CONTACTS';
export const RECIEVED_MESSAGES = 'RECIEVED_MESSAGES'
export const GET_MESSAGES_START ='GET_MESSAGES_START';
export const GET_ORG_FILES = 'GET_ORG_FILES';
export const RECIEVED_ORG_FILES = 'RECIEVED_ORG_FILES';
export const RECIEVED_FILE_TO_OPEN = 'RECIEVED_FILE_TO_OPEN';
export const GET_GOOGLE_DRIVE_FILES = 'GET_GOOGLE_DRIVE_FILES';
export const RECIEVED_GOOGLE_DRIVE_FILES = 'RECIEVED_GOOGLE_DRIVE_FILES';
export const RECIEVED_GOOGLE_FILE_TO_OPEN = 'RECIEVED_GOOGLE_FILE_TO_OPEN';
export const GO_TO_WORK = 'GO_TO_WORK';
export const GET_WORK_ITEM = 'GET_WORK_ITEM';
export const RECIEVED_WORK_ITEM = 'RECIEVED_WORK_ITEM';
export const ADD_WORK_LANE = 'ADD_WORK_LANE';
export const RECIEVED_WORK_LANE = 'RECIEVED_WORK_LANE';
export const ADD_WORK_ITEM = 'ADD_WORK_ITEM';
export const ADDED_WORK_ITEM = 'ADDED_WORK_ITEM';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const CHANGED_WORK_STATUS = 'CHANGED_WORK_STATUS';
export const GO_TO_CALENDAR = 'GO_TO_CALENDAR';
export const DELETE_WORK_ITEM = 'DELETE_WORK_ITEM';
export const DELETED_WORK_ITEM = 'DELETED_WORK_ITEM';
export const GO_TO_FILES = 'GO_TO_FILES';
export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATED_EVENT = 'CREATED_EVENT';
export const GET_EVENTS = 'GET_EVENTS';
export const RETRIEVED_EVENTS = 'RETRIEVED_EVENTS';
export const CHANGE_EVENT = 'CHANGE_EVENT';
export const CHANGED_EVENT = 'CHANGED_EVENT';
export const TEST = 'TEST';
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SESSION_EXPIRED = 'SESSION_EXPIRED';
export const LOGOUT = 'LOGOUT';
export const GETTING_USER_ORGS = 'GETTING_USER_ORGS';
export const RECIEVED_USER_ORGS = 'RECIEVED_USER_ORGS';
export const SEARCH_ADD_TO_GROUP = 'SEARCH_ADD_TO_GROUP';
export const SEARCHED_ADD_TO_GROUP = 'SEARCHED_ADD_TO_GROUP';
export const ADD_TO_GROUP = 'ADD_TO_GROUP';
export const ADDED_TO_GROUP = 'ADDED_TO_GROUP';
export const SAVING_FILE = 'SAVING_FILE';
export const SAVED_FILE = 'SAVED_FILE';
export const SENDING_CALL_REQUEST = 'SENDING_CALL_REQUEST';
export const CALL_REQUEST_FINISHED = 'CALL_REQUEST_FINISHED';
export const SETUP = 'SETUP';



// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

let historyStack = []
let socket;
// window.onpopstate = function(e){
//   historyStack.pop();
//   let url = location.href.replace('http://localhost:19006/', 'http://localhost:3000/');
//   store.dispatch(getFiles(url, true));
// };

socket = socketIOClient('http://localhost:3000');


export function test() {
  let testCurrentWorkItem = '5f10670f583b943c576dcd99';
  return {
    type: TEST,
    testCurrentWorkItem
  }
}


export function toggleLoginSignup() {
  return { type: TOGGLE_LOGINSIGNUP };
}
export function toggleLogin() {
  return { type: TOGGLE_LOGIN };
}
export function toggleSignup() {
  return { type: TOGGLE_SIGNUP };
}
export function toggleSidebar() {
  return { type: TOGGLE_SIDEBAR };
}
export function toggleMessageModal(contactEmail, conversationId) {
  return { 
    type: TOGGLE_MESSAGE,
    contactEmail: contactEmail,
    conversationId: conversationId
  };
}
export function toggleSettingsModal() {
  return {
    type: TOGGLE_SETTING_MODAL
  }
}
export function setLoginState(username, token) {
  return {
    type: SET_LOGIN_STATE,
    username,
    token
  }
}
export function toggleAddContactModal() {
  return {
    type: TOGGLE_ADD_CONTACT_MODAL
  }
}

export function goToWork() {
  return {
    type: GO_TO_WORK
  }
}


export function goToCalendar() {
  return {
    type: GO_TO_CALENDAR
  }
}

export function goToFiles() {
  return {
    type: GO_TO_FILES
  }
}


export function connectToSocket() {

  return (dispatch) => {
    socket.once('serverConnection', data => {
      console.log('SOCKET CONNECTION');
      // console.log(data);
      socket.emit('authorization', localStorage.getItem('jwtToken'));
      socket.once('mustLogin', data => {
        localStorage.removeItem('jwtToken');
        store.dispatch({
          type: SESSION_EXPIRED,
          token: null
        })
      });

      socket.once('authorized', loginData => {
        console.log('AUTHORIZED')
        store.dispatch({
          type: SET_LOGIN_STATE,
          token: loginData.token,
          username: loginData.username
        })

        socket.on('callRequest', caller => {
          const notificationOpts = {
            title: 'CALL',
            message: 'Call from ' + caller,
            position: 'tc',
            autoDismiss: 0,
            children: (
              <div className={'container1 flexRow'}>
                <HeaderButton  
                  onPress={() => {
                    socket.emit('answeredCallRequest');
                    setupCall(socket, caller, false);
                  }}
                  title={'ACCEPT'}
                />
                <HeaderButton  
                  onPress={() => console.log('ignore')}         
                  title={'IGNORE'}
                />
              </div>
            )
          };
          store.dispatch(Notifications.success(notificationOpts));
          // store.dispatch({
          //   type: SAVED_FILE,
          // });
        });

      });

    });
  }
}


export function authorizeSocket() {

  return (dispatch) => {
    console.log('SOCKET AUTHORIZATION');
    // console.log(data);
    socket.emit('authorization', localStorage.getItem('jwtToken'));
    store.dispatch({
      type: CONNECT_TO_SOCKET,
      socket: socket
    })
  }
}

export function logout() {
  return (dispatch) => {
    // console.log(data);
    localStorage.setItem('jwtToken', '');
    socket = socketIOClient('http://localhost:3000');
    store.dispatch({
      type: LOGOUT,
      socket,
      loginToken: ''
    })
  }
}


export function getSocketConnection() {
  return {
    type: GET_SOCKET_CONNECTION
  }
}

export function setContacts(contacts) {
  return {
    type: SET_CONTACTS,
    contacts
  }
}

// export function getConversations() {
//   let conversations = null;
//   let requestOptions = {
//     headers: {
//       authorization: 'Bearer ' + localStorage.getItem('jwtToken')
//     }
//   }

//   return async (dispatch) => {
//     store.dispatch({
//       type: GET_CONTACTS_START
//     });

//     let response = await axios.get('http://localhost:3000/reserved/getContacts', requestOptions);

//     if (response.data) {
//       conversations = response.data.reverse();
//     }

//     store.dispatch({
//       type: RECIEVED_CONTACTS,
//       conversations
//     });
//   }
// }

// export function getWorkItem(workItemId) {
//   return async (dispatch) => {
//     store.dispatch({
//       type: GET_WORK_ITEM
//     });

//     let response = await axios.get('http://localhost:3000/reserved/getWorkItem/' + workItemId, requestOptions);

//     if (response.data) {
//       currentWorkItem = response.data;
//     }

//     store.dispatch({
//       type: RECIEVED_WORK_ITEM,
//       currentWorkItem
//     });
//   }
// }

export function getUserOrgs() {
  socket.emit('getUserOrgs');
  return (dispatch) => { 
    store.dispatch({
      type: GETTING_USER_ORGS
    });

    socket.once('getUserOrgs', userOrgs => {
      console.log('YEAH GETTING USER ORGS', userOrgs)
      store.dispatch({
        type: RECIEVED_USER_ORGS,
        userOrgs
      });
    });
  }
}

export function getMessages(email, messageModalConversationId) {
  socket.emit('getMessages', {email: email, conversationId: messageModalConversationId});
  return (dispatch) => { 
    store.dispatch({
      type: GET_MESSAGES_START
    });

    socket.on('getMessages', messages => {
      console.log('YEAH GETTING MESSAGES', messages)
      store.dispatch({
        type: RECIEVED_MESSAGES,
        messages
      });
    });
  }
}

export function getWorkItem(workItemId) {
  console.log('GETTING WORK ITEM');
  socket.emit('getWorkItem', {workItemId: workItemId});
  return (dispatch) => { 
    store.dispatch({
      type: GET_WORK_ITEM
    });

    socket.once('getWorkItem', workItem => {
      console.log('YEAH GETTING WORK ITEM', workItem)
      store.dispatch({
        type: RECIEVED_WORK_ITEM,
        workItem
      });
    });
  }
}

export function getInitialWork(username) {
  console.log('GETTING INITIAL WORK ITEM');
  socket.emit('getInitialWorkItem', {username: username});
  return (dispatch) => { 
    store.dispatch({
      type: GET_WORK_ITEM
    });

    socket.once('getWorkItem', workItem => {
      console.log('YEAH GETTING WORK ITEM', workItem)
      store.dispatch({
        type: RECIEVED_WORK_ITEM,
        workItem
      });
    });
  }

}

export function addWorkLane(workItemId, laneId) {
  socket.emit('addWorkLane', {workItemId: workItemId, laneId: laneId});
  return (dispatch) => { 
    store.dispatch({
      type: ADD_WORK_LANE
    });

    socket.once('addWorkLane', success => {
      console.log('YEAH ADDING WORK LANE', success)
      store.dispatch({
        type: RECIEVED_WORK_LANE,
        success
      });
    });
  }
}


export function changeStatus(parentItem, newLaneId, workItemId, order) {
  console.log('NEW ORDER', order);
  const changeStatusData = {
    parent: parentItem._id,
    _id: workItemId,
    order: order,
    newStatus: newLaneId,
    creator: 'test3',
    assignee: 'test3',
  }

  socket.emit('changeStatus', changeStatusData);
  return (dispatch) => { 
    store.dispatch({
      type: CHANGE_STATUS
    });

    socket.once('changeStatus', updatedParent => {
      console.log('YEAH CHANGING WORK STATUS', updatedParent)
      store.dispatch({
        type: CHANGED_WORK_STATUS,
        updatedParent
      });
    });
  }
}

export function deleteWorkItem(workItemId) {
  console.log('deleting work item', workItemId);
  socket.emit('deleteWorkItem', workItemId);
  return (dispatch) => {
    store.dispatch({
      type: DELETE_WORK_ITEM
    });

    socket.once('deleteWorkItem', updatedParent => {
      console.log('YEAH DELETING WORK ITEM', updatedParent)
      store.dispatch({
        type: DELETED_WORK_ITEM,
        updatedParent
      });
    });
  }
}

export function addWorkItem(parentItem, card, laneId) {
  console.log('LOOK HERE', card, laneId);
  
  const workItemData = {
    parent: parentItem._id,
    title: card.title,
    status: laneId,
    creator: 'test3',
    assignee: 'test3',
    lanes: parentItem.lanes,
    description: card.description,
    label: card.label,
    subItems: []
  }

  socket.emit('addWorkItem', workItemData);
  return (dispatch) => { 
    store.dispatch({
      type: ADD_WORK_ITEM
    });

    socket.once('addWorkItem', updatedParent => {
      console.log('YEAH ADDING WORK ITEM', updatedParent)
      store.dispatch({
        type: ADDED_WORK_ITEM,
        updatedParent
      });
    });
  }
}

export function createEvent(newEvent) {
  // console.log(newEvent);
  let newEventDataToSend = {
    start: newEvent.start,
    end: newEvent.end,
    title: newEvent.title,
  }

  socket.emit('createEvent', newEventDataToSend);
  return (dispatch) => { 
    store.dispatch({
      type: CREATE_EVENT
    });


    socket.once('createEvent', createdEvent => {

      console.log('YEAH CREATING EVENT', newEvent)
      if (createdEvent){
        createdEvent.start = new Date(createdEvent.start);
        createdEvent.end = new Date(createdEvent.end);

        store.dispatch({
          type: CREATED_EVENT,
          createdEvent
        });
      }
    });
  }

}


export function getEvents() {

  socket.emit('getEvents');
  return (dispatch) => { 
    dispatch({
      type: GET_EVENTS
    });

    socket.once('getEvents', returnedEvents => {
      let events = []
      returnedEvents.map(event => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        events.push(event);
      });

      console.log('YEAH GETTING EVENTS', events)
      if (events){
        dispatch({
          type: RETRIEVED_EVENTS,
          events
        });
      }
    });
  }

}

export function changeEventDetails(changedEventDetails) {
  let newStart = changedEventDetails.start;
  let newEnd = changedEventDetails.end;
  let event = changedEventDetails.event;
  event.start = newStart;
  event.end = newEnd;

  socket.emit('changeEventDetails', event);

  return (dispatch) => {
    dispatch({
      type: CHANGE_EVENT
    });

    socket.once('changeEventDetails', updatedEvents => {
      console.log('RETURNED EVENTS', updatedEvents);
      if (updatedEvents) {
        let events = []
        updatedEvents.map(event => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
          events.push(event);
        });

        dispatch({
          type: CHANGED_EVENT,
          events
        });
      }
    });
  }


}


export function sendMessage(contactEmail, conversationId, text) {
  console.log('dispatching in sendmessage', text)

  socket.emit('sendMessage', {contactEmail: contactEmail, conversationId: conversationId, message: text});



  // return async (dispatch) => { 
  //   store.dispatch({
  //     type: GET_MESSAGES_START
  //   });

  //   await socket.on('getMessages', messages => {
  //     console.log('YEAH', messages)
  //     messages = messages.messages;
  //     store.dispatch({
  //       type: RECIEVED_MESSAGES,
  //       messages
  //     });
  //   });
  // }
}

// export function downloadFile()

export function getFiles(url, fromBack = false) {

  let path = url.replace('http://localhost:3000/', '');
  // let displayUrl = url.replace('http://localhost:3000/', 'http://localhost:19006/');

  // if (!fromBack) {
  //   window.history.pushState({},'', displayUrl);
  //   historyStack.push(displayUrl);
  // }
  // console.log(historyStack);

  let files = null;

  return async (dispatch) => {
    store.dispatch({
      type: GET_ORG_FILES
    });

    axios.get(url, {
      // responseType: 'arraybuffer',

      headers: {
        // 'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        // 'content-type': 'application/octet-stream',

      }
      // responseType: 'blob', // important

     }).then(async response => {
      if (response.data) {
        console.log(response.data.signedUrl)
        if (response.data.signedUrl) {
          let signedUrl = response.data.signedUrl;

          let fileToOpen = await axios.get(signedUrl);
          console.log('FILETODOWNLOAD', fileToOpen);
          console.log('ITS FILEPATH', path);
          console.log(fileToOpen);
          // fileToDownload.download();

          // const fileUrl = window.URL.createObjectURL(new Blob([fileToOpen.data]));
          // console.log('BLOBTYPE', fileUrl.type);
          store.dispatch({
            type: RECIEVED_FILE_TO_OPEN,
            currentFilePath: path,
            fileData: fileToOpen,
          });
        } else {
          files = response.data
          store.dispatch({
            type: RECIEVED_ORG_FILES,
            files: files,
            currentFilePath: path
          });
        }
       } else {
        alert(' SOMETHING WRONG WITH GET FILES');
      }

    })

  }

}







export function authorizeGoogleDrive() {
  // Load client secrets from a local file.
  // fs.readFile('credentials.json', (err, content) => {
  //   if (err) return console.log('Error loading client secret file:', err);
  //   // Authorize a client with credentials, then call the Google Drive API.
  //   console.log('CONTENT', content)
  //   authorize(JSON.parse(content), listFiles);
  // });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  // function authorize(credentials, callback) {
  //   const {client_secret, client_id, redirect_uris} = credentials.installed;
  //   const oAuth2Client = new google.auth.OAuth2(
  //       client_id, client_secret, redirect_uris[0]);

  //   // Check if we have previously stored a token.
  //   fs.readFile(TOKEN_PATH, (err, token) => {
  //     if (err) return getAccessToken(oAuth2Client, callback);
  //     oAuth2Client.setCredentials(JSON.parse(token));
  //     callback(oAuth2Client);
  //   });
  // }


  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  // function getAccessToken(oAuth2Client, callback) {
  //   const authUrl = oAuth2Client.generateAuthUrl({
  //     access_type: 'offline',
  //     scope: SCOPES,
  //   });
  //   console.log('Authorize this app by visiting this url:', authUrl);
  //   const rl = readline.createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //   });
  //   rl.question('Enter the code from that page here: ', (code) => {
  //     rl.close();
  //     oAuth2Client.getToken(code, (err, token) => {
  //       if (err) return console.error('Error retrieving access token', err);
  //       oAuth2Client.setCredentials(token);
  //       // Store the token to disk for later program executions
  //       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
  //         if (err) return console.error(err);
  //         console.log('Token stored to', TOKEN_PATH);
  //       });
  //       callback(oAuth2Client);
  //     });
  //   });
  // }

  /**
   * Lists the names and IDs of up to 10 files.
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  // function listFiles(auth) {
  //   const drive = google.drive({version: 'v3', auth});
  //   drive.files.list({
  //     pageSize: 10,
  //     fields: 'nextPageToken, files(id, name)',
  //   }, (err, res) => {
  //     if (err) return console.log('The API returned an error: ' + err);
  //     const files = res.data.files;
  //     if (files.length) {
  //       console.log('Files:');
  //       files.map((file) => {
  //         console.log(`${file.name} (${file.id})`);
  //       });
  //     } else {
  //       console.log('No files found.');
  //     }
  //   });
  // }

}




export function getGoogleDriveFiles(url) {


  let path = url.replace('http://localhost:3000/', '');
  let displayUrl = url.replace('http://localhost:3000/', 'http://localhost:19006/');

  window.history.pushState({},'', displayUrl);
  historyStack.push(displayUrl);
  // console.log(historyStack);

  let files = null;

  return async (dispatch) => {
    store.dispatch({
      type: GET_ORG_FILES
    });

    let response = await axios.get(url, { headers: {
                                            'Access-Control-Allow-Origin': '*',
                                          }
                                        });

    if (response.data) {
      console.log(response.data.signedUrl)
      if (response.data.signedUrl) {
        let signedUrl = response.data.signedUrl;

        let fileToOpen = await axios.get(signedUrl);
        console.log('FILETODOWNLOAD', fileToOpen);
        // fileToDownload.download();

        // const fileUrl = window.URL.createObjectURL(new Blob([fileToOpen.data]));
        // console.log('BLOBTYPE', fileUrl.type);
        store.dispatch({
          type: RECIEVED_GOOGLE_FILE_TO_OPEN,
          currentFilePath: path,
          fileDataToDisplay: fileToOpen.data,
        });
      } else {
        files = response.data
        store.dispatch({
          type: RECIEVED_GOOGLE_DRIVE_FILES,
          files: files,
          currentFilePath: path
        });
      }
     } else {
      alert(' SOMETHING WRONG WITH GET FILES');
    }
  }
}


export function searchMembersToAddToGroup(searchInput, orgId) {
  console.log(searchInput);
  socket.emit('searchMembersToAddToGroup', {searchInput: searchInput, orgId: orgId});

  return (dispatch) => {
    store.dispatch({
      type: SEARCH_ADD_TO_GROUP
    });

    socket.once('searchMembersToAddToGroup', results => {
      console.log('SEARCH RESULTS', results);
      if (!results.some((sug) => sug.email == searchInput)) {
        results.unshift({email: searchInput, _id: ''});
      }
      results.orgId = orgId;
      store.dispatch({
        type: SEARCHED_ADD_TO_GROUP,
        results
      });
    });
  }
}



export function toggleSettingSuggestion() {
  return (dispatch) => {
    store.dispatch({
      type: SEARCHED_ADD_TO_GROUP,
      results: null
    });
  }
}

export function addMemberToGroup(memberId, email, orgId) {
  console.log(memberId, email, orgId);
  socket.emit('addMemberToGroup', {memberId: memberId, email: email, orgId: orgId});

  return (dispatch) => {
    store.dispatch({
      type: ADD_TO_GROUP
    });

    socket.once('addMemberToGroup', result => {
      console.log('RESULT', result)
      store.dispatch({
        type: ADDED_TO_GROUP,
        result
      });
    });
  }

}

export function getConversations() {
  console.log('getting conversations');
  socket.emit('getConversations');
  return (dispatch) => { 
    store.dispatch({
      type: GET_CONTACTS_START
    });

    socket.once('getConversations', conversations => {
      console.log('YEAH GETTING conversations', conversations);
      store.dispatch({
        type: RECIEVED_CONTACTS,
        conversations
      });
    });
  }



  //       type: GET_CONTACTS_START
//     });

//     let response = await axios.get('http://localhost:3000/reserved/getContacts', requestOptions);

//     if (response.data) {
//       conversations = response.data.reverse();
//     }

//     store.dispatch({
//       type: RECIEVED_CONTACTS,
//       conversations

}

export function sendCallRequest(conversationId, isVideo) {
  socket.emit('sendCallRequest', {conversationId: conversationId});
  return (dispatch) => { 
    store.dispatch({
      type: SENDING_CALL_REQUEST
    });

    socket.once('answeredCallRequest', (userWhoAnswered) => {
      console.log('YEAH GOT CALL REQUEST', userWhoAnswered);
      const notificationOpts = {
        title: 'ANSWERED',
        message: userWhoAnswered + ' ANSWERED YOUR CALL',
        position: 'tc',
        autoDismiss: 0,
      };
      store.dispatch(Notifications.success(notificationOpts));
      store.dispatch({
        type: CALL_REQUEST_FINISHED,
      });
      setupCall(socket, userWhoAnswered, true)

    });
  }

}



export function openNewFile(currentFilePath) {
  return (dispatch) => {
    store.dispatch({
      type: RECIEVED_FILE_TO_OPEN,
      currentFilePath: currentFilePath,
      fileData: {title: 'Untitled', data: 'My new file'},
    });
  }

}

export function saveFile(fileText, fileTitle, fileDate) {
  console.log('saving File');
  // Emit save
  // Set saving to true
  // On successful result
  // upon success, set saving to false and saved to true

  // in backend:
  // on save write the file to program memory and a temp doc in mongo
  // when no one is editing the file save in google storage
  // Make sure that getFile checks mongo first
  // on success emit success


  socket.emit('saveFile', {fileText: fileText, fileTitle: fileTitle, fileDate: fileDate});
  return (dispatch) => { 
    store.dispatch({
      type: SAVING_FILE
    });

    socket.once('saveFile', success => {
      console.log('YEAH GETTING SAVING FILE', success);
      store.dispatch({
        type: SAVED_FILE,
      });
    });
  }

}







