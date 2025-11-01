"use strict";

//
// Settings
//

var LOCAL_SERVER   = location.hostname == "localhost";
var EMOJI_FILENAME = "emoji_17_0_ordering.json";
var FETCH_TIMEOUT  = 5000;
var POPUP_TIMEOUT  = 2000;
var RESULT_LIMIT   = 30;
var RANDOM_COUNT   = 10;

//
// Globals
//

if (!LOCAL_SERVER && location.protocol == "http:")
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

function createResult(unicode, display, name, alternate)
{
    // Has unicode points that makes up the emoji
    var unicodeNode = document.createElement("p");
    unicodeNode.classList.add("emoji");
    unicodeNode.innerText = unicode;
    
    // Display text (U+...)
    var displayNode = document.createElement("p");
    displayNode.innerText = display;
    
    // Shortname(s)
    var shortnameNode = document.createElement("p");
    shortnameNode.innerText = name;
    
    var resultNode = document.createElement("div");
    resultNode.classList.add(alternate ? "alternate" : "result");
    resultNode.onclick = function()
    {
        navigator.clipboard.writeText(unicode);
        
        showPop(unicode, "Copied!");
    }
    resultNode.appendChild(unicodeNode);
    resultNode.appendChild(displayNode);
    resultNode.appendChild(shortnameNode);
    
    return resultNode;
}

function addResult(emoji, alts = false)
{
    // parseInt("1F600",16)
    
    var emojiName = emoji.shortcodes.join(', ').replaceAll(':', '').toLowerCase();
    var emojiString = "";
    var emojiUnicode = "";
    
    for (var i = 0; i < emoji.base.length; ++i)
    {
        if (i > 0)
        {
            emojiUnicode += ", ";
        }
        
        var code = emoji.base[i];
        
        emojiString += String.fromCodePoint(code);
        emojiUnicode += "U+" + code.toString(16).toUpperCase();
    }
    
    results.appendChild( createResult(emojiString, emojiUnicode, emojiName, false) );
    
    if (alts == false)
        return;
    
    // Add alternates, first one is just main one
    for (var i = 1; i < emoji.alternates.length; ++i)
    {
        var alternate = emoji.alternates[i];
        
        emojiString = "";
        emojiUnicode = "";
        for (var u = 0; u < alternate.length; ++u)
        {
            if (u > 0)
            {
                emojiUnicode += ", ";
            }
            
            var code = alternate[u];
            
            emojiString += String.fromCodePoint(code);
            emojiUnicode += "U+" + code.toString(16).toUpperCase();
        }
        
        results.appendChild( createResult(emojiString, emojiUnicode, "", true) );
    }
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
    
    var walt   = input_alts.checked; // wants alternate codes
    
    for (var index_group = 0; index_group < data.length; ++index_group)
    {
        var group = data[index_group];
        
        if (wgroup) // wants groups
            addGroup(group.group);
        
        for (var index_emoji = 0; index_emoji < group.emoji.length; ++index_emoji)
        {
            var emoji = group.emoji[index_emoji];
            
            // ASCII is not exactly an emoji
            if (emoji.base[0] <= 0xff) continue;
            
            addResult(emoji, walt);
        }
    }
    
    stats_results.innerText = totalCount;
}

function showRandom()
{
    clearAll();
    
    var walt = input_alts.checked; // wants alternate codes
    for (var i = 0; i < RANDOM_COUNT; i++)
    {
        // select group
        var groupIndex = Math.floor(Math.random() * data.length);
        var group      = data[groupIndex];
        // select emoji and show
        var emojiIndex = Math.floor(Math.random() * group.emoji.length);
        addResult(group.emoji[emojiIndex], walt);
    }
}

function clearInputs()
{
    input_search.value = '';
    stats_results.innerText = '0';
}

function clearResults()
{
    results.innerHTML = '';
}

function clearAll()
{
    clearResults();
    clearInputs();
}

// Called by #input_search
//
// Search Emoji by name
function searchName(text)
{
    if (text.length == 0)
    {
        clearAll();
        return;
    }
    
    clearResults();
    
    var rg = new RegExp(text, 'i');
    var wgroup = input_group.checked; // wants groups
    var walt   = input_alts.checked; // wants alternate codes
    var gonce  = true; // group once
    
    // NOTE: Array.forEach sucks
    var toomany = false;
    var resultCount = 0;
    Lmain: for (var index_group = 0; index_group < data.length; ++index_group)
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
                
                if (rg.test(shortcode) == false)
                    continue;
                
                if (wgroup && gonce)
                    addGroup(group.group);
                
                gonce = false;
                addResult(emoji, walt);
                // NOTE: Exclude emoji.alternates.length
                //       because to Google, they are not a "main" Emoji
                resultCount++;
                
                if (resultCount >= RESULT_LIMIT)
                {
                    toomany = true;
                    break Lmain;
                }
            }
        }
        
        gonce = true;
    }
    
    stats_results.innerText = resultCount + (toomany ? "+" : "");
}

function toggleInputGroup()
{
    searchName(input_search.value);
}

function toggleInputAlts()
{
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
    }, POPUP_TIMEOUT);
}

// Load Emoji list
try
{
    var x = new XMLHttpRequest();
    x.timeout = FETCH_TIMEOUT;
    x.ontimeout = function()
    {
        var text = "Timed out attempting to fetch Emoji list";
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
            var text = "Failed to load Emoji list: HTTP " + this.status;
            console.error(text);
            showError(text);
            return;
        }
        
        try
        {
            data = JSON.parse(x.responseText);
            console.info("Loaded " + data.length + " groups");
            
            data.forEach(function (group) { totalCount += group.emoji.length; });
            
            stats_loaded.innerText = totalCount;
        }
        catch (ex)
        {
            var text = "Could not process Emoji list. " + ex;
            console.error(text);
            showError(text);
        }
    }
    x.open("GET", EMOJI_FILENAME, true);
    x.overrideMimeType("application/json");
    x.send();
}
catch (ex)
{
    var text = "Could not get Emoji list. " + ex;
    console.error(text);
    showError(text);
}