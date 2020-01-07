
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



async function ClearRoom() {
    roomarea.innerHTML = '';
    StopLoop();
}

async function RenderBackground(name) {
    roomarea.innerHTML = resources.backgrounds[name];
}

async function LoadBackground(name) {
    if(resources.backgrounds[name]) RenderBackground(name);
    else {
        var request = new XMLHttpRequest();
        request.open('GET', 'src/backgrounds/' + name + '.svg', true);
        request.onload = function() {
            resources.backgrounds[name] = request.response;
            RenderBackground(name);
            request.loaded = true;
        };
        request.send();
        return new Promise(resolve => {
            var loading = setInterval(() => {
                if(request.loaded) {
                    resolve('done');
                    clearInterval(loading);
                }
            }, 10);
        });
    }
}

async function EnterRoom(name) {
    hover.innerHTML = '';
    hover.style.display = 'none';
    roomarea.style.display = 'none';
    gameconsole.innerHTML = '';
    await LoadBackground(name);
    
    overHotspot = '';
    if( rooms[name] && rooms[name].enter ) {
        globals.currentRoom = name;
        for(hotspot in rooms[name].hotspots) {
            var hotspotdiv;
            if( globals.rooms[name].hotspots[hotspot].svg ) {
                hotspotdiv = document.getElementById( globals.rooms[name].hotspots[hotspot].svg );
                if( hotspotdiv === undefined) return alert('Error hotspot not found');
                hotspotdiv.style.cursor = "pointer";
                hotspotdiv.style.display = "block";
                hotspotdiv.id = hotspot;
            }
            
            if( globals.rooms[name].hotspots[hotspot].active == false) {
                hotspotdiv.style["pointer-events"] = "none";
            } else {
                hotspotdiv.style["pointer-events"] = "all";
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
        roomarea.style.display = 'block';
    }
}
