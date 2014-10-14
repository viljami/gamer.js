(function(undefined){

  var WIDTH = 640;
  var HEIGHT = 480;
  var PARTICLES = 100;
  var REFRESH_SPEED = 1000 / 40;

  var startTime, endTime, hasStartedStumping;
  var bestTime, formattedBestTime, tmpTime;

  var resetButton = document.getElementById('replay');
  var timeEl = document.getElementById('time');
  var bestTimeEl = document.getElementById('best-time');
  var canvas = document.getElementById('foreground');
  var bgcanvas = document.getElementById('background');
  var context = canvas.getContext('2d');
  var bgcontext = bgcanvas.getContext('2d');
  var particlesCreated = 0;

  var items = [];

  var updateParticle = function(p){
    p.vx += 0.01 + Math.random() * 0.1;
    p.x += Math.cos(p.vx) * 3;
    p.y += p.vy;

    p.opacity -= Math.random() * 0.02;

    if (p.opacity < 0){
      p.x = p.startX;
      p.y = p.startY;
      p.w = 20;
      p.h = 20;
      p.rgb = [120 + Math.round(Math.random() * 20), 80, 50];
      p.opacity = 1;
    }
  };

  var createParticle = function(x,y,w,h){
    var p = {
      startX: x,
      startY: y,
      x: x,
      y: y,
      vx: Math.random(),
      vy: -Math.random() - 1.5,
      w: w || 20,
      h: h || 20,
      opacity: 1,
      rgb: [120, 80, 50],
      color: 'rgba(', // '#eebb22'
      remove: false
    };

    items.push(p);
    return p;
  };

  var smokeIt = function(){
    particlesCreated++;
    return createParticle(WIDTH / 2 + Math.random() * 10 - 50, HEIGHT / 3 * 2 + Math.random() * 10);
  };

  var initialize = function(){
    bgcontext.clearRect(0,0,WIDTH,HEIGHT);

    // Cigarette
    bgcontext.fillStyle = '#fff';
    bgcontext.fillRect(WIDTH / 2 - 180 - 50, HEIGHT / 3 * 2 + 10, 200, 10);

    bgcontext.fillStyle = '#ddd';
    bgcontext.fillRect(WIDTH / 2 - 181 - 50, HEIGHT / 3 * 2 + 20, 200, 10);

    bgcontext.fillStyle = '#993333';
    bgcontext.fillRect(WIDTH / 2 - 50, HEIGHT / 3 * 2 + 10, 20, 20);

    bgcontext.fillStyle = '#ee9933';
    bgcontext.fillRect(WIDTH / 2 - 182 - 50, HEIGHT / 3 * 2 + 10, 40, 20);
  };

  var drawItem = function(item){
    updateParticle(item);

    // if (item.rgb[0] > 33) item.rgb[0]-=3;
    // if (item.rgb[1] > 33) item.rgb[1]-=4;
    if (item.rgb[0] < 230) item.rgb[0]+=3;
    if (item.rgb[1] < 230) item.rgb[1]+=4;
    if (item.rgb[2] < 230) item.rgb[2]+=5;
    context.save();
    context.fillStyle = item.color + item.rgb.join(',') + ',' + item.opacity + ')';
    context.fillRect(item.x, item.y, item.w += Math.random() * 0.3, item.h += Math.random() * 0.3);
    context.restore();
  };

  var draw = function(){
    context.clearRect(0,0,WIDTH,HEIGHT);
    items.forEach(drawItem);
  };

  var padHard = function(n){ return n < 10 ? '000' + n : n < 100 ? '0' + n : '' + n; };
  var getFormattedTime = function(){
    tmpTime = new Date(Date.now() - startTime);
    var seconds = tmpTime.getMinutes() * 60 + tmpTime.getSeconds();
    return seconds + '.' + padHard(tmpTime.getMilliseconds()) + 's';
  };

  var reset = function(){
    startTime = Date.now();
    endTime = undefined;
    hasStartedStumping = false;
    particlesCreated = 0;

    bgcontext.fillStyle = '#993333';
    bgcontext.fillRect(WIDTH / 2 - 50, HEIGHT / 3 * 2 + 10, 20, 20);

    items = [];

    resetButton.style.display = 'none';
  };

  var loop = function(){
    setTimeout(loop, REFRESH_SPEED);

    timeEl.innerText = endTime || getFormattedTime();

    if (Math.random() < 0.3 && items.length < PARTICLES && ! hasStartedStumping) smokeIt();
    if (! endTime && hasStartedStumping && items.length <= 0) {
      endTime = getFormattedTime();
      if (! bestTime || bestTime > tmpTime){
        bestTime = tmpTime;
        formattedBestTime = endTime;
      }

      bgcontext.fillStyle = '#555';
      bgcontext.fillRect(WIDTH / 2 - 50, HEIGHT / 3 * 2 + 10, 20, 20);

      bestTimeEl.innerText = formattedBestTime;
    }
    if (endTime) resetButton.style.display = 'block';

    draw();
  };

  initialize();
  startTime = Date.now();
  loop();


  var e;
  var isAlive = function(item){ return ! item.remove; };
  var checkCollision = function(item){
    var x = e.layerX;
    var y = e.layerY;
    if (item.x > x || item.x + item.w < x) return;
    if (item.y > y || item.y + item.h < y) return;

    if (particlesCreated >= 20) hasStartedStumping = true;
    item.remove = true;
  };

  canvas.addEventListener('mousemove', function(event){
    e = event;
    items.forEach(checkCollision);
    items = items.filter(isAlive);
  });

  resetButton.addEventListener('click', reset);

})();
