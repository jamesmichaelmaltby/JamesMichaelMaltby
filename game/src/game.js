
(function() { {% include_relative src/rooms/example.js %} })();


scripts.main = async function( ) {
    if( LoadLastSave() ) return;

    EnterRoom('start');
    DisableInterface();
    await Say('Typical...');
    await Say('...I enter the one escape room where there is no light...');
    await Say('...there must be a light switch somewhere?');
    EnableInterface();
};

