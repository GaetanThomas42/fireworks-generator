let fireworks;
let gravity;
let start = false;
let shots;
let randomColor = true;
let customColor = true;
let color;
let colors = [0];
let colorRects = [];

function setup() {
    
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 100);
  createOverlay();
  gravity = createVector(0, 0.05);
  fireworks = [];
  shots = 0;
    
}

function draw() {
    
  let timeStamp = millis();
  color = convertColor(select('#Color').value());
  if (color != colors[colors.length - 1] && colors.length < 11) {
    colors.push(color);
  }
  color = random(colors);
  if (randomColor) {
    color = noise(fireworks.length) * 100 - 10;
  }
    
  let cadence = testInput(select('#Cadence'), 20);
  let numberParticles = testInput(select('#Particles'), 100);
  let numberFireworks = testInput(select('#NumberFireworks'), 10);
  let radiusPMax = testInput(select('#RadiusPMax'), 3);

  background(0, 0, 0, 16);

  if (start) {
      
    if (frameCount % round(random(cadence / 2, cadence)) === 0 && shots != numberFireworks) {
      fireworks.push(new Firework(color, numberParticles, radiusPMax));
      shots++;
    }

  } else {
    fireworks = [];
    shots = 0;
  }

  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    if (!fireworks[i].active) {
      fireworks.splice(i, 1);
    }
  }
  fill(color, 100, 100);
  rect(div.x + div.width * 0.92, div.y * 0.98, div.width / 20, div.height)

  fill(255);
  let p = 0;
  for (let i = 0; i < fireworks.length; i++) {
    for (let j = 0; j < fireworks[i].particles.length; j++) {
      p++;
    }
  }
  let timeStamp1 = millis();
  let lag = round(timeStamp1 - timeStamp);
  text('Fireworks   ' + fireworks.length, width / 30, height / 30);
  text('Lag   ' + lag, width / 30, height / 20);
  text('Particles   ' + p, width / 30, height / 14);

  fill(map(lag, 0, 30, 40, 0), 100, 100);
  rect(width / 10, height / 25, map(lag, 0, 100, height / 500, 100), height / 100, );
  colorRects= [];
  for (let i = 0; i < colors.length; i++) {
    fill(1, 0, 100);
    text(i + 1, div.x + (1 + i) * (width / 90), div.y + div.height * 0.90);
    fill(colors[i], 100, 100);
    let x = div.x + (1 + i) * (width / 100);
    let y =  div.y + div.height * 0.92;
    rect(x,y, width / 100, width / 100);
    colorRects.push({x:x,y:y});
  }
}
function mouseClicked(){
  
  if (colors.length > 1) {
    
    for (let i = 0; i < colorRects.length; i++) {
      let d = dist(mouseX, mouseY, colorRects[i].x, colorRects[i].y);
      console.log(d);
      if (d < width / 120) {
        colors.splice(i - 1, 1);
      }
    }
  }
}