import * as React from 'react';
import { connect } from 'react-redux';
import { EntypoFolder } from 'react-entypo';

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../actions/actions.js';

import Container from './Container.js';

function FileItem(props) {
  return (
    <div className={'maxContent allAroundMargin centerText pointer ' + props.className}
      onClick={props.onPress}>
        <EntypoFolder style={{'height': '3em', 'width': '3em', 'color': '#323232'}} className={''} />
        <div className={'opaque slightlyCurvedTransparentBorder whiteText'}>
          {props.text}
        </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(FileItem);



