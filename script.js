function unlockScreen() {
    const passwordInput = document.getElementById('password').value;
    const correctPassword = '273';

    if (passwordInput === correctPassword) {
        document.querySelector('.lock-screen').style.display = 'none'; // Esconde a tela de bloqueio
        document.getElementById('main-content').classList.remove('hidden'); // Mostra o conteúdo principal
    } else {
        alert('Senha incorreta! Tente novamente.');
    }
}


let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const updatePosition = (x, y) => {
      if (!this.rotating) {
        this.mouseX = x;
        this.mouseY = y;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dirX = x - this.mouseTouchX;
      const dirY = y - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;
      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (360 + Math.round((180 * angle) / Math.PI)) % 360;

      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    const startInteraction = (x, y, isRotate = false) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      this.mouseTouchX = x;
      this.mouseTouchY = y;
      this.prevMouseX = x;
      this.prevMouseY = y;
      this.rotating = isRotate;
    };

    document.addEventListener("mousemove", (e) => {
      updatePosition(e.clientX, e.clientY);
    });

    document.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    });

    paper.addEventListener("mousedown", (e) => {
      startInteraction(e.clientX, e.clientY, e.button === 2);
    });

    paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      startInteraction(touch.clientX, touch.clientY);
    });

    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    window.addEventListener("touchend", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
