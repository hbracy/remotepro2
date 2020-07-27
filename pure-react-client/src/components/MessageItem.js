import * as React from 'react';


// import { homestyles } from '../styles/homestyle.js'

import { TrademarkText } from './StyledText';

export default function MessageItem(props) {
  return(
      <div className={'allAroundMargin'}
        onPress={props.onPress}>
        <div className={'curvedBase2Border base2'}>
          <TrademarkText>{props.text}</TrademarkText>
        </div>
      </div>
  );
}

// , styles.curvedBase4Border


    // <View style={style, [styles.container1, styles.curvedBase4Border,styles.base1, styles.flexShrink, ]}>
