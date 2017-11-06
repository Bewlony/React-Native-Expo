import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button, TouchableOpacity, Animated, ScrollView, Dimensions,} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Icon } from 'native-base';
import MapView from 'react-native-maps';
import Meteor, { connectMeteor, createContainer }  from 'react-native-meteor';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 6;
const CARD_WIDTH = CARD_HEIGHT + 20;

class Locations extends Component {

  state = {
    location: null,
    errorMessage: null,
    markers:[
      {
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
        title: '',
        description: '',
      },
    ],
    region: {
      latitudeDelta: 0.003358723958820065,
      longitudeDelta: 0.0040142817690068,
    },
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
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
    var point = {
      userId: Meteor.userId(),
      lat: this.state.location.coords.latitude,
      lng: this.state.location.coords.longitude
    };
    Meteor.call('insertNearby', point);

  };

  // onNearby = () =>{
  //   this._getLocationAsync();
  //   var point = {
  //     userId: Meteor.userId(),
  //     lat: this.state.location.coords.latitude,
  //     lng: this.state.location.coords.longitude
  //   };
  //   Meteor.call('insertNearby', point);
  //   console.log(this.props.nearbys);
  // }

  // onShow = () =>{
  //   var obj = Object.assign({},this.props.nearbys);
  //   <MapView.Marker
  //     coordinate={{latitude: obj.lat, longitude: obj.lng}}
  //     title={ "title: obj.name" }
  //     description={"description: obj.vicinity"}
  //   />
  // }
  _addMark = () =>{
    for(var i=0; i < this.props.nearbys.length; i++)
    {
      var obj = Object.assign({},this.props.nearbys[i]);
      this.state.markers[i] = {
        coordinate:{latitude: obj.lat, longitude: obj.lng},
        title: obj.name,
        description: obj.vicinity,
      }
    }

  }

  render() {
    this._addMark();
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location.coords);
    }
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    // <View style={styles.buttonContainer}>
    //   <TouchableOpacity
    //     style={styles.bubble}
    //     onPress={this.onNearby}>
    //     <Text>Take Nearby</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     style={styles.bubble}
    //     onPress={this.onShow}>
    //     <Text>Show Nearby</Text>
    //   </TouchableOpacity>
    // </View>

    // <Animated.View style={[styles.markerWrap, opacityStyle]}>
    //   <Animated.View style={[styles.ring, scaleStyle]} />
    //   <View style={styles.marker} />
    // </Animated.View>
    return (
      <View style={ styles.container }>
        <MapView
          ref={map => this.map = map}
          style={styles.container}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
          followUserLocation={true}
          showsUserLocation={true}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                {Platform.select({
                      android:  () => <Icon name="md-pin" />,
                      ios:      () => <Icon name="ios-pin" />,
                })()}
              </MapView.Marker>
            );
          })}
        </MapView>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}
          >
            {this.state.markers.map((marker, index) => (
              <View style={styles.card} key={index}>
                <Animated.ScrollView>
                <View style={styles.textContent}>
                  <Text style={styles.cardtitle}>{marker.title}</Text>
                  <Text style={styles.cardDescription}>
                    {marker.description}
                  </Text>
                </View>
                </Animated.ScrollView>
              </View>
            ))}
          </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 5,
    elevation: 2,
    backgroundColor: "rgba(255,255,255,0.7)",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  // markerWrap: {
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // marker: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: "rgba(130,4,150, 0.9)",
  // },
  // ring: {
  //   width: 24,
  //   height: 24,
  //   borderRadius: 12,
  //   backgroundColor: "rgba(130,4,150, 0.3)",
  //   position: "absolute",
  //   borderWidth: 1,
  //   borderColor: "rgba(130,4,150, 0.5)",
  // },
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
export default createContainer(params=>{
  Meteor.subscribe('nearbys');
  return {
    nearbys: Meteor.collection('nearbys').find({userId: Meteor.userId()}),
  };
}, Locations)
