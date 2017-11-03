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
    var obj = Object.assign({},this.props.posts[0])
    console.log(obj.userId);
    // console.log(data.userId);

    return (
      <Container>
        <Content>
          <Card style={{flex: 1,backgroundColor: '#ffebe6',}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://reg1.src.ku.ac.th/picnisit/5830300176.jpg'}}/>
                <Body>
                  <Text>{obj.userName}</Text>

                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>UseID : {obj.userId}</Text>
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
