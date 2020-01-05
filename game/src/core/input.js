async function logKey(e) {
    if( game.interfaceLocked ) return;
    if (e.code == 'KeyS') {
        localStorage.setItem('save', JSON.stringify(globals) );
        SetMessageColour('yellow');
        await Say('Saved');
        DefaultMessageColour();
    } else if (e.code == 'KeyL') {
        load = localStorage.getItem('save');
        if(load) {
            newglobals = JSON.parse(load);
            globals = Object.assign(globals,newglobals);
            EnterRoom( globals.currentRoom );
            SetMessageColour('yellow');
            await Say('Loaded');
            DefaultMessageColour();
        }
    }
}
document.addEventListener('keypress', logKey);

var overHotspot;
function mouseMove(e) {
    if( game.interfaceLocked ) return;
    var x = (e.clientX - main.offsetLeft);
    var y = (e.clientY - main.offsetTop);
    hover.style.left = x + "px";
    hover.style.top = y + "px";
    if( overHotspot) { 
        hover.style.display = 'block';
        hover.innerHTML = overHotspot;
    } else {
        hover.style.display = 'none';
        hover.innerHTML = '';
    }
    overHotspot = '';
}
gamescreen.addEventListener('mousemove', mouseMove);

