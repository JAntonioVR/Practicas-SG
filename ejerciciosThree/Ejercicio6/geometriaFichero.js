
import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'


class geometriaFichero extends THREE.Mesh{

    constructor(mtlFile, objFile){
        super();

        var that = this;
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load(mtlFile,
            function(materials){
                objectLoader.setMaterials(materials);
                objectLoader.load(objFile,
                    function(object){
                        var modelo = object;
                        that.add(modelo);
                    },
                    null, null);
            }
        );
    }

    update(){}
}

class Coche extends geometriaFichero{
    
    constructor(){
        super('../models/porsche911/911.mtl', 
              '../models/porsche911/Porsche_911_GT2.obj');
    }

    update(){}
}
    
class Pato extends geometriaFichero{
    constructor(){
        super('../models/pato/pato.mtl',
              '../models/pato/pato.obj');
        this.scale.set(0.01,0.01,0.01);
        this.rotateX(-Math.PI/2)
    }
}

class Arboles extends geometriaFichero{
    
    constructor(){
        super('../models/arboles/trees9.mtl', 
              '../models/arboles/trees9.obj');
    }

    update(){}
}

    

// ────────────────────────────────────────────────────────────────────────────────

export { Coche, Pato, Arboles};
