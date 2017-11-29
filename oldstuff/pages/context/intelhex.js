/*
 * intelhex.js
 * Copyrights (c) DD~! 2015
 */

// :ccaaaarrddss
//   :  - Every line begins with ':'
//  cc  - Number of bytes in data (count)
// aaaa - Address field
//  rr  - Record type
//  dd  - Data field
//  ss  - Checksum

// This field is a one byte (2 hex digits) 2's complement checksum of the entire record.
// To create the checksum make a 1 byte sum from all fields of the record:
// cc + aa + aa + rr + sum(dd) = ss
// Then take the 2's complement of this sum to create the final checksum.

// A record's checksum byte is the two's complement (negative) of the data checksum,
// which is the least significant byte (LSB) of the sum of all decoded byte values in
// the record preceding the checksum. It is computed by summing the decoded byte values
// and extracting the LSB of the sum (i.e., the data checksum), and then calculating the
// two's complement of the LSB (e.g., by inverting its bits and adding one).


function EncodeIntelHex(s)
{
    // Max data length
    var _BLOCKLENGTH = 16; // Max: 255
    // Record type, default is 00 for data.
    var _RECORDTYPE = 0x00;
    // Newline
    var nl = '\n';
    // Output
    var output = "";
    // Address
    var addrA = 0x00;
    var addrB = 0x00;
    // temporary
    var tmp = "";

    // Get number of blocks
    var blocks = Math.floor((s.length / _BLOCKLENGTH) + 1);

    for (var block = 0; block < blocks; block++)
    {
        // Get string length for block
        var len = s.length < _BLOCKLENGTH ? s.length : _BLOCKLENGTH;

        // Get string for block
        tmp = s.substr(block * _BLOCKLENGTH, len);

        // Begining of line (:)
        output += ":";
        // Number of bytes in data (cc)
        output += frmtx2(tmp.length.toString(16).toUpperCase());
        // Address field (aaaa)
        output += frmtx2((_RECORDTYPE == 0x01 ? 0 : addrA).toString(16).toUpperCase());
        output += frmtx2((_RECORDTYPE == 0x01 ? 0 : addrB).toString(16).toUpperCase());
        // Record type (rr)
        if (block == blocks - 1) _RECORDTYPE = 0x01; //EOF
        output += frmtx2(_RECORDTYPE.toString(16).toUpperCase());

        // Data field (dd)
        var csum = 0; // Sum of the charcodes
        for (var i = 0; i < tmp.length; i++)
        {
            var c = tmp[i].charCodeAt();
            csum += c;
            output += frmtx2(c.toString(16).toUpperCase());
            if (addrB >= 0xFF)
            {
                addrB = 0;
                addrA++;
            }
            else
                addrB++;
        }

// A record's checksum byte is the two's complement (negative) of the data checksum,
// which is the least significant byte (LSB) of the sum of all decoded byte values in
// the record preceding the checksum.

// Data="Example with an "
// Expected:
// :10|0000|00|4578616D706C65207769746820616E20|39
// Result:
// :10|0000|00|4578616D706C65207769746820616E20|

        // Checksum (ss)
        var cksum = ~(tmp.length + addrA + addrB + _RECORDTYPE) + csum;
        cksum >>>= 8;
        output += frmtx2((cksum ^ 0xFF).toString(16).toUpperCase());

        output += nl;
    }

    return output;
}

function frmtx2(str)
{
    str = str.toString();
    switch (str.length)
    {
        case 0: return "00";
        case 1:
        case 3:
            return "0" + str;
        case 2:
        case 4:
            return str;
    }
}