/**
 * Wrote by DD~!
 */

"use strict";

window.onload = function () { start(_START); };

// Settings
var _START = 1;
var _PAGE = 1;
var _OFFSET = 5;

function start(startingIndex)
{
    document.getElementById("blogitems").innerHTML = "";
    
    for (var i = startingIndex; i < startingIndex + _OFFSET; i++)
    {
        sendReq(i);
    }
}

function sendReq(page)
{
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'blog/pages/' + page + '.html', true);
    //xhr.setRequestHeader("Content-Type", "text/xml");
    xhr.overrideMimeType('text/xml');
    
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status === 200)
        {
            var el = document.createElement("li");
            el.innerHTML = page + ". ";
            var a = document.createElement("a");
            a.href = "blog/pages/" + page + ".html";
            a.innerHTML = xhr.responseXML.getElementById("title").innerHTML;
            el.appendChild(a);
            document.getElementById("blogitems").appendChild(el);
        }
    };
    
    xhr.send();
}

function nextPage()
{
    start(_START += _OFFSET);
    document.getElementById("page").innerHTML = ++_PAGE;
}

function previousPage()
{
    if (_START - _OFFSET > 0)
    {
        start(_START -= _OFFSET);
        document.getElementById("page").innerHTML = --_PAGE;
    }
}