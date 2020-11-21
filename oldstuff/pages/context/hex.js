/*
hex.js
Copyrights (c) DD~! 2015
*/

function eHex(s)
{
    var output = "";
    
    var len = s.length;
    for (var i = 0; i < len; i++)
    {
        var c = s[i].charCodeAt();
        output += c.toString(16).toUpperCase();
    }
    
    return output;
}

function dHex(s)
{
    var output = "";
    s = s.replace(/\s/g, "");
    s = s.replace(/-/g, "");
    
    var len = s.length;
    for (var i = 0; i < len; i += 2)
    {
        var a = s[i] + s[i + 1];
        
        var c = parseInt(a, 16);
        
        output += String.fromCharCode(c);
    }
    
    return output;
}