

function Hotspot(name,values) {
    room = LastCreatedRoom;
    var defaults = {
        description:'Untitled Hotspot',
        active:true,
        invisible:false,
        flag:false,
        i:0,
        on:false,
        svg:name,
        name:name,
        id:name
    };
    globals.rooms[room].hotspots[name] = Object.assign(defaults,values);
    return rooms[room].hotspots[name] = {};
}

var overHotspot = '';
function HoverHotspot(x,y) {
    var hover = document.getElementById('hover');
    if(hover==null) {
        hover = document.createElement('div');
        hover.id = 'hover';
        hover.className = 'hover gpu';
        roomarea.appendChild(hover);
    }

    hover.style.display = 'block';
    hover.style.left = x + "px";
    hover.style.top = y + "px";
    hover.innerHTML = overHotspot;
}

function HoverHotspotRemove() {
    var hover = document.getElementById('hover');
    if( hover == null ) return;
    hover.style.display = 'none';
    hover.innerHTML = '';
    overHotspot = null;
}

function HoverHotspotSetText(text) {
    overHotspot = text;
}

function HoverHotspotGetText() {
    return overHotspot;
}

async function HotspotClick( room, name) {
    if(name === undefined) {
        name = room;
        room = globals.currentRoom;
    }
    if( game.interfaceLocked ) return;
    if( rooms[room] && rooms[room].hotspots[name] ) {
        if( rooms[room].hotspots[name].click ) {
            DisableInterface();
            await WaitSeconds(0.75);
            await rooms[room].hotspots[name].click( globals.rooms[room].hotspots[name], globals.rooms[room] );
            EnableInterface();
        }
    }
}

async function HotspotDisable( room, name) {
    if(name === undefined) {
        name = room;
        room = globals.currentRoom;
    }
    if( rooms[room] && rooms[room].hotspots[name] ) {
        globals.rooms[room].hotspots[name].active = false;
        var id = document.getElementById(name);
        id.style["pointer-events"] = "none";
    }
}

async function HotspotEnable( room, name) {
    if(name === undefined) {
        name = room;
        room = globals.currentRoom;
    }
    if( rooms[room] && rooms[room].hotspots[name] ) {
        globals.rooms[room].hotspots[name].active = true;

        console.log( globals.rooms[room].hotspots[name] );
        
        var id = document.getElementById(name);
        if(globals.rooms[room].hotspots[name].svg) id.style["pointer-events"] = "all";
        else id.style["pointer-events"] = "auto";
    }
}


async function HotspotHide( room, name) {
    if(name === undefined) {
        name = room;
        room = globals.currentRoom;
    }
    if( rooms[room] && rooms[room].hotspots[name] ) {
        globals.rooms[room].hotspots[name].invisible = true;
        var id = document.getElementById(name);
        id.style.visibility = "hidden";
    }
}

async function HotspotShow( room, name) {
    if(name === undefined) {
        name = room;
        room = globals.currentRoom;
    }
    if( rooms[room] && rooms[room].hotspots[name] ) {
        globals.rooms[room].hotspots[name].invisible = false;
        var id = document.getElementById(name);
        id.style.visibility = "visible";
    }
}