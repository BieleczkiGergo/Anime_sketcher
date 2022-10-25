

ctx = 0;

function setup(){
    canvas = document.getElementById("sketch");
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        
    }

    
}

function drawTest(){
    drawEyeFrame(20, 40);

}

function drawEyeFrame(sx, sy, w, h){
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.bezierCurveTo(0, 0, 0, 0, w, h);


    ctx.closePath();
    ctx.stroke();
}

setup();
drawTest();

