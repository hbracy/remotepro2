import * as React from 'react';

import { TrademarkText } from '../components/StyledText';

export default function SidebarListItem(props) {
  return(
      <div className={'base2 centerCenter pointer ' + props.className}
        onClick={props.onPress}>
        <div className={'base2 curvedBase2Border'}>
          <TrademarkText>{props.text}</TrademarkText>
        </div>
      </div>
  );
}
