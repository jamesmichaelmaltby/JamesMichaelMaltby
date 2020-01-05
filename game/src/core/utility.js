
function EnableInterface() {
    game.interfaceLocked = false;
    gamescreen.className = gamescreen.className.replace(" nointerface", "");
    hover.innerHTML = '';
    hover.style.display = "none";
    overHotspot = '';
}

function DisableInterface() {
    game.interfaceLocked = true;
    gamescreen.className += " nointerface";
}

function Random(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function WaitMiliseconds(ms) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('done');
      }, ms);
    });
  }
  function WaitSeconds(s) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('done');
      }, s*1000);
    });
  }
  


  async function SaveGame(n) {
    localStorage.setItem('save'+n, JSON.stringify(globals) );
    SetMessageColour('yellow');
    await Say('Saved');
    DefaultMessageColour();
    localStorage.setItem('lastSave',n);
}

async function LoadGame(n) {
   load = localStorage.getItem('save'+n);
   if(load) {
       newglobals = JSON.parse(load);
       globals = Object.assign(globals,newglobals);
       EnterRoom( globals.currentRoom );
       SetMessageColour('yellow');
       await Say('Loaded');
       DefaultMessageColour();
       localStorage.setItem('lastSave',n);
   }
}

function LoadLastSave() {
  var lastSave = localStorage.getItem('lastSave');
  if(lastSave) {
    LoadGame(lastSave);
    return true;
  }
  else return false;
}
