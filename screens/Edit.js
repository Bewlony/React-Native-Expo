import React, {Component} from 'react';
import {Image} from 'react-native';
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
import Meteor from 'react-native-meteor';

class Edit extends Component {

  render() {
    return (
      <Container>
        <Content>
          <Card style={{flex: 1}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://www.publicationsports.com/vProd/asset/image/component/ps/ps_single_login/user_logo.png'}}/>
                <Body>
                  <Text>Emergenza!!!</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>NAME : Mr.Emergenza</Text>
                <Text>AGE : 1 month</Text>
                <Text>FACULTY : ComputerEngineering</Text>
                <Text>BLOOD TYPE : ABABO+</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
export default Edit;
