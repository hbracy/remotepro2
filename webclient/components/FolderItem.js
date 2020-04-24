import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { styles } from '../styles/style.js';


export default function FolderItem({ item }) {

  return (
    <TouchableOpacity onPress={() => console.log("CLICK")} style={[styles.container1, styles.centerCenter]}>
      <Text> <Entypo name="folder" size={40} color="mediumpurple"/></Text>
      <Text>{item.data.name}</Text>
    </TouchableOpacity>
  );
}
