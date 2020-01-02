let start = Room('start');

let darkness = Hotspot('darkness', {
    x:0,
    y:0,
    width:100,
    height:100,
    description:'Peer into darkness',
    active:true
});

darkness.click = async function( hotspot, locals ) {
    await Say('Hello darkness my old friend');
};


start.enter = async function( locals ) {
    DisableInterface();
    await Say('Hello World!');
    await Say('This is an example of an enter script!');
    EnableInterface();
    HotspotClick('start','darkness');
};

start.exit = async function( locals ) {

};
