
function EnableInterface() {
    game.interfaceLocked = false;
    gamescreen.className = gamescreen.className.replace(" nointerface", "");
    hover.innerHTML = '';
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
  