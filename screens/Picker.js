// import React, { Component } from 'react';
// import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
// import { Constants } from 'expo';
// import {DocumentPicker, ImagePicker} from 'expo';
// import Meteor from 'react-native-meteor';
//
// import * as firebase from 'firebase';
// import MainTabNavigator from '../navigation/MainTabNavigator';
// import { StackNavigator } from 'react-navigation';
//
// import RNFetchBlob from 'react-native-fetch-blob'
//
// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBbV56f5Hx2uapgQ7Ie-c85lxn9Ie13Pts",
//   authDomain: "emergenza-ea2f0.firebaseapp.com",
//   databaseURL: "https://emergenza-ea2f0.firebaseio.com",
//   projectId: "emergenza-ea2f0",
//   storageBucket: "emergenza-ea2f0.appspot.com",
//   messagingSenderId: "1023845302366"
// };
// firebase.initializeApp(firebaseConfig);
//
//
//
// export default class Picker extends Component {
//   state = {
//     inputValue: null,
//     imagePath: null,
//     imageHeight: null,
//     imageWidth: null,
//   };
//
//   _handleTextChange = inputValue => {
//     this.setState({ inputValue });
//   };
//
//   _handleButtonPress = () => {
//     Alert.alert(
//       'Button pressed!',
//       'You did it!',
//     );
//
//     firebase.database().ref('score/' + Meteor.userId()).set({
//       highscore: this.state.inputValue
//     });
//   };
//
//   _pickDocument = async () => {
//     let result = await DocumentPicker.getDocumentAsync({});
//     alert(result.uri);
//     console.log(result);
//   }
//
//   _takePicture = () => {
//      const cam_options = {
//        mediaType: 'photo',
//        maxWidth: 1000,
//        maxHeight: 1000,
//        quality: 1,
//        noData: true,
//      };
//      ImagePicker.launchCamera(cam_options, (response) => {
//        if (response.didCancel) {
//        }
//        else if (response.error) {
//        }
//        else {
//          this.setState({
//            imagePath: response.uri,
//            imageHeight: response.height,
//            imageWidth: response.width,
//          })
//        }
//      });
//
//      const Blob = RNFetchBlob.polyfill.Blob
//       const fs = RNFetchBlob.fs
//       window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//       window.Blob = Blob
//       const uploadImage = (uri, imageName, mime = 'image/jpg') => {
//         return new Promise((resolve, reject) => {
//           const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
//             let uploadBlob = null
//             const imageRef = firebaseApp.storage().ref('posts').child(imageName)
//             fs.readFile(uploadUri, 'base64')
//             .then((data) => {
//               return Blob.build(data, { type: `${mime};BASE64` })
//             })
//             .then((blob) => {
//               uploadBlob = blob
//               return imageRef.put(blob, { contentType: mime })
//             })
//             .then(() => {
//               uploadBlob.close()
//               return imageRef.getDownloadURL()
//             })
//             .then((url) => {
//               resolve(url)
//             })
//             .catch((error) => {
//               reject(error)
//             })
//         })
//       }
//    }
//
//   _takeAndUploadPhotoAsync = async () => {
//     // Display the camera to the user and wait for them to take a photo or to cancel
//     // the action
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });
//
//     if (result.cancelled) {
//       return;
//     }
//
//     // ImagePicker saves the taken photo to disk and returns a local URI to it
//     let localUri = result.uri;
//     let filename = localUri.split('/').pop();
//
//     // Infer the type of the image
//     let match = /\.(\w+)$/.exec(filename);
//     let type = match ? `image/${match[1]}` : `image`;
//
//     // Upload the image using the fetch and FormData APIs
//     let formData = new FormData();
//     // Assume "photo" is the name of the form field the server expects
//     formData.append('photo', { uri: localUri, name: filename, type });
//
//     return await fetch("https://emergenza.herokuapp.com/websocket", {
//       method: 'POST',
//       body: formData,
//       header: {
//         'content-type': 'multipart/form-data',
//       },
//     });
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//
//         <TextInput
//           value={this.state.inputValue}
//           onChangeText={this._handleTextChange}
//           style={{ width: 200, height: 44, padding: 8 }}
//         />
//
//         <Button
//           title="Press me"
//           onPress={this._handleButtonPress}
//         />
//
//         <Button
//           title="Test"
//           onPress={this.__takePicture}
//         />
//
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
// });
