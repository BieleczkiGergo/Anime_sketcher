

ctx = 0;

function setup(){
    canvas = document.getElementById("sketch");
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        
    }

    
}

function drawEyeFrame(sx, sy, w, h, upperSlope, curve, bottomSlope){
    //Starting x & y position, width, height, eye slope
    //Evaluate points for bézier curves
    //Set1: upper bézier
    let e1x = sx+w;
    let e1y = sy - upperSlope*h;
    let cp1x = sx+ w*(1/5);
    let cp1y = sy - h*curve;
    let cp2x = sx + w - w*(1/5/upperSlope);
    let cp2y = sy - h*curve;
    //Set2: outer bézier
    let e2x = w + w/2;
    let e2y = y + e2x/bottomSlope;
    let cp3x = 

    //Mark points
    markPoint(cp1x, cp1y);
    markPoint(cp2x, cp2y);

    //Draw object
    //Begin path
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.moveTo(sx, sy);

    //Upper curve
    ctx.bezierCurveTo( cp1x, cp1y, cp2x, cp2y, e1x, e1y );



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

function redraw(){
    //Get input
    let upperSlope = document.getElementById("upper-slope-slider").value / 100;
    let curve = document.getElementById("curve-slider").value / 10;
    let bottomSlope = document.getElementById("bottom-slope-slider").value / 100;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 700, 300);
    drawEyeFrame(80, 120, 160, 40, upperSlope, curve);

}

setup();
redraw();

