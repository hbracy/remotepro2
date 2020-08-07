import * as React from 'react';
import { connect } from 'react-redux';

import { TrademarkText } from '../components/StyledText.js';

// import Modal from '../modals/Modal.js';
// import SidebarListItem from '../components/SidebarListItem.js';
// import LoginSignupModal from '../screens/LoginSignupModal.js';
// import HeaderButton from '../components/HeaderButton.js';
// import MobileScreen from '../components/MobileScreen.js';
import Container from './Container.js';
import Header from './Header.js';
import MyBackgroundImage from './MyBackgroundImage.js';
import FullScreenView from './FullScreenView.js';
import Sidebar from './Sidebar.js';
import Footer from './Footer.js';

import { connectToSocket, goToWork, goToCalendar, goToFiles } from '../actions/actions.js';

const isSmallWindow = window.width < 800;
const backgroundImageFileName = 'morning.jpg';

function HomeScreen(props) {
  const welcomeImageWidth = 2000
  const aspectRatio = 3 / 2;



  return (
    <Container className={'flexColumn'}>
      <Container className={'base3'}>
        <Header isSmallWindow={isSmallWindow} />
      </Container>

      <MyBackgroundImage className={'container8'} backgroundImagePath={backgroundImageFileName}>
        { isSmallWindow
          // <MobileScreen style={[styles.container1,]} />
        }
        {
          !isSmallWindow &&
          <Container>
            <Sidebar className={'container1'} />
            <FullScreenView className={'container5'} />
          </Container>
        }
      </MyBackgroundImage>

      <Container className={'base3'}>
        <Footer isSmallWindow={isSmallWindow} />
      </Container>
    </Container>
  );


          // { isSmallWindow &&
          //   <MobileScreen style={[styles.container1,]} />
          // }
          // {
          //   !isSmallWindow &&
          //   <View style={[styles.container1, styles.flexRow]}>
          //     <Sidebar style={[styles.container1]} />
          //     <FullScreenView isSmallWindow={isSmallWindow}
          //     style={[styles.container5]} />
              
          //   </View>
          // }


  // return (
  //   <View style={[styles.container1]}>
  //     <Container style={[styles.container1,styles.base3,]}>
  //       <Header isSmallWindow={isSmallWindow}
  //         style={[]}/>
  //     </Container>
  //     <Container style={[styles.container8]}>
  //       <ImageBackground source={backgroundImage} 
  //         style={[styles.container1, styles.flexRow, styles.base5]}
  //         imageStyle={backgroundImageStyle}>
  //         { isSmallWindow &&
  //           <MobileScreen style={[styles.container1,]} />
  //         }
  //         {
  //           !isSmallWindow &&
  //           <View style={[styles.container1, styles.flexRow]}>
  //             <Sidebar style={[styles.container1]} />
  //             <FullScreenView isSmallWindow={isSmallWindow}
  //             style={[styles.container5]} />
              
  //           </View>
  //         }
  //       </ImageBackground>
  //     </Container>
  //     <Container style={[styles.container1, styles.base2]}>
  //       <HeaderButton title="Work"
  //         //Turn off everything if isSmallWindow
  //         onPress={() => props.dispatch(goToWork())}
  //         style={[styles.container1, styles.curvedBase1Border, styles.base1]}
  //         textColor={styles.base2Text}
  //       />
  //       <HeaderButton title="Calendar"
  //         //Turn off everything if isSmallWindow
  //         onPress={() => props.dispatch(goToCalendar())}
  //         style={[styles.container1, styles.curvedBase1Border, styles.base1]}
  //         textColor={styles.base2Text}
  //       />
  //       <HeaderButton title="Files"
  //         //Turn off everything if isSmallWindow
  //         onPress={() => props.dispatch(goToFiles())}
  //         style={[styles.container1, styles.curvedBase1Border, styles.base1]}
  //         textColor={styles.base2Text}
  //       />

  //     </Container>
  //   </View>
  // );
}

function mapStateToProps(state) {
  return {
    loginSignupModalIsActive: state.modalReducer.loginSignupModalIsActive,
    signupModalIsActive: state.modalReducer.signupModalIsActive,
    loginModalIsActive: state.modalReducer.loginModalIsActive,
    messageModalIsActive: state.modalReducer.messageModalIsActive,
    sidebarIsActive: state.modalReducer.sidebarIsActive,
    isLoggedIn: state.modalReducer.isLoggedIn,
    socketConnection : state.socketReducer.socketConnection,
  };
}

export default connect(mapStateToProps)(HomeScreen);

