/*!
 * Emoji Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- https://codepen.io/tholman/full/rxJpdQ
 */

(function emojiCursor() {
  
    var possibleEmoji = ["😀", "😂", "😆", "😊"]
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = {x: width/2, y: width/2};
    var particles = [];
    
    function init() {
      bindEvents();
      loop();
    }
    
    // Bind events that are needed
    function bindEvents() {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchstart', onTouchMove);
      
      window.addEventListener('resize', onWindowResize);
    }
    
    function onWindowResize(e) {
      width = window.innerWidth;
      height = window.innerHeight;
    }
    
    function onTouchMove(e) {
      if( e.touches.length > 0 ) {
        for( var i = 0; i < e.touches.length; i++ ) {
          addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
        }
      }
    }
    
    function onMouseMove(e) {    
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      
      addParticle( cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
    }
    
    function addParticle(x, y, character) {
      var particle = new Particle();
      particle.init(x, y, character);
      particles.push(particle);
    }
    
    function updateParticles() {
      
      // Updated
      for( var i = 0; i < particles.length; i++ ) {
        particles[i].update();
      }
      
      // Remove dead particles
      for( var i = particles.length -1; i >= 0; i-- ) {
        if( particles[i].lifeSpan < 0 ) {
          particles[i].die();
          particles.splice(i, 1);
        }
      }
      
    }
    
    function loop() {
      requestAnimationFrame(loop);
      updateParticles();
    }
    
    /**
     * Particles
     */
    
    function Particle() {
  
      this.lifeSpan = 120; //ms
      this.initialStyles ={
        "position": "absolute",
        "display": "block",
        "pointerEvents": "none",
        "z-index": "10000000",
        "fontSize": "16px",
        "will-change": "transform"
      };
  
      // Init, and set properties
      this.init = function(x, y, character) {
  
        this.velocity = {
          x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
          y: 1
        };
        
        this.position = {x: x - 10, y: y - 20};
  
        this.element = document.createElement('span');
        this.element.innerHTML = character;
        applyProperties(this.element, this.initialStyles);
        this.update();
        
        document.body.appendChild(this.element);
      };
      
      this.update = function() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;
        
        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
      }
      
      this.die = function() {
        this.element.parentNode.removeChild(this.element);
      }
      
    }
    
    /**
     * Utils
     */
    
    // Applies css `properties` to an element.
    function applyProperties( target, properties ) {
      for( var key in properties ) {
        target.style[ key ] = properties[ key ];
      }
    }
    
    init();
  })();


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
