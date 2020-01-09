var gameconsole = document.getElementById('console');
var gamescreen = document.getElementById('gamescreen');
var roomarea = document.getElementById('roomarea');
var main = document.getElementById('main');
var hover = document.getElementById('hover');

var scripts = {
    running : {}
};
var rooms = {};
var resources = {
    audio:{},
    backgrounds:{}
};
var game = {
    interfaceLocked:true
};
var globals = {
    rooms : {},
    scripts: {
        running: {}
    },
    sounds : {}
};
var defaultGlobals;