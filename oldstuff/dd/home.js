/*
    home.js
*/

setInterval(cursorblink, 500);

var cursorvisible = true;
function cursorblink()
{
if (cursorvisible)
{
document.getElementById("cursor").style.opacity = "0";
cursorvisible = false;
}
else
{
document.getElementById("cursor").style.opacity = "1";
cursorvisible = true;
}
}

function t()
{
document.getElementById("d").innerText = s();
}

function s()
{
var d = new Date();
var time = pad(d.getHours(), 2) + ":" +
pad(d.getMinutes(), 2) + ":" +
pad(d.getSeconds(), 2);
var date = dw(d.getDay()) + ", " +
dm(d.getMonth()) + " " +
d.getDate() + " " +
d.getFullYear();
return time + " ON " + date;
}

/**
 * http://stackoverflow.com/a/10073788
 */
function pad(n, width, z) {
z = z || '0'; n = n + '';
return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function dw(z)
{
switch(z)
{
case 0: return "SUNDAY";
case 1: return "MONDAY";
case 2: return "TUESDAY";
case 3: return "WEDNESDAY";
case 4: return "THURSDAY";
case 5: return "FRIDAY";
case 6: return "SATURDAY";
}
}

function dm(z)
{
switch(z)
{
case 0: return "JANUARY";
case 1: return "FEBRUARY";
case 2: return "MARCH";
case 3: return "APRIL";
case 4: return "MAY";
case 5: return "JUNE";
case 6: return "JULY";
case 7: return "AUGUST";
case 8: return "SEPTEMBER";
case 9: return "OCTOBER";
case 10: return "NOVEMBER";
case 11: return "DECEMBER";
}
}