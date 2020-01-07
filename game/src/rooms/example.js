
let room = Room('start');

let darkness = Hotspot('darkness', {
    description:'Peer into darkness',
    invisible:true
});

let panel = Hotspot('panel', {
    description:'Inspect faint shape',
    active:false,
    invisible:true,
    messageColour:'red',
    svg:'door'
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
    if( locals.panelfixed ) {
        PlaySound('button');
        await HotspotSay('lightswitch','*klik*');
        if( locals.codeposition == 3) {
            PlaySound('ding');
            await HotspotSay('panel','*ding*');
            await Say('You win');
            locals.codeposition = 0;
        } else {
            PlaySound('error');
            await HotspotSay('panel','*error*');
            /*PlaySound('button');
            await HotspotSay('lightswitch','*klik*');*/
            hotspot.on = false;
            locals.codeposition=0;
        }
    } else {
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
                    PlaySound('button');
                    await HotspotSay('lightswitch','*klik*');
                    await WaitSeconds(2);
                    await Say('*sigh*');
                    await WaitSeconds(1);
                    PlaySound('shock2');
                    await HotspotSay('panel','*buzzing noises*');
                    await HotspotSay('panel','*electricical spark*');
                    HotspotEnable('start','panel');
                    await WaitSeconds(1);
                    await Say('Hmmm I wonder where that came from?');
                    hotspot.description = 'Use ambiguous button';
                } else { 
                    await Say('Here goes...');
                    PlaySound('button');
                    await HotspotSay('lightswitch','*klik*');
                    await WaitSeconds(2);
                    await Say('Nothing happened...');
                    await Say('...just my luck!');
                    locals.triedswitch = true;
                    hotspot.description = 'Use useless button';
                }
                break;
            default:
                if( locals.hotspots.panel.triedpanel ) {
                    PlaySound('button');
                    await HotspotSay('lightswitch','*klik*');
                    if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on && !locals.hotspots.yetanotherlightswitch.on ) {
                        PlaySound('power-down');
                        await HotspotSay('panel','*powering down*');
                        locals.powerdown = true;
                        await WaitSeconds(1);
                        await Say('Hey I think the buzzing stopped!');
                        await Say('Maybe I should not be playing with these buttons in the dark.');
                    } else {
                        if(locals.powerdown) {
                            PlaySound('shock2');
                            await HotspotSay('panel','*buzzing*');
                            locals.powerdown = false;
                        }
                    }
                } else {
                    PlaySound('button');
                    await HotspotSay('lightswitch','*klik*');
                    await WaitSeconds(1);
                    Say('Nothing');
                }
        }
        hotspot.i++;
    }
};

anotherlightswitch.click = async function( hotspot, locals ) {
    hotspot.on = !hotspot.on;
    if( locals.panelfixed ) {
        PlaySound('button');
        await HotspotSay('anotherlightswitch','*klik*');
        if( locals.codeposition == 1) {
            locals.codeposition++;
        } else {
            PlaySound('error');
            await HotspotSay('panel','*error*');
            /*PlaySound('shock1');
            await HotspotSay('anotherlightswitch','*buzz*');*/
            hotspot.on = false;
            locals.codeposition=0;
        }
    } else { 
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
                    PlaySound('button');
                    await HotspotSay('anotherlightswitch','*klik*');
                    await WaitSeconds(2);
                    await Say('*sigh*');
                    await WaitSeconds(1);
                    PlaySound('shock2');
                    await HotspotSay('panel','*buzzing noises*');
                    await HotspotSay('panel','*electricical spark*');
                    HotspotEnable('panel');
                    await WaitSeconds(1);
                    await Say('Hmmm I wonder where that came from?');
                    hotspot.description = 'Use ambiguous button';
                } else { 
                    await Say('Here goes...');
                    PlaySound('button');
                    await HotspotSay('anotherlightswitch','*klik*');
                    await WaitSeconds(2);
                    await Say('Nothing happened...');
                    await Say('...just my luck!');
                    locals.triedswitch = true;
                    hotspot.description = 'Use useless button';
                }
                break;
            default:
                if( locals.hotspots.panel.triedpanel ) {
                    PlaySound('button');
                    await HotspotSay('anotherlightswitch','*klik*');
                    if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on && !locals.hotspots.yetanotherlightswitch.on ) {
                        PlaySound('power-down');
                        locals.powerdown = true;
                        await HotspotSay('panel','*powering down*');
                        await WaitSeconds(1);
                        await Say('Hey I think the buzzing stopped!');
                        await Say('Maybe I should not be playing with these buttons in the dark.');
                    } else {
                        if(locals.powerdown) {
                            PlaySound('shock2');
                            await HotspotSay('panel','*buzzing*');
                            locals.powerdown = false;
                        }
                    }
                } else {
                    PlaySound('button');
                    await HotspotSay('anotherlightswitch','*klik*');
                    Say('Nothing');
                }
        }
        hotspot.i++;
    }
};


yetanotherlightswitch.click = async function( hotspot, locals ) {
    hotspot.on = !hotspot.on;
    PlaySound('button');
    await HotspotSay('yetanotherlightswitch','*klik*');
    if( locals.panelfixed ) {
        if( locals.codeposition == 0 || locals.codeposition == 2) {
            locals.codeposition++;
        } else {
            PlaySound('error');
            await HotspotSay('panel','*error*');
            /*PlaySound('button');
            await HotspotSay('yetanotherlightswitch','*klik*');*/
            hotspot.on = false;
            locals.codeposition=0;
        }
    } else {
        if( !locals.hotspots.lightswitch.on && !locals.hotspots.anotherlightswitch.on && !locals.hotspots.yetanotherlightswitch.on ) {
            PlaySound('power-down');
            await HotspotSay('panel','*powering down*');
            locals.powerdown = true;
            await WaitSeconds(1);
            await Say('Hey I think the buzzing stopped!');
            await Say('Maybe I should not be playing with these buttons in the dark.');
        } else {
            if(locals.powerdown) {
                PlaySound('shock2');
                await HotspotSay('panel','*buzzing*');
                locals.powerdown = false;
            }
        }
    }
};

panel.click = async function( hotspot, locals ) {
    if( locals.powerdown ) {
        if( locals.panelfixed ) {
            await Say( 'Feels like it is fixed. I am quite impressed with my electrical work.');
        } else {
            if( hotspot.noticedwires ) {
                await Say( 'Okay I have tied the wires together...');
                await Say( '...I am really not much of an electrician.');
                hotspot.description = 'Inspect panel';
                locals.panelfixed  = true;
                locals.hotspots.lightswitch.description = "Use button";
                locals.hotspots.anotherlightswitch.description = "Use button";
                locals.hotspots.yetanotherlightswitch.description = "Use button"; 
                locals.codeposition = 0;
            } else {
                await Say( 'I think I can feel some loss wires...');
                await Say( '...they are not connected to anything.');
                hotspot.description = 'Connect wires';
                hotspot.noticedwires = true;
            }
        }
    } else if( hotspot.triedpanel ) {
        if( locals.hotspots.lightswitch.on || locals.hotspots.anotherlightswitch.on || locals.hotspots.yetanotherlightswitch.on) {
            if( !hotspot.hurtbypanel ) await Say( 'I cannot see anything...');
            HotspotEnable('yetanotherlightswitch');
            hotspot.i++;
            if( locals.hotspots.lightswitch.on ) {
                switch( Random(4) ) {
                    case 0: HotspotSay('lightswitch','*fizzle*'); break;
                    case 1: HotspotSay('lightswitch','*buzz*'); break;
                    case 2: HotspotSay('lightswitch','*spark*'); break;
                    case 3: HotspotSay('lightswitch','*crackle*'); break;
                }
                PlaySound('shock1');
                await WaitSeconds(0.5);
            }
            if( locals.hotspots.anotherlightswitch.on ) {
                switch( Random(4) ) {
                    case 0: HotspotSay('anotherlightswitch','*fizzle*'); break;
                    case 1: HotspotSay('anotherlightswitch','*buzz*'); break;
                    case 2: HotspotSay('anotherlightswitch','*spark*'); break;
                    case 3: HotspotSay('anotherlightswitch','*crackle*'); break;
                }
                PlaySound('shock1');
                await WaitSeconds(0.5);
            }
            if( locals.hotspots.yetanotherlightswitch.on ) {
                switch( Random(4) ) {
                    case 0: HotspotSay('yetanotherlightswitch','*fizzle*'); break;
                    case 1: HotspotSay('yetanotherlightswitch','*buzz*'); break;
                    case 2: HotspotSay('yetanotherlightswitch','*spark*'); break;
                    case 3: HotspotSay('yetanotherlightswitch','*crackle*'); break;
                }
                PlaySound('shock1');
                await WaitSeconds(0.5);
            }
            HotspotSay('start','panel','*zap*');
            PlaySound('shock2');
            await WaitSeconds(2);
            await Say( 'Ouch!');
            if( !hotspot.hurtbypanel ) await Say( 'What was that?!');
            if( hotspot.i == 3 ) await Say( 'I really need to stop the electricity first.');
            else if( hotspot.i == 6 ) await Say( 'I must be missing something.');
            else if( hotspot.i == 9 ) {
                await Say( 'I must be masocistic.');
                hotspot.i = 0;
            }
            hotspot.hurtbypanel = true;  
        }
    } else {
        await Say( 'Hang on a minute I think there is a panel on the wall here');
        hotspot.triedpanel = true;
        hotspot.description = 'Touch panel';
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
    await LoadSound('murder-scene.mp3') 
    + LoadSound('shock1.wav') 
    + LoadSound('shock2.wav') 
    + LoadSound('button.wav')
    + LoadSound('power-down.mp3')
    + LoadSound('error.aiff')
    + LoadSound('ding.wav');
    PlaySound('murder-scene', true);
};

room.exit = async function( locals ) {

};

scripts.clock = async function( locals ) {
    if(locals.clocktick === undefined || locals.clocktick == '*tock*' ) locals.clocktick = '*tick*';
    else locals.clocktick = '*tock*';
    Say( locals.clocktick );
};


scripts.main = async function( ) {
    DisableInterface();
    await EnterRoom('start');
    await WaitSeconds(1);
    await Say('Typical...');
    await Say('...I enter the one escape room where there is no light...');
    await Say('...there must be a light switch somewhere?');
    EnableInterface();
};