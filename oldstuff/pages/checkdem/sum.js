/**
 * sum.js by DD~!
 */

function sum(s, b)
{
    var tmp = "";
    var len = s.length;
    for (var i = 0; i < len; i++)
    {
        tmp += s[i].charCodeAt();
    }
    tmp  = tmp.toString(16);
    return Array((b + 1) - tmp.length).join("0") + tmp;
}