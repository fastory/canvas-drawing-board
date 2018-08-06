var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
autoSetCanvasSize(canvas);

/*************/
ListenToMouse(canvas);
/*******/

var eraserEnabled = false;
eraser.onclick = function () {
    eraserEnabled = true;
    actions.className = 'actions x'
}

brush.onclick = function () {
    eraserEnabled = false;
    actions.className = 'actions'
}

/****/



function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.fillStyle = 'black'
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = 'black'
    ctx.moveTo(x1, y1);
    ctx.lineWidth = 5;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function ListenToMouse(canvas) {

    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    };

    canvas.onmousedown = function (msg) {
        var x = msg.clientX
        var y = msg.clientY
        using = true;
        if (eraserEnabled) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                x: x,
                y: y
            }
        }
    }
    
    canvas.onmousemove = function (msg) {
        var x = msg.clientX
        var y = msg.clientY
        if (!using) {
            return
        }

        if (eraserEnabled) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                x: x,
                y: y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    }

    canvas.onmouseup = function (msg) {
        using = false
    }
}