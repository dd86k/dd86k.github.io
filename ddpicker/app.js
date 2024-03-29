"use strict";

//
// Settings
//

var islocal      = location.hostname == "localhost";
var url_prefix   = islocal ? "http://localhost:8080/" : "";
var url          = url_prefix + "emoji_15_0_ordering.json";
var meta_timeout = 5000;
var pop_timeout  = 2000;

//
// Globals
//

if (!islocal && location.protocol == "http:")
{
    showWarning("Copying an Emoji won't work in HTTP, reload page in HTTPS.",
        "Reload",
        function() { location.href = "https://" + location.hostname + location.pathname });
}

// Example: data[0].emoji[0].shortcodes[0] -> ":smile:"
var data;
var totalCount = 0;

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

function addGroup(text)
{
    var groupNode = document.createElement("div");
    groupNode.classList.add("group");
    groupNode.innerText = text;
    
    results.appendChild(groupNode);
}

function showAll(wgroup)
{
    clearAll();
    
    for (var index_group = 0; index_group < data.length; ++index_group)
    {
        var group = data[index_group];
        
        if (wgroup)
            addGroup(group.group);
        
        for (var index_emoji = 0; index_emoji < group.emoji.length; ++index_emoji)
        {
            var emoji = group.emoji[index_emoji];
            
            // ASCII is not exactly an emoji
            if (emoji.base[0] <= 0xff) continue;
            
            addResult(emoji);
        }
    }
    
    stats_results.innerText = totalCount;
}

function showRandom()
{
    clearAll();
    
    var groupIndex = Math.floor(Math.random() * data.length);
    var group = data[groupIndex];
    var emojiIndex = Math.floor(Math.random() * group.emoji.length);
    addResult(group.emoji[emojiIndex]);
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
        return;
    
    var rg = new RegExp(text, 'i');
    var wgroup = input_group.checked;
    var gonce  = true;
    
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
                
                if (rg.test(shortcode))
                {
                    if (wgroup && gonce)
                        addGroup(group.group);
                    
                    gonce = false;
                    addResult(emoji);
                    ++resultCount;
                }
            }
        }
        
        gonce = true;
    }
    
    stats_results.innerText = resultCount;
}

function toggleInputGroup()
{
    //TODO: Return/reuse results
    searchName(input_search.value);
}

function showMessage(type, text, btext, bfunc)
{
    var div = document.createElement("div");
    div.classList.add(type);
    
    var span = document.createElement("span");
    span.innerText = type.toUpperCase() + ": " + text + " ";
    
    div.appendChild(span);
    
    if (btext)
    {
        var button = document.createElement("button");
        
        button.classList.add("show-button");
        button.innerText = btext;
        button.onclick = bfunc;
        
        div.appendChild(button);
    }
    
    messages.appendChild(div);
}

function showError(text, btext, bfunc)
{
    showMessage("error", text, btext, bfunc);
}

function showWarning(text, btext, bfunc)
{
    showMessage("warning", text, btext, bfunc);
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
    var text = "Time out attempting to fetch meta.json";
    console.error(text);
    showError(text);
}
x.onreadystatechange = function()
{
    // NOTE: readyState==2 has HTTP code ready
    if (this.readyState < 4)
        return;
    
    if (this.status >= 400)
    {
        var text = "Failed to load meta.json: HTTP " + this.status;
        console.error(text);
        showError(text);
        return;
    }
    
    try
    {
        //document.getElementById("test").innerText = x.responseText;
        data = JSON.parse(x.responseText);
        console.info("Loaded " + data.length + " groups");
        
        data.forEach(function (group) { totalCount += group.emoji.length; });
        
        stats_loaded.innerText = totalCount;
    }
    catch (ex)
    {
        var text = "Could not process text. " + ex;
        console.error(text);
        showError(text);
    }
}
x.open("GET", url, true);
x.overrideMimeType("application/json");
x.send();