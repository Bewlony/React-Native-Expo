import React, {Component} from 'react';
import {Image ,View} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body
} from 'native-base';
import Meteor, { connectMeteor, createContainer }  from 'react-native-meteor';

class Edit extends Component {

  render() {
    var obj = Object.assign({},this.props.posts[0]);
    console.log(obj.userId);
    // console.log(data.userId);
    var uri = 'https://reg1.src.ku.ac.th/picnisit/'+obj.stuId+'.jpg';
    return (
      <Container style={{flex: 1,backgroundColor: '#ffebe6',}}>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: uri}}/>
                <Body>
                  <Text style={ styles.baseText }>{obj.userName}</Text>

                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={ styles.baseText }>Student Id :  <Text style={ styles.titleText }>{obj.stuId}</Text></Text>
                <Text style={ styles.baseText }>First Name :  <Text style={ styles.titleText }>{obj.firstName}</Text></Text>
                <Text style={ styles.baseText }>Last Name :  <Text style={ styles.titleText }>{obj.lastName}</Text></Text>
                <Text style={ styles.baseText }>Blood Type :  <Text style={ styles.titleText }>{obj.bloodType}</Text></Text>
                <Text style={ styles.baseText }>Faculty :  <Text style={ styles.titleText }>{obj.faculty}</Text></Text>
                <Text style={ styles.baseText }>Major:  <Text style={ styles.titleText }>{obj.major}</Text></Text>
                <Text style={ styles.baseText }>Emergency Call:  <Text style={ styles.titleText }>{obj.emerCell}</Text></Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const styles = {
  baseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    fontWeight: 'normal',
  },
}
export default createContainer(params=>{
  Meteor.subscribe('posts');
  return {
    posts: Meteor.collection('posts').find({userId: Meteor.userId()}),
  };
}, Edit)

// export default Edit;
