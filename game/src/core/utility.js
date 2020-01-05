
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
  
async function ClearAllSavedData() {
  localStorage.removeItem('lastSave');
  localStorage.removeItem('save0');
  localStorage.removeItem('save1');
  localStorage.removeItem('save2');
  localStorage.removeItem('save3');
  localStorage.removeItem('save4');
  localStorage.removeItem('save5');
  localStorage.removeItem('save6');
  localStorage.removeItem('save7');
  localStorage.removeItem('save8');
  localStorage.removeItem('save9');
  SetMessageColour('red');
  await Say('Cleared all saved data');
  DefaultMessageColour();
}

  async function SaveGame(n) {
    localStorage.setItem('save'+n, JSON.stringify(globals) );
    SetMessageColour('yellow');
    await Say('Saved to slot ' + n);
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
       await Say('Loaded Save ' + n);
       DefaultMessageColour();
       localStorage.setItem('lastSave',n);
   }
}

async function LoadLastSave() {
  var lastSave = localStorage.getItem('lastSave');
  if(lastSave) {
    LoadGame(lastSave);
    return true;
  }
  else return false;
}
