import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

//
// ─── CLASE BOLA-CILINDRO ────────────────────────────────────────────────────────────────
//

class BolaCilindroTrayectoria extends THREE.Mesh {
    constructor(gui,titleGui) {
        super();
        this.createGUI(gui,titleGui);

        var cilindroGeo = new THREE.CylinderGeometry(1,1,10,50),
            materialCilindro = new THREE.MeshNormalMaterial();
        materialCilindro.transparent = true;
        materialCilindro.opacity = 0.3;

        this.cilindro = new THREE.Mesh(cilindroGeo, materialCilindro);
        this.cilindro.position.y+=5;
        this.cilindro.scale.z = 3;
        this.add(this.cilindro);

        this.esfera = new Esfera();
        this.esfera.position.y+=5
        this.add(this.esfera);

        this.animate();
    }
  
    //
    // ─── INTERFAZ GRAFICA ───────────────────────────────────────────────────────────
    //
    createGUI (gui,titleGui) {

        this.guiControls = new function () {
            this.radio = 1;
        } 
        var that = this;
        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'radio', 1, 10, 1).name ('Radio :\t').onChange(
            function(){
                that.cilindro.scale.set(that.guiControls.radio, 1, 3);
            }
        );
    }

    animate(){

        var that = this;

        var origenGiro = {alpha: 0},
            destinoGiro = {alpha: 2*Math.PI};

        var animacionGiro = new TWEEN.Tween(origenGiro)
            .to(destinoGiro, 3*1000)
            .onUpdate(
                function(){
                    that.esfera.position.x = that.guiControls.radio*Math.cos(origenGiro.alpha);
                    that.esfera.position.z = 3*Math.sin(origenGiro.alpha);
                }
            )
            .repeat(Infinity);
            
        animacionGiro.start();
    }

    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {

        TWEEN.update();

    }
}

class Esfera extends THREE.Object3D{
    constructor(){
        super();

        var esferaGeo = new THREE.SphereBufferGeometry(1,50,50),
            materialEsfera = new THREE.MeshNormalMaterial();
        this.esfera = new THREE.Mesh(esferaGeo, materialEsfera);
        this.add(this.esfera);
    }
    update(){}
}


// ────────────────────────────────────────────────────────────────────────────────

export { BolaCilindroTrayectoria };
