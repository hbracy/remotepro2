// External Imports
import React from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {createReduxLocationActions, listenForHistoryChange} from 'redux-location-state';
import {createBrowserHistory} from 'history';
import _ from 'lodash';

// Asset imports
import '../index.css';
import { setupParams }  from '../constants/syncUrlWithState.js'


// Library imports
import rootReducer from '../reducers/RootReducer.js'
import Container from './Container.js'
import LandingPage from './LandingPage.js'


export const store = setup();



export default function App(props) {
  const notificationSystem = React.createRef();

  return (
    <Provider store={store}>
      <div className={'fullDeviceWidth fullDeviceHeight'}>
        <LandingPage />
      </div>
    </Provider>
  );
}
        // <NotificationSystem ref={notificationSystem} />

      //   <div className={' container1 base3'}>
      //   </div>
      //   <div className={'container8 base1'}>
      //   </div>
      // </div>

//location is a React location object with the query object updated with the mapped values
function mapLocationToState(state, location) {
  switch (location.pathname) {
    case "/":
      const stateFromLocation = location.query;
      console.log('STATE:', state);
      return _.merge({}, state, stateFromLocation);

    // case "files/":
    //   const statdeFromLocation = location.query;
    //   console.log('STATE:', state);
    //   return _.merge({}, state, stateFromLocation);

    default:
      return state;
  }
}

function setup() {
  const history = createBrowserHistory();
  const {locationMiddleware, reducersWithLocation} = createReduxLocationActions(setupParams, mapLocationToState, history, rootReducer);
  const middleware = compose([locationMiddleware, thunk])
  const store = createStore(reducersWithLocation, applyMiddleware(...middleware));
  listenForHistoryChange(store, history);
  return store;

}
