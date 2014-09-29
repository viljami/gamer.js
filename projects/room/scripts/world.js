define([
  'underscore',
  'three'
], function(
  _,
  THREE
){
  var wallMaterial = new THREE.MeshPhongMaterial({
      color: 0x6C6C6C
  });

  return {
    scene: undefined,
    renderer: undefined,
    camera: undefined,
    objects: [],

    init: function(){
      var scene = this.scene = new THREE.Scene();
      var camera = this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100000);
      camera.position.x = 1200;
      camera.position.y = 1000;
      camera.lookAt({
          x: 0,
          y: 0,
          z: 0
      });

      this.createLight(scene);
      this.createWalls(scene);
      this.createCube(scene);

      this.renderer = new THREE.WebGLRenderer();
      // this.renderer.setClearColorHex( 0x000000, 1 );


      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMapEnabled = true;
      // this.renderer.shadowMapType    = THREE.PCFSoftShadowMap;
      this.resize();
      document.body.appendChild(this.renderer.domElement);
    },

    createLight: function(scene){
      scene.add(new THREE.AmbientLight(0x666666));

      var light = new THREE.DirectionalLight(0xdfebff, 1.75);
      light.position.set(300, 400, 50);
      light.position.multiplyScalar(1.3);

      light.castShadow = true;
      light.shadowCameraVisible = true;

      light.shadowMapWidth = 512;
      light.shadowMapHeight = 512;

      var d = 200;

      light.shadowCameraLeft = -d;
      light.shadowCameraRight = d;
      light.shadowCameraTop = d;
      light.shadowCameraBottom = -d;

      light.shadowCameraFar = 1000;
      light.shadowDarkness = 0.2;

      scene.add(light);
    },

    createWalls: function(scene){
      var plane = new THREE.Mesh(new THREE.BoxGeometry(500, 500, 100), wallMaterial);
      plane.rotation.x = -Math.PI / 2;
      plane.receiveShadow = true;
      scene.add(plane);

      plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), wallMaterial);
      plane.rotation.y = Math.PI / 2;
      plane.position.x = -250;
      plane.position.y = 250;
      plane.receiveShadow = true;
      scene.add(plane);

      plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), wallMaterial);
      // plane.rotation.y = Math.PI / 2;
      // plane.rotation.z = Math.PI / 2;
      plane.receiveShadow = true;
      scene.add(plane);
    },

    createCube: function(scene){
      var boxgeometry = new THREE.CubeGeometry(100, 100, 100);
      var boxmaterial = new THREE.MeshLambertMaterial({
          color: 0x0aeedf
      });
      var cube = new THREE.Mesh(boxgeometry, boxmaterial);
      cube.castShadow = true;
      cube.position.x = 0;
      cube.position.y = 100;
      cube.position.z = 0;

      scene.add(cube);
    },

    createSky: function(){
      var sky = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('/3d-box/images/sky.jpg'),
        side: THREE.DoubleSide
      });
      var skyboxMesh = new THREE.Mesh(
        new THREE.BoxGeometry(
          1000, 1000, 1000,
          0, 0, 0,
          null, true
        ),
        sky
      );
      this.scene.add( skyboxMesh );
    },

    resize: function(){
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
  };
});
