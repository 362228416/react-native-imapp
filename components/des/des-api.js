var http = require('http');

/**
 * 搜索设计师
 * @param params {name: ..}
 * @param callback
 */
exports.searchDesigners = function(params, callback) {
    http.getJSON('/cxf/vip/getDesigners', params, data => {
        data.results = typeof data.results == 'undefined' ? [] : data.results;
        data.results = typeof data.results.length == 'undefined' ? [data.results] : data.results;
        callback && callback(data);
    });
};
