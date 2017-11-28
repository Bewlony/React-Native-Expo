import React, { Component } from 'react';
import {Text, View, Dimensions, Image ,TextInput, ScrollView, Platform} from 'react-native';
import {Form, Item, Label, Input, Button, Header, Body, Title, Content, Picker, Item as FormItem} from 'native-base';
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
   onValueChange1(value: string) {
    this.setState({
      bloodType: value,
    });
   }
   onValueChange2(value: string) {
    this.setState({
      faculty: value,
    });
   }
   onValueChange3(value: string) {
    this.setState({
      major: value,
    });
   }

   isValid() {
      const { email, password, conPass, stuId, name, last, bloodType, faculty, major, emergenzyCall  } = this.state;
      let valid = false;

      if (email.length > 0 && password.length > 5  && conPass.length > 5 && password === conPass && stuId.length === 10 &&
          name.length > 0 && last.length > 0 && bloodType.length > 0 && faculty.length > 0 && major.length > 0 && emergenzyCall.length === 10) {
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
      } else if (stuId.length !== 10 ) {
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
      } else if (emergenzyCall.length !== 10) {
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
                <Label style={{ fontWeight: 'bold', }}> Email : </Label>
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
                <Label style={{ fontWeight: 'bold', }}> Password : </Label>
                <Input
                  // style={{}}
                  placeholder='more 6 digits'
                  autoCorrect={false}
                  onChangeText={(password)=>this.setState({password})}
                  value={this.state.password}
                  secureTextEntry
                  />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                <Label style={{ fontWeight: 'bold', }}> ConfirmPassword : </Label>
                <Input
                  // style={{}}
                  placeholder='more 6 digits'
                  autoCorrect={false}
                  onChangeText={(conPass)=>this.setState({conPass})}
                  value={this.state.conPass}
                  secureTextEntry
                  />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                <Label style={{ fontWeight: 'bold', }}> StudentID : </Label>
                <Input
                  // style={{}}
                  placeholder='Please put real StudentID'
                  autoCorrect={false}
                  onChangeText={(stuId)=>this.setState({stuId})}
                  value={this.state.stuId}
                  />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                 <Label style={{ fontWeight: 'bold', }}> Firstname : </Label>
                 <Input
                   autoCorrect={false}
                   onChangeText={(name)=>this.setState({name})}
                   value={this.state.name}
                   />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                  <Label style={{ fontWeight: 'bold', }}> LastName : </Label>
                  <Input
                    autoCorrect={false}
                    onChangeText={(last)=>this.setState({last})}
                    value={this.state.last}
                    />
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                 <Label style={{ fontWeight: 'bold', }}> BloodType : </Label>
                 <Content>
                   <Form>
                     <Picker
                       mode="dropdown"
                       placeholder="Select One"
                       selectedValue={this.state.bloodType}
                       onValueChange={this.onValueChange1.bind(this)}
                     >
                       <Item label="Select One" value="" />
                       <Item label="A" value="A" />
                       <Item label="B" value="B" />
                       <Item label="AB" value="AB" />
                       <Item label="O" value="O" />
                     </Picker>
                   </Form>
                 </Content>
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                  <Label style={{ fontWeight: 'bold', }}> Faculty : </Label>
                  <Content>
                    <Form>
                      <Picker
                        mode="dropdown"
                        placeholder="Select One"
                        selectedValue={this.state.faculty}
                        onValueChange={this.onValueChange2.bind(this)}
                      >
                        <Item label="Select One" value="" />
                        <Item label="คณะวิทยาการจัดการ" value="คณะวิทยาการจัดการ" />
                        <Item label="คณะเศรษฐศาสตร์ ศรีราชา" value="คณะเศรษฐศาสตร์ ศรีราชา" />
                        <Item label="คณะวิทยาศาสตร์ ศรีราชา" value="คณะวิทยาศาสตร์ ศรีราชา" />
                        <Item label="คณะวิศวกรรมศาสตร์ ศรีราชา" value="คณะวิศวกรรมศาสตร์ ศรีราชา" />
                        <Item label="วิทยาลัยพาณิชยนาวีนานาชาติ" value="วิทยาลัยพาณิชยนาวีนานาชาติ" />
                      </Picker>
                    </Form>
                  </Content>
              </Item>
              <Item regular
                style={{marginTop: 5}}
              >
                  <Label style={{ fontWeight: 'bold', }}> Major : </Label>
                  <Content>
                     <Form>
                       <Picker
                         mode="dropdown"
                         placeholder="Select One"
                         selectedValue={this.state.major}
                         onValueChange={this.onValueChange3.bind(this)}
                       >
                         <Item label="Select One" value="" />
                         <Item label="G01" value="G01 เศรษฐศาสตร์" />
                         <Item label="G02" value="G02 เศรษฐศาสตร์(ภาคพิเศษ)" />
                         <Item label="M01" value="M01 วิศวกรรมต่อเรือและเครื่องกลเรือ(วิศวกรรมต่อเรือ)" />
                         <Item label="M02" value="M02 วิทยาศาสตร์การเดินเรือ" />
                         <Item label="M03" value="M03 วิศวกรรมต่อเรือและเครื่องกลเรือ(ปฏิบัติงานบนเรือ)" />
                         <Item label="M04" value="M04 การขนส่งทางทะเล" />
                         <Item label="M05" value="M05 วิศวกรรมต่อเรือและเครื่องกลเรือ(วิศวกรรมนอกฝั่ง)" />
                         <Item label="R01" value="R01 การเงิน" />
                         <Item label="R02" value="R02 การจัดการ" />
                         <Item label="R03" value="R03 การตลาด" />
                         <Item label="R04" value="R04 ธุรกิจระหว่างประเทศ" />
                         <Item label="R05" value="R05 การจัดการโรงแรมและท่องเที่ยว" />
                         <Item label="R06" value="R06 การโรงแรม" />
                         <Item label="R07" value="R07 ธุรกิจระหว่างประเทศ(ภาคพิเศษ)" />
                         <Item label="R08" value="R08 การจัดการ(ภาคพิเศษ)" />
                         <Item label="R09" value="R09 การเงิน(ภาคพิเศษ)" />
                         <Item label="R10" value="R10 การจัดการโรงแรมและท่องเที่ยว(ภาคพิเศษ)" />
                         <Item label="R11" value="R11 การตลาด(ภาคพิเศษ)" />
                         <Item label="R12" value="R12 การบัญชีบริหาร(ภาคพิเศษ)" />
                         <Item label="R13" value="R13 การบัญชีบริหาร" />
                         <Item label="R14" value="R14 การจัดการโลจิสติกส์" />
                         <Item label="R15" value="R15 การจัดการโลจิสติกส์(ภาคพิเศษ)" />
                         <Item label="R16" value="R16 การเงินและการลงทุน" />
                         <Item label="R17" value="R17 การเงินและการลงทุน(ภาคพิเศษ)" />
                         <Item label="S01" value="S01 คณิตศาสตร์ประยุกต์" />
                         <Item label="S03" value="S03 เคมี" />
                         <Item label="S05" value="S05 วิทยาการคอมพิวเตอร์" />
                         <Item label="S06" value="S06 วิทยาการคอมพิวเตอร(ภาคพิเศษ)์" />
                         <Item label="S08" value="S08 วิทยาศาสตร์สิ่งแวดล้อม" />
                         <Item label="S09" value="S09 เทคโนโลยีสารสนเทศ" />
                         <Item label="S10" value="S10 เทคโนโลยีสารสนเทศ(ภาคพิเศษ)" />
                         <Item label="S11" value="S11 ฟิสิกศ์" />
                         <Item label="S18" value="S18 วิทยาศาสตร์และเทคโนโลยีสิ่งแวดล้อม" />
                         <Item label="T02" value="T02 วิศวกรรมคอมพิวเตอร์" />
                         <Item label="T03" value="T03 วิศวกรรมเครื่องกล" />
                         <Item label="T04" value="T04 วิศวกรรมไฟฟ้า" />
                         <Item label="T05" value="T05 วิศวกรรมโยธา" />
                         <Item label="T07" value="T07 วิศวกรรมอุตสาหการ" />
                         <Item label="T08" value="T08 วิศวกรรมเครื่องกลและการผลิต(ภาคพิเศษ)" />
                         <Item label="T12" value="T12 วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์" />
                         <Item label="T13" value="T13 วิศวกรรมเครื่องกลและการออกแบบ" />
                         <Item label="T14" value="T14 วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์" />
                         <Item label="T17" value="T17 วิศวกรรมอุตสาหการและระบบ" />
                         <Item label="T18" value="T18 วิศวกรรมเครื่องกลและระบบการผลิต(ภาคพิเศษ)" />

                       </Picker>
                     </Form>
                   </Content>
              </Item>

              <Item regular
                style={{marginTop: 5}}
              >
                 <Label style={{ fontWeight: 'bold', }}> EmergencyCall : </Label>
                 <Input
                  placeholder='real phone numbers'
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
