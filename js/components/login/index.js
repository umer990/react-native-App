
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, Modal } from 'react-native';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { replaceRoute } from '../../actions/route';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import Global from '../../Global';
import styles from "./styles";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleHeight: Dimensions.get('window').height,
            scroll: false,
            modalVisible: false,
            user: null,
        };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentWillMount() {
        AsyncStorage.getItem(Global.FB_TOKEN)
            .then((token) => {

                console.log(token);
                if (token) {
                    this.replaceRoute('welcome');
                }
            })

    }

    componentDidMount() {

        GoogleSignin.hasPlayServices({autoResolve: true}).then(() => {
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
            .catch((e) => {
                console.log("Play services error", err.code, err.message);
            });
    }

    loginWithFacebook(error, result) {
        let _this = this;

        if (error) {
            alert("login has error: " + result.error);
        } else if (result.isCancelled) {
            alert("login is cancelled.");
        } else {
            AccessToken.getCurrentAccessToken()
                .then((authData) => {
                    _this.setState({user: {
                        fbToken: authData.accessToken,
                        fbUserId: authData.userID
                    }});
                    return fetch(`https://graph.facebook.com/v2.3/me/?fields=id,email,name,picture&redirect=false&access_token=${_this.state.user.fbToken}`)
                })
                .then((response) => response.json())
                .then((fbData) => {
                    AsyncStorage.setItem(Global.FB_USER_NAME, fbData.name);
                    AsyncStorage.setItem(Global.FB_USER_EMAIL, fbData.email);
                    AsyncStorage.setItem(Global.FB_USER_IMAGE, fbData.picture.data.url);

                    return fetch(Global.API_URL + '/auth/facebook/login', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        method: "POST",
                        body: JSON.stringify({
                            facebook_id: fbData.id,
                            facebook_token: _this.state.user.fbToken,
                            email: fbData.email,
                            name: fbData.name
                        })
                    })
                })
                .then((response) => response.json())
                .then((apiData) => {
                    if (apiData.status_code == 422) {
                        Alert.alert('Login Failed', apiData.errors[0][0]);
                    }
                    else {
                        console.log(apiData.token);
                        AsyncStorage.setItem(Global.LOGIN_TYPE, Global.FACEBOOK_LOGIN);
                        AsyncStorage.setItem(Global.API_TOKEN, apiData.token);
                        AsyncStorage.setItem(Global.API_TOKEN_EXPIRATION, apiData.expiration.toString());
                        AsyncStorage.setItem(Global.USER_ID, apiData.user.id + '');
                        AsyncStorage.setItem(Global.FB_TOKEN, _this.state.user.fbToken);
                        AsyncStorage.setItem(Global.FB_USER_ID, _this.state.user.fbUserId);
                        _this.replaceRoute('welcome');
                    }
                })
                .done();
        }
    }


    render() {
        var _this = this;
        return (
            <Grid>
                <Col style={{flex:1}}>
                    <Row style={{flex:4, backgroundColor:'#000000'}}>
                        <Col style={{flex:10, justifyContent:'center', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => {}}>
                                <Image style={{flex: 1, width: 15, height: 15}} resizeMode={Image.resizeMode.contain} source={require('../../../images/menu-options.png')}>
                                </Image>
                            </TouchableOpacity>
                        </Col>
                        <Col style={{flex:20}}/>
                        <Col style={{flex:40, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                            <Image style={{flex: 1,
                                    width: 250,
                                    height: 50}} resizeMode={Image.resizeMode.contain} source={require('../../../images/Golfskiworld-logo.png')}>
                            </Image>
                        </Col>
                        <Col style={{flex:30}}/>
                    </Row>
                    <Row style={{flex:96}}>
                        <Image style={{flex: 1, width: null, height: null}} resizeMode={Image.resizeMode.stretch} source={require('../../../images/splash.png')}>
                            <Col style={{ flex: 10 }}/>
                            <Col style={{ flex: 88 }}>
                                <Row style={{ flex: 45 }}/>
                                <Row style={{ flex: 10}}>
                                    <Col style={{ flex: 10 }}/>
                                    <Col style={{ flex: 80 }}>
                                        <Row style={{ flex: 15, flexDirection: 'row', justifyContent:'center' }}>
                                            <LoginButton
                                                publishPermissions={["publish_actions"]}
                                                onLoginFinished={this.loginWithFacebook.bind(this)}
                                                onLogoutFinished={() => alert("logout.")}
                                                />
                                        </Row>
                                    </Col>
                                    <Col style={{ flex: 10 }}/>
                                </Row>
                                <Row style={{ flex: 60 }}/>
                                <Row style={{ flex: 10}}>
                                    <Col style={{ flex: 80 }}/>
                                    <Col style={{ flex: 20 }}>
                                        <Button block small transparent style={{flex: 1, width: null, backgroundColor: '#000000', marginRight: 10}}
                                                onPress={() => Alert.alert(
                                                        '',
                                                        "Do not miss out! \r\n With facebook log in \r\n you can share golf and skiing dreams",
                                                        [
                                                          {text: 'Skip', onPress: () => this.replaceRoute('welcome')},
                                                          {text: 'Log in', onPress: () => {}},
                                                        ]
                                                      )}>
                                            <Text style={{color: '#ffffff'}}>Skip</Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col style={{ flex: 2}}/>
                        </Image>
                    </Row>
                </Col>
            </Grid>
        );
    }
}

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(Login);

//<Col style={{ flex: 20 }}/>
//<Col style={{ flex: 60 }}>
//    <Row style={{ flex: 10 }}>
//        <Button block small transparent style={{flex: 1, width: null, backgroundColor: '#000000'}}
//                onPress={() => this.replaceRoute('loginWithEmail')}>
//            <Text style={{color: '#ffffff'}}>Log in with email</Text>
//        </Button>
//    </Row>
//</Col>
//<Col style={{ flex: 20 }}/>
