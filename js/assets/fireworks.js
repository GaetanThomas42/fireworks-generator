function Firework(color, numberParticles, radiusPMax) {

  this.firework = new Particle(width / 2, height, random(-3, 3), random(-6, -7), color, 0);
  this.exploded = false;
  this.particles = [];
  this.active = true;
  this.radiusPMax = radiusPMax;
  this.update = function() {

    this.firework.update();
    this.firework.applyForce(gravity);

    if (!this.exploded) {
      this.firework.show();

      if (this.firework.vel.y > 0.1) {
        this.exploded = true;
        this.explode();

      }

    } else {
      if (this.firework.pos.y > height) {
        this.active = false;

      }

    }
    for (let i = 0, l = this.particles.length; i < l; i++) {

      if (!this.particles[i].transformed) {
        this.particles[i].applyForce(gravity);
        this.particles[i].update();
        this.particles[i].show();
      }
    }

  }

  this.explode = function() {


    let r = random(50, numberParticles);
    for (let i = 0; i < r; i++) {

      let disp = random(1, 4);
      let vX = (random(0, 5) * cos(random(-PI, PI))) / disp;
      let vY = (random(0, 5) * sin(random(-PI, PI))) / disp;
      let p = new Particle(this.firework.pos.x, this.firework.pos.y, vX, vY, color, 1, radiusPMax);
      this.particles.push(p);
    }

  }
}