import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/style.js'
import { useNavigation } from '@react-navigation/native';
	// console.log("YEAH")
  // import ContactsDrawer from '../screens/ContactsDrawer.js'
import DrawerNavigator from '../navigation/DrawerNavigator.js'
import { CommonActions, DrawerActions } from '@react-navigation/native';

import HeaderButton from '../components/HeaderButton.js';

export default function MainHeader({ navigation, route, onDrawerToggle }) {
  // const navigation = useNavigation();
  // console.log(navigation)
  // const [toggleValue, setToggleValue] = React.useState(false);

  // console.log("HERE " + toggleValue)


  // function handleOnClick(toggleValue) {
  //   setToggleValue(!toggleValue);
  //   onDrawerToggle(!toggleValue);
  // }

  return (
    <View style={[styles.fullWidth, styles.base3]}>
      <View style={[styles.allAroundMargin, styles.flexRow, styles.spaceAround]}>
          <HeaderButton 
            onPress={() => navigation.navigate('Home', {drawerIsActive: true, isClearingScreen: false})}
            title="Contacts"
          />
          <HeaderButton 
            onPress={() => {navigation.navigate('LoginSignupModal')}}                  
            title="QuickTalk"
          />
          <HeaderButton 
            onPress={() => {navigation.navigate('Home', {loginModalIsActive: true, isClearingScreen: false})}}                  
            title="Profile"
          />
      </View>
    </View>
  );


  //   test("Tests Testing", () => {
  //     expect(true);
  //   // const component = create(<Button text="SUBSCRIBE TO BASIC" />);
  //   // const instance = component.getInstance();
  //   // expect(instance.state.text).toBe("");
  // });



}

  // describe("Button component", () => {
  //   test("Tests Testing", () => {
  //     expect(true);
  //   })
  // });

