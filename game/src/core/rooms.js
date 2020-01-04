
var LastCreatedRoom;
function Room(name) {
    LastCreatedRoom = name;
    globals.rooms[name] = {
        hotspots : {}
    };
    return rooms[name] = {
        hotspots : {}
    };
}

async function EnterRoom(name) {
    roomarea.innerHTML = '';
    hover.innerHTML = '';
    hover.style.display = 'none';
    gameconsole.style.display = 'none';
    gameconsole.innerHTML = '';
    overHotspot = '';
    if( rooms[name] && rooms[name].enter ) {
        globals.currentRoom = name;
        for(hotspot in rooms[name].hotspots) {
            var hotspotdiv;
            if( globals.rooms[name].hotspots[hotspot].svg ) {
                hotspotdiv = document.getElementById(hotspot);
                hotspotdiv.style.cursor = "pointer";
                hotspotdiv.style.display = "block";
            } else {
                hotspotdiv = document.createElement("div");
                hotspotdiv.className = "game__hotspot gpu";
                hotspotdiv.style.position = "absolute";
                hotspotdiv.style.left = globals.rooms[name].hotspots[hotspot].x;
                hotspotdiv.style.top = globals.rooms[name].hotspots[hotspot].y;
                hotspotdiv.style.width = globals.rooms[name].hotspots[hotspot].width;
                hotspotdiv.style.height = globals.rooms[name].hotspots[hotspot].height;
                if( globals.rooms[name].hotspots[hotspot].active == false) hotspotdiv.style.display = "none";
                if( globals.rooms[name].hotspots[hotspot].background ) hotspotdiv.style.background = globals.rooms[name].hotspots[hotspot].background;
                hotspotdiv.id = hotspot;          
                roomarea.appendChild(hotspotdiv);
            }
            hotspotdiv.onclick = function() {
                if( game.interfaceLocked ) return;
                HotspotClick(globals.currentRoom,this.id);
            };
            hotspotdiv.onmousemove = function(e) {
                overHotspot = globals.rooms[globals.currentRoom].hotspots[this.id].description;
            };
            if( globals.rooms[name].hotspots[hotspot].invisible ) hotspotdiv.style.visibility = 'hidden';
            else hotspotdiv.style.visibility = 'visible';
        }
        await rooms[name].enter( globals.rooms[name] );
    }
}
