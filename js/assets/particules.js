function Particle(x, y, vX, vY, color, firework, radiusPMax) {
  
  this.pos = createVector(x, y);
  this.vel = createVector(vX, vY);
  this.acc = createVector();
  
  this.color = color;
  this.opacity = 100;
  this.r = random(2, radiusPMax);
  
  this.firework = firework;
  this.transformed = false;
}
Particle.prototype.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(random(-0.3, 0.3));
    if (this.firework === 1) {
      if (this.r > 0.01) {
        this.r *= 0.95;
      } else {
        this.r = 0;
      }
    } else if (this.firework === 2) {
      this.opacity -= 0.5;
    }
}
Particle.prototype.applyForce = function(force) {
  this.acc.add(force);
}
Particle.prototype.show = function() {
  noStroke();
  if (this.firework === 0) {
    fill(this.color, 100, 100);
    rect(this.pos.x, this.pos.y, width / 1000, width / 500);
  } else if (this.firework === 1) {
    fill(this.color, random(30, 100), 100);
    ellipse(this.pos.x + noise(frameCount) * 3, this.pos.y, this.r);
  } else if (this.firework === 2) {
    fill(20, 100, random(0, 100));
    rect(this.pos.x + noise(frameCount) * 20, this.pos.y + noise(frameCount) * 20, this.r / 3, this.r / 6);
  }
}
