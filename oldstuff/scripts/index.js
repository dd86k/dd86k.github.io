var _TIMEOUT = 6500;

var news = [];
var i = 0;
var max = 0;
var nl = "\n";
var ni = document.getElementById("ni");

function start()
{
    var req = new XMLHttpRequest();
    
    req.onreadystatechange = function()
    {
        switch (req.readyState)
        {
            case 0:
                document.getElementById("ni").innerHTML = "[    ]";
                break;
            case 1:
                document.getElementById("ni").innerHTML = "[=   ]";
                break;
            case 2:
                document.getElementById("ni").innerHTML = "[==  ]";
                break;
            case 3:
                document.getElementById("ni").innerHTML = "[=== ]";
                break;
            case 4:
                if (req.status == 200)
                {
                    news = req.responseText.split(nl, 20);
                    max = news.length;
                    changeNews();
                    setInterval(changeNews, _TIMEOUT);
                }
                else
                    document.getElementById("ni").innerHTML = "Error, sorry! (Code: " + req.status + ")";
                break;
        }
    }
    
    req.open("GET", "news", true);
    req.send();
}

function changeNews()
{
    if (news[i] === undefined || news[i] == "") i++;
    if (i >= max) i = 0;
    ni.innerHTML = news[i];
    i++;
}

function e(f)
{
    return f.href.replace(/#/g,'');
}