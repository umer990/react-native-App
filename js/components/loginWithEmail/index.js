
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';

import Global from '../../Global';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class LoginWithEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleHeight: Dimensions.get('window').height,
            scroll: false,
            user: null,
            email: null,
            password: null,
        };
    }

    componentDidMount() {
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            GoogleSignin.configure({
                scopes: ["https://www.googleapis.com/auth/drive.readonly"],
                iosClientId: Global.GOOGLE_SIGNIN_IOS_KEY,
                webClientId: Global.GOOGLE_SIGNIN_WEB_KEY,
                offlineAccess: false
            });

            /*GoogleSignin.currentUserAsync().then((user) => {
             console.log('USER', user);
             this.setState({user: user});
             }).done();*/

        })
            .catch((err) => {
                console.log("Play services error", err.code, err.message);
            });
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    validateEmail (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    loginWithEmail() {
        var _this = this;
        if (!this.validateEmail(this.state.email) || !this.state.password) {
            Alert.alert('Invalid Credentials','Please input valid email address and password.');
        } else {
            if(this.state.password.length >= 6) {
                fetch(Global.API_URL + '/auth/login', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: _this.state.email,
                        password: _this.state.password})
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        if(responseData.status_code == 422){
                            Alert.alert('Login Failed',responseData.errors[0][0]);
                        } else if(responseData.status_code == 401) {
                            Alert.alert('Login Failed','Sorry, Invalid email address and password.');
                        }
                        else{
                            AsyncStorage.setItem(Global.LOGIN_TYPE, Global.EMAIL_LOGIN);
                            AsyncStorage.setItem(Global.API_TOKEN, responseData.token);
                            AsyncStorage.setItem(Global.USER_ID, responseData.id + '');
                            AsyncStorage.setItem(Global.PASSWORD, _this.state.password);
                            this.replaceRoute('welcome');
                        }
                    })
                    .done();
            }
        }
    }

    render() {
        var _this=this;
        return (
            <Image style={{flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={require('../../../images/splash.png')}>
                <Grid>
                    <Row style={{ flex: 5}}/>
                    <Row style={{ flex: 5, paddingLeft: 10}}>
                        <TouchableOpacity onPress={() => this.replaceRoute('login')}>
                            <Image style={{flex: 1}} resizeMode={Image.resizeMode.cover} source={require('../../../images/back-button.png')}>
                            </Image>
                        </TouchableOpacity>
                    </Row>
                    <Row style={{ flex: 90 }}>
                        <Col style={{ flex: 10 }} />
                        <Col style={{ flex: 80 }}>
                            <Row style={{ flex: 15 }} />
                            <Row style={{ flex: 60, backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: 5}}>
                                    <Grid style={{ position: "relative"}}>
                                        <Col style={{ flex: 5 }} />
                                        <Col style={{ flex: 90 }}>
                                            <Row style={{ flex: 10, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}} >
                                                <Text style={{color: '#ffffff'}}>Log in with email</Text>
                                            </Row>
                                            <Row style={{ flex: 5 }} />
                                            <Row style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent:'center' }} >
                                                <Text style={{ color: '#ffffff', fontSize: 7}}> Don't have an account? </Text>
                                            </Row>
                                            <Row style={{ flex: 2 }} />
                                            <Row style={{ flex: 10 }} >
                                                <Col style={{ flex: 25 }} />
                                                <Col style={{ flex: 50 }}>
                                                    <Button block small transparent style={{flex: 1, width: null, backgroundColor: '#000000', borderRadius : 5, borderColor: '#ffffff',borderWidth: 1}} onPress={() => this.replaceRoute('register')}>
                                                        <Text style={{fontSize: 10, color: '#ffffff'}}>Create new user</Text>
                                                    </Button>
                                                </Col>
                                                <Col style={{ flex: 25 }} />
                                            </Row>
                                            <Row style={{ flex: 10 }} />
                                            <Row style={{ flex: 10 }}>
                                                <InputGroup style={{flex: 1, width: null, backgroundColor: '#ffffff', borderRadius: 5}}>
                                                    <Input
                                                        onChangeText={(text) => this.setState({ email: text })}
                                                        value={this.state.email}
                                                        controlled={true}
                                                        placeholder="Email address"
                                                        placeholderTextColor="#555555" />
                                                </InputGroup>
                                            </Row>
                                            <Row style={{ flex: 2 }} />
                                            <Row style={{ flex: 10 }}>
                                                <InputGroup style={{flex: 1, width: null, backgroundColor: '#ffffff', borderRadius: 5}}>
                                                    <Input
                                                        onChangeText={(text) => this.setState({ password: text })}
                                                        value={this.state.password}
                                                        controlled={true}
                                                        placeholder="Password"
                                                        placeholderTextColor="#555555"
                                                        secureTextEntry={true}/>
                                                </InputGroup>
                                            </Row>
                                            <Row style={{ flex: 5 }} />
                                            <Row style={{ flex: 5 }} >
                                                <Col style={{ flex: 25 }} />
                                                <Col style={{ flex: 50 }}>
                                                    <Button block small transparent style={{flex: 1, width: null, backgroundColor: '#000000', borderRadius : 5, borderColor: '#ffffff',borderWidth: 1 }}
                                                            onPress={() => this.replaceRoute('loginWithEmail')}>
                                                        <Text style={{fontSize: 10, color: '#ffffff'}}>Forgot your password</Text>
                                                    </Button>
                                                </Col>
                                                <Col style={{ flex: 25 }} />
                                            </Row>
                                            <Row style={{ flex: 15 }} />
                                            <Row style={{ flex: 10 }}>
                                                <Col style={{ flex: 20 }} />
                                                <Col style={{ flex: 60 }}>
                                                    <Button block small success style={{flex: 1, width: null}} onPress={this.loginWithEmail.bind(this)}>
                                                        <Text style={{fontWeight: 'bold', color: 'white'}}>Log in</Text>
                                                    </Button>
                                                </Col>
                                                <Col style={{ flex: 20 }} />
                                            </Row>
                                            <Row style={{ flex: 2 }} />
                                            <Row style={{ flex: 10 }}>
                                                <Button block small transparent style={{flex: 1, width: null}} onPress={() => this.replaceRoute('login')}>
                                                    <Text style={{color: '#ffffff'}}>Cancle</Text>
                                                </Button>
                                            </Row>
                                            <Row style={{ flex: 5}} />
                                        </Col>
                                        <Col style={{ flex: 5 }} />
                                    </Grid>
                            </Row>
                            <Row style={{ flex: 24 }} />
                        </Col>
                        <Col style={{ flex: 10 }} />
                    </Row>
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

export default connect(null, bindActions)(LoginWithEmail);
