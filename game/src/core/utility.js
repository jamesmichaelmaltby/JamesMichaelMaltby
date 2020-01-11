
function EnableInterface() {
    game.interfaceLocked = false;
    gamescreen.className = gamescreen.className.replace(" nointerface", "");
    HoverHotspotRemove();
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
  await Say('red', 'Cleared all saved data');
}


async function ResetGame() {
  if(defaultGlobals === undefined) return;
  DisableInterface();
  ClearRoom();
  globals = JSON.parse(defaultGlobals);
  await Say('red','Game restarting');
  EnableInterface();
  StartScript('main');
}

  async function SaveGame(n) {
    localStorage.setItem('save'+n, JSON.stringify(globals) );

    if(n==0 || n=='0') {
      await Say('yellow','Autosaved');
    } else {
      await Say('yellow','Saved to Slot ' + n);
    }

    localStorage.setItem('lastSave',n);
}

async function LoadGame(n) {
   load = localStorage.getItem('save'+n);
   if(load) {
       newglobals = JSON.parse(load);
       await ClearRoom();
       globals = Object.assign(globals,newglobals);
       if(n==0 || n=='0') {
        await Say('yellow','Loading Autosave');
        } else {
        await Say('yellow','Loading Save ' + n);
        }
       localStorage.setItem('lastSave',n);
       game.interfaceLocked = false;
       ResumeScripts();
       EnterRoom( globals.currentRoom );
   }
}

function LoadLastSave() {
  var lastSave = localStorage.getItem('lastSave');
  if(lastSave !=null ) {
    LoadGame(lastSave);
  } else {
    game.interfaceLocked = false;
    StartScript('main');
  }
}
