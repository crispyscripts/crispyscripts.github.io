var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function Particle(x, y, radius, color, animateX) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.lastMouse = {x: x, y: y};
    this.radx = Math.random() * 100 + 30;
    this.rady = Math.random() * 100 + 30;


    this.update = function() {

        const lastPoint = {x: this.x, y: this.y};

        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        this.x = (!animateX ? this.lastMouse.x : x) + Math.cos(this.radians) * this.radx;

        if (!animateX) {
            this.y = this.lastMouse.y + Math.sin(this.radians) * this.rady;
        }

        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

var balls = [];

balls.push(new Particle(canvas.width /2, canvas.height / 2, 5, 'green', false));
balls.push(new Particle(canvas.width /2, canvas.height / 2, 10, 'teal', false));
balls.push(new Particle(canvas.width /2, canvas.height / 2, 7, 'lightgreen', false));
balls.push(new Particle(canvas.width /2, canvas.height / 2, 7, 'blue', true));

function animate() {

    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255, 255, 255, 0.4)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach(x => x.update());
}

//window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener('mousedown', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    c.beginPath();
    c.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2, false);
    c.strokeStyle = 'rgb(125, 125, 125, 1)';
    c.stroke;
    c.fill();
    c.closePath();        

});

const mouse = {
    x: innerWidth / 2,
    y: innerHeight /2
}

animate();
