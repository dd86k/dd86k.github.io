/*
UUEncoder written in Javascript
Copyrights (c) DD~! 2015
*/

var nl = "\n";

var UUEncMap =
[
    0x60, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27,
    0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x2F,
    0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
    0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F,
    0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47,
    0x48, 0x49, 0x4A, 0x4B, 0x4C, 0x4D, 0x4E, 0x4F,
    0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57,
    0x58, 0x59, 0x5A, 0x5B, 0x5C, 0x5D, 0x5E, 0x5F
];

function UUEncode(s)
{ 
    if (s.length == 0 || s === null)
        return "";

    var len = s.length;

    var sidx = 0;
    var line_len = 45;
    
    var output = "";
    var i = 0;

    var A, B, C;
    while (sidx + line_len < len)
    {
        output += String.fromCharCode(UUEncMap[line_len]);

        for (var end = sidx + line_len; sidx < end; sidx += 3)
        {
            A = s[i].charCodeAt();
            i++;
            B = s[i].charCodeAt();
            i++;
            C = s[i].charCodeAt();
            i++;

            output += String.fromCharCode((UUEncMap[(A >> 2) & 63]));
            output += String.fromCharCode((UUEncMap[(B >> 4) & 15 | (A << 4) & 63]));
            output += String.fromCharCode((UUEncMap[(C >> 6) & 3 | (B << 2) & 63]));
            output += String.fromCharCode((UUEncMap[C & 63]));
        }

        output += nl;
    }

    output += String.fromCharCode(UUEncMap[len - sidx]);

    while (sidx + 2 < len)
    {
        A = s[i].charCodeAt();
        i++;
        B = s[i].charCodeAt();
        i++;
        C = s[i].charCodeAt();
        i++;

        output += String.fromCharCode((UUEncMap[(A >> 2) & 63]));
        output += String.fromCharCode((UUEncMap[(B >> 4) & 15 | (A << 4) & 63]));
        output += String.fromCharCode((UUEncMap[(C >> 6) & 3 | (B << 2) & 63]));
        output += String.fromCharCode((UUEncMap[C & 63]));
        sidx += 3;
    }

    if (sidx < len - 1)
    {
        A = s[i].charCodeAt();
        i++;
        B = s[i].charCodeAt();
        i++;

        output += String.fromCharCode((UUEncMap[(A >> 2) & 63]));
        output += String.fromCharCode((UUEncMap[(B >> 4) & 15 | (A << 4) & 63]));
        output += String.fromCharCode((UUEncMap[(B << 2) & 63]));
        output += String.fromCharCode((UUEncMap[0]));
    }
    else if (sidx < len)
    {
        A = s[i].charCodeAt();
        i++;

        output += String.fromCharCode((UUEncMap[(A >> 2) & 63]));
        output += String.fromCharCode((UUEncMap[(A << 4) & 63]));
        output += String.fromCharCode((UUEncMap[0]));
        output += String.fromCharCode((UUEncMap[0]));
    }

    return "begin 664 " + "[...]" + nl + output + nl;
}