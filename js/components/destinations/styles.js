
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    bubble: {
        width: 190,
        height: 150,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderColor: '#3333ff',
        borderRadius: 5,
        borderWidth: 1,
    },
    customView: {
        width: 190,
        height: 150,
        flexDirection: 'row',
        justifyContent:'center'
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 20,
      backgroundColor: 'transparent',
    },
    button: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
});
