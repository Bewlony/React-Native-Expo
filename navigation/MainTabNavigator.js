import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';
import Colors from '../constants/Colors';
import SignIn from '../screens/SignIn';
import HelpMe from '../screens/HelpMe';
import Locations from '../screens/Locations';
import Edit from '../screens/Edit';
import Record from '../screens/Record';
import CreateAccount from '../screens/CreateAccount';
import Camera from '../screens/CameraScreen';
import Picker from '../screens/Picker';
import Upload from '../screens/upload';

export const SignInStack = StackNavigator({
  Account: {
    screen: SignIn,
    navigationOptions: {
      title: 'SignIn',
    },
  },
  User: {
    screen: Edit,
    navigationOptions: {
      title: 'User',
    },
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: {
      title: 'Create Accounts',
    },
  },
});

export const HomeStack = StackNavigator({
  Home: {
    screen: HelpMe,
    navigationOptions: {
      title: 'HelpMe',
    },
  },
  Record:{
    screen: Record,
    navigationOptions:{
      title: 'Record',
      },
    },
  Camera:{
    screen: Camera,
    navigationOptions:{
      title: 'Camera',
    },
  },
  ImagePicker:{
    screen: Picker,
    navigationOptions:{
      title: 'Picker',
    },
  },
});

export const LocationsStack = StackNavigator({
  Locations: {
    screen: Locations,
    navigationOptions: {
      title: 'Locations',
    },
  },

});

export const UploadStack = StackNavigator({
  Upload: {
    screen: Upload,
    navigationOptions: {
      title: 'Upload',
    },
  },
});

export default TabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Account: {
      screen: SignInStack,
    },
    Locations: {
      screen: LocationsStack,
    },
    Upload: {
      screen: Upload,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? `ios-home${focused ? '' : '-outline'}`
              : 'md-home';
            break;
          case 'Account':
            iconName = Platform.OS === 'ios'
              ? `ios-people${focused ? '' : '-outline'}`
              : 'md-people';
            break;
          case 'Locations':
            iconName = Platform.OS === 'ios'
              ? `ios-pin${focused ? '' : '-outline'}`
              : 'md-pin';
              break;
          case 'Upload':
            iconName = Platform.OS === 'ios'
              ? `ios-cloud-upload${focused ? '' : '-outline'}`
              : 'md-cloud-upload';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
