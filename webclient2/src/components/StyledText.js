import * as React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles/style.js'

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function TrademarkText(props) {
  return <Text {...props} style={[props.style, styles.base1Text, { fontFamily: 'verdana' }]} />;
}