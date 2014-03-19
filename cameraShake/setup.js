;(function(undefined){
    var canvas = document.getElementsByTagName('canvas')[0];
    var resize = function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.onresize = resize;
    resize();
})();
