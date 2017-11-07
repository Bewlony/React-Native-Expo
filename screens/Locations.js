import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button, TouchableOpacity, Animated, ScrollView, Dimensions,} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import Meteor, { connectMeteor, createContainer }  from 'react-native-meteor';


class Locations extends Component {

  state = {
    location: null,
    errorMessage: null,

  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    // this.index = 0;
    // this.animation = new Animated.Value(0);
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

  onShow = () =>{
    if(Meteor.userId()){
      this.props.navigation.navigate('Nearbys');
    }else{
      alert('please login');
      this.props.navigation.navigate('Account');
    }
  }


  render() {
    return (
      <View style={ styles.container }>
        <MapView
          style={ styles.map }
          followUserLocation={true}
          showsUserLocation={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bubble}
            onPress={this.onShow}>
            <Text>Show Nearby</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
     ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
export default Locations;
