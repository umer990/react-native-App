'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, Picker, PickerIOS } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';
import { AccessToken, LoginManager} from 'react-native-fbsdk';
const Item = Picker.Item;

import styles from './styles';
import Global from '../../Global';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';



class MapFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: "",
            text: "",
            destination: "",
            planner: {
                from: "",
                to: "",
            }
        };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    async logout() {
        LoginManager.logOut();

        await AsyncStorage.clear();
        //let FBAuth =  await AccessToken.setCurrentAccessToken("");
        this.replaceRoute('login');
    }

    reset() {
        this.setState({text: "", category: ""})
        this.props.serch({category: "", text: ""});
    }

    render() {
        let {categories, serch} = this.props;

        let searchOptions = {
            category: this.state.category,
            text: this.state.text,
        }

        return (
            <Col style={{flex: 1}}>
                <Row style={styles.menuContainer}>
                    <TouchableOpacity onPress={()=> {this.logout()}}>
                        <Text style={{color:"white", fontSize: 8}}>Logout</Text>
                    </TouchableOpacity>
                </Row>
            </Col>
        );
    }
}

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, bindActions)(MapFilter);
