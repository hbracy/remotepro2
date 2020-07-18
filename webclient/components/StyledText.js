import * as React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles/style.js'

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'cooper-black' }]} />;
}

export function TrademarkText(props) {
  return <Text {...props} style={[styles.base1Text, props.style, { fontFamily: 'verdana' }]} />;
}

export function TrademarkBigHeaderText(props) {
  return <Text {...props} style={[styles.base2Text, styles.boldText, styles.largeFont, props.style, { fontFamily: 'verdana' }]} />;
}