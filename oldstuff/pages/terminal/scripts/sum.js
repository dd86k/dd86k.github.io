/*
SumBSD and SumSysV algorithms implementations in Javascript
Copyrights (c) 2015 DD~!
*/
"use strict";

var tmp = 0;

function HashTextSumBSD(pText)
{
    tmp = 0;

    UpdateSumBSD(pText);

    if (tmp < 999)
        tmp = "00" + tmp;
    else if (tmp < 9999)
        tmp = "0" + tmp;

    return tmp + " " + pText;
}

function UpdateSumBSD(s)
{
    var len = s.length || 0;
    
    for (var i = 0; i < len; i++)
    {
        tmp = (tmp >> 1) + ((tmp & 1) << 15);
        tmp += (s[i].charCodeAt() & 0xFF);
        tmp &= 0xFFFF;
    }
}

function HashTextSumSysV(pText)
{
    tmp = 0;

    UpdateSumSysV(pText);

    var r = (tmp & 0xFFFF) + ((tmp & 0xFFFFFFFF) >> 16) & 0xFFFF;

    tmp = (r & 0xFFFF) + (r >> 16);

    return (tmp & 0xFFFF) + " " + pText;
}

function UpdateSumSysV(s)
{
    var len = s.length || 0;
    
    for (var i = 0; i < len; i++)
    {
        tmp += (s[i].charCodeAt() & 0xFF);
    }
}