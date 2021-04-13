import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'

class Pendulo extends THREE.Mesh {
    constructor(gui,titleGui, posicion) {
        super();
        this.createGUI(gui,titleGui, posicion);
    }
  
    //
    // ─── INTERFAZ GRAFICA ───────────────────────────────────────────────────────────
    //
    createGUI (gui,titleGui) {
        // Controles para el movimiento de la parte móvil
        this.guiControls = new function () {
            
            this.alpha = 0;
            this.beta = 5;
            this.gamma = 0.1;
            this.delta = 0;
            this.lambda = 10;
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        folder.add (this.guiControls, 'alpha', -Math.PI/4, Math.PI/4, 0.01).name ('Giro Pendulo Superior :\t').listen();
        folder.add (this.guiControls, 'beta', 5, 10, 0.1).name ('Tamaño parte roja :\t').listen();
        folder.add (this.guiControls, 'gamma', 0.1, 0.9, 0.1).name ('Posicion Pendulo inferior :\t').listen();
        folder.add (this.guiControls, 'delta', -Math.PI/4, Math.PI/4, 0.1).name ('Giro Pendulo Inferior :\t').listen();
        folder.add (this.guiControls, 'lambda', 10,20, 0.1).name ('Tamaño Pendulo Inferior :\t').listen();
        
        // Reset?
    }

    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {
        /*this.position.set(
            this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ
        );
        this.rotation.set(
            this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ
        );
        this.scale.set(
            this.guiControls.tamX, this.guiControls.tamY, this.guiControls.tamZ
        );*/
    }
}

// ────────────────────────────────────────────────────────────────────────────────

class EjePenduloSuperior extends THREE.Object3D{

    constructor() {
        super();
        var cilindroGeo = new THREE.CylinderGeometry(1,1,4.2,20),
            cajaGeo = new THREE.BoxGeometry(4,4,4,);
        
        var cilindro = new THREE.Mesh(
                cilindroGeo,
                new THREE.MeshPhongMaterial({color: 0xD53A87 })
            ),
            caja = new THREE.Mesh(
                cajaGeo,
                new THREE.MeshPhongMaterial({color: 0x00FF00 })
            );
        
        cilindro.rotateX(Math.PI/2);
        this.add(cilindro);
        this.add(caja);
    }

    update(){}

}

class ParteAbajoPS extends THREE.Object3D{
    constructor(){
        super();
        var cajaGeo = new THREE.BoxGeometry(4,4,4,);
        
        var caja = new THREE.Mesh(
                cajaGeo,
                new THREE.MeshPhongMaterial({color: 0x00FF00 })
            );
        this.add(caja);
    }

    update(){}
}

class ParteRoja extends THREE.Object3D{
    constructor(gui, titleGui){
        super();
        this.createGUI(gui, titleGui);
        var cajaGeo = new THREE.BoxGeometry(4,1,4);
        var caja = new THREE.Mesh(
                cajaGeo,
                new THREE.MeshPhongMaterial({color: 0xFF0000})
            );
        caja.position.set(0,-0.5,0);

        this.add(caja);

    }

    createGUI(gui, titleGui){
        this.guiControls = new function () {
            this.beta = 5;
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'beta', 5, 10, 0.1).name ('Tamaño :\t').listen();
    }

    update () {
        this.scale.set(1, this.guiControls.beta, 1);
    }
}

class PenduloSuperior extends THREE.Object3D{
    constructor(gui){
        super();
        //this.createGUI(gui,titleGui);
        this.parteArriba = new EjePenduloSuperior(),
        this.parteCentral = new ParteRoja(gui, "Parte Roja"),
        this.parteAbajo = new ParteAbajoPS();

        this.parteCentral.position.set(0,-2,0);
        this.parteAbajo.position.set(0,-4-this.parteCentral.scale.y, 0);

        this.add(this.parteArriba);
        this.add(this.parteCentral);
        this.add(this.parteAbajo);
    }

    update(){
        this.parteCentral.update();
        this.parteAbajo.position.set(0,-4-this.parteCentral.guiControls.beta);
    }
}

class PenduloInferiorCaja extends THREE.Object3D{
    constructor(gui,  titleGui){
        super();
        this.createGUI(gui, titleGui);
        var cajaGeo = new THREE.BoxGeometry(2,1,1);
            
        var caja = new THREE.Mesh(
                cajaGeo,
                new THREE.MeshPhongMaterial({color: 0x0000FF})
            );
        caja.position.set(0,-0.5,0);
        this.add(caja);


    }

    createGUI(gui, titleGui){
        this.guiControls = new function(){
            this.lambda = 10;
        }
        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'lambda', 10,20, 0.1).name ('Tamaño :\t').listen();
    }

    update(){
        this.scale.set(1,this.guiControls.lambda);
    }

}

class PenduloInferior extends THREE.Object3D{
    constructor(gui, titleGui){
        super();
        this.createGUI(gui,titleGui);

        var cilindroGeo = new THREE.CylinderGeometry(0.5,0.5, 1.5, 20),
            cilindro = new THREE.Mesh(
                cilindroGeo,
                new THREE.MeshPhongMaterial({color: 0xFF0000})
            );
        cilindro.rotateX(Math.PI/2);
        
        this.caja = new PenduloInferiorCaja(gui,"PenduloInferior");
        this.caja.position.set(0,1,0);
        this.add(cilindro);
        this.add(this.caja);


    }

    createGUI(gui, titleGui){
        this.guiControls = new function(){
            this.delta = 0;
        }
        var folder = gui.addFolder(titleGui);
        folder.add (this.guiControls, 'delta', -Math.PI/4, Math.PI/4, 0.1).name ('Giro :\t').listen();
    }

    update(){
        this.caja.update();
        this.rotation.set(0,0,this.guiControls.delta);

    }
}


// ────────────────────────────────────────────────────────────────────────────────

export { EjePenduloSuperior, ParteAbajoPS, ParteRoja, PenduloSuperior, PenduloInferiorCaja,
         PenduloInferior };
