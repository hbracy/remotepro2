import * as React from 'react';
// // import { View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
// // import { Video } from 'expo-av';
// // import { Header } from 'react-native-elements';

// import { toggleLoginSignup, toggleLogin, toggleSignup } from '../constants/actions.js';

// import { styles } from '../styles/style.js'

import Container from './Container.js';
import Header from './Header.js';
import Footer from './Footer.js';
import MyBackgroundImage from './MyBackgroundImage.js';
import LoginSignupModal from './LoginSignupModal.js';
import LoginModal from './LoginModal.js';
import SignupModal from './SignupModal.js';
import LandingScroll from './LandingScroll.js';

// import { MonoText } from '../components/StyledText';

const isSmallWindow = window.width < 800;
const backgroundImageFileName = 'morning.jpg';

function LandingPage(props) {

  return (

    <Container className={'flexColumn'}>

      <Container className={'base3'}>
        <Header isSmallWindow={isSmallWindow} />
      </Container>
        <MyBackgroundImage className={'container8'} backgroundImagePath={backgroundImageFileName}>
          <Container className={'relativePosition flexColumn ' + props.className}>
            <Container className={'absolutePosition full noColor'}>
              {
                <div className={'allAroundMargin slightlyCurvedTransparentBorder fullWidth'}>
                <LandingScroll />
                </div>
              }
            </Container>

            <Container>
              <Container/>
              <Container>
                {
                  !props.isLoggedIn && props.loginSignupModalIsActive && <LoginSignupModal className={'container1 relativePosition'} />
                }
                {
                  !props.isLoggedIn && props.loginModalIsActive && <LoginModal className={'container1 relativePosition'} />
                }
                {
                  !props.isLoggedIn && props.signupModalIsActive && <SignupModal className={'container1 relativePosition'} />
                }
              </Container>
              <Container/>
            </Container>
            <Container>
              <Container/>
              <Container/>
              <Container/>
              <Container/>
            </Container>
          </Container>
        </MyBackgroundImage>
      <Container className={'base4'}>
        <Footer isSmallWindow={isSmallWindow} />
      </Container>
    </Container>


  );




//   let tileData = [
//     {
//       name: 'tile1'
//     },
//     {
//       name: 'tile2'
//     },
//     {
//       name: 'tile2'
//     }
//   ];

//   const textArray = [ 'Files', 'Text', 'Calling', 'Files', 'Email', 'Editing', 'Remote Work',];

//   const imageStyle = [{
//     'height': '100%',
//     'width': '100%',
//     'resizeMode': 'stretch'
//   }]



//       // <ScrollView style={[ styles.container1, styles.flexColumn, 
//       //                     styles.base2, 
//       //                     styles.allAroundMargin, 
//       //                     styles.curvedBase2Border,
//       //                     styles.topMargin]}
//       //             contentContainerStyle={[styles.container1]}>
//       //   {tiles}
//       // </ScrollView>

//         // <View style={[styles.fifteenPercentHeight, styles.white, styles.bottomBorder]} title={tileData[0]} >
//         //   <Container style={[styles.allAroundMargin, ,]} >
//         //   </Container>
//         // </View>
//   let count = 0;
//   const [text, setText] = React.useState(textArray[count]);


//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       if (count < textArray.length - 1) {
//         count += 1;

//       } else {
//         count = 0
//       }
//       setText(textArray[count]);
//   }, 4000);
//   }, [])

//                 // <Image 
//                 //   source={require('../assets/images/example.png')}
//                 //   style={[styles.container1, styles.flexRow, styles.transparentBorder]}
//                 //   imageStyle={imageStyle}
//                 //   resizeMode='stretch'
//                 // />
//   let upperRightCornerStyling = [];
//   let textStyling = [];

//   // if (text == 'Remote Pro') {
//   //   upperRightCornerStyling = [
//   //     styles.darkRed,
//   //     styles.centerCenter
//   //   ];
//   //   textStyling = [
//   //     styles.whiteText, styles.largeFont
//   //   ]
//   // } else {
//     upperRightCornerStyling = [
//       styles.centerCenter
//     ]
//     textStyling = [
//       styles.darkRedText, styles.largeFont
//     ]

//   // }
//       //                 // <MonoText style={textStyling}>{text}</MonoText>

//   return (
//     <Container style={[styles.flexColumn]}>
//         <View style={[styles.fullHeight, styles.white]} title={tileData[0]}>

//           <Container style={[styles.allAroundMargin, styles.base4, styles.curvedBase4Border]}>
//             <MonoText style={[styles.whiteText, styles.largeFont]}>{'Remote Pro'}</MonoText>
//           </Container>

//           <Container style={[styles.flexColumn, styles.allAroundMargin]} >
//             <Container style={[]} >
//               <MonoText style={[styles.base4Text, styles.largeFont]}>{'STRUGGLING to run your business FROM HOME?'}</MonoText>
//             </Container>
//             <Container>
//             </Container>
//           </Container>

//           <Container style={[styles.flexRow, styles.container9]} >

//             <Container style={[styles.allAroundMargin, styles.curvedBase4Border, styles.base4]}>
//               <MonoText style={[styles.whiteText, styles.largeFont]}>{'SIGN UP to WIN the chance to be one of our FIRST users'}</MonoText>
//             </Container>

//             <Container style={[styles.allAroundMargin, styles.curvedBase4Border]} >
//               <Video
//                 source={require('../assets/videos/demo.mov')}
//                 rate={1.0}
//                 volume={1.0}
//                 isMuted={true}
//                 resizeMode="stretch"
//                 shouldPlay
//                 isLooping
//                 style={[styles.fullHeight, styles.fullWidth]}
//               />
//             </Container>

//           </Container>

//         </View>
//       <View style={[styles.fullHeight, styles.white]} title={tileData[1]} >
//         <Container style={[styles.allAroundMargin]} >
//         </Container>
//       </View>
//       <View style={[styles.fullHeight, styles.white]} title={tileData[2]} >
//         <Container style={[styles.allAroundMargin,]} >
//         </Container>
//       </View>
//     </Container>
//   );
}

function mapStateToProps(state) {
  return {
    loginSignupModalIsActive: state.modalReducer.loginSignupModalIsActive,
    signupModalIsActive: state.modalReducer.signupModalIsActive,
    loginModalIsActive: state.modalReducer.loginModalIsActive,
    isLoggedIn: state.modalReducer.isLoggedIn,
  };
}

export default connect(mapStateToProps)(LandingPage);



