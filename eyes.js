

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
    let e2y = sy + e2x/bottomSlope;
    let cp3x = e1x + w/curve;
    let cp3y = e1y + h/5;
    let cp4x = e2x + w*(1/curve);
    let cp4y = e2y;

    //Mark points
    markPoint(cp1x, cp1y);
    markPoint(cp2x, cp2y);
    markPoint(cp3x, cp3y);
    markPoint(cp4x, cp4y);

    //Draw object
    //Begin path
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;
    ctx.moveTo(sx, sy);

    //Upper curve
    ctx.bezierCurveTo( cp1x, cp1y, cp2x, cp2y, e1x, e1y );
    ctx.moveTo( e1x, e1y );
    ctx.bezierCurveTo( cp3x, cp3y, cp4x, cp4y, e2x, e2y );

    //Draw out
    ctx.stroke();
    ctx.closePath();
}

function drawEyeFrame2( sx, sy, w, h, inSlope, outSlope, curve ){
    //Starting point, width, height, inner slope, outer slope, curve
    //Evaluate points
    //Set1: inner bézier
    let e1x = sx - (1/inSlope)*w/2;
    let e1y = sy - inSlope*h;
    
    
    markPoint(e1x, e1y, "blue");
    markPoint(sx, sy, "purple");

}

function markPoint(x, y, color="red"){
    let size = 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    
    ctx.moveTo(x-size, y-size);
    ctx.lineTo(x+size, y-size),
    ctx.lineTo(x+size, y+size);
    ctx.lineTo(x-size, y+size);
    ctx.lineTo(x-size, y-size);

    ctx.fill();

}

function redraw(){
    //Get input
    let inSlope = document.getElementById("inner-slope-slider").value / 100;
    let curve = document.getElementById("curve-slider").value / 10;
    let outSlope = document.getElementById("outer-slope-slider").value / 100;
    let x = document.getElementById("X-pos-slider").value;
    let y = document.getElementById("Y-pos-slider").value;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 700, 300);
    drawEyeFrame2(x, y, 160, 40, inSlope, outSlope, curve);
    /*drawEyeFrame(80, 120, 160, 40, upperSlope, curve, bottomSlope);*/

}

setup();
redraw();

