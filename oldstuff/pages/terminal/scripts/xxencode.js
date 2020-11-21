/*
XXEncoder written in Javascript
Copyrights (c) DD~! 2015
*/

var nl = "\n";

var XXEncMap =
[
    0x2b, 0x2d, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35,
    0x36, 0x37, 0x38, 0x39, 0x41, 0x42, 0x43, 0x44,
    0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x4b, 0x4c,
    0x4d, 0x4e, 0x4f, 0x50, 0x51, 0x52, 0x53, 0x54,
    0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x61, 0x62,
    0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a,
    0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70, 0x71, 0x72,
    0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a
];

function XXEncode(s)
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
        output += String.fromCharCode(XXEncMap[line_len]);

        for (var end = sidx + line_len; sidx < end; sidx += 3)
        {
            A = s[i].charCodeAt();
            i++;
            B = s[i].charCodeAt();
            i++;
            C = s[i].charCodeAt();
            i++;

            output += String.fromCharCode((XXEncMap[(A >> 2) & 63]));
            output += String.fromCharCode((XXEncMap[(B >> 4) & 15 | (A << 4) & 63]));
            output += String.fromCharCode((XXEncMap[(C >> 6) & 3 | (B << 2) & 63]));
            output += String.fromCharCode((XXEncMap[C & 63]));
        }

        output += nl;
    }

    output += String.fromCharCode(XXEncMap[len - sidx]);

    while (sidx + 2 < len)
    {
        A = s[i].charCodeAt();
        i++;
        B = s[i].charCodeAt();
        i++;
        C = s[i].charCodeAt();
        i++;

        output += String.fromCharCode((XXEncMap[(A >> 2) & 63]));
        output += String.fromCharCode((XXEncMap[(B >> 4) & 15 | (A << 4) & 63]));
        output += String.fromCharCode((XXEncMap[(C >> 6) & 3 | (B << 2) & 63]));
        output += String.fromCharCode((XXEncMap[C & 63]));
        sidx += 3;
    }

    if (sidx < len - 1)
    {
        A = s[i].charCodeAt();
        i++;
        B = s[i].charCodeAt();
        i++;

        output += String.fromCharCode((XXEncMap[(A >> 2) & 63]));
        output += String.fromCharCode((XXEncMap[(B >> 4) & 15 | (A << 4) & 63]));
        output += String.fromCharCode((XXEncMap[(B << 2) & 63]));
        output += String.fromCharCode((XXEncMap[0]));
    }
    else if (sidx < len)
    {
        A = s[i].charCodeAt();
        i++;

        output += String.fromCharCode((XXEncMap[(A >> 2) & 63]));
        output += String.fromCharCode((XXEncMap[(A << 4) & 63]));
        output += String.fromCharCode((XXEncMap[0]));
        output += String.fromCharCode((XXEncMap[0]));
    }

    return "begin 664 " + "[...]" + nl + output + nl;
}