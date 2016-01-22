"use strict";

/**
 * 本地存储实现
 * 使用AsyncStorage来存储信息
 * 统一调用该APi来存储
 * 方便以后切换存储方案
 * @param key
 * @param value
 */

var {AsyncStorage} = require('react-native');

exports.setItem = function(key, value) {
    return AsyncStorage.setItem(key, value);
};

exports.getItem = function(key) {
    return AsyncStorage.getItem(key);
};

exports.removeItem = function(key) {
    return AsyncStorage.removeItem(key);
};

exports.clear = function() {
    AsyncStorage.clear();
};