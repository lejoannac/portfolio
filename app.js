// const canvas = document.getElementById('flappyCanvas');
// const ctx = canvas.getContext('2d');

// // Game variables
// let frames = 0;
// const DEGREE = Math.PI/180;

// // Bird
// const bird = {
//     x: 50,
//     y: 150,
//     w: 34,
//     h: 24,
//     gravity: 0.25,
//     jump: 4.6,
//     velocity: 0,
//     radius: 12,
//     draw() {
//         ctx.save();
//         ctx.translate(this.x, this.y);
//         ctx.rotate(Math.min(this.velocity * 0.05, Math.PI/2));
//         ctx.fillStyle = "#ffeb3b";
//         ctx.beginPath();
//         ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
//         ctx.fill();
//         ctx.strokeStyle = "#fbc02d";
//         ctx.lineWidth = 3;
//         ctx.stroke();
//         // Eye
//         ctx.beginPath();
//         ctx.arc(6, -4, 3, 0, 2 * Math.PI);
//         ctx.fillStyle = "#fff";
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(7, -4, 1, 0, 2 * Math.PI);
//         ctx.fillStyle = "#222";
//         ctx.fill();
//         // Beak
//         ctx.beginPath();
//         ctx.moveTo(this.radius, 0);
//         ctx.lineTo(this.radius + 8, -4);
//         ctx.lineTo(this.radius, -6);
//         ctx.closePath();
//         ctx.fillStyle = "#ff9800";
//         ctx.fill();
//         ctx.restore();
//     },
//     flap() {
//         this.velocity = -this.jump;
//     },
//     reset() {
//         this.y = 150;
//         this.velocity = 0;
//     }
// };

// // Pipes
// const pipes = {
//     position: [],
//     w: 52,
//     h: 320,
//     gap: 100,
//     maxYPos: -150,
//     dx: 2,
//     draw() {
//         for (let i = 0; i < this.position.length; i++) {
//             let p = this.position[i];
//             // Top pipe
//             ctx.fillStyle = "#388e3c";
//             ctx.fillRect(p.x, p.y, this.w, this.h);
//             // Bottom pipe
//             ctx.fillRect(p.x, p.y + this.h + this.gap, this.w, this.h);
//         }
//     },
//     update() {
//         if (frames % 90 === 0) {
//             this.position.push({
//                 x: canvas.width,
//                 y: this.maxYPos * Math.random()
//             });
//         }
//         for (let i = 0; i < this.position.length; i++) {
//             let p = this.position[i];
//             p.x -= this.dx;

//             // Remove pipes off screen
//             if (p.x + this.w < 0) {
//                 this.position.shift();
//                 score.value++;
//                 score.best = Math.max(score.value, score.best);
//                 localStorage.setItem("flappyBest", score.best);
//             }
//         }
//     },
//     reset() {
//         this.position = [];
//     }
// };

// // Ground
// const ground = {
//     y: canvas.height - 60,
//     h: 60,
//     draw() {
//         ctx.fillStyle = "#795548";
//         ctx.fillRect(0, this.y, canvas.width, this.h);
//         ctx.fillStyle = "#a1887f";
//         ctx.fillRect(0, this.y, canvas.width, 20);
//     }
// };

// // Score
// const score = {
//     value: 0,
//     best: parseInt(localStorage.getItem("flappyBest")) || 0,
//     draw() {
//         ctx.fillStyle = "#001f4d";
//         ctx.font = "bold 32px Inter, Arial, sans-serif";
//         ctx.fillText(this.value, 20, 50);
//         ctx.font = "16px Inter, Arial, sans-serif";
//         ctx.fillText("Best: " + this.best, 20, 75);
//     },
//     reset() {
//         this.value = 0;
//     }
// };

// // Collision detection
// function collision() {
//     for (let i = 0; i < pipes.position.length; i++) {
//         let p = pipes.position[i];
//         // Bird
//         let bx = bird.x + bird.radius;
//         let by = bird.y + bird.radius;

//         // Top pipe
//         if (
//             bx > p.x && bird.x < p.x + pipes.w &&
//             by > p.y && bird.y < p.y + pipes.h
//         ) {
//             return true;
//         }
//         // Bottom pipe
//         if (
//             bx > p.x && bird.x < p.x + pipes.w &&
//             by > p.y + pipes.h + pipes.gap && bird.y < p.y + pipes.h + pipes.gap + pipes.h
//         ) {
//             return true;
//         }
//     }
//     // Ground
//     if (bird.y + bird.radius > ground.y) {
//         return true;
//     }
//     // Ceiling
//     if (bird.y - bird.radius < 0) {
//         return true;
//     }
//     return false;
// }

// // Game state
// let gameOver = false;

// function resetGame() {
//     bird.reset();
//     pipes.reset();
//     score.reset();
//     gameOver = false;
// }

// // Game loop
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // Sky
//     ctx.fillStyle = "#87ceeb";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     pipes.draw();
//     ground.draw();
//     bird.draw();
//     score.draw();

//     if (gameOver) {
//         ctx.fillStyle = "rgba(0,0,0,0.7)";
//         ctx.fillRect(0, canvas.height/2 - 60, canvas.width, 120);
//         ctx.fillStyle = "#fff";
//         ctx.font = "bold 32px Inter, Arial, sans-serif";
//         ctx.textAlign = "center";
//         ctx.fillText("Game Over", canvas.width/2, canvas.height/2 - 10);
//         ctx.font = "20px Inter, Arial, sans-serif";
//         ctx.fillText("Press Space or Tap to Restart", canvas.width/2, canvas.height/2 + 30);
//         ctx.textAlign = "left";
//     }
// }

// function update() {
//     if (!gameOver) {
//         bird.velocity += bird.gravity;
//         bird.y += bird.velocity;
//         pipes.update();
//         if (collision()) {
//             gameOver = true;
//         }
//     }
// }

// function loop() {
//     update();
//     draw();
//     frames++;
//     requestAnimationFrame(loop);
// }

// // Controls
// function flapHandler(e) {
//     if (gameOver) {
//         resetGame();
//     } else {
//         bird.flap();
//     }
// }
// document.addEventListener("keydown", function(e) {
//     if (e.code === "Space") flapHandler();
// });
// canvas.addEventListener("mousedown", flapHandler);
// canvas.addEventListener("touchstart", function(e) {
//     e.preventDefault();
//     flapHandler();
// });

// // Start game
// resetGame();
// loop();


document.addEventListener('DOMContentLoaded', function() {
    // Projects button scroll functionality
    const btn = document.getElementById('projects-scroll-btn');
    const projectsSection = document.querySelector('.projects-title');
    
    if (btn && projectsSection) {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default button behavior
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Projects button scroll functionality
    const btn = document.getElementById('discover-scroll-btn');
    const projectsSection = document.querySelector('.projects-title');
    
    if (btn && projectsSection) {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default button behavior
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});