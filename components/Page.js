"use strict";

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    WebView,
    Dimensions,
    Platform,
    TouchableHighlight,
    TouchableOpacity,
    ToastAndroid,
    ListView
    } = React;

import Theme from './Theme.js'

var {height} = Dimensions.get('window');
var contentHeight = height - 64;

import {getPage} from './home-api'

module.exports = React.createClass({
    getInitialState() {
        return {content: null}
    },
    componentWillMount() {
        var pid = this.props.route.passProps.pid;
        getPage({pid: pid}, data => {
            let content = data.results[0].content;
            this.setState({content: content})
        })
    },
    render() {

        let html = `<html>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
            img {max-width: 100%}
            </style>
            <body>
            <h1>${this.state.content}</h1>
            </body>
        </html>`;

        return (
            <WebView
                style={{backgroundColor: Theme.BgColor, height: contentHeight, flex: 1}}
                automaticallyAdjustContentInsets={false}
                html={html}
                javaScriptEnabledAndroid={true}
                scalesPageToFit={true}
            />
        )
    }
})
