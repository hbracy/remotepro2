import * as React from 'react';
import { View } from 'react-native';

import { styles } from '../styles/style.js'


export default function Container(props) {

  return (
      <View pointerEvents="box-none"
        style={[styles.container1,
                styles.flexRow,
                props.style,

              ]}>
        {props.children}
      </View>
  );
}
