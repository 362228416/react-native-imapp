/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  WebView,
  View
} from 'react-native';

let imapp = require('./components/App');

AppRegistry.registerComponent('imapp', () => imapp);
