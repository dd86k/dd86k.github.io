/*
Written by DD~!
Copyrights (c) DD~! 2015
*/
"use strict";

/*
    THE "BEFORE I FORGET WHAT TO DO" SECTION
    
    - Taskbar buttons
    - Taskbar focus
    - minimize

*/

/*************
 * Variables *
 *************/

var cd = "C:\\WINDOWS&gt;";

var drive = "C";

var debug = false;

var Console = {
    space: " ",
    nl: "\n",
    Prompt: {
        cd: "WINDOWS",
        drive: "C"
        //TODO: find better property name than "prompt" and well work on this part
        //prompt: Console.Prompt.drive + "\\" + Console.Prompt.cd + "&gt;"
    }
};

var Project = {
    productName: "Windows 98 WebSim",
    version: "0.3.4.2.2015"
};

var indexWindow = 0;
var WindowzIndex = 0;
var currentFocusWindow;
var currentFocusCmd;

/*********************
 * Starting the page *
 *********************/

onload = start;

function start()
{
    updateTime();
    document.getElementById("desktopversion").innerHTML = Project.productName + " " + Project.version;
}

/********
 * Time *
 ********/

function updateTime()
{
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    
    if (minutes < 10)
    {
        minutes = "0" + minutes;
    }
    
    var t_type = "";
    
    if(hours > 12)
    {
        t_type += "PM";
        hours = hours - 12;
    }
    else if (hours == 12)
    {
        t_type += "PM";
    }
    else
    {
        t_type += "AM";
    }
    
    var t_str = hours + ":" + minutes + " " + t_type;
    
    time.innerHTML = t_str;
}

setInterval(updateTime, 2500);

/**************
 * Start menu *
 **************/

function showMenu()
{
    WindowAPI.removeFocusAll();
    if (startmenu.style.visibility == 'hidden')
    {
        startmenu.style.visibility = 'visible';
        startbutton.src = 'win98/images/startmenu/on.png';
    }
    else
    {
        startmenu.style.visibility = 'hidden';
        startbutton.src = 'win98/images/startmenu/off.png';
    }
}

function hideMenu()
{
    startmenu.style.visibility = 'hidden';
    startbutton.src = 'win98/images/startmenu/off.png';
    //removeFocusAll();
}

startbutton.onmousedown = showMenu;
desktop.onmousedown = hideMenu;

/*******************
 * Windows Manager *
 *******************/
var WindowAPI = {
    showInfo: function(pTitle, pMessage)
    {
        //Note: 300 is temporary
        var x = (window.innerWidth / 2) - (300 / 2);
        var y = (window.innerHeight / 2) - (300 / 2);
        WindowAPI.createWindow(pTitle,
        x,
        y,
        300,
        200,
        'info',
        pMessage);
    },
 
    showWarning: function(pTitle, pMessage)
    {
        //Note: 300 is temporary
        var x = (window.innerWidth / 2) - (300 / 2);
        var y = (window.innerHeight / 2) - (300 / 2);
        WindowAPI.createWindow(pTitle,
        x,
        y,
        300,
        200,
        'warning',
        pMessage);
    },

    showError: function(pTitle, pMessage)
    {
        //Note: 300 is temporary
        var x = (window.innerWidth / 2) - (300 / 2);
        var y = (window.innerHeight / 2) - (300 / 2);
        WindowAPI.createWindow(pTitle,
        x,
        y,
        300,
        200,
        'error',
        pMessage);
    },

    //sizeable/prompt(if yes then no min/max buttons), 
    createWindow: function(pTitle, pPosX, pPosY, pWidth, pHeight, pType, pMessage)
    {
        var windowid = indexWindow;

        //Window frame
        var divwindow = document.createElement("div");
        divwindow.id = "window" + windowid;
        divwindow.className = "window";
        divwindow.style.position = "absolute";
        divwindow.style.top = pPosY + "px";
        divwindow.style.left = pPosX + "px";
        divwindow.style.visibility = "visible";
        divwindow.style.width = pWidth + "px";
        divwindow.style.height = pHeight + "px";
        divwindow.style.zIndex = WindowzIndex++;
        divwindow.addEventListener("mousedown", function () { WindowAPI.giveFocus(divwindow); });
    
        //Titlebar
        var divtitle = document.createElement("div");
        divtitle.id = "title" + indexWindow;
        divtitle.className = "ntitle";
        divtitle.addEventListener("mousedown", function () { WindowAPI.Drag.startMoving(divwindow, desktop, divwindow.event); });
        divtitle.addEventListener("mouseup", function () { WindowAPI.Drag.stopMoving(divwindow); });
    
        //Titlebar icon
        var divtitleicon = document.createElement("img");
        if (!WindowAPI.hasIcon(pType)) //TODO: ? button
        { //Dialog type
            //Text
            var divtitletext = document.createElement("span");
            divtitletext.innerHTML = pTitle;
            divtitle.appendChild(divtitletext);
            divwindow.appendChild(divtitle);

            //Close
            var divclose = document.createElement("img");
            divclose.className = "ctrlboxbutton";
            divclose.src = "win98/images/window/close.png";
            //divclose.addEventListener("click", function () { WindowAPI.deleteWindow(divwindow); });
            divclose.addEventListener("mousedown", function () { divclose.src = "win98/images/window/closep.png"; });
            divclose.addEventListener("mouseup", function ()
            {
                divclose.src = "win98/images/window/close.png";
                WindowAPI.deleteWindow(divwindow);
            });

            divtitle.appendChild(divtitletext);
            divtitle.appendChild(divclose);
        }
        else
        { //Normal window
            //Icon
            divtitleicon.className = "windowicon";

            //Text
            var divtitletext = document.createElement("span");
            divtitletext.innerHTML = pTitle;

            //Minimize
            var divmin = document.createElement("img");
            divmin.className = "ctrlboxbuttonm";
            divmin.src = "win98/images/window/min.png";
            divmin.addEventListener("mousedown", function () { divmin.src = "win98/images/window/minp.png"; });
            divmin.addEventListener("mouseup", function ()
            {
                divmin.src = "win98/images/window/minp.png";
                WindowAPI.hideWindow(divwindow);
            });

            //Maximize
            var divmax = document.createElement("img");
            divmax.className = "ctrlboxbutton";
            divmax.src = "win98/images/window/max.png";
            //divmax.addEventListener("mouseup", function () { WindowAPI.maximizeWindow(divwindow); });

            //Close
            var divclose = document.createElement("img");
            divclose.className = "ctrlboxbutton";
            divclose.src = "win98/images/window/close.png";
            divclose.addEventListener("click", function () { WindowAPI.deleteWindow(divwindow); });
            divclose.addEventListener("mousedown", function () { divclose.src = "win98/images/window/closep.png"; });

            divtitle.appendChild(divtitleicon);
            divtitle.appendChild(divtitletext);
            divtitle.appendChild(divclose);
            divtitle.appendChild(divmax);
            divtitle.appendChild(divmin);
        }

        divwindow.appendChild(divtitle);
    
        //Windows area
        var divwindowarea = document.createElement("div");
        divwindowarea.className = "windowarea";
        divwindow.appendChild(divwindowarea);
        
        //Taskbar button
        //WindowAPI.addTaskbarButton(pTitle, "");
    
        switch (pType)
        {
            case "notepad":
                divtitleicon.src = "win98/images/notepad/titleleft.png";
                //divwindow.className = "window";
            
                var divmenu = document.createElement("img");
                divmenu.className = "notepadmenu";
                divmenu.src = "win98/images/notepad/menu.png";
            
                var divinput = document.createElement("textarea");
                divinput.className = "notepadinput";
                divinput.style.width = (pWidth - 15) + "px";
                divinput.style.height = (pHeight - 53) + "px";
            
                divwindowarea.appendChild(divmenu);
                divwindowarea.appendChild(divinput);
                break;
            case "cmd":
                divtitleicon.src = "win98/images/cmd/titleleft.png";
                divwindow.className = "window";
                divwindow.style.width = pWidth + "px";
                divwindow.style.height = pHeight + "px";
            
                var divcmdmenu = document.createElement("img");
                divcmdmenu.src = "win98/images/cmd/menu.png";
                divcmdmenu.style.marginTop = "2px";
            
                var divcmd = document.createElement("div");
                divcmd.id = "terminal" + indexWindow;
                divcmd.className = "terminal";
                divcmd.style.width = (pWidth - 16) + "px";
                divcmd.style.height = (pHeight - 66) + "px";

                var spanoutput = document.createElement("span");
                spanoutput.id = "output" + indexWindow;

                var spaninput = document.createElement("span");
                spaninput.id = "input" + indexWindow;

                var spancursor = document.createElement("span");
                spancursor.id = "cursor" + indexWindow;
                var cur = document.createTextNode("_");
                spancursor.appendChild(cur);

                divwindowarea.appendChild(divcmdmenu);
            
                divcmd.appendChild(spanoutput);
                divcmd.appendChild(spaninput);
                divcmd.appendChild(spancursor);
            
                divwindowarea.appendChild(divcmd);
                currentFocusCmd = divcmd;
                break;
            case "info":
                var divmsg = document.createElement("span");
                divmsg.className = "msgboxMsg";
                var divmsgtext = document.createTextNode(pMessage);
                divmsg.appendChild(divmsgtext);
            
                var divmsgicon = document.createElement("img");
                divmsgicon.className = "msgboxIcon";
                divmsgicon.src = "win98/images/msgbox/infoicon.png";
            
                var divbutton = WindowAPI.makeButton("OK", 0, 0);
                divbutton.addEventListener("click", function () { WindowAPI.deleteWindow(divwindow); });
                divbutton.style.position = "absolute";
                divbutton.style.bottom = "14px";
                divbutton.style.left = ((pWidth / 2) - 35) + "px";
            
                divwindowarea.appendChild(divmsgicon);
                divwindowarea.appendChild(divmsg);
                divwindowarea.appendChild(divbutton);
                break;
            case "warning":
                var divmsg = document.createElement("span");
                divmsg.className = "msgboxMsg";
                var divmsgtext = document.createTextNode(pMessage);
                divmsg.appendChild(divmsgtext);
            
                var divmsgicon = document.createElement("img");
                divmsgicon.className = "msgboxIcon";
                divmsgicon.src = "win98/images/msgbox/warningicon.png";
            
                var divbutton = WindowAPI.makeButton("OK", 0, 0);
                divbutton.addEventListener("click", function () { WindowAPI.deleteWindow(divwindow); });
                divbutton.style.position = "absolute";
                divbutton.style.bottom = "14px";
                divbutton.style.left = ((pWidth / 2) - 35) + "px";
            
                divwindowarea.appendChild(divmsgicon);
                divwindowarea.appendChild(divmsg);
                divwindowarea.appendChild(divbutton);
                break;
            case "error":
                var divmsg = document.createElement("span");
                divmsg.className = "msgboxMsg";
                var divmsgtext = document.createTextNode(pMessage);
                divmsg.appendChild(divmsgtext);
            
                var divmsgicon = document.createElement("img");
                divmsgicon.className = "msgboxIcon";
                divmsgicon.src = "win98/images/msgbox/erroricon.png";
            
                var divbutton = WindowAPI.makeButton("OK", 0, 0);
                divbutton.addEventListener("click", function () { WindowAPI.deleteWindow(divwindow); });
                divbutton.style.position = "absolute";
                divbutton.style.bottom = "14px";
                divbutton.style.left = ((pWidth / 2) - 35) + "px";
            
                divwindowarea.appendChild(divmsgicon);
                divwindowarea.appendChild(divmsg);
                divwindowarea.appendChild(divbutton);
                break;
            case "test":
                var testbutton = WindowAPI.makeButton("Test me!", 0, 0);
                testbutton.style.marginTop = "10px";
                
                var radcon0 = document.createElement("div");
                var radtext0 = document.createTextNode("Rad0");
                var rad0 = document.createElement("input");
                rad0.type = "radio";
                rad0.name = "test";
                radcon0.appendChild(rad0);
                radcon0.appendChild(radtext0);
                
                var radcon1 = document.createElement("div");
                var radtext1 = document.createTextNode("Rad1");
                var rad1 = document.createElement("input");
                rad1.type = "radio";
                rad1.name = "test";
                radcon1.appendChild(rad1);
                radcon1.appendChild(radtext1);
                
                divwindowarea.appendChild(radcon0);
                divwindowarea.appendChild(radcon1);
                divwindowarea.appendChild(testbutton);
                break;
            case "aboutdialog":
                divwindow.style.left = (window.innerWidth / 2) - (pWidth / 2) + "px";
                divwindow.style.top = (window.innerHeight / 2) - (pHeight / 2) + "px";
            
                var lblAbout = document.createElement("p");
                lblAbout.innerHTML = Project.productName + "<br/>\
                Version " + Project.version + "<br/><br/>\
                A poorly made web based Windows 98 simulator. Made from scratch using only HTML5, CSS3, and Javascript.<br/><br/>\
                This is only a personal project and I do not plan to monetize, nor make profit off of this.<br/><br/>\
                <br/>\
                Written by DD~!<br/><br/>";
                lblAbout.style.textAlign = "center";
                
                var btnOK = WindowAPI.makeButton("Close", 0, 0);
                btnOK.addEventListener("click", function() { WindowAPI.deleteWindow(divwindow); });
                
                var btnSpin = WindowAPI.makeButton("Spin!", 0, 0);
                btnSpin.addEventListener("click", function()
                { 
                    divwindow.style.animation = "spin 1s";
                    divwindow.style.WebkitAnimation = "spin 1s";
                    setTimeout(function()
                    {
                        divwindow.style.animation = "";
                        divwindow.style.WebkitAnimation = "";
                    }, 1000);
                });
                
                var btnSpinForever = WindowAPI.makeButton("Spin for ever!", 125, 0);
                btnSpinForever.addEventListener("click", function()
                { 
                    divwindow.style.animation = "spin 2s infinite linear";
                    divwindow.style.WebkitAnimation = "spin 2s infinite linear";
                });
                
                btnOK.style.marginLeft = 
                btnSpin.style.marginLeft = 
                btnSpinForever.style.marginLeft = "18px";
                
                divwindowarea.appendChild(lblAbout);
                divwindowarea.appendChild(btnOK);
                divwindowarea.appendChild(btnSpin);
                divwindowarea.appendChild(btnSpinForever);
                break;
            default:
                divtitleicon.src = "win98/images/window/titleleft.png";
                break;
        }

        desktop.appendChild(divwindow);

        switch (pType)
        {
            case "cmd":
                startUp(divcmd); break;
            default: break;
        }
    
        WindowAPI.giveFocus(divwindow);
        hideMenu();
        indexWindow++;
    },
    /*
    addTaskbarButton: function(pName, pIcon)
    { //TODO
        var divTaskbarButton
        
        taskbar.appendChild();
    },
    */
    hasIcon: function(pType)
    {
        switch (pType)
        {
            case "shutdown":
            case "error":
            case "warning":
            case "info":
            case "aboutdialog":
            case "test":
                return false;
            default: //Use default icon
                return true;
        }
    },

    makeButton: function(pText, pWidth, pHeight)
    {
        pWidth = pWidth <= 0 ? 70 : pWidth;
        pHeight = pHeight <= 0 ? 22 : pHeight;
    
        var divbutton = document.createElement("div");
        divbutton.className = "okbutton";
        divbutton.style.width = pWidth + "px";
        divbutton.style.height = pHeight + "px";
        divbutton.addEventListener("mousedown", function () { divbutton.className = "okbuttonp"; });
        divbutton.addEventListener("mouseup", function () { divbutton.className = "okbutton"; });
    
        var divtext = document.createElement("div");
        divtext.style.marginTop = "3px";
        divtext.style.marginLeft = "3px";
        divtext.style.textAlign = "center";
        divtext.style.width = pWidth - 8 + "px";
        divtext.style.border = "1px dotted black";
        var text = document.createTextNode(pText);
    
        divtext.appendChild(text);
        divbutton.appendChild(divtext);
    
        return divbutton;
    },

    deleteWindow: function(pDiv)
    {
        pDiv.remove();
    },

    showWindow: function(pDiv)
    {
        pDiv.style.visibility = "visible";
    
        hideMenu();
    },

    hideWindow: function(id)
    {
        id.style.visibility = "hidden";

        //if (id == "cmd") cursor.style.visibility = "hidden";
    },

    giveFocus: function(pDiv)
    {
        WindowAPI.removeFocusAll();
        pDiv.style.zIndex = WindowzIndex;

        pDiv.childNodes[0].className = "title";

        WindowzIndex++;
        currentFocusWindow = pDiv;
    },

    removeFocusAll: function()
    {
        var classes = document.getElementsByClassName("title");
        for (var i = 0; i < classes.length; i++)
        {
            classes[i].className = "ntitle";
        }
    },
    
    killAllWindows: function()
    {
        var windows = document.getElementsByClassName("window");
        
        for(var i = 0; i < windows.length; i++)
        {
            windows[i].remove();
        }
    },

    hasWindowFocus: function(pDiv)
    {
        if (currentFocusWindow == pDiv) return true;
        else return false;
    },

// Mofified function from niente00, StackOverflow
    Drag:
    {
        move: function (divid, xpos, ypos)
        {
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving: function (divid, container, evt)
        {
            var e = evt || window.event;
            var posX = e.clientX,
                posY = e.clientY,
                divTop = divid.style.top,
                divLeft = divid.style.left,
                eWi = parseInt(divid.style.width),
                eHe = parseInt(divid.style.height),
                cWi = parseInt(container.style.width),
                cHe = parseInt(container.style.height);
            divTop = divTop.replace('px', '');
            divLeft = divLeft.replace('px', '');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function (ef)
            {
                ef = evt || window.event;
                var posX = ef.clientX,
                    posY = ef.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                if (aX < 0) aX = 0;
                if (aY < 0) aY = 0;
                if (aX + eWi > cWi) aX = cWi - eWi;
                if (aY + eHe > cHe) aY = cHe - eHe;
                WindowAPI.Drag.move(divid, aX, aY);
            };
        },
        stopMoving: function (container)
        {
            document.onmousemove = function () { };
        }
    }
};

// StackOverflow solution by Johan Dettmar
Element.prototype.remove = function ()
{
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function ()
{
    for (var i = 0, len = this.length; i < len; i++)
    {
        if (this[i] && this[i].parentElement)
        {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

/******************
 * Command prompt *
 ******************/

function startUp(cmdid)
{
    cmdid.innerHTML = "";
    cmdid.innerHTML = "";
    writeLine("Microsoft(R) Windows 98");
    writeLine("   (C)Copyrights Microsoft Corp 1981-1998");
    writeLine("");
    write("C:\\WINDOWS&gt;");
}

var trapfunction = function(event)
{
    //if (!hasWindowFocus(currentFocusWindow)) return true;
    
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
    { //TODO: event.Shift with d0 and etc. (US layout)
        case 8: //Backspace
            if (document.getElementById("cmd").style.visibility == "visible")
            {
                var input = document.getElementById("input").innerHTML;
                document.getElementById("input").innerHTML = input.substr(0, input.length - 1);

                return false;
            }
            break;
            
        case 13: //Enter and return
            executeCommand(document.getElementById("input").innerHTML);
            return false;
            
        case 32: //Space
            document.getElementById("input").innerHTML += Console.space;
            return false;
        case 37: //Left arrow key
            //Acts a bit like backspace

            //var isLeftKey = true;

        case 39: //Right arrow key


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

        case 48: //D0
            document.getElementById("input").innerHTML += (event.shiftKey ? ")" : "0");
            return false;

        case 67: //C
            if (event.ctrlKey)
            {
                writeLine(document.getElementById("input").innerHTML + "^C");
                write("C:\\WINDOWS&gt;");
                document.getElementById("input").innerHTML = "";
            }
            else if (event.shiftKey)
            {
                document.getElementById("input").innerHTML += String.fromCharCode(key);
                return false;
            }
            else
            {
                document.getElementById("input").innerHTML += String.fromCharCode(key).toLowerCase();
                return false;
            }
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

        /*case 220: //<
            //TODO: backspace can't remove a < or > (treated as tags?)
            if (event.shiftKey)
                document.getElementById("input").innerHTML += "&gt;";
            else
                document.getElementById("input").innerHTML += "&lt;";
            return false;*/

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
            if (event.shiftKey)
            {
                document.getElementById("input").innerHTML += String.fromCharCode(key);
                return false;
            }
            if (event.ctrlKey)
            {
                //nothing for now
                return false;
            }
            else
            {
                document.getElementById("input").innerHTML += String.fromCharCode(key).toLowerCase();
                return false;
            }
            break;
    }

    return true;
};

document.onkeydown = trapfunction; // IE, Firefox, Safari
document.onkeypress = trapfunction; // only Opera needs the backspace nullifying in onkeypress

function write(pText)
{
    currentFocusCmd.innerHTML += pText;
}

function writeLine(pText)
{
    currentFocusCmd.innerHTML += pText + Console.nl;
}

function executeCommand(pCommand)
{
    if (pCommand == "" || pCommand == null)
    {
        writeLine("");
        write(cd);
    }
    else
    {
        var input = document.getElementById("input").innerHTML;
        var command = input.split(Console.space, 1)[0].toLowerCase().trim();
        input = input.substr(command.length).trim();
        
        //var help = false;
        //TODO: 
        // if (input[0] + input[1] == "/?")
        // {
            // printHelp(command)
        // }

        //TODO:
        // var args = input.split(" ", 8);
        
        writeLine(document.getElementById("input").innerHTML);
        
        if (debug)
        {
            writeLine("command: " + command);
            writeLine("Has args: " + (input.search(" ") > 0 ? "Yes" : "No"));
            writeLine("args: " + input);
            writeLine("== OUTPUT ==");
            // writeLine("");
        }

        switch (command)
        {
            // A
            case "about":
                writeLine("");
                writeLine("Small Windows 98 Web Env.");
                writeLine("Written by DD~!");
                writeLine("Version: " + Project.version);
                writeLine("");
                writeLine("");
            break;
            // B

            // C
            case "chdir":
            case "cd":
                writeLine(cd);
                break;
            case "chcp":
                writeLine("Active code page: 850");
                break;
            case "color": // <bg><forecolor>
                var backcolor = input[0];
                var forecolor = input[1];

                if (forecolor != backcolor)
                {
                    document.getElementById("output").style.color = getColor(forecolor);
                    document.getElementById("input").style.color = getColor(forecolor);
                    document.getElementById("terminal").style.backgroundColor = getColor(backcolor);
                }

                break;
            case "cls":
                document.getElementById("output").innerHTML = "";
                break;
            // D
            case "date":
                var time = new Date();
                var day = time.getDate();
                var month = time.getMonth();
                var year = time.getFullYear();

                var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                var dweek = weekday[time.getDay()];

                if (day < 10)
                    day = "0" + day;

                if (month < 10)
                    month = "0" + month;

                writeLine("The current date is: " + dweek + " " + day + "/" + month + "/" + year);
                break;
            case "debug":
                if (debug)
                {
                    debug = false;
                    writeLine("Debug mode turned off.");
                }
                else
                {
                    debug = true;
                    writeLine("Debug mode turned on.");
                }
                break;
            // E
            case "echo.":
            case "echo=":
                writeLine("");
                break;
            case "echo":
                writeLine(input);
                break;
            case "exit":
                
                break;
            // F

            // G

            // H
            case "help":
                writeLine("about");
                writeLine("chdir");
                writeLine("cd");
                writeLine("chcp");
                writeLine("color");
                writeLine("cls");
                writeLine("date");
                writeLine("echo");
                writeLine("exit");
                //writeLine("pause");
                writeLine("path");
                //writeLine("prompt");
                writeLine("rem");
                writeLine("set");
                writeLine("shutdown");
                writeLine("time");
                writeLine("title");
                writeLine("ver");
                writeLine("vol");
                break;
            // I
            case "ipconfig":
                writeLine("No.");
                break;
            // J

            // K

            // L

            // M

            // N
            
            // O

            // P
            case "pause":
                //TODO: pause

                break;
            case "path":
                writeLine("PATH=C:\\Windows\\system32;C:\\Windows");
                break;
            case "prompt":
                //TODO: prompt

                break;
            // Q

            // R
            case "rem":
                //Nothing
                break;
            // S
            case "set":
                writeLine("TMP=C:\WINDOWS\TEMP");
                writeLine("TEMP=C:\WINDOWS\TEMP");
                writeLine("PROMPT=$p$g");
                writeLine("winbootdir=C:\WINDOWS");
                writeLine("PATH=C:\WINDOWS;C:\WINDOWS\COMMAND");
                writeLine("COMSPEC=C:\WINDOWS\COMMAND.COM");
                writeLine("windir=C:\WINDOWS");
                writeLine("CMDLINE=sfc");
                break;
            case "shutdown":
                window.location.href = "../index.html";
                break;
            case "spin":
                document.getElementById("cmd").style.animation = "spin 1s";
                document.getElementById("cmd").style.WebkitAnimation = "spin 1s";
                setTimeout(function() {document.getElementById("cmd").style.animation = "";}, 1000);
                setTimeout(function() {document.getElementById("cmd").style.WebkitAnimation = "";}, 1000);
                break;
            case "migwiz":
                document.getElementById("cmd").style.animation = "spin 1s infinite linear";
                document.getElementById("cmd").style.WebkitAnimation = "spin 1s infinite linear";
                break;
            // T
            case "time":
                var time = new Date();
                var hour = time.getHours();
                var minute = time.getMinutes();
                var second = time.getSeconds();
                var ms = time.getMilliseconds();

                if (hour < 10)
                    hour = "0" + hour;

                if (minute < 10)
                    minute = "0" + minute;

                if (second < 10)
                    second = "0" + second;

                writeLine("The current time is: " + hour + ":" + minute + ":" + second + "." + ms);
                break;
            case "title":
                document.getElementById("title").innerHTML = input;
                break;
            // U

            // V
            case "ver":
                writeLine("");
                writeLine("Windows 98 [Version 4.10.2222]");
                break;
            case "vol":
                writeLine(Console.space + "Volume in drive " + drive + " has no label");
                writeLine(Console.space + "Volume Serial Number is 0EF8-C7C2");
                break;
            // W

            // X

            // Y

            // Z

            // default
            default:
                //writeLine(command + " is not a valid command");
                writeLine("Bad command or filename");
                break;
        }

        writeLine("");
        write(cd);

        document.getElementById("input").innerHTML = "";
    }
}

function printHelp(name)
{
    switch(name)
    {
        case "help":
        writeLine("Displays help!");
        break;
    }
}

//setInterval(cursortoggleblink, 500);

function cursortoggleblink()
{
    if (document.getElementById("cmd") != null)
    {
        if (document.getElementById("cmd").style.visibility == "visible")
        {
            if (document.getElementById("cursor").style.visibility == "hidden")
                document.getElementById("cursor").style.visibility = "visible";
            else
                document.getElementById("cursor").style.visibility = "hidden";
        }
    }
}

function getColor(hex)
{
    hex = hex.toLowerCase();

    switch (hex)
    {
        case "0": return "#000000"; //black
        case "1": return "#000080"; //blue
        case "2": return "#008000"; //green
        case "3": return "#008080"; //aqua
        case "4": return "#FF0000"; //red
        case "5": return "#800080"; //purple
        case "6": return "#808000"; //yellow
        case "7": return "#C0C0C0"; //white
        case "8": return "#808080"; //gray
        case "9": return "#0000FF"; //light blue
        case "a": return "#00FF00"; //light green
        case "b": return "#00FFFF"; //light aqua
        case "c": return "#FF0000"; //light red
        case "d": return "#FF00FF"; //light purple
        case "e": return "#FFFF00"; //light yellow
        case "f": return "#FFFFFF"; //bright white
    }
}