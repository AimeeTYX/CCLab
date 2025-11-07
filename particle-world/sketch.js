// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 10;
let MAX_OF_PARTICLES = 500;
let particles = [];
let smokeParticles = [];
let light = 100;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  noStroke();
  colorMode(HSB);
}

function draw() {
  let shakeX = 0;
  let shakeY = 0;
  if (keyIsPressed && key == " ") {
    shakeX = random(-3, 3);
    shakeY = random(-3, 3);
  }

  push();
  translate(shakeX, shakeY);
  background(200, 20, light);
  drawVolcano();

  let volcanoX = width / 2;
  let topY = height - 140;

  if (keyIsPressed && key == " " && random() < 0.4) {
    smokeParticles.push(new Smoke(volcanoX + random(-30, 30), topY));
  }

  for (let i = 0; i < smokeParticles.length; i++) {
    let p = smokeParticles[i];
    p.update();
    p.display();

    if (!p.isVisible) {
      smokeParticles.splice(i, 1);
    }
  }
  // limit the number of particles
  if (smokeParticles.length > MAX_OF_PARTICLES) {
    smokeParticles.splice(0, 1); // remove the first (oldest) particle
  }

  if (keyIsPressed && key == " ") {
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      particles.push(new Particle(volcanoX + random(-40, 40), topY + random(-15, 15)));
    }
    light -= 0.2;
  }

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.bounce();

    if (!p.isVisible) {
      particles.splice(i, 1);
    }
  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
  pop();
}

function drawVolcano() {
  let volcanoX = width / 2;
  let topY = height - 140;
  let bottomY = height - 40;

  push();
  for (let i = 0; i < 100; i++) {
    let bright = map(i, 0, 100, 0, 1);
    let c = lerpColor(color(15, 100, 5), color(25, 50, 30), bright);
    fill(c);

    let yTop = topY + i * 0.8;
    let yBottom = bottomY + i * 0.8;
    let halfTop = 70 + i * 0.4;
    let halfBottom = 120 + i * 0.5;

    quad(volcanoX - halfTop, yTop, volcanoX + halfTop, yTop, volcanoX + halfBottom, yBottom, volcanoX - halfBottom, yBottom);
  }
  pop();

  push();
  for (let i = 0; i < 20; i++) {
    let bright = map(i, 0, 10, 0, 1);
    let c = lerpColor(color(15, 100, 5), color(20, 100, 100), bright);
    fill(c);
    ellipse(volcanoX, topY, 140 - 7 * i, 30 - 1.5 * i);
  }
  pop();
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(2, 12);

    this.startHue = random(10, 45);
    this.hue = this.startHue;
    this.brightness = 100;
    this.saturation = 100;

    this.speedX = random(-2, 2);
    this.speedY = random(-12, -6);

    this.lifespan = 255;
    this.isVisible = true;
  }
  // methods (functions): particle's behaviors
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedX *= 0.99;
    this.speedY += 0.2;

    this.lifespan -= 1.3;
    let lifespan = map(this.lifespan, 255, 0, 0, 1);
    this.hue = lerp(this.startHue, 0, lifespan);
    this.brightness = lerp(100, 20, lifespan);
    this.saturation = lerp(100, 40, lifespan);
  }

  bounce() {
    if (this.y + this.dia / 2 >= height) {
      this.y = height - this.dia / 2;
      this.speedY *= -0.1;
      this.speedX *= 0.8;
      this.lifespan -= 10;
      this.brightness -= 5;
    }
    if (this.brightness <= 0 || this.lifespan <= 0) {
      this.isVisible = false;
    }
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    colorMode(HSB);
    fill(this.hue, this.saturation, this.brightness, this.lifespan);
    noStroke();
    circle(0, 0, this.dia);

    pop();
  }
}

class Smoke {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = random(10, 30);
    this.bright = 250;
    this.speedY = random(0.5, 3);
    this.speedX = random(-0.5, 0.5);
    this.isVisible = true;
  }

  update() {
    this.x += this.speedX + random(-0.1, 0.1);
    this.y -= this.speedY;
    this.bright -= 0.5;
    this.dia += 0.05;
    if (this.y < 0) {
      this.isVisible = false;
    }
  }

  display() {
    fill(0, 0, 100, this.bright);
    noStroke();
    circle(this.x, this.y, this.dia);
  }
}
