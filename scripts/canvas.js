var aCanvas = document.querySelector('canvas');
aCanvas.width = window.innerWidth;
aCanvas.height = window.innerHeight;

var c = aCanvas.getContext('2d');

function Circle(x, y, dx, dy, radius, red, green, blue, opacity) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = 0.01;

    this.draw = function() {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        var rgb = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ', ' + this.opacity + ')';
        c.strokeStyle = rgb;
        c.fillStyle = rgb;
        c.stroke();
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
        {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var circleArray = [];
var totalBalls = 100;
var totalSize = 100;

for (var i = 0; i < totalBalls; i ++) {
    var radius = Math.random() * totalSize;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 8;
    var dy = (Math.random() - 0.5) * 8;

    var red = Math.random() * 255;
    var green = Math.random() * 255;
    var blue = Math.random() * 255;
    var opacity = Math.random();

    circleArray.push(new Circle(x, y, dx, dy, radius, red, green, blue, opacity));  
}

function animate() {
    requestAnimationFrame(animate);

    // c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();
