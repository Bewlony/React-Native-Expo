import React, { Component } from 'react';
import { Platform, Text, View, TextInput, StyleSheet} from 'react-native';
import { Form, Item, Label, Input, Button, Header, Body, Title,Fab,Icon} from 'native-base';
import { Constants, Location, Permissions, MapView } from 'expo';
import Animation from 'lottie-react-native';
import Meteor from 'react-native-meteor';
import anim from '../assets/animation/favourite_app_icon.json';
class HelpMe extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentDidMount(){
    this.animation.play();
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

  PressHere = () =>{
    if(Meteor.userId()){
      this._getLocationAsync();
      alert('Locations has been Sent!!');
      var point = {
        userId: Meteor.userId(),
        lat: this.state.location.coords.latitude,
        lng: this.state.location.coords.longitude };
      Meteor.call('markInsert',point);
      console.log(this.state.location.coords.longitude);
      console.log(this.state.location.coords.latitude);
      this.props.navigation.navigate('Upload');
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
      <View style={{flex: 1}}>
      <Animation
          ref={animation => { this.animation = animation; }}
          style={{
            width: 80,
            height: 80
          }}
          loop={true}
          source={anim}
        />
          <View style={styles.inputStyle}>
            <View>
              <Button
                style={styles.circle}
                onPress={this.PressHere}
              >
                <Text style={{fontSize:30, color:'white'}}>Press here</Text>
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
      </View>
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
