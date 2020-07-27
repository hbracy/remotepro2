import * as React from 'react';
import { connect } from 'react-redux';

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../actions/actions.js';

import Container from './Container.js';

function TemplateComponent(props) {

  return (
    <Container className={''}>
    </Container>
  );
}


function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(TemplateComponent);



