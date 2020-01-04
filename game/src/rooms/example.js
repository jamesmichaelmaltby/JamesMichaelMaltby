
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
    flag:0,
    on : false
});

let anotherlightswitch = Hotspot('anotherlightswitch', {
    x:"25%",
    y:"30%",
    width:"20%",
    height:"20%",
    description:'Object in darkness',
    active:true,
    flag:0,
    on : false
});


let moredarkness = Hotspot('moredarkness', {
    x:"0%",
    y:"90%",
    width:"100%",
    height:"10%",
    description:'Inspect dark area at floor level',
    active:true,
    flag:0,
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
    hotspot.on = !hotspot.on;
    switch( hotspot.flag ) {
        case 0:
            await Say('Hey there is something here!');
            hotspot.description = 'Touch object in darkness';
            break;
        case 1:
            await Say('It feels like a button!');
            if( locals.triedswitch ) await Say('I better not get my hopes up.');
            hotspot.description = 'Use button';
            break;
        case 2:
            if( locals.triedswitch ) {
                await Say('Deep breath...');
                await HotspotSay('start','lightswitch','*klik*');
                await WaitSeconds(2);
                await Say('*sigh*');
                await WaitSeconds(1);
                await HotspotSay('start','door','*rumble*');
                await HotspotSay('start','door','*metallic noises*');
                HotspotEnable('start','door');
                await WaitSeconds(1);
                await Say('Hmmm I wonder where that came from?');
                hotspot.description = 'Use ambiguous button';
            } else { 
                await Say('Here goes...');
                await HotspotSay('start','lightswitch','*klik*');
                await WaitSeconds(2);
                await Say('Nothing happened...');
                await Say('...just my luck!');
                locals.triedswitch = true;
                hotspot.description = 'Use useless button';
            }
            break;
        default:
            await HotspotSay('start','lightswitch','*klik*');
            if( locals.hotspots.door.trieddoor ) {
                if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on ) {
                    Say('Hey I think the buzzing stopped!');
                }
            } else {
                await WaitSeconds(1);
                Say('Nothing');
            }
    }
    hotspot.flag++;
};

anotherlightswitch.click = async function( hotspot, locals ) {
    hotspot.on = !hotspot.on;
    switch( hotspot.flag ) {
        case 0:
            await Say('I think I can see something!');
            hotspot.description = 'Touch object in darkness';
            break;
        case 1:
            await Say('It feels like a button!');
            if( locals.triedswitch ) await Say('I better not get my hopes up.');
            hotspot.description = 'Use button';
            break;
        case 2:
            if( locals.triedswitch ) {
                await Say('Deep breath...');
                await HotspotSay('start','anotherlightswitch','*klik*');
                await WaitSeconds(2);
                await Say('*sigh*');
                await WaitSeconds(1);
                await HotspotSay('start','door','*rumble*');
                await HotspotSay('start','door','*metallic noises*');
                HotspotEnable('start','door');
                await WaitSeconds(1);
                await Say('Hmmm I wonder where that came from?');
                hotspot.description = 'Use ambiguous button';
            } else { 
                await Say('Here goes...');
                await HotspotSay('start','anotherlightswitch','*klik*');
                await WaitSeconds(2);
                await Say('Nothing happened...');
                await Say('...just my luck!');
                locals.triedswitch = true;
                hotspot.description = 'Use useless button';
            }
            break;
        default:
            await HotspotSay('start','anotherlightswitch','*klik*');
            if( locals.hotspots.door.trieddoor ) {
                if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on ) {
                    await Say('Hey I think the buzzing stopped!');
                    await Say('Maybe I should not be playing with buttons.');
                }
            } else {
                await WaitSeconds(1);
                Say('Nothing');
            }
    }
    hotspot.flag++;
};


door.click = async function( hotspot, locals ) {
    if( hotspot.trieddoor ) {
        if( locals.hotspots.lightswitch.on || locals.hotspots.anotherlightswitch.on) {
            if( hotspot.hurtbydoor ) {
                switch( Random(3) ) {
                    case 0:
                        await Say( 'I am not touching that again until I have turned off whatever is electricuting me!');
                        break;
                    case 1:
                        await Say( 'I can still here it buzzing!');
                        break;
                    case 2
                        await Say( 'Why is it shortcircuited?!' );
                        break;
                }
            } else {
                await Say( 'Here goes...');
                await HotspotSay('start','door','*metallic strain*');
                if( locals.hotspots.lightswitch.on ) {
                    await HotspotSay('start','lightswitch','*fizzle*');
                }
                if( locals.hotspots.anotherlightswitch.on ) {
                    await HotspotSay('start','anotherlightswitch','*fizzle*');
                }
                HotspotSay('start','door','*buzzzzzzzzz*');
                await WaitSeconds(1);
                await Say( 'Ouch!');
                await Say( 'What was that?!');
                hotspot.hurtbydoor = true;
            }
        } else {
            await Say( 'Game Over');
        }
    } else {
        await Say( 'Hang on a minute I think some light is shining through here!');
        await Say( 'Maybe there is a door?');
        hotspot.trieddoor = true;
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

scripts.clock = async function( locals ) {
    if(locals.clocktick === undefined || locals.clocktick == '*tock*' ) locals.clocktick = '*tick*';
    else locals.clocktick = '*tock*';
    Say( locals.clocktick );
};


