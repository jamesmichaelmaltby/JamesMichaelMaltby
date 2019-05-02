

var width;
var height;
var con;
var maincon;
var inMemoryCanvas = document.createElement('canvas');
var canvas;

/*var mapCanvas;
var map;
var mapCanvasWidth = 256;
var mapCanvasHeight = 256;
var mapCanvasGrid = 16;
*/

var images = [
    {
        "src": "brick.jpg",
        "image":0
    },
    {
        "src": "wood.jpg",
        "image":0
    },
    {
        "src": "bush.jpg",
        "image":0
    },
    {
        "src": "wall.jpg",
        "image":0
    },
    {
        "src": "wallpic1.jpg",
        "image":0
    },
    {
        "src": "wallpic2.jpg",
        "image":0
    }

];
var imagesLoaded=false;

var loadImages = function(cb, imageURLarray, currentIndex){
    if (imageURLarray.length == 0 || imageURLarray.length == currentIndex) {cb();return;}
    if (typeof currentIndex == 'undefined'){
       currentIndex = 0;
    }
    imageURLarray[currentIndex].image = new Image();
    imageURLarray[currentIndex].image.onload = function(e) {
        loadImages(cb, images, currentIndex+1);
    };
    imageURLarray[currentIndex].image.src=imageURLarray[currentIndex].src;
   //  console.log(currentIndex+1 + " of " + imageURLarray.length + " " + imageURLarray[currentIndex].src);
}

loadImages(function() { 
    imagesLoaded=true;
}, images);


function SetupScreen() {
    var screenwidth = $(window).width();
    var screenheight = $(window).height();
    width = 800;
    height = 600;

    $("#mainCanvas").css("width", screenheight*1.5 + "px");
    $("#mainCanvas").css("height", (screenheight*1.5)*0.625 + "px"); 
    $("#mainCanvas").css("margin-top","3em"); 
    $("#mainCanvas").css("margin-bottom","0"); 
    $("#mainCanvas").css("margin-left","auto"); 
    $("#mainCanvas").css("margin-right","auto"); 

    canvas.width = width; 
    canvas.height = height;

    inMemoryCanvas.width = width;
    inMemoryCanvas.height = height;

    maincon=canvas.getContext("2d");
    con=inMemoryCanvas.getContext("2d");
    
    /*mapCanvas.width = mapCanvas.height = mapCanvasWidth; 
    map=mapCanvas.getContext("2d");*/


}

$(window).bind("resize", function(){
    SetupScreen();
});



var MapWidth=16,
    MapHeight=16,
    MapTileSize=64;

var CameraX = MapTileSize/2 + (MapWidth-2) * MapTileSize,
    CameraY = MapTileSize/2 + (MapHeight-2) * MapTileSize,
    CameraAngle = 0;

var world = [
    ['1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111'],
    ['1111',000000,'3333',000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,'1111'],
    ['1111',000000,'3333',000000,000000,000000,000000,000000,000000,000000,000000,000000,'3333',000000,000000,'1111'],
    ['1111',000000,'3333',000000,000000,'2442','2444','2444','2244',000000,000000,000000,'3333',000000,000000,'1111'],
    ['1111',000000,000000,000000,000000,'4442',000000,000000,'4244',000000,000000,000000,'3333','3333','3333','1111'],
    ['1111',000000,'3333',000000,000000,'6662',000000,000000,'4244',000000,000000,000000,'3333',000000,000000,'1111'],
    ['1111',000000,'3333',000000,000000,'5552',000000,000000,'4224',000000,000000,000000,'3333',000000,000000,'1111'],
    ['1111',000000,'3333',000000,000000,'4442',000000,000000,000000,000000,000000,000000,'3333',000000,000000,'1111'],
    ['1111',000000,'3333',000000,000000,'4422','4424','4424','2224',000000,000000,000000,000000,000000,000000,'1111'],
    ['1111',000000,'3333',000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,'1111'],
    ['1111',000000,'3333',000000,000000,000000,000000,000000,000000,000000,000000,000000,'3333',000000,000000,'1111'],
    ['1111','3333','3333','3333','3333','3333',000000,'3333','3333','3333','3333','3333','3333',000000,000000,'1111'],
    ['1111',000000,000000,'3333',000000,'3333',000000,'3333',000000,000000,000000,000000,000000,000000,000000,'1111'],
    ['1111',000000,000000,'3333',000000,'3333',000000,'3333',000000,000000,000000,000000,000000,000000,000000,'1111'],
    ['1111',000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,'1111'],
    ['1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111','1111']      
];



function LightenDarkenColor(col,amt) {
    col = parseInt(col,16);
    return (((col & 0x0000FF) + amt) | ((((col>> 8) & 0x00FF) + amt) << 8) | (((col >> 16) + amt) << 16)).toString(16);
}

function drawSlither(slither, wallheight, texture, tx, flag) {
    tx = (tx * 8) | 0;
    //console.log(texture);
    con.fillStyle="#000";
    con.fillRect(slither,height/2-wallheight/2,1,wallheight);
    
    if(imagesLoaded) {
        if(flag) con.globalAlpha = 0.75;
        else con.globalAlpha = 1.0;
        con.drawImage(
            images[texture-1].image, 
                tx, 0, 
                    1, 512, 
                slither, height/2-wallheight/2,
                    1, wallheight
            );
    }
}

function lineDistance( x1,y1, x2,y2 )
{
  var xs = 0;
  var ys = 0;
 
  xs = x2 - x1;
  xs = xs * xs;
 
  ys = y2 - y1;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

var mapPoints = [];
var mapVPoints = [];
var mapHits = [];

/*
    THIS IS THE BIGGY - THE MFing FUNCTION OF ALL MFing FUNCTIONS 
    EVERY LINE OF CODE HAS TO BE PERFECT OTHERWISE THIS WILL NOT WORK
    DO NOT F IT UP JAMES
*/
function drawView() {

        // Motion Blur - Much Slower
   // con.fillStyle = 'rgba(255,255,255,0.6)';
    //con.fillRect(0, 0, width, height)

   // con.clearRect(0,0,width,height);

   var gradient1 = con.createLinearGradient(0,0,0,height);
   gradient1.addColorStop(0, 'rgb(196,196,255)');
   gradient1.addColorStop(1, 'rgb(128,128,128)');
   con.fillStyle = gradient1;
   con.fillRect(0, 0, width, height/2);

   var gradient2 = con.createLinearGradient(0,0,0,height);
   gradient2.addColorStop(0, 'rgb(225,225,225)');
   gradient2.addColorStop(1, 'rgb(64,64,64)');

   con.fillStyle = gradient2;
   con.fillRect(0, height/2, width, height/2)


    
    var gx,gy,gd;
    var CameraGridX = CameraX/MapTileSize | 0;
    var CameraGridY = CameraY/MapTileSize | 0;
    var hray = true,vray=true;
    var hdist=0, vdist=0;

    var fov = Math.PI/3;
    var dangle = fov / width;
    var ang = CameraAngle - fov/2;
    var htexture,vtexture,texture;

    for(var i=0;i<width;i++)
    {

    if(ang > Math.PI*2) ang-=Math.PI*2;
    else if(ang < 0) ang+=Math.PI*2;




        hray = true;
        gx = gy = rx = ry = rgx = rgy = gd = 0;
        wallheight = 0;

        rx=CameraX;ry=CameraY;

   // $("#debug1").html("<br/>Camera: " + CameraX + ", " + CameraY + "<br/>Angle: " + ang + "rad ");

    /* Horizontal Collisions */ 
   
    if(ang != Math.PI/2 && ang != 3*Math.PI/2) {
        // Find first collission with horizontal axis
        if(ang < Math.PI/2 || ang > 3*Math.PI/2) {
            // If we are facing upwards we check the box above
            gy = CameraGridY*MapTileSize - CameraY; // Difference between current camera position and horizontal
            gd = -1;
        } else {
            // If we are facing upwards we check the box below
            gy = (CameraGridY+1)*MapTileSize - CameraY; // Difference between current camera position and horizontal
            gd = 1;
        }
        gx = -1 * gy * Math.tan(ang);

        rx += gx;
        ry += gy;
    } else {
        hray=false;
    }
    if(Math.abs(gx) > MapWidth*MapTileSize) hray=false;
    if(!hray) {
       //$("#debug2").html("H-Ray: none");
    }
    else {
        gy = gd * MapTileSize;
        gx = -1 * gy * Math.tan(ang);

        while(1) {
            //mapPoints.push( {"x":rx,"y":ry} );

            rgx = rx/MapTileSize | 0;
            rgy = ry/MapTileSize | 0;
            if(gd==-1) {rgy--;}

            if(rgx<0 || rgx>=MapWidth) {hray=false; break;}
            if(rgy<0 || rgy>=MapHeight) {hray=false; break;}

            if(world[rgy][rgx]) break;
            else {
                rx += gx;
                ry += gy;
            }
        }
        if(hray) htexture = world[rgy][rgx];

       // $("#debug2").html(""+ "HRay: " + rx + ", " + ry);

        //mapHits.push( {"x":rgx,"y":rgy} );
        hdist = lineDistance(CameraX,CameraY,rx,ry);
        htx = rx%MapTileSize;
    }
    
    southflag = true;
    if( gy>0 ) {
        southflag = false;
    }


/* Vertical Collisions */ 
        vray=true;
        gx = gy = rx = ry = rgx = rgy = gd = 0;
        wallheight = 0;

        rx=CameraX;ry=CameraY;



    if(ang != 0 && ang != Math.PI) {
        /* Find first collission with horizontal axis */
        if(ang >0 && ang < Math.PI) {
            // If we are facing rightwards we check the box above
            gx = (CameraGridX+1)*MapTileSize - CameraX; // Difference between current camera position and horizontal
            gd = 1;
        } else {
            // If we are facing lefwards we check the box below
            gx = (CameraGridX)*MapTileSize - CameraX; // Difference between current camera position and horizontal
            gd = -1;
        }
        gy = gx / Math.tan(ang);

        rx += gx;
        ry -= gy;
    } else {
        vray=false;
    }
    if(Math.abs(gy) > MapWidth*MapTileSize) vray=false;
    if(!vray) {
      //  $("#debug3").html("" + "V-Ray: none");
    }
    else {

       
        gx = gd * MapTileSize;
        gy = gx / Math.tan(ang);

        while(1) {
          // mapVPoints.push( {"x":rx,"y":ry} );

            rgx = rx/MapTileSize | 0;
            rgy = ry/MapTileSize | 0;
            if(gd==-1) {rgx--;}
            if(rgx<0 || rgx>=MapWidth) {vray=false; break;}
            if(rgy<0 || rgy>=MapHeight) {vray=false; break;}

            

            if(world[rgy][rgx]) break;
            else {
                rx += gx;
                ry -= gy;
            }
        }
        if(vray) vtexture = world[rgy][rgx];

         // $("#debug3").html(""+ "VRay: " + rx + ", " + ry);

        //mapHits.push( {"x":rgx,"y":rgy} );

        vdist = lineDistance(CameraX,CameraY,rx,ry);
        vtx = ry%MapTileSize;
    }

    eastflag = true;
    if( gx>0 ) {
        eastflag = false;
    }

    texture=htexture;
    if(texture) {
        if(southflag) texture=parseInt(htexture.charAt(2));
        else texture=parseInt(htexture.charAt(0));
    }

    flag = false;

    if(hray && vray) {
      // $("#debug4").html("Horizontal Distance: " + hdist + "<br/>Vertical Distance: " + vdist);
        if(vdist<hdist) {
            dist=vdist;
            tx = vtx;
            texture=vtexture;
            if(texture) {
                if(eastflag) texture=parseInt(vtexture.charAt(1));
                else texture=parseInt(vtexture.charAt(3));
            }
            flag=true;
        } else {
            dist=hdist;
            tx=htx;
        }

    }
    else if (hray) {
        dist = hdist;
        tx = htx;
       // $("#debug4").html("Distance: " + hdist);
    } else if (vray) {
        dist = vdist;
       // $("#debug4").html("Distance: " + vdist);
       texture=vtexture;
       if(texture) {
            if(eastflag) texture=parseInt(vtexture.charAt(1));
            else texture=parseInt(vtexture.charAt(3));
        }
       tx=vtx;
       flag=true;
    }

    $("#debug4").html("Distance: " + dist);

    dist = dist * Math.cos(ang-CameraAngle);
    wallheight = 64/dist * ((width/2) / Math.tan(fov/2));

    drawSlither(i,wallheight,texture,tx, flag);

    ang +=dangle;
}

}


function drawMap() {
    
    map.fillStyle="#fcfcfc";
    map.fillRect(0,0,mapCanvasWidth,mapCanvasHeight);
    

    map.fillStyle="#999";
    for(i=0;i<MapWidth;i++) {
        for(j=0;j<MapHeight;j++) {
            if( world[j][i] ) {
                map.fillRect(
                    i*mapCanvasGrid,
                    j*mapCanvasGrid,
                    mapCanvasGrid,
                    mapCanvasGrid);
            }
        }
    }




    for (var i = 0; i < mapHits.length; i++) {
        var xy = mapHits[i];
        map.fillStyle="#bbb";
        map.fillRect(
                    xy.x*mapCanvasGrid,
                    xy.y*mapCanvasGrid,
                    mapCanvasGrid,
                    mapCanvasGrid);
    }


    for (var i = 0; i < mapPoints.length; i++) {
        var xy = mapPoints[i];
       rayx = xy.x/MapTileSize*mapCanvasGrid;
       rayy = xy.y/MapTileSize*mapCanvasGrid;
         map.beginPath();
         map.moveTo(rayx - mapCanvasGrid/5, rayy);
         map.lineTo(rayx + mapCanvasGrid/5, rayy);
         map.strokeStyle="#60f";
         map.lineWidth=1;
         map.stroke();
         map.closePath();
        
    }


    for (var i = 0; i < mapVPoints.length; i++) {
        var xy = mapVPoints[i];
       rayx = xy.x/MapTileSize*mapCanvasGrid;
       rayy = xy.y/MapTileSize*mapCanvasGrid;
         map.beginPath();
         map.moveTo(rayx, rayy - mapCanvasGrid/5);
         map.lineTo(rayx, rayy + mapCanvasGrid/5);
         
         map.strokeStyle="#f05";

         map.lineWidth=1;
         map.stroke();
         map.closePath();
        
    }

    mapPoints=[];
    mapVPoints=[];
    mapHits=[];

    drawPointer();
}

function drawPointer() {
    var X = CameraX/MapTileSize * mapCanvasGrid;
    var Y = CameraY/MapTileSize * mapCanvasGrid;

    var dx = mapCanvasGrid/2 * Math.sin(CameraAngle);
    var dy = mapCanvasGrid/2 * Math.cos(CameraAngle);

  map.beginPath();
         map.moveTo(X, Y);
         map.lineTo(X+dx, Y-dy);
         map.strokeStyle="#222";
         map.lineWidth=1;
         map.stroke();
         map.closePath();

    map.beginPath();
    map.arc(X, Y, 2, 0, Math.PI*2, true); 
    map.fillStyle="#222";
    map.fill();
    map.closePath();
}

var key_left = false;
var key_right = false;
var key_forward = false;
var key_back = false;



function draw() {

    if ( key_left ) { 
        CameraAngle-=Math.PI/32;
        if(CameraAngle < 0) CameraAngle+=Math.PI*2;
    } else if ( key_right ) { 
        CameraAngle+=Math.PI/32;
        if(CameraAngle > Math.PI*2) CameraAngle-=Math.PI*2;
    }

    if ( key_forward ) {
        var dx = MapTileSize/8 * Math.sin(CameraAngle);
        var dy = MapTileSize/8 * Math.cos(CameraAngle);

        var dx1 = MapTileSize/8 * Math.sin(CameraAngle + Math.PI/6);
        var dy1 = MapTileSize/8 * Math.cos(CameraAngle + Math.PI/6);

        var dx2 = MapTileSize/8 * Math.sin(CameraAngle - Math.PI/6);
        var dy2 = MapTileSize/8 * Math.cos(CameraAngle - Math.PI/6);

        CameraX += dx;
        if(CameraX<0 || CameraX > MapWidth*MapTileSize) {
            CameraX -= dx;
        }
        else {
            //GridX = ((CameraX+3*dx)/MapTileSize) | 0;
            //GridY = ((CameraY-3*dy)/MapTileSize) | 0; 
            //if(world[GridY][GridX]) CameraX -= dx;
            //else {
                GridX = ((CameraX+3*dx1)/MapTileSize) | 0;
                GridY = ((CameraY-3*dy1)/MapTileSize) | 0; 
                if(world[GridY][GridX]) CameraX -= dx;
                else {
                    GridX = ((CameraX+3*dx2)/MapTileSize) | 0;
                    GridY = ((CameraY-3*dy2)/MapTileSize) | 0; 
                    if(world[GridY][GridX]) CameraX -= dx;
                }
            //}
        }

        CameraY -= dy;
        if(CameraY<0 || CameraY > MapHeight*MapTileSize) {
            CameraY += dy;
        }
        else {
            //GridX = ((CameraX+3*dx)/MapTileSize) | 0;
           // GridY = ((CameraY-3*dy)/MapTileSize) | 0; 
            //if(world[GridY][GridX]) CameraY += dy;
            //else {
                GridX = ((CameraX+3*dx1)/MapTileSize) | 0;
                GridY = ((CameraY-3*dy1)/MapTileSize) | 0; 
                if(world[GridY][GridX]) CameraY += dy;  
                else {
                    GridX = ((CameraX+3*dx2)/MapTileSize) | 0;
                     GridY = ((CameraY-3*dy2)/MapTileSize) | 0; 
                    if(world[GridY][GridX]) CameraY += dy;
                }
            //} 
        }
        
    } else if (key_back) {
        var dx = MapTileSize/16 * Math.sin(CameraAngle);
        var dy = MapTileSize/16 * Math.cos(CameraAngle);

        var dx1 = MapTileSize/16 * Math.sin(CameraAngle+ Math.PI/6);
        var dy1 = MapTileSize/16 * Math.cos(CameraAngle+ Math.PI/6);

        var dx2 = MapTileSize/16 * Math.sin(CameraAngle- Math.PI/6);
        var dy2 = MapTileSize/16 * Math.cos(CameraAngle- Math.PI/6);


        CameraX -= dx;
        if(CameraX<0 || CameraX > MapWidth*MapTileSize) {
            CameraX += dx;
        }
        else {
           // GridX = ((CameraX-6*dx)/MapTileSize) | 0;
            //GridY = ((CameraY+6*dy)/MapTileSize) | 0; 
           // if(world[GridY][GridX]) CameraX += dx;
           // else {
                GridX = ((CameraX-6*dx1)/MapTileSize) | 0;
                GridY = ((CameraY+6*dy1)/MapTileSize) | 0; 
                if(world[GridY][GridX]) CameraX += dx;
                else {
                    GridX = ((CameraX-6*dx2)/MapTileSize) | 0;
                    GridY = ((CameraY+6*dy2)/MapTileSize) | 0; 
                    if(world[GridY][GridX]) CameraX += dx;
                }
           // }
        }

        CameraY += dy;
        if(CameraY<0 || CameraY > MapHeight*MapTileSize) {
            CameraY -= dy;
        }
        else {
           // GridX = ((CameraX-6*dx)/MapTileSize) | 0;
          //  GridY = ((CameraY+6*dy)/MapTileSize) | 0; 
           // if(world[GridY][GridX]) CameraY -= dy;
           // else {
                GridX = ((CameraX-6*dx1)/MapTileSize) | 0;
                GridY = ((CameraY+6*dy1)/MapTileSize) | 0; 
                if(world[GridY][GridX]) CameraY -= dy;  
                else {
                    GridX = ((CameraX-6*dx2)/MapTileSize) | 0;
                    GridY = ((CameraY+6*dy2)/MapTileSize) | 0; 
                    if(world[GridY][GridX]) CameraY -= dy;
                }
          //  }
        }

    }

    //drawMap();
    drawView();
    maincon.drawImage(inMemoryCanvas, 0, 0);
    requestAnimationFrame(draw);
}






$(document).on('keydown', function(e) {
    var keydown=e.which;
    if( keydown == 37) key_left=true;
    if( keydown == 39) key_right=true;

    if( keydown == 38) key_forward=true;
    if( keydown == 40) key_back=true;
    
}).on('keyup', function(e){
    var keydown=e.which;
    if( keydown == 37) key_left=false;
    if( keydown == 39) key_right=false;

    if( keydown == 38) key_forward=false;
    if( keydown == 40) key_back=false;
});







(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


(function() {

    canvas = document.getElementById('mainCanvas');
    // mapCanvas = document.getElementById('map');
    SetupScreen();
    requestAnimationFrame(draw);
}());

