"use strict";
const ball = document.getElementById('background-sphere');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ballX = mouseX;
let ballY = mouseY;
const easing = 0.05;
const ballSize = 2500;
ball.style.width = `${ballSize}px`;
ball.style.height = `${ballSize}px`;
ball.style.transform = `translate(${ballX - ballSize / 2}px, ${ballY - ballSize / 2}px)`;
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
function animateBall() {
    ballX += (mouseX - ballX) * easing;
    ballY += (mouseY - ballY) * easing;
    ball.style.transform = `translate(${ballX - ballSize / 2}px, ${ballY - ballSize / 2}px)`;
    requestAnimationFrame(animateBall);
}
animateBall();
