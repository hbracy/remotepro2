import * as React from 'react';
import { connect } from 'react-redux';


// import { homestyles } from '../styles/homestyle.js'

import { TrademarkText } from './StyledText';

function MessageItem(props) {
  console.log(props);
  const isFromMe = props.item.fromEmail == props.username
  console.log(isFromMe);

  const isFromMeParentStyle = 'marginRight'
  const notFromMeParentStyle = ''
  const parentStyle = isFromMe ? isFromMeParentStyle : notFromMeParentStyle;

  const isFromMeStyle = 'base6'
  const notFromMeStyle = 'base2'
  const style = isFromMe ? isFromMeStyle : notFromMeStyle;

  return(
    <div className={'container1 ' + parentStyle}>
      <div className={'slightAllAroundMargin eightyPercentMaxWidth transparentBorder ' + style}>
        <TrademarkText className={'wrapWords'}>{props.item.message}</TrademarkText>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    username: state.socketReducer.username
  };
}

export default connect(mapStateToProps)(MessageItem);

// , styles.curvedBase4Border


    // <View style={style, [styles.container1, styles.curvedBase4Border,styles.base1, styles.flexShrink, ]}>
