import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import {DocumentPicker, ImagePicker} from 'expo';
import Meteor from 'react-native-meteor';

export default class GalleryScreen extends React.Component {
    state = {
      image: null,
    };

   _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
  };

  render() {
         let { image } = this.state;
    return (
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={this.props.onPress}>
        <Text>Back</Text>
      </TouchableOpacity>
      <View style={{ 'marginTop': 20}}>
        <Button
          title="View Image"
          onPress={this._pickImage}
        />

      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    padding: 20,
    marginBottom: 4,
    backgroundColor: 'indianred',
  },
});
