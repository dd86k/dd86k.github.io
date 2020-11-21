/*
Small GNU/Linux "Terminal"
Copyrights (c) 2015 DD~!
*/

"use strict"; //<3

/* ~~ Changelog ~~ 
-- v0.5.5 --

*/

/**********
 * EVENTS *
 **********/

window.onload = startUp;

/**************
 * PROPERTIES *
 **************/
 
/* ~~ Text/Strings ~~ */
var version = "0.5.4";
var Terminal = 
{
    username:"guest",
    hostname:"pc",
    cd:"~",
    state:"$"
};
var title = "Terminal - v" + version;
//var htmlinput = ""; //Looks like a buffer!

/* ~~ Constants ~~ */
var space = " "; //"&nbsp;";
var nl = "\n"; //"<br/>";
//Severe warning for these users (!!!)
var navcheck = /(MSIE (7|8).0|Midori\/0.3|Firefox\/[12][0-9].+)/;
//Light warning for these users (!)
var navchecklight = /(Midori\/0.4)/;

/* ~~ Booleans ~~ */
//Debugging boolean
var debug = false;
//If is an event is canceling. | No use for it so far..
var isCanceling = false;
//If CapsLock is on.
//var capslock = false;

/* ~~ Numbers ~~ */
//var cursorindex = 0;
var yes_interval = 25;

//var history = new Array(10); //Future use
//var historyindex = 0; //Future use

/* ~~ Timing handlers ~~ */
var yes; //yes command

/***************
 * STARTING UP *
 ***************/

function startUp()
{
    //write("login as:" + space);
    //username = read();

    writeLine("Reminder: This is still under development.");
    document.title = title;

    if (navcheck.test(navigator.userAgent))
        writeLine("!! ALERT: Using incompatible web browser !!");

    if (navchecklight.test(navigator.userAgent))
        writeLine("Warning: Your web browser isn't fully compatible!");

    writeLine("");
    write(getcd());
}

/**************
 * GET PROMPT *
 **************/

function getcd()
{
    return Terminal.username + 
    "@" + 
    Terminal.hostname + 
    ":" + 
    Terminal.cd + 
    Terminal.state;
}

/*****************
 * KEYCODE EVENT *
 *****************/

var trapfunction = function(event)
{
    var key;

    if (window.event) // eg. IE
    {
        key = window.event.keyCode;
    }
    else if (event.which) // eg. Firefox
    {
        key = event.which;
    }

    switch (key)
    {
        case 8: //Backspace
            var input = document.getElementById("input").innerHTML;
            /*
            if (input.substr(input.length - space.length, space.length) == space)
            {
                document.getElementById("input").innerHTML = input.substr(0, input.length - space.length);
            }
            else
            {
                document.getElementById("input").innerHTML = input.substr(0, input.length - 1);
            }*/
            document.getElementById("input").innerHTML = input.substr(0, input.length - 1);
            return false;

        case 13: //Enter and return
            executeCommand(document.getElementById("input").innerHTML);
            return false;

        case 16: //LeftShift
        case 17: //LeftCTRL
        case 18: //LeftALT
            return false;

        case 20: //Capslock
            capslock = !capslock;
            return false;

        case 32: //space
            document.getElementById("input").innerHTML += space;
            return false;

        case 37: //Left arrow key
            //cursorindex--;
            return false;

        case 39: //Right arrow key
            //cursorindex++;
            return false;

        case 48: //D0
            document.getElementById("input").innerHTML += (event.shiftKey ? ")" : "0");
            return false;

        case 49: //D1
            document.getElementById("input").innerHTML += (event.shiftKey ? "!" : "1");
            return false;

        case 50: //D2
            document.getElementById("input").innerHTML += (event.shiftKey ? "@" : "2");
            return false;

        case 51: //D3
            document.getElementById("input").innerHTML += (event.shiftKey ? "#" : "3");
            return false;

        case 52: //D4
            document.getElementById("input").innerHTML += (event.shiftKey ? "$" : "4");
            return false;

        case 53: //D5
            document.getElementById("input").innerHTML += (event.shiftKey ? "%" : "5");
            return false;

        case 54: //D6
            document.getElementById("input").innerHTML += (event.shiftKey ? "^" : "6");
            return false;

        case 55: //D7
            document.getElementById("input").innerHTML += (event.shiftKey ? "&" : "7");
            return false;

        case 56: //D8
            document.getElementById("input").innerHTML += (event.shiftKey ? "*" : "8");
            return false;

        case 57: //D9
            document.getElementById("input").innerHTML += (event.shiftKey ? "(" : "9");
            return false;

        case 65: //A key
            if (event.ctrlKey) //CTRL+A selects all (user)
                return true;
            else if (event.shiftKey)
                document.getElementById("input").innerHTML += String.fromCharCode(key);
            else
                document.getElementById("input").innerHTML += String.fromCharCode(key).toLowerCase();
            return false;

        case 67: //C key
            if (event.ctrlKey) //CTRL+C cancels
            {
                writeLine((yes > 0 ? space : "") + document.getElementById("input").innerHTML + "^C");
                write(getcd());
                document.getElementById("input").innerHTML = "";
                clearInterval(yes);

                isCanceling = true;
                yes = 0;
            }
            else if (event.shiftKey)
                document.getElementById("input").innerHTML += String.fromCharCode(key);
            else
                document.getElementById("input").innerHTML += String.fromCharCode(key).toLowerCase();
            return false;
            
        case 68: //D key
            if (event.ctrlKey)
            {
                executeCommand("exit");
            }
            else if (event.shiftKey)
                document.getElementById("input").innerHTML += String.fromCharCode(key);
            else
                document.getElementById("input").innerHTML += String.fromCharCode(key).toLowerCase();
            return false;

        case 91: //LWin
        case 92: //RWin
        case 93: //Apps
            // DO NOTHING PLEASE
            return true;

        case 96: //Num0
            document.getElementById("input").innerHTML += "0";
            return false;

        case 97: //Num1
            document.getElementById("input").innerHTML += "1";
            return false;

        case 98: //Num2
            document.getElementById("input").innerHTML += "2";
            return false;

        case 99: //Num3
            document.getElementById("input").innerHTML += "3";
            return false;

        case 100: //Num4
            document.getElementById("input").innerHTML += "4";
            return false;

        case 101: //Num5
            document.getElementById("input").innerHTML += "5";
            return false;

        case 102: //Num6
            document.getElementById("input").innerHTML += "6";
            return false;

        case 103: //Num7
            document.getElementById("input").innerHTML += "7";
            return false;

        case 104: //Num8
            document.getElementById("input").innerHTML += "8";
            return false;

        case 105: //Num9
            document.getElementById("input").innerHTML += "9";
            return false;

        case 106: //NumMultiply
            document.getElementById("input").innerHTML += "*";
            return false;

        case 107: //NumAdd
            document.getElementById("input").innerHTML += "+";
            return false;

        case 109: //NumSub
            document.getElementById("input").innerHTML += "-";
            return false;

        case 110: //NumDecimal
            document.getElementById("input").innerHTML += ".";
            return false;

        case 111: //NumDivide
            document.getElementById("input").innerHTML += "/";
            return false;

            // Function keys
        case 112:
        case 113:
        case 114:
        case 115:
        case 116: //F5
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
        case 123: //F12
            return true;

        case 186: //Oem1
            document.getElementById("input").innerHTML += (event.shiftKey ? ":" : ";");
            return false;

        case 187: //OemPlus
            document.getElementById("input").innerHTML += (event.shiftKey ? "+" : "=");
            return false;

        case 188: //OemComma
            document.getElementById("input").innerHTML += (event.shiftKey ? "<" : ",");
            return false;

        case 189: //OemMinus
            document.getElementById("input").innerHTML += (event.shiftKey ? "_" : "-");
            return false;

        case 190: //OemPeriod
            document.getElementById("input").innerHTML += (event.shiftKey ? ">" : ".");
            return false;

        case 191: //OemQuestion
            document.getElementById("input").innerHTML += (event.shiftKey ? "?" : "/");
            return false;

        case 192: //OemTilde
            document.getElementById("input").innerHTML += (event.shiftKey ? "\"" : "'");
            return false;

        case 219: //OemOpenBrackets
            document.getElementById("input").innerHTML += (event.shiftKey ? "{" : "[");
            return false;

        case 220: //Oem6
            document.getElementById("input").innerHTML += (event.shiftKey ? "|" : "\\");
            return false;

        case 221: //Oem5
            document.getElementById("input").innerHTML += (event.shiftKey ? "}" : "]");
            return false;

        default: //ETC
            if (event.shiftKey || CapsLock.isOn()) //Capslock is br0ken
            {
                document.getElementById("input").innerHTML += String.fromCharCode(key);
            }
            else if (event.ctrlKey)
            {
                //nothing for now
            }
            else
            {
                document.getElementById("input").innerHTML += String.fromCharCode(key).toLowerCase();
            }
            return false;
    }

    return true;
}

//These events must be after this method.
document.onkeydown = trapfunction; // IE, Firefox, Chrom(e|ium), Safari.
document.onkeypress = trapfunction; // Opera

/********************
 * EXECUTE COMMMAND *
 ********************/

function executeCommand(pCommand)
{
    if (pCommand == "" || pCommand == null)
    {
        writeLine("");
        write(getcd());
    }
    else
    {
        var input = document.getElementById("input").innerHTML;
        var command = input.split(space, 1)[0].trim();

        input = input.substr(command.length + space.length).replace(space, " ").trim();

        var help = false;

        var hasargs = input.length > 0;

        var isReset = false;

        writeLine(space + command + space + input);

        if (debug)
        { 
            writeLine("command: " + command);
            writeLine("Has args: " + (hasargs ? "Yes" : "No"));
            if (hasargs) { writeLine("Args: " + input); }

            writeLine("== OUTPUT ==");
        }

        switch (command)
        {
            // -- A --
            case "about":
                writeLine("");
                writeLine("Tiny GNU/Linux \"Terminal\", made for fun.");
                writeLine("Powered by HTML5, CSS3, and Javascript.");
                writeLine("Using Canonical Ltd.'s Ubuntu Monospaced font. (c)");
                writeLine("Written by DD~!");
                writeLine("Version: " + version);
                writeLine("");
                break;
            // -- B --

            // -- C --
            case "cal":
                //writeLine("22 <span>...");
                //writeLine("");
                //writeLine("");
                break;
            case "cd":

                break;
            case "cksum":
                if (/--version/.test(input))
                {
                    writeLine("cksum (coreutils) 8.21" + nl +
                    "Copyright (C) 2013 Free Software Foundation, Inc." + nl + 
                    "License GPLv3+: GNU GPL version 3 or later &lt;http://gnu.org/licenses/gpl.html&gt;." + nl +
                    "This is free software: you are free to change and redistribute it." + nl +
                    "There is NO WARRANTY, to the extent permitted by law." + nl +
                    nl +
                    "Written by Q. Frank Xia.");
                }
                else if (/--help/.test(input))
                {
                    writeLine("Usage: cksum [TEXT]..." + nl +
                    "  or:  cksum [OPTION]" + nl +
                    "Print CRC checksum and byte counts of each TEXT." + nl +
                    nl +
                    "      --help     display this help and exit" + nl +
                    "      --version  output version information and exit" + nl +
                    nl +
                    "Report cksum bugs to bug-coreutils@gnu.org" + nl +
                    "GNU coreutils home page: &lt;http://www.gnu.org/software/coreutils/&gt;" + nl +
                    "General help using GNU software: &lt;http://www.gnu.org/gethelp/&gt;" + nl +
                    "For complete documentation, run: info coreutils 'cksum invocation'");
                }
                else if (hasargs)
                {
                    var input = input.replace(space, " ");

                    writeLine(HashTextCKSUM(input));
                }
                break;
            case "clear":
                //Who even likes that command anyway?
                writeLine(insertBr(30));
                break;

            // -- D --
            case "date":
                var time = new Date();

                var day = time.getDate();
                var month = time.getMonth();
                var year = time.getFullYear();

                var hour = time.getHours();
                var minute = time.getMinutes();
                var second = time.getSeconds();

                var timezone = time.getTimezoneOffset();

                var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                var dweek = weekday[time.getDay()];

                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                month = months[month];

                if (day < 10)
                    day = "0" + day;

                if (hour < 10)
                    hour = "0" + hour;

                if (minute < 10)
                    minute = "0" + minute;

                if (second < 10)
                    second = "0" + second;

                switch (timezone)
                {
                    case 660:
                        timezone = "MIT";
                        break;
                    case 600:
                        timezone = "HAST";
                        break;
                    case 540:
                        timezone = "AKST";
                        break;
                    case 480:
                        timezone = "PST";
                        break;
                    case 420:
                        timezone = "MST";
                        break;
                    case 360:
                        timezone = "CST";
                        break;
                    case 300:
                        timezone = "EST";
                        break;
                    case 240:
                        timezone = "PRT";
                        break;
                    case 180:
                        timezone = "CNT";
                        break;
                    case 120:
                        timezone = "BET";
                        break;
                    case 60:
                        timezone = "CAT";
                        break;

                    case 0:
                        timezone = "UTC";
                        break;

                    case -60:
                        timezone = "CET";
                        break;
                    case -120:
                        timezone = "EET";
                        break;
                    case -180:
                        timezone = "EAT";
                        break;
                    case -240:
                        timezone = "MET";
                        break;
                    case -300:
                        timezone = "NET";
                        break;
                    case -330:
                        timezone = "IST";
                        break;
                    case -360:
                        timezone = "BST";
                        break;
                    case -420:
                        timezone = "ICT";
                        break;
                    case -480:
                        timezone = "CIT";
                        break;
                    case -540:
                        timezone = "JST";
                        break;
                    case -600:
                        timezone = "AEST";
                        break;
                    case -660:
                        timezone = "SST";
                        break;
                    case -720:
                        timezone = "NZST";
                        break;
                    case -780:
                        timezone = "NZDT";
                        break;
                    /*
                    case -840:
                        timezone = "";
                        break;
                    case -900:
                        timezone = "";
                        break;
                    case -960:
                        timezone = "";
                        break;*/
                    default:
                        timezone = "Unknown";
                        break;
                }

                writeLine(dweek + " " + month + " " + day + " " + hour + ":" + minute + ":" + second + " " + timezone + " " + year);
                break;
            case "debug":
                if (debug)
                {
                    debug = false;
                    writeLine("Toggled debug mode off.");
                }
                else
                {
                    debug = true;
                    writeLine("Toggled debug mode on.");
                }
                break;
            // -- E --
            case "echo=": break;
            case "echo":
                writeLine(input);
                break;
            case "exit":
                window.location.href = "../index.html";
                break;

            // -- F --

            // -- G --

            // -- H --
            case "help":
                if (hasargs)
                {
                    var helpcom = input.split(/(space)/g, 1)[0].replace(space, "");

                    printHelp(helpcom);
                }
                else
                {
                    writeLine("GNU bla bla bla...");
                }
                break;

            // -- I --
            case "info":
                writeLine("Don't even think about it.");
                break;
            case "init":
                writeLine("Nice try!");
                break;
            // -- J --

            // -- K --

            // -- L --

            // -- M --

            // -- N --
            case "nano":
                writeLine("I wish to implement that...");
                writeLine("Buuut it would take way too much time.");
                break;
            // -- O --

            // -- P --

            // -- Q --

            // -- R --
            case "reset":
                document.getElementById("output").innerHTML = "";
                setTimeout(function() { write(getcd()); }, 1350);
                isReset = true;
                break;

            // -- S --
            case "set":
                writeLine("No.");
                break;
            case "sleep":
                //TODO: 1 = 1 second

                break;
            case "sudo":
                writeLine("Super no.");
                break;
            case "sum":
                if (/--version/.test(input))
                {
                    writeLine("sum (GNU coreutils) 8.21" + nl +
                    "Copyright (C) 2013 Free Software Foundation, Inc." + nl +
                    "License GPLv3+: GNU GPL version 3 or later &lt;http://gnu.org/licenses/gpl.html&gt;." + nl +
                    "This is free software: you are free to change and redistribute it." + nl +
                    "There is NO WARRANTY, to the extent permitted by law." + nl +
                    nl +
                    "Written by Kayvan Aghaiepour and David MacKenzie.");
                }
                else if (/--help/.test(input))
                {
                    writeLine("Usage: sum  [OPTION]... [TEXT]..." + nl +
                    "  or:  cksum [OPTION]" + nl +
                    "Print checksum and block counts for each TEXT." + nl +
                    nl +
                    "  -r              use BSD sum algorithm, use 1K blocks" + nl +
                    "  -s, --sysv      use System V sum algorithm, use 512 bytes blocks" + nl +
                    "      --help     display this help and exit" + nl +
                    "      --version  output version information and exit" + nl +
                    nl +
                    "With no TEXT, or when TEXT is -, read standard input." + nl +
                    nl +
                    "Report cksum bugs to bug-coreutils@gnu.org" + nl +
                    "GNU coreutils home page: &lt;http://www.gnu.org/software/coreutils/&gt;" + nl +
                    "General help using GNU software: &lt;http://www.gnu.org/gethelp/&gt;" + nl +
                    "For complete documentation, run: info coreutils 'sum invocation'");
                }
                else if (hasargs)
                {
                    var input = input.replace(space, " ");
                    /*
                    Explained:
                    -r overrides -s/-sysv but -r is used by default
                    */
                    if (/-r/.test(input))
                    {
                        var startpos = input.search(/-r/) + 3;

                        input = input.substr(startpos, input.length - startpos);

                        writeLine(HashTextSumBSD(input));
                    }
                    else if (/(-s|--sysv)/.test(input))
                    {
                        var startpos = input.search(/(-s|--sysv)/) + 3;

                        input = input.substr(startpos, input.length - startpos);

                        writeLine(HashTextSumSysV(input));
                    }
                    else
                    {
                        writeLine(HashTextSumBSD(input));
                    }

                }
                break;
            // -- T --
            case "time":
                writeLine("");
                writeLine("real" + insertSpaces(4) + "0m0.000s");
                writeLine("user" + insertSpaces(4) + "0m0.000s");
                writeLine("sys" + insertSpaces(5) + "0m0.000s");
                break;
            case "title":
                document.title = input.replace(space, " ").trim();
                break;

            // -- U --
            case "uuencode":
                if (hasargs)
                {
                    writeLine(UUEncode(input.replace(space, " ")));
                }
                break;
            case "uname":
                if (hasargs)
                {
                    if (/(--version)/.test(input))
                    {
                        writeLine("Copyright (C) 2013 Free Software Foundation, Inc." + nl +
                        "License GPLv3+: GNU GPL version 3 or later &lt;http://gnu.org/licenses/gpl.html&gt;." + nl +
                        "This is free software: you are free to change and redistribute it." + nl +
                        "There is NO WARRANTY, to the extent permitted by law." + nl +
                        nl + 
                        "Written by David MacKenzie.");
                    }
                    else if (/(--help)/.test(input))
                    {
                        writeLine("Usage: uname [OPTION]..." + nl +
                        "Print certain system information. With no OPTION, same as -s." + nl +
                        + nl +
                        "  -a, --all                print all information, in the following order," + nl +
                        "                             except omit -p and -i if unknown:" + nl +
                        "  -s, --kernel-name        print the kernel name" + nl +
                        "  -n, --nodename           print the network node hostname" + nl +
                        "  -r, --kernel-release     print the kernel release" + nl +
                        "  -v, --kernel-version     print the kernel version" + nl +
                        "  -m, --machine            print the machine hardware name" + nl +
                        "-  p, --processor          print the processor type or \"unknown\"" + nl +
                        "  -i, --hardware-platform  print the hardware platform or \"unknown\"" + nl +
                        "  -o, --operating-system   print the operating system" + nl +
                        "  --help     display this help and exit" + nl +
                        "  --version  output version information and exit" + nl +
                        + nl +
                        "Report uname bugs to bug-coreutils@gnu.org" + nl +
                        "GNU coreutils home page: &lt;http://www.gnu.org/software/coreutils/&gt;" + nl +
                        "General help using GNU software: &lt;http://www.gnu.org/gethelp/&gt;" + nl +
                        "For complete documentation, run: info coreutils 'uname invocation'");
                    }
                    else if (/(-a)/.test(input))
                    {
                        writeLine("Linux ubuntu 3.16.0-31-generic #41~14.04.1-Ubuntu SMP Wed Feb 11 19:30:43 UTC 2015 i686 i686 i686 GNU/Linux");
                    }
                    else
                    {
                        var str = "";
                        if (/(-s)/.test(input)) str += "Linux" + space;
                        if (/(-n)/.test(input)) str += "ubuntu" + space;
                        if (/(-r)/.test(input)) str += "3.16.0-generic" + space;
                        if (/(-v)/.test(input)) str += "#41~14.04.1-Ubuntu SMP Wed Feb 11 19:30:43 UTC 2015" + space;
                        if (/(-m)/.test(input)) str += "i686" + space;
                        if (/(-p)/.test(input)) str += "i686" + space;
                        if (/(-i)/.test(input)) str += "i686" + space;
                        if (/(-o)/.test(input)) str += "GNU/Linux";

                        writeLine(str);
                    }
                }
                else
                    writeLine("Linux");
                break;

            // -- V --

            // -- W --
            case "whoami":
                writeLine(username);
                break;

            // -- X --
            case "xxencode":
                if (hasargs)
                {
                    writeLine(XXEncode(input.replace(space, " ")));
                }
                break;

            // -- Y --
            case "yes":
                if  (/--version/.test(input))
                {
                    writeLine("yes (GNU coreutils) 8.21" + nl +
                    "Copyright (C) 2013 Free Software Foundation, Inc." + nl +
                    "License GPLv3+: GNU GPL version 3 or later &lt;http://gnu.org/licenses/gpl.html&gt;" + nl +
                    "This is free software: you are free to change and redistribute it." + nl +
                    "There is NO WARRANTY, to the extent permitted by law." + nl +
                    + nl +
                    "Written by David MacKenzie.");
                }
                else if (/--help/.test(input))
                {
                    writeLine("Usage: yes [STRING]..." + nl +
                    "  or:  yes OPTION" + nl +
                    "Repeatedly output a line with all specified STRING(s), or 'y'." + nl +
                    nl +
                    "      --help     display this help and exit" + nl +
                    "      --version  output version information and exit" + nl +
                    nl +
                    "Report yes bugs to bug-coreutils@gnu.org" + nl +
                    "GNU coreutils home page: &lt;http://www.gnu.org/software/coreutils/&gt;" + nl +
                    "General help using GNU software: &lt;http://www.gnu.org/gethelp/&gt;" + nl +
                    "For complete documentation, run: info coreutils 'yes invocation'");
                }
                else
                {
                    var entry = hasargs ? input : "y";

                    writeLine(entry);
                    yes = setInterval(function() { writeLine(entry); }, yes_interval);
                    isReset = true;
                }
                break;

            // -- Z --

            // -- default --
            default:
                writeLine(command + ": command not found");
                break;
        }

        document.getElementById("input").innerHTML = "";
        
        if (!isReset) write(getcd());

        isReset = false;
    }
}

/**************************
 * OUTPUT WRITING METHODS *
 **************************/

function write(pText)
{
    document.getElementById("output").innerHTML += pText;

    window.location.href = "#cursor";
}

function writeLine(pText)
{
    document.getElementById("output").innerHTML += pText + nl;

    window.location.href = "#cursor";
}

function read()
{
    return "&gt;TODO&lt;";
}

/*****************************
 * PRINT HELP (FROM COMMAND) *
 *****************************/

function printHelp(name)
{
    switch (name)
    {
        case "help":
            writeLine("Displays help!");
            break;
        default:
            writeLine("bash: help: no help topics match `" + 
                name +
                "'.  Try `help help' or `man -k " +
                name +
                "' or `info " +
                name + "'.");
            break;

    }
}

/*********************
 * SMALLER FUNCTIONS *
 *********************/

function insertSpaces(number)
{
    var str = "";

    for (var i = 0; i < number; i++)
    {
        str += space;
    }

    return str;
}

function insertBr(number)
{
    var str = "";

    for (var i = 0; i < number; i++)
    {
        str += nl;
    }

    return str;
}

//setInterval(cursortoggleblink, 1000);

function cursortoggleblink()
{
    if (document.getElementById("cursor").style.visibility == "hidden")
        document.getElementById("cursor").style.visibility = "visible";
    else
        document.getElementById("cursor").style.visibility = "hidden";
}