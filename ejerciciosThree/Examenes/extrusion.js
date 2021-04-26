import * as THREE from '../libs/three.module.js'

class Cosa extends THREE.Mesh{
    constructor(){
        super();
        var shape = new THREE.Shape();
        shape.moveTo(0,0);
        shape.bezierCurveTo (3,-2,3,4,0,2);
        shape.bezierCurveTo(-3,4,-3,-2,0,0);

        var hole1 = new THREE.Shape(),
            hole2 = new THREE.Shape();

        hole1.absellipse(1,1, 0.5, 1, 0, 2*Math.PI);

        hole2.absellipse(-1,1, 0.5, 1, 0, 2*Math.PI);

        shape.holes.push(hole1);
        shape.holes.push(hole2);

        var pts = [
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(5,0,0),
            new THREE.Vector3(5,0,6),
            new THREE.Vector3(10,0,4),
            new THREE.Vector3(10,0,0)
        ];

        var path = new THREE.CatmullRomCurve3(pts);
        var options = {
            steps: 50, curveSegments: 20, extrudePath: path
        };
        var geo = new THREE.ExtrudeBufferGeometry(shape, options);
        var mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
        this.add(mesh);

    }

    update(){}

}

export{Cosa}