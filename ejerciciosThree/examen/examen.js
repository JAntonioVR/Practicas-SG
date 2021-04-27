import * as THREE from '../libs/three.module.js'

// NOTE descomprimir esta carpeta al nivel de la carpeta 
// ejerciciosThree que se recomendaba en practicas

import { ThreeBSP } from '../libs/ThreeBSP.js'
import * as TWEEN from '../libs/tween.esm.js'

//
// ─── Cabeza ─────────────────────────────────────────────────────────────────────
//
class Cabeza extends THREE.Mesh{

    constructor(){
        super();

        var arribaBSP = mediaEsferaBSP(),
            abajoBSP  = mediaEsferaBSP();

        var cilindroGeo = new THREE.CylinderGeometry(0.25,0.25,6);
        cilindroGeo.rotateX(Math.PI/2.0);
        cilindroGeo.translate(1.5,1.5,0);

        var cilindroBSP = new ThreeBSP(cilindroGeo);

        arribaBSP = arribaBSP.subtract(cilindroBSP);

        var parteArriba = arribaBSP.toGeometry();
        var bufferGeometryArriba = new THREE.BufferGeometry().fromGeometry(parteArriba);
        bufferGeometryArriba.rotateY(-Math.PI/2.0);

        var parteAbajo = abajoBSP.toGeometry();
        var bufferGeometryAbajo = new THREE.BufferGeometry().fromGeometry(parteAbajo);
        bufferGeometryAbajo.rotateZ(Math.PI);

        var material = new THREE.MeshPhongMaterial({color : 0xFFFF00}); 

        this.cabeza = new THREE.Mesh(bufferGeometryArriba, material);
        this.boca   = new THREE.Mesh(bufferGeometryAbajo, material);

        this.add(this.cabeza);
        this.add(this.boca);    

        // Animacion de la boca

        this.animate();

    }


    animate(){

        //
        // ─── ANIMACION BOCA ──────────────────────────────────────────────
        //        
        var origen  = {giro: 0},
            destino = {giro: Math.PI/4};

        var time = 0.5; //Segundos que dura la animación

        var that = this;

        var animacion = new TWEEN.Tween(origen)
            .to(destino, time*1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate(
                function(){
                    that.boca.rotation.x = origen.giro;
                }
            );

        // Comenzamos la animacion
        animacion.start();            

    }


    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {
        TWEEN.update()
    }

}

function mediaEsferaBSP(){
    var esferaGeo = new THREE.SphereGeometry(3,30,30),
        cajaGeo   = new THREE.BoxGeometry(6,6,6);

    cajaGeo.translate(0,-3,0);

    var esferaBSP = new ThreeBSP(esferaGeo),
        cajaBSP  = new ThreeBSP(cajaGeo);

    var finalResult = esferaBSP.subtract(cajaBSP);

    return finalResult;
}

class Comecocos extends THREE.Mesh{
    constructor(){
        super();

        this.comecocos = new Cabeza();
        this.add(this.comecocos) ;

        this.spline = this.create_spline();

        this.animate();
    }


    animate(){

        var origen  = { lambda: 0},
            destino = { lambda: 1};

        var that = this;


        //
        // ─── ANIMACION PARTE SUPERIOR P ──────────────────────────────────
        //
        var animacion1 = new TWEEN.Tween(origen)
            .to(destino, 6*1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(
                function(){
                    var t = origen.lambda;

                    var posicion = that.spline.getPointAt(7/12*t);
                    that.comecocos.position.copy(posicion);

                    var tangente = that.spline.getTangentAt(7/12*t);
                    posicion.add(tangente);

                    that.comecocos.lookAt(posicion);
                }
            )
            .onComplete(
                function(){
                    origen.lambda = 0;
                }
            );

        //
        // ─── ANIMACION PARTE INFERIOR P ──────────────────────────────────
        //
        var animacion2 = new TWEEN.Tween(origen)
            .to(destino, 4*1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(
                function(){
                    var t = origen.lambda;

                    var posicion = that.spline.getPointAt(7/12+5*t/12);
                    that.comecocos.position.copy(posicion);

                    var tangente = that.spline.getTangentAt(7/12+5*t/12);
                    posicion.add(tangente);

                    that.comecocos.lookAt(posicion);
                }
            )
            .onComplete(
                function(){
                    origen.lambda = 0;
                }
            );

        animacion1.chain(animacion2);
        animacion2.chain(animacion1);

        animacion1.start();
    }

    create_spline(){

        var pts = [
            new THREE.Vector3(-12,3,0),
            new THREE.Vector3(-12,3,20),
            new THREE.Vector3(-4,3,20),
            new THREE.Vector3(4,3,16),
            new THREE.Vector3(8,3,12),
            new THREE.Vector3(8,3,8),
            new THREE.Vector3(4,3,4),
            new THREE.Vector3(-4,3,0),
            new THREE.Vector3(-4,3,-16),
            new THREE.Vector3(-12,3,-16),
            new THREE.Vector3(-12,3,0)
        ];

        var spline = new THREE.CatmullRomCurve3(pts);
    
        var geometryLine          = new THREE.Geometry();
        geometryLine.vertices     = spline.getPoints(100);
        var material              = new THREE.LineBasicMaterial({color: 0xff0000});
        var visibleSpline         = new THREE.Line(geometryLine, material);
        this.add(visibleSpline);
        
        return spline;
    }

    update(){
        this.comecocos.update();
    }

}

// ────────────────────────────────────────────────────────────────────────────────

export { Comecocos }

    
