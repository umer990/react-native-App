'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, Picker, PickerIOS } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';
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

    reset() {
       this.setState({text: "", category: "", destination: "", planner:{from: "", to: ""}})
       this.props.serch({category: "", text: ""});
    }

    render() {
        let {categories, serch} = this.props;

        let searchOptions = {
            category: this.state.category,
            text: this.state.text,
        }

        return (
            <Col style={styles.alignRight}>
                <Row style={styles.filterContainer}>
                    <Col style={{ flex: 10}}/>
                    <Col style={{ flex: 80}}>
                        <Row style={{ flex: 5 }}/>
                        <Row style={{ flex:35, flexDirection: 'column', alignItems:'center' }}>
                            <Picker
                                style={{flex: 45}}
                                selectedValue={this.state.category}
                                onValueChange={(category) => this.setState({ category: category })}
                                itemStyle={styles.pickerItem}>
                                <Picker.Item key="category" value="" label="All Categorys"/>
                                {categories.map((category, i) => (
                                    <Picker.Item key={i}
                                                 value={category.id}
                                                 label={category.name}/>
                                ))}
                            </Picker>
                        </Row>
                        <Row style={{ flex: 5 }}/>
                        <Row style={{ flex: 15, flexDirection: "column" }}>
                            <Row style={{ flex: 1 }}>
                                <InputGroup style={styles.text}>
                                    <Input
                                        onChangeText={(text) => this.setState({ text: text })}
                                        value={this.state.text}
                                        controlled={true}
                                        placeholder="Free text"
                                        placeholderTextColor="#555555" />
                                </InputGroup>
                            </Row>
                        </Row>
                        <Row style={{ flex: 5 }}/>
                        <Row style={{ flex: 10 }}>
                            <Button block small transparent style={styles.button}
                                    onPress={() => {this.reset()}}>
                                <Text style={{fontSize: 10, color: '#ffffff'}}>Reset</Text>
                            </Button>
                        </Row>
                        <Row style={{ flex: 5 }}/>
                        <Row style={{ flex: 10 }}>
                            <Button block small transparent style={styles.button}
                                    onPress={() => {serch(searchOptions)}}>
                                <Text style={{fontSize: 10, color: '#ffffff'}}>Apply</Text>
                            </Button>
                        </Row>
                        <Row style={{ flex: 10 }}/>
                    </Col>
                    <Col style={{ flex: 10}}/>
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
