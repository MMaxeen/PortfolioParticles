var x = 0, y = 0,
    vx = 0, vy = 0,
	ax = 0, ay = 0;
	
var sphere = document.getElementById("sphere");
var sphere2 = document.getElementById("follower");
var window = document.getElementById("particles-js");

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {
    ax = event.accelerationIncludingGravity.x * 20;
		ay = event.accelerationIncludingGravity.y * 20;
		document.getElementById("accelerationX").innerHTML = e.accelerationIncludingGravity.x;
		document.getElementById("accelerationY").innerHTML = e.accelerationIncludingGravity.y;
		document.getElementById("accelerationZ").innerHTML = e.accelerationIncludingGravity.z;

		if ( e.rotationRate ) {
			document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha;
			document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta;
			document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma;
		}		
	}

	setInterval( function() {
		var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
		if ( landscapeOrientation) {
			vx = vx + ay;
			vy = vy + ax;
		} else {
			vy = vy - ay;
			vx = vx + ax;
		}
		vx = vx * 0.98;
		vy = vy * 0.98;
		y = parseInt(y + vy / 50);
		x = parseInt(x + vx / 50);
		
		boundingBoxCheck();
		
		sphere.style.top = y;
    sphere.style.left = x;

    sphere2.style.top = y;
    sphere2.style.left = x;
    
		
	}, 20);
} 


function boundingBoxCheck(){
	if (x<0) { x = 0; vx = -vx; }
	if (y<0) { y = 0; vy = -vy; }
	if (x>document.documentElement.clientWidth) { x = document.documentElement.clientWidth; vx = -vx; }
	if (y>document.documentElement.clientHeight) { y = document.documentElement.clientHeight; vy = -vy; }
	
}

// if ( !window.requestAnimationFrame ) {
 
//   window.requestAnimationFrame = ( function() {

//       return window.webkitRequestAnimationFrame ||
//       window.mozRequestAnimationFrame ||
//       window.oRequestAnimationFrame ||
//       window.msRequestAnimationFrame ||
//       function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

//           window.setTimeout( callback, 1000 / 60 );

//       };

//   } )();

// }


// var ball;
// var w;
// var h;

// function init()
// {
//   ball = document.getElementById("ball");
//   w = window.innerWidth;
//   h = window.innerHeight;

// ball.style.left = (w)+"px";
// ball.style.top = (h)+"px";
// ball.velocity = {x:0,y:0}
// ball.position = {x:0,y:0}
  
//   if (window.DeviceOrientationEvent) {
  
//   window.addEventListener("deviceorientation", function(event) 
//   {
//     ball.velocity.y = Math.round(event.beta);
//     ball.velocity.x = Math.round(event.gamma);
//       }
//                              )
//   }
//   else {
//   alert("Sorry, your browser doesn't support Device Orientation");
// } ;
  
//   update();
// }

// function update()
// {
//       ball.position.x += ball.velocity.x;
//       ball.position.y += ball.velocity.y;
      
//       if(ball.position.x > (w) && ball.velocity.x > 0)
//     {
//        ball.position.x = w;
//     }
    
//     if(ball.position.x < 0 && ball.velocity.x < 0)
//     {
//       ball.position.x = 0;
//     }
    
//     if(ball.position.y > (h) && ball.velocity.y > 0)
//     {
//        ball.position.y = h;
//     }
    
//     if(ball.position.y < 0 && ball.velocity.y < 0)
//     {
//        ball.position.y = 0;
//     }
  
//       ball.style.top = ball.position.y + "px"
//       ball.style.left = ball.position.x + "px"
  
//   requestAnimationFrame( update );//KEEP ANIMATING
//   }



// var root = document.querySelector('html');

// // Real cursor element
// var cursor = document.querySelector('.cursor');

// root.addEventListener('mousemove', function (e) {
//   setPosition(cursor, e);
// });

// function setPosition(element, e) {
//   element.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0)';
// }

var root = document.querySelector('html');

// Real cursor element
var cursor = document.querySelector('.cursor');

// Following extra cursor element
var follower = document.querySelector('.cursor__follower');


root.addEventListener('mousemove', function (e) {
  setPosition(follower, e);
  setPosition(cursor, e);
});

function setPosition(element, e) {
  element.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0)';
}




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
  
var part = document.getElementById('particles-js');
var colr = document.querySelector('.container');
var color = document.querySelector('.prez');
var logo = document.querySelector('.icon-Logomm');
var card = document.querySelector('.card');
colr.addEventListener("click", function(e) {
  color.classList.toggle("testcolor");
  logo.classList.toggle("testcolor");
});
  
colr.addEventListener("click", function(e) {
  card.classList.toggle("active");
})

var menu = document.querySelector('.menu');
burger.addEventListener("click", function(e) {
  burger.classList.toggle("active");
});

  /* ---- particles.js config ---- */

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 70,
        "density": {
          "enable": true,
          "value_area": 80
        }
      },
      "color": {
        "value": "#404fe6"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#404fe6"
        },
        "polygon": {
          "nb_sides": 6
        },
        "image": {
          "src": "img/github.svg",
          "width": 10,
          "height": 10
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.6,
          "sync": false
        }
      },
      "size": {
        "value": 0,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 4,
          "size_min": 2,
          "sync": true
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 40,
        "color": "#fff",
        "opacity": 1,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 80,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 80,
          "size": 6,
          "duration": 3,
          "opacity": 1,
          "speed": 6
        },
        "repulse": {
          "distance": 600,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 20
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
  
  var particle = document.getElementById('particles-js');
  particle.addEventListener("click", function(e) {
    particle.classList.toggle("ghost");
  });