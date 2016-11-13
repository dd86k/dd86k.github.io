"use strict";

/**
 * win98dwm.js, Forms and Window Manager.
 * @author guitarxhero
 */

/**
 * Form object.
 * @param {string} title Title.
 */
function form(title) {
        var windowid = indexWindow;

        // Form frame
        var obj = this.divObject = // Reference
            document.createElement("div");

        //divwindow.id = "form" + windowid;
        obj.className = "window";
        obj.style.position = "absolute";
        obj.style.visibility = "visible";
        obj.style.left = "100px";
        obj.style.top = "100px";
        obj.style.minWidth = "150px";
        obj.style.minHeight = "50px";
        obj.style.zIndex = WindowzIndex++;
        obj.addEventListener("mousedown", function () {
            WindowManager.giveFocus(obj);
        });
    
        // Titlebar
        var divtitle = document.createElement("div");
        //divtitle.id = "title" + indexWindow;
        divtitle.className = "title";
        divtitle.onmousedown = function (event) {
            WindowManager.Drag.startMoving(obj, desktop, event);
        };
        divtitle.onmouseup = function () {
            WindowManager.Drag.stopMoving();
        };
    
        // Titlebar icon
        var divtitleicon = document.createElement("img");
        divtitleicon.src = "images/window/titleleft.png";

        // Icon
        divtitleicon.className = "windowicon";

        // Text
        var divtitletext = document.createElement("span");
        divtitletext.innerText = title;
        divtitletext.style.fontWeight = "bolder";

        // Minimize
        var divmin = document.createElement("img");
        divmin.className = "ctrlboxbuttonm";
        divmin.src = "images/window/min.png";
        divmin.onmousedown = function () {
            divmin.src = "images/window/minp.png";
        };
        /*divmin.onmouseup = function () {
            divmin.src = "images/window/minp.png";
            WindowManager.hideWindow(obj);
        };*/

        // Maximize
        var divmax = document.createElement("img");
        divmax.className = "ctrlboxbutton";
        divmax.src = "images/window/max.png";
        /*divmax.onmouseup = function () {
            WindowAPI.maximizeWindow(divwindow);
        };*/

        // Close
        var divclose = document.createElement("img");
        divclose.className = "ctrlboxbutton";
        divclose.src = "images/window/close.png";
        divclose.onclick = function () {
            WindowManager.deleteWindow(obj);
        };
        divclose.onmousedown = function () {
            divclose.src = "images/window/closep.png";
        };

        divtitle.appendChild(divtitleicon);
        divtitle.appendChild(divtitletext);
        divtitle.appendChild(divclose);
        divtitle.appendChild(divmax);
        divtitle.appendChild(divmin);

        obj.appendChild(divtitle);
    
        // Form client area
        var divwindowarea = document.createElement("div");
        divwindowarea.className = "windowarea";
        obj.appendChild(divwindowarea);
}

form.prototype = {
    divObject: null, // Maybe rename to "window"?

    /*setTitle: function (title) {
        this.divObject.childNodes[0].childNodes[ 0 or 1 ..
    },*/
    
    setSize: function (w, h) {
        this.divObject.style.width = w + "px";
        this.divObject.style.height = h + "px";
    },

    setIcon: function (path) {
        //TODO: Checking for tag first.
        this.divObject.childNodes[0].childNodes[0].src = path;
    },
    removeIcon: function () {
        this.divObject.childNodes[0].childNodes[0].remove();
    },

    setLocation: function (x, y) {
        this.divObject.style.left = x + "px";
        this.divObject.style.top = y + "px";
    },

    addNode: function (node) {
        // After titlebar
        this.divObject.childNodes[1].appendChild(node);
    },

    close: function() {
        this.divObject.remove();
    }
}

/*
 * Window Manager.
 */

var indexWindow = 0, WindowzIndex = 0, currentFocusWindow = 0;

var WindowManager = {
    showInfo: function(title, msg) {
        var f = new form(title);
        f.removeIcon();
        this.makeMsgBox(f, msg, 0);
        this.addFormToDesktop(f);
    },

    showWarning: function(title, msg) {
        var f = new form(title);
        f.removeIcon();
        this.makeMsgBox(f, msg, 1);
        this.addFormToDesktop(f);
    },

    showError: function(title, msg) {
        var f = new form(title);
        f.removeIcon();
        this.makeMsgBox(f, msg, 2);
        this.addFormToDesktop(f);
    },

    /**
     * Makes the msgbox, internal use only.
     * @param {Object} f Form, passed by reference.
     * @param {string} msg Message.
     * @param {number} type MsgBox Type.
     */
    makeMsgBox: function(f, msg, type) {
        var divmsg = document.createElement("p");
        divmsg.className = "msgboxMsg";

        var divmsgtext = document.createTextNode(msg);
        divmsg.appendChild(divmsgtext);
    
        var divmsgicon = document.createElement("img");
        divmsgicon.className = "msgboxIcon";

        switch (type) {
            case 0:
                divmsgicon.src = "images/msgbox/infoicon.png";
                break;
            case 1:
                divmsgicon.src = "images/msgbox/warningicon.png";
                break;
            case 2:
                divmsgicon.src = "images/msgbox/erroricon.png";
                break;
        }
    
        var divbutton = WindowManager.makeButton("OK", 0, 0);
        divbutton.addEventListener("click", function () {
            WindowManager.deleteWindow(f.divObject);
        });

        var divbuttoncontainer = document.createElement("div");
        divbuttoncontainer.style.margin = "12px 0 8px 0";
        divbuttoncontainer.style.width = "100%";
        divbuttoncontainer.style.textAlign = "center";

        divbuttoncontainer.appendChild(divbutton);

        f.addNode(divmsgicon);
        f.addNode(divmsg);
        f.addNode(divbuttoncontainer);
    },

    // For compability.
    createWindow: function(title, x, y, type) {
        var f = new form(title);

        f.setLocation(x, y);
        
        switch (type)
        {
            case "rundialog":
                f.removeIcon();

                var body = document.createElement("div");
                body.style.display = "inline-flex";
                var subbody = document.createElement("div");

                var img = document.createElement("img");
                img.src = "images/run/item.png";
                img.style.margin = "14px";
                //img.style.cssFloat = "left";

                var desc = document.createElement("p");
                desc.innerText = "Type the name of a program, folder, \
document, or Internet resource, and Windows will open it for you.";
                desc.style.fontSize = "11px";
                desc.style.maxWidth = "300px";

                var open = document.createElement("p");
                open.innerText = "Open:";
                open.style.margin = "4px 10px 12px 14px";
                open.style.display = "inline-block";

                var input = document.createElement("textarea");
                input.onkeydown = function (e) {
                    if (e.which == 13) {
                        f.close();
                        Shell.run(input.value);
                    }
                };
                input.rows = 1;
                input.style.marginBottom = "-7px";
                input.style.resize = "none";
                input.style.width = "80%";
                input.onload = function () { input.select(); };

                var buttons = document.createElement("div");
                buttons.style.width = "98%";
                buttons.style.textAlign = "right";
                buttons.style.margin = "8px 0 14px 0px";

                var okbut = WindowManager.makeButton("OK",0,0);
                okbut.style.marginRight = "6px";
                okbut.addEventListener("click", function() {
                    f.close();
                    Shell.run(input.value);
                });
                var canbut = WindowManager.makeButton("Cancel",0,0);
                canbut.style.marginRight = "6px";
                canbut.addEventListener("click", function() {
                    f.close();
                });
                var brobut = WindowManager.makeButton("Browse...",0,0);

                body.appendChild(img);
                body.appendChild(desc);
                subbody.appendChild(open);
                subbody.appendChild(input);
                buttons.appendChild(okbut);
                buttons.appendChild(canbut);
                buttons.appendChild(brobut);

                f.addNode(body);
                f.addNode(subbody);
                f.addNode(buttons);
                break;
            case "notepad":
                f.setIcon("images/notepad/titleleft.png");
                //divwindow.className = "window";
            
                var divmenu = document.createElement("div");
                divmenu.className = "menubar";

                var divtmp = document.createElement("img");
                divtmp.src = "images/notepad/menu.png";
            
                var divinput = document.createElement("textarea");
                divinput.className = "notepadinput";
                divinput.style.width = "200px";
                divinput.style.height = "125px";
            
                divmenu.appendChild(divtmp);
                f.addNode(divmenu);
                f.addNode(divinput);
                break;
            case "cmd":
                f.setIcon("images/cmd/titleleft.png");
            
                var divcmdmenu = document.createElement("img");
                divcmdmenu.src = "images/cmd/menu.png";
                divcmdmenu.style.marginTop = "2px";
            
                //TODO: Make a function from win98con.js to make
                //      a console window instead. (Alloc)
                var divcmd = document.createElement("div");
                divcmd.className = "terminal";
                divcmd.style.height = "250px";
            
                f.addNode(divcmdmenu);
                f.addNode(divcmd);
                break;
            case "test":
                var testbutton = WindowManager.makeButton("Test me!", 0, 0);
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
                
                f.addNode(radcon0);
                f.addNode(radcon1);
                f.addNode(testbutton);
                break;
            case "aboutdialog":
                f.divObject.style.width = "400px";
            
                var dnl = "<br/><br/>";

                var lblAbout = document.createElement("p");
                lblAbout.innerHTML = Project.productName + "<br/>\
                Version " + Project.version + dnl +
                "A web-based Windows 98 simulator. Made from scratch using \
only HTML5, CSS3, and Javascript. No libraries." + dnl +
                "This is only a personal project, I do not plan to \
monitize it." + dnl +
                "Copyright Microsoft (C) 1981-1998 for Windows 98" + dnl +
                "Everything written by DD~!<br/>You can contact me via \
<a href=\"mailto:devddstuff@gmail.com\">email</a>.";
                lblAbout.style.textAlign = "center";

                var bottomlayout = document.createElement("div");
                bottomlayout.style.width = "100%";
                bottomlayout.style.textAlign = "center";
                
                var btnOK = WindowManager.makeButton("Close", 0, 0);
                btnOK.onclick = function() { f.close(); };
                
                var btnSpin = WindowManager.makeButton("Spin!", 0, 0);
                btnSpin.onclick = function()
                { 
                    f.divObject.style.animation = "spin 1s";
                    f.divObject.style.WebkitAnimation = "spin 1s";
                    setTimeout(function()
                    {
                        f.divObject.style.animation = "";
                        f.divObject.style.WebkitAnimation = "";
                    }, 1000);
                };
                
                var btnSpinForever = WindowManager.makeButton("Spin for ever!", 125, 0);
                btnSpinForever.onclick = function()
                { 
                    f.divObject.style.animation = "spin 2s infinite linear";
                    f.divObject.style.WebkitAnimation = "spin 2s infinite linear";
                };
                
                btnOK.style.marginLeft = 
                    btnSpin.style.marginLeft = 
                    btnSpinForever.style.marginLeft = "18px";
                
                bottomlayout.appendChild(btnOK);
                bottomlayout.appendChild(btnSpin);
                bottomlayout.appendChild(btnSpinForever);
                f.addNode(lblAbout);
                f.addNode(bottomlayout);
                break;
            default:
                break;
        }

        this.addFormToDesktop(f);
    },
    addFormToDesktop: function(form) {
        // Taskbar button .. In Form ctor instead?
        //WindowAPI.addTaskbar();
        desktop.appendChild(form.divObject);
        WindowManager.giveFocus(form.divObject);
        StartMenu.hide();
        ++indexWindow;
    },
    /*
    addTaskbarButton: function(form)
    { //TODO
        var divTaskbarButton
        
        taskbar.appendChild();
    },
    */
    hasIcon: function(type)
    {
        switch (type)
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

    makeButton: function(text, width, height)
    {
        width = width <= 0 ? 70 : width;
        height = height <= 0 ? 22 : height;
    
        var divbutton = document.createElement("div");
        divbutton.className = "button";
        divbutton.style.width = width + "px";
        divbutton.style.height = height + "px";
        divbutton.onmousedown = function () {
            divbutton.className = "buttondown";
        };
        divbutton.onmouseup = function () {
            divbutton.className = "button";
        };
    
        var divtext = document.createElement("div");
        divtext.style.marginTop = "3px";
        divtext.style.marginLeft = "3px";
        divtext.style.textAlign = "center";
        divtext.style.width = width - 8 + "px";
        divtext.style.border = "1px dotted black";

        var text = document.createTextNode(text);
    
        divtext.appendChild(text);
        divbutton.appendChild(divtext);
    
        return divbutton;
    },

    deleteWindow: function(div)
    {
        div.remove();
    },

    showWindow: function(div)
    {
        div.style.visibility = "visible";
    
        StartMenu.hide();
    },

    hideWindow: function(id)
    {
        id.style.visibility = "hidden";
    
        StartMenu.hide();
    },

    giveFocus: function(div)
    {
        this.removeFocusAll();
        div.style.zIndex = WindowzIndex;

        div.childNodes[0].className = "title";

        WindowzIndex++;
        currentFocusWindow = div;
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

    hasWindowFocus: function(div)
    {
        return currentFocusWindow == div;
    },

    // Mofified function from niente00, StackOverflow
    Drag:
    {
        move: function (divid, x, y)
        {
            divid.style.left = x + 'px';
            divid.style.top = y + 'px';
        },

        startMoving: function (div, c, e)
        {
            var posX = e.clientX, posY = e.clientY,
                divTop = div.style.top, divLeft = div.style.left,
                eWi = parseInt(div.style.width),
                eHe = parseInt(div.style.height),
                cWi = parseInt(c.style.width),
                cHe = parseInt(c.style.height);
            divTop = divTop.replace('px', '');
            divLeft = divLeft.replace('px', '');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function (me)
            {
                var posX = me.clientX,
                    posY = me.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                /*if (aX < 0) aX = 0;
                if (aY < 0) aY = 0;
                if (aX + eWi > cWi) aX = cWi - eWi;
                if (aY + eHe > cHe) aY = cHe - eHe;*/
                // Absolute reference.
                WindowManager.Drag.move(div, aX, aY);
            };
        },

        stopMoving: function ()
        {
            document.onmousemove = function () {};
        }
    }
};