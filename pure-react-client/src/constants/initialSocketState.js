export const initialSocketState = {
  socketConnection: '',
  gettingContacts: false,
  gettingContactsError: null,
  conversations: [],
  messages: [],
  gettingDriveFiles: false,
  gettingWork: false,
  currentWorkItem: null,
  currentWorkItemId: null,
  addingWorkLane: false,
  addWorkLaneSuccess: false,
  addingWorkItem: false,
  addWorkItemSuccess: false,
  changingStatus: false,
  changedStatusSuccess: false,
  deletingWorkItem: false,
  creatingEvent: false,
  currentEventList: null,
  changingEvent: false,
  loginToken: localStorage.getItem('jwtToken'),
  username: '',
  socketAuthorized: false,
  gettingUserOrgs: false,
  userOrgs: [],
  settingsSuggestionData: null,
  gettingSearchAddToGroup: false,
  savingFile: false,

}