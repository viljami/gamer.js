;(function(){
    var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(145, window.innerWidth/window.innerHeight, 1, 1000);

	var renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
    //
	// var geometry = new THREE.CubeGeometry(1,1,1);
	// var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	// var cube = new THREE.Mesh(geometry, material);
	// scene.add(cube);

	camera.position.z = 0;

     // Set the background color of the scene.
    renderer.setClearColor(0x333F47, 1);

    // Create a light, set its position, and add it to the scene.
    // var light = new THREE.PointLight(0xffffff);
    // HemisphereLight(skyColorHex, groundColorHex, intensity)
    var light = new THREE.HemisphereLight('#ffffff', '#ff0000', 1)
    light.position.set(0,0,10);
    scene.add(light);

    var loader = new THREE.JSONLoader();
    loader.load( "island.js", function(geometry){
      var material = new THREE.MeshLambertMaterial({color: 0x55B663});
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    // var controls = new THREE.OrbitControls(camera, renderer.domElement);

	var render = function () {
		requestAnimationFrame(render);
        //
		// cube.rotation.x += 0.1;
		// cube.rotation.y += 0.1;

		renderer.render(scene, camera);
        // controls.update();
	};

	render();

    window.onresize = function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    };
})();
