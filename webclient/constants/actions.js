import { store } from '../App.js';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import fs from 'fs';
import readline from 'readline';
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

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

let historyStack = []


const socket = socketIOClient('http://localhost:3000');
socket.on('serverConnection', data => {
  console.log(data);
  socket.on('mustLogin', data => {
    localStorage.removeItem('jwtToken');
  });
  socket.emit('authorization', localStorage.getItem('jwtToken'));
});

let requestOptions = {
  headers: {
    authorization: 'Bearer ' + localStorage.getItem('jwtToken')
  }
}

window.onpopstate = function(e){
  historyStack.pop();
  let url = location.href.replace('http://localhost:19006/', 'http://localhost:3000/');
  store.dispatch(getFiles(url, true));
};


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
export function toggleIsLoggedIn() {
  return {
    type: TOGGLE_IS_LOGGED_IN
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

export function connectToSocket() {
  return {
    type: CONNECT_TO_SOCKET,
    socket: socket
  }
}

export function getSocketCOnnection() {
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

export function getContacts() {
  let contacts = null;
  return async (dispatch) => {
    store.dispatch({
      type: GET_CONTACTS_START
    });

    let response = await axios.get('http://localhost:3000/reserved/getContacts', requestOptions);

    if (response.data) {
      contacts = response.data.reverse();
    }

    store.dispatch({
      type: RECIEVED_CONTACTS,
      contacts
    });
  }
}

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


export function getMessages(email, messageModalConversationId) {
  socket.emit('getMessages', {email: email, conversationId: messageModalConversationId});
  return async (dispatch) => { 
    store.dispatch({
      type: GET_MESSAGES_START
    });

    await socket.on('getMessages', messages => {
      console.log('YEAH GETTING MESSAGES', messages)
      store.dispatch({
        type: RECIEVED_MESSAGES,
        messages
      });
    });
  }
}

export function getWorkItem(workItemId) {
  socket.emit('getWorkItem', {workItemId: workItemId});
  return async (dispatch) => { 
    store.dispatch({
      type: GET_WORK_ITEM
    });

    await socket.on('getWorkItem', workItem => {
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
  return async (dispatch) => { 
    store.dispatch({
      type: ADD_WORK_LANE
    });

    await socket.on('addWorkLane', success => {
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
  return async (dispatch) => { 
    store.dispatch({
      type: CHANGE_STATUS
    });

    await socket.on('changeStatus', updatedParent => {
      console.log('YEAH CHANGING WORK STATUS', updatedParent)
      store.dispatch({
        type: CHANGED_WORK_STATUS,
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
  return async (dispatch) => { 
    store.dispatch({
      type: ADD_WORK_ITEM
    });

    await socket.on('addWorkItem', updatedParent => {
      console.log('YEAH ADDING WORK ITEM', updatedParent)
      store.dispatch({
        type: ADDED_WORK_ITEM,
        updatedParent
      });
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
  let displayUrl = url.replace('http://localhost:3000/', 'http://localhost:19006/');

  if (!fromBack) {
    window.history.pushState({},'', displayUrl);
    historyStack.push(displayUrl);
  }
  // console.log(historyStack);

  let files = null;

  return async (dispatch) => {
    store.dispatch({
      type: GET_GOOGLE_DRIVE_FILES
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
          // fileToDownload.download();

          // const fileUrl = window.URL.createObjectURL(new Blob([fileToOpen.data]));
          // console.log('BLOBTYPE', fileUrl.type);
          store.dispatch({
            type: RECIEVED_FILE_TO_OPEN,
            currentFilePath: path,
            fileDataToDisplay: fileToOpen.data,
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










