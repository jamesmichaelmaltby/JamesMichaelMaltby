async function logKey(e) {
    if( game.interfaceLocked ) return;
    if (e.code == 'KeyS') {
        localStorage.setItem('save', JSON.stringify(globals) );
        console.log( JSON.parse(localStorage.getItem('save') ) );
        SetMessageColour('yellow');
        await Say('Saved');
        ResetMessageColour();
    } else if (e.code == 'KeyL') {
        load = localStorage.getItem('save');
        if(load) {
            globals = JSON.parse(load);
            EnterRoom( globals.currentRoom );
            SetMessageColour('yellow');
            await Say('Loaded');
            ResetMessageColour();
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
    hover.innerHTML = overHotspot;
    overHotspot = '';
}
gamescreen.addEventListener('mousemove', mouseMove);

