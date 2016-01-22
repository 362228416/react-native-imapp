"use strict";

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    ToastAndroid,
    ListView
    } = React;

import NavigationBar from './NavigationBar'
import Theme from './Theme.js'

import DesignerDetail from './DesignerDetail.js'

import DesignerStore from './DesignerStore.js'

var {width, height} = Dimensions.get('window');
var contentHeight = height - 115;

module.exports = React.createClass({
    page: 1,
    rows: 15,
    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            hasMore: false,
            dataSource: ds.cloneWithRows([]),
        };
    },
    loadData() {
        let data = DesignerStore.getData();
        var dataSource = this.state.dataSource.cloneWithRows(data.list);
        this.setState({hasMore: data.hasMore, dataSource: dataSource});
    },
    loadMore(callback) {
        DesignerStore.loadMore();
    },
    componentWillMount() {
        DesignerStore.addListener('designer', this.loadData);
        this.loadData();
    },
    componentWillUnmount() {
        DesignerStore.removeListener('designer');
    },
    render: function () {
        return (
            <ListView
                onEndReachedThreshold={0}
                onEndReached={() => {this.state.hasMore && this.loadMore()}}
                style={{backgroundColor: Theme.BgColor, height: contentHeight}}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
            />
        );
    },
    renderSeparator(r, i) {
        return (
            <View key={i} style={{height: 1, backgroundColor: '#ccc', marginLeft: 6, marginRight: 6}}></View>
        )
    },
    renderRow: function (row, r, i) {
        return (
            <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.openPage(row)} style={{flex: 1}}>
                    <View style={{margin: 0, padding: 6, paddingLeft: 12, backgroundColor: 'rgb(255,255,255)', flexDirection: 'row'}}>
                        <Image source={{uri: row.fileName, height: 50, width: 50}} style={{resizeMode: Image.resizeMode.stretch, borderRadius: 25}}/>
                        <View style={{flex: 7, height: 44, marginLeft: 16, alignItems: 'flex-start'}}>
                            <Text style={{color: '#9a9a9a', fontWeight: '400', fontSize: 15, marginBottom: 10}}>{row.memName}</Text>
                            <Text style={{fontSize: 12, color: '#9a9a9a'}}>{row.yzm ? ('' + row.yzm).replace(/,/, '、') : ''}</Text>
                        </View>
                        <View style={{flex: 3, paddingTop: 18, alignItems: 'flex-end'}}>
                            <Text style={{color: '#9a9a9a'}}>{' ' + row.distance.toFixed(2) + ' km'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    },
    openPage(row) {
        this.props.navigator.push({
            component: DesignerDetail,
            passProps: {data: row},
            navigationBar: <NavigationBar
                style={{backgroundColor: Theme.TopBarBgColor, margin: 0, padding: 0}}
                title={row.memName}
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

})
