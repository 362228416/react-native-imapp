"use strict";

import StoreApi from './StoreApi.js'

let lastLoginUser;

let storeData;

let init = false;

let listeners = {};

const getData = () => {
    return storeData;
}

const getLastLoginUser = () => {
    return lastLoginUser;
}

const addListener = (key, callback) => {
    listeners[key] = callback;
}

const removeListener = (key) => {
    delete listeners[key]
}

const callListener = () => {
    for (let key in listeners) {
        listeners[key] && listeners[key]();
    }
}

const setData = (data) => {
    if (data) {
        lastLoginUser = data;
    } else {
        lastLoginUser = storeData;
    }
    storeData = data;
    StoreApi.setItem('user', JSON.stringify(data));
    StoreApi.setItem('lastLoginUser', JSON.stringify(lastLoginUser));
    callListener();
}

const checkLogin = (callback) => {
    StoreApi.getItem('lastLoginUser').done((data) => {
        lastLoginUser = JSON.parse(data);
        StoreApi.getItem('user').done((data) => {
            storeData = JSON.parse(data);
            callback && callback(storeData);
        });
    });
}

module.exports = {
    checkLogin: checkLogin,
    getLastLoginUser: getLastLoginUser,
    getData: getData,
    setData: setData,
    addListener: addListener,
    removeListener: removeListener,
}