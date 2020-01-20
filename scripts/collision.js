var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

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
        var rgb = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ', ' + this.opacity + ')';
        c.strokeStyle = rgb;
        c.fillStyle = rgb;
        c.stroke();
        c.fill();
    }

    this.intersects = function(overlap) {
        var dxx = this.x - overlap.x;
        var dyy = this.y - overlap.y;
        var distance = Math.sqrt((dxx * dxx) + (dyy * dyy));

        return distance <= (this.radius + overlap.radius);        
    }
}

var circleArray = [];
var totalBalls = 30;
var totalRadius = 50;

for (var i = 0; i < totalBalls; i ++) {
    var radius = Math.random() * totalRadius;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 1;

    var red = Math.random() * 255;
    var green = Math.random() * 255;
    var blue = Math.random() * 255;
    var opacity = Math.random();

    circleArray.push(new Circle(x, y, dx, dy, radius, red, green, blue, opacity));  
}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length-1; i++) {
        for (var j = i + 1; j < circleArray.length; j++) {

            var ca = circleArray[i];
            var cx = circleArray[j];

            if (ca.x + ca.radius > innerWidth || ca.x - ca.radius < 0 || ca.intersects(cx)) {
                ca.dx = -ca.dx;
            }
        
            if (ca.y + ca.radius > innerHeight || ca.y - ca.radius < 0 || ca.intersects(cx)) {
                ca.dy = -ca.dy;
            }
        
            ca.x += ca.dx;
            ca.y += ca.dy;
        }
    }

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
    }
}

animate();
