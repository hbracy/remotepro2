import * as React from 'react';
// import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';

import ContactsDrawer from '../screens/ContactsDrawer.js'

jest.mock('expo', () => ({
  DrawerLoading: 'DrawerLoading',
}));

// jest.mock('../navigation/AppNavigator', () => 'AppNavigator');
// function TestContactsDrawer() {
//   return(
//   <View style={[styles.fullWidth, styles.fullHeight]}>
//     <Button title="Open drawer" onPress={() => navigation.openDrawer()} />

//   </View>
//   );
// }

describe('ContactsDrawer Component', () => {

  it('renders the contactsDrawer', () => {
    const tree = renderer.create(<ContactsDrawer />).toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
  });

});
