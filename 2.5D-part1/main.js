;(function(undefined){
	var requestAnimationFrame = window.requestAnimationFrame;
	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');

	var tileMap;
	var mover = 0.01;
	var alfa = 0.5;

	var Tile = function(options){
		if (! options) options = {};

		this.x = options.x || 0;
		this.y = options.y || 0;
		this.w = options.w || 0;
		this.h = options.h || 0;
		this.c = options.c || '#ff0000';
	};

	var TileMap = function(options){
		if (! options) options = {};

		this.x = options.x || 200;
		this.y = options.y || 200;
		this.w = options.w || 100;
		this.h = options.h || 100;

		this.tiles = [
			new Tile({x: 0, y: 0, w: this.w, h: this.h, c: '#00ff00'}),
			new Tile({x: this.w, y: 0, w: this.w, h: this.h}),
			new Tile({x: 0, y: -this.h, w: this.w, h: this.h, c: '#0000ff'})
		];
	};

	var resize = function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
	};

	window.onresize = resize;
	resize();

	var setup = function(){
		tileMap = new TileMap();
	};

	var clearCanvas = function(){ context.clearRect(0, 0, window.innerWidth, window.innerHeight); };

	var draw = function(o, level, x, y){
		if (! o) return;

		context.save();
		context.translate(o.x + o.w / 2, o.y + o.h / 2);

		o.tiles.forEach(function(tile, index){
			context.save();
			if (index === 0) context.transform(0,1,Math.sin(-alfa),Math.sin(-alfa),tile.w,0); // front
			else if (index === 1) context.transform(0,1,Math.sin(alfa),Math.sin(-alfa),tile.w,-tile.h); // right
			else if (index === 2) context.transform(Math.sin(-alfa),Math.sin(-alfa),Math.sin(-alfa),Math.sin(alfa),tile.w,0); // top
			context.fillStyle = tile.c;
			context.fillRect(tile.x, tile.y, tile.w, tile.h);
			context.restore();
		});

		context.restore();
	};

	var loop = function(){
		alfa += mover;
		if (alfa > Math.PI /4 || alfa < 0) mover = -mover;

		clearCanvas();
		draw(tileMap);

		requestAnimationFrame(loop);
	};

	setup();
	loop();
})();