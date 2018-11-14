// var tl = new TimelineMax({repeat:-1});
//     //animate to a star
// 		tl.to("#polygon", 1, { morphSVG:"264,115 183,103 150,30 116,103 36,115 93,172 80,249 150,215 219,249 208,171", fill:"gray", delay:0.5, ease:Power2.easeInOut })
//     //animate to a line
// 		.to("#polygon", 1, {morphSVG: {points:"20,30, 290,140", shapeIndex:8}, delay:0.5, ease:Power2.easeInOut})
//     //rough wiggle effect before bursting forth into a rectangle...
// 		.to("#polygon", 0.1, {rotation:-5, transformOrigin:"50% 50%", delay:0.5})
// 		.to("#polygon", 0.5, {rotation:10, scale:1.2, ease:RoughEase.ease.config({strength:2, template:Back.easeInOut}), repeat:1, yoyo:true})

var root = document.querySelector('html');

// Real cursor element
// var cursor = document.querySelector('.cursor');

// root.addEventListener('mousemove', function (e) {
//   setPosition(cursor, e);
// });


// function setPosition(element, e) {
//   element.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0)';
// }

// root.addEventListener('mousemove', function (e) {
//   setPosition(cursor, e);
// });


var treshold = 750;

window.addEventListener("scroll", function(event){
    var myHead = document.querySelector('.second');
    if (window.scrollY > treshold) {
       myHead.classList.add("scrolled");
      }
      else{
        myHead.classList.remove("scrolled");
      }
      
});

var burger = document.querySelector('.menu'); 
var nav = document.querySelector("nav");
burger.addEventListener("click", function(e) {
    nav.classList.toggle("visible");
  });

  
// var menu = document.querySelector('.menu');
burger.addEventListener("click", function(e) {
  burger.classList.toggle("active");
});







var stopped = false,
rotated = 0;

var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
w = canvas.width = 340,
h = canvas.height = 340,
stop = function stop() {
	if (stopped == false) {
		stopped = true;
	} else {
		stopped = false;
	}
},
revert = function revert() {
	rotated = rotated + 90;
	canvas.style.transform = "rotateZ(" + rotated + "deg)";
};

var theta = 0,
amplitude = 65,
period = 200,
dx = null,
size = 8,
yValues = [],
timing = void 0,
strokeWidth = 3;

function setup() {
	// assume the device pixel ratio is 1 if the browser doesn't specify it
	var devicePixelRatio = window.devicePixelRatio || 1;

	// determine the 'backing store ratio' of the canvas context
	var backingStoreRatio =
	ctx.webkitBackingStorePixelRatio ||
	ctx.mozBackingStorePixelRatio ||
	ctx.msBackingStorePixelRatio ||
	ctx.oBackingStorePixelRatio ||
	ctx.backingStorePixelRatio || 1;


	// determine the actual ratio we want to draw at
	var ratio = devicePixelRatio / backingStoreRatio;

	if (devicePixelRatio !== backingStoreRatio) {
		// set the 'real' canvas size to the higher width/height
		canvas.width = w * ratio;
		canvas.height = h * ratio;

		// ...then scale it back down with CSS
		canvas.style.width = w + 'px';
		canvas.style.height = h + 'px';
	} else
	{
		// this is a normal 1:1 device; just scale it simply
		canvas.width = w;
		canvas.height = h;
		canvas.style.width = '';
		canvas.style.height = '';
	}
	// scale the drawing context so everything will work at the higher ratio
	ctx.scale(ratio, ratio);

	// Create lines 
	dx = Math.PI * 2 / period * size;
	for (x = 0; x < Math.round(w / size) + 3; x++) {
		yValues.push(x);
	}
	draw();
}

function draw() {
	if (stopped == false) {
		calcWave();
		renderWave();
	}
	timing = requestAnimationFrame(draw);
}

function calcWave() {
	ctx.clearRect(0, 0, 340, 340);
	theta += 0.02;
	var x = theta;

	for (i = 0; i < yValues.length; i++) {
		yValues[i] = Math.sin(x) * amplitude;
		x += dx;
	}
}

function renderWave() {
	ctx.lineWidth = strokeWidth;
	ctx.strokeStyle = "#333";
	for (x = 0; x < yValues.length; x++) {
		ctx.beginPath();
		ctx.moveTo(x * size - 15, 0);
		ctx.lineTo(x * size, w / 2 + yValues[x]);
		ctx.closePath();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x * size - 30, 340);
		ctx.lineTo(x * size, w / 2 + yValues[x]);
		ctx.closePath();
		ctx.stroke();
	}
}

setup();
