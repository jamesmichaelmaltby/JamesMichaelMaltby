var currentMessages = 0;
function Say(message, id) {
    var promise, ms;
    ms = Math.max(1500,message.length*50);
    gameconsole.innerHTML = message;
    currentMessages++;
    promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
           currentMessages--;
            if(currentMessages==0) gameconsole.innerHTML = '';
            resolve('timeout done');
        }, ms);
    });
    return promise;
}