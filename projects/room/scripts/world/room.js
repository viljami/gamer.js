define([
  'q',
  'three',
  'colladaLoader'
], function(
  Q,
  THREE
){
  var deferred = Q.defer();

  var loader = new THREE.ColladaLoader();
  loader.load( '/room/assets/room.dae', function ( collada ){
    var dae = collada.scene;
    var skin = collada.skins[ 0 ];

    dae.rotation.x = -Math.PI/2;
    dae.updateMatrix();

    deferred.resolve(dae, skin);
  });

  return deferred.promise;
});
