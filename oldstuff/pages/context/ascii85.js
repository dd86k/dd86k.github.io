/*
Ascii85.js
Copyrights (c) DD~! 2015
*/

var PrefixMark = "<~";
var SuffixMark = "~>";

/**
 * Maximum line length for encoded ASCII85 string;
 * set to zero for one unbroken line.
 */
var LineLength = 75;

/**
 * Add the Prefix and Suffix marks when encoding, and enforce their presence for decoding
 */
var EnforceMarks = true;

var _asciiOffset = 33; // const
var _encodedBlock = new Array(5);
var _decodedBlock = new Array(4);
var _tuple = 0;
var _linePos = 0;

var nl = '\n';

var OUT = "";

var pow85 = [ 85 * 85 * 85 * 85, 85 * 85 * 85, 85 * 85, 85, 1 ];

function eAscii85(s)
{
    OUT = "";
    _linePos = 0;

    if (EnforceMarks)
    {
        OUT += PrefixMark;
    }

    var count = 0;
    _tuple = 0;
    var len = s.length;
    for (var i = 0; i < len; i++)
    {
        if (count >= 3)
        {
            _tuple |= s[i].charCodeAt();
            if (_tuple == 0)
            {
                AppendChar('z');
            }
            else
            {
                EncodeBlock(len);
            }
            _tuple = 0;
            count = 0;
        }
        else
        {
            _tuple |= Math.floor(s[i].charCodeAt() << (24 - (count * 8)));
            count++;
        }
    }

    // if we have some bytes left over at the end..
    if (count > 0)
    {
        EncodeBlock(count + 1);
    }

    if (EnforceMarks)
    {
        OUT += SuffixMark;
    }

    return OUT;
}
/*
function dAscii85(s)
{
    OUT = "";
    
    if (EnforceMarks)
    {
        if (!s.StartsWith(PrefixMark) || !s.EndsWith(SuffixMark))
        {
            return "";
        }
    }

    // strip prefix and suffix if present
    if (s.StartsWith(PrefixMark))
    {
        s = s.Substring(PrefixMark.Length);
    }
    if (s.EndsWith(SuffixMark))
    {
        s = s.Substring(0, s.length - SuffixMark.length);
    }

    var count = 0;
    var processChar = false;
    var len = s.length;
    for (var i = 0; i < len; i++)
    {
        switch (s[i])
        {
            case 'z':
                if (count != 0)
                {
                    // The character 'z' is invalid inside an ASCII85 block.
                    return "";
                }
                _decodedBlock[0] = 0;
                _decodedBlock[1] = 0;
                _decodedBlock[2] = 0;
                _decodedBlock[3] = 0;
                ms.Write(_decodedBlock, 0, _decodedBlock.Length);
                processChar = false;
                break;
            case '\n':
            case '\r':
            case '\t':
            case '\0':
            case '\f':
            case '\b':
                processChar = false;
                break;
            default:
                if (s[i] < '!' || s[i] > 'u')
                {
                    // ASCII85 only allows characters '!' to 'u'.
                    return "";
                }
                processChar = true;
                break;
        }

        if (processChar)
        {
            _tuple += ((s[i] - _asciiOffset) * pow85[count]);
            count++;
            if (count == _encodedBlock.length)
            {
                DecodeBlock();
                ms.Write(_decodedBlock, 0, _decodedBlock.Length);
                _tuple = 0;
                count = 0;
            }
        }
    }

    // if we have some bytes left over at the end..
    if (count != 0)
    {
        if (count == 1)
        {
            throw new Exception("The last block of ASCII85 data cannot be a single byte.");
        }
        count--;
        _tuple += pow85[count];
        DecodeBlock(count);
        for (int i = 0; i < count; i++)
        {
            ms.WriteByte(_decodedBlock[i]);
        }
    }

    return Encoding.UTF8.GetString(ms.ToArray());
}
*/
function EncodeBlock(count)
{
    for (var i = 4; i >= 0; i--)
    {
        _encodedBlock[i] = Math.floor(((_tuple % 85) + _asciiOffset));
        _tuple /= 85;
    }

    for (var i = 0; i < count; i++)
    {
        if (_encodedBlock[i] < 256)
        OUT += String.fromCharCode(_encodedBlock[i]);
    }
}

function DecodeBlock(bytes)
{
    for (var i = 0; i < bytes; i++)
    {
        _decodedBlock[i] = Math.floor(_tuple >> 24 - (i * 8));
    }
}

function AppendChar(c)
{
    OUT += c;
    _linePos++;
    if (LineLength > 0 && (_linePos >= LineLength))
    {
        _linePos = 0;
        OUT += nl;
    }
}