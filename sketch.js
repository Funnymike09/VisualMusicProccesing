let time = 0;
let x = 0;
let COLORS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423', '#4E90B9', '#F38630' ];

let pool = [];
let spectrum=[];
let sound;
let fft;
let center;
let first=0;
let tempy;

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
  center=createVector(windowWidth/2, windowHeight/2)
	
}

function draw() {
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

	update();
	spectrum[100]=20
	noFill();
	stroke(200,map(spectrum[100],420,69,2,0),map(spectrum[100],2,225,325,10))
	spectrum = fft.analyze();
  //draw music line 
  for (var i = 0; i< spectrum.length/5; i++){
    let x = map(i, 0, spectrum.length/8, 0, width);
    let h = -height + map(spectrum[i+20], 0, 400, height, height/5*1);
    rect(x, height, width / spectrum.length/2, h );
  }
  noFill();
  noStroke();
  
  x = 0;
	beginShape();
  while (x <= 360) {
    stroke( '#F9D423');
    y=100 + 200 * noise (x * 0.01, time)*spectrum[int(x/5)]/170;
		if(x==0)
			tempy=y;
    x = x + 1;
		
		vertex(center.x+sin(radians(x))*lerp(y, tempy, x/360),center.y+cos(radians(x))*lerp(y, tempy, x/360))
  }
	endShape();
	
	beginShape();
	x=-180
  while (x <= 180) {
    stroke('#F38630');
    y=50 + 200 * noise (x * 0.01, time)*spectrum[int((x+180)/5)]/300;
		if(x==-180)
			tempy=y;
    x = x + 1;
		
		vertex(center.x+sin(radians(x))*lerp(y, tempy, x/360),center.y+cos(radians(x))*lerp(y, tempy, x/360))
  }
	endShape();
	
	beginShape();
	x=-45
  while (x <= 315) {
    stroke('#69D2E7');
    y=1 + 200 * noise (x * 0.01, time)*spectrum[int((x+45)/5)]/400;
		if(x==-45)
			tempy=y;
    x = x + 1;
		
		vertex(center.x+sin(radians(x))*lerp(y, tempy, x/360),center.y+cos(radians(x))*lerp(y, tempy, x/360))
  }
	endShape();
  
  time = time + 0.03;
	if(frameCount<200){
		fill(255,255,255)
		stroke(255,255,255)
    textSize(32);
    text("click to play",40,40);
  }
}

function mousePressed() {
  if(first==0||!sound.isLooping()){
    sound.loop();
    first=1;
  }
}



function update() {
    
    }
function moved() {
    for ( i = 0; i < max; i++ ) {
      spawn(map(spectrum[100],20,225,235,150),map(spectrum[100],20,225,215,150));
    }
}

function mouseMoved() {
   moved();
}

function touchMoved() {
    moved();
}