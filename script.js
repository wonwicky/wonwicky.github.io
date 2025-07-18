window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pixelCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const blockSize = 2;
  const particles = [];

  class Pixel {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.life = 1; // full opacity
    }

    update() {
      this.life -= 0.02;
    }

    draw(ctx) {
      const alpha = Math.max(0, this.life);
      ctx.fillStyle = `rgba(${200 + Math.random() * 55}, ${
        200 + Math.random() * 55
      }, 255, ${alpha * 0.4})`;
      ctx.fillRect(this.x, this.y, blockSize, blockSize);
    }

    isDead() {
      return this.life <= 0;
    }
  }

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        const px = mouseX + x * blockSize;
        const py = mouseY + y * blockSize;
        particles.push(new Pixel(px, py));
      }
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw(ctx);
    });

    // Remove dead particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});