
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, Alert, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';
import Global from '../../Global';

import theme from '../../themes/base-theme';
import styles from './styles';

class Register extends Component {

    constructor(props) {
      super(props);
        this.state = {
          user: null,
          firstname: null,
          lastname: null,
          email: null,
          country: null,
          city: null,
          password: null,
      };
    }

    validateEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    registerUser() {
      var _this = this;
      if (!this.validateEmail(this.state.email) || !this.state.password || !this.state.country || !this.state.city) { 
        Alert.alert('Invalid Credentials','Please input valid user name, country, city, email address and password.');
      } else {
        if(this.state.password.length >= 6) {
          fetch(Global.API_URL + '/auth/signup', {
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               },
               method: "POST",
               body: JSON.stringify({
                 firstname: _this.state.firstname,
                 name: _this.state.firstname,
                 lastname: _this.state.lastname,
                 email: _this.state.email,
                 password: _this.state.password,
                 country: _this.state.country,
                 city: _this.state.city,
                 priority: 3,
                 role: 1})
          })
          .then((response) => response.json())
          .then((responseData) => {
              if(responseData.status_code == 422){
                Alert.alert('Register Failed',responseData.errors[0][0]);
              } else {
                AsyncStorage.setItem(Global.LOGIN_TYPE, Global.EMAIL_LOGIN);
                AsyncStorage.setItem(Global.TOKEN, responseData.token);
                AsyncStorage.setItem(Global.USERID, responseData.user.id + '');
                AsyncStorage.setItem(Global.PASSWORD, _this.state.password);
                Alert.alert('GolfSkiWorld','Thanks for using our app.');
                this.replaceRoute('login');
              }
          })
          .done();
        } else {
          Alert.alert('Weak password','Password length must be more than 6 characters.')
        }
      }
    }

    render() {
      return (
        <Image style={{flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={require('../../../images/splash.png')}>
          <Grid>
            <Col style={{ flex: 10 }} />
            <Col style={{ flex: 80 }}>
              <Row style={{ flex: 20 }} />
              <Row style={{ flex: 70, backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: 5}}>
                <Image style={{ flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={ require('../../../images/login_overlay.png') }>
                  <Grid>
                    <Col style={{ flex: 5 }} />
                    <Col style={{ flex: 90 }}>
                        <Row style={{ flex: 10, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}} >
                            <Text style={{fontWeight:'bold', color: '#ffffff'}}>Create new user</Text>
                        </Row>
                      <Row style={{ flex: 15 }}>
                        <Col style={{ flex: 45 }} >
                            <InputGroup style={{flex: 1, width: null, backgroundColor: '#ffffff', borderRadius: 5}}>
                                <Input
                                  onChangeText={(text) => this.setState({ firstname: text })}
                                  value={this.state.firstname}
                                  controlled={true}
                                  placeholderTextColor="#555555"
                                  placeholder="Firstname"/>
                            </InputGroup>
                        </Col>
                          <Col style={{ flex: 10 }} />
                          <Col style={{ flex: 45 }} >
                            <InputGroup style={{flex: 1, width: null, backgroundColor: '#ffffff', borderRadius: 5}}>
                                <Input
                                  onChangeText={(text) => this.setState({ lastname: text })}
                                  value={this.state.lastname}
                                  controlled={true}
                                  placeholderTextColor="#555555"
                                  placeholder="Lastname"/>
                            </InputGroup>
                        </Col>
                      </Row>
                      <Row style={{ flex: 5 }}/>
                      <Row style={{ flex: 15 }}>
                          <InputGroup style={{flex: 1, width: null, backgroundColor: '#ffffff', borderRadius: 5}}>
                              <Input
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                                controlled={true}
                                placeholderTextColor="#555555"
                                keyboardType="email-address"
                                placeholder="Email address"/>
                          </InputGroup>
                      </Row>
                        <Row style={{ flex: 5 }}/>
                        <Row style={{ flex: 15 }}>
                            <InputGroup style={{flex: 1, width: null, backgroundColor: '#ffffff', borderRadius: 5}}>
                                <Input
                                    onChangeText={(text) => this.setState({ confirmEmail: text })}
                                    value={this.state.confirmEmail}
                                    controlled={true}
                                    placeholderTextColor="#555555"
                                    keyboardType="email-address"
                                    placeholder="Confirm email address"/>
                            </InputGroup>
                        </Row>
                        <Row style={{ flex: 5 }}/>
                      <Row style={{ flex: 15 }}>
                          <InputGroup style={{flex: 1, width: null, backgroundColor: '#ffffff', borderRadius: 5}}>
                              <Input
                                value={this.state.country}
                                controlled={true}
                                onChangeText={(text) => this.setState({ country: text })}
                                placeholderTextColor="#555555"
                                placeholder="Country"/>
                          </InputGroup>
                       </Row>
                        <Row style={{ flex: 5 }}/>
                      <Row style={{ flex: 15 }}>
                          <InputGroup style={{flex: 1, width: null, backgroundColor: '#ffffff', borderRadius: 5}}>
                              <Input
                                value={this.state.city}
                                controlled={true}
                                onChangeText={(text) => this.setState({ city: text })}
                                placeholderTextColor="#555555"
                                placeholder="City"/>
                          </InputGroup>
                      </Row>
                        <Row style={{ flex: 5 }}/>
                        <Row style={{ flex: 15 }}>
                            <InputGroup style={{flex: 1, width: null, backgroundColor: '#ffffff', borderRadius: 5}}>
                                <Input
                                    value={this.state.password}
                                    controlled={true}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    placeholderTextColor="#555555"
                                    placeholder="Password"
                                    secureTextEntry={true}/>
                            </InputGroup>
                        </Row>
                      <Row style={{ flex: 5 }}/>
                      <Row style={{ flex: 15 }}>
                          <Col style={{ flex: 20 }} />
                          <Col style={{ flex: 60 }}>
                              <Button block small success style={{flex: 1, width: null}} onPress={this.registerUser.bind(this)}>
                                <Text style={{fontWeight:'bold', color: 'white'}}>Create account</Text>
                              </Button>
                          </Col>
                          <Col style={{ flex: 20 }} />
                      </Row>
                      <Row style={{ flex: 15 }}>
                          <Button block small transparent style={{flex: 1, width: null}} onPress={() => this.replaceRoute('login')}>
                            <Text style={{fontWeight:'bold', color: '#222222'}}>Cancel</Text>
                          </Button>
                      </Row>
                      <Row style={{ flex: 1 }} />
                    </Col>
                    <Col style={{ flex: 5 }} />
                  </Grid>
                </Image>
              </Row>
              <Row style={{ flex: 30 }} />
            </Col>
            <Col style={{ flex: 10 }} />
          </Grid>
        </Image>
      );
    }
}

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(Register);
