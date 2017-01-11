import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Spinner } from 'native-base';
import { replaceRoute } from '../../actions/route';

class DealsPrice extends Component {
  replaceRoute(route) {
      this.props.replaceRoute(route);
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'green'}}>
      </View>
    );
  }
}


function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(DealsPrice);
