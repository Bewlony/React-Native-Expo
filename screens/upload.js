import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, WebView, Platform ,Linking} from 'react-native';
import { Constants, WebBrowser } from 'expo';
import Meteor from 'react-native-meteor';
// import AndroidWebView from 'react-native-webview-file-upload-android';
// import {WebViewAndroid} from 'react-native-webview-android';

export default class upload extends Component {
  state = {
    result: null,
  };

  render() {
    return (
      <View style={ styles.container }>
        {Platform.select({
              android:  () =>  <Button
                                  title="Open WebBrowser"
                                  onPress={this._handlePressButtonAsync}
                                />,

              ios:      () => <Button
                                title="Open WebBrowser"
                                onPress={this._handleLinking}
                              />,
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
});
