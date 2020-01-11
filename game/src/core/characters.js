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

function Say(character, text) {
    if(text===undefined) {
        text = character;
        character = 'ego';
    }
    var promise, ms;
    ms = Math.max(1500,text.length*50);

    var message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = text;

    if(character == 'ego') {
        message.style.left = '50%';
        message.style.top = '20%';
        message.style.color= '#fefefe';
    } else {
        message.style.left = '50%';
        message.style.top = '14%';
        message.style.color = character;
    }
    roomarea.appendChild(message);

    promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            roomarea.removeChild(message);
            resolve('timeout done');
        }, ms);
    });
    return promise;
}

function HotspotSay(hotspot, text, override_ms) {
    var room = globals.currentRoom;
    var promise, ms;
    ms = Math.max(1500,text.length*50);
    if(override_ms) ms = override_ms;
    
    var hs = document.getElementById(hotspot);
    var bounds = hs.getBoundingClientRect();
    var x = parseFloat(bounds.x) - main.offsetLeft + parseFloat(bounds.width)/2;
    var y = parseFloat(bounds.y) - main.offsetTop + parseFloat(bounds.height)/3;
  
    var message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = text;
    message.style.left = x + "px";
    message.style.top = y + "px";
    roomarea.appendChild(message);

    if(globals.rooms[room].hotspots[hotspot].messageColour) {
        message.style.color = globals.rooms[room].hotspots[hotspot].messageColour;
    }
    promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            roomarea.removeChild(message);
            resolve('timeout done');
        }, ms);
    });
    return promise;
}