import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';

import { setTabBar } from '../../actions/tabBar';
import DestinationMoreTabBar from '../tabBar/DestinationMoreTabBar'

import Global from '../../Global';
import styles from './styles';

import MapView, { Marker, Callout } from 'react-native-maps';
import { CustomCallout } from './Callout';

class DestinationCallout extends Component {

    constructor(props) {
        super(props);

    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        let {destination, setTabBar} = this.props;

        return (

            <View style={styles.bubble}>
                <Grid >
                    <Row style={{ flex: 2 }}/>
                    <Row style={{ flex: 8, flexDirection: 'row', justifyContent:'center' }}>
                        <Text style={{fontSize: 10}}>{destination.name}</Text>
                    </Row>

                    <Row style={{ flex: 65 }}>
                        <Col style={{ flex: 50, paddingLeft: 5  }}>
                            <Row style={{ flex: 10 }}/>
                            <Row style={{ flex: 20 }}>
                                <Text style={{fontSize: 6}}>{destination.street}</Text>
                            </Row>
                            <Row style={{ flex: 10 }}/>
                            <Row style={{ flex: 20 }}>
                                <Text style={{fontSize: 6}}>Telefon: {destination.phone}</Text>
                            </Row>
                            <Row style={{ flex: 10 }}/>
                            <Row style={{ flex: 20 }}>
                                <Text style={{fontSize: 6}}>...</Text>
                            </Row>
                            <Row style={{ flex: 20 }}/>
                        </Col>
                        <Col style={{ flex: 50, paddingRight: 5 }}>
                            <Row style={{ flex: 10 }}/>
                            <Row style={{ flex: 80 }}>
                                <Image style={{flex: 1, borderRadius: 5}} resizeMode={Image.resizeMode.cover} source={ {uri: destination.thumbnail} }>
                                </Image>
                            </Row>
                            <Row style={{ flex: 10 }}/>
                        </Col>
                    </Row>

                    <Row style={{ flex: 25}}>
                        <Col style={{ flex: 60,  }}>
                            <Row style={{ flex: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{fontSize: 6}}>Images ........</Text>
                            </Row>
                        </Col>
                        <Col style={{ flex: 40, paddingRight: 5 }}>
                            <Row style={{ flex: 15 }}>
                                <Button block small simple style={{flex: 1, paddingRight: 5}} onPress={() => setTabBar('DestinationMoreTabBar', 1)}>
                                    <Text style={{color: 'white'}}>Read more</Text>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        setTabBar: (name, initialPage) => dispatch(setTabBar(name, initialPage)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        destination: state.destination
    }
}

export default connect(mapStateToProps, bindAction)(DestinationCallout);
