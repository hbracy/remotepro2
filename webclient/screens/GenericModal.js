import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, homestylesheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import Modal from 'react-native-modal';
import { MonoText } from '../components/StyledText';
import onClickOutside from "react-onclickoutside";

import Modal from '../modals/Modal.js'

import { styles } from '../styles/style.js'


export default function GenericModal({navigation}) {

  return (
    <View style={[styles.fullHeight, styles.fullWidth, styles.centerCenter, ]}>
      <Modal navigation={navigation} style={[styles.halfHeight, styles.halfWidth, styles.base2, styles.curvedBase2Border, styles.centerCenter]}>
        <View style={[styles.quarterHeight, styles.eightyPercentWidth, styles.base4, styles.curvedBase4Border]}>
          <View>
          </View>
          <View style={[]}>
            <Text>{}</Text>
          </View>
            <View style={[]}>
            </View>
        </View>
      </Modal>
    </View>
  )
}
