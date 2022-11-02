

let ctx = 0;
let helpers = false;

function setup(){
    canvas = document.getElementById("sketch");
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        
    }

    
}

function setting() {
    helpers = document.getElementById("helpers-check").checked;
    redraw();

}

function eyeFrameTop(sx, sy, h, w, curve, bump, ex, ey){

}

function eyeFrameIn(sx, sy, w, h, curve, ex, ey){

}

function eyeFrameOut(){

}

function bezierSlice(sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey, t){

    return [
        //Starting coordinates
        sx, 
        sy,
        //p1 coordinates
        (1-t)*sx + t*cp1x,
        (1-t)*sy + t*cp1y,
        //p2 coordinates
        Math.pow(1-t, 2)*sx + 2*t*(1-t)*cp1x + Math.pow(t, 2)*cp2x,
        Math.pow(1-t, 2)*sy + 2*t*(1-t)*cp1y + Math.pow(t, 2)*cp2y,
        //end coordinates
        Math.pow(1-t, 3)*sx + 3*Math.pow(1-t, 2)*t*cp1x + 3*(1-t)*Math.pow(t, 2)*cp2x + Math.pow(t, 3)*ex,
        Math.pow(1-t, 3)*sy + 3*Math.pow(1-t, 2)*t*cp1y + 3*(1-t)*Math.pow(t, 2)*cp2y + Math.pow(t, 3)*ey,
    ]
}

function drawEyeFrame(sx, sy, w, h, upperSlope, curve, bottomSlope){
    
}

function drawEyeFrame2( sx, sy, w, h, inSlope, outSlope, curve, bump ){
    //Starting point, width, height, inner slope, outer slope, curve, bump
    //Evaluate points
    let e1x = sx + w/(2+outSlope);
    let e1y = sy - outSlope*h*0.7;
    let e2x = sx - w/(2+inSlope);
    let e2y = sy - inSlope*h;


    let [p1x, p1y, p2x, p2y] = eyeFrameIn();

    let [p3x, p3y, p4x, p4y] = eyeFrameOut();

    let [p5x, p5y, p6x, p6y] = eyeFrameTop();
    
    
    /*Help stuff*/ 
    if(helpers) {
        markPoint(e1x, e1y, "blue");
        markPoint( p1x, p1y );
        markPoint( p2x, p2y );
        markPoint(sx, sy, "purple");
        markPoint( p3x, p3y, "purple");
        markPoint( p4x, p4y );
        markPoint(e2x, e2y, "red");
        markPoint( p5x, p5y );
        markPoint( p6x, p6y );


        ctx.beginPath();
        ctx.moveTo( e1x, e1y );
        ctx.lineTo( sx, sy );
        ctx.lineTo( e2x, e2y );

        ctx.closePath();
        ctx.stroke();
    }

    /*Draw*/ {
        ctx.beginPath();
        ctx.moveTo( e2x, e2y );
        ctx.bezierCurveTo( p1x, p1y, p2x, p2y, sx, sy );
        ctx.bezierCurveTo( p3x, p3y, p4x, p4y, e1x, e1y );
        ctx.bezierCurveTo( p5x, p5y, p6x, p6y, e2x, e2y );
        
        ctx.stroke();
    }

    console.log("X: " + sx);
    console.log("Y: " + sy);
    console.log("e1x: " + e1x);
    console.log("e1y: " + e1y);

}

function markPoint( x, y, color="red" ){
    let size = 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    
    ctx.moveTo(x-size, y-size);
    ctx.lineTo(x+size, y-size);
    ctx.lineTo(x+size, y+size);
    ctx.lineTo(x-size, y+size);

    ctx.fill();

}

function redraw(){
    //Get input
    let inSlope = parseInt( document.getElementById("inner-slope-slider").value ) / 100;
    let curve = parseInt( document.getElementById("curve-slider").value ) / 75;
    let outSlope = parseInt( document.getElementById("outer-slope-slider").value ) / 100;
    let x = parseInt( document.getElementById("X-pos-slider").value );
    let y = parseInt( document.getElementById("Y-pos-slider").value );
    let bump = parseInt( document.getElementById("bump-pos-slider").value ) / 100;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 700, 300);
    drawEyeFrame2(x, y, 160, 40, inSlope, outSlope, curve, bump);
    /*drawEyeFrame(80, 120, 160, 40, upperSlope, curve, bottomSlope);*/

}

setup();
redraw();

