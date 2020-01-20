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
    
    this.intersects = function(index) {
        this.index = index;

        for (var i = 0; i < totalBalls; i++) {
            if (i != this.index) {

                var ca = circleArray[i];

                var dx = this.x - ca.x;
                var dy = this.y - ca.y;
                var distance = Math.sqrt((dx * dx) + (dy * dy));

                return distance <= (this.radius + ca.radius);

                // if (this.x - this.radius >= ca.x - ca.radius && this.x + this.radius <= ca.x + ca.radius
                //     && this.y - this.radius >= ca.y - ca.radius && this.y + this.radius <= ca.y + ca.radius) {
                //     return true;
                // }
            }
        }
    
        return false;
    }

    this.update = function(index) {
        this.index = index;
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0 || this.intersects(this.index) ) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0 || this.intersects(this.index))
        {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var circleArray = [];
var totalBalls = Math.random() * 100;
var totalRadius = 30;

for (var i = 0; i < totalBalls; i ++) {
    var radius = Math.random() * totalRadius;
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

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update(i);
    }
}

animate();
