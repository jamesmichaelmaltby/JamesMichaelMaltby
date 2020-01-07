
try {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var audiocontext = new AudioContext();
}
catch(e) {
    alert('Web Audio API is not supported in this browser');
}


var sounds = {};


async function LoadSound(name) {
    if(audiocontext === undefined) return;
    if(sounds[name]) return;

    var request = new XMLHttpRequest();
    request.open('GET', 'src/audio/' + name, true);
    request.responseType = 'arraybuffer';
    name = name.split('.')[0];
    request.onload = function() {
        audiocontext.decodeAudioData(request.response, function(buffer) {
            sounds[name] = buffer;
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


function PlaySound(name, loop) {
    if(audiocontext === undefined) return;
    if(sounds[name]===undefined) return;;
    var source = audiocontext.createBufferSource(); 
    source.buffer = sounds[name];       
    source.loop = loop;             
    source.connect(audiocontext.destination);       
    source.start(0);                                                         
}