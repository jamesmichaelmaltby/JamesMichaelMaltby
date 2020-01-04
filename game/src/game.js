
(function() { {% include_relative src/rooms/example.js %} })();


scripts.main = async function( ) {
    
    await Say('Hello World!');

    // scripts.clock();

    /*EnterRoom('start');
    DisableInterface();
    await Say('Typical...');
    await Say('...I enter the one escape room where there is no light...');
    await Say('...there must be a light switch somewhere?');
    EnableInterface();*/
};

