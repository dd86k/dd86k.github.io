"use strict";

onload = s;

var n, l;

function s()
{
    var h = document.getElementById("t");
    var str = "dd86k";
    l = str.length;
    for (var i = 0; i < l; ++i) { // http://stackoverflow.com/a/5365036
        var s = document.createElement("span");
        s.style.color = '#' + (Math.random() * (0xFFFFFF) << 0).toString(16);
        s.innerHTML = str[i];
        h.appendChild(s);
    }
    n = h.children;
    setInterval(cl, 1000);
}

function cl()
{
    var c = n[l - 1].style.color;
    for (var i = l - 2; i >= 0; --i)
        n[i + 1].style.color = n[i].style.color;
    n[0].style.color = c;
}

function e(f)
{
    return f.href.replace(/#/g,'');
}