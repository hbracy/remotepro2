const initialState = {
  socketConnection: '',
  gettingContacts: false,
  gettingContactsError: null,
  contacts: [],
  messages: [],
  gettingFiles: false,
  files: [],
  fileDataToDisplay: null
}

// CHange name to networkdatareducer

export default function socketReducer(state = initialState, action) {
  switch (action.type) {
    case 'CONNECT_TO_SOCKET':
      console.log("DISPATCHING CONNECT_TO_SOCKET");
      return {
        ...state,
        socketConnection: action.socket
      };

    case 'SET_CONTACTS':
      console.log("DISPATCHING SET_CONTACTS");
      return {
        ...state,
        contacts: action.contacts
      };


    case 'GET_CONTACTS_START':
      console.log("DISPATCHING GET_CONTACTS_START");    
      return {
        ...state,
        gettingContacts: true
      };

    case 'GET_CONTACTS_ERROR':
      return {
        ...state,
        gettingContacts: false,
        gettingContactsError: action.error
      };

    case 'RECIEVED_CONTACTS':
      return {
        ...state,
        gettingContacts: false,
        contacts: action.contacts
      };

    case 'GET_MESSAGES_START':
      console.log("DISPATCHING GET_MESSAGES_START");    
      return {
        ...state,
        gettingMessages: true
      };

    case 'GET_MESSAGES_ERROR':
      return {
        ...state,
        gettingMessages: false,
        gettingMessagesError: action.error
      };

    case 'RECIEVED_MESSAGES':
          console.log("DISPATCHING RECIEVED_MESSAGES");    

      return {
        ...state,
        gettingMessages: false,
        messages: action.messages
      };

    case 'GET_ORG_FILES':
      console.log('DISPATCHING GET_ORG_FILES');
      return {
        ...state,
        gettingOrgFiles: true,

      }

    case 'RECIEVED_ORG_FILES':
      console.log('DISPATCHING RECIEVED_ORG_FILES');
      return {
        ...state,
        gettingOrgFiles: false,
        files: action.files,
        currentFilePath: action.currentFilePath
      }

    case 'RECIEVED_FILE_TO_OPEN':
      console.log('DISPATCHING RECIEVED_FILE_TO_OPEN');
      return {
        ...state,
        gettingOrgFiles: false,
        currentFilePath: action.path,
        fileDataToDisplay: action.fileDataToDisplay,
      }


    default:
      return state;
  }
}
