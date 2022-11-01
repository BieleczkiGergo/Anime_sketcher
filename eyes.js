

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

function drawEyeFrame2( sx, sy, w, h, inSlope, outSlope, curve, bump ){
    //Starting point, width, height, inner slope, outer slope, curve
    //Evaluate points
    let e1x = sx + w/(2+outSlope);
    let e1y = sy - outSlope*h*0.7;
    let e2x = sx - w/(2+inSlope);
    let e2y = sy - inSlope*h;


    let p1x, p1y, p2x, p2y; {
        let p1a = (Math.PI/2)/3 + Math.atan((e1y-e2y) / (e1x-e2x));
        let p1l = h * curve * 1;
        p1x = e2x + Math.sin(p1a) * p1l;
        p1y = e2y + Math.cos(p1a) * p1l;
        p2x = sx - w*0.2*curve;
        p2y = sy;
    }

    let p3x = sx + w/6;
    let p3y = sy + h/50;
    let p4x = e1x + w/100;
    let p4y = e1y + h/6;

    let p5x, p5y, p6x, p6y; {
        let c = [w/2, 1-bump, 1, Math.abs(0.5-bump)];

        p5x = e1x - ( c[0] * c[1] - c[3] );
        p5y = e1y - ( c[1] * h * curve * c[2] );
        p6x = e2x + ( bump * c[0] * c[3] );
        p6y = e2y - ( bump * h * curve - c[2] );
        
    }
    
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

