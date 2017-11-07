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
                  <Text>{obj.userName}</Text>

                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>StudentId : {obj.stuId}</Text>
                <Text>FirstName : {obj.firstName}</Text>
                <Text>LastName : {obj.lastName}</Text>
                <Text>BLOOD TYPE : {obj.bloodType}</Text>
                <Text>FACULTY : {obj.faculty}</Text>
                <Text>Major: {obj.major}</Text>
                <Text>EmergenzyCell: {obj.emerCell}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
export default createContainer(params=>{
  Meteor.subscribe('posts');
  return {
    posts: Meteor.collection('posts').find({userId: Meteor.userId()}),
  };
}, Edit)

// export default Edit;
