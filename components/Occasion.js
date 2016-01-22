"use strict";

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    ListView
    } = React;

import NavigationBar from './NavigationBar'

import Theme from './Theme.js'

import {getImage} from './home-api'
import OccasionList from './OccasionList.js'

var {height} = Dimensions.get('window');
var contentHeight = height - 110;

let types = {'1': '商务场合', '2': '日间社交', '3': '晚间社交'};

module.exports = React.createClass({
    renderRow: function (row, i) {
        if (i == '0') {
            return null;
        }

        let {width} = Dimensions.get('window');
        let height = width / (1080 / 475);

        return (
            <TouchableOpacity onPress={() => {
                this.props.navigator.push({
                    component: OccasionList,
                    passProps: {type: row.type},
                    navigationBar: <NavigationBar
                        style={{backgroundColor: Theme.TabBarBgColor, margin: 0, padding: 0}}
                        title={types[row.type]}
                        left={
                        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                            <View style={{flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
                                <Text style={{color: Theme.TopBarBtnColor, fontWeight: '500', fontSize: 17}}>&lt;</Text>
                                <Text style={{color: Theme.TopBarBtnColor, fontWeight: '500', fontSize: 17}}>返回</Text>
                            </View>
                        </TouchableOpacity>
                        }
                        />
                })
            }}>
                <Image source={{uri: row.image, height: height}} style={{resizeMode: Image.resizeMode.stretch, marginTop: 0}}/>
            </TouchableOpacity>
        )
    },
    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
        };
    },
    render: function () {
        return (
            <View style={{flex: 1, margin: 0, padding: 0, height: contentHeight}}>
                <ListView style={{flex: 1, padding: 0}}
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                    />
            </View>
        );
    },

    componentWillMount() {
        getImage({page: 1, rows: 4}, data => {
            let images = [
                {image: data['1'], type: '1'},
                {image: data['2'], type: '2'},
                {image: data['3'], type: '3'}
            ]
            var dataSource = this.state.dataSource.cloneWithRows(images);
            this.setState({dataSource: dataSource});
        })
    },

});
