var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var gravity = 1;
var friction = 0.6;

function Ball(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color; 
    this.velocity = 0.05;
    this.dy = dy;

    this.update = function() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy;
            this.dy = this.dy * friction;
        } else {
            this.dy += gravity;
        }

        this.y += this.dy;

        //this.draw();
        findCollision(this);
        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}

var balls = [];

balls.push(new Ball(canvas.width /2, canvas.height / 2, 2, 30, 'green'));

function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => ball.update());
}

function findCollision(ball) {
    this.ball = ball;
    for (var i = 0; i < balls.length; i++) {

        if (balls[i] == this.ball) { 
            continue; 
        }

        resolveCollision(this.ball, balls[i]);
    }
}

function resolveCollision(ball1, ball2) {
    var dx = ball2.x - ball1.x;
    var dy = ball2.y - ball1.y;
    var distance = Math.sqrt((dx * dx) + (dy * dy));
    var minDistance = ball1.radius + ball2.radius;
    
    if (distance < minDistance)
    {
        var angle = Math.atan2(dy, dx),
            spread = minDistance - distance,
            ax = spread * Math.cos(angle),
            ay = spread * Math.sin(angle);

        ball1.x -= ax;
        ball1.y -= ay;
        
        var punch = 0.5;
                    
        ball1.dx -= punch * Math.cos(angle);
        ball1.dy -= punch * Math.sin(angle);
        ball2.dx += punch * Math.cos(angle);
        ball2.dy += punch * Math.sin(angle);
    }
}

//window.addEventListener('deviceorientation', handleOrientation);
// window.addEventListener('mousemove', event => {
//     mouse.x = event.clientX;
//     mouse.y = event.clientY;
// });

window.addEventListener('mousedown', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    balls.push(new Ball(event.clientX, event.clientY, 2, 30, 'rgb(25,' + (Math.random() * 255 + 1) + ', 25, 0.75)'));
});

const mouse = {
    x: innerWidth / 2,
    y: innerHeight /2
}

animate();
