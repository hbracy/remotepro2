import * as React from 'react';
import { connect } from 'react-redux';

import { goToWork, goToCalendar, goToFiles } from '../actions/actions.js';

import Container from './Container.js';
import HeaderButton from './HeaderButton.js';


function Footer(props) {

  return (
    <Container className={''}>
      <HeaderButton title="Work"
        //Turn off everything if isSmallWindow
        onPress={() => props.dispatch(goToWork())}
        className={'base1 curvedBase1Border'}
        textColor={'base2Text'}
      />
      <HeaderButton title="Calendar"
        //Turn off everything if isSmallWindow
        onPress={() => props.dispatch(goToCalendar())}
        className={'base1 curvedBase1Border'}
        textColor={'base2Text'}
      />
      <HeaderButton title="Files"
        //Turn off everything if isSmallWindow
        onPress={() => props.dispatch(goToFiles())}
        className={'base1 curvedBase1Border'}
        textColor={'base2Text'}
      />
    </Container>
  );
}


function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(Footer);



