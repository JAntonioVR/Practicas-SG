import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'


//
// ─── CORAZON ────────────────────────────────────────────────────────────────────
//

class Corazon extends THREE.Mesh {

    constructor() {
        super();
        var shape = new THREE.Shape();
        
        shape.moveTo(0,0);

        shape.splineThru([
                new THREE.Vector2(2,3),
                new THREE.Vector2(1,4),
                new THREE.Vector2(0,3)
        ]);
        shape.splineThru([
            new THREE.Vector2(0,3),
            new THREE.Vector2(-1,4),
            new THREE.Vector2(-2,3),
            new THREE.Vector2(0,0)
        ]);

        /*var pts = [
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,0,-5),
            new THREE.Vector3(5,0,-5),
        ],
            path = new THREE.CatmullRomCurve3(pts);

            */

        var options = {
            depth: 0.2,
            bevelThickness: 0.5,
            bevelSize: 0.5,
            bevelSegments: 5,
            curveSegments: 5,
            steps: 10,
            //extrudePath: path
            },
            geometry = new THREE.ExtrudeBufferGeometry(shape, options);
        this.add(new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()));
    }

    update(){}
  
    
}

//
// ─── DIAMANTE ───────────────────────────────────────────────────────────────────
//

class Diamante extends THREE.Mesh{

    constructor(){
        super();
        var shape = new THREE.Shape();
        shape.moveTo(0,0);
        shape.lineTo(1,2);
        shape.lineTo(0,4),
        shape.lineTo(-1,2);
        shape.lineTo(0,0);

        var options = {
            depth: 0.2,
            bevelThickness: 0.5,
            bevelSize: 0.5,
            },
            geometry = new THREE.ExtrudeBufferGeometry(shape, options);
        this.add(new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()));

    }

    update(){}
}    

//
// ─── PICA ───────────────────────────────────────────────────────────────────────
//

class Pica extends THREE.Mesh{
    constructor(){
        super();
        var shape = new THREE.Shape();
        shape.moveTo(0,0);
        shape.bezierCurveTo(1,-2,3,0,2,1);
        shape.quadraticCurveTo(0,2,0,4);
        shape.quadraticCurveTo(0,2,-2,1);
        shape.bezierCurveTo(-3,0,-1,-2,0,0);

        var options = {
            depth: 0.2,
            bevelThickness: 0.5,
            bevelSize: 0.5,
            },
            geometry1 = new THREE.ExtrudeBufferGeometry(shape, options);

        this.cabeza = new THREE.Mesh(geometry1, new THREE.MeshNormalMaterial());

        // NOTE shape.extractPoints(divisions)

        var pts = [
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(2,0,0),
            new THREE.Vector3(1,0.33,0),
            new THREE.Vector3(0.5,1,0),
            new THREE.Vector3(0.2,2,0),
            new THREE.Vector3(0.2,4,0)
        ],
            geometry2 = new THREE.LatheBufferGeometry(pts,20,0,2*Math.PI);

        this.base = new THREE.Mesh(geometry2, new THREE.MeshNormalMaterial());

        this.cabeza.position.set(0,4,0);
        
        this.add(this.base);
        this.add(this.cabeza);


    }

    update(){}

}


//
// ─── TREBOL ─────────────────────────────────────────────────────────────────────
//

function formaTrebol(){
    var shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.bezierCurveTo(1,-2,4,1,1,2);
    shape.bezierCurveTo(2,4.5,-2,4.5,-1,2)
    shape.bezierCurveTo(-4,1,-1,-2,0,0);

    return shape;
}


class Trebol extends THREE.Mesh{
    constructor(){
        super();
        var shape = formaTrebol();

        var options = {
            depth: 0.2,
            bevelThickness: 0.5,
            bevelSize: 0.5,
            },
            geometry1 = new THREE.ExtrudeBufferGeometry(shape, options);

        this.cabeza = new THREE.Mesh(geometry1, new THREE.MeshNormalMaterial());


        var pts = [
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(2,0,0),
            new THREE.Vector3(1,0.33,0),
            new THREE.Vector3(0.5,1,0),
            new THREE.Vector3(0.2,2,0),
            new THREE.Vector3(0.2,4,0)
        ],
            geometry2 = new THREE.LatheBufferGeometry(pts,20,0,2*Math.PI);

        this.base = new THREE.Mesh(geometry2, new THREE.MeshNormalMaterial());

        this.cabeza.position.set(0,4,0);
        
        this.add(this.base);
        this.add(this.cabeza);


    }

    update(){}

}

//
// ─── BARRIDO ────────────────────────────────────────────────────────────────────
//

class Barrido extends THREE.Mesh{

    constructor(){
        super();

        var pts = []
        for (let i = -2*Math.PI; i < 2*Math.PI; i+=0.1) {
            pts.push(new THREE.Vector3(3*Math.cos(i),  4*i, 3*Math.sin(i),))         
        }

        var shape = formaTrebol(),
        path = new THREE.CatmullRomCurve3(pts),
        options = {
            steps: 50, curveSegments: 20, extrudePath: path
        },
        geometry = new THREE.ExtrudeBufferGeometry(shape, options);

        var espiral = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
       // espiral.scale.set(0.2,0.2,0.2);
        this.add(espiral);
        

    }

    update(){}


}
    

    

// ────────────────────────────────────────────────────────────────────────────────

export { Corazon, Diamante, Pica, Trebol, Barrido };
