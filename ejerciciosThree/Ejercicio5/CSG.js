import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'


//
// ─── TAZA ────────────────────────────────────────────────────────────────────
//

class Taza extends THREE.Mesh {

    constructor() {
        super();

        var segments = 30;
        var pts      = [];
        
        //
        // ─── ASA ─────────────────────────────────────────────────────────
        //
        for (let t = 0; t <= 2*Math.PI; t+=0.1) {
            pts.push(new THREE.Vector2(Math.cos(t)/2+2, Math.sin(t)/2));
        }
        pts.push(new THREE.Vector2(2.5, 0));
        var geoAsa = new THREE.LatheGeometry(pts, segments);
        
        geoAsa.rotateZ(Math.PI/2);
        geoAsa.rotateY(-Math.PI/2);
        geoAsa.translate(2.8,3.5,0);

        // NOTE Se podia haber hecho con un toro y acabas antes

        //
        // ─── CILINDRO EXTERIOR ───────────────────────────────────────────
        //
        pts = [
            new THREE.Vector2(0,0),
            new THREE.Vector2(3,0),
            new THREE.Vector2(3,7),
            new THREE.Vector2(0,7),
        ];
        var geoVasoExt = new THREE.LatheGeometry(pts, segments);

        //
        // ─── CILINDRO INTERIOR ───────────────────────────────────────────
        //      
        var grosor = 0.2;
        pts = [
            new THREE.Vector2(0,grosor),
            new THREE.Vector2(3-grosor,grosor),
            new THREE.Vector2(3-grosor,7),
            new THREE.Vector2(0,7),
        ]
        var geoVasoInt = new THREE.LatheGeometry(pts, segments);


        // Creamos los PSP

        var asaBSP     = new ThreeBSP(geoAsa),
            vasoExtBSP = new ThreeBSP(geoVasoExt),
            vasoIntBSP = new ThreeBSP(geoVasoInt);

        // Operaciones Booleanas

        var vasoAsa = vasoExtBSP.union(asaBSP),
            tazaBSP = vasoAsa.subtract(vasoIntBSP);


        // Transformamos a una Geometry, a una BufferGeometry y a un Mesh

        var geometry       = tazaBSP.toGeometry();
        var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
        var material       = new THREE.MeshPhongMaterial({
            color    : 0xffffff,
            shininess: 100,
            emissive : 0x0,
        });
        material.needsUpdate = true;
        material.flatShading = false;

        var result = new THREE.Mesh(bufferGeometry, material);

        this.add(result);

    }

    update(){}
  
    
}
    

    

// ────────────────────────────────────────────────────────────────────────────────

export { Taza };
