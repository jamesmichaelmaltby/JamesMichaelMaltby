
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
    request.open('GET', 'src/audio/' + name + '.mp3', true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        audiocontext.decodeAudioData(request.response, function(buffer) {
            sounds[name] = buffer;
            console.log(buffer);
        }, null);
    };
    request.send();

    return new Promise(resolve => {
        var loading = setInterval(() => {
            if(request.readyState == 4) {
                resolve('done');
                clearInterval(loading);
            }
        }, 2000);
    });
}


async function PlaySound(name) {
    if(audiocontext === undefined) return;
    var source = audiocontext.createBufferSource(); 
    source.buffer = sounds[name];                    
    source.connect(audiocontext.destination);       
    source.start(0);                                                               
}