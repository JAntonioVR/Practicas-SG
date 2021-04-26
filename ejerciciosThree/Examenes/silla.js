import * as THREE from '../libs/three.module.js'


import * as TWEEN from '../libs/tween.esm.js'

//
// ─── CLASE Tubo ─────────────────────────────────────────────────────────────────────
//
class Tubo extends THREE.Mesh{

    constructor(){
        super();
        
        var tuboGeo = new THREE.CylinderBufferGeometry(0.5,0.5,1,20);
        tuboGeo.translate(0,0.5,0);
        var material = new THREE.MeshPhongMaterial({color: 0x0});

        var tubo = new THREE.Mesh(tuboGeo, material);
        this.add(tubo);
    }

    actualizaTamano(a){
        this.scale.y = a;
    }

    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {
    }

}

class Asiento extends THREE.Object3D{
    constructor(){
        super();
        var sillon = new THREE.BoxBufferGeometry(4,1,4);
        sillon.translate(0,0.5,0);


        var respaldo = new THREE.BoxBufferGeometry(4,4,1);
        respaldo.translate(0,2,-2);

        var material = new THREE.MeshPhongMaterial({color: 0xFF0000});

        var sillonMesh = new THREE.Mesh(sillon, material),
            respaldoMesh = new THREE.Mesh(respaldo, material);
        this.add(sillonMesh);
        this.add(respaldoMesh);

        this.animate();

    }

    animate(){
        var origen  = {x: 0},
        destino = {x: 2*Math.PI};

        var time = 2;//Segundos que dura la animación

        var that = this;

        var animacion = new TWEEN.Tween(origen)
            .to(destino, time*1000)
            .repeat(Infinity)
            .onUpdate(
                function(){
                    that.rotation.y = origen.x;
                }
            );

        // Comenzamos la animacion
        animacion.start();
    }

    actualizaAltura(a){
        this.position.y = a;
    }

    update(){
        TWEEN.update();
    }
}

class Silla extends THREE.Object3D{
    constructor(){
        super();
        this.tubo = new Tubo();
        this.asiento = new Asiento();
        
        this.asiento.position.y = 1;

        this.add(this.tubo);
        this.add(this.asiento);

        this.animate();
    }

    animate(){
        // Creamos los diccionarios origen y destino
        var origen  = {y: 1},
            destino = {y: 5};

        var time = 3; //Segundos que dura la animación

        var that = this;

        var animacion = new TWEEN.Tween(origen)
        .to(destino, time*1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .repeat(Infinity)
        .yoyo(true)
        .onUpdate(
            function(){
                that.tubo.actualizaTamano(origen.y);
                that.asiento.actualizaAltura(origen.y);
            }
        );

        // Comenzamos la animacion
        animacion.start();
    }
    update(){
        TWEEN.update();
    }
}

// ────────────────────────────────────────────────────────────────────────────────

// TODO exportar las clases
export { Asiento, Silla }

    
