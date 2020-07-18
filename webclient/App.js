import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Dimensions } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderNavigator from './navigation/HeaderNavigator'
import useLinking from './navigation/useLinking';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import Constants from './tools/Constants';
import rootReducer from './reducers/RootReducer.js'


import { styles } from './styles/style.js'

const middleware = applyMiddleware(thunk);
export const store = createStore(rootReducer, middleware);


export default function App(props) {
  const win = Dimensions.get('window')
  const screen = Dimensions.get('screen')

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);



  const HEADER_ROUTE = 'home'
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'montserrat': require('./assets/fonts/Montserrat-Black.ttf'),
          'cooper-black': require('./assets/fonts/cooperBlack.ttf'),

        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);


  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    // console.log('RENDERING');

    return (
      <Provider store={store}>
        <View style={[styles.fullDeviceWidth, styles.fullDeviceHeight]}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <HeaderNavigator headerRoute={HEADER_ROUTE} isLoggedIn={true}
            style={[styles.container1]} />
        </View>
      </Provider>
    );
  }
} 

        // <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
        //   <Stack.Navigator 
        //     screenOptions={{
        //       headerShown: false
        //     }}
        //   >
        //     <Stack.Screen name="HeaderNavigator" component={HeaderNavigator} />
        //   </Stack.Navigator>

        // </NavigationContainer>



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
