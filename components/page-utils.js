/**
 * 是否有下一页
 * @param page
 * @returns {boolean}
 */
exports.hasMore = function(page) {
    var count = page.rowCount / page.rows + '';
    if (count.indexOf('.') != -1) {
        count = count.substr(0, count.indexOf('.')) * 1 + 1;
    } else {
        count = count * 1;
    }
    return page.page < count;
};