var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var gravityX = 0;
var gravityY = 90;

function Circle(x, y, dx, dy, radius, red, green, blue, opacity) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;

    this.draw = function() {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        var v = Math.random() * 3;

        if (v == 1) {
          if (this.red == 255) {
            red=0;
          }
          red++;
        }

        if (v == 2) {
          if (this.green == 255) {
            green=0;
          }
          green++;
        }

        if (v == 3) {
          if (this.blue == 255) {
            blue=0;
          }
          blue++;
        }

        var rgb = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ', ' + this.opacity + ')';

        c.strokeStyle = rgb;
        c.fillStyle = rgb;
        c.stroke();
        c.fill();
    }

    this.intersects = function(overlapX, overlapY, overlapRadius) {
        // var dxx = this.x - overlapX;
        // var dyy = this.y - overlapY;

        // var distance = Math.sqrt((dxx * dxx) + (dyy * dyy));

        // return distance <= (this.radius + overlapRadius);

        var xd = this.x - overlapX;
        var yd = this.y - overlapY;

        var sumRadius = this.radius + overlapRadius;
        var  sqrRadius = sumRadius * sumRadius;
    
        var  distSqr = (xd * xd) + (yd * yd);
    
        if (distSqr <= sqrRadius)
        {
            return true;
        }
    
        return false;    
    }
}

var circleArray = [];
var totalBalls = Math.random() * 50 + 2;
var totalRadius = Math.random() * 50 + 2;

for (var i = 0; i < totalBalls; i ++) {
    var radius = Math.random() * totalRadius;
    var x = 0;
    var y = 0;
    var checkCount = 0;

    // ensure balls are not placed on top of each other
    do {
        x = Math.random() * (innerWidth - radius * 2) + radius;
        y = Math.random() * (innerHeight - radius * 2) + radius;
        checkCount ++;
    } 
    while (checkCount < 100 && findEmptyPlace(i, x, y, radius))

    // create params for a new ball
    var dx = (Math.random() * 0.2);
    var dy = (Math.random() * 0.2);

    var red = Math.random() * 255  + 5;
    var green = Math.random() * 255 + 5;
    var blue = Math.random() * 255 + 5;
    var opacity = 1; //Math.random();

    // add a new ball to the array
    circleArray.push(new Circle(x, y, dx, dy, radius, red, green, blue, opacity));  
}

function findEmptyPlace(i, x, y, radius) {
    for (var j = 0; j < i; j++) {
        var circ = circleArray[j];
        if (circ.intersects(x, y, radius)) {
            return true;
        }
    }
    return false;
}

function moveBalls() {
    for (var i = 0; i < circleArray.length; i++) {
        for (var j = i + 1; j < circleArray.length; j++) {

            var ca = circleArray[i];
            var cx = circleArray[j];

            if (ca.x + ca.radius > innerWidth || ca.x - ca.radius < 0) {
                ca.dx = -ca.dx;
            }
        
            if (ca.y + ca.radius > innerHeight || ca.y - ca.radius < 0) {
                ca.dy = -ca.dy;
            }

            ca.x += ca.dx;
            ca.y += ca.dy;
            
            resolveCollision(ca, cx);
        }
    }
}

function drawBalls() {
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
    }
}

function resolveCollision(ball1, ball2) {
    var xd = ball2.x - ball1.x;
    var yd = ball2.y - ball1.y;
    var distance = Math.sqrt(xd * xd + yd * yd);
    var minDistance = ball1.radius + ball2.radius;
    
    if (distance < minDistance)
    {
        var angle = Math.atan2(yd, xd);
        var spread = minDistance - distance;
        var ax = spread * Math.cos(angle);
        var ay = spread * Math.sin(angle);

        ball1.x -= ax;
        ball1.y -= ay;
        
        var punch = 2;
                    
        ball1.dx -= punch * Math.cos(angle) * 0.02;
        ball1.dy -= punch * Math.sin(angle) * 0.02;
        ball2.dx += punch * Math.cos(angle) * 0.02;
        ball2.dy += punch * Math.sin(angle) * 0.02;
    }
}

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;

  // Do stuff with the new orientation data
  gravityX = beta;
  gravityY = gamma;
}

var totalFrames = -1;
var frameCount = 0;

function animate() {

    if (frameCount < totalFrames || totalFrames == -1)
    {
        requestAnimationFrame(animate);
        frameCount++;
    }

    c.clearRect(0, 0, innerWidth, innerHeight);

    moveBalls();
    drawBalls();
}

//window.addEventListener('deviceorientation', handleOrientation);
animate();
