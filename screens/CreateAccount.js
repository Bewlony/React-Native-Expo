import React, { Component } from 'react';
import {Text, View, Dimensions, Image ,TextInput, ScrollView} from 'react-native';
import {Form, Item, Label, Input, Button, Header, Body, Title} from 'native-base';
import Meteor, {createContrainer,Accounts} from 'react-native-meteor';
import KeyboardSpacer from 'react-native-keyboard-spacer';
// var myBg = require('../assets/icons/bg.jpg');

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

      if (email.length > 0 && password.length > 5  && conPass.length > 5 && password === conPass && stuId.length > 0 &&
          name.length > 0 && last.length > 0 && bloodType.length > 0 && faculty.length > 0 && major.length > 0 && emergenzyCall.length > 0) {
        valid = true;
      }

      if (email.length === 0) {
        this.setState({ error: 'You must enter an email address' });
        alert('You must enter an email address');
        valid = false;
      } else if (password.length === 0 || password.length < 6) {
        this.setState({ error: 'You must enter a password 6 digits' });
        alert('You must enter a password 6 digits');
        valid = false;
      } else if (conPass.length === 0 || conPass.length < 6 || password !== conPass) {
        this.setState({ error: 'You must enter an confirm password 6 digits or not the same password' });
        alert('You must enter an confirm password 6 digits or not the same password');
        valid = false;
      } else if (stuId.length === 0) {
        this.setState({ error: 'You must enter a StudentId' });
        alert('You must enter a StudentId');
        valid = false;
      } else if (name.length === 0) {
        this.setState({ error: 'You must enter a firstname' });
        alert('You must enter a firstname');
        valid = false;
      } else if (last.length === 0) {
        this.setState({ error: 'You must enter a lastname' });
        alert('You must enter a lastname');
        valid = false;
      } else if (bloodType.length === 0) {
        this.setState({ error: 'You must enter a bloodType' });
        alert('You must enter a bloodType');
        valid = false;
      } else if (faculty.length === 0) {
        this.setState({ error: 'You must enter a faculty' });
        alert('You must enter a faculty');
        valid = false;
      } else if (major.length === 0) {
        this.setState({ error: 'You must enter a major' });
        alert('You must enter a major');
        valid = false;
      } else if (emergenzyCall.length === 0) {
        this.setState({ error: 'You must enter a emergenzyCall' });
        alert('You must enter a emergenzyCall');
        valid = false;
      }

      return valid;
    }

    onCreateAccount = () =>{
      const { email, password, conPass, stuId, name, last, bloodType, faculty, major, emergenzyCall  } = this.state;

      if (this.isValid()) {
        Accounts.createUser({ email, password }, (error) => {
          if (error) {
            this.setState({ error: error.reason });
            // alert('You must enter an @ in Email');
          } else {
            alert('Create Success');
          }
        });

        Meteor.loginWithPassword(email, password, (error) => {
          if (error) {
            this.setState({ error: error.reason });
            alert('You must enter an @ in Email');
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
            this.props.navigation.navigate('User');
          }
        });
        // this.props.navigation.navigate('User');
      }
      else{
        console.log('error : '+this.state.error);
      }
    }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#ffebe6',}}>
        <ScrollView>
          <View style={styles.inputStyle}>

            <Form>
              <Item regular>
                <Label> Email : </Label>
                <Input
                  placeholder='Example@mail.com'
                  autoCorrect={false}
                  onChangeText={(email)=>this.setState({email})}
                  value={this.state.email}
                  />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                <Label> Password : </Label>
                <Input
                  // style={{}}
                  autoCorrect={false}
                  onChangeText={(password)=>this.setState({password})}
                  value={this.state.password}
                  secureTextEntry
                  />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                <Label> ConfirmPassword : </Label>
                <Input
                  // style={{}}
                  autoCorrect={false}
                  onChangeText={(conPass)=>this.setState({conPass})}
                  value={this.state.conPass}
                  secureTextEntry
                  />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                <Label> StudentID : </Label>
                <Input
                  // style={{}}
                  autoCorrect={false}
                  onChangeText={(stuId)=>this.setState({stuId})}
                  value={this.state.stuId}
                  />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                 <Label> Firstname : </Label>
                 <Input
                   autoCorrect={false}
                   onChangeText={(name)=>this.setState({name})}
                   value={this.state.name}
                   />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                  <Label> LastName : </Label>
                  <Input
                    autoCorrect={false}
                    onChangeText={(last)=>this.setState({last})}
                    value={this.state.last}
                    />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                 <Label> BloodType : </Label>
                 <Input
                   autoCorrect={false}
                   onChangeText={(bloodType)=>this.setState({bloodType})}
                   value={this.state.bloodType}
                   />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                  <Label> Faculty : </Label>
                  <Input
                    autoCorrect={false}
                    onChangeText={(faculty)=>this.setState({faculty})}
                    value={this.state.faculty}
                    />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                  <Label> Major : </Label>
                  <Input
                   autoCorrect={false}
                   onChangeText={(major)=>this.setState({major})}
                   value={this.state.major}
                   />
              </Item>

              <Item regular
                style={{marginTop: 5}}
              >
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
  inputStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 20
  }
}

export default CreateAccount;
