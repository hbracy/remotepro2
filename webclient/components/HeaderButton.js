import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/style.js'
import { useNavigation } from '@react-navigation/native';
	// console.log("YEAH")
  import ContactsDrawer from '../screens/ContactsDrawer.js'
import DrawerNavigator from '../navigation/DrawerNavigator.js'
import { CommonActions, DrawerActions } from '@react-navigation/native';

import { TrademarkText } from '../components/StyledText';

export default function HeaderButton({style, onPress, title, textColor }) {

  return(
      <TouchableOpacity style={[styles.container1, 
                                styles.curvedBase2Border, 
                                styles.allAroundMargin, 
                                styles.base2, 
                                styles.centerCenter,
                                style,]}
        onPress={onPress}>
        <TrademarkText style={[textColor]}>{title}</TrademarkText>
      </TouchableOpacity>

  );

}


    // <View style={[styles.container1, styles.curvedBase2Border, styles.sideMargins, styles.base2]}>
