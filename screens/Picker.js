import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated, Easing, } from 'react-native';
import Animation from 'lottie-react-native';
import anim from '../assets/animation/favourite_app_icon.json';

export default class Picker extends Component {
  state = {
    // Used by Animation component to run animation
    progress: new Animated.Value(0),
  };

  componentDidMount() {
    // this.animation.play();
    setTimeout(this.animate, 100);
  }

  animate = () => {
    Animated.timing(this.state.progress, {
      // Change from 0 to 1 to run animation
      toValue: 1,
      // Animation duration
      duration: 12000, // higher the value slower the animation and vice versa
      // Linear easings
      easing: Easing.linear,
    }).start(() => {
      // Reset progress to zero after animation is done
      this.state.progress.setValue(0);
      // Animate again
      this.animate();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Lottie Animations :-)</Text>
        <View>
          <Animation
            ref={animation => {this.animation = animation;}}
            style={{
              width: 200,
              height: 200
            }}
            loop={true}
            source={anim}
            progress={this.state.progress}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebe6'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red'
  }
});
