import React, { Component } from 'react';
import {Text, View, Dimensions, Image ,TextInput, ScrollView} from 'react-native';
import {Form, Item, Label, Input, Button, Header, Body, Title} from 'native-base';
import Meteor, {createContrainer,Accounts} from 'react-native-meteor';
import KeyboardSpacer from 'react-native-keyboard-spacer';
// var myBg = require('../assets/icons/bg.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class CreateAccount extends Component {
  constructor(props) {
       super(props);

       this.state = {
         email: '',
         password: '',
         conPass:'',
         userId:'',
         stuId:'',
         name: '',
         last: '',
         bloodType: '',
         faculty: '',
         major: '',
         emergenzyCall: '',
         error: null,
       };
   }


   isValid() {
      const { email, password, conPass, stuId, name, last, bloodType, faculty, major, emergenzyCall  } = this.state;
      let valid = false;

      if (email.length > 0 && password.length > 0  && conPass.length > 0 && stuId.length > 0 && name.length > 0 && last.length > 0 && bloodType.length > 0 && faculty.length > 0 && major.length > 0 && emergenzyCall.length > 0) {
        valid = true;
      }

      if (email.length === 0) {
        alert('You must enter an email address');
      } else if (password.length === 0 && password.length > 5) {
        alert('You must enter a password 6 digits');
      } else if (conPass.length === 0 && conPass.length > 5 && password === conPass) {
        alert('You must enter an confirm password 6 digits or not the same password');
      } else if (stuId.length === 0) {
        alert('You must enter a StudentId');
      } else if (name.length === 0) {
        alert('You must enter a Username');
      } else if (last.length === 0) {
        alert('You must enter a last');
      } else if (bloodType.length === 0) {
        alert('You must enter a bloodType');
      } else if (faculty.length === 0) {
        alert('You must enter a faculty');
      } else if (major.length === 0) {
        alert('You must enter a major');
      } else if (emergenzyCall.length === 0) {
        alert('You must enter a emergenzyCall');
      }

      return valid;
    }

    onCreateAccount = () =>{
      const { stuId, email, password, name, last, bloodType, faculty, major, emergenzyCall } = this.state;
      // console.log(email);
      // console.log(name);
      // console.log(last);
      // console.log(bloodType);
      // console.log(faculty);
      // console.log(major);
      // console.log(emergenzyCall);

      if (this.isValid()) {
        Accounts.createUser({ email, password }, (error) => {
          if (error) {
            this.setState({ error: error.reason });
          } else {
            alert('Create Success');
            // this.onSignIn(); // temp hack that you might need to use
          }
        });

        Meteor.loginWithPassword(email, password, (error) => {
          if (error) {
            this.setState({ error: error.reason });
            alert('Invalid User');
          }
          else{
            var info = {
              userId: Meteor.userId(),
              stuId: stuId,
              userName: email,
              firstName: name,
              lastName: last,
              bloodType: bloodType,
              faculty: faculty,
              major: major,
              emerCell: emergenzyCall,
            };
            console.log(info);
            Meteor.call('postInsert',info);
          }
        });

        this.props.navigation.navigate('User');
        // usersInfo.addUsersInfo(info);
      }
      else{
        console.log('error');
      }
    }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.inputStyle}>

            <Form>
              <Item rounded>
                <Label> Email : </Label>
                <Input
                  autoCorrect={false}
                  onChangeText={(email)=>this.setState({email})}
                  value={this.state.email}
                  />
              </Item>
              <Item rounded>
                <Label> Password : </Label>
                <Input
                  // style={{}}
                  autoCorrect={false}
                  onChangeText={(password)=>this.setState({password})}
                  value={this.state.password}
                  secureTextEntry
                  />
              </Item>
              <Item rounded>
                <Label> ConfirmPassword : </Label>
                <Input
                  // style={{}}
                  autoCorrect={false}
                  onChangeText={(conPass)=>this.setState({conPass})}
                  value={this.state.conPass}
                  secureTextEntry
                  />
              </Item>
              <Item rounded>
                <Label> StudentID : </Label>
                <Input
                  // style={{}}
                  autoCorrect={false}
                  onChangeText={(stuId)=>this.setState({stuId})}
                  value={this.state.stuId}
                  />
              </Item>
              <Item rounded>
                 <Label> Username : </Label>
                 <Input
                   autoCorrect={false}
                   onChangeText={(name)=>this.setState({name})}
                   value={this.state.name}
                   />
              </Item>
              <Item rounded>
                  <Label> lastName : </Label>
                  <Input
                    autoCorrect={false}
                    onChangeText={(last)=>this.setState({last})}
                    value={this.state.last}
                    />
              </Item>
              <Item rounded>
                 <Label> BloodType : </Label>
                 <Input
                   autoCorrect={false}
                   onChangeText={(bloodType)=>this.setState({bloodType})}
                   value={this.state.bloodType}
                   />
              </Item>
              <Item rounded>
                  <Label> Faculty : </Label>
                  <Input
                    autoCorrect={false}
                    onChangeText={(faculty)=>this.setState({faculty})}
                    value={this.state.faculty}
                    />
              </Item>
              <Item rounded>
                  <Label> Major : </Label>
                  <Input
                   autoCorrect={false}
                   onChangeText={(major)=>this.setState({major})}
                   value={this.state.major}
                   />
              </Item>
              <Item rounded>
                 <Label> EmergenzyCall : </Label>
                 <Input
                  autoCorrect={false}
                  onChangeText={(emergenzyCall)=>this.setState({emergenzyCall})}
                  value={this.state.emergenzyCall}
                  />
              </Item>
            </Form>

            <View style={{marginTop: 10}}>
              <Button
                primary
                block
                onPress={this.onCreateAccount}
              >
                <Text style={{color: 'white'}}>Create Account</Text>
              </Button>
            </View>
            <KeyboardSpacer/>
          </View>
        </ScrollView>
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
  }
}

export default CreateAccount;
