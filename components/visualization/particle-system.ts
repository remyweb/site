export class Particle {
    x: number;
    y: number;
    color: string;
  
    constructor(x: number, y: number, color: string) {
      this.x = x;
      this.y = y;
      this.color = color;
    }
  
    update(width: number, height: number) {
      // Update particle position logic
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      // Draw particle logic
    }
  }