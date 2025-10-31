/*let mySound1;
let mySound2;
let speedX;

function preload() {
  mySound1 = loadSound("assets/beat.mp3")
  mySound2 = loadSound("assets/kick.mp3")
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  x = width / 2;
  speedX = 5;
}

function draw() {
  background(220);
  circle(x, height / 2, 50);
  x = x + speedX;
  if (x >= width - 25) {
    speedX = -speedX;
    mySound1.play();
  } else if (x <= 25) {
    speedX = -speedX;
    mySound2.play();
  }
}

function mousePressed() {
  if (mySound.isPlaying() == false) {
    mySound.play();
  }
}

let mic;

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
  colorMode(HSB, 100);
}

function draw() {
  background(0);
  let level = mic.getLevel();
  let dia = map(level, 0.0, 1.0, 0, 1000);
  let h = map(level, 0.0, 1.0, 0, 100);
  fill(h, 100, 100);
  noStroke();
  ellipse(width / 2, height / 2, dia, dia);
}
*/

let osc, playing, freq, amp;

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
}

function draw() {
  background(220)
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  text('tap to play', 20, 20);
  text('freq: ' + freq, 20, 40);
  text('amp: ' + amp, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}






