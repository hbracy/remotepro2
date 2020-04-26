import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, ImageBackground, Platform, homestylesheet, TouchableOpacity, TouchableHighlight, Dimensions, TextInput, Text , View, Button, FlatList, SectionList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

// import { homestyles } from '../styles/homestyle.js'
import { styles } from '../styles/style.js'

import { TrademarkText } from '../components/StyledText';

import { connectToSocket } from '../constants/actions.js';


import Modal from '../modals/Modal.js';
import SidebarListItem from '../components/SidebarListItem.js';
import LoginSignupModal from '../screens/LoginSignupModal.js';
import Header from '../components/Header.js';
import FullScreenView from '../components/FullScreenView.js';
import HeaderButton from '../components/HeaderButton.js';
import Sidebar from '../components/Sidebar.js';
import Container from '../components/Container.js';
import MobileScreen from '../components/MobileScreen.js';


let loggedIn = false;

const win = Dimensions.get('window');

const isSmallWindow = win.width < 800;

// const backgroundImage = {uri: '../assets/images/opportunity.jpg'}
const backgroundImage = require('../assets/images/opportunity.jpg')

const backgroundImageStyle = [{
  'height': '100%',
  'width': '100%',
  'resizeMode': 'cover'
}]



function HomeScreen(props) {
  const welcomeImageWidth = 2000
  const aspectRatio = 3 / 2;

  React.useEffect(() => {
    props.dispatch(connectToSocket());
  }, []);

  return (
    <View style={[styles.container1]}>
      <Container style={[styles.container1,styles.base3,]}>
        <Header isSmallWindow={isSmallWindow}
          style={[]}/>
      </Container>
      <Container style={[styles.container8]}>
        <ImageBackground source={backgroundImage} 
          style={[styles.container1, styles.flexRow]}
          imageStyle={backgroundImageStyle}>
          { isSmallWindow &&
            <MobileScreen style={[styles.container1,]} />
          }
          {
            !isSmallWindow &&
            <View style={[styles.container1, styles.flexRow]}>
              <Sidebar style={[styles.container1]} />
              <FullScreenView isSmallWindow={isSmallWindow}
                style={[styles.container5]} />
            </View>
          }
        </ImageBackground>
      </Container>
      <Container style={[styles.container1, styles.base2]}>
      </Container>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    loginSignupModalIsActive: state.modalReducer.loginSignupModalIsActive,
    signupModalIsActive: state.modalReducer.signupModalIsActive,
    loginModalIsActive: state.modalReducer.loginModalIsActive,
    messageModalIsActive: state.modalReducer.messageModalIsActive,
    sidebarIsActive: state.modalReducer.sidebarIsActive,
    socketConnection : state.socketReducer.socketConnection,

  };
}

export default connect(mapStateToProps)(HomeScreen);

