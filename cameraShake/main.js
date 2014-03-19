/*
    Researching camera (the view to a game) movement.
    - Math.sin to create smooth lively transition
    - Camera can seek a selected object and stays following it until told
      othervise
*/

;(function(undefined){
    var canvas = document.getElementsByTagName('canvas')[0];
    var context = canvas.getContext('2d');


    // UTILS

    var createHandler = function(fn, scope){
        var args = Array.prototype.slice.call(arguments);
        args.splice(0, 2);
        return function(){ fn.apply(scope, args); };
    };

    var randomSign = function(){ return Math.random() < 0.5 ? 1 : -1; };

    var keys = function(o){
        var a = [];
        for (var i in o) a.push(i);
        return a;
    };

    var extend = function(to, from, values){
        if (! values) for (var i in from) to[i] = from[i];
        else for (var i = 0; i < values.length; i++) to[values[i]] = from[values[i]];
    };


    // GAME HELPERS

    var V = function(x, y){
        if (! y) {
            y = x.y;
            x = x.x;
        }

        this.x = x;
        this.y = y;
    };
    V.prototype.normalize = function(){
        this.l = this.length();
        this.x = this.l > 1 ? this.x / this.l : 0;
        this.y = this.l > 1 ? this.y / this.l : 0;
        this.l = 1; // this.length();
        return this;
    };
    V.prototype.length = function(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };


    // GAME OBJECTS

    var World = function(options){
        if (! options) options = {};
        this.friction = options.firction || 0.9;
    };
    var world = new World();

    var GameObject = function(options){
        var defaults = {
            x: 0,
            y: 0,
            w: 100,
            h: 100,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            speed: 3,
            c: '#333'
        };
        extend(defaults, options);
        extend(this, defaults, keys(defaults));
    };
    GameObject.prototype.update = function(){
        this.ax *= world.friction;
        this.ay *= world.friction;
        this.vx *= world.friction;
        this.vy *= world.friction;
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
    };

    var objects = [];

    var Camera = function(options){
        if (! options) options = {};
        GameObject.call(this, options);

        this.z = options.z || 100;
        this.followed = options.followed || undefined;
    };
    Camera.prototype = new GameObject();
    Camera.prototype.follow = function(o){ this.followed = o; };
    Camera.prototype.update = function(){
        if (! this.followed) return;

        // follow so that the followed is in the center of the window
        var targetX = this.followed.x - (window.innerWidth - this.followed.w) / 2;
        var targetY = this.followed.y - (window.innerHeight - this.followed.h) / 2;
        var deltaX = targetX - this.x;
        var deltaY = targetY - this.y;
        if (Math.abs(deltaX) < 10) deltaX = 0;
        if (Math.abs(deltaY) < 10) deltaY = 0;

        var n = (new V(deltaX, deltaY)).normalize();
        this.ax = Math.sin(n.x) * this.speed;
        this.ay = Math.sin(n.y) * this.speed;

        GameObject.prototype.update.call(this);
    };
    Camera.prototype.draw = function(){
        objects.forEach(function(o){
            context.save();

            context.fillStyle = o.c;
            context.fillRect(o.x - this.x, o.y - this.y, o.w, o.h);

            context.restore();
        }.bind(this));
    };
    Camera.prototype.shake = function(force, duration, startTime){
        if (! startTime) startTime = Date.now() + duration;
        if (! force) force = 2;

        // Here the magic happens!
        this.x += force * 5 *randomSign();
        this.y += force * 5 *randomSign();

        if (! duration || duration < 0) return;

        duration = startTime - Date.now();
        requestAnimationFrame(createHandler(this.shake, this, force, duration, startTime));
    };


    // GAME SETUP

    objects = [
        new GameObject({x: 0, y: 0}),
        new GameObject({x: 300, y: 300}),
        new GameObject({x: 50, y: 400})
    ];
    var player = new GameObject({x: 100, y: 100, c: '#00ff00'});
    objects.push(player);


    // GAME LOOP

    var camera = new Camera({speed: 2, y: -100, x: -100});
    camera.follow(player);
    setTimeout(function(){ camera.shake(2, 1000); }, 1700);

    var clearCanvas = function(){ context.clearRect(0, 0, window.innerWidth, window.innerHeight); };
    var loop = function(){
        camera.update();

        clearCanvas();
        camera.draw();

        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
})();
