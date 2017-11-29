/**
 * @author DD~!
 */

"use strict";


/**
 * Project properties
 */
var Project = {
    Version: "0.2.0-dev"
}

/**
 * ddtty Settings
 *  Not object dependent
 */

var COMMANDS_HISTORY_SIZE = 100;
var COMMANDS_HISTORY = [];
/* Do not touch section */
var TTY_ID_INDEX = 0;
var nl = '\n';

/**
 * Constructs a new DDTTY
 * parent: id/container_id which the ddtty object will be appended to.
 */
function DDTTY(parent) {
    this.id = TTY_ID_INDEX;
    
    this.parent = parent;
    
    // Increment id index
    TTY_ID_INDEX++;
};

DDTTY.prototype = {
    /* -- "Private" properties -- */
    
    _init: false,
    _Lines: [], // <- span buffer

    _bufferH: [], // <- span buffer
    _bufferW: [], // <- span buffer
    
    _hasFocus: false,
    
    /* -- Object properties -- */
    
    _bgcolor: "#000",
    /**
     * Get or set the background color.
     */
    get BackgroundColor() {
        return this._bgcolor;
    },
    set BackgroundColor(x) {
        this._bgcolor = x;
        /*
        if (this._init)
            document.getElementById(this.id).style.backgroundColor = x;
        */
    },
    
    _bufferheight: 24,
    /**
     * Get or set the height of the buffer.
     */
    get BufferHeight() {
        return this._bufferheight;
    },
    set BufferHeight(x) {
        this._bufferheight = x;
    },
    
    _bufferwidth: 80,
    /**
     * Get or set the width of the buffer.
     */
    get BufferWidth() {
        return this._bufferwidth;
    },
    set BufferWidth(x) {
        this._bufferwidth = x;
    },
    
    _cursor: '\u2588', //Full block
    /**
     * Get or set the character for the cursor.
     */
    get Cursor() {
        return this._cursor;
    },
    set Cursor(x) {
        this._cursor = x[0];
        /*
        if (this._init)
            document.getElementById(this.id + "cursor").innerHTML = x[0];
        */
    },
    
    _cursorleft: 0,
    /**
     * Get or set the cursor left (x axis) position.
     */
    get CursorLeft() {
        return this._cursorleft;
    },
    set CursorLeft(x) {
        this._cursorleft = x;
    },
    
    _cursortop: 0,
    /**
     * Get or set the cursor top (y axis) position.
     */
    get CursorTop() {
        return this._cursortop;
    },
    set CursorTop(x) {
        this._cursortop = x;
    },
    
    _cursorvisible: true,
    /**
     * Get or set the visibility of the cursor.
     */
    get CursorVisible() {
        return this._cursorvisible;
    },
    set CursorVisible(x) {
        this._cursorvisible = x;
    },
    
    _fgcolor: "#FFF",
    /**
     * Get or set the foreground color.
     */
    get ForegroundColor() {
        return this._fgcolor;
    },
    set ForegroundColor(x) {
        this._fgcolor = x;
        /*
        if (this._init)
            document.getElementById(this.id).style.color = x;
        */
    },
    
    _title: "",
    /**
     * Get or set the console/window's title.
     */
    get Title() {
        return this._title;
    },
    set Title(x) {
        this._title = x;
    },
    
    /**
     * Get or set the family font.
     */
    /*
    get Font() {
        return this.Font;
    },
    set Font(x) {
        this.Font = x;
    },
    */
    
    /* -- Object methods -- */
    
    /**
     * Create and place element in HTML DOM.
     */
    Initialize: function() {
        if (!this._init)
        {
            // Create objects for HTML DOM
            var con = document.createElement("pre");
            con.id = this.id;
            con.style.display = "block";
            con.style.width = "660px";
            con.style.height = "320px";
            con.style.overflowY = "scroll";
            con.style.wordWrap = "break-word";
            con.style.color = this.ForegroundColor;
            con.style.backgroundColor = this.BackgroundColor;
            
            // Add events
            var that = this; // that is a reference to this
            con.addEventListener("mouseover", function() {
                that._hasFocus = true;
                });
            con.addEventListener("mouseout", function() {
                that._hasFocus = false;
                });
            con.addEventListener("keydown", function() {
                // Doesn't work
                console.log("Key down for " + that.id);
                });
            
            // Make display buffer
            /*
            for (var row = 0; row < this.BufferWidth; row++)
            {
                for (var col = 0; col < this.BufferHeight; col++)
                {
                    var scrc = document.createElement("span");
                    scrc.id = this.id +
                        (row < 10 ? row + '0' : row) +
                        (col < 10 ? col + '0' : col);
                    scrc.innerHTML = " ";
                    scrc.style.color = this.ForegroundColor;
                    scrc.style.backgroundColor = this.BackgroundColor;
                    con.appendChild(scrc);
                }
                var nlb = document.createElement("br");
                con.appendChild(nlb);
            }
            */
            
            // Add con to HTML DOM
            if (this.parent != null && this.parent != "")
                document.getElementById(this.parent).appendChild(con);
            else
                document.body.appendChild(con);

            this.con = con;
            
            // Make a cursor and add it
            if (this.CursorVisible)
            {
                /*
                var cursor = document.createElement("span");
                cursor.id = this.id + "cursor";
                cursor.innerHTML = this.Cursor;
                con.appendChild(cursor);
                */
                this.con[this.id + "0000"].innerHTML = this.Cursor;
            }
            
            this._init = true;
        }
    },
    
    /**
     * Clear the current display buffer.
     */
    Clear: function () {
        (this._init)
        {
            this.CursorLeft = 0;
            this.CursorRight = 0;
            document.getElementById(this.id).innerHTML = "";
            var cursor = document.createElement("span");
            cursor.id = this.id + "cursor";
            cursor.innerHTML = this.Cursor;
            document.getElementById(this.id).appendChild(cursor);
        }
    },
    
    /**
     * Reads a key and returns its keyCode.
     * intercept: true - Display in console
     */
    ReadKey: function (intercept, event) {
        if (this._hasFocus)
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
            
            if (intercept) this.Write(String.fromCharCode(key));
            
            return key;
        }
    },
     
    /**
     * Reads a line and returns it.
     */
    ReadLine: function () {
        if (this._init)
        {
            
        }
    },
    
    /**
     * Resets the console ForegroundColor and BackgroundColor to default.
     */
    ResetColor: function () {
        this.BackgroundColor = "#000";
        this.ForegroundColor = "#FFF";
    },
    
    /**
     * Set the position of the cursor.
     */
    /*
    SetCursorPosition: function (left, top) {
        this.CursorLeft = left;
        this.CursorTop = top;
    },
    */
    
    /**
     * Write something into the console at the current position.
     */
    Write: function (object) {
        if (this._init && object != null)
        {
            if (object.length > 0)
            {
                // Get console object
                var con = document.getElementById(this.id);
                
                var output = document.createElement("span");
                output.style.color = this.ForegroundColor;
                output.style.backgroundColor = this.BackgroundColor;
                output.innerHTML = object;
                
                if (this.CursorVisible)
                {
                    var cur = con.lastChild;
                    con.removeChild(cur);
                    con.appendChild(output);
                    con.appendChild(cur);
                }
                else
                    con.appendChild(output);
                
                /*
                if (this.CursorLeft + object.length > this.BufferWidth)
                {
                    this.CursorLeft = this.BufferWidth - (this.CursorLeft + object.length);
                    this.CursorTop++;
                }
                else
                    this.CursorLeft += object.length;
                */
                
                // Scroll to bottom
                con.scrollTop = con.scrollHeight;
            }
        }
    },
    
    /**
     * Write something into the console at the current position and add a newline.
     */
    WriteLine: function (object) {
        this.Write(object + nl);
    },
}