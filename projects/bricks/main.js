;(function(undefined){


    // UTILS

    // [x, y]
    var X = 0;
    var Y = 1;

    var extend = function(to, from){
        for (var k in from)to[k] = from[k];
    };
    // performance vs safe operations.
    var vsum = function(v1, v2){ return [v1[X] + v2[X], v1[Y] + v2[Y]]; };
    var vsub = function(v1, v2){ return [v1[X] - v2[X], v1[Y] - v2[Y]]; };
    var vadd = function(v1, v2){ v1[X] += v2[X]; v1[Y] += v2[Y]; };
    // Hadamard Product
    var vHP = function(v1, v2){ v1[X] *= v2[X]; v1[Y] *= v2[Y]; };

    var vlength = function(v){ return Math.sqrt(v[X] * v[X] + v[Y] * v[Y]); };
    var vnormalize = function(v){
        var l = vlength(v);
        return [v[X] / l, v[Y] / l];
    };

    var controls = {
        UP: 38,
        DOWN: 40,
        RIGHT: 39,
        LEFT: 37,

        down: [],

        activate: function(){
            document.addEventListener('touchdown', controls.tapDown);
            document.addEventListener('touchmove', controls.tapDown);
            document.addEventListener('touchup', controls.tapUp);
            document.addEventListener('keydown', controls.keyDown);
            document.addEventListener('keyup', controls.keyUp);
        },

        disable: function(){
            document.removeEventListener('touchdown', controls.tapDown);
            document.removeEventListener('touchmove', controls.tapDown);
            document.removeEventListener('touchup', controls.tapUp);
            document.removeEventListener('keydown', controls.keyDown);
            document.removeEventListener('keyup', controls.keyUp);
        },

        tapDown: function(e){
            if (e.x < window.size.width / 2){
                controls.down[controls.LEFT] = true;
                controls.down[controls.RIGHT] = false;
            } else {
                controls.down[controls.LEFT] = false;
                controls.down[controls.RIGHT] = true;
            }
        },

        tapUp: function(e){
            controls.down[controls.LEFT] = false;
            controls.down[controls.RIGHT] = false;
        },

        keyDown: function(e){ controls.down[e.keyCode] = true; },

        keyUp: function(e){ controls.down[e.keyCode] = false; }
    };


    // SETUP

    var getDefaults = function(){
        return {
            p: [0 ,0],
            v: [0, 0],
            a: [0, 0],
            w: 100,
            h: 100,
            c: '#fff'
        };
    }
    var friction = [0.9, 0.9];


    // GAME OBJECTS

    var GameObject = function(options){
        extend(this, getDefaults());
        if (options) extend(this, options);
    };
    GameObject.prototype.update = function(){
        vHP(this.a, friction);
        vHP(this.v, friction);
        vadd(this.v, this.a);
    };
    GameObject.prototype.move = function(){
        vadd(this.p, this.v);
    };
    GameObject.prototype.draw = function(context){
        context.save();

        context.fillStyle = this.c;
        context.fillRect(this.p[X], this.p[Y], this.w, this.h);

        context.restore();
    };

    // bricks
    var Brick = function(options){
        GameObject.call(this, options);

        this.w = 70;
        this.h = 20;
        this.move = function(){}; // faster, and supports structure
        this.update = function(){};
    };
    Brick.prototype = new GameObject();

    // pad
    var Pad = function(options){
        GameObject.call(this, options);

        this.w = 140;
        this.h = 20;

        this.update = function(){
            if (controls.down[controls.LEFT]) this.a[X] = -2;
            else if (controls.down[controls.RIGHT]) this.a[X] = 2;

            GameObject.prototype.update.call(this);
        };
    };
    Pad.prototype = new GameObject();

    // "ball"
    var Ball = function(options){
        GameObject.call(this, options);

        this.w = 10;
        this.h = 10;

        this.update = function(){
            // walls
            if (this.p[X] <= 0) this.v[X] = 5;
            else if (this.p[X] >= window.size.width) this.v[X] = -5;
            if (this.p[Y] <= 0) this.v[Y] = 5;
            else if (this.p[Y] >= window.size.height) this.v[Y] = -5;

            // reaction to collision
            if (this.collision){
                // other is right
                if (this.p[X] + this.w <= this.collision.p[X] ||
                    this.p[X] >= this.collision.p[X] + this.collision.w){
                    this.v[X] *= -1;
                } else {
                    this.v[Y] *= -1;
                }

                this.collision = undefined;
            }

            // vadd(this.v, this.a);
        }
    };
    Ball.prototype = new GameObject();


    // COLLISION

    var collision = {
        test: function(a, b){
            return a.p[X] <= b.p[X] + b.w &&
                a.p[X] + a.w >= b.p[X] &&
                a.p[Y] <= b.p[Y] + b.h &&
                a.p[Y] + a.h >= b.p[Y];
        },

        // Two boxes technique
        // predictiveTest: function(a, b){
        //     var collisionPoint, aFuture = {
        //         p: vsum(a.p, a.v),
        //         w: a.w,
        //         h: a.h
        //     };
        //
        //     if (collision.test(a, b)) {
        //         collisionPoint = collision.findCollisionPoint(a, b);
        //     } else if (collision.test(aFuture, b)){
        //         collisionPoint = collision.findCollisionPoint(aFuture, b);
        //     }
        //
        //     if (collisionPoint){
        //         a.collision = b;
        //         b.collision = a;
        //         // Rectangles have in most cases 2 collision points
        //         // simplified...
        //         a.collisionPoint = collisionPoint;
        //         b.collisionPoint = collisionPoint;
        //     }
        // },
        //
        // findCollisionPoint: function(a, b){
        //     var x = Math.max(a.p[X], b.p[X]);
        //     var y = Math.max(a.p[Y], b.p[Y]);
        //     // var x2 = Math.min(a.p[X] + a.w, b.p[X] + b.w); // for collision rectangle
        //     // var x2 = Math.min(a.p[Y] + a.h, b.p[Y] + b.h); // for collision rectangle
        //     return [x, y]; // testing for a point
        // },

        handler: function(a, b){
            if (collision.test(a, b)){
                a.collision = b;
                b.collision = a;
            }
        }
    };


   // SETUP

    var pad, bricks, ball;

    var init = function(){
       var d = window.size; // dimensions defined and explained in setup.js

       var padP = [(d.width - 70) / 2, d.height - 100 ];
       pad = new Pad({p: padP});

       bricks = [];
       for (var i = 0; i < (d.width - 100) / (70 + 10); i++){
           for (var j = 0; j < (d.height - 500) / (20 + 10); j++){
               bricks.push(new Brick({
                   p: [
                       40 + i * 80,
                       40 + j * 30
                   ]
               }));
           }
       }

       ball = new Ball({p: vsum(padP, [+65, -50])});
    };


    var start = function(){
       ball.v = [5, -5];
       controls.activate();
    };

    var end = controls.disable;

    // GAME LOOP

    var canvas = document.getElementsByTagName('canvas')[0];
    var context = canvas.getContext('2d');
    var draw = function(o){ o.draw(context); };
    var move = function(o){ o.move(); };
    var update = function(o){ o.update(); };
    var notCollided = function(o){ return ! o.collision; };

    // Can't trust animation frame to give steady results.
    setInterval(function(){
        bricks.forEach(function(b){ collision.handler(ball, b); });
        collision.handler(pad, ball);

        bricks = bricks.filter(notCollided);

        pad.update();
        ball.update();

        pad.move();
        ball.move();

        context.clearRect(0,0,window.size.width, window.size.height);

        bricks.forEach(draw);
        pad.draw(context);
        ball.draw(context);

    }, 1000 / 40);


    init();
    setTimeout(start, 1500);
})();
