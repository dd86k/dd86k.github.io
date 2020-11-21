/*
base32.js
Copyrights (c) DD~! 2015
*/

var eTable = "abcdefghijklmnopqrstuvwxyz234567";
var dTable = new Array(0x80);
var padding = '=';

/**
 * Encoding
 */
function eBase32(s)
{
    var output = "";
    var specialLength = Math.floor(s.length % 5);
    var normalLength = s.length - specialLength;
    for (var i = 0; i < normalLength; i += 5)
    {
        var b1 = s[i].charCodeAt() & 0xff;
        var b2 = s[i + 1].charCodeAt() & 0xff;
        var b3 = s[i + 2].charCodeAt() & 0xff;
        var b4 = s[i + 3].charCodeAt() & 0xff;
        var b5 = s[i + 4].charCodeAt() & 0xff;
    
        output += eTable[(b1 >> 3) & 0x1f];
        output += eTable[((b1 << 2) | (b2 >> 6)) & 0x1f];
        output += eTable[(b2 >> 1) & 0x1f];
        output += eTable[((b2 << 4) | (b3 >> 4)) & 0x1f];
        output += eTable[((b3 << 1) | (b4 >> 7)) & 0x1f];
        output += eTable[(b4 >> 2) & 0x1f];
        output += eTable[((b4 << 3) | (b5 >> 5)) & 0x1f];
        output += eTable[b5 & 0x1f];
    }
    
    switch (specialLength)
    {
        case 1:
        {
            var b1 = s[normalLength].charCodeAt() & 0xff;
            output += eTable[(b1 >> 3) & 0x1f];
            output += eTable[(b1 << 2) & 0x1f];
            output += Array(7).join(padding);
            break;
        }
    
        case 2:
        {
            var b1 = s[normalLength].charCodeAt() & 0xff;
            var b2 = s[normalLength + 1].charCodeAt() & 0xff;
            output += eTable[(b1 >> 3) & 0x1f];
            output += eTable[((b1 << 2) | (b2 >> 6)) & 0x1f];
            output += eTable[(b2 >> 1) & 0x1f];
            output += eTable[(b2 << 4) & 0x1f];
            output += Array(5).join(padding);
            break;
        }
                
        case 3:
        {
            var b1 = s[normalLength].charCodeAt() & 0xff;
            var b2 = s[normalLength + 1].charCodeAt() & 0xff;
            var b3 = s[normalLength + 2].charCodeAt() & 0xff;
            output += eTable[(b1 >> 3) & 0x1f];
            output += eTable[((b1 << 2) | (b2 >> 6)) & 0x1f];
            output += eTable[(b2 >> 1) & 0x1f];
            output += eTable[((b2 << 4) | (b3 >> 4)) & 0x1f];
            output += eTable[(b3 << 1) & 0x1f];
            output += Array(4).join(padding);
            break;
        }
                
        case 4:
        {
            var b1 = s[normalLength].charCodeAt() & 0xff;
            var b2 = s[normalLength + 1].charCodeAt() & 0xff;
            var b3 = s[normalLength + 2].charCodeAt() & 0xff;
            var b4 = s[normalLength + 3].charCodeAt() & 0xff;
            output += eTable[(b1 >> 3) & 0x1f];
            output += eTable[((b1 << 2) | (b2 >> 6)) & 0x1f];
            output += eTable[(b2 >> 1) & 0x1f];
            output += eTable[((b2 << 4) | (b3 >> 4)) & 0x1f];
            output += eTable[((b3 << 1) | (b4 >> 7)) & 0x1f];
            output += eTable[(b4 >> 2) & 0x1f];
            output += eTable[(b4 << 3) & 0x1f];
            output += padding;
            break;
        }
    }
    
    return output.toString();
}

/**
 * Decoding
 */
function dBase32(s)
{
    var output = "";
    
    for (var i = 0; i < eTable.length; i++)
    {
        dTable[eTable[i]] = i;
    }
    
    var length = s.length;
    
    while (length > 0)
    {
        if (!Ignore(s[length - 1])) break;
        length--;
    }
    
    var i = 0;
    var finish = length - 8;
    for (i = NextI(s, i, finish); i < finish; i = NextI(s, i, finish))
    {
        var b1 = dTable[s[i++].charCodeAt()];
        i = NextI(s, i, finish);
        var b2 = dTable[s[i++].charCodeAt()];
        i = NextI(s, i, finish);
        var b3 = dTable[s[i++].charCodeAt()];
        i = NextI(s, i, finish);
        var b4 = dTable[s[i++].charCodeAt()];
        i = NextI(s, i, finish);
        var b5 = dTable[s[i++].charCodeAt()];
        i = NextI(s, i, finish);
        var b6 = dTable[s[i++].charCodeAt()];
        i = NextI(s, i, finish);
        var b7 = dTable[s[i++].charCodeAt()];
        i = NextI(s, i, finish);
        var b8 = dTable[s[i++].charCodeAt()];

        output += String.fromCharCode((b1 << 3) | (b2 >> 2));
        output += String.fromCharCode((b2 << 6) | (b3 << 1) | (b4 >> 4));
        output += String.fromCharCode((b4 << 4) | (b5 >> 1));
        output += String.fromCharCode((b5 << 7) | (b6 << 2) | (b7 >> 3));
        output += String.fromCharCode((b7 << 5) | b8);
    }
    
    DecodeLastBlock (output,
        s[length - 8], s[length - 7], s[length - 6], s[length - 5],
        s[length - 4], s[length - 3], s[length - 2], s[length - 1]);

    return output;
}

function DecodeLastBlock(output, c1, c2, c3, c4, c5, c6, c7, c8)
{
    if (c3 == padding)
    {
        var b1 = dTable[c1.charCodeAt()];
        var b2 = dTable[c2.charCodeAt()];
        output += String.fromCharCode((b1 << 3) | (b2 >> 2));
        return 1;
    }

    if (c5 == padding)
    {
        var b1 = dTable[c1.charCodeAt()];
        var b2 = dTable[c2.charCodeAt()];
        var b3 = dTable[c3.charCodeAt()];
        var b4 = dTable[c4.charCodeAt()];
        output += String.fromCharCode((b1 << 3) | (b2 >> 2));
        output += String.fromCharCode((b2 << 6) | (b3 << 1) | (b4 >> 4));
        return 2;
    }

    if (c6 == padding)
    {
        var b1 = dTable[c1.charCodeAt()];
        var b2 = dTable[c2.charCodeAt()];
        var b3 = dTable[c3.charCodeAt()];
        var b4 = dTable[c4.charCodeAt()];
        var b5 = dTable[c5.charCodeAt()];
        output += String.fromCharCode((b1 << 3) | (b2 >> 2));
        output += String.fromCharCode((b2 << 6) | (b3 << 1) | (b4 >> 4));
        output += String.fromCharCode((b4 << 4) | (b5 >> 1));
        return 3;
    }

    if (c8 == padding)
    {
        var b1 = dTable[c1.charCodeAt()];
        var b2 = dTable[c2.charCodeAt()];
        var b3 = dTable[c3.charCodeAt()];
        var b4 = dTable[c4.charCodeAt()];
        var b5 = dTable[c5.charCodeAt()];
        var b6 = dTable[c6.charCodeAt()];
        var b7 = dTable[c7.charCodeAt()];
        output += String.fromCharCode((b1 << 3) | (b2 >> 2));
        output += String.fromCharCode((b2 << 6) | (b3 << 1) | (b4 >> 4));
        output += String.fromCharCode((b4 << 4) | (b5 >> 1));
        output += String.fromCharCode((b5 << 7) | (b6 << 2) | (b7 >> 3));
        return 4;
    }
    else
    {
        var b1 = dTable[c1.charCodeAt()];
        var b2 = dTable[c2.charCodeAt()];
        var b3 = dTable[c3.charCodeAt()];
        var b4 = dTable[c4.charCodeAt()];
        var b5 = dTable[c5.charCodeAt()];
        var b6 = dTable[c6.charCodeAt()];
        var b7 = dTable[c7.charCodeAt()];
        var b8 = dTable[c8.charCodeAt()];
        output += String.fromCharCode((b1 << 3) | (b2 >> 2));
        output += String.fromCharCode((b2 << 6) | (b3 << 1) | (b4 >> 4));
        output += String.fromCharCode((b4 << 4) | (b5 >> 1));
        output += String.fromCharCode((b5 << 7) | (b6 << 2) | (b7 >> 3));
        output += String.fromCharCode((b7 << 5) | b8);
        return 5;
    }
    return output;
}

function NextI(data, i, finish)
{
    while ((i < finish) && Ignore (data[i])) i++;
    return i;
}

function Ignore(c)
{
    return (c == '\n') || (c == '\r') || (c == '\t') || (c == ' ') || (c == '-');
}