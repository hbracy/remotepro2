const initialState = {
  socketConnection: '',
  gettingContacts: false,
  gettingContactsError: null,
  contacts: [],
  messages: [],
  gettingFiles: false,
  files: [],
  fileDataToDisplay: null,
  gettingDriveFiles: false,
  gettingWork: false,
  currentWorkItem: null,
  addingWorkLane: false,
  addWorkLaneSuccess: false,
  addingWorkItem: false,
  addWorkItemSuccess: false,
  changingStatus: false,
  changedStatusSuccess: false,
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

    case 'GET_GOOGLE_DRIVE_FILES':
      console.log('DISPATCHING GET_GOOGLE_DRIVE_FILES');
      return {
        ...state,
        gettingDriveFiles: true,

      }

    case 'RECIEVED_GOOGLE_DRIVE_FILES':
      console.log('DISPATCHING RECIEVED_GOOGLE_DRIVE_FILES');
      return {
        ...state,
        gettingDriveFiles: false,
        files: action.files,
        currentFilePath: action.currentFilePath
      }

    case 'RECIEVED_GOOGLE_FILE_TO_OPEN':
      console.log('DISPATCHING RECIEVED_GOOGLE_FILE_TO_OPEN');
      return {
        ...state,
        gettingDriveFiles: false,
        currentFilePath: action.path,
        fileDataToDisplay: action.fileDataToDisplay,
      }

    case 'GET_WORK_ITEM':
      console.log('DISPATCHING GET_WORK');
      return {
        ...state,
        gettingWork: true,
      }
      
    case 'RECIEVED_WORK_ITEM':
      console.log('DISPATCHING RECIEVED_WORK');
      return {
        ...state,
        gettingWork: false,
        currentWorkItem: action.workItem,
      }

    case 'ADD_WORK_LANE':
      console.log('DISPATCHING ADD_WORK_LANE');
      return {
        ...state,
        addingWorkLane: true,
      }
      
    case 'RECIEVED_WORK_LANE':
      console.log('DISPATCHING RECIEVED_WORK_LANE');
      return {
        ...state,
        addingWorkLane: false,
        addWorkLaneSuccess: action.success,
      }

    case 'ADD_WORK_ITEM':
      console.log('DISPATCHING ADD_WORK_ITEM');
      return {
        ...state,
        addingWorkItem: true,
      }
      
    case 'ADDED_WORK_ITEM':
      console.log('DISPATCHING ADDED_WORK_ITEM');
      return {
        ...state,
        addingWorkItem: false,
        currentWorkItem: action.updatedParent,
      }

    case 'CHANGE_STATUS':
      console.log('DISPATCHING CHANGE_STATUS');
      return {
        ...state,
        changingStatus: true,
      }
      
    case 'CHANGED_WORK_STATUS':
      console.log('DISPATCHING CHANGED_WORK_LANE');
      return {
        ...state,
        changingStatus: false,
        currentWorkItem: action.updatedParent,
      }

    default:
      return state;
  }
}
