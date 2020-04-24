  const initialState = {
    loginSignupModalIsActive: false,
    loginModalIsActive: false,
    signupModalIsActive: false,
    sidebarIsActive: true,
    isLoggedIn: localStorage.getItem('jwtToken'),
    settingModalIsActive: false,
  }


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'TOGGLE_LOGINSIGNUP':
        console.log("DISPATCHING LOGINSIGNUP");
        return {
          ...state,
          // loginModalIsActive: false,
          // signupModalIsActive: false,
          loginSignupModalIsActive: !state.loginSignupModalIsActive 
        };
      case 'TOGGLE_LOGIN':
        console.log("DISPATCHING LOGIN");
        return {
          ...state,
          // signupModalIsActive: false,
          // loginSignupModalIsActive: false,
          loginModalIsActive: !state.loginModalIsActive
        };
      case 'TOGGLE_SIGNUP':
        console.log("DISPATCHING SIGNUP");
        return {
          ...state,
          // loginModalIsActive: false,
          // loginSignupModalIsActive: false,
          signupModalIsActive: !state.signupModalIsActive
        };
      case 'TOGGLE_SIDEBAR':
        console.log("DISPATCHING SIDEBAR TO", !state.sidebarIsActive);
        return {
          ...state,
          sidebarIsActive: !state.sidebarIsActive
        };
      case 'TOGGLE_MESSAGE':
        console.log("DISPATCHING MESSAGEMODAL TO", !state.messageModalIsActive);
        return {
        ...state,
          messageModalIsActive: !state.messageModalIsActive
        };
      case 'TOGGLE_SETTING_MODAL':
        console.log("DISPATCHING TOGGLE_SETTING_MODAL TO", !state.settingModalIsActive);
        return {
          ...state,
          settingModalIsActive: !state.settingModalIsActive
        };
      case 'TOGGLE_IS_LOGGED_IN':
        console.log("DISPATCHING TOGGLE_IS_LOGGED_IN TO", !state.isLoggedIn);
        return {
          ...state,
          isLoggedIn: !state.isLoggedIn
        };
      default:
        return state;
    }
  }
