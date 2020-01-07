
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
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            sounds[name] = buffer;
            return;
        }, onError);
    }
    request.send();
}


async function PlaySound(name) {
    if(audiocontext === undefined) return;
    var source = audiocontext.createBufferSource(); 
    source.buffer = sounds[name];                    
    source.connect(audiocontext.destination);       
    source.start(0);                                                               
}