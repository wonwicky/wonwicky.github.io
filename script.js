 window.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById("pixelCanvas");
      const ctx = canvas.getContext("2d");

      let isDragging = false;

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      document.addEventListener("mousedown", () => isDragging = true);
      document.addEventListener("mouseup", () => {
        isDragging = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const blockSize = 12;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = -3; x <= 3; x++) {
          for (let y = -3; y <= 3; y++) {
            const px = mouseX + x * blockSize;
            const py = mouseY + y * blockSize;
            const distance = Math.sqrt(x * x + y * y);
            const alpha = Math.max(0, 1 - distance / 3);

            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
            ctx.fillRect(px, py, blockSize, blockSize);
          }
        }
      });
    });
