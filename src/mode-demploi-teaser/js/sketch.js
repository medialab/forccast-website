var space = 40;
var change = 500;
var minRadius =45;
var maxRadius = 60;

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight+12);
	canvas.parent('container-homescreen');
  noStroke()
  fill(22, 22, 22);
  background (255,255,255);

}

function draw() {
  space = (windowWidth*3.5)/100;
  background (255,255,255);
	xoff = sin(random(-1000,1000));
  for (var x = 20; x < windowWidth; x += space) {
    for (var y = 15; y < windowHeight; y += space) {

      // Track the position of cursor
      var radius = 1-(min(dist (x+xoff, y+xoff, mouseX, mouseY), change)/change);
      radius = lerp (minRadius, maxRadius, radius);
      // textSize(35);
      textSize((windowWidth*3)/100);
    //  var randomRadiusX = noise(random(100));
    //  var randomRadiusY = noise(random(100));
      var radiusX = sin(radius)*10;
      var radiusY = sin(radius)*10;
      /*if(randomRadiusX == 0){radiusX = -radius;}*/
      /*if(randomRadiusY == 0){radiusY = -radius;}*/
      text('+', x+radiusX, y+radiusY);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
