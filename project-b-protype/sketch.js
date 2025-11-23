let octopus, oil, pipe, cap, eye;
let jellyfish, hook, hooks, net, eye2;

function preload() {
  oil = loadImage("assets/oil drum.png");
  eye = loadImage("assets/eye.png");
  pipe = loadImage("assets/pipes.png");
  cap = loadImage("assets/cap.png");
  net = loadImage("assets/net.png");
  hooks = loadImage("assets/hooks.png");
  hook = loadImage("assets/hook.png");
  eye2 = loadImage("assets/eye2.png");
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  octopus = new Octopus(width / 2, 80);
  //jellyfish = new Jellyfish(width / 2, 100);
  noStroke();
}

function draw() {
  background(100);
  octopus.display();
  octopus.update();
  // jellyfish.display();
  // jellyfish.update();
}

class Octopus {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
    translate(this.x, this.y);
    imageMode(CENTER);

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
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
    translate(this.x, this.y);
    imageMode(CENTER);
    push();
    rotate(radians(-75));
    noTint();
    image(net, 0, 0, net.width / 4 + this.s * 2, net.height / 4);
    pop();
    noTint();
    image(eye2, 0, -50, eye2.width / 4, eye2.height / 4 + this.s);
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
  }
}