import * as React from 'react';
import { connect } from 'react-redux';

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../actions/actions.js';

import Container from './Container.js';

function MyBackgroundImage(props) {
  const backgroundImage = require('../assets/images/' + props.backgroundImagePath);

  return (
      <Container className={'base1 ' + props.className}>
        <div style={{backgroundImage: 'url(' + backgroundImage + ')'}}
          className={'container1 flexRow cover'}>
          {props.children}
        </div>
      </Container>

  );
}


function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(MyBackgroundImage);



