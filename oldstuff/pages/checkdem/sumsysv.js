/**
 * sumsysv.js by DD~!
 */

function sumsysv(s)
{
    var tmp = 0;

    var len = s.length || 0;
    
    for (var i = 0; i < len; i++)
    {
        tmp += (s[i].charCodeAt() & 0xFF);
    }

    var r = (tmp & 0xFFFF) + ((tmp & 0xFFFFFFFF) >> 16) & 0xFFFF;

    tmp = (r & 0xFFFF) + (r >> 16);

    var o = (tmp & 0xFFFF).toString(16);
    return Array(5 - o.length).join("0") + o;
}