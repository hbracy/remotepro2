import { combineReducers } from 'redux'
import socketReducer from './SocketReducer.js'
import modalReducer from './ModalReducer.js'
import {reducer as notifications} from 'react-notification-system-redux';




const appReducer = combineReducers({
  socketReducer,
  modalReducer,
  notifications
});


export default function rootReducer(state, action) {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
