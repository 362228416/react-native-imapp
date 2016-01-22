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
    SegmentedControlIOS,
    ToastAndroid,
    ListView
    } = React;

import NavigationBar from './NavigationBar'

import fetchBranchs from './des/fetchBranchs.js'
import DesignerDetail from './DesignerDetail.js'

var {width, height} = Dimensions.get('window');
var contentHeight = height - 64;

module.exports = React.createClass({
    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            data: [],
            hasMore: false,
            dataSource: ds.cloneWithRows([]),
        };
    },
    componentWillMount() {
        this.fetchData();
    },
    render: function () {
        return (
            <SegmentedControlIOS values={['形象顾问', '15小时会所']} />
        );
    },
    renderSeparator() {
        return (
            <View style={{height: 1, backgroundColor: '#ccc', marginLeft: 6, marginRight: 6}}></View>
        )
    },
    renderRow: function (row, i) {
        return (
            <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.openPage(row)} style={{flex: 1}}>
                    <View style={{margin: 0, padding: 6, paddingLeft: 12, backgroundColor: 'rgb(255,255,255)', flexDirection: 'row'}}>
                        <Image source={{uri: row.fileName, height: 50, width: 50}} style={{resizeMode: Image.resizeMode.stretch, borderRadius: 25}}/>
                        <View style={{flex: 7, height: 44, marginLeft: 16, alignItems: 'flex-start'}}>
                            <Text style={{color: '#9a9a9a', fontWeight: '400', fontSize: 15, marginBottom: 10}}>{row.brName}</Text>
                            <Text style={{fontSize: 12, color: '#9a9a9a'}}>{row.address}</Text>
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
                style={{backgroundColor: "rgb(127,127,127)", margin: 0, padding: 0}}
                title={row.memName}
                left={
                        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                            <View style={{flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
                                <Text style={{color: 'rgb(255,255,255)', fontWeight: '500', fontSize: 17}}>&lt;</Text>
                                <Text style={{color: 'rgb(255,255,255)', fontWeight: '500', fontSize: 17}}>返回</Text>
                            </View>
                        </TouchableOpacity>
                        }
                />
        })
    },
    fetchData() {
        fetchBranchs(data => {
            var all = this.state.data.concat(data.results);
            var dataSource = this.state.dataSource.cloneWithRows(all);
            this.setState({data: all, dataSource: dataSource});
        });
    },


})
