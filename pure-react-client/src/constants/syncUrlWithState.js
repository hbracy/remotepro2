// See https://github.com/spotify/redux-location-state
// And https://engineering.atspotify.com/2017/08/10/thinking-of-state-in-a-world-of-urls/
// For more

import { initialModalState } from './initialModalState.js'
import { initialSocketState } from './initialSocketState.js'

export const setupParams = {
  '/': {
    username: {
      stateKey: 'socketReducer.username',
      initialState: initialSocketState.username,
      options: { shouldPush: true}

    },
    currentFilePath: {
      stateKey: 'socketReducer.currentFilePath',
      initialState: initialSocketState.currentFilePath,
      options: { shouldPush: true}
    },
    goToWork: {
      stateKey: 'modalReducer.goToWork',
      initialState: initialModalState.goToWork,
      type: 'bool',
      options: { shouldPush: true}
    },
    goToFiles: {
      stateKey: 'modalReducer.goToFiles',
      initialState: initialModalState.goToFiles,
      type: 'bool',
      options: { shouldPush: true}
    },

    goToFiles: {
      stateKey: 'modalReducer.goToFiles',
      initialState: initialModalState.goToFiles,
      type: 'bool',
      options: { shouldPush: true}
    },
    goToCalendar: {
      stateKey: 'modalReducer.goToCalendar',
      initialState: initialModalState.goToCalendar,
      type: 'bool',
      options: { shouldPush: true}
    },
    currentWorkItemId: {
      stateKey: 'socketReducer.currentWorkItemId',
      initialState: initialSocketState.currentWorkItemId,
      options: { shouldPush: true}
    },
  },
  'files/': {

  }
}