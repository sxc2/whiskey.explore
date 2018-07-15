(function() {
  function d2h(d) { return (+d).toString(16).toUpperCase(); }
  
  var numberParticles = 100;
  var Particle = function(x, y, vx, vy) {
    this.x = x || 0;
    this.y = y || 0;
    this.vx = vx || 0;
    this.vy = vy || 0;
    
    this.update = function (vx, vy) {
      vx = vx || 0,
      vy = vy || 0;

      this.x += this.vx + vx;
      this.y += this.vy + vy;
    };
  };

  var ParticleSystem = function(container, center, count) {
    var i = 0,
        c = container.getContext('2d');

    count = count || 0;

    this.particles = [];

    this.center = {
      x: center.x || 0,
      y: center.y || 0
    };
    // Initialization
    for ( ; i < count ; ++i ) {
      
      var x = this.center.x,
          y = this.center.y,
          vx = Math.random() * 1 - 0.5,
          vy = Math.random() * 1 - 0.5;
      this.particles.push(new Particle(x, y, vx, vy));
    }

    this.update = function() {
      for ( i = 0 ; i < count ; ++i ) {

        // We don't want to process particles that
        // we can't see anymore
        if (this.particles[i].x > 0 &&
          this.particles[i].x < container.width &&
          this.particles[i].y > 0 &&
          this.particles[i].y < container.height) {
          c.fillStyle = "#".concat(d2h(parseInt(16777215/numberParticles*i)));
          c.fillRect(this.particles[i].x, this.particles[i].y, i%30, i%30);
        } else {
          if (this.particles[i].x < 0 && this.particles[i].vx < 0 ||
              this.particles[i].x > container.width && this.particles[i].vx > 0) {
            this.particles[i].vx = this.particles[i].vx * -1;
          }
          
          if (this.particles[i].y < 0 && this.particles[i].vy < 0 ||
              this.particles[i].y > container.height && this.particles[i].vy > 0) {
            this.particles[i].vy = this.particles[i].vy * -1;
          }
        }
          
        this.particles[i].update();
      }
    };
  };


  // shim layer with setTimeout fallback by Paul Irish
  // Used as an efficient and browser-friendly
  // replacement for setTimeout or setInterval
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame   ||
    window.mozRequestAnimationFrame      ||
    window.oRequestAnimationFrame        ||
    window.msRequestAnimationFrame       ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  // Call the init() function on load
 init();

  function init() {
    // Get a reference to the canvas object in the HTML
    var cobj = document.getElementsByTagName('canvas')[0],
        c = cobj.getContext('2d'),
        p = null;
      

    // Make the canvas have the same size as
    // the browser window
    cobj.width = document.body.clientWidth;
    cobj.height = document.body.clientHeight;

    // Set the colour to white
    c.fillStyle = '#FFFFFF';

    p = new ParticleSystem(cobj, { x: cobj.width/2, y: cobj.height/2 }, numberParticles);

    // Call the paint method
    paint();

    function paint() {
      c.clearRect(0, 0, cobj.width, cobj.height);

      p.update();

      // Call paint() again, recursively
      requestAnimFrame(paint);
    }
  }
})();


