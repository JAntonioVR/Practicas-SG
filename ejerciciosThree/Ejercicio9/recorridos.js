import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'


//
// ─── CLASE RELOJ ────────────────────────────────────────────────────────────────
//

class Spline extends THREE.Mesh {
    constructor() {
        super();


        var pts = [],
        npoints = 50,
        x,y,z, d=7,
        increment = (2*Math.PI)/npoints,
        t = 0;
        for (let i = 0; i < npoints; i++) {
            x = d* Math.SQRT2*Math.cos(t)/(Math.sin(t)^2+1);
            y = 0
            z =  7*Math.SQRT2*Math.cos(t)*Math.sin(t)/(Math.sin(t)^2+1);

            pts.push(new THREE.Vector3(x,y,z));

            t+=increment;
        }

        var spline = new THREE.CatmullRomCurve3(pts);

        var geometryLine = new THREE.Geometry();
        geometryLine.vertices = spline.getPoints(100);
        var material = new THREE.LineBasicMaterial({color: 0xff0000});
        var visibleSpline = new THREE.Line(geometryLine, material);
        this.add(visibleSpline);





    }

    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {
    
    }
}


// ────────────────────────────────────────────────────────────────────────────────

export { Spline };
