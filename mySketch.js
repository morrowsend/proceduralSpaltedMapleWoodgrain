kernel =[[ -1, -1, -1],
         [ -1,  8, -1],
         [ -1, -1, -1]];


/*  This version uses perlin noise on the canvas to create the camo design
*  Then it copies it to a GraphicsObject called buffer
*  then the buffer is used to create the final image outline
*  I tried using perlin noise on the graphics object directly, but it came 
*  out with a lot of aliasing and straight glitches 
* Reference for perlin noise/Camo design: A fork of Camouflage by ThingOnItsOwn
* Reference for edge detection: Edge Detection 1 by Richard Bourne  https://openprocessing.org/sketch/1103908
*/

var img;
var capture; //Globs picture
var dstimg; // edgeDetected image
ratio = 5;
var initalTime= 0;
var waitTime = 1000; // 1 seconds

function setup() {

	canvas = createCanvas(windowWidth, windowHeight);	
	pixelDensity(1); // turns off oversampling ("retina display")

	buffer = createGraphics(windowWidth, windowHeight);
	background(100);
  dstimg = createImage(windowWidth, windowHeight);

	iy = 0
}

function draw() {
	scale(1,1/ratio)

	// noisedetail(1,0.1)
	colorMode(RGB,255) ; 
	if (iy < windowHeight*ratio)
	for(nc=0;nc<5;nc++)
	{
		
			for(ix=0;ix<windowWidth;ix++)
		{
			// if (noise(ix*.003,iy*.003) > 0.6) stroke(color(255,255,255))
			// else if (noise(ix*.004+100,iy*.004) > 0.59) stroke(color(200,200,200))
			// else if (noise(ix*.004,iy*0.004+100) > 0.58) stroke(color(140,140,140))
			// else if (noise(ix*.004+1000,iy*.004+1000) > 0.57) stroke(color(100,100,100))
			// else if (noise(ix*.0125+2000,iy*.0125+1000) > 0.56) stroke(color(50,50,50))
			// else stroke(color(0,0,0))
			// point(ix,iy)
			
			//For  slightly more variation:
			if (noise(ix*.003,iy*.003) > 0.6) stroke(color(255,255,255))
			else if (noise(ix*.004+1000,iy*.004) > 0.59) stroke(color(200,200,200))
			else if (noise(ix*.004,iy*0.004+1000) > 0.58) stroke(color(140,140,140))
			else if (noise(ix*.004+1000,iy*.004+1000) > 0.57) stroke(color(100,100,100))
			else if (noise(ix*.0125+2000,iy*.0125+1000) > 0.56) stroke(color(50,50,50))
			else stroke(color(0,0,0))
			
			point(ix,iy)
		} //end for ix
	iy++
	}//end for nc
	
	

if(iy >= windowHeight*ratio){ //once finished drawing whole screen
		iy=0; //reset this so it'll stop counting.

	
	   buffer.copy(canvas,0, 0,  canvas.width, canvas.height,0, 0, windowWidth, windowHeight)// copy canvas to the graphicsObject
edgeDetect();
	noLoop();
}//end if iy >

}//end draw






function edgeDetect() {
	 print("millis: "+parseInt(millis())+" initalTime: "+parseInt(initalTime));
  if (millis() - initalTime > waitTime) {
    	// remove();//remove the canvas

		canvas = createCanvas(windowWidth, windowHeight)
	background(0);
	buffer.loadPixels(); // uncompress the image to the computer's RAM and store in the pixel array
	dstimg.loadPixels();
	// process image here:
	 
	let w = windowWidth;
	let h = windowHeight;

	// spatial processing of an image:
	// location variables
	// step one: color channels:
	let r = 0;
	let g = 1;
	let b = 2;
	let a = 3;

	// convolution kernel:
	var k1 = [[-1.0, 0.0, 1.0],
						[-2.0, 0.0, 2.0],
						[-1.0, 0.0, 1.0]];
	var k2 = [[-1.0, -2.0, -1.0],
						[0.0, 0.0, 0.0],
						[1.0, 2.0, 1.0]];
	

	for(let x = 0;x<w;x++)
	{
		for(let y = 0;y<h;y++)
		{
				// step two: neighbors
				let ul = ((x-1+w)%w + w*((y-1+h)%h))*4; // location of the upperleft pixel
				let uc = ((x+0+w)%w + w*((y-1+h)%h))*4; // location of the upper pixel
				let ur = ((x+0+w)%w + w*((y+1+h)%h))*4; // location of the upperright pixel
				let ml = ((x-1+w)%w + w*((y+0+h)%h))*4; // location of the left pixel
				let mc = ((x+0+w)%w + w*((y+0+h)%h))*4; // location of the CENTER pixel
				let mr = ((x+1+w)%w + w*((y+0+h)%h))*4; // location of the right pixel
				let ll = ((x-1+w)%w + w*((y+1+h)%h))*4; // location of the lowerleft pixel
				let lc = ((x+0+w)%w + w*((y+1+h)%h))*4; // location of the lower pixel
				let lr = ((x+1+w)%w + w*((y+1+h)%h))*4; // location of the lowerright pixel
				
			
			//If using a DRAWING on the buffer canvas the use this
				let pxul = buffer.pixels[ul+r] + buffer.pixels[ul+g] + buffer.pixels[ul+b];
				let pxuc = buffer.pixels[uc+r] + buffer.pixels[uc+g] + buffer.pixels[uc+b];
				let pxur = buffer.pixels[ur+r] + buffer.pixels[ur+g] + buffer.pixels[ur+b];
				let pxml = buffer.pixels[ml+r] + buffer.pixels[ml+g] + buffer.pixels[ml+b];
				let pxmc = buffer.pixels[mc+r] + buffer.pixels[mc+g] + buffer.pixels[mc+b];
				let pxmr = buffer.pixels[mr+r] + buffer.pixels[mr+g] + buffer.pixels[mr+b];
				let pxll = buffer.pixels[ll+r] + buffer.pixels[ll+g] + buffer.pixels[ll+b];
				let pxlc = buffer.pixels[lc+r] + buffer.pixels[lc+g] + buffer.pixels[lc+b];
				let pxlr = buffer.pixels[lr+r] + buffer.pixels[lr+g] + buffer.pixels[lr+b];

				let out1 = 0;
				out1 += pxul*k1[0][0];
				out1 += pxuc*k1[0][1];
				out1 += pxur*k1[0][2];
				out1 += pxml*k1[1][0];
				out1 += pxmc*k1[1][1];
				out1 += pxmr*k1[1][2];
				out1 += pxll*k1[2][0];
				out1 += pxlc*k1[2][1];
				out1 += pxlr*k1[2][2];
			
				let out2 = 0;
				out2 += pxul*k2[0][0];
				out2 += pxuc*k2[0][1];
				out2 += pxur*k2[0][2];
				out2 += pxml*k2[1][0];
				out2 += pxmc*k2[1][1];
				out2 += pxmr*k2[1][2];
				out2 += pxll*k2[2][0];
				out2 += pxlc*k2[2][1];
				out2 += pxlr*k2[2][2];
			
				let finalout = sqrt(out1*out1 + out2*out2);
			  if(finalout > 128) finalout=255
				dstimg.pixels[mc+r] = 255-finalout;
				dstimg.pixels[mc+g] = 255-finalout;
				dstimg.pixels[mc+b] = 255-finalout;
				dstimg.pixels[mc+a] = 255;
		}
	}

	
	//capture.updatePixels(); // puts the modified pixel array back and xfers it to the GPU
	dstimg.updatePixels();
	noSmooth();

	image(dstimg, 0, 0,  windowWidth, windowHeight);
		initalTime = millis();
		//tiempoEspera=random(1000,5000); 
	}	//end if time
}//end draw

let lapse = 0;    // mouse timer
function mousePressed(){
  // prevents mouse press from registering twice
  if (millis() - lapse > 400){
    save('pix.jpg');
    lapse = millis();
  }
}//end edge detect



