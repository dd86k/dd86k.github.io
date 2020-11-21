/*
atbash.js (poor implementation)
Copyrights (c) DD~! 2015
*/

function Bash(s)
{
    var g = "";

    var len = s.length;
    for (var i = 0; i < len; i++)
    {
        switch (s[i])
        {
            // Upper
            case 'A': g += 'Z'; break;
            case 'B': g += 'Y'; break;
            case 'C': g += 'X'; break;
            case 'D': g += 'W'; break;
            case 'E': g += 'V'; break;
            case 'F': g += 'U'; break;
            case 'G': g += 'T'; break;
            case 'H': g += 'S'; break;
            case 'I': g += 'R'; break;
            case 'J': g += 'Q'; break;
            case 'K': g += 'P'; break;
            case 'L': g += 'O'; break;
            case 'M': g += 'N'; break;
            case 'N': g += 'M'; break;
            case 'O': g += 'L'; break;
            case 'P': g += 'K'; break;
            case 'Q': g += 'J'; break;
            case 'R': g += 'I'; break;
            case 'S': g += 'H'; break;
            case 'T': g += 'G'; break;
            case 'U': g += 'F'; break;
            case 'V': g += 'E'; break;
            case 'W': g += 'D'; break;
            case 'X': g += 'C'; break;
            case 'Y': g += 'B'; break;
            case 'Z': g += 'A'; break;
            // Lower
            case 'a': g += 'z'; break;
            case 'b': g += 'y'; break;
            case 'c': g += 'x'; break;
            case 'd': g += 'w'; break;
            case 'e': g += 'v'; break;
            case 'f': g += 'u'; break;
            case 'g': g += 's'; break;
            case 'h': g += 't'; break;
            case 'i': g += 'r'; break;
            case 'j': g += 'q'; break;
            case 'k': g += 'p'; break;
            case 'l': g += 'o'; break;
            case 'm': g += 'n'; break;
            case 'n': g += 'm'; break;
            case 'o': g += 'l'; break;
            case 'p': g += 'k'; break;
            case 'q': g += 'j'; break;
            case 'r': g += 'i'; break;
            case 's': g += 'h'; break;
            case 't': g += 'g'; break;
            case 'u': g += 'f'; break;
            case 'v': g += 'e'; break;
            case 'w': g += 'd'; break;
            case 'x': g += 'c'; break;
            case 'y': g += 'b'; break;
            case 'z': g += 'a'; break;
            default: g += s[i]; break;
        }
    }

    return g;
}