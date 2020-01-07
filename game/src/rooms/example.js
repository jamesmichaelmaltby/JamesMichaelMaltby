
let room = Room('start');

let darkness = Hotspot('darkness', {
    description:'Peer into darkness',
    invisible:true
});

let door = Hotspot('door', {
    description:'Inspect faint shape',
    active:false,
    invisible:true,
    messageColour:'red'
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
    switch( hotspot.i ) {
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
            HotspotDisable('darkness');
            break;
    }
    hotspot.i++;
    if( hotspot.i>2 ) hotspot.i=0;
};

lightswitch.click = async function( hotspot, locals ) {
    hotspot.on = !hotspot.on;
    switch( hotspot.i ) {
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
                await HotspotSay('lightswitch','*klik*');
                await WaitSeconds(2);
                await Say('*sigh*');
                await WaitSeconds(1);
                await HotspotSay('door','*buzzing noises*');
                HotspotEnable('start','door');
                await WaitSeconds(1);
                await Say('Hmmm I wonder where that came from?');
                hotspot.description = 'Use ambiguous button';
            } else { 
                await Say('Here goes...');
                await HotspotSay('lightswitch','*klik*');
                await WaitSeconds(2);
                await Say('Nothing happened...');
                await Say('...just my luck!');
                locals.triedswitch = true;
                hotspot.description = 'Use useless button';
            }
            break;
        default:
            if( locals.hotspots.door.trieddoor ) {
                await HotspotSay('lightswitch','*klik*');
                if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on && !locals.hotspots.yetanotherlightswitch.on ) {
                    await WaitSeconds(1);
                    await Say('Hey I think the buzzing stopped!');
                    await Say('Maybe I should not be playing with these buttons in the dark.');
                }
            } else {
                await HotspotSay('lightswitch','*klik*');
                await WaitSeconds(1);
                Say('Nothing');
            }
    }
    hotspot.i++;
};

anotherlightswitch.click = async function( hotspot, locals ) {
    hotspot.on = !hotspot.on;
    switch( hotspot.i ) {
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
                await HotspotSay('anotherlightswitch','*klik*');
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
                await HotspotSay('anotherlightswitch','*klik*');
                await WaitSeconds(2);
                await Say('Nothing happened...');
                await Say('...just my luck!');
                locals.triedswitch = true;
                hotspot.description = 'Use useless button';
            }
            break;
        default:
            if( locals.hotspots.door.trieddoor ) {
                await HotspotSay('anotherlightswitch','*klik*');
                if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on && !locals.hotspots.yetanotherlightswitch.on ) {
                    await WaitSeconds(1);
                    await Say('Hey I think the buzzing stopped!');
                    await Say('Maybe I should not be playing with these buttons in the dark.');
                }
            } else {
                await HotspotSay('anotherlightswitch','*klik*');
                Say('Nothing');
            }
    }
    hotspot.i++;
};


yetanotherlightswitch.click = async function( hotspot, locals ) {
    hotspot.on = !hotspot.on;
    await HotspotSay('yetanotherlightswitch','*klik*');
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
            HotspotEnable('yetanotherlightswitch');
            hotspot.i++;
            if( locals.hotspots.lightswitch.on ) {
                switch( Random(4) ) {
                    case 0: HotspotSay('lightswitch','*fizzle*'); break;
                    case 1: HotspotSay('lightswitch','*buzz*'); break;
                    case 2: HotspotSay('lightswitch','*spark*'); break;
                    case 3: HotspotSay('lightswitch','*crackle*'); break;
                }
                await WaitSeconds(0.5);
            }
            if( locals.hotspots.anotherlightswitch.on ) {
                switch( Random(4) ) {
                    case 0: HotspotSay('anotherlightswitch','*fizzle*'); break;
                    case 1: HotspotSay('anotherlightswitch','*buzz*'); break;
                    case 2: HotspotSay('anotherlightswitch','*spark*'); break;
                    case 3: HotspotSay('anotherlightswitch','*crackle*'); break;
                }
                await WaitSeconds(0.5);
            }
            if( locals.hotspots.yetanotherlightswitch.on ) {
                switch( Random(4) ) {
                    case 0: HotspotSay('yetanotherlightswitch','*fizzle*'); break;
                    case 1: HotspotSay('yetanotherlightswitch','*buzz*'); break;
                    case 2: HotspotSay('yetanotherlightswitch','*spark*'); break;
                    case 3: HotspotSay('yetanotherlightswitch','*crackle*'); break;
                }
                await WaitSeconds(0.5);
            }
            HotspotSay('start','door','*zap*');
            await WaitSeconds(1);
            await Say( 'Ouch!');
            if( !hotspot.hurtbydoor ) await Say( 'What was that?!');
            if( hotspot.i == 3 ) await Say( 'I really need to stop the electricity first.');
            else if( hotspot.i == 6 ) await Say( 'I must be missing something.');
            else if( hotspot.i == 9 ) {
                await Say( 'I must be masocistic.');
                hotspot.i = 0;
            }
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
    HotspotDisable('floor');
};

ceiling.click = async function( hotspot, locals ) {
    await Say( 'Nope nothing here');
    HotspotDisable('ceiling');
};

room.enter = async function( locals ) {
    await LoadSound('murder-scene');
    console.log('Loaded?');
    PlaySound('murder-scene');
    console.log('Played?');
};

room.exit = async function( locals ) {

};

scripts.clock = async function( locals ) {
    if(locals.clocktick === undefined || locals.clocktick == '*tock*' ) locals.clocktick = '*tick*';
    else locals.clocktick = '*tock*';
    Say( locals.clocktick );
};


