
let room = Room('start');

let darkness = Hotspot('darkness', {
    x:"0%",
    y:"0%",
    width:"100%",
    height:"80%",
    description:'Peer into darkness',
    active:true,
    flag:0
});

let moredarkness = Hotspot('moredarkness', {
    x:0,
    y:"80%",
    width:"100%",
    height:"20%",
    description:'Inspect dark area at bottom of screen',
    active:true,
    flag:0
});

darkness.click = async function( hotspot, locals ) {
    switch( hotspot.flag ) {
        case 0:
            await Say('Hello darkness my old friend');
            hotspot.description = 'Look closer into darkness';
            break;
        case 1:
            await Say('BLACK PURE BLACKNESS!');
            hotspot.description = 'Peer into blackness';
            break;
        case 2:
            await Say('There must be something here that can help me');
            hotspot.description = 'Peer into darkness';
            break;
    }
    hotspot.flag++;
    if( hotspot.flag>2 ) hotspot.flag=0;
};

moredarkness.click = async function( hotspot, locals ) {
    switch( hotspot.flag ) {
        case 0:
            await Say( 'Hmmm what is that?');
            hotspot.description = 'Look at strange object';
            break;
        case 1:
            await Say( 'Strange it looks a bit like an object?');
            hotspot.description = 'Ponder on the use of the strange object';
            break;
        case 2:
            await Say( 'Nope no idea what it is!');
            break;
    }
    hotspot.flag++;
    if( hotspot.flag>2 ) hotspot.flag=1;
};

room.enter = async function( locals ) {
    /*DisableInterface();
    await Say('Hello World!');
    await Say('This is an example of an enter script!');
    EnableInterface();
    HotspotClick('start','darkness');*/
};

room.exit = async function( locals ) {

};
