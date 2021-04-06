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


        // Creamos los BSP

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
    

//
// ─── PIEZA ──────────────────────────────────────────────────────────────────────
//

class Pieza extends THREE.Mesh{
    constructor(){
        super();
        var caja = new THREE.BoxGeometry(5, 1, 2),
            agujero = new THREE.CylinderGeometry(0.5,0.25,1,20),
            cajita = new THREE.BoxGeometry(4, 0.5,2);

            agujero.translate(1,0,0);

            cajita.translate(0.5,-0.25,0);
        
            var cajaBSP = new ThreeBSP(caja),
                agujeroBSP = new ThreeBSP(agujero),
                cajitaBSP = new ThreeBSP(cajita);

            var parte1 = cajaBSP.subtract(agujeroBSP);

            parte1 = parte1.subtract(cajitaBSP);

            var geometry2 = parte1.toGeometry();
            geometry2.translate(2.5,0,0);
            geometry2.rotateZ(-Math.PI/2);
            geometry2.rotateY(Math.PI);
            geometry2.translate(-2,0.5,0);
            

            var parte2 = new ThreeBSP(geometry2);

            var dospartes = parte1.union(parte2);


            // Hay que quitar un cilindro

            var cilindro = new THREE.CylinderGeometry(0.5,0.5,2,20);
            cilindro.rotateX(Math.PI/2);
            cilindro.translate(-1.5,-0.5,0);

            var cilindroBSP = new ThreeBSP(cilindro);

            var result = dospartes.subtract(cilindroBSP);
            var geometry = result.toGeometry();


            var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
            var result = new THREE.Mesh(bufferGeometry, new THREE.MeshNormalMaterial());

            this.add(result);
    }

    update(){}
}
    

//
// ─── TUERCA ─────────────────────────────────────────────────────────────────────
//

class Tuerca extends THREE.Mesh{
    constructor(){
        super();
        var cilindro = new THREE.CylinderGeometry(3,3,1,6);
        cilindro.translate(0,0.5,0)
        var cilindroBSP = new ThreeBSP(cilindro);

        // Interior

        var shape = new THREE.Shape();
        shape.moveTo(0,0);
        shape.lineTo(0.01,0.01);
        shape.lineTo(0,0.02);
        shape.lineTo(0,0);

        var pts = []
        for (let i = -2*Math.PI; i<=30*Math.PI; i+=0.1) {
            pts.push(new THREE.Vector3(1.5*Math.cos(i),  0.01*i, 1.5*Math.sin(i),))         
        }

        var path = new THREE.CatmullRomCurve3(pts),
            options = {
            steps: 200, curveSegments: 100, extrudePath: path
            },
        geoEspiral = new THREE.ExtrudeGeometry(shape, options);

        var cilindroInt = new THREE.CylinderGeometry(1.5,1.5,1,50);
        cilindroInt.translate(0,0.5,0);
        var cilindroIntBSP = new ThreeBSP(cilindroInt),
            espiralBSP = new ThreeBSP(geoEspiral);
        var result = cilindroBSP.subtract(cilindroIntBSP).union(espiralBSP)




        var geometry = result.toGeometry();

        var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
        var result = new THREE.Mesh(bufferGeometry, new THREE.MeshNormalMaterial());

        this.add(result);
    }

    update(){}
}
    
    

// ────────────────────────────────────────────────────────────────────────────────

export { Taza, Pieza, Tuerca };
