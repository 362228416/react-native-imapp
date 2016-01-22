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

class App extends Component {
    render() {
        let html = '<h1>title</h1>';
        return (
            <WebView
                style={{backgroundColor: '#FFF', height: 400, flex: 1}}
                automaticallyAdjustContentInsets={false}
                html={html}
                javaScriptEnabledAndroid={true}
                scalesPageToFit={true}
            />
        )
    }
}

//AppRegistry.registerComponent('imapp', () => App);
AppRegistry.registerComponent('imapp', () => imapp);
