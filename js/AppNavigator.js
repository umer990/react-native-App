
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/core';
import { Drawer } from 'native-base';
import { BackAndroid, StatusBar, AsyncStorage } from 'react-native';
import { closeDrawer } from './actions/drawer';
import { popRoute } from './actions/route';
import Navigator from 'Navigator';
import { replaceRoute } from './actions/route';
import Global from './Global';
import Splash from './components/splash/';
import Register from './components/register/';
import Login from './components/login/';
import LoginWithEmail from './components/loginWithEmail/';
import Welcome from './components/welcome/';
import World from './components/world';
import SideBar from './components/sideBar';
import Dashboard from './components/dashboard/';
import DealMore from './components/dealsLastMinute/LastMinuteMore';
import DestinationReadMore from './components/destinations/DestinationReadMore';
import DealMap from './components/dealsLastMinute/DealMap';
import Settings from './components/settings/';
import Web from './components/web';

export var globalNav = {};

const searchResultRegexp = /^search\/(.*)$/;

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        var currentState = state;

        if(currentState){
            while (currentState.children){
                currentState = currentState.children[currentState.index]
            }
        }
        return defaultReducer(state, action);
    }
};

const drawerStyle  = { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3};

class AppNavigator extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        globalNav.navigator = this._navigator;
        this.props.store.subscribe(() => {
            if(this.props.store.getState().drawer.drawerState == 'opened')
                this.openDrawer();

            if(this.props.store.getState().drawer.drawerState == 'closed')
                this._drawer.close()
        });

        BackAndroid.addEventListener('hardwareBackPress', () => {
            var routes = this._navigator.getCurrentRoutes();

            if(routes[routes.length - 1].id == 'welcome') {
              this.replaceRoute('login');
            } else if(routes[routes.length - 1].id == 'register') {
              this.replaceRoute('login');
            } 
            /*else {
                this.popRoute();
                return true;
            }*/
            return true;
        });
    }

    popRoute() {
        this.props.popRoute();
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }
    openDrawer() {
        this._drawer.open();
    }

    closeDrawer() {
        if(this.props.store.getState().drawer.drawerState == 'opened') {
            this._drawer.close();
            this.props.closeDrawer();
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={ <SideBar navigator={this._navigator} /> }
                tapToClose={true}
                acceptPan={false}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}>
                <StatusBar
                    hidden={true}
                    barStyle="light-content"
                />
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => {
                        return {
                            ...Navigator.SceneConfigs.FloatFromRight,
                            gestures: {}
                        };
                    }}
                    initialRoute={{id: 'login'}}
                    renderScene={this.renderScene}
                />
            </Drawer>
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'splash':
              return <Splash navigator={navigator} />;
            case 'register':
              return <Register navigator={navigator} />;
            case 'login':
                return <Login navigator={navigator} />;
            case 'loginWithEmail':
                return <LoginWithEmail navigator={navigator} />;
            case 'welcome':
                return <Welcome navigator={navigator} />;
            case 'world':
                return <World navigator={navigator} />;
            case 'dashboard':
                return <Dashboard navigator={navigator} />;
            case 'dealMap':
                return <DealMap navigator={navigator} />;
            case 'settings':
                return <Settings navigator={navigator} />;
            case 'web':
                return <Web navigator={navigator} />;
            default :
                return <Login navigator={navigator}  />;
        }
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        drawerState: state.drawer.drawerState
    }
}

export default connect(mapStateToProps, bindAction) (AppNavigator);
