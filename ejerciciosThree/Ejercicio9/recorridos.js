import * as THREE from '../libs/three.module.js'

import {Coche} from '../Ejercicio6/geometriaFichero.js'
import * as TWEEN from '../libs/tween.esm.js'


//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: C L A S E   R E C O R R I D O : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//
class Recorrido extends THREE.Mesh {
    constructor() {
        super();

        var pts       = [],
            npoints   = 50,
            increment = (2*Math.PI)/npoints,
            t         = 0;
        for (let i = 0; i < npoints; i++) {
            pts.push(this.spline(t));

            t += increment;
        }
        pts.push( this.spline(0));

        this.spline = new THREE.CatmullRomCurve3(pts);

        var geometryLine          = new THREE.Geometry();
            geometryLine.vertices = this.spline.getPoints(100);
        var material              = new THREE.LineBasicMaterial({color: 0xff0000});
        var visibleSpline         = new THREE.Line(geometryLine, material);
        this.add(visibleSpline);

        this.object = new Coche();
        this.add(this.object);

        this.animate();
    }

    //
    // ─── FUNCION SPLINE ─────────────────────────────────────────────────────────────
    //
    spline(t){
        var d = 20,
            x = d* Math.SQRT2*Math.cos(t)/(Math.sin(t)^2+1),
            y = 0.5,
            z = d*Math.SQRT2*Math.cos(t)*Math.sin(t)/(Math.sin(t)^2+1);
        return new THREE.Vector3(x,y,z);
    }

    //
    // ─── FUNCION DE ANIMACION ───────────────────────────────────────────────────────
    //
    animate(){
        var origen  = { lambda: 0},
            destino = { lambda: 1};

        var that = this;

        var animacion1 = new TWEEN.Tween(origen)
            .to(destino, 2*1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(
                function(){
                    var t = origen.lambda;

                    var posicion = that.spline.getPointAt(t/2);
                    that.object.position.copy(posicion);

                    var tangente = that.spline.getTangentAt(t/2);
                    posicion.add(tangente);

                    that.object.lookAt(posicion);
                }
            )
            .onComplete(
                function(){
                    origen.lambda = 0;
                }
            ),
            animacion2 = new TWEEN.Tween(origen)
            .to(destino, 3*1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(
                function(){
                    var t = origen.lambda;

                    var posicion = that.spline.getPointAt(1/2+t/2);
                    that.object.position.copy(posicion);

                    var tangente = that.spline.getTangentAt(1/2+t/2);
                    posicion.add(tangente);

                    that.object.lookAt(posicion);
                }
            )
            .onComplete(
                function(){
                    origen.lambda = 0;
                    animacion1.start();
                }
            );

        this.movimiento = animacion1.chain(animacion2);
        this.movimiento.start();
    }

    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {
        
        TWEEN.update();
        this.object.rotation.y += Math.PI;

    }
}


// ────────────────────────────────────────────────────────────────────────────────

export { Recorrido };
