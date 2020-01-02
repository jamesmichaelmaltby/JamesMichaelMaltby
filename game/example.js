
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

let door = Hotspot('door', {
    x:"5%",
    y:"5%",
    width:"20%",
    height:"40%",
    description:'Faint light',
    active:false,
    flag:0,
    background:"rgb(15,15,15)"
});

let lightswitch = Hotspot('lightswitch', {
    x:"75%",
    y:"30%",
    width:"20%",
    height:"20%",
    description:'Object in darkness',
    active:true,
    flag:0
});

let anotherlightswitch = Hotspot('anotherlightswitch', {
    x:"25%",
    y:"30%",
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
    description:'Inspect dark area at floor level',
    active:true,
    flag:0
});


let moremoredarkness = Hotspot('moremoredarkness', {
    x:"0%",
    y:"0%",
    width:"100%",
    height:"10%",
    description:'Inspect dark area near ceiling',
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
            HotspotDisable('start','darkness');
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
            if( locals.triedswitch ) await Say('I better not get my hopes up.');
            hotspot.description = 'Use switch';
            break;
        case 2:
            if( locals.triedswitch ) {
                await Say('Deep breath...');
                await Say('*klik*');
                await WaitSeconds(2);
                await Say('*sigh*');
                await WaitSeconds(1);
                await Say('*rumble*');
                await Say('*metallic noises*');
                HotspotEnable('start','door');
                await WaitSeconds(1);
                await Say('Hmmm I wonder where that came from?');
                hotspot.description = 'Use ambiguous switch';
            } else { 
                await Say('Here goes...');
                await Say('*klik*');
                await WaitSeconds(2);
                await Say('Nothing happened...');
                await Say('...just my luck!');
                locals.triedswitch = true;
                hotspot.description = 'Use useless switch';
            }
            break;
        default:
            await Say('*klik*');
            await WaitSeconds(1);
            Say('Nothing');
    }
    hotspot.flag++;
};

anotherlightswitch.click = async function( hotspot, locals ) {
    switch( hotspot.flag ) {
        case 0:
            await Say('I think I can see something!');
            hotspot.description = 'Touch object in darkness';
            break;
        case 1:
            await Say('It feels like a switch!');
            if( locals.triedswitch ) await Say('I better not get my hopes up.');
            hotspot.description = 'Use switch';
            break;
        case 2:
            if( locals.triedswitch ) {
                await Say('Deep breath...');
                await Say('*klik*');
                await WaitSeconds(2);
                await Say('*sigh*');
                await WaitSeconds(1);
                await Say('*rumble*');
                await Say('*metallic noises*');
                HotspotEnable('start','door');
                await WaitSeconds(1);
                await Say('Hmmm I wonder where that came from?');
                hotspot.description = 'Use ambiguous switch';
            } else { 
                await Say('Here goes...');
                await Say('*klik*');
                await WaitSeconds(2);
                await Say('Nothing happened...');
                await Say('...just my luck!');
                locals.triedswitch = true;
                hotspot.description = 'Use useless switch';
            }
            break;
        default:
            await Say('*klik*');
            await WaitSeconds(1);
            Say('Nothing');
            break;
    }
    hotspot.flag++;
};


door.click = async function( hotspot, locals ) {
    if( locals.trieddoor ) {
        await Say( 'Here goes!');
        await Say( '*argh*');
        await WaitSeconds(2);
        await Say( 'Yes!');
        await Say( 'Freedom! Sweet Freedom!');
    } else {
        await Say( 'Hang on a minute I think some light is shining through here!');
        await Say( 'Maybe there is a door?');
        locals.trieddoor = true;
        hotspot.description = 'Push through void';
    }
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
