

ctx = 0;

function setup(){
    canvas = document.getElementById("sketch");
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        
    }

    
}

function drawTest(){
    drawEyeFrame(20, 40, 80, 10, 0.6, 2);

}

function drawEyeFrame(sx, sy, w, h, slope, upCurve){
    //Starting x & y position, width, height, eye slope
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.bezierCurveTo(
        sx+ w*(1/5),        //control point 1 x
        sy - h*upCurve,     //control point 1 y
        sx + w*(4/10)*slope,       //control point 2 x
        sy - h*upCurve*2,     //control point 2 y
        sx+w,               //end point x
        sy - slope*h        //end point y
    );


    ctx.closePath();
    ctx.stroke();
}

setup();
drawTest();

