var NUM_PARTICLES = ( ( ROWS = 200 ) * ( COLS = 400 ) ),
    THICKNESS = Math.pow( 80, 2 ),
    SPACING = 3,
    MARGIN = 20,
    COLOR = 200,
    DRAG = 0.95,
    EASE = 0.25,
    
    /*
    
    used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation

    B = 4 / Math.PI,
    C = -4 / Math.pow( Math.PI, 2 ),
    P = 0.225,

    */ 

    container,
    particle,
    canvas,
    mouse,
    stats,
    list,
    ctx,
    tog,
    man,
    dx, dy,
    mx, my,
    d, t, f,
    a, b,
    i, n,
    w, h,
    p, s,
    r, c
    ;

particle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0
};

function init() {

  container = document.querySelector( '.container' );
  canvas = document.querySelector( '.canvas' );
  
  ctx = canvas.getContext( '2d' );

  man = false;
  tog = true;
  
  list = [];
  
  w = canvas.width = COLS * SPACING + MARGIN * 2;
  h = canvas.height = ROWS * SPACING + MARGIN * 2;
  // canvas.width = W;
  // canvas.height = H;
  
  
  for ( i = 0; i < NUM_PARTICLES; i++ ) {
    
    p = Object.create( particle );
    p.x = p.ox = MARGIN + SPACING * ( i % COLS );
    p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );
    
    list[i] = p;
  }

  container.addEventListener( 'mousemove', function(e) {

    bounds = container.getBoundingClientRect();
    mx = e.clientX - bounds.left;
    my = e.clientY - bounds.top;
    man = true;
    

    function handleOrientation(event) {
      var x = event.beta,  // En degré sur l'interval [-180,180].
          y = event.gamma; // En degré sur l'interval [-90,90].
    
      resultat.innerHTML  = "beta : " + x + "<br />";
      resultat.innerHTML += "gamma: " + y + "<br />";
    
      // Parce-que l'on ne veut pas avoir l'appareil à l'envers.
      // On restreint les valeurs de x à l'intervalle [-90,90].
      if (x >  90) { x =  90};
      if (x < -90) { x = -90};
      // Pour rendre le calcul plus simple.
      // On délimite l'intervalle de x et y sur [0, 180].
      x += 90;
      y += 90;
    
      // 10 est la moitié de la taille de la balle.
      // Cela centre le point de positionnement au centre de la balle.
    
      balle.style.top  = (maxX * x / 180 - 10) + "px";
      balle.style.left = (maxY * y / 180 - 10) + "px";
    }
  });
  
  
  if ( typeof Stats === 'function' ) {
    document.body.appendChild( ( stats = new Stats() ).domElement );
  }
  
  document.querySelector( '.canvas' );
}

function step() {

  if ( stats ) stats.begin();

  if ( tog = !tog ) {

    if ( !man ) {

      t = +new Date() * 0.001;
      mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
      my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
    }
      
    for ( i = 0; i < NUM_PARTICLES; i++ ) {
      
      p = list[i];
      
      d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
      f = -THICKNESS / d;

      if ( d < THICKNESS ) {
        t = Math.atan2( dy, dx );
        p.vx += f * Math.cos(t);
        p.vy += f * Math.sin(t);
      }

      p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
      p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

    }

  } else {

    b = ( a = ctx.createImageData( w, h ) ).data;

    for ( i = 0; i < NUM_PARTICLES; i++ ) {

      p = list[i];
      b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
    }

    ctx.putImageData( a, 0, 0 );
  }

  if ( stats ) stats.end();

  requestAnimationFrame( step );
}

init();
step();


// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     ||  
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

// Initializing the canvas
// I am using native JS here, but you can use jQuery, 
// Mootools or anything you want
var canvas = document.querySelector("canvas");

// Initialize the context of the canvas
var ctx = canvas.getContext("2d");

// Set the canvas width and height to occupy full window
var W = window.innerWidth, H = window.innerHeight;
canvas.width = W;
canvas.height = H;

// Some variables for later use
var particleCount = 1000,
	particles = [],
	minDist = 20,
	dist;

// Function to paint the canvas black
function paintCanvas() {
	// Set the fill color to black
	ctx.fillStyle = "rgba(0,0,0,1)";
	
	// This will create a rectangle of white color from the 
	// top left (0,0) to the bottom right corner (W,H)
	ctx.fillRect(0,0,W,H);
}

// Now the idea is to create some particles that will attract
// each other when they come close. We will set a minimum
// distance for it and also draw a line when they come
// close to each other.

// The attraction can be done by increasing their velocity as 
// they reach closer to each other

// Let's make a function that will act as a class for
// our particles.

function Particle() {
	// Position them randomly on the canvas
	// Math.random() generates a random value between 0
	// and 1 so we will need to multiply that with the
	// canvas width and height.
	this.x = Math.random() * W;
	this.y = Math.random() * H;
	
	
	// We would also need some velocity for the particles
	// so that they can move freely across the space
	this.vx = -1 + Math.random() * 2;
	this.vy = -1 + Math.random() * 2;

	// Now the radius of the particles. I want all of 
	// them to be equal in size so no Math.random() here..
	this.radius = 1;
	
	// This is the method that will draw the Particle on the
	// canvas. It is using the basic fillStyle, then we start
	// the path and after we use the `arc` function to 
	// draw our circle. The `arc` function accepts four
	// parameters in which first two depicts the position
	// of the center point of our arc as x and y coordinates.
	// The third value is for radius, then start angle, 
	// end angle and finally a boolean value which decides
	// whether the arc is to be drawn in counter clockwise or 
	// in a clockwise direction. False for clockwise.
	this.draw = function() {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		
		// Fill the color to the arc that we just created
		ctx.fill();
	}
}

// Time to push the particles into an array
for(var i = 0; i < particleCount; i++) {
	particles.push(new Particle());
}

// Function to draw everything on the canvas that we'll use when 
// animating the whole scene.
function draw() {
	
	// Call the paintCanvas function here so that our canvas
	// will get re-painted in each next frame
	paintCanvas();
	
	// Call the function that will draw the balls using a loop
	for (var i = 0; i < particles.length; i++) {
		p = particles[i];
		p.draw();
	}
	
	//Finally call the update function
	update();
}

// Give every particle some life
function update() {
	
	// In this function, we are first going to update every
	// particle's position according to their velocities
	for (var i = 0; i < particles.length; i++) {
		p = particles[i];
		
		// Change the velocities
		p.x += p.vx;
		p.y += p.vy
			
		// We don't want to make the particles leave the
		// area, so just change their position when they
		// touch the walls of the window
		if(p.x + p.radius > W) 
			p.x = p.radius;
		
		else if(p.x - p.radius < 0) {
			p.x = W - p.radius;
		}
		
		if(p.y + p.radius > H) 
			p.y = p.radius;
		
		else if(p.y - p.radius < 0) {
			p.y = H - p.radius;
		}
		
		// Now we need to make them attract each other
		// so first, we'll check the distance between
		// them and compare it to the minDist we have
		// already set
		
		// We will need another loop so that each
		// particle can be compared to every other particle
		// except itself
		for(var j = i + 1; j < particles.length; j++) {
			p2 = particles[j];
			distance(p, p2);
		}
	
	}
}

// Distance calculator between two particles
function distance(p1, p2) {
	var dist,
		dx = p1.x - p2.x;
		dy = p1.y - p2.y;
	
	dist = Math.sqrt(dx*dx + dy*dy);
			
	// Draw the line when distance is smaller
	// then the minimum distance
	if(dist <= minDist) {
		
		// // Draw the line
		// ctx.beginPath();
		// ctx.strokeStyle = "rgba(255,255,255,"+ (1.2-dist/minDist) +")";
		// ctx.moveTo(p1.x, p1.y);
		// ctx.lineTo(p2.x, p2.y);
		// ctx.stroke();
		// ctx.closePath();
		
		// Some acceleration for the partcles 
		// depending upon their distance
		var ax = dx/2000,
			ay = dy/2000;
		
		// Apply the acceleration on the particles
		p1.vx -= ax;
		p1.vy -= ay;
		
		p2.vx += ax;
		p2.vy += ay;
	}
}

// Start the main animation loop using requestAnimFrame
function animloop() {
	draw();
	requestAnimFrame(animloop);
}

animloop();

