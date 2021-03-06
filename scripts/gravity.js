var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var drawImageX = 125;
var drawImageY = 100;
var collisionRadiusY = 40;
var images = ["pan", "tomato", "shrimp"];

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
        
        var punch = 0.9;
                    
        ball1.dx -= punch * Math.cos(angle);
        ball1.dy -= punch * Math.sin(angle);
        ball2.dx += punch * Math.cos(angle);
        ball2.dy += punch * Math.sin(angle);
    }
}

var gravity = 0.6;
var friction = 0.6;

function Ball(x, y, dy, radius, color, imageSource) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color; 
    this.velocity = 0.05;
    this.dy = dy;
    this.lastY = 0;
    this.imageSource = imageSource;

    this.update = function() {

        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy;
            this.dy = this.dy * friction;
        } else {
            this.dy += gravity;
        }

        this.y += Math.round(this.dy);

        findCollision(this);

        if (this.y + this.radius > canvas.height) {
            this.y = innerHeight - this.radius;
        }

        if (this.x + this.radius > canvas.width) {
            this.x = innerWidth - this.radius;
        }

        if (this.x - this.radius < 0) {
            this.x = 0 + this.radius;
        }

        this.lastY = this.y;

        this.draw();
    }

    this.draw = function() {
        let  img = document.getElementById(imageSource);

        c.drawImage(img, this.x, this.y, drawImageX, drawImageY);

        // c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.fillStyle = this.color;
        // c.fill();
        // c.closePath();
    }
}

var balls = [];

//balls.push(new Ball(canvas.width /2, canvas.height / 2, 2, collisionRadiusY, 'green'));

function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => ball.update());
}

function getRandomImage() {
    let randomImageIndex = Math.round(Math.random() * (images.length - 1));
    
    return images[randomImageIndex];
}

//window.addEventListener('deviceorientation', handleOrientation);
// window.addEventListener('mousemove', event => {
//     mouse.x = event.clientX;
//     mouse.y = event.clientY;
// });

window.addEventListener('mousedown', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    balls.push(new Ball(event.clientX, event.clientY, 2, collisionRadiusY, 'rgb(25,' + (Math.random() * 255 + 1) + ', 25, 0.75)', getRandomImage()));
});

const mouse = {
    x: innerWidth / 2,
    y: innerHeight /2
}

animate();
