// Firework Animation

const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const fireworks = [];
const particles = [];

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height;
        this.distanceToTarget = this.calculateDistance(this.x, this.y, this.targetX, this.targetY);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        this.speed = 2;
        this.acceleration = 1.05;
        this.brightness = Math.random() * 60 + 40;
        this.targetRadius = 1;
    }

    update() {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        if (this.targetRadius < 8) {
            this.targetRadius += 0.3;
        } else {
            this.targetRadius = 1;
        }

        this.speed *= this.acceleration;

        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        this.distanceTraveled = this.calculateDistance(
            this.x + vx,
            this.y + vy,
            this.x,
            this.y
        );

        if (this.distanceTraveled >= this.distanceToTarget) {
            this.createParticles();
            this.reset();
        } else {
            this.x += vx;
            this.y += vy;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, ${this.brightness}%)`;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.targetX, this.targetY, this.targetRadius, 0, Math.PI * 2);
        ctx.stroke();
    }

    createParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(this.targetX, this.targetY));
        }
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height;
        this.distanceToTarget = this.calculateDistance(this.x, this.y, this.targetX, this.targetY);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
    }

    calculateDistance(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 5;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 10 + 1;
        this.friction = 0.95;
        this.gravity = 1;
        this.hue = Math.random() * 360;
        this.brightness = Math.random() * 60 + 40;
        this.alpha = 1;
        this.decay = Math.random() * 0.03 + 0.01;
    }

    update() {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= this.decay) {
            particles.splice(particles.indexOf(this), 1);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.stroke();
    }
}

// Create fireworks at regular intervals
function createFireworks() {
    setInterval(() => {
        fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
    }, 1000);
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        fireworks[i].draw();
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    requestAnimationFrame(animate);
}

// Start the animation
createFireworks();
animate();
