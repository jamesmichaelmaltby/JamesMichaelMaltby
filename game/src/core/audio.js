
try {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var audiocontext = new AudioContext();
}
catch(e) {
    alert('Web Audio API is not supported in this browser');
}



async function LoadSound(name) {
    if(audiocontext === undefined) return;
    if(resources.audio[name]) return;

    var request = new XMLHttpRequest();
    request.open('GET', 'src/audio/' + name, true);
    request.responseType = 'arraybuffer';
    name = name.split('.')[0];
    request.onload = function() {
        audiocontext.decodeAudioData(request.response, function(buffer) {
            resources.audio[name] = buffer;
            globals.sounds[name] = {};
            request.loaded = true;
        }, null);
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

if(audiocontext) {
    var master = audiocontext.createGain();
    master.gain.value = 0.25;
    master.connect(audiocontext.destination);
    var music = audiocontext.createGain();
    music.gain.value = 0.75;
    music.connect(master);
}
var looping;
function PlaySound(name, loop) {
    if(loop && looping) StopLoop();
    if(audiocontext === undefined) return;
    if(resources.audio[name]===undefined) return;
    var source = audiocontext.createBufferSource(); 
    source.buffer = resources.audio[name];       
    source.loop = loop;      
    if(loop) {
        source.connect(music); 
        looping = source;
    }
    else source.connect(master);     
    source.start(0);     
    source.connect(music);
}

function StopLoop() {
    if(looping) looping.stop();
}