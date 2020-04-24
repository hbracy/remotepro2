export const TOGGLE_LOGINSIGNUP = 'TOGGLE_LOGINSIGNUP';
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
export const TOGGLE_SIGNUP = 'TOGGLE_SIGNUP';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_MESSAGE = 'TOGGLE_MESSAGE';
export const TOGGLE_SETTING_MODAL = 'TOGGLE_SETTING_MODAL';
export const TOGGLE_IS_LOGGED_IN = 'TOGGLE_IS_LOGGED_IN';


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
export function toggleMessageModal() {
  return { type: TOGGLE_MESSAGE };
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









