// uncomment this line to delete all local storage data
//localStorage.clear();

// josheco clicker
// ---------------
// initialize variables n stuff
var lines = 1000;
var linesPerClick = 1;
var linesPerSecond = 0;
var linesMultiplier = 1;
var username;
var shop_time = {
    "trackpad" : {"cost" : 15, "amount" : 0, "base_boost" : 0.1, "multiplier" : 1},
    "mouse" : {"cost" : 100, "amount" : 0, "base_boost" : 1, "multiplier" : 1},
}

var shop_clicks = {
    "improved trackpad": {"cost": 100, "amount": 0, "base_boost": 1, "multiplier": 1},
}
// initialize keys
var keys = ["lines", "linesPerClick", "linesPerSecond", "linesMultiplier", "username"];


function checkLocalStorageItem(itemKey) {
    return localStorage.getItem(itemKey) !== null;
}
function updateId(id, value) {
    document.getElementById(id).innerHTML = value;
}

// if it exists, read all the stuff
// else, initialize them
if (checkLocalStorageItem("lines")) {
    lines = parseInt(localStorage.getItem("lines"));
    linesPerClick = parseInt(localStorage.getItem("linesPerClick"));
    linesPerSecond = parseInt(localStorage.getItem("linesPerSecond"));
    linesMultiplier = parseInt(localStorage.getItem("linesMultiplier"));
    username = localStorage.getItem("username");
    shop_time = JSON.parse(localStorage.getItem("shop_time"));
    shop_clicks = JSON.parse(localStorage.getItem("shop_clicks"));
    
} else {
    username = prompt("Enter username?");
    localStorage.setItem("username", username);
    localStorage.setItem("lines", lines);
    localStorage.setItem("linesPerClick", linesPerClick);
    localStorage.setItem("linesPerSecond", linesPerSecond);
    localStorage.setItem("linesMultiplier", linesMultiplier);
    localStorage.setItem("shop_time", JSON.stringify(shop_time));
    localStorage.setItem("shop_clicks", JSON.stringify(shop_clicks));
}

setInterval(() => updatePerSecond(), 1000);
function clicked() {
    lines += linesPerClick;
    //console.log(`Button has been clicked, you have ${lines} lines`);
    updateCounters();
}
function updateStorage() {
    localStorage.setItem("lines", lines);
    localStorage.setItem("linesPerClick", linesPerClick);
    localStorage.setItem("linesPerSecond", linesPerSecond);
    localStorage.setItem("linesMultiplier", linesMultiplier);
    localStorage.setItem("shop_time", JSON.stringify(shop_time));
    localStorage.setItem("shop_clicks", JSON.stringify(shop_clicks));
}
function updatePerSecond() {
    lines += linesPerSecond;
    updateStorage();
    updateCounters();
}
function updateCounters(item = "all") {
    // update the counters on the screen
    // update trackpads
    switch (item){
        // per second items
        case "all":
            console.log("idk")
        case "trackpad":
            updateId('trackpadAmount', shop_time["trackpad"]["amount"]);
            updateId('trackpadCost', Math.trunc(shop_time["trackpad"]["cost"]));
            if (item == "trackpad") {
                break
            }
        case "mouse":
            updateId('mouseAmount', shop_time["mouse"]["amount"]);
            updateId('mouseCost', Math.trunc(shop_time["mouse"]["cost"]));
            if (item == "mouse") {
                break
            }
        // clicks/upgrades items
        case "improved trackpad":
            updateId('improvedTrackpadAmount', shop_clicks["improved trackpad"]["amount"]);
            updateId('improvedTrackpadCost', Math.trunc(shop_clicks["improved trackpad"]["cost"]));
            if (item == "improved trackpad") {
                break
            }
        
    
    }
    updateId('clickAmount', `You have ${Math.round(lines * 10) / 10} lines of code`);
}
function buylinesPerClick(item) {
    if (lines >= shop_clicks[item]["cost"]) {
        console.log(`Bought item ${item}`)
        lines -= shop_clicks[item]["cost"];
        shop_clicks[item]["amount"] += 1;
        shop_clicks[item]["cost"] = Math.round(shop_clicks[item]["cost"] * 1.15);
        linesPerClick += shop_clicks[item]["base_boost"] * shop_clicks[item]["multiplier"];
        updateStorage();
        updateCounters(item);
    } else {
        console.log("Not enough lines");
    }
}

function buylinesPerSecond(item) {
    if (lines >= shop_time[item]["cost"]) {
        console.log(`Bought item ${item}`)
        lines -= shop_time[item]["cost"];
        shop_time[item]["amount"] += 1;
        shop_time[item]["cost"] = Math.round(shop_time[item]["cost"] * 1.15);
        linesPerSecond += shop_time[item]["base_boost"] * shop_time[item]["multiplier"];
        updateStorage();
        updateCounters(item);
    } else {
        console.log("Not enough lines");
    }
}