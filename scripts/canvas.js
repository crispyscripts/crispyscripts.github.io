var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.3)';
// c.fillRect(100, 100, 100, 100);

// new line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// random circles
for (var i = 0; i < 200; i++) {

    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var red = Math.random() * 255;
    var green = Math.random() * 255;
    var blue = Math.random() * 255;
    var transparency = Math.random();

    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    var rgb = 'rgb(' + red + ',' + green + ',' + blue + ', ' + transparency + ')';
    //c.strokeStyle = rgb;
    c.fillStyle = rgb;
    c.fill();
    //c.stroke();
}

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        var rgb = 'rgb(' + red + ',' + green + ',' + blue + ', ' + transparency + ')';
        c.strokeStyle = rgb;
        c.stroke();
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - radius < 0)
        {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var circleArray = [];

for (var i = 0; i < 100; i ++) {
    var x = Math.random() * innerWidth;
    var y = Math.random() * innerHeight;
    var dx = (Math.random() - 0.5) * 20;
    var dy = (Math.random() - 0.5) * 20;
    var radius = 30;
    
    circleArray.push(new Circle(x, y, dx, dy, radius));  
}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();