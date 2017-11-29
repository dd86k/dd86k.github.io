/**
 * xor8.js by DD~!
 */

function xor8(s)
{
    var tmp = "";
    var len = s.length;
    for (var i = 0; i < len; i++)
    {
        tmp ^= s[i].charCodeAt();
    }
    
    var o = tmp.toString(16);
    return (o.length < 2 ? "0" + o : o);
}