

async function logKey(e) {
    if( game.interfaceLocked ) return;
    var code = e.code;
    if( code.startsWith('Digit') ) {
        code = code.replace('Digit','');
        if (e.shiftKey) {
            await SaveGame(code);
        } else {
            await LoadGame(code);
        }
    } else {
        if( e.shiftKey && code == 'Escape' ) {
            ClearAllSavedData();
        } else if( e.shiftKey && code == 'KeyR' ) {
            ResetGame();
        }
    }
}
document.addEventListener('keypress', logKey);

function mouseMove(e) {
    if( game.interfaceLocked ) return;
    var x = (e.clientX - main.offsetLeft);
    var y = (e.clientY - main.offsetTop);
    if( HoverHotspotGetText() ) {
        HoverHotspot(x,y);
    } else {
        HoverHotspotRemove();
    }
    HoverHotspotSetText(null);
}
gamescreen.addEventListener('mousemove', mouseMove);

function gameclick(e) {
    if( defaultGlobals ) return;
    audiocontext.resume();
    defaultGlobals = JSON.stringify(globals);
    LoadLastSave();
}
/*gamescreen.addEventListener('click', click);*/