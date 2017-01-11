import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon, Alert } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import { replaceRoute } from '../../actions/route';
import { setDealList } from '../../actions/deals';
import { setDestinations } from '../../actions/destinations';
import { setFilterMap } from '../../actions/filterMap';
import { getDestinations } from '../../api/destinations';
import Destinations from "../destinations"
import TabBar from '../tabBar';
import { setTabBar } from '../../actions/tabBar';
import MapFilter from './MapFilter';
import Menu from './Menu';
import Global from '../../Global';
import theme from '../../themes/base-theme';
import styles from './styles';

class World extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisibles: false,
            menuVisibles: false,
            lastMinutesIsTabActive: true
        };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    handleTabChange(obj) {
        if(obj.i == 3)
            this.replaceRoute('welcome');
    }

    toggleFilter() {
        this.setState({
            filterVisibles: !this.state.filterVisibles
        });
    }

    toggleMenu() {
        this.setState({
            menuVisibles: !this.state.menuVisibles
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@', nextProps.deals.isTabActive);


        let isTabActive = (["LastMinuteTabBar", "LastMinuteMoreTabBar", "LastMinuteOnMapTabBar"].indexOf(nextProps.tabBar.name) != -1  && nextProps.tabBar.initialPage == 3) ? true : false;


        this.setState({
            lastMinutesIsTabActive: isTabActive
        });
    }

    toggleLastMinuteLabel() {
        let tabBar = (this.props.tabBar.name == "LastMinuteMoreTabBar") ? "LastMinuteMoreTabBar" : "LastMinuteTabBar";
        this.props.setTabBar(tabBar, 3);

        if (!this.state.lastMinutesIsTabActive) {
            this.setState({
                lastMinutesIsTabActive: !this.state.lastMinutesIsTabActive
            });
        }
    }

    async serch(options) {
        options.apiToken = await AsyncStorage.getItem(Global.API_TOKEN);
        options.coordinates = {
            longMin: "",
            longMax: "",
            latMin: "",
            latMax: "",
        }

        const destinationsJson = await getDestinations(options);
        let destinations = await destinationsJson.json();
        this.props.setDestinations(destinations);
        this.props.setFilterMap({category: options.category, text: options.text, show: true});
        this.setState({filterVisibles: !this.state.filterVisibles});

    }

    render() {
        let filterLabelVisibles = this.props.filterMap.show ? styles.showFilterLabel : styles.hiddenFilterLabel;
        let filterVisibles = this.state.filterVisibles ?  styles.showFilter : styles.hiddenFilter;
        let menuVisibles = this.state.menuVisibles ?  styles.showMenu : styles.hiddenMenu;
        let lastMinuteTabBackground = this.state.lastMinutesIsTabActive ? {backgroundColor:'#404040'} : {backgroundColor:'#000000'}


        return (
            <Grid>
                <Col style={{flex:1}}>
                    <Row style={{flex:1, backgroundColor:'#000000'}}>
                        <Col style={{flex:10, justifyContent:'center', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => {this.toggleMenu()}}>
                                <Image style={{flex: 1, width: 15, height: 15}} resizeMode={Image.resizeMode.contain} source={require('../../../images/menu-options.png')}>
                                </Image>
                            </TouchableOpacity>
                        </Col>
                        <Col style={{flex:20}}/>
                        <Col style={{flex:40}}>
                            <Row style={{flex:1}}>
                                <Col style={{flex:70, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                                    <Image style={{flex: 1,
                                    width: 250,
                                    height: 50}} resizeMode={Image.resizeMode.contain} source={require('../../../images/Golfskiworld-logo.png')}>
                                    </Image>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{flex:15}}>
                            <Row style={{flex:1, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                                <Col style={filterLabelVisibles}>
                                    <TouchableOpacity onPress={()=> {this.toggleFilter()}}>
                                        <Text style={{color:'white', fontSize: 8}}>Filter</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{flex:2}}/>
                        <Col style={{flex:12}}>
                            <Row style={[{flex:1, flexDirection: 'row', justifyContent:'center', alignItems:'center'},  lastMinuteTabBackground]}>
                                <Col style={{flex:1}}>
                                    <TouchableOpacity onPress={() => {this.toggleLastMinuteLabel()}}>
                                        <Image style={{flex: 1, width: 40, height: 20}} resizeMode={Image.resizeMode.contain} source={require('../../../images/last_minute.png')}>
                                        </Image>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </Col>


                    </Row>
                    <Row style={menuVisibles}>
                        <Menu/>
                    </Row>
                    <Row style={filterVisibles}>
                        <MapFilter serch={this.serch.bind(this)}/>
                    </Row>
                    <Row style={{flex:25}}>
                        <TabBar/>
                    </Row>
                </Col>
            </Grid>
        )
    }
}

function bindAction(dispatch) {
    return {
        setTabBar: (name, initialPage) => dispatch(setTabBar(name, initialPage)),
        setFilterMap: (filter) => dispatch(setFilterMap(filter)),
        setDestinations: (destinations) => dispatch(setDestinations(destinations)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        tabBar: state.tabBar,
        filterMap: state.filterMap,
        deals: state.deals,
    }
}

export default connect(mapStateToProps, bindAction)(World);
