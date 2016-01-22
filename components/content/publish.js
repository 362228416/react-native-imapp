var http = require('../http');

/**
 * 发布形象
 * @param content
 */
module.exports = function(content, callback, errCallback) {
    http.post('/ws/content/add', content, callback);
};