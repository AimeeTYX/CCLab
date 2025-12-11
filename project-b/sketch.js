let octopus, oil, pipe, cap, eye;
let jellyfish, hook, hooks, net;
let planets = [];
let second;
let zoom = 1;
let autoZoom = false;
let state = "universe";
let fading = false;
let fade = 0;
let nextState = "";
let trashmountains = [];
let particles = [];
let spacecraft;
let seabedtrash;
let net2;
let Obubbles = [];
let Jbubbles = [];
let showOctopus = false;
let showJellyfish = false;
let OctopusBubbles = true;
let JellyfishBubbles = true;
let octoX, octoY, jellyX, jellyY;
let octoStartX = 80;
let octoStartY = 430;
let octoFinalX;
let octoFinalY;
let octoProgress = 0;
let octoScale = 0;
let jellyStartX = 500;
let jellyStartY = 310;
let jellyFinalX;
let jellyFinalY;
let jellyProgress = 0;
let jellyScale = 0;
let Oflash, Jflash;
let inoildrum;
let inaircraft;
let skeletons = [];
let originW = 800;
let originH = 500;
let allowScan = true;
let scanY = 0;
let scanD = 1;
let scanning = false;
let scanT = 0;
let scan;
let scanPlayed = false;
let scanresult;
let scanresultPlayed = false;
let universebg;
let universebgPlayed = false;
let stars = [];
let infoplanet;
let infoplanetPlayed = false;
let FNJ, OD8, fnj, od8;
let fnjPlayed = false;
let od8Played = false;
let showOD8 = false;
let showFNJ = false;
let od8warning, fnjwarning;
let od8warningPlayed = false;
let fnjwarningPlayed = false;
let instruction1 = false;
let instruction2 = false;
let boneMessages = [];
let boneMessagePlayed = [false, false, false, false];
let boneMessageIndex = 0;
let currentBoneMessage;
let boneMessageFinished = [false, false, false, false];

function preload() {
  oil = loadImage("assets/oil drum.png");
  eye = loadImage("assets/eye.png");
  pipe = loadImage("assets/pipes.png");
  cap = loadImage("assets/cap.png");
  net = loadImage("assets/net.png");
  hooks = loadImage("assets/hooks.png");
  hook = loadImage("assets/hook.png");
  spacecraft = loadImage("assets/spacecraft.png");
  seabedtrash = loadImage("assets/seabedtrash.png");
  net2 = loadImage("assets/net2.png");
  inoildrum = loadImage("assets/inoildrum.jpg");
  inaircraft = loadImage("assets/inaircraft.png");
  FNJ = loadImage("assets/FNJ.jpg");
  OD8 = loadImage("assets/OD8.jpg");
  for (let i = 0; i < 4; i++) {
    trashmountains.push(loadImage("assets/trashmountain" + (i + 1) + ".png"));
  }
  for (let i = 0; i < 7; i++) {
    skeletons.push(loadImage("assets/skeleton" + (i + 1) + ".png"));
  }

  scanresult = loadSound("assets/scanresult.mp3");
  scan = loadSound("assets/scan.mp3");
  universebg = loadSound("assets/universe.mp3");
  infoplanet = loadSound("assets/infoplanet.mp3");
  fnj = loadSound("assets/FNJ.mp3");
  od8 = loadSound("assets/OD8.mp3");
  od8warning = loadSound("assets/OD8warning.mp3");
  fnjwarning = loadSound("assets/FNJwarning.mp3");
  for (let i = 0; i < 4; i++) {
    stars.push(loadSound("assets/stars" + (i + 1) + ".mp3"));
  }
  for (let i = 0; i < 4; i++) {
    boneMessages.push(loadSound("assets/bone" + (i + 1) + ".mp3"));
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  octoX = octoStartX;
  octoY = octoStartY;
  octoFinalX = random(250, 300);
  octoFinalY = random(80, 120);
  jellyX = jellyStartX;
  jellyY = jellyStartY;
  jellyFinalX = random(500, 550);
  jellyFinalY = random(80, 120);
  octopus = new Octopus(octoX, octoY, 0.4);
  jellyfish = new Jellyfish(jellyX, jellyY, 0.4);
  noStroke();
  second = new secondNature(originW / 2, originH / 2, 120, 200);
  for (let i = 0; i < 20; i++) {
    let s = random(10, 50);
    let px = random(originW);
    let py = random(originH);

    while (px > 350 && px < 450 && py > 200 && py < 300) {
      px = random(originW);
      py = random(originH);
    }

    let overlap = false;

    for (let p of planets) {
      if (dist(px, py, p.x, p.y) < s / 2 + p.s / 2 + 5) {
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      planets.push(new Planet(px, py, s));
    } else {
      i--;
    }
  }

  for (let i = 0; i < 200; i++) {
    let x = random(originW);
    let y = random(originH);
    let size = random(1, 3);
    let col = color(random(120, 255), random(120, 255), random(120, 255), 80);
    let speed = random(0.1, 0.5);
    particles.push(new Particle(x, y, size, col, speed));
  }

  for (let i = 0; i < 20; i++) {
    Jbubbles.push(new Bubble(random(480, 520), random(300, 315), random(6, 15), random(0.5, 1.5)));
    Obubbles.push(new Bubble(random(60, 100), random(420, 450), random(5, 10), random(0.3, 1)));
  }
  Oflash = new Flash(183, 452);
  Jflash = new Flash(633, 338);
}

function draw() {
  background(0);
  let scaleFactor = min(width / originW, height / originH);
  let offsetX = (width - originW * scaleFactor) / 2;
  let offsetY = (height - originH * scaleFactor) / 2;

  if (autoZoom) {
    zoom = lerp(zoom, zoomTarget, 0.02);
    if (zoom >= zoomTarget) {
      zoom = zoomTarget;
      autoZoom = false;
    }
  }
  push();
  translate(offsetX, offsetY);
  scale(scaleFactor);
  if (scanning) {
    drawScanline();
  }
  if (!universebgPlayed && universebg) {
    universebg.play();
    universebg.setVolume(0.5);
    universebg.loop();
    universebgPlayed = true;
  }
  if (state == "universe") {
    drawUniverse();
    if (zoom >= 23) {
      textFont('monospace');
      textSize(15);
      fill(0, 255, 150);
      let txt = "Composition of External Star Belt:\n45% plastic fragments\n30% Scrap metal\n15% Electronic waste\n8% Chemical Container\n2% Unknown Matter";
      text(txt, 20, 40);
      if (!infoplanetPlayed && infoplanet) {
        infoplanet.play();
        infoplanet.setVolume(2);
        infoplanetPlayed = true;
      }
    }
  } else if (state == "planet") {
    drawSecondnature();
    drawglass();
    if (!showOctopus && !showJellyfish) {
      textFont('monospace');
      textSize(15);
      push();
      fill(255);
      let txt = "There is something inside those containers watching us...";
      text(txt, 20, 40);
      pop();
    } else if (instruction1 && instruction2) {
      textFont('monospace');
      textSize(15);
      push();
      fill(255);
      let txt = "Umm, no getting close... Let's check the inside of their 'houses'";
      text(txt, 20, 40);
      pop();
    }
  } else if (state == "oildrum") {
    drawoildrum();
    drawglass();
    let anyPlayed = false;
    for (let i = 0; i < boneMessagePlayed.length; i++) {
      if (boneMessagePlayed[i]) {
        anyPlayed = true;
        break;
      }
    }

    let allPlayed = true;
    for (let i = 0; i < boneMessagePlayed.length; i++) {
      if (!boneMessagePlayed[i]) {
        allPlayed = false;
        break;
      }
    }

    if (!anyPlayed) {
      textFont('monospace');
      textSize(15);
      push();
      fill(255);
      let txt = "They look like they are trying to convey some information to us. ";
      text(txt, 20, 40);
      pop();
    } else if (allPlayed) {
      fading = true;
      nextState = "ending";
    }
  } else if (state == "aircraft") {
    drawaircraft();
    drawglass();
    let anyPlayed = false;
    for (let i = 0; i < boneMessagePlayed.length; i++) {
      if (boneMessagePlayed[i]) {
        anyPlayed = true;
        break;
      }
    }

    let allPlayed = true;
    for (let i = 0; i < boneMessagePlayed.length; i++) {
      if (!boneMessagePlayed[i]) {
        allPlayed = false;
        break;
      }
    }

    if (!anyPlayed) {
      textFont('monospace');
      textSize(15);
      push();
      fill(255);
      let txt = "They look like they are trying to convey some information to us. ";
      text(txt, 20, 40);
      pop();
    } else if (allPlayed) {
      fading = true;
      nextState = "ending";
    }
  } else if (state == "ending") {
    drawEnding();
  }
  pop();
  fadeTransition();
}

function fadeTransition() {
  if (!fading) {
    return;
  }

  if (fade < 255 && nextState !== "") {
    fade += 5;
    if (fade >= 255) {
      state = nextState;
      nextState = "";
    }
  } else if (fade > 0 && nextState == "") {
    fade -= 5;
    if (fade <= 0) {
      fading = false;
    }
  }
  push();
  noStroke();
  fill(0, fade);
  rect(0, 0, width, height);
  pop();
}

function keyPressed() {
  if (state == "universe" && !scanning && allowScan) {
    scanning = true;
    scanY = 0;
    scanD = 1;
    scanT = 0;
  }
}

function mousePressed() {
  let scaleFactor = min(width / originW, height / originH);
  let offsetX = (width - originW * scaleFactor) / 2;
  let offsetY = (height - originH * scaleFactor) / 2;
  let mx = (mouseX - offsetX) / scaleFactor;
  let my = (mouseY - offsetY) / scaleFactor;
  if (state == "universe") {
    if (!autoZoom) {
      for (let p of planets) {
        if (dist(mx, my, p.x, p.y) < p.s / 2) {
          stars[floor(random(stars.length))].play();
        }
      }
    } else {
      if (infoplanetPlayed) {
        fading = true;
        nextState = "planet";
      }
    }
  } else if (state == "planet") {
    if (mx > 80 && mx < 245 && my < originH && my > 400) {
      if (!showOctopus) {
        showOctopus = true;
        OctopusBubbles = false;
        if (od8 && !od8Played) {
          od8.play();
          od8.setVolume(2);
          od8Played = true;
          od8.onended(function () {
            showOD8 = true;
            if (od8warning && !od8warningPlayed) {
              od8warning.play();
              od8warning.setVolume(2);
              od8warningPlayed = true;
              od8warning.onended(function () {
                instruction1 = true;
              })
            }
          })
        }
      } else if (showOD8 && showFNJ) {
        fading = true;
        nextState = "oildrum";
      }
    }

    if (mx > 490 && mx < 700 && my > 280 && my < 370) {
      if (!showJellyfish) {
        showJellyfish = true;
        JellyfishBubbles = false;
        if (fnj && !fnjPlayed) {
          fnj.play();
          fnj.setVolume(2);
          fnjPlayed = true;
          fnj.onended(function () {
            showFNJ = true;
            if (fnjwarning && !fnjwarningPlayed) {
              fnjwarning.play();
              fnjwarning.setVolume(2);
              fnjwarningPlayed = true;
              fnjwarning.onended(function () {
                instruction2 = true;
              })
            }
          })
        }
      } else if (showOD8 && showFNJ) {
        fading = true;
        nextState = "aircraft";
      }
    }
  } else if (state == "oildrum") {
    let clickedBone = false;
    if (dist(mx, my, 150, 340) < 40) {
      clickedBone = 0;
    }
    else if (dist(mx, my, 715, 350) < 40) {
      clickedBone = 1;
    }
    else if (dist(mx, my, 525, 290) < 40) {
      clickedBone = 2;
    }
    else if (dist(mx, my, 260, 300) < 40) {
      clickedBone = 3;
    }
    if (clickedBone !== false && !boneMessagePlayed[clickedBone]) {
      playBoneMessage(clickedBone);
    }

  } else if (state == "aircraft") {
    if (dist(mx, my, 125, 310) < 45) {
      clickedBone = 0;
    }
    else if (dist(mx, my, 520, 220) < 40) {
      clickedBone = 1;
    }
    else if (dist(mx, my, 390, 170) < 80) {
      clickedBone = 2;
    }
    else if (dist(mx, my, 250, 200) < 50) {
      clickedBone = 3;
    }
    if (clickedBone !== false && !boneMessagePlayed[clickedBone]) {
      playBoneMessage(clickedBone);
    }
  }
}
function drawScanline() {
  push();
  blendMode(ADD);
  scanY += scanD * 5;
  if (!scanPlayed && scan) {
    scan.play();
    scan.setVolume(0.8);
    scanPlayed = true;
    scan.onended(function () {
      scanPlayed = false;
    });
  }

  if (scanY >= originH) {
    scanD = -1;
    scanT++;
  } else if (scanY <= 0) {
    scanD = 1;
    scanT++;
  }
  if (scanT >= 4) {
    scanning = false;
    scanT = 0;
    scanY = 0;
    if (!scanresultPlayed && scanresult) {
      if (scanPlayed) {
        scan.stop();
      }
      scanresult.play();
      scanresult.setVolume(2);
      scanresultPlayed = true;
      scanresult.onended(function () {
        scanresultPlayed = false;
        autoZoom = true;
        zoomTarget = 25;
      });
    }
    allowScan = false;
    return;
  }
  for (let i = 5; i > 0; i--) {
    strokeWeight(i * 1);
    stroke(255, 100, 100, map(i, 1, 5, 200, 50));
    line(0, scanY, originW, scanY);
  }
  stroke(255, 0, 0, 255);
  strokeWeight(1);
  line(0, scanY, originW, scanY);
  blendMode(BLEND);
  pop();
}

function drawUniverse() {
  push();
  translate(originW / 2, originH / 2);
  scale(zoom);
  translate(-originW / 2, -originH / 2);
  for (let i = 0; i < planets.length; i++) {
    planets[i].display();
  }
  second.update();
  second.display();
  pop();
}

class Planet {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.c1 = color(random(20, 255), random(20, 255), random(20, 255));
    this.c2 = color(random(20, 255), random(20, 255), random(20, 255));
  }

  display() {
    push();
    translate(this.x, this.y);
    for (let i = -this.s / 2; i < this.s / 2; i++) {
      let n = noise(i * 0.05, frameCount * 0.01);
      let col = lerpColor(this.c1, this.c2, n);
      fill(col);
      let half = sqrt((this.s / 2) * (this.s / 2) - i * i);
      rect(-half, i, half * 2, 1);
    }

    let glowCol = lerpColor(this.c1, this.c2, 0.5);
    for (let i = 0; i < 20; i++) {
      noFill();
      stroke(red(glowCol), green(glowCol), blue(glowCol), 60 - i * 3);
      circle(0, 0, this.s + i * 5);
    }
    pop();
  }
}

class Debris {
  constructor(angle, radius, size, type, col) {
    this.angle = angle;
    this.radius = radius;
    this.size = size;
    this.type = type;
    this.col = col;
  }

  update(speed) {
    this.angle += speed;
  }
}

class secondNature {
  constructor(x, y, s, debrisCount) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.debrisCount = debrisCount;
    this.speed = 0.01;

    this.debris = [];

    this.initDebris();
  }

  initDebris() {
    for (let i = 0; i < this.debrisCount; i++) {
      let angle = random(TWO_PI);
      let radius = random(this.s * 0.85, this.s * 1.25);
      let size = random(3, 10);
      let type = floor(random(4));
      let col = color(random(120, 255), random(120, 255), random(120, 255));

      this.debris.push(new Debris(angle, radius, size, type, col));
    }
  }

  update() {
    for (let d of this.debris) {
      d.update(this.speed);
    }
  }

  displayDebris() {
    for (let d of this.debris) {
      let x = d.radius * cos(d.angle);
      let y = d.radius * sin(d.angle) * 0.3;

      push();
      translate(x, y);
      fill(d.col);
      noStroke();
      if (d.type === 0) {
        circle(0, 0, d.size);
      } else if (d.type === 1) {
        rectMode(CENTER);
        rect(0, 0, d.size, d.size * 0.6);
      } else if (d.type === 2) {
        rectMode(CENTER);
        rect(0, 0, d.size * 2, d.size * 0.3);
      } else {
        triangle(-d.size / 2, d.size / 2, d.size / 2, d.size / 2, 0, -d.size / 2);
      }

      pop();
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(0.05);
    fill(90, 140, 255);
    arc(0, 0, this.s, this.s, 0, PI);
    this.displayDebris();

    noStroke();
    arc(0, 0, this.s, this.s, PI, 0);

    pop();
  }
}

function drawglass() {
  push();
  noFill();
  strokeWeight(2);
  blendMode(BLEND);
  let layers = 100;
  for (let i = 0; i < layers; i++) {
    stroke(0, 0, 0, map(i, 0, layers - 1, 255, 0));
    rect(i - 65, i - 15, originW + 130 - 2 * i, originH + 30 - 2 * i, 50);
  }
  pop();
}

function drawSecondnature() {
  drawBackground();
  for (let p of particles) {
    p.update();
    p.display();
  }
  if (OctopusBubbles) {
    for (let o of Obubbles) {
      o.update();
      o.display();
    }
    Oflash.update();
    Oflash.display();
  }

  if (JellyfishBubbles) {
    for (let j of Jbubbles) {
      j.update();
      j.display();
    }
    Jflash.update();
    Jflash.display();
  }
  if (showOctopus) {
    octoScale = min(octoScale + 0.02, 1);
    octoProgress = min(octoProgress + 0.01, 1);
    octoX = lerp(octoStartX, octoFinalX, octoProgress);
    octoY = lerp(octoStartY, octoFinalY, octoProgress);
    push();
    translate(octoX, octoY);
    scale(octoScale);
    octopus.update();
    octopus.display();
    pop();
    if (showOD8) {
      push();
      imageMode(CENTER);
      image(OD8, 80, 150, OD8.width / 10, OD8.height / 10);
      pop();
    }
  }

  if (showJellyfish) {
    jellyScale = min(jellyScale + 0.02, 1);
    jellyProgress = min(jellyProgress + 0.01, 1);
    jellyX = lerp(jellyStartX, jellyFinalX, jellyProgress);
    jellyY = lerp(jellyStartY, jellyFinalY, jellyProgress);
    push();
    translate(jellyX, jellyY);
    scale(jellyScale);
    jellyfish.update();
    jellyfish.display();
    pop();
    if (showFNJ) {
      push();
      imageMode(CENTER);
      image(FNJ, 720, 150, FNJ.width / 10, FNJ.height / 10);
      pop();
    }
  }
}

function drawBackground() {
  for (let i = 0; i < originH; i++) {
    let t = i / originH;
    let topColor = color(30, 150, 30, 80);
    let midColor = color(119, 106, 149, 60);
    let deepColor = color(0, 0, 0, 120);
    let bottomColor = color(80, 80, 80, 120);
    let c;
    if (t < 0.3) {
      c = lerpColor(topColor, midColor, map(t, 0, 0.3, 0, 1));
    } else if (t < 0.6) {
      c = lerpColor(midColor, deepColor, map(t, 0.3, 0.6, 0, 1));
    } else {
      c = lerpColor(deepColor, bottomColor, map(t, 0.6, 1, 0, 1));
    }
    stroke(c);
    line(0, i, originW, i);
  }
  image(trashmountains[0], -180, 450, trashmountains[0].width * 3, trashmountains[0].height / 3);
  push();
  imageMode(CENTER);
  translate(150, 440);
  rotate(radians(78));
  image(seabedtrash, 0, 0, seabedtrash.width / 3, seabedtrash.height / 3);
  pop();
  image(trashmountains[1], -150, 380);
  image(trashmountains[3], 430, 250);
  image(trashmountains[2], 250, 420);
  push();
  imageMode(CENTER);
  translate(600, 330);
  rotate(radians(12));
  image(spacecraft, 0, 0);
  pop();
  image(net2, 400, 320, net2.width / 1.2, net2.height / 1.2);
}

class Flash {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.speed = 5;
    this.bright = 0;
    this.increasing = true;
  }

  update() {
    if (this.increasing) {
      this.bright += this.speed;
      if (this.bright >= 255) {
        this.bright = 255;
        this.increasing = false;
      }
    } else {
      this.bright -= this.speed;
      if (this.bright <= 0) {
        this.increasing = true;
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    blendMode(ADD);
    for (let i = 0; i < 3; i++) {
      fill(255, 255, 150, this.bright / (i + 1));
      circle(0, 0, this.size + i * 8);
    }
    fill(255, 255, 200, this.bright);
    circle(0, 0, this.size);
    blendMode(BLEND);
    pop();
  }
}

class Particle {
  constructor(x, y, size, col, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
    this.speed = speed;
  }

  update() {
    this.y += this.speed;
    if (this.y > originH) {
      this.y = 0;
    }
  }
  display() {
    noStroke();
    fill(this.col);
    circle(this.x, this.y, this.size);
  }

}

class Bubble {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.yOrigin = y;
    this.size = size;
    this.speed = speed;
    this.transparency = random(100, 200);
  }
  update() {
    this.y -= this.speed;
    this.transparency -= 1;
    if (this.transparency <= 0 || this.y <= 0) {
      this.y = this.yOrigin;
      this.transparency = random(100, 200);
    }
  }
  display() {
    fill(200, 220, 255, this.transparency);
    circle(this.x, this.y, this.size);
  }
}

class Octopus {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.s = 0;
    this.colors = []
    for (let i = 0; i < 24; i++) {
      this.colors.push(random(50, 250));
    }
  }
  update() {
    this.s = sin(frameCount / 80) * 15;
  }

  display() {
    push();
    imageMode(CENTER);
    scale(this.size);

    push();
    tint(this.colors[0], this.colors[1], this.colors[2]);
    rotate(radians(this.s * 1.2));
    push();
    translate(-50, 50);
    rotate(radians(-25));
    image(pipe, 0, 0, pipe.width / 13, pipe.height / 12);
    pop();
    push();
    translate(-175, 40);
    rotate(radians(15));
    image(pipe, 0, 0, pipe.width / 10, pipe.height / 13);
    pop();
    noTint();
    image(cap, -50, 45, cap.width / 8, cap.height / 8);
    image(cap, -90, 50, cap.width / 9.5, cap.height / 9.5);
    image(cap, -120, 70, cap.width / 11, cap.height / 11);
    image(cap, -162, 50, cap.width / 7.5, cap.height / 7.5);
    image(cap, -195, 18, cap.width / 8.5, cap.height / 8.5);
    image(cap, -240, 12, cap.width / 11.5, cap.height / 11.5);
    pop();

    push();
    tint(this.colors[3], this.colors[4], this.colors[5]);
    rotate(radians(-this.s));
    push();
    translate(50, 50);
    scale(-1, 1);
    rotate(radians(-25));
    image(pipe, 0, 0, pipe.width / 13, pipe.height / 12);
    pop();
    push();
    translate(170, 40);
    scale(-1, 1);
    rotate(radians(15));
    image(pipe, 0, 0, pipe.width / 10, pipe.height / 13);
    pop();
    noTint();
    image(cap, 50, 45, cap.width / 8, cap.height / 8);
    image(cap, 90, 50, cap.width / 9.5, cap.height / 9.5);
    image(cap, 120, 70, cap.width / 11, cap.height / 11);
    image(cap, 162, 50, cap.width / 7.5, cap.height / 7.5);
    image(cap, 195, 18, cap.width / 8.5, cap.height / 8.5);
    image(cap, 240, 12, cap.width / 11.5, cap.height / 11.5);
    pop();

    push();
    tint(this.colors[6], this.colors[7], this.colors[8]);
    rotate(radians(this.s));
    push();
    translate(-40, 80);
    scale(-1, 1);
    rotate(radians(50));
    image(pipe, 0, 0, pipe.width / 10, pipe.height / 12);
    pop();
    push();
    translate(-165, 170);
    rotate(radians(-25));
    image(pipe, 0, 0, pipe.width / 8, pipe.height / 10);
    pop();
    noTint();
    image(cap, -45, 80, cap.width / 7, cap.height / 7);
    image(cap, -60, 130, cap.width / 9, cap.height / 9);
    image(cap, -95, 160, cap.width / 8, cap.height / 8);
    image(cap, -150, 168, cap.width / 5.5, cap.height / 5.5);
    image(cap, -205, 165, cap.width / 7.5, cap.height / 7.5);
    image(cap, -250, 195, cap.width / 9, cap.height / 9);
    pop();

    push();
    tint(this.colors[9], this.colors[10], this.colors[11]);
    rotate(radians(-this.s));
    push();
    translate(40, 80);
    rotate(radians(50));
    image(pipe, 0, 0, pipe.width / 10, pipe.height / 12);
    pop();
    push();
    translate(165, 170);
    scale(-1, 1);
    rotate(radians(-25));
    image(pipe, 0, 0, pipe.width / 8, pipe.height / 10);
    pop();
    noTint();
    image(cap, 45, 80, cap.width / 7, cap.height / 7);
    image(cap, 60, 130, cap.width / 9, cap.height / 9);
    image(cap, 95, 160, cap.width / 8, cap.height / 8);
    image(cap, 150, 168, cap.width / 5.5, cap.height / 5.5);
    image(cap, 205, 165, cap.width / 7.5, cap.height / 7.5);
    image(cap, 250, 195, cap.width / 9, cap.height / 9);
    pop();

    push();
    tint(this.colors[12], this.colors[13], this.colors[14]);
    rotate(radians(-this.s * 0.8));
    push();
    translate(-110, 90);
    scale(-1, 1);
    rotate(radians(20));
    image(pipe, 0, 0, pipe.width / 8, pipe.height / 15);
    pop();
    push();
    translate(-220, 130);
    scale(1, -1);
    rotate(radians(-5));
    image(pipe, 0, 0, pipe.width / 15, pipe.height / 22);
    pop();
    noTint();
    image(cap, -60, 58, cap.width / 13, cap.height / 13);
    image(cap, -92, 75, cap.width / 9, cap.height / 9);
    image(cap, -128, 105, cap.width / 10.5, cap.height / 10.5);
    image(cap, -180, 128, cap.width / 11.5, cap.height / 11.5);
    image(cap, -230, 135, cap.width / 13.5, cap.height / 13.5);
    pop();

    push();
    tint(this.colors[15], this.colors[16], this.colors[17]);
    rotate(radians(this.s * 0.8));
    push();
    translate(110, 90);
    rotate(radians(20));
    image(pipe, 0, 0, pipe.width / 8, pipe.height / 15);
    pop();
    push();
    translate(220, 130);
    rotate(radians(-5));
    image(pipe, 0, 0, pipe.width / 15, pipe.height / 22);
    pop();
    noTint();
    image(cap, 60, 58, cap.width / 13, cap.height / 13);
    image(cap, 92, 75, cap.width / 9, cap.height / 9);
    image(cap, 128, 105, cap.width / 10.5, cap.height / 10.5);
    image(cap, 180, 128, cap.width / 11.5, cap.height / 11.5);
    image(cap, 230, 135, cap.width / 13.5, cap.height / 13.5);
    pop();

    push();
    tint(this.colors[18], this.colors[19], this.colors[20]);
    rotate(radians(-this.s * 0.4));
    push();
    translate(-30, 90);
    rotate(radians(100));
    image(pipe, 0, 0, pipe.width / 5, pipe.height / 12);
    pop();
    push();
    translate(-70, 290);
    rotate(radians(85));
    image(pipe, 0, 0, pipe.width / 15, pipe.height / 15);
    pop();
    noTint();
    image(cap, -20, 70, cap.width / 8.5, cap.height / 8.5);
    image(cap, -42, 120, cap.width / 6.5, cap.height / 6.5);
    image(cap, -63, 180, cap.width / 10, cap.height / 10);
    image(cap, -62, 250, cap.width / 12, cap.height / 12);
    image(cap, -75, 300, cap.width / 13, cap.height / 13);
    pop();

    push();
    tint(this.colors[21], this.colors[22], this.colors[23]);
    rotate(radians(this.s * 0.4));
    push();
    translate(30, 90);
    scale(-1, 1);
    rotate(radians(100));
    image(pipe, 0, 0, pipe.width / 5, pipe.height / 12);
    pop();
    push();
    translate(70, 290);
    scale(-1, 1);
    rotate(radians(85));
    image(pipe, 0, 0, pipe.width / 15, pipe.height / 15);
    pop();
    noTint();
    image(cap, 20, 70, cap.width / 8.5, cap.height / 8.5);
    image(cap, 42, 120, cap.width / 6.5, cap.height / 6.5);
    image(cap, 63, 180, cap.width / 10, cap.height / 10);
    image(cap, 62, 250, cap.width / 12, cap.height / 12);
    image(cap, 75, 300, cap.width / 13, cap.height / 13);
    pop();

    noTint();
    imageMode(CENTER);
    image(oil, -12, -20, oil.width / 2.5, oil.height / 2.5);
    image(eye, 0, -20, eye.width / 3, eye.height / 3);
    pop();
  }
}

class Jellyfish {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.s = 0;
    this.colors = []
    for (let i = 0; i < 9; i++) {
      this.colors.push(random(50, 250));
    }
  }
  update() {
    this.s = sin(frameCount / 80) * 15;
  }

  display() {
    push();
    imageMode(CENTER);
    scale(this.size);

    push();
    rotate(radians(-75));
    noTint();
    image(net, 0, 0, net.width / 4 + this.s * 2, net.height / 4);
    pop();
    noTint();
    image(eye, 0, -50, eye.width / 3, eye.height / 3);
    tint(this.colors[0], this.colors[1], this.colors[2]);
    image(hooks, -10, 235, hooks.width * 1.2, hooks.height * 1.2 - this.s * 2);

    push();
    translate(-80, 130);
    translate(0, -hook.height / 6);
    rotate(radians(this.s / 3));
    translate(0, hook.height / 6);
    tint(this.colors[3], this.colors[4], this.colors[5]);
    image(hook, 0, 0, hook.width / 3, hook.height / 3);
    pop();

    push();
    translate(-115, 230);
    translate(0, -hook.height / 4);
    rotate(radians(this.s / 2));
    translate(0, hook.height / 4);
    tint(this.colors[6], this.colors[7], this.colors[8]);
    image(hook, 0, 0, hook.width / 2.5, hook.height / 2);
    pop();

    push();
    scale(-1, 1);
    translate(-68, 135);
    translate(0, -hook.height / 6);
    rotate(radians(this.s / 3));
    translate(0, hook.height / 6);
    tint(this.colors[3], this.colors[4], this.colors[5]);
    image(hook, 0, 0, hook.width / 3, hook.height / 3);
    pop();

    push();
    scale(-1, 1);
    translate(-102, 230);
    translate(0, -hook.height / 4);
    rotate(radians(this.s / 2));
    translate(0, hook.height / 4);
    tint(this.colors[6], this.colors[7], this.colors[8]);
    image(hook, 0, 0, hook.width / 2.5, hook.height / 2);
    pop();
    pop();
  }
}

function drawoildrum() {
  imageMode(CENTER);
  image(inoildrum, originW / 2, originH / 2, originW, originH);
  image(skeletons[0], 700, 380);
  image(skeletons[2], 280, 330, skeletons[2].width * 1.4, skeletons[2].height * 1.4);
  image(skeletons[3], 200, 360);
  image(skeletons[5], 530, 300, skeletons[5].width / 1.8, skeletons[5].height / 1.8);
}

function drawaircraft() {
  imageMode(CENTER);
  image(inaircraft, originW / 2, originH / 2, originW, originH);
  image(skeletons[2], 535, 250);
  image(skeletons[1], 400, 170, skeletons[1].width / 8, skeletons[1].height / 8);
  push();
  translate(300, 250)
  scale(-1, 1);
  image(skeletons[4], 0, 0);
  pop();
  image(skeletons[6], 160, 320);
}

function playBoneMessage(index) {
  if (index < boneMessages.length && boneMessages[index]) {
    boneMessagePlayed[index] = true;
    currentBoneMessage = boneMessages[index];
    currentBoneMessage.play();
    currentBoneMessage.setVolume(2);
    currentBoneMessage.onended(function () {
      boneMessageIndex++;
      boneMessageFinished[index] = true;
      let allFinished = true;
      for (let i = 0; i < boneMessagesFinished.length; i++) {
        if (!boneMessagesFinished[i]) {
          allFinished = false;
          break;
        }
      }
      if (allFinished) {
        lastBoneMessageFinished = true;
      }
    })
  }
}

function drawEnding() {
  push();
  fill(0);
  rect(0, 0, originW, originH);
  textFont('monospace');
  textSize(15);
  fill(255, 0, 0);
  let txt = "No more messages. They are all gone.";
  text(txt, 20, 40);
  pop();
}