"use strict";

//
// Settings
//
                // remote ? remote_prefix : local_prefix
var url_prefix   = location.hostname ? "" : "http://localhost:8080/";
var url          = url_prefix + "meta.json";
var meta_timeout = 5000;
var search_limit = 20;
var pop_timeout  = 2000;

//
// Globals
//

// Example: data[0].emoji[0].shortcodes[0] -> ":smile:"
var data;

//
// Functions
//

function addResult(emoji)
{
    // parseInt("1F600",16)
    
    var emojiName = emoji.shortcodes.join(', ').replaceAll(':', '').toLowerCase();
    var emojiString = "";
    var emojiUnicode = "";
    
    for (var i = 0; i < emoji.base.length; ++i)
    {
        var code = emoji.base[i];
        
        emojiString += String.fromCodePoint(code);
        emojiUnicode += "U+" + code.toString(16).toUpperCase();
        
        if (i + 1 < emoji.base.length)
        {
            emojiUnicode += ", ";
        }
    }
    
    var emojiNode = document.createElement("p");
    emojiNode.classList.add("emoji");
    emojiNode.innerText = emojiString;
    var unicodeNode = document.createElement("p");
    unicodeNode.innerText = emojiUnicode;
    var nameNode = document.createElement("p");
    nameNode.innerText = emojiName;
    
    var mainNode = document.createElement("div");
    mainNode.classList.add("result");
    mainNode.onclick = function()
    {
        navigator.clipboard.writeText(emojiString);
        
        showPop(emojiString, "Copied!");
    }
    mainNode.appendChild(emojiNode);
    mainNode.appendChild(unicodeNode);
    mainNode.appendChild(nameNode);
    
    results.appendChild(mainNode);
}

function clearInputs()
{
    input_search.value = '';
    stats_results.innerText = '0';
}

function clearResults()
{
    document.getElementById("results").innerHTML = '';
}

function clearAll()
{
    clearResults();
    clearInputs();
}

function searchName(text)
{
    clearResults();
    
    if (text.length <= 1)
    {
        return;
    }
    
    var rg = new RegExp(text, 'i');
    
    //TODO: Should it be better to make a list of emoji items first?
    // NOTE: Array.forEach sucks
    var resultCount = 0;
    for (var index_group = 0; index_group < data.length; ++index_group)
    {
        var group = data[index_group];
        
        for (var index_emoji = 0; index_emoji < group.emoji.length; ++index_emoji)
        {
            var emoji = group.emoji[index_emoji];
            
            // ASCII is not exactly an emoji
            if (emoji.base[0] <= 0xff) continue;
            
            for (var short_index = 0; short_index < emoji.shortcodes.length; ++short_index)
            {
                var shortcode = emoji.shortcodes[short_index];
                
                //if (shortcode.includes(text))
                if (rg.test(shortcode))
                {
                    addResult(emoji);
                    ++resultCount;
                }
            }
        }
    }
    
    stats_results.innerText = resultCount;
}

function searchCode(text)
{
    
}

function showError(text)
{
    errortag.style.display = "block";
    errortag.innerText = text;
}

function showPop(upper, lower)
{
    pop_high.innerText = upper;
    pop_low.innerText = lower;
    pop.style.display = "block";
    
    setTimeout(function()
    {
        pop.style.display = "none";
    }, pop_timeout);
}

var x = new XMLHttpRequest();
x.timeout = meta_timeout;
x.ontimeout = function()
{
    console.error("Timed out");
}
x.onreadystatechange = function()
{
    // NOTE: readyState==2 has HTTP code ready
    if (this.readyState < 4)
        return;
    
    if (this.status >= 400)
    {
        console.error("HTTP error code " + this.status);
        return;
    }
    
    try
    {
        //document.getElementById("test").innerText = x.responseText;
        data = JSON.parse(x.responseText);
        console.info("Loaded " + data.length + " groups");
        
        var count = 0;
        data.forEach(function (group) { count += group.emoji.length; });
        
        stats_loaded.innerText = count;
    }
    catch (ex)
    {
        console.error("Could not process text");
    }
}
x.open("GET", url, true);
x.overrideMimeType("application/json");
x.send();