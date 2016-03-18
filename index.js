function cl()
{
    var s1 = document.getElementById("s1");
    var s2 = document.getElementById("s2");
    var s3 = document.getElementById("s3");
    var s4 = document.getElementById("s4");
    
    var c = s1.style.color.toString();
    s1.style.color = s4.style.color.toString();
    s4.style.color = s3.style.color.toString();
    s3.style.color = s2.style.color.toString();
    s2.style.color = c;
}

setInterval(cl, 500);

function e(f)
{
    return f.href.replace(/#/g,'');
}