define([
  'underscore',
  'three'
], function(
  _,
  THREE
){
  var materials = [
    new THREE.MeshPhongMaterial({color: 0x00ff00}),
    new THREE.MeshPhongMaterial({color: 0xff0000}),
    new THREE.MeshPhongMaterial({color: 0x0000ff})
  ];
  var unit = {x:1,y:1,z:1};
  var getRandom = function(a){ return a[Math.floor(Math.random() * a.length)]; };

  return {
    scene: undefined,
    renderer: undefined,
    camera: undefined,
    objects: [],

    init: function(){
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 4;

      this.createMap();

      this.renderer = new THREE.WebGLRenderer();
      this.resize();
      document.body.appendChild(this.renderer.domElement);
    },

    createMap: function(){
      this.objects.push(this.createCube(_.clone(unit)));
      this.createSky();

      var pointLight = new THREE.PointLight(
        0xFFFFFF, //light color
        1, // intensity
        0 // distance, 0 = infinite
      );
      pointLight.position.set(0,0,0);
      this.scene.add(pointLight);
      this.pointLight = pointLight;
    },

    createCube: function(d, p){
      var geometry = new THREE.BoxGeometry(d.x, d.y, d.z);
      var cube = new THREE.Mesh(geometry, getRandom(materials));
      if (p) cube.position = p;
      this.scene.add(cube);
      return cube;
    },

    createSky: function(){
      var sky = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('images/sky.jpg'),
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
