/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let x, y;
let vx, vy;
let hunger;
let color1, color2;
let target;
let colorLumibub, light, food;
let restCountdown, deathCountdown;
let isResting;
let isDying;
let isDead;
let isEvolved;
let isAttatched;
let fallSpeed;
let clickCount, clickTime;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container")
  colorMode(HSB, 360, 100, 100);
  noStroke();
  startLumibub();
}

function draw() {
  let brightNess = map(hunger, 0, 20, 90, 30);
  if (isAttached == true) {
    background("#FFAAD5");
  } else if (isEvolved == true) {
    background(60, 30, 100);
  } else if (isDying == true && isDead == false) {
    let flash = (sin(frameCount * 0.2) + 1) / 2;
    let brightness = map(flash, 0, 1, 20, 100);
    background(0, 100, brightness);
    translate(random(-2, 2), random(-2, 2));
  } else if (isDead == false) {
    background(color1, color2, brightNess);
  } else {
    background(0);
  }
  if (isEvolved == false && isDead == false) {
    drawLumibub(x, y, frameCount);
  }
  if (isEvolved == false && isAttached == false && isDead == false) {
    if (hunger <= 0.1 && isResting == false) {
      isResting = true;
      restCountdown = 5 * 60;
    }
    if (isResting == true) {
      restCountdown--;
      hunger += 0.001;
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(50);
      text("Resting... " + ceil(restCountdown / 60), width / 2, height / 2);
      if (restCountdown <= 0) {
        isResting = false;
      }
    } else if (isDead == false) {
      hunger += 0.02;
      hunger = constrain(hunger, 0, 20);
      if (target) {
        fill(target.hue, food, 100);
        circle(target.x, target.y, 15);
        let dx = target.x - x;
        let dy = target.y - y;
        let d = dist(x, y, target.x, target.y);
        let speedLumibub = map(hunger, 0, 20, 2, 8);
        vx = (dx / d) * speedLumibub;
        vy = (dy / d) * speedLumibub;
        x += vx;
        y += vy;
        if (d < 40) {
          colorLumibub = target.hue;
          light = food;
          hunger = max(hunger - 4, 0);
          target = null;
        }
      } else {
        let maxSpeed = map(hunger, 0, 100, 1, 6);
        vx += random(-0.1, 0.1);
        vy += random(-0.1, 0.1);
        vx = constrain(vx, -maxSpeed, maxSpeed);
        vy = constrain(vy, -maxSpeed, maxSpeed);
        x += vx;
        y += vy;
      }
      if (x < 50 || x > width - 50) {
        vx *= -1;
      }
      if (y < 50 || y > height - 50) {
        vy *= -1;
      }
    }
  }
  if (hunger >= 19.9 && isDying == false && isDead == false) {
    isDying = true;
    deathCountdown = 8 * 60;
  }
  if (hunger < 19.9) {
    isDying = false;
    deathCountdown = 0;
  }
  if (isDying == true && isDead == false) {
    deathCountdown--;
  }
  if (deathCountdown < 0) {
    isDying = false;
    isDead = true;
  }
  if (isDead) {
    deathEnding();
  } else if (isEvolved) {
    evolveEnding();
  } else if (isAttached) {
    attachmentEnding();
  }
  if (isDying == true) {
    fill(360, 100, 100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text("DANGER!!!", width / 2, height - 20);
  } else if (isDead == false && isAttached == false && isEvolved == false) {
    fill(0, 0, 100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(
      "Tap to feed Lumibub. Caution: Hunger is DANGEROUS!",
      width / 2,
      height - 20
    );
  }
  if (isDead == false && isAttached == false && isEvolved == false) {
    drawHungerbar();
  } else if (isDead == true) {
    fill(360, 100, 100);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Bad Ending: You killed it.", width / 2, height / 2);
  }
  if (
    isEvolved == false &&
    isDead == false &&
    isAttached == false &&
    isResting == false &&
    hunger < 5 &&
    frameCount > 1800
  ) {
    isEvolved = true;
  }
  if (isDead == true || isAttached == true || isEvolved == true) {
    resetButton();
    if (
      mouseIsPressed &&
      mouseX >= 25 &&
      mouseX <= 75 &&
      mouseY >= 35 &&
      mouseY <= 75
    ) {
      startLumibub();
    }
  }
}

function drawLumibub(x, y, t) {
  beginShape();
  for (let i = 0; i < 2 * PI; i += 0.1) {
    fill(colorLumibub, light, 100);
    let edge = map(hunger, 0, 20, 0, 15);
    let r = 100 / 2 + sin(i * 6 + t * 0.1) * edge;
    let xOff = r * cos(i);
    let yOff = r * sin(i);
    vertex(x + xOff, y + yOff);
  }
  endShape(CLOSE);
}

function mousePressed() {
  clickTime = frameCount;
  let d = dist(mouseX, mouseY, x, y);
  if (mouseX <= 800 && mouseX >= 0 && mouseY >= 0 && mouseY <= 500) {
    if (isResting == false && isDead == false) {
      if (d > 50) {
        target = {
          x: mouseX,
          y: mouseY,
          hue: random(360),
        };
      } else {
        clickCount++;
        vx *= -1;
        vy *= -1;
      }
    }
  }
  if (frameCount - clickTime < 30 && clickCount > 10 && hunger < 10) {
    isAttached = true;
  }
}


function drawHungerbar() {
  let barWidth = 400;
  let barHeight = 15;
  let xBar = width / 2 - barWidth / 2;
  let yBar = 450;
  let percent = map(hunger, 0, 20, 0, 1);
  let filled = barWidth * (1 - percent);
  noFill();
  stroke(255);
  rect(xBar, yBar, barWidth, barHeight, 10);
  noStroke();
  let hueBar = map(hunger, 0, 20, 120, 0);
  fill(hueBar, 100, 100);
  rect(xBar, yBar, filled, barHeight, 10);
}

function startLumibub() {
  hunger = 1;
  x = width / 2;
  y = height / 2;
  vx = random(-1, 1);
  vy = random(-1, 1);
  color1 = random(0, 360);
  color2 = random(20, 80);
  colorLumibub = 360;
  light = 0;
  food = random(50, 100);
  restCountdown = 0;
  deathCountdown = 0;
  target = null;
  isResting = false;
  isDying = false;
  isDead = false;
  isEvolved = false;
  isAttached = false;
  fallSpeed = 0;
  clickTime = 0;
  clickCount = 0;
  frameCount = 0;
}

function resetButton() {
  fill(255);
  circle(50, 50, 50);
  fill(0);
  textSize(16);
  text("Reset", 50, 50);
}

function attachmentEnding() {
  let orbitR = 50 + sin(frameCount * 0.05) * 10;
  let angle = frameCount * 0.05;
  x = mouseX + cos(angle) * orbitR;
  y = mouseY + sin(angle) * orbitR;
  fill("#D5467B");
  textAlign(CENTER, CENTER);
  textSize(30);
  text(
    "Hidden Ending: It loves you too much to let go.",
    width / 2,
    height / 2
  );
}

function evolveEnding() {
  fill(50, 50, 100);
  ellipse(width / 2, height / 2, 120 + sin(frameCount * 0.1) * 20);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(25);
  text(
    "Good Ending: Lumibub transcends and becomes pure light.",
    width / 2,
    height / 2
  );
}

function deathEnding() {
  y += fallSpeed;
  fallSpeed += 0.1;
  light -= 1;
  if (y >= height - 50) fallSpeed = 0;
  drawLumibub(x, y, 0);
}
