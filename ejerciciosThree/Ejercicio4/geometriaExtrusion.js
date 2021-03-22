import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'



class Corazon extends THREE.Mesh {

    constructor() {
        super();
        var shape = new THREE.Shape();
        
        shape.splineThru([
                new THREE.Vector2(0,0),
                new THREE.Vector2(20,30),
                new THREE.Vector2(10,40),
                new THREE.Vector2(0,30)
        ]);
        shape.splineThru([
            new THREE.Vector2(0,30),
            new THREE.Vector2(-10,40),
            new THREE.Vector2(-20,30),
            new THREE.Vector2(0,0)
        ]);

        var pts = [
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,10,25),
            new THREE.Vector3(0,50,50),
            new THREE.Vector3(-50,50,50),
            new THREE.Vector3(-50,25,25),
            new THREE.Vector3(-25,10,20),
        ],
            path = new THREE.CatmullRomCurve3(pts);

        var options = {
            depth: 1,
            bevelThickness: 3,
            bevelSize: 10,
            bevelSegments: 50,
            curveSegments: 50,
            steps: 10,
            extrudePath: path},
            geometry = new THREE.ExtrudeBufferGeometry(shape, options);
        this.add(new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()));
    }

    update(){}
  
    
}

// ────────────────────────────────────────────────────────────────────────────────

export { Corazon };
