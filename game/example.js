
let room = Room('start');

let darkness = Hotspot('darkness', {
    x:"0%",
    y:"0%",
    width:"100%",
    height:"100%",
    description:'Peer into darkness',
    active:true,
    flag:0
});

let lightswitch = Hotspot('lightswitch', {
    x:"75%",
    y:"50%",
    width:"20%",
    height:"20%",
    description:'Object in darkness',
    active:true,
    flag:0
});

let moredarkness = Hotspot('moredarkness', {
    x:"0%",
    y:"90%",
    width:"100%",
    height:"10%",
    description:'Inspect dark area at bottom of screen',
    active:true,
    flag:0
});


let moremoredarkness = Hotspot('moremoredarkness', {
    x:"0%",
    y:"0%",
    width:"100%",
    height:"10%",
    description:'Inspect dark area at top of screen',
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
            await Say('BLACKNESS PURE BLACKNESS!');
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

lightswitch.click = async function( hotspot, locals ) {
    switch( hotspot.flag ) {
        case 0:
            await Say('Hey there is something here!');
            hotspot.description = 'Touch object in darkness';
            break;
        case 1:
            await Say('It feels like a switch!');
            hotspot.description = 'Use switch';
            break;
        case 2:
            await Say('Here goes...');
            await Say('*klik*');
            await Say('Nothing happened...');
            await Say('...just my luck!');
            hotspot.description = 'Use useless switch';
            break;
        default:
            await Say('*klik*');
            await Say('      ');
            await Say('Nothing');
    }
    hotspot.flag++;
};

moredarkness.click = async function( hotspot, locals ) {
    await Say( 'Nope cannot see anything');
    HotspotDisable('start','moredarkness');
};

moremoredarkness.click = async function( hotspot, locals ) {
    await Say( 'Nope nothing here');
    HotspotDisable('start','moremoredarkness');
};

room.enter = async function( locals ) {
  
};

room.exit = async function( locals ) {

};

scripts.main = async function( ) {
    EnterRoom('start');
    DisableInterface();
    await Say('Typical...');
    await Say('...I enter the one escape room where there is no light...');
    await Say('...there must be a light switch somewhere?');
    EnableInterface();
}
