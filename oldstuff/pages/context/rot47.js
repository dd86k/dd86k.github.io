/*
rot47.js
Copyrights (c) DD~! 2015
*/

function Rot47(s)
{
    var output = "";
    
    var len = s.length;
    for (var i = 0; i < len; i++)
    {
        var c = s[i].charCodeAt();
        if ((c >= 33) && (c <= 126))
            output += String.fromCharCode(33 + ((c + 14) % 94));
        else
            output += s[i];
    }
    
    return output;
}