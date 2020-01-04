

async function StartScript(script, loop, resume) {
    if( scripts.running[script] ) return;
    if( scripts[script] ) {
        if( globals.scripts[script] === undefined ) {
            globals.scripts[script] = {
                counter:0,
                maxcounter:0,
                iterations:0,
                maxiterations:0,
                break:false,
                flag:false,
                loop: loop,
                room: globals.currentRoom
            };
        } else {
            if(resume) {
                loop = globals.scripts[script].loop;
            } else {
                globals.scripts[script].break = false;
                globals.scripts[script].iterations = 0;
                globals.scripts[script].maxcounter = 0;
                globals.scripts[script].room = globals.currentRoom;
            }
        }

        if( loop ) {
            if( loop == 'infinite' ) globals.scripts[script].maxiterations = -1;
            else globals.scripts[script].maxiterations = loop;
        } else {
            globals.scripts[script].maxiterations = 0;
        }

        async function RunScript() {
            var stopscript = false;
            globals.scripts.running[script] = true;
            scripts.running[script] = true;
            await scripts[script]( globals.scripts[script] );
    
            globals.scripts[script].counter++;
            if( globals.scripts[script].counter >= globals.scripts[script].maxcounter ) globals.scripts[script].counter = 0;

            globals.scripts[script].iterations++;
            if( globals.scripts[script].break ) stopscript = true;
            if( globals.scripts[script].maxiterations == 0 ) stopscript = true;
            else if( globals.scripts[script].maxiterations != -1 && globals.scripts[script].iterations >= globals.scripts[script].maxiterations ) {
                stopscript = true;
            }

            if( stopscript ) {
                delete globals.scripts.running[script];
                delete scripts.running[script];
                return;
            } else {
                setTimeout(RunScript,1000);
            }
        }
        RunScript();
    }
}
