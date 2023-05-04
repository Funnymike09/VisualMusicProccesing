let time = 0;
let x = 0;

let pool = [];
let spectrum=[];
let sound;
let fft;
let centra;
let first=0;
let tempy;
let rot = 1;
let r = 0;
let angle = 0;
//attemt at rotation
function preload(){
	sound = loadSound('Route Nationale to Paris.mp3');
}

function setup() {
	noStroke();

	fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  fft.setInput(sound);
  if(windowHeight<windowWidth){
    r=windowHeight/8*3;
    pnum=windowHeight*2;
  }
  else{
	pnum=windowWidth*2;
    r=windowWidth/8*3;
  }
  createCanvas(windowWidth, windowHeight); 
  centra=createVector(windowWidth/2, windowHeight/2)
	
}

function draw() {
  //background
	const m = 1000;

  const topR = 255 * noise(frameCount / m);
  const topG = 255 * noise(1000 + frameCount / m);
  const topB = 255 * noise(2000 + frameCount / m);
  const bottomR = 255 * noise(3000 + frameCount / m);
  const bottomG = 255 * noise(4000  + frameCount / m);
  const bottomB = 255 * noise(5000 + frameCount / m);

  const topColor = color(topR, topG, topB);
  const bottomColor = color(bottomR, bottomG, bottomB);

  for(let y = 0; y < height; y++) {
    const lineColor = lerpColor(topColor, bottomColor, y / height);

    stroke(lineColor);
    line(0, y, width, y);
  }
//spectrum at the bottom
	update();
	spectrum[100]=20
	noFill();
	stroke(150,map(spectrum[150],100,22,2,150),map(spectrum[150],40,75,5,150))
	spectrum = fft.analyze();
  for (var i = 0; i< spectrum.length/5; i++){
    let x = map(i, 0, spectrum.length/6, 0, width);
    let h = -height + map(spectrum[i+10], 0, 400, height, height/5*1);
    rect(x, height, width / spectrum.length/2, h );
  }
  
  noFill();
  noStroke();
  //first circle
  x = 0;
	beginShape();
  while (x <= 360) {
    stroke( 'purple');
    y=150 + 200 * noise (x * 0.08, time)*spectrum[int(x/5)]/180;
		if(x==0)
			tempy=y;
    x = x + 1;
		vertex(centra.x+sin(radians(x))*lerp(y, tempy, x/360),centra.y+cos(radians(x))*lerp(y, tempy, x/360));
  }
	endShape();
	push();
	beginShape();
	x=-180
 //translate(windowHeight/2,windowWidth/2);
 // rotate(angle);
  while (x <= 180) {
    stroke('green');
    strokeWeight(2.5);
    y=70 + 200 * noise (x * 0.01, time)*spectrum[int((x+180)/10)]/300;
		if(x==-180)
			tempy=y;
    x = x + 1;
		
		vertex(centra.x+sin(radians(x+r))*lerp(y, tempy, x/360),centra.y+cos(radians(x))*lerp(y, tempy, x/360));
    
  }
	endShape();
	pop();
	beginShape();
	x=-45
  while (x <= 315) {
    stroke('yellow');
    strokeWeight(2);
    fill('#57341f');
    y=5 + 200 * noise (x * 0.09, time)*spectrum[int((x+75)/5)]/400;
		if(x==-45)
			tempy=y;
    x = x + 1;
		
		vertex(centra.x+sin(radians(x))*lerp(y, tempy, x/360),centra.y+cos(radians(x))*lerp(y, tempy, x/360))
  }
	endShape();
  
  time = time + 0.03;
	if(frameCount<200){
		fill(255,255,255)
		stroke(255,255,255)
    textSize(32);
    text("click to begin",40,40);
  }
  angle= angle +1;
}

function mousePressed() {
  if(first==0||!sound.isLooping()){
    sound.loop();
    first=1;
  }
}



function update() {
    
    }