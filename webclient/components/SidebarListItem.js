import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';


// import { homestyles } from '../styles/homestyle.js'
import { styles } from '../styles/style.js'

import { TrademarkText } from '../components/StyledText';
import Modal from '../modals/Modal.js'

export default function SidebarListItem({style, onPress, text}) {
  return(
      <TouchableOpacity style={[ styles.base3, ]}
        onPress={onPress}>
        <View style={[styles.base3 ]}>
          <TrademarkText style={[styles.mediumFont, ]}>{text}</TrademarkText>
        </View>
      </TouchableOpacity>
  );
}

// , styles.curvedBase4Border


    // <View style={style, [styles.container1, styles.curvedBase4Border,styles.base1, styles.flexShrink, ]}>
