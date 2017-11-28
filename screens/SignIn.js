import React, { Component } from 'react';
import {Text, View, Dimensions, Image ,TextInput, Vibration, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import {Form, Item, Label, Input, Button, Header, Body, Title} from 'native-base';
import Meteor, {createContrainer,Accounts} from 'react-native-meteor';
import * as Animatable from 'react-native-animatable';

// var myBg = require('../assets/icons/bg.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class SignIn extends Component {
  constructor(props) {
       super(props);

       this.state = {
         email: '',
         password: '',
         error: null,

       };
   }

   isValid() {
      const { email, password } = this.state;
      let valid = false;

      if (email.length > 0 && password.length > 0) {
        valid = true;
      }

      if (email.length === 0) {
        this.setState({ error: 'You must enter an email address' });
      } else if (password.length === 0) {
        this.setState({ error: 'You must enter a password' });
      }

      return valid;
    }

    onSignIn = () =>{
      const { email, password } = this.state;
      this._checklogin();
      if (this.isValid()) {
        Meteor.loginWithPassword(email, password, (error) => {
          if (error) {
            this.setState({ error: error.reason });
            alert('Invalid User');

          }
          else{
            console.log(email);
            this.props.navigation.navigate('User');
          }
        });
      }
      console.log(Meteor.userId());
    }

    onCreateAccount = () =>{
      this.props.navigation.navigate('CreateAccount');
    }

    _checklogin() {
      if(Meteor.userId()){
        this.props.navigation.navigate('User');
      }
      else{
        alert('Please Fill Email and Password');
      }
    }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#ffebe6',}}>
          <View style={styles.inputStyle}>

            <Form>

              <Item inlineLabel>
                <Label style={{ fontWeight: 'bold', }}> Email : </Label>
                <Input
                  autoCorrect={false}
                  onChangeText={(email)=>this.setState({email})}
                  value={this.state.email}
                  />
              </Item>

               <Item inlineLabel>
                <Label style={{ fontWeight: 'bold', }}> Password : </Label>
                <Input
                  // style={{}}
                  autoCorrect={false}
                  onChangeText={(password)=>this.setState({password})}
                  value={this.state.password}
                  secureTextEntry
                  />
              </Item>

            </Form>

            <Animatable.View style={{marginTop: 10}}
              ref = "text1"
            >
              {/* <Button
                primary
                block
                onPress={this.onSignIn}
              >
                <Text style={{color: 'white'}}>Sign In</Text>

              </Button> */}
              <Button
                primary
                block
                onPress={() => {this.refs.text1.shake(300);var _this = this;setTimeout(function() { _this.onSignIn(); }, 1000);
;}}
                style={{marginTop: 2}}
              >
                <Animatable.Text ref = "text1" style={{color: 'white'}}>SignIn</Animatable.Text>

              </Button>
              </Animatable.View>
              <Animatable.View style={{marginTop: 10}}
                ref = "text"
              >
              <Button
                primary
                block
                onPress={() => {this.refs.text.tada(300);var _this = this;setTimeout(function() { _this.onCreateAccount(); }, 1000);
;}}
                style={{marginTop: 2}}
              >
                <Animatable.Text ref = "text" style={{color: 'white'}}>Create Account</Animatable.Text>

              </Button>
              </Animatable.View>
            </View>
          </View>
    );
  }
}

const styles = {
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height
  },
  inputStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 20
  },
  toggle: {
    width: 270,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 3,
    padding: 5,
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
}

export default SignIn;
