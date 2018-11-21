if ( !window.requestAnimationFrame ) {
 
  window.requestAnimationFrame = ( function() {

      return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

          window.setTimeout( callback, 1000 / 60 );

      };

  } )();

}



var ball;
var w;
var h;

function init()
{
  ball = document.getElementById("ball");
 w = window.innerWidth;
   h = window.innerHeight;

ball.style.left = (w/2)-50+"px";
ball.style.top = (h/2)-50+"px";
ball.velocity = {x:0,y:0}
ball.position = {x:0,y:0}
  
  if (window.DeviceOrientationEvent) {
  
  window.addEventListener("deviceorientation", function(event) 
  {
    ball.velocity.y = Math.round(event.beta);
    ball.velocity.x = Math.round(event.gamma);
      }
                             )
  }
  else {
  	alert("Sorry, your browser doesn't support Device Orientation");
} ;
  
  update();
}

function update()
{
      ball.position.x += ball.velocity.x;
      ball.position.y += ball.velocity.y;
      
      if(ball.position.x > (w-100) && ball.velocity.x > 0)
    {
       ball.position.x = w-100;
    }
    
    if(ball.position.x < 0 && ball.velocity.x < 0)
    {
      ball.position.x = 0;
    }
    
    if(ball.position.y > (h-100) && ball.velocity.y > 0)
    {
       ball.position.y = h-100;
    }
    
    if(ball.position.y < 0 && ball.velocity.y < 0)
    {
       ball.position.y = 0;
    }
  
  ball.style.top = ball.position.y + "px"
      ball.style.left = ball.position.x + "px"
  
  requestAnimationFrame( update );//KEEP ANIMATING
}

var root = document.querySelector('html');

// Real cursor element
var cursor = document.querySelector('.cursor');

root.addEventListener('mousemove', function (e) {
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
colr.addEventListener("click", function(e) {
  color.classList.toggle("testcolor");
  logo.classList.toggle("testcolor");
});
  
var menu = document.querySelector('.menu');
burger.addEventListener("click", function(e) {
  burger.classList.toggle("active");
});

  /* ---- particles.js config ---- */

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 100
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "polygon",
        "stroke": {
          "width": 10,
          "color": "#000"
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
        "distance": 30,
        "color": "#fff",
        "opacity": 1,
        "width": 3
      },
      "move": {
        "enable": true,
        "speed": 5,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": true,
        "attract": {
          "enable": true,
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
          "mode": "grab"
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
          "distance": 200,
          "size": 40,
          "duration": 2,
          "opacity": 0.4,
          "speed": 3
        },
        "repulse": {
          "distance": 800,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 90
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
  
  