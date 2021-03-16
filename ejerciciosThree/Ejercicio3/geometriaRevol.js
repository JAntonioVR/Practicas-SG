import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'

//
// ────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: C L A S E   G E O M E T R I A   D E   R E V O L U C I O N : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
//

class GeometriaRevol extends THREE.Mesh {

    constructor(points, segments = 20, phiStart = 0, phiLenght = 2*Math.PI) {
        super();
        var miObjeto = new THREE.LatheGeometry(points,segments,phiStart,phiLenght);
        var miMaterial = new THREE.MeshNormalMaterial();
        // NOTE Si dejamos el sólido abierto por arriba, no se va a ver
        // nada por dentro del objeto, la forma de solucionarlo es o bien
        // crear más vértices en el perfil para que haya otro "exterior"
        // o bien asignando THREE.DoubleSide al atributo .side del material
        // las otras opciones son THREE.Front o THREE.Back
        miMaterial.side = THREE.DoubleSide;
        miMaterial.flatShading = true;

        this.latheObject = new THREE.Mesh (miObjeto, miMaterial);
        this.add(this.latheObject);
    }

    update(){}
  
    
}

// ────────────────────────────────────────────────────────────────────────────────

// Creamos algunos objetos

//
// ─── JARRON ─────────────────────────────────────────────────────────────────────
//    
class Jarron extends GeometriaRevol{
    constructor(){
        var points = [
            new THREE.Vector3(0,0.1,0),
            new THREE.Vector3(1, 0.1, 0),
            new THREE.Vector3(1, 1.5,0),
            new THREE.Vector3(2, 2, 0),
            new THREE.Vector3(2,3,0),
            new THREE.Vector3(2.5,3.5,0),

        ];
        super(points,30);
    }
}


//
// ─── TORRE ──────────────────────────────────────────────────────────────────────
//
class Torre extends GeometriaRevol{
    constructor(phiStart, phiLenght){
        var points = [
            new THREE.Vector3(0.0,0),
            new THREE.Vector3(5,0,0),
            new THREE.Vector3(5,4,0),
            new THREE.Vector3(4,5,0),
            new THREE.Vector3(4,8,0),
            new THREE.Vector3(5,8,0),
            new THREE.Vector3(5,12,0),
            new THREE.Vector3(4,12,0),
            new THREE.Vector3(4,10,0),
            new THREE.Vector3(0,10,0),
        ];
        
        super(points,50,phiStart,phiLenght);
        
    }
}



// ────────────────────────────────────────────────────────────────────────────────

export { Jarron, Torre };
