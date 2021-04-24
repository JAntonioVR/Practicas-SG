import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

//
// ─── CLASE BOLA-CILINDRO ────────────────────────────────────────────────────────────────
//

class BolaCilindro extends THREE.Mesh {
    constructor(gui,titleGui) {
        super();
        this.createGUI(gui,titleGui);
        this.radio = 5;
        this.velocidad = 2;

        var cilindroGeo = new THREE.CylinderGeometry(1,1,10,50),
            materialCilindro = new THREE.MeshNormalMaterial();
        materialCilindro.transparent = true;
        materialCilindro.opacity = 0.3;

        this.cilindro = new THREE.Mesh(cilindroGeo, materialCilindro);
        this.cilindro.position.y+=5;
        this.add(this.cilindro);

        this.esfera = new Esfera();
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
                that.cilindro.scale.set(that.guiControls.radio, 1, that.guiControls.radio);
                that.esfera.esfera.position.set(that.guiControls.radio,0,0);
            }
        );
    }

    animate(){

        var origenY = {y: 0},
            destinoY = {y: 10};
            var that = this

        var animacionY = new TWEEN.Tween(origenY)
            .to(destinoY, 10*1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(
                function(){
                    
                    that.esfera.position.y = origenY.y;
                }
            )
            .yoyo(true)
            .repeat(Infinity);


        var origenGiro = {alpha: 0},
            destinoGiro = {alpha: 2*Math.PI};

        var animacionGiro = new TWEEN.Tween(origenGiro)
            .to(destinoGiro, 3*1000)
            .onUpdate(
                function(){
                    that.esfera.rotation.y = origenGiro.alpha;
                }
            )
            .repeat(Infinity);

        animacionY.start();
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

        this.esfera.position.x = 1;
        this.add(this.esfera);
    }
    update(){}
}


// ────────────────────────────────────────────────────────────────────────────────

export { BolaCilindro };
