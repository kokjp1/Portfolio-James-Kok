// JavaScript to control the ball's movement
const ball = document.getElementById('background-sphere');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ballX = mouseX;
let ballY = mouseY;
const easing = 0.08;
const ballSize = 650; // Diameter in pixels

// Initialize ball size and position
ball.style.width = `${ballSize}px`;
ball.style.height = `${ballSize}px`;
ball.style.transform = `translate(${ballX - ballSize/2}px, ${ballY - ballSize/2}px)`;

// Update mouse position
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animation function
function animateBall() {
  // Update ball position with easing
  ballX += (mouseX - ballX) * easing;
  ballY += (mouseY - ballY) * easing;
  
  // Apply position - centering the ball on the mouse position
  ball.style.transform = `translate(${ballX - ballSize/2}px, ${ballY - ballSize/2}px)`;
  
  requestAnimationFrame(animateBall);
}

animateBall();