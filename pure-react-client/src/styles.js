
let headerHeight = window.height / 7;
let deviceWidth = window.width;
let deviceHeight = window.height;

// const theme = {
//   base1: '#ffff',
//   base2: 'mediumpurple',
//   base3: 'indianred',
//   base4: '#f194ff',
// }

// #669df6

const theme = {
  base1: '#d1ccc7', // text color
  base3: '#6d6d6d', //textunderlay
  base2: '#323232', // background
  base4: '#000000', // brand
  // base5: '#bbbbb9'
  base5: '#d1ccc7',
  white: '#ffffff',
  darkRed: '#66154b'
}



let standardMargin = 10;

let conditionalWidth = '25%'
let conditionalContainer = 5
if (deviceWidth < 600) {
  conditionalWidth = '50%';
  conditionalContainer = 1;
}


const styles = {

  container1: {
    flex: 1,
    flexShrink: 0
  },

  container2: {
    flex: 2,
    flexShrink: 0

  },
  container3: {
    flex: 3,
    flexShrink: 0
  },
  container4: {
    flex: 4,
    flexShrink: 0
  },
  container5: {
    flex: 5,
    flexShrink: 0
  },

  container6: {
    flex: 6,
    flexShrink: 0
  },

  container7: {
    flex: 7,
    flexShrink: 0
  },

  container8: {
    flex: 8,
    flexShrink: 0
  },
  container9: {
    flex: 9,
    flexShrink: 0
  },
  container10: {
    flex: 10,
    flexShrink: 0
  },

  conditionalContainer: {
    flex: conditionalContainer,
    flexShrink: 0
  },

  flex1: {
    flex: 1
  },
  flex0: {
    flex: 0
  },

  zIndex1: {
    zIndex: 1
  },
  zIndex2: {
    zIndex: 2
  },
  zIndex3: {
    zIndex: 3
  },
  zIndex4: {
    zIndex: 4
  },
  zIndex5: {
    zIndex: 5
  },
  zIndex6: {
    zIndex: 6
  },

  flexRow: {
    flexDirection: 'row',

  },
  flexColumn: {
    flexDirection: 'column'
  },

  alwaysBiggerThanChildren: {
    alignSelf: 'flex-start'
  },

  centered: {
    alignItems: 'center'
  },

  fixedHeader: {
    minHeight: headerHeight,
    lineHeight: headerHeight,
    marginBottom: headerHeight
  },

  leftRight: {
    position: 'absolute',
    left: 0,
    right: 0
  },

  sixtyPercentWidth: {
    width: '60%'
  },

  // fullDeviceWidth: {
  //   width: window.width
  // },
  // fullDeviceHeight: {
  //   height: window.height
  // },

  fullDeviceWidth: {
    'width': '1400'
  },
  fullDeviceHeight: {
    'height': '10000'
  },

  eightyPercentDeviceWidth: {
    width: window.width * 0.8
  },
  eightyPercentDeviceHeight: {
    height: window.height * 0.8
  },
  base1: {
    backgroundColor: theme.base1
  },
  base2: {
    backgroundColor: theme.base2,
  },
  base3: {
    backgroundColor: theme.base3
  },
  base4: {
    backgroundColor: theme.base4
  },

  base5: {
    backgroundColor: theme.base5
  },

  darkRed: {
    backgroundColor: theme.darkRed
  },


  noColor: {
    backgroundColor: 'transparent'
  },

  whiteText: {
    color: 'white'
  },

  redText: {
    color: '#9f2278'
  },
  darkRedText: {
    color: '#66154b'
  },

  base1Text: {
    color: theme.base1
  },

  base2Text: {
    color: theme.base2
  },


  base4Text: {
    color: theme.base4
  },

  verticalCenter: {
    justifyContent: 'center'
  },

  flexStartRight: {
    alignSelf: 'flex-end'
  },

  largeFont: {
    fontSize: 30
  },
 mediumFont: {
    fontSize: 20
  },

  smallFont: {
    fontSize: 10
  },

  boldText: {
    fontWeight: 'bold'
  },

  textAlignRight: {
    textAlign: 'right'
  },

  flexEnd: {
    justifyContent: 'flex-end'
  },

  popdownBox: {
    backgroundColor: theme.base4,
    borderColor: '#888',
    borderRadius: 10
  },

  topBottomPadding: {
    paddingBottom: 10,
    paddingTop: 10
  },

  fixedHeader: {

  },

  right: {
    right: 0
  },
  left: {
    left: 0
  },

  conditionalWidth: {
    width: conditionalWidth
  },

  twentyPercentHeight: {
    height: '20%'
  },
  tenPercentHeight: {
    height: '10%'
  },

  seventyPercentHeight: {
    height: '70%'
  },
  eightyPercentWidth: {
    width: '80%'
  },


  eightyPercentHeight: {
    height: '80%'
  },
  ninetyPercentHeight: {
    height: '90%'
  },

  ninetyPercentWidth: {
    width: '90%'
  },
  ninetyFivePercentWidth: {
    width: '95%'
  },

  ninetyPercentDeviceWidth: {
    width: deviceWidth * 0.9
  },
  ninetyPercentDeviceHeight: {
    height: deviceHeight * 0.9
  },

  transparentBorder: {
    borderWidth: 5,
    borderColor: 'transparent',
    borderRadius: 10

  },

  curvedBase1Border: {
    borderWidth: 5,
    borderColor: theme.base1,
    borderRadius: 10
  },

  slightlyCurvedBase1Border: {
    borderWidth: 5,
    borderColor: theme.base1,
    borderRadius: 5
  },

  curvedBase2Border: {
    borderWidth: 5,
    borderColor: theme.base2,
    borderRadius: 10
  },

  curvedBase3Border: {
    borderWidth: 5,
    borderColor: theme.base3,
    borderRadius: 10
  },
  curvedBase4Border: {
    borderWidth: 5,
    borderColor: theme.base4,
    borderRadius: 10
  },

  curvedBase5Border: {
    borderWidth: 5,
    borderColor: theme.base5,
    borderRadius: 10
  },

  curvedWhiteBorder: {
    borderWidth: 5,
    borderColor: theme.white,
    borderRadius: 10
  },

  flexGrowZero: {
    flexGrow: 1
  },
  flexShrink: {
    flexShrink: 1
  },
  eightyPercentMaxHeight:{
    maxHeight:"80%"
  },
  verticalPadding: {
    paddingVertical: 20,

  },

  horizontalPadding: {
    paddingHorizontal: 20,
  },

  spaceAround: {
    justifyContent: 'space-around'
  },

  leftPadding: {
    paddingLeft: 10
  },

  topMargin: {
    marginTop: standardMargin
  },

  sideMargins: {
    marginRight: standardMargin,
    marginLeft: standardMargin
  },

  allAroundMargin: {
    marginTop: standardMargin,
    marginBottom: standardMargin,
    marginRight: standardMargin,
    marginLeft: standardMargin
  },

  allAroundMarginExceptBottom: {
    marginTop: standardMargin,
    marginRight: standardMargin,
    marginLeft: standardMargin
  },
  bottomBorder: {
        borderBottomColor: 'black',
        borderBottomWidth: 5
  },

  bottomMargin: {
    marginBottom: standardMargin,

  },

  centerText: {
    textAlign: 'center'
  },
  full: {
    width: '100%',
    height: '100%'
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  centerCenter: {
    alignItems: 'center', 
    // alignItems: 'stretch', 
    justifyContent: 'center'
  },
  oneThirdWidth: {
    width: '33%'
  },
  doubleWidth: {
    width: '200%'
  },
  halfHeight: {
    height: '50%'
  },
  halfWidth: {
    width: '50%'
  },
  quarterWidth: {
    width: '25%'
  },
  fortyFivePercentWidth: {
    width: '45%'
  },

  quarterHeight: {
    height: '25%'
  },

  tenPercentHeight: {
    height: '10%'
  },

  fifteenPercentHeight: {
    height: '12%'
  },

  eightyFivePercentHeight: {
    height: '88%'
  },
  redBorder: {
    borderColor: 'red', 
    borderWidth: 5
  },
  resizeModeContain: {
    resizeMode: 'contain'
  },
  resizeModeCover: {
    resizeMode: 'cover'
  },
  visibleOverflow: {
    overflow: 'visible'
  },
  absolutePosition: {
    position: 'absolute'
  },

  bottomPlacement: {
    bottom: 0
  },

  bottomPlacement2: {
    bottom: -100
  },
  topPlacement2: {
    top: -167
  },

  offsetFromTop: {
    top: -100
  },

  flexWrap: {
    // flexShrink: 1,
    flexWrap: 'wrap'
  },

  
  memeStyle: {
    fontFamily: 'MemeFont',
    color: 'white',
    textShadowRadius: 0,
    textShadowColor: '#000',
    shadowOpacity: 0,
    fontSize: 20

  },
  offsetTop: {
    textShadowOffset: { width: 0, height: -1 },
  },
  offsetBottom: {
    textShadowOffset: { width: 0, height: 1 },
  },
  offsetSide1: {
    textShadowOffset: { width: 1, height: 0 },
  },
  offsetSide2: {
    textShadowOffset: { width: -1, height: 0 },
  }




};


export { styles, theme }

// .popdown-box {
//   background-color: var(--base-4);
// /*  margin: calc(var(--header-height) + 3px) auto; */
//   margin: 6vh auto;
//   margin-right: 10px;
//   border: 1px solid #888;
//   width: 40%; /* Could be more or less, depending on screen size */
//   border-radius: 2vh;
//   min-height: 20%;
// }
 