"use strict";

import http from './http'
import {hasMore} from './page-utils.js'

let images = null;

export const getImage = function(params, callback) {
    if (images) {
        callback && callback(images);
    } else {
        http.get('/ws/home/image', params, data => {
            images = {};
            data.page.list.map(row => {
                images[row.type] = row.image;
            });
            callback && callback(images);
        });
    }
};

export const getAd = function(params, callback) {
    http.get('/ws/home/ad', params, data => {
        data.page.hasMore = hasMore(data.page);
        callback && callback(data);
    });
};

export const getPage = function(params, callback) {
    http.get('/ws/page/view', params, data => {
        callback && callback(data);
    });
};

