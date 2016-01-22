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

import Page from './Page.js'
import {getAd} from './home-api'

var {width, height} = Dimensions.get('window');
var contentHeight = height - 64;

module.exports = React.createClass({
    page: 1,
    rows: 8,
    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            data: [],
            hasMore: false,
            dataSource: ds.cloneWithRows([]),
        };
    },
    openPage(row) {
        this.props.navigator.push({
            component: Page,
            passProps: {pid: row.itemLink.replace('page/', '')},
            navigationBar: <NavigationBar
                style={{backgroundColor: Theme.TopBarBgColor, margin: 0, padding: 0}}
                title={row.itemName}
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
    },
    renderRow: function (rows) {
        let row = rows[0], row2 = rows[1];

        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => this.openPage(row)}>
                    <View style={{margin: 4, width: 150, backgroundColor: 'rgb(255,255,255)'}}>
                        <Image source={{uri: row.itemImg, height: 184, width: 150}} style={{resizeMode: Image.resizeMode.stretch}}/>
                        <View style={{flexDirection: 'row', height: 44, alignItems: 'center'}}>
                            <Text style={{flex: 12, marginLeft: 8, color: '#9a9a9a', fontWeight: '300', fontSize: 15}}>{'¥ ' + row.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {row2 ?
                    <TouchableOpacity onPress={() => this.openPage(row2)}>
                        <View style={{margin: 4, width: 150, backgroundColor: 'rgb(255,255,255)'}}>
                            <Image source={{uri: row2.itemImg, height: 184, width: 150}}
                                   style={{resizeMode: Image.resizeMode.stretch}}/>
                            <View style={{flexDirection: 'row', height: 44, alignItems: 'center'}}>
                                <Text
                                    style={{flex: 12, marginLeft: 8, color: '#9a9a9a', fontWeight: '300', fontSize: 15}}>{'¥ ' + row2.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    : null
                }
            </View>
        )
    },
    render: function () {
        return (
            <ListView
                onEndReachedThreshold={0}
                onEndReached={() => {this.state.hasMore && this.loadMore()}}
                style={{backgroundColor: Theme.BgColor, height: contentHeight}}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
        );
    },
    fetchData(page, callback) {
        let type = this.props.route.passProps.type;
        getAd({type: type, rows: this.rows, page: page}, data => {
            var all = this.state.data.concat(data.page.list);

            var newData = [];
            all.map((row, i) => {
                if (i % 2 == 0) {
                    newData[i] = [row]
                } else {
                    newData[i-1].push(row);
                }
            });

            var dataSource = this.state.dataSource.cloneWithRows(newData);
            this.setState({data: all, hasMore: data.page.hasMore, dataSource: dataSource});

            callback && callback();
        });
    },
    loadMore(callback) {
        this.page = this.page + 1;
        this.fetchData(this.page, callback);
    },
    componentWillMount() {
        this.fetchData(this.page);
    },

});