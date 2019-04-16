function Vehicle(x, y, spawnX, spawnY) {

  //definition spaw et target de l'objet et forces
  this.spawn = createVector(spawnX, spawnY);
  this.target = createVector(x, y);
  this.vel = createVector(random(), random());
  this.acc = createVector();
  this.maxSpeed = width / 400;
  this.maxForce = 2;
  this.r = 0.01;
  this.color = random(0, 100);
  this.saturation = random(60, 100);
}
Vehicle.prototype.show = function() {

  fill(this.color, this.saturation, 100);
  ellipse(this.spawn.x, this.spawn.y, this.r, this.r);
}
Vehicle.prototype.update = function() {

  this.spawn.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
  if (this.r < 8) {
    this.r += 0.001;
  }
}
Vehicle.prototype.behaviors = function() {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);

  arrive.mult(1);

  this.applyForce(arrive);
}
Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
}
Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.spawn);
  var d = desired.mag();
  var speed = this.maxSpeed;
  if (d < 50) {
    speed = map(d, 0, 100, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}