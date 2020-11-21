/**
 * sumbsd.js by DD~!
 */
 
"use strict";

function sumbsd(s)
{
    var tmp = 0;

    var len = s.length || 0;
    
    for (var i = 0; i < len; i++)
    {
        tmp = (tmp >> 1) + ((tmp & 1) << 15);
        tmp += (s[i].charCodeAt() & 0xFF);
        tmp &= 0xFFFF;
    }

    var o = tmp.toString(16);
    return Array(5 - o.length).join("0") + o;
}