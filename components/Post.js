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
    Modal,
    ActivityIndicatorIOS,
    ToastAndroid,
    TextInput,
    CameraRoll,
    ListView
    } = React;


var UIImagePickerManager = require('NativeModules').UIImagePickerManager;


// Specify any or all of these keys
var options = {
    title: '', // specify null or empty string to remove the title
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: '从手机相册选择', // specify null or empty string to remove this button
    maxWidth: 1280,
    maxHeight: 1280,
    quality: 0.2,
    allowsEditing: false, // Built in iOS functionality to resize/reposition the image
    noData: false, // Disables the base64 `data` field from being generated (greatly improves performance on large photos)
    storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
    }
};


var {height, width} = Dimensions.get('window');
var contentHeight = height - 64;

module.exports = React.createClass({
    getDefaultProps() {
        return {route: {passProps: {}}}
    },
    getInitialState() {
        let {content, files} = this.props.route.passProps;
        return {content: content || '', files: files || []}
    },
    componentWillMount() {
        
    },
    onSelectFile() {
        let {onPostEdit} = this.props.route.passProps;

        UIImagePickerManager.showImagePicker(options, (didCancel, response) => {
            if (!didCancel) {
                this.state.files.push(response.data);
                this.setState({
                    files: this.state.files
                });
                onPostEdit && onPostEdit(this.state)
            }
        });

        //CameraRoll.getPhotos({first: 1, after: undefined, assetType: 'Photos', groupTypes: 'All'}, e => {
        //    console.log(e);
        //}, e => {
        //    console.log('err', e);
        //})
    },
    renderImages(file, i) {
        return (
            <View key={i} style={{paddingTop: 8, paddingBottom: 7, paddingLeft: 0, paddingRight: 6}}>
                <Image source={{uri: 'data:image/jpeg;base64,' + file, width: 57, height: 57}}/>
            </View>
        )
    },
    render() {
        let {onPostEdit} = this.props.route.passProps;

        let images = this.state.files.map(this.renderImages);

        return (
            <ScrollView style={{ backgroundColor: '#f0f0f0'}}>
                <View style={{padding: 8,backgroundColor: 'rgb(255,255,255)'}}>
                    <TextInput
                        placeholder="晒晒自己的形象吧！"
                        multiline={true}
                        style={{height: 96, fontSize: 15}}
                        onChangeText={(content) => {
                            this.setState({content: content})
                            onPostEdit && onPostEdit(this.state)
                        }}
                        value={this.state.content}
                      />
                    <Text style={{fontFamily: 'iconfont', color: '#737373', fontSize: 23, marginTop: -28, marginLeft: 3, position: 'absolute', backgroundColor: 'transparent'}}>&#xe61a;</Text>
                    <View style={{flexDirection: 'row', width: width - 16, overflow: 'hidden'}}>
                        <TouchableOpacity onPress={this.onSelectFile}>
                            <Text style={{fontFamily: 'iconfont', color: '#737373', fontSize: 72, }}>&#xe618;</Text>
                        </TouchableOpacity>
                        {images.slice(0, 4)}
                    </View>
                    <View style={{flexDirection: 'row', width: width - 16, overflow: 'hidden'}}>
                        {images.slice(4)}
                    </View>
                    <Text style={{color: '#737373', marginLeft: 8, marginBottom: 8}}>最多可上传9张图片</Text>
                </View>
            </ScrollView>
        )
    }
})
