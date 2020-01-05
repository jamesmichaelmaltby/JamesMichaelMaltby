

async function logKey(e) {
    if( game.interfaceLocked ) return;
    var code = e.code;
    if( code.startsWith('Digit') ) {
        code = code.replace('Digit','');
        if (e.shiftKey) {
            SaveGame(code);
        } else {
            LoadGame(code);
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

