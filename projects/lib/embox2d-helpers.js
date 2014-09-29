/*
* some of the code is from: http://www.iforce2d.net/embox2d/testbed.html
*/
define(['Box2D'], function(Box2D) {
  var b2Vec2 = Box2D.b2Vec2;
  var b2PolygonShape = Box2D.b2PolygonShape;
  var b2ChainShape = Box2D.b2ChainShape;

  var createPolygonShape = function (vertices) {
      var shape = new b2PolygonShape();
      var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
      var offset = 0;
      for (var i=0;i<vertices.length;i++) {
          Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
          Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
          offset += 8;
      }
      var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
      shape.Set(ptr_wrapped, vertices.length);
      return shape;
  };

  return {
    e_shapeBit: 0x0001,
    e_shapeBit2: 0x0016,
    e_jointBit: 0x0002,
    e_aabbBit: 0x0004,
    e_pairBit: 0x0008,
    e_centerOfMassBit: 0x0010,

    using: function (ns, pattern) {
        if (! pattern) {
            // import all
            for (var key in ns) {
                this[key] = ns[key];
            }
        } else {
            if (typeof pattern === 'string') {
                pattern = new RegExp(pattern);
            }
            for (var name in ns) {
                if (name.match(pattern)) {
                    this[name] = ns[name];
                }
            }
        }
    },

    //to replace original C++ operator =
    copyVec2: function (vec) {
        return new b2Vec2(vec.get_x(), vec.get_y());
    },

    //to replace original C++ operator * (float)
    scaleVec2: function (vec, scale) {
        vec.set_x( scale * vec.get_x() );
        vec.set_y( scale * vec.get_y() );
    },

    //to replace original C++ operator *= (float)
    scaledVec2: function (vec, scale) {
        return new b2Vec2(scale * vec.get_x(), scale * vec.get_y());
    },


    // http://stackoverflow.com/questions/12792486/emscripten-bindings-how-to-create-an-accessible-c-c-array-from-javascript
    createChainShape: function (vertices, closedLoop) {
        var shape = new b2ChainShape();
        var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
        var offset = 0;
        for (var i=0;i<vertices.length;i++) {
            Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
            Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
            offset += 8;
        }
        var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
        if ( closedLoop )
            shape.CreateLoop(ptr_wrapped, vertices.length);
        else
            shape.CreateChain(ptr_wrapped, vertices.length);
        return shape;
    },


    createRandomPolygonShape: function (radius) {
        var numVerts = 3.5 + Math.random() * 5;
        numVerts = numVerts | 0;
        var verts = [];
        for (var i = 0; i < numVerts; i++) {
            var angle = i / numVerts * 360.0 * 0.0174532925199432957;
            verts.push( new b2Vec2( radius * Math.sin(angle), radius * -Math.cos(angle) ) );
        }
        return createPolygonShape(verts);
    },

    createPolygonShape: createPolygonShape
  };
});
