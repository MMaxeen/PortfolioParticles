var jardin = document.querySelector('body'),
    balle = document.querySelector('.cursor'),
    resultat = document.querySelector('.resultat'),
    maxX = jardin.clientWidth  - balle.clientWidth,
    maxY = jardin.clientHeight - balle.clientHeight;

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

window.addEventListener('deviceorientation', handleOrientation);

var root = document.querySelector('html');

// Real cursor element
var cursor = document.querySelector('.cursor');

root.addEventListener('mousemove', function (e) {
  setPosition(cursor, e);
});


function setPosition(element, e) {
  element.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0)';
}

root.addEventListener('mousemove', function (e) {
  setPosition(cursor, e);
});


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

var colr = document.querySelector('.container');
var color = document.querySelector('.prez');
colr.addEventListener("click", function(e) {
  color.classList.toggle("testcolor");
});
  
// var menu = document.querySelector('.menu');
burger.addEventListener("click", function(e) {
  burger.classList.toggle("active");
});

  /* ---- particles.js config ---- */

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 200
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#fff"
        },
        "polygon": {
          "nb_sides": 5
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
          "enable": true,
          "speed": 1,
          "opacity_min": 0.2,
          "sync": true
        }
      },
      "size": {
        "value": 0,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 100,
        "color": "#fff",
        "opacity": 1,
        "width": 0.2
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": true,
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
          "distance": 120,
          "line_linked": {
            "opacity": 100
          }
        },
        "bubble": {
          "distance": 300,
          "size": 100,
          "duration": 2,
          "opacity": 0.4,
          "speed": 3
        },
        "repulse": {
          "distance": 800,
          "duration": 0.3
        },
        "push": {
          "particles_nb": 200
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
  
  