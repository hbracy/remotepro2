import * as React from 'react';

import { TrademarkText } from './StyledText';

import Container from './Container.js';


export default function HeaderButton(props) {
  return(
    <div className={'container1 curvedBase2Border allAroundMargin base2 centerCenter pointer ' + props.className}
      onClick={props.onPress}>
      <TrademarkText className={props.textColor}>{props.title}</TrademarkText>
    </div>
  );
}


    // <View style={[styles.container1, styles.curvedBase2Border, styles.sideMargins, styles.base2]}>
