"use strict";

//
// Offset handling
//

function formatOffsetDec(offset) {
	return offset.toString();
}
function formatOffsetHex(offset) {
	return '0x' + offset.toString(16);
}
function formatOffsetOct(offset) {
	return '0' + offset.toString(8);
}
function formatOffsetHTML(offset) {
	return '&#' + offset.toString() + ';';
}
function formatOffsetUni(offset) {
	return 'U+' + offset.toString(16).toUpperCase().padStart(4, '0');
}
function selectFormatter(type) {
	switch (type) {
	case 'uni': return formatOffsetUni;
	case 'dec': return formatOffsetDec;
	case 'hex': return formatOffsetHex;
	case 'oct': return formatOffsetOct;
	case 'html': return formatOffsetHTML;
	default:
		console.trace('Wrong format: ' + type);
		console.assert(false);
		return null;
	}
}

//
// Unicode charset
//

var uniC0 = [
	{ name: "NUL", desc: "Null" },
	{ name: "SOH", desc: "Start of heading" },
	{ name: "STX", desc: "Start of Text" },
	{ name: "ETX", desc: "End of Text" },
	{ name: "EOT", desc: "End of Transmission" },
	{ name: "ENQ", desc: "Enquiry" },
	{ name: "ACK", desc: "Acknowledge" },
	{ name: "BEL", desc: "Bell" },
	{ name: "BS", desc: "Backspace" },
	{ name: "HT", desc: "Horizontal Tab" },
	{ name: "LF", desc: "Line Feed" },
	{ name: "VT", desc: "Vertical Tab" },
	{ name: "FF", desc: "Form Feed" },
	{ name: "CR", desc: "Carriage Return" },
	{ name: "SO", desc: "Shift Out" },
	{ name: "SI", desc: "Shift In" },
	{ name: "DLE", desc: "Data Link Escape" },
	{ name: "DC1", desc: "Device Control 1" },
	{ name: "DC2", desc: "Device Control 2" },
	{ name: "DC3", desc: "Device Control 3" },
	{ name: "DC4", desc: "Device Control 4" },
	{ name: "NAK", desc: "Not Acknowledged" },
	{ name: "SYN", desc: "Synchronous idle" },
	{ name: "ETB", desc: "End of Transmission Block" },
	{ name: "CAN", desc: "Cancel" },
	{ name: "EM", desc: "End of Medium" },
	{ name: "SUB", desc: "Substitute" },
	{ name: "ESC", desc: "Escape" },
	{ name: "FS", desc: "File Separator" },
	{ name: "GS", desc: "Group Separator" },
	{ name: "RS", desc: "Record Separator" },
	{ name: "US", desc: "Unit Separator" },
];
var uniC1 = [ // 127 to 159, 32 characters
	{ name: "DEL", desc: "Delete" },
	{ name: "PAD", desc: "Padding" },
	{ name: "HOP", desc: "High Octet Preset" },
	{ name: "BPH", desc: "Break Permitted" },
	{ name: "NBH", desc: "No Break Here" },
	{ name: "IND", desc: "Index" },
	{ name: "NEL", desc: "Next Line" },
	{ name: "SSA", desc: "Start of Selected Area" },
	{ name: "ESA", desc: "End of Selected Area" },
	{ name: "HTS", desc: "Character Tabultion Set" },
	{ name: "HTJ", desc: "Character Tabultion with Justification" },
	{ name: "VTS", desc: "Line Tabulation Set" },
	{ name: "PLD", desc: "Partial Line Forward" },
	{ name: "PLU", desc: "Partial Line Backward" },
	{ name: "RI", desc: "Reverse Line Feed" },
	{ name: "SS2", desc: "Single-Shift Two" },
	{ name: "SS3", desc: "Single-Shift Tree" },
	{ name: "DCS", desc: "Device Control String" },
	{ name: "PU1", desc: "Private Use 1" },
	{ name: "PU2", desc: "Private Use 2" },
	{ name: "STS", desc: "Set Transmit State" },
	{ name: "CCH", desc: "Cancel Character" },
	{ name: "MW", desc: "Message Waiting" },
	{ name: "SPA", desc: "Start of Protected Area" },
	{ name: "EPA", desc: "End of Protected Area" },
	{ name: "SOS", desc: "Start of String" },
	{ name: "SGCI", desc: "Single Graphic Character Introducer" },
	{ name: "SCI", desc: "Single Character Introducer" },
	{ name: "CSI", desc: "Control Sequence Introducer" },
	{ name: "ST", desc: "String Terminator" },
	{ name: "OSC", desc: "Operating System Command" },
	{ name: "PM", desc: "Private Message" },
	{ name: "APC", desc: "Application Program Command" },
];
function normalizeUni(char) {
	if (char < 32)
		return uniC0[char].name;
	if (char >= 127 && char <= 159)
		return uniC1[char - 127].name;
	return String.fromCharCode(char);
}

//
// CP437
//

var cp437C0 = [
	"NUL", "☺", "☻", "♥", "♦", "♣", "♠", "•", "◘", "○", "◙", "♂", "♀", "♪", "♫", "☼",
	"►",   "◄", "↕", "‼", "¶", "§", "▬", "↨", "↑", "↓", "→", "←", "∟", "↔", "▲", "▼"
];
var cp437S0 = [
	"⌂",
	"Ç", "ü", "é", "â", "ä", "à", "å", "ç", "ê", "ë", "è", "ï", "î", "ì", "Ä", "Å",
	"É", "æ", "Æ", "ô", "ö", "ò", "û", "ù", "ÿ", "Ö", "Ü", "¢", "£", "¥", "₧", "ƒ",
	"á", "í", "ó", "ú", "ñ", "Ñ", "ª", "º", "¿", "⌐", "¬", "½", "¼", "¡", "«", "»",
	"░", "▒", "▓", "│", "┤", "╡", "╢", "╖", "╕", "╣", "║", "╗", "╝", "╜", "╛", "┐",
	"└", "┴", "┬", "├", "─", "┼", "╞", "╟", "╚", "╔", "╩", "╦", "╠", "═", "╬", "╧",
	"╨", "╤", "╥", "╙", "╘", "╒", "╓", "╫", "╪", "┘", "┌", "█", "▄", "▌", "▐", "▀",
	"α", "ß", "Γ", "π", "Σ", "σ", "µ", "τ", "Φ", "Θ", "Ω", "δ", "∞", "φ", "ε", "∩",
	"≡", "±", "≥", "≤", "⌠", "⌡", "÷", "≈", "°", "∙", "·", "√", "ⁿ", "²", "■", "NBSP"
];
function normalizeCP437(char) {
	if (char < 32)
		return cp437C0[char];
	if (char < 127)
		return String.fromCharCode(char);
	return cp437S0[char - 127];
}

//
// EBCDIC
//

var ebcdic = [
	"NUL", "SOH", "STX", "ETX", "SEL", "HT",  "RNL", "DEL",
	"GE",  "SPS", "RPT", "VT",  "FF",  "CR",  "SO",  "SI",
	"DLE", "DC1", "DC2", "DC3", "RES", "NL",  "BS",  "POC",
	"CAN", "EM",  "UBS", "CU1", "IFS", "IGS", "IRS", "IUS",
	"DS",  "SOS", "FS",  "WUS", "BYP", "LF",  "ETB", "ESC",
	"SA",  "SFE", "SM",  "CSP", "MFA", "ENQ", "ACK", "BEL",
	null,  null,  "SYN", "IR",  "PP",  "TRN", "NBS", "EOT",
	"SBS", "IT",  "RFF", "CU3", "DC4", "NAK", null,  "SUB",
	" ",   null,  null,  null,  null,  null,  null,  null,
	null,  null,  "¢",   ".",   "<",   "(",   "+",   "|",
	"&",   null,  null,  null,  null,  null,  null,  null,
	null,  null,  "!",   "$",   "*",   ")",   ";",   "¬",
	"-",   "/",   null,  null,  null,  null,  null,  null,
	null,  null,  "¦",   ",",   "%",   "_",   ">",   "?",
	null,  null,  null,  null,  null,  null,  null,  null,
	null,  "`",   ":",   "#",   "@",   "'",   "=",   '"',
	null,  "a",   "b",   "c",   "d",   "e",   "f",   "g",
	"h",   "i",   null,  null,  null,  null,  null,  "±",
	null,  "j",   "k",   "l",   "m",   "n",   "o",   "p",
	"q",   "r",   null,  null,  null,  null,  null,  null,
	null,  "~",   "s",   "t",   "u",   "v",   "w",   "x",
	"y",   "z",   null,  null,  null,  null,  null,  null,
	"^",   null,  null,  null,  null,  null,  null,  null,
	null,  null,  "[",   "]",   null,  null,  null,  null,
	"{",   "A",   "B",   "C",   "D",   "E",   "F",   "G",
	"H",   "I",   null,  null,  null,  null,  null,  null,
	"}",   "J",   "K",   "L",   "M",   "N",   "O",   "P",
	"Q",   "R",   null,  null,  null,  null,  null,  null,
	"\\",  null,  "S",   "T",   "U",   "V",   "W",   "X",
	"Y",   "Z",   null,  null,  null,  null,  null,  null,
	"0",   "1",   "2",   "3",   "4",   "5",   "6",   "7",
	"8",   "9",   null,  null,  null,  null,  null,  "EO",
];
function normalizeEBCDIC(char) {
	return ebcdic[char];
}

//
//
//

function selectCodepage(type) {
	switch (type) {
	case 'uni':    return normalizeUni;
	case 'cp437':  return normalizeCP437;
	case 'ebcdic': return normalizeEBCDIC;
	default:
		console.trace('Wrong codepage: ' + type);
		console.assert(false);
		return null;
	}
}

var columns = 16;

function clearTable() {
	header.innerHTML = '';
	table.innerHTML = '';
}
function addResult(offset, char) {
	var nroot = document.createElement('div');
	nroot.className = 'result';
	
	var nchar = document.createElement('p');
	nchar.innerText = char;
	
	var noffset = document.createElement('p');
	noffset.innerText = offset;
	
	nroot.appendChild(nchar);
	nroot.appendChild(noffset);
	
	results.appendChild(nroot);
}
function makeTable(type, codepage) {
	console.trace('type=' + type + ' codepage=' + codepage);
	
	clearTable();
	
	var format = selectFormatter(type);
	var normalize = selectCodepage(codepage);
	if (format === null || normalize === null)
		return;
	
	// Make header
	var thempty = document.createElement('th');
	header.appendChild(thempty);
	for (var i = 0; i < columns; i++) {
		var th = document.createElement('th');
		th.innerText = format(i);
		header.appendChild(th);
	}
	
	var tr;
	for (var i = 0; i < 256; i++) {
		var off = format(i);
		
		if (i % columns == 0) {
			tr = document.createElement('tr');
			
			var td0 = document.createElement('td');
			td0.className = 'rowheader';
			td0.innerText = off
			
			tr.appendChild(td0);
		}
		
		var char = normalize(i);
		
		var td = document.createElement('td');
		td.className = 'result';
		
		if (char) {
			var p0 = document.createElement('p');
			p0.innerText = normalize(i);
			var p1 = document.createElement('p');
			p1.innerText = off;
			
			td.appendChild(p0);
			td.appendChild(p1);
		}
		
		tr.appendChild(td);
		
		if (i % columns == 0)
			table.appendChild(tr);
	}
}

makeTable(noffset.value, ncp.value);