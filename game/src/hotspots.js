function Hotspot(name,defaults) {
    room = LastCreatedRoom;
    globals.rooms[room].hotspots[name] = defaults;
    return rooms[room].hotspots[name] = {};
}

async function HotspotClick( room, name) {
    if( game.interfaceLocked ) return;
    if( rooms[room] && rooms[room].hotspots[name] ) {
        if( rooms[room].hotspots[name].click ) {
            DisableInterface();
            await WaitSeconds(0.75);
            await rooms[room].hotspots[name].click( globals.rooms[room].hotspots[name], globals.rooms[room] );
            overHotspot = '';
            EnableInterface();
        }
    }
}

async function HotspotDisable( room, name) {
    if( rooms[room] && rooms[room].hotspots[name] ) {
        globals.rooms[room].hotspots[name].active = false;
        var id = document.getElementById(name);
        id.style.display = "none";
    }
}

async function HotspotEnable( room, name) {
    if( rooms[room] && rooms[room].hotspots[name] ) {
        globals.rooms[room].hotspots[name].active = true;
        var id = document.getElementById(name);
        id.style.display = "block";
    }
}