var currentMessages = 0;

var lastColour = "#fefefe";
function SetMessageColour(colour) {
    lastColour = gameconsole.style.color;
    gameconsole.style.color = colour;
}
function ResetMessageColour(colour) {
    gameconsole.style.color = lastColour;
}
function DefaultMessageColour() {
    SetMessageColour("#fefefe");
}
DefaultMessageColour();


function Say(message, id) {
    var promise, ms;
    ms = Math.max(1500,message.length*50);

    gameconsole.style.display = 'inline-block';
    gameconsole.innerHTML = message;
    currentMessages++;
    promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
           currentMessages--;
            if(currentMessages==0) {
                gameconsole.style.display = 'none';
                gameconsole.innerHTML = '';
            }
            resolve('timeout done');
        }, ms);
    });
    return promise;
}


var currentHotspots = 0;
function HotspotSay(room, hotspot, message) {
    var promise, ms;
    ms = Math.max(1500,message.length*50);
    var hs = globals.rooms[room].hotspots[hotspot];
    var x = parseFloat(hs.x) + parseFloat(hs.width)/2;
    var y = parseFloat(hs.y) + parseFloat(hs.height)/2;
    hover.style.left = x + "%";
    hover.style.top = y + "%";
    hover.style.display = 'block';
    hover.innerHTML = message;
    if(currentHotspots==0) gamescreen.className += " hoversay";
    currentHotspots++;
    promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            currentHotspots--;
            if(currentHotspots==0) {
                hover.style.display = 'none';
                hover.innerHTML = '';
                gamescreen.className = gamescreen.className.replace(" hoversay", "");
            }
            resolve('timeout done');
        }, ms);
    });
    return promise;
}