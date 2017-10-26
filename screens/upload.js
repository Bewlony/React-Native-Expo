import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, WebView, Platform } from 'react-native';
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
      <View style={{flex:1}}>
        {Platform.select({
              android:  () =>  <Button
                                  title="Open WebBrowser"
                                  onPress={this._handlePressButtonAsync}
                                />,

              ios:      () => <WebView
                                source={{ uri: 'https://emergenza.herokuapp.com/upload/'+ Meteor.userId }}
                              />
        })()}
      </View>
    );
  }

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://emergenza.herokuapp.com/upload/'+ Meteor.userId );
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
