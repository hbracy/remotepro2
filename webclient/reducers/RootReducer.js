import { combineReducers } from 'redux'
import socketReducer from './SocketReducer.js'
import modalReducer from './ModalReducer.js'

export default combineReducers({
  socketReducer,
  modalReducer
});
