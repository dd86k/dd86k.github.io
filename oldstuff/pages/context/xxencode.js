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

var XXDecMap = 
[
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F,
    0x2E, 0x2F, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35,
    0x36, 0x37, 0x38, 0x39, 0x41, 0x42, 0x43, 0x44,
    0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x4b, 0x4c,
    0x4d, 0x4e, 0x4f, 0x50, 0x51, 0x52, 0x53, 0x54,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
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

    return output;
}
/*
function XXDecode(s)
{
    if (s.length == 0 || s === null)
        return "";

    var output = "";
    var didx = 0;
    var i = 0;
    
    //temporary
    var tmp = 0;
    
    var nextByte = s[i].charCodeAt(); 
    i++;
    
    while (nextByte >= 0)
    {
        // get line length (in number of encoded octets)
        var line_len = XXDecMap[nextByte];

        // ascii printable to 0-63 and 4-byte to 3-byte conversion
        var end = didx + line_len;
        var A, B, C, D;
        if (end > 2)
        {
            while (didx < end - 2)
            {
                A = XXDecMap[s[i].charCodeAt()];
                i++;
                B = XXDecMap[s[i].charCodeAt()];
                i++;
                C = XXDecMap[s[i].charCodeAt()];
                i++;
                D = XXDecMap[s[i].charCodeAt()];
                i++;

                output += String.fromCharCode(((A << 2) & 255) | ((B >> 4) & 3));
                output += String.fromCharCode(((B << 4) & 255) | ((C >> 2) & 15));
                output += String.fromCharCode(((C << 6) & 255) | (D & 63));
                didx += 3;
            }
        }

        if (didx < end)
        {
            A = XXDecMap[s[i]];
            i++;
            B = XXDecMap[s[i]];
            i++;
            
            output += String.fromCharCode(((A << 2) & 255) | ((B >> 4) & 3));
            didx++;
        }

        if (didx < end)
        {
            B = XXDecMap[s[i]];
            i++;
            C = XXDecMap[s[i]];
            i++;
            
            output += String.fromCharCode(((B << 4) & 255) | ((C >> 2) & 15));
            didx++;
        }

        // skip padding
        do
        {
            nextByte = s[i];
            if (nextByte != null)
                nextByte = nextByte.charCodeAt();
            i++;
        } while (nextByte >= 0 && nextByte != '\n' && nextByte != '\r');
 
        // skip end of line
        do
        {
            nextByte = s[i];
            i++;
        } while (nextByte >= 0 && (nextByte == '\n' || nextByte == '\r'));
    }
    
    return output;
}
*/