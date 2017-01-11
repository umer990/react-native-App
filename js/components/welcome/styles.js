
'use strict';

import { StyleSheet, Dimensions } from "react-native";

var devWid = Dimensions.get('window').width;
var devHei = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  textTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textDescription: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    width: devWid,
    flex: 1,
    height: null,
  },
  button: {
    flex: 1,
    width: null
  },
});
