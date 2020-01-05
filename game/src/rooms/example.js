
let room = Room('start');

let darkness = Hotspot('darkness', {
    description:'Peer into darkness',
    invisible:true,
    svg:'darkness1'
});

let door = Hotspot('door', {
    description:'Inspect faint shape',
    active:false,
    invisible:true
});

let lightswitch = Hotspot('lightswitch', {
    description:'Investigate object in darkness',
    invisible:true
});

let anotherlightswitch = Hotspot('anotherlightswitch', {
    description:'Investigate object in darkness',
    invisible:true
});

let yetanotherlightswitch = Hotspot('yetanotherlightswitch', {
    description:'Use well concealed button',
    active:false,
    on : true,
    invisible:true
});

let floor = Hotspot('floor', {
    description:'Inspect dark area at floor level',
    invisible:true
});

let ceiling = Hotspot('ceiling', {
    description:'Inspect dark area near ceiling',
    invisible:true
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
                await HotspotSay('start','door','*buzzing noises*');
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
            if( locals.hotspots.door.trieddoor ) {
                await HotspotSay('start','lightswitch','*klik*');
                if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on && !locals.hotspots.yetanotherlightswitch.on ) {
                    await WaitSeconds(1);
                    await Say('Hey I think the buzzing stopped!');
                    await Say('Maybe I should not be playing with these buttons in the dark.');
                }
            } else {
                await HotspotSay('start','lightswitch','*klik*');
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
                await HotspotSay('start','door','*buzzing noises*');
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
            if( locals.hotspots.door.trieddoor ) {
                await HotspotSay('start','anotherlightswitch','*klik*');
                if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on && !locals.hotspots.yetanotherlightswitch.on ) {
                    await WaitSeconds(1);
                    await Say('Hey I think the buzzing stopped!');
                    await Say('Maybe I should not be playing with these buttons in the dark.');
                }
            } else {
                await HotspotSay('start','anotherlightswitch','*klik*');
                Say('Nothing');
            }
    }
    hotspot.flag++;
};


yetanotherlightswitch.click = async function( hotspot, locals ) {
    hotspot.on = !hotspot.on;
    await HotspotSay('start','yetanotherlightswitch','*klik*');
    if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on && !locals.hotspots.yetanotherlightswitch.on ) {
        await WaitSeconds(1);
        await Say('Hey I think the buzzing stopped!');
        await Say('Maybe I should not be playing with these buttons in the dark.');
    }
};

door.click = async function( hotspot, locals ) {
    if( hotspot.trieddoor ) {
        if( locals.hotspots.lightswitch.on || locals.hotspots.anotherlightswitch.on || locals.hotspots.yetanotherlightswitch.on) {
            if( !hotspot.hurtbydoor ) await Say( 'Here goes...');
            HotspotEnable('start','yetanotherlightswitch');

            if( locals.hotspots.lightswitch.on ) {
                HotspotSay('start','lightswitch','*fizzle*');
                await WaitSeconds(0.5);
            }
            if( locals.hotspots.anotherlightswitch.on ) {
                HotspotSay('start','anotherlightswitch','*fizzle*');
                await WaitSeconds(0.5);
            }
            if( locals.hotspots.yetanotherlightswitch.on ) {
                HotspotSay('start','yetanotherlightswitch','*fizzle*');
                await WaitSeconds(0.5);
            }
            HotspotSay('start','door','*buzzzzzzzzz*');
            await WaitSeconds(1);
            await Say( 'Ouch!');
            if( !hotspot.hurtbydoor ) await Say( 'What was that?!');
            hotspot.hurtbydoor = true;  
        } else {
            await Say( 'Congratulations! You escaped the room!');
            await Say( 'FOR NOW');
            await Say( 'Thank you for playing my game.');
            await Say( 'That bits with the three-headed dragon and the Amazonian warrier women were good right?');
            await Say( 'Anyway... please feel free to stay in the darkness and play with buttons...');
            await Say( '...or maybe you now feel brave enough for the real world...');
            await Say( '...either way I hope you enjoyed it and please check out the rest of my website.');
        }
    } else {
        await Say( 'Hang on a minute I think some faint light is shining through here!');
        await Say( 'Maybe this is a way out?!');
        hotspot.trieddoor = true;
        hotspot.description = 'Venture into void';
    }
};

floor.click = async function( hotspot, locals ) {
    await Say( 'Nope cannot see anything');
    HotspotDisable('start','floor');
};

ceiling.click = async function( hotspot, locals ) {
    await Say( 'Nope nothing here');
    HotspotDisable('start','ceiling');
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


