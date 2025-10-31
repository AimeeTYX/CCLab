/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new LoboLochon(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class LoboLochon {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.t = random(1000);
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    this.jumpUp = sin(frameCount * 0.08) * -40;
    this.noseScale = 0.05 * sin(frameCount * 0.08) + 1;
    this.earSwing = radians(sin(frameCount * 0.08) * 10);
    this.t += 0.01;
    this.xMove = sin(this.t) * 40;
    this.yMove = cos(this.t) * 10;
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x + this.xMove, this.y + this.yMove);
    noStroke();

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    push();
    rotate(sin(this.t * 20) * 0.15);
    fill(255, 174, 185);
    rect(-33, 25, 12, 12);
    rect(21, 25, 12, 12);
    fill(227, 115, 131);
    arc(-27, 37, 12, 8, 0, PI);
    arc(27, 37, 12, 8, 0, PI);

    fill('pink');
    ellipse(0, 0, 85, 80);


    push();
    fill(255, 174, 185);
    translate(-12, -22);
    rotate(radians(-28) + this.earSwing);
    translate(-15, -10);
    ellipse(0, 0, 30, 20);
    pop();

    push();
    fill(255, 174, 185);
    translate(12, -22);
    rotate(radians(28) - this.earSwing);
    translate(15, -10);
    ellipse(0, 0, 30, 20);
    pop();

    push();
    stroke(0);
    translate(7, -4);
    rotate(radians(25));
    fill(255);
    strokeWeight(2);
    ellipse(0, 0, 14, 20);
    fill(0);
    circle(-2, 1, 7);
    pop();

    push();
    stroke(0);
    translate(-8, -3);
    rotate(radians(-20));
    fill(255);
    strokeWeight(2);
    ellipse(0, 0, 12, 15);
    fill(0);
    circle(1.5, 1, 5);
    pop();

    noStroke();
    fill(227, 115, 131);
    push();
    scale(this.noseScale);
    ellipse(0, 13, 45, 32);

    push();
    translate(-8, 13);
    rotate(radians(-32));
    fill(0);
    ellipse(0, 0, 6, 4);
    pop();

    push();
    translate(8, 13);
    rotate(radians(32));
    fill(0);
    ellipse(0, 0, 6, 4);
    pop();
    pop();

    fill(0);
    triangle(-6, -12, -14, -17, -17, -13);
    triangle(2, -13, 11, -21, 15, -17);
    pop();

    push();
    translate(0, -40 + this.jumpUp);

    fill(255, 239, 219);
    ellipse(0, -70, 80, 75);
    circle(0, -45, 35);
    circle(0, -95, 35);
    circle(-15, -50, 35);
    circle(15, -50, 35);
    circle(-15, -90, 35);
    circle(15, -90, 35);
    circle(-25, -80, 35);
    circle(25, -80, 35);
    circle(-25, -60, 35);
    circle(25, -60, 35);
    circle(-28, -70, 35);
    circle(28, -70, 35);

    fill(205, 129, 98);
    ellipse(0, -65, 45, 50);

    push();
    translate(-18, -70);
    rotate(radians(40) - this.earSwing);
    translate(-10, -8);
    ellipse(0, 0, 20, 15);
    pop();

    push();
    translate(18, -70);
    rotate(radians(-40) + this.earSwing);
    translate(10, -8);
    ellipse(0, 0, 20, 15);
    pop();

    stroke(0);
    strokeWeight(2.5);
    line(0, -42, 0, -48);
    line(0, -48, -8, -52);
    line(0, -48, 8, -52);
    strokeWeight(2);
    fill(255);
    ellipse(-5, -66, 8, 10);
    ellipse(4, -66, 10, 13);
    strokeWeight(2.5);
    line(-12, -67, 12, -68);
    noStroke();
    fill(0);
    arc(-4, -66, 6, 5, 0, PI);
    arc(4, -67, 7, 8, 0, PI);

    push();
    translate(-8, -78);
    rotate(radians(70));
    ellipse(0, 0, 3, 8);
    pop();

    push();
    translate(8, -78);
    rotate(radians(-70));
    ellipse(0, 0, 3, 8);
    pop();

    pop();




    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.


    pop();
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/