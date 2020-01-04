
(function() { {% include_relative src/rooms/example.js %} })();


scripts.main = async function( ) {
    EnterRoom('start');
    DisableInterface();
    await Say('Typical...');
    await Say('...I enter the one escape room where there is no light...');
    await Say('...there must be a light switch somewhere?');
    EnableInterface();
};



var birds = document.getElementById('birds');
birds.onclick = function() {
    alert('birds');
};