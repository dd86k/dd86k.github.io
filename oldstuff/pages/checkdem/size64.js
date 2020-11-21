/**
 * size64.js by DD~!
 */

function size64(s)
{
    var o = s.length.toString(16);
    return Array(17 - o.length).join("0") + o;
}