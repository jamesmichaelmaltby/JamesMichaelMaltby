var currentMessages = 0;

var lastColour = "#fefefe";
function SetMessageColour(colour) {
    lastColour = gameconsole.style.color;
    gameconsole.style.color = colour;
}
async function ResetMessageColour(colour) {
    await WaitMiliseconds(250);
    gameconsole.style.color = lastColour;
}
async function DefaultMessageColour() {
    await WaitMiliseconds(250);
    SetMessageColour("#fefefe");
}

function Say(message) {
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
    if(message === undefined) {
        message = hotspot;
        hotspot = room;
        room = globals.currentRoom;
    }
    var promise, ms;
    ms = Math.max(1500,message.length*50);
    
    var hs = document.getElementById(hotspot);
    var bounds = hs.getBoundingClientRect();
    var x = parseFloat(bounds.x) - main.offsetLeft + parseFloat(bounds.width)/2;
    var y = parseFloat(bounds.y) - main.offsetTop + parseFloat(bounds.height)/3;
    console.log(bounds);

    hover.style.left = x + "px";
    hover.style.top = y + "px";
    hover.style.display = 'block';
    hover.innerHTML = message;

    if(globals.rooms[room].hotspots[hotspot].messageColour) {
        hover.style.color = globals.rooms[room].hotspots[hotspot].messageColour;
    }
    if(currentHotspots==0) gamescreen.className += " hoversay";
    currentHotspots++;
    promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            currentHotspots--;
            if(currentHotspots==0) {
                hover.style.display = 'none';
                hover.innerHTML = '';
                hover.style.color = null;
                gamescreen.className = gamescreen.className.replace(" hoversay", "");
            }
            resolve('timeout done');
        }, ms);
    });
    return promise;
}