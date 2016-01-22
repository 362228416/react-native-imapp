"use strict";

import fetchDesigners from './des/fetchDesigners.js'

let allData = [];
let hasMore = false;
let page = 1;
let rows = 15;
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
    fetchDesigners({rows: rows, page: page}, data => {
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

module.exports = {
    getData: getData,
    loadMore: loadMore,
    addListener: addListener,
    removeListener: removeListener,
}