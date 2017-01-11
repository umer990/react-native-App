import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';

import Global from '../../Global';
import Deal from './LastMinute';

class DealsLastMinute extends Component {

  constructor(props) {
    super(props);
  }

  replaceRoute(route) {
      this.props.replaceRoute(route);
  }

  render() {
      var {deals} = this.props;

      let listItems = deals.deals.map((deal, index) => <Deal key={index} deal={deal}/>  );

      return (
          <ScrollView>
          <View style={{flex:1}}>
                  <Grid>
                      <Col style={{ flex: 1 }}>
                          {listItems}
                      </Col>
                  </Grid>
          </View>
          </ScrollView>
      );
  }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        deals: state.deals
    }
}

export default connect(mapStateToProps, bindAction)(DealsLastMinute);
