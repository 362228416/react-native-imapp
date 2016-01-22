"use strict";

import fetchFriendsContents from './des/fetchFriendsContents.js'

let allData = [];
let hasMore = false;
let page = 1;
let rows = 5;
let init = false;

let listeners = {};

const getData = () => {
    if (!init) {
        init = true;
        fetData();
    }
    return {list: allData, hasMore: hasMore};
}

const loadMore = () => {
    page++;
    fetData();
}

const addListener = (key, callback) => {
    listeners[key] = callback;
}

const removeListener = (key) => {
    delete listeners[key]
}

const fetData = () => {
    fetchFriendsContents({rows: rows, page: page, only: false}, data => {
        allData = allData.concat(data.page.list);
        hasMore = data.page.hasMore;
        callListener();
    });
}

const callListener = () => {
    for (let key in listeners) {
        listeners[key] && listeners[key]();
    }
}

const addData = (data) => {
    allData = [data].concat(allData);
    callListener();
}

module.exports = {
    getData: getData,
    addData: addData,
    loadMore: loadMore,
    addListener: addListener,
    removeListener: removeListener,
}