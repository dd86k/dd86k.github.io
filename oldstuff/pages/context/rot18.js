/*
rot18.js
Copyrights (c) DD~! 2015
*/

function Rot18(s)
{
    var out = "";
    var len = s.length
    for (var i = 0; i < len; i++)
    {
        var n = s[i].charCodeAt();
        // A to N, or a to n.
        if ((n >= 65 && n <= 77) || (n >= 97 && n <= 109))
            n += 13;
        // M to Z, or m to z.
        else if ((n >= 78 && n <= 90) || (n >= 110 && n <= 122))
            n -= 13;
        else if (n >= 48 && n <= 52)
            n += 5;
        else if (n >= 53 && n <= 57)
            n -= 5;
        out += String.fromCharCode(n);
    }
    
    return out;
}