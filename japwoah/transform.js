/* Written by DD~! */
"use strict";

onload = start;

var _MIN = 192;

/* Transformation methods */

/**
 * Into Fullwidth characters
 */
function tFullwidth(_in)
{
    var OFFSET = 65248;
    var _out = "";
    var c = 0;
    var len = _in.length;
    for (var i = 0; i < len; i++)
    {
        c = _in[i].charCodeAt();

        if (c != 0x0A && c != 0x0D && c < _MIN)
        { // '　' 3000
        // 'ｒ'
            switch(c) {
                case 32:
                    //_out += String.fromCharCode(12288);
                    _out += String.fromCharCode(0x3000);
                    break; // space
                case 163: c += 94; break; // £
                case 162: c += 92; break; // ¢
                default:
                    _out += String.fromCharCode(c + OFFSET);
                    break;
            }
        }
        else
        {
            _out += String.fromCharCode(c);
        }
    }
    return _out.toString();
}

/**
 * Into circled characters
 */
function tCircled(_in)
{
    var OFFSET = 9327;
    var _out = "";
    var c = 0;
    var len = _in.length;
    for (var i = 0; i < len; i++)
    {
        c = _in[i].charCodeAt();
        
        // Cap, number, normal
        if (((c >= 65 && c <= 90) || (c >= 48 && c <= 57) || (c >= 97 && c <= 122)) && c < _MIN)
        {
            // Caps
            if (c >= 65 && c <= 90) c += 6;
            // Numbers 1-9
            if (c >= 49 && c <= 57) c -= 64;
            // Number 0
            if (c == 48) c += 75;
            _out += String.fromCharCode(c + OFFSET);
        }
        else
        {
            _out += String.fromCharCode(c);
        }
    }
    return _out;
}

/**
 * Into parathesed characters
 */
function tPara(_in)
{
    var OFFSET = 9275;
    var _out = "";
    var c = 0;
    var len = _in.length;
    for(var i = 0; i < len; i++)
    {
        c = _in[i].charCodeAt();
        
        // Cap, number 1-9, normal
        if (((c >= 65 && c <= 90) || (c >= 49 && c <= 57) || (c >= 97 && c <= 122)) && c < _MIN)
        {
            // Caps
            if (c >= 65 && c <= 90) c += 32;
            // Numbers 1-9
            if (c >= 49 && c <= 57) c += 8;
            _out += String.fromCharCode(c + OFFSET);
        }
        else
        {
            _out += String.fromCharCode(c);
        }
    }
    return _out;
}

/**
 * Into dotted (under) characters when possible
 */
function tDotted(_in)
{
    var OFFSET = 7615;
    var _out = "";
    var c = 0;
    var len = _in.length;
    for (var i = 0; i < len; i++)
    {
        c = _in[i].charCodeAt();
        
        if (c != 32 && c != 0x0A && c != 0x0D && c < _MIN)
        {
            switch (c)
            {
                // LATIN CAPITAL LETTER WITH DOT BELOW
                case 65: c += 160; break; // A
                case 66: c += 3; break;   // B
                case 68: c += 9; break;   // D
                case 69: c += 180; break; // E
                case 72: c += 29; break;  // H
                case 73: c += 194; break; // I
                case 75: c += 40; break;  // K
                case 76: c += 43; break;  // L
                case 77: c += 54; break;  // M
                case 78: c += 57; break;  // N
                case 79: c += 190; break; // O
                case 82: c += 73; break;  // R
                case 83: c += 80; break;  // S
                case 84: c += 89; break;  // T
                case 85: c += 208; break; // U
                case 86: c += 105; break; // V
                case 87: c += 114; break; // W
                case 89: c += 220; break; // Y
                case 90: c += 121; break; // Z
                // LATIN SMALL LETTER WITH DOT BELOW
                case 97: c += 129; break;  // a
                case 98: c -= 28; break;   // b
                case 100: c -= 22; break;  // d
                case 101: c += 149; break; // e
                case 104: c -= 2; break;   // h
                case 105: c += 163; break; // i
                case 107: c += 9; break;   // k
                case 108: c += 12; break;  // l
                case 109: c += 23; break;  // m
                case 110: c += 26; break;  // n
                case 111: c += 159; break; // o
                case 114: c += 42; break;  // r
                case 115: c += 49; break;  // s
                case 116: c += 58; break;  // t
                case 117: c += 177; break; // u
                case 118: c += 74; break;  // v
                case 119: c += 83; break;  // w
                case 121: c += 189; break; // y
                default: c -= OFFSET; break; // Cancel
            }
            
            _out += String.fromCharCode(c + OFFSET);
        }
        else
        {
            _out += String.fromCharCode(c);
        }
    }
    return _out;
}

/**
 * Into ▄█▀ █▬█ █ ▀█▀
 */
function tBox(_in)
{
    var _out = "";
    
    var len = _in.length;
    for (var i = 0; i < len; i++)
    {
        switch (_in[i])
        {
            case "a":
            case "A":
                _out += "█▀█"; break;
            case "b":
            case "B":
                _out += "B"; break;
            case "c":
            case "C":
                _out += "C"; break;
            case "d":
            case "D":
                _out += "D"; break;
            case "e":
            case "E":
                _out += "E"; break;
            case "f":
            case "F":
                _out += "F"; break;
            case "g":
            case "G":
                _out += "G"; break;
            case "h":
            case "H":
                _out += "█▬█"; break;
            case "i":
            case "I":
                _out += "█"; break;
            case "j":
            case "J":
                _out += "▄█"; break;
            case "k":
            case "K":
                _out += "K"; break;
            case "l":
            case "L":
                _out += "█▄"; break;
            case "m":
            case "M":
                _out += "█▀█▀█"; break;
            case "n":
            case "N":
                _out += "█▀▄█"; break;
            case "o":
            case "O":
                _out += "███"; break;
            case "p":
            case "P":
                _out += "█▀"; break;
            case "q":
            case "Q":
                _out += "███▄"; break;
            case "r":
            case "R":
                _out += "█▀▄"; break;
            case "s":
            case "S":
                _out += "▄█▀"; break;
            case "t":
            case "T":
                _out += "▀█▀"; break;
            case "u":
            case "U":
                _out += "█▄█"; break;
            case "v":
            case "V":
                _out += "▐▄▌"; break;
            case "w":
            case "W":
                _out += "█▄█▄█"; break;
            case "x":
            case "X":
                _out += "X"; break;
            case "y":
            case "Y":
                _out += "Y"; break;
            case "z":
            case "Z":
                _out += "▀█▄"; break;
            default:
                _out += _in[i]; break;
        }
        
        _out += " ";
    }
    
    return _out;
}

/**
 * Into small caps.
 */
function tSmallcaps(_in)
{
    var _out = "";
    var OFFSET = 7329;
    
    var len = _in.length;
    for (var i = 0; i < len; i++)
    {
        var c = _in[i].charCodeAt();
        
        if (c >= 0x61 && c <= 0x7A)
        {
            switch (c)
            {
                case 0x61: // a
                    _out += String.fromCharCode(c + 7327);
                    break;
                case 0x65: // e
                    _out += String.fromCharCode(c + 7330);
                    break;
                case 0x66: // f
                    _out += String.fromCharCode(c + 1069);
                    break;
                case 0x67: // g
                    _out += String.fromCharCode(c + 507);
                    break;
                case 0x68: // h
                    _out += String.fromCharCode(c + 564);
                    break;
                case 0x69: // i
                    _out += String.fromCharCode(c + 513);
                    break;
                case 0x6A: // j
                case 0x6B: // k
                case 0x6D: // m
                case 0x6F: // o
                    _out += String.fromCharCode(c + 7328);
                    break;
                case 0x6C: // l
                    _out += String.fromCharCode(c + 563);
                    break;
                case 0x6E: // n
                    _out += String.fromCharCode(c + 518);
                    break;
                case 0x70: // p
                case 0x7A: // z
                    _out += String.fromCharCode(c + 7336);
                    break;
                case 0x71: // q
                    _out += String.fromCharCode(c + 378);
                    break;
                case 0x72: // r
                    _out += String.fromCharCode(c + 526);
                    break;
                case 0x73: // s
                case 0x78: // x
                    _out += String.fromCharCode(c);
                    break;
                case 0x74: // t
                case 0x75: // u
                    _out += String.fromCharCode(c + 7335);
                    break;
                case 0x76: // v
                case 0x77: // w
                    _out += String.fromCharCode(c + 7338);
                    break;
                case 0x79: // y
                    _out += String.fromCharCode(c + 534);
                    break;
                
                default:
                    _out += String.fromCharCode(c + OFFSET);
                    break;
            }
        }
        else
        {
            _out += String.fromCharCode(c);
        }
    }
    
    return _out;
}

/**
 * Into normal
 */
function tNormal(_in)
{
    var _out = "";
    var O_FULLWIDTH = 65248;
    var O_CIRCLED = 9327;
    var O_PARA = 9275;
    
    var len = _in.length;
    for (var i = 0; i < len; i++)
    {
        var c = _in[i].charCodeAt();
        
        switch (c)
        {
            // -- Fullwidth --
            // A-Z
            case 0xFF21:
            case 0xFF22:
            case 0xFF23:
            case 0xFF24:
            case 0xFF25:
            case 0xFF26:
            case 0xFF27:
            case 0xFF28:
            case 0xFF29:
            case 0xFF2A:
            case 0xFF2B:
            case 0xFF2C:
            case 0xFF2D:
            case 0xFF2E:
            case 0xFF2F:
            case 0xFF30:
            case 0xFF31:
            case 0xFF32:
            case 0xFF33:
            case 0xFF34:
            case 0xFF35:
            case 0xFF36:
            case 0xFF37:
            case 0xFF38:
            case 0xFF39:
            case 0xFF3A:
            // a-z
            case 0xFF41:
            case 0xFF42:
            case 0xFF43:
            case 0xFF44:
            case 0xFF45:
            case 0xFF46:
            case 0xFF47:
            case 0xFF48:
            case 0xFF49:
            case 0xFF4A:
            case 0xFF4B:
            case 0xFF4C:
            case 0xFF4D:
            case 0xFF4E:
            case 0xFF4F:
            case 0xFF50:
            case 0xFF51:
            case 0xFF52:
            case 0xFF53:
            case 0xFF54:
            case 0xFF55:
            case 0xFF56:
            case 0xFF57:
            case 0xFF58:
            case 0xFF59:
            case 0xFF5A:
            // misc
            case 0xFE5F:
            case 0xFF03:
            case 0xFE60:
            case 0xFF06:
            case 0xFE69:
            case 0xFF04:
            case 0xFE6A:
            case 0xFF05:
            case 0xFE6B:
            case 0xFF20:
            case 0xFFE0:
            case 0xFFE1:
            case 0xFF5E:
            case 0xFF3B:
            case 0xFF3D:
            case 0xFE5B:
            case 0xFE5C:
            case 0xFF5B:
            case 0xFF5D:
            case 0xFE59:
            case 0xFE5A:
            case 0xFF3C:
            case 0xFF08:
            case 0xFF09:
                {
                    switch(c)
                    {
                        case 0xFFE0: c -= 92; break; // ¢
                        case 0xFFE1: c -= 94; break; // £
                    }
                    _out += String.fromCharCode(c - O_FULLWIDTH);
                }
                break;
            
            // -- Circled --
            // A-Z
            case 0x24B6:
            case 0x24B7:
            case 0x24B8:
            case 0x24B9:
            case 0x24BA:
            case 0x24BB:
            case 0x24BC:
            case 0x24BD:
            case 0x24BE:
            case 0x24BF:
            case 0x24C0:
            case 0x24C1:
            case 0x24C2:
            case 0x24C3:
            case 0x24C4:
            case 0x24C5:
            case 0x24C6:
            case 0x24C7:
            case 0x24C8:
            case 0x24C9:
            case 0x24CA:
            case 0x24CB:
            case 0x24CC:
            case 0x24CD:
            case 0x24CE:
            case 0x24CF:
            // a-z
            case 0x24D0:
            case 0x24D1:
            case 0x24D2:
            case 0x24D3:
            case 0x24D4:
            case 0x24D5:
            case 0x24D6:
            case 0x24D7:
            case 0x24D8:
            case 0x24D9:
            case 0x24DA:
            case 0x24DB:
            case 0x24DC:
            case 0x24DD:
            case 0x24DE:
            case 0x24DF:
            case 0x24E0:
            case 0x24E1:
            case 0x24E2:
            case 0x24E3:
            case 0x24E4:
            case 0x24E5:
            case 0x24E6:
            case 0x24E7:
            case 0x24E8:
            // 0-9
            case 0x24E9:
            case 0x24EA:
            case 0x2460:
            case 0x2461:
            case 0x2462:
            case 0x2463:
            case 0x2464:
            case 0x2465:
            case 0x2466:
            case 0x2467:
            case 0x2468:
                {   
                    // Caps
                    if (c >= 0x24B6 && c <= 0x24CF) c -= 6;
                    // Numbers 1-9
                    if (c >= 0x24EA && c <= 0x2468) c += 64;
                    // Number 0
                    if (c == 0x24E9) c -= 75;
                    _out += String.fromCharCode(c - O_CIRCLED);
                }
                break;
        
            default:
                _out += String.fromCharCode(c);
                break;
        }
    }
    
    return _out;
}
/* Etc. */

function sa()
{
    input.select();
}

function ic(pChar)
{
    input.value += pChar;
    input.focus();
}

function start()
{
    var tdelems = document.getElementsByTagName("td");
    for (var i = 0; i < tdelems.length; i++)
    {
        tdelems[i].onclick = function ()
        {
            input.value += this.innerHTML;
            input.focus();
        };
    }
}
