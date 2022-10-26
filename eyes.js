

ctx = 0;

function setup(){
    canvas = document.getElementById("sketch");
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        
    }

    
}

function drawTest(){
    drawEyeFrame(20, 40, 80, 10, 0.6, 3);

}

function drawEyeFrame(sx, sy, w, h, slope, upCurve){
    //Starting x & y position, width, height, eye slope
    //Evaluate points for bezier curves
    let cp1x = sx+ w*(1/5);
    let cp1y = sy - h*upCurve;
    let cp2x = sx + w - w*(1/5/slope);
    let cp2y = sy - h*upCurve;

    //Mark points
    markPoint(cp1x, cp1y);
    markPoint(cp2x, cp2y);

    //Draw object
    //Begin path
    ctx.beginPath();
    ctx.moveTo(sx, sy);

    //Upper curve
    ctx.bezierCurveTo(
        cp1x,        //control point 1 x
        cp1y,     //control point 1 y
        cp2x,       //control point 2 x
        cp2y,     //control point 2 y
        sx+w,               //end point x
        sy - slope*h        //end point y
    );


    ctx.closePath();
    ctx.stroke();
}

function markPoint(x, y){
    let size = 2;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(x-size, y-size);
    ctx.lineTo(x+size, y-size),
    ctx.lineTo(x+size, y+size);
    ctx.lineTo(x-size, y+size);

    ctx.closePath();
    ctx.fill();

}

setup();
drawTest();

