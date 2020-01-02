NewRoom('start');

NewHotspot('start','darkness', {
    x:0,
    y:0,
    width:100,
    height:100,
    description:'Peer into darkness',
    active:true
};


rooms.start.hotspots.darkness.onclick = async function( hotspot, room, hotspots ) {

}


rooms.start.enter = async function( room, hotspots ) {
    DisableInterface();
    await Say('Hello World!');
    await Say('This is an example of an enter script!');
    EnableInterface();
};

rooms.start.exit = async function( room, locals, hotspots  ) {

};