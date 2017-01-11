import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View , Thumbnail} from 'native-base';
import { replaceRoute } from '../../actions/route';
import Global from '../../Global';
import { setTabBar } from '../../actions/tabBar';

class DealImage extends Component {

    constructor(props) {
        super(props);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        var {thumbnail, setTabBar} = this.props;

        return (
            <Image style={{ flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={ {uri: thumbnail} }>
                <Grid>
                    <Row style={{ flex: 5 }}/>
                    <Row style={{ flex: 15, paddingLeft: 10 }}>
                        <TouchableOpacity onPress={() => {setTabBar('LastMinuteTabBar', 3)}}>
                            <Thumbnail style={{flex: 1, backgroundColor: "rgba(0,0,0,0.5)", width:30, height:30}} resizeMode={Image.resizeMode.cover} source={require('../../../images/back-button.png')}>
                            </Thumbnail>
                        </TouchableOpacity>
                    </Row>
                    <Row style={{ flex: 80 }}/>
                </Grid>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {
        setTabBar: (name, initialPage) => dispatch(setTabBar(name, initialPage)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(DealImage);
