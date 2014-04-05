;(function(undefined){
    var canvas = document.getElementsByTagName('canvas')[0];

    // Sometimes window.innerWidth has delay...
    // This method has not.
    var dimensionsDiv = document.createElement('div');
    dimensionsDiv.style.cssText = [
        'position: absolute',
        'top: 0px',
        'bottom: 0px',
        'left: 0px',
        'right: 0px',
        'z-index: -999'
    ].join(';');

    document.body.appendChild(dimensionsDiv);

    var resize = function(){
        var dimenensions = dimensionsDiv.getBoundingClientRect();
        canvas.width = dimenensions.width;
        canvas.height = dimenensions.height;
    };

    window.onresize = resize;
    resize();
})();
