import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, homestylesheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import Modal from 'react-native-modal';
import { MonoText } from '../components/StyledText';
import onClickOutside from "react-onclickoutside";

import Modal from '../modals/Modal.js'

import { styles } from '../styles/style.js'


export default function LoginSignupModal({ navigation, onLogin, isOpen }) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     initial: true,
  //     login: false,
  //     signup: false,
  //     loginText: ''
  //   }

  const [initial, setInitial] = React.useState(true);
  const [login, setLogin] = React.useState(false);
  const [signup, setSignup] = React.useState(false);
  const [loginData, setLoginData] = React.useState({ 
    email: '',
    password: ''
  });





const handleClick = event => {
  console.log("YYYEEEEET")
  onLogin(loginData)
}

  //   // this.props.onLogin().bind(this);
  //   // this.onLogin = this.onLogin.bind(this);
  // }

  // onLogin() {
  //   console.log("HEREEREE");
  //   console.log(this.props);
  //   this.props.onLogin(this.state.loginText);
  // }

  function modalControl() {
    console.log(loginData);
    if (login) {
      return (
        <Modal navigation={navigation} 
          style={[styles.flexColumn, 
            styles.spaceAround, 
            styles.allAroundMargin, 
            styles.halfHeight, 
            styles.sixtyPercentWidth, 
            styles.base2, 
            styles.curvedBase2Border, 
            styles.centerCenter]
          }
        >

          <View style={[styles.base4, styles.curvedBase4Border]}>
            <TextInput
              style={[styles.fullHeight]}
              placeholder="Email"
              onChangeText={text => setLoginData({email: text})}
            />
          </View>
          <View style={[styles.base4, styles.curvedBase4Border]}>
            <TextInput
              style={[styles.fullHeight]}
              placeholder="Password"
              onChangeText={text => setLoginData({password: text})}
            />
          </View>
          <View style={[styles.curvedBase2Border, styles.fortyFivePercentWidth]}>
            <Button title="Login" color="#f194ff" onPress={handleClick} />
          </View>
        </Modal>
      );
    } else if (signup) {
      return (
        <Modal navigation={navigation} 
          style={[styles.flexRow, 
            styles.spaceAround, 
            styles.allAroundMargin, 
            styles.halfHeight, 
            styles.eightyPercentWidth, 
            styles.base2, 
            styles.curvedBase2Border, 
            styles.centerCenter]
          }
        >
          <View style={[styles.curvedBase2Border, styles.fortyFivePercentWidth]}>
            <Button title="Sign Up" color="#cd5c5c" onPress={() => {this.setState({signup: true})}} />
          </View>
        </Modal>

      );
    } else {
      console.log("HERE WE ARE" + isOpen)
      return (
        <Modal navigation={navigation}
          isOpen={isOpen}
          style={[styles.flexColumn, 
            styles.spaceAround, 
            styles.allAroundMargin, 
            styles.quarterHeight, 
            styles.eightyPercentWidth, 
            styles.base2, 
            styles.curvedBase2Border, 
            styles.centerCenter]
          }
        >
          <View>
            <Text style={[styles.whiteText]}>You must sign up or login</Text>
          </View>
          <View style={[styles.flexRow, styles.fullWidth]}>
            <View style={[styles.curvedBase2Border, styles.fortyFivePercentWidth]}>
              <Button title="Login" color="#f194ff" onPress={setLogin(true)} />
            </View>
            <View style={[styles.curvedBase2Border, styles.fortyFivePercentWidth]}>
              <Button title="Sign Up" color="#cd5c5c" onPress={() => {this.setState({signup: true})}} />
            </View>
          </View>
        </Modal>

      );
    }
  }




  return (
    // <View style={[styles.fullHeight, styles.fullWidth, styles.centerCenter, ]}>
    modalControl()
    // </View>
  );




}
