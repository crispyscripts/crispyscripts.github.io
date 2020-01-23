var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = 0;
    this.velocity = 0.05;

    this.update = function() {

        const lastPoint = {x: this.x, y: this.y};

        this.radians += this.velocity;
        this.x = mouse.x + Math.cos(this.radians) * 100;
        this.y = mouse.y + Math.sin(this.radians) * 100;
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

var particles = [];

particles.push(new Particle(canvas.width /2, canvas.height / 2, 5, 'green' ));

function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(x => x.update());
}

//window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

const mouse = {
    x: innerWidth / 2,
    y: innerHeight /2
}

animate();
