/*
base32.js
Copyrights (c) DD~! 2015
*/

var eTable = "ybndrfg8ejkmcpqxot1uwisza345h769";
var dTable = [0x80];
var padding = '=';

function eZBase32(s)
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
    
    return output.toString().replace(/=/g, "");
}

function dZBase32(s)
{
    
}