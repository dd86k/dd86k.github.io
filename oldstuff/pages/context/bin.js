/*
bin.js
Copyrights (c) DD~! 2015
*/

function eBin(s)
{
    var output = "";
    
    var len = s.length;
    for (var i = 0; i < len; i++)
    {
        var c = s[i].charCodeAt();
        c = c.toString(2);
        switch (c.length)
        {
            case 0: c = "00000000"; break;
            case 1: c = "0000000" + c; break;
            case 2: c = "000000" + c; break;
            case 3: c = "00000" + c; break;
            case 4: c = "0000" + c; break;
            case 5: c = "000" + c; break;
            case 6: c = "00" + c; break;
            case 7: c = "0" + c; break;
        }
        output += c;
    }
    
    return output;
}

function dBin(s)
{
    var output = "";
    s = s.replace(/\s/g, "");
    s = s.replace(/-/g, "");
    
    var len = s.length;
    for (var i = 0; i < len; i += 8)
    {
        var a = s[i] + s[i + 1] + s[i + 2] + s[i + 3] + s[i + 4] + s[i + 5] + s[i + 6] + s[i + 7];
        
        var c = parseInt(a, 2);
        
        output += String.fromCharCode(c);
    }
    
    return output;
}