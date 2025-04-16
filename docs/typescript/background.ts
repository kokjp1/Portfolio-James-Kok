const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null;

// Add null check before using canvas
if (!canvas) {
  console.error('Canvas element not found');
} else {
  const ctx = canvas.getContext('2d');
  
  // Current mouse position
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  // Ball position (with delay)
  let ballX = mouseX;
  let ballY = mouseY;
  
  // Easing factor (0.05-0.1 for subtle delay, lower = more delay)
  const easing = 0.01;

  function resizeCanvas() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update ball position with easing
    ballX += (mouseX - ballX) * easing;
    ballY += (mouseY - ballY) * easing;
    
    // Create a radial gradient for the faded effect
    const radius = 650; // Much larger ball
    const gradient = ctx.createRadialGradient(
      ballX, ballY, 0,
      ballX, ballY, radius
    );
    
    // Add color stops for the gradient
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(0.2, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    // Draw the circle
    ctx.beginPath();
    ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    requestAnimationFrame(draw);
  }

  draw();
}