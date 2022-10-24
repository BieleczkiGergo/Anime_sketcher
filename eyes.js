

ctx = 0;

function setup(){
    canvas = document.getElementById("sketch");
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        
    }

    
}

function drawTest(){
    ctx.beginPath();
    ctx.moveTo(20, 40);
    ctx.quadraticCurveTo(60, 0, 80, 17);
    
    ctx.stroke();

}

setup();
drawTest();