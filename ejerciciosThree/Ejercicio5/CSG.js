import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'


//
// ─── CORAZON ────────────────────────────────────────────────────────────────────
//

class Taza extends THREE.Mesh {

    constructor() {
        super();
        
        // ASA
        var pts = [];
        for (let t = 0; t <= 2*Math.PI; t+=0.1) {
            pts.push(new THREE.Vector3(Math.cos(t)+3, Math.sin(t),0));
        }
        var geoAsa = new THREE.LatheBufferGeometry(pts, 20, -3.0/2.0*Math.PI, Math.PI);



        this.add(new THREE.Mesh(geoAsa, new THREE.MeshNormalMaterial()));
    }

    update(){}
  
    
}
    

    

// ────────────────────────────────────────────────────────────────────────────────

export { Taza };
