/**
 * Created by john on 15/7/30.
 */
exports.format = (str) => {
    var holders = str.match(/{[\s\S]*?}/g);
    for (var i = 0; holders && i < holders.length; i++) {
        var field = holders[i].replace('{', '').replace('}', '');
        var reg = new RegExp("\\{" + field + "\\}","g");
        var val = '';
        try {
            val = eval('model.' + field);
            if (val) {
                str = str.replace(reg, val);
            } else if (renderEmpty) {
                str = str.replace(reg, renderEmpty);
            }
        } catch(e){}
    }
    return str;
}