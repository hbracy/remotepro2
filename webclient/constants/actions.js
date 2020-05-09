import { store } from '../App.js';
import axios from 'axios';
import socketIOClient from "socket.io-client";
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
export const  GET_MESSAGES_START ='GET_MESSAGES_START';
export const GET_ORG_FILES = 'GET_ORG_FILES';
export const RECIEVED_ORG_FILES = 'RECIEVED_ORG_FILES';
export const RECIEVED_FILE_TO_OPEN = 'RECIEVED_FILE_TO_OPEN';

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


     }).then( async response => {
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








