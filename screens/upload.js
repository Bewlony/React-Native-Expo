import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, WebView, Platform ,Linking, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Constants, WebBrowser } from 'expo';
import Meteor from 'react-native-meteor';
// import AndroidWebView from 'react-native-webview-file-upload-android';
// import {WebViewAndroid} from 'react-native-webview-android';

export default class upload extends Component {
  state = {
    result: null,
    toggledOn: false,

  };

  render() {
    const { toggledOn } = this.state;
    return (
      <View style={ styles.container }>
        {Platform.select({
              android:  () =>  <TouchableOpacity onPress={() => {this.setState({ toggledOn: !toggledOn });var _this = this; setTimeout(function() { _this._handlePressButtonAsync(); }, 1000);
                                ;}}>
                                  <Text
                                    style={[styles.toggle, toggledOn && styles.toggledOn]}
                                    transition={['color', 'rotate', 'fontSize']}
                                  >
                                    Upload!!
                                  </Text>
                              </TouchableOpacity>, 

              ios:      () =>   <TouchableOpacity onPress={() => {this.setState({ toggledOn: !toggledOn });var _this = this; setTimeout(function() { _this._handleLinking(); }, 1000);
                                ;}}>
                                  <Text
                                    style={[styles.toggle, toggledOn && styles.toggledOn]}
                                    transition={['color', 'rotate', 'fontSize']}
                                  >
                                    Upload!!
                                  </Text>
                                </TouchableOpacity>, 
        })()}
      </View>
    );
  }

  _handleLinking = async () => {
    if(Meteor.userId()){
      Linking.openURL('https://emergenza.herokuapp.com/upload/'+ Meteor.userId());
    }else{
      alert('please login');
      this.props.navigation.navigate('Account');
    }
  }

  _handlePressButtonAsync = async () => {
    if(Meteor.userId()){
      console.log('https://emergenza.herokuapp.com/upload/'+ Meteor.userId());
      let result = await WebBrowser.openBrowserAsync('https://emergenza.herokuapp.com/upload/'+ Meteor.userId() );
      this.setState({ result });
    }else{
      alert('please login');
      this.props.navigation.navigate('Account');
    }

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebe6'
  },
  toggle: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    width: 270,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    borderWidth: 5,
    padding: 3,
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 10,
    color: 'rgba(255, 255, 255, 1)',
  },
  toggledOn: {
    color: 'rgba(255, 33, 33, 1)',
    fontSize: 16,
    transform: [{
      rotate: '8deg',
    }, {
      translateY: -20,
    }],
  },
});
