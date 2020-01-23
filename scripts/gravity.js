var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var gravity = 1;
var friction = 0.8;

function Ball(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color; 
    this.velocity = 0.05;
    this.dy = dy;

    this.update = function() {
        if (this.y + this.radius > canvas.height) {
            this.dy = -this.dy;
        } else {
            this.dy += gravity;
        }

        this.y += this.dy;
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

//window.addEventListener('deviceorientation', handleOrientation);
// window.addEventListener('mousemove', event => {
//     mouse.x = event.clientX;
//     mouse.y = event.clientY;
// });

window.addEventListener('mousedown', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    balls.push(new Ball(event.clientX, event.clientY, 2, 30, rgb(5,Math.random() * 255 + 1, 5));
});

const mouse = {
    x: innerWidth / 2,
    y: innerHeight /2
}

animate();
