import React, { Component } from 'react';
import { Platform, Text, View, TextInput, StyleSheet, Animated, Easing, Image, NativeModules, LayoutAnimation, Vibration, Linking, Alert } from 'react-native';
import { Form, Item, Label, Input, Button, Header, Body, Title,Fab,Icon} from 'native-base';
import { Constants, Location, Permissions, MapView, WebBrowser } from 'expo';
import Meteor from 'react-native-meteor';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class HelpMe extends Component {
  state = {
    location: null,
    errorMessage: null,
    result: null,
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount(){
    Animated.timing(
     this.state.fadeAnim,
     {
       toValue: 1,
       duration: 2000,
     }
   ).start();
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  _handleLinking = async () => {
    if(Meteor.userId()){
      Linking.openURL('https://emergenza.herokuapp.com/upload/'+ Meteor.userId());
    }
  }

  _handlePressButtonAsync = async () => {
    if(Meteor.userId()){
      console.log('https://emergenza.herokuapp.com/upload/'+ Meteor.userId());
      let result = await WebBrowser.openBrowserAsync('https://emergenza.herokuapp.com/upload/'+ Meteor.userId() );
      this.setState({ result });
    }
  };

  PressHere = () =>{
    if(Meteor.userId()){
      this._getLocationAsync();
      // alert('Locations has been Sent!!');
      var point = {
        userId: Meteor.userId(),
        lat: this.state.location.coords.latitude,
        lng: this.state.location.coords.longitude };
      Meteor.call('markInsert',point);
      // console.log(this.state.location.coords.longitude);
      // console.log(this.state.location.coords.latitude);
      Vibration.vibrate();
      // this.props.navigation.navigate('Upload');
      Alert.alert(
        'UPLOAD FILES ?',
        '',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () =>  {Platform.select({
                                          android:  () =>  this._handlePressButtonAsync(),
                                          ios:      () => this._handleLinking(),
                                        })()}
          },
        ],
        { cancelable: false }
      )
    }
    else{
      alert('please login');
      this.props.navigation.navigate('Account');
    }
  }


  onRecord = () =>{
    if(Meteor.userId()){
      this.props.navigation.navigate('Record');
    }else{
      alert('please login');
      this.props.navigation.navigate('Account');
    }
  }
  onCamera = () =>{
    if(Meteor.userId()){
      this.props.navigation.navigate('Camera');
    }else{
      alert('please login');
      this.props.navigation.navigate('Account');
    }
  }
  onImage = () =>{
    if(Meteor.userId()){
      this.props.navigation.navigate('ImagePicker');
    }else{
      alert('please login');
      this.props.navigation.navigate('Account');
    }
  }


  render() {
    return (
      <Animated.View style={{flex: 1, opacity: this.state.fadeAnim,}}>
          <View style={styles.inputStyle}>
            <View>
              <Button
                style={styles.circle}
                deleyLongPress = {2000}
                onLongPress={this.PressHere}
              >
                <Text style={{fontSize:30, color:'white'}}>Hold</Text>
              </Button>
            </View>
          </View>
          <Fab
            active={this.state.active}
            direction="left"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="ios-cog" />
            <Button style={{ backgroundColor: '#34A34F' }}
              onPress={this.onRecord}
            >
              <Icon name="microphone" />
            </Button>
            <Button style={{ backgroundColor: '#34A34F' }}
              onPress={this.onCamera}
            >
              <Icon name="camera" />
            </Button>
            <Button style={{ backgroundColor: '#34A34F' }}
              onPress={this.onImage}
            >
              <Icon name="image" />
            </Button>
          </Fab>
      </Animated.View>
    );
  }
}

const styles = {
  inputStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebe6'
  },
  circle: {
    borderWidth:1,
    borderColor:'red',
    justifyContent:'center',
    backgroundColor:'red',
    width:200,
    height:200,
    borderRadius:200,
  },
}
export default HelpMe;
