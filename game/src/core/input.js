function logKey(e) {
    if( game.interfaceLocked ) return;
    if (e.code == 'KeyS') {
        localStorage.setItem('save', JSON.stringify(globals) );
        console.log( JSON.parse(localStorage.getItem('save') ) );
        alert('Saved');
    } else if (e.code == 'KeyL') {
        load = localStorage.getItem('save');
        if(load) {
            globals = JSON.parse(load);
            console.log(globals);
            EnterRoom( globals.currentRoom );
            alert('Loaded');
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

