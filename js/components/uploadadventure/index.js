import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { replaceRoute } from '../../actions/route';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

class UploadAdventure extends Component {
  replaceRoute(route) {
      this.props.replaceRoute(route);
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <ActionButton buttonColor="#1abc9c">
         <ActionButton.Item buttonColor='#9b59b6' title="Upload Photo" onPress={() => console.log("notes tapped!")}>
           <Icon name="ios-image" style={styles.actionButtonIcon} />
         </ActionButton.Item>
         <ActionButton.Item buttonColor='#3498db' title="Upload Video" onPress={() => {}}>
           <Icon name="md-videocam" style={styles.actionButtonIcon} />
         </ActionButton.Item>
       </ActionButton>
      </View>
    );
  }
}


function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(UploadAdventure);
