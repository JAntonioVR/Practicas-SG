import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'

//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: C L A S E   G E O M E T R I A : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//

class Geometria extends THREE.Mesh {
    constructor(gui,titleGui, posicion) {
        super();
        this.createGUI(gui,titleGui, posicion);
    }
  
    //
    // ─── INTERFAZ GRAFICA ───────────────────────────────────────────────────────────
    //
    createGUI (gui,titleGui, posicion) {
        // Controles para el movimiento de la parte móvil
        this.guiControls = new function () {
            this.posX = posicion.x;
            this.posY = posicion.y;
            this.posZ = posicion.z;

            this.rotX = 0.0;
            this.rotY = 0.0;
            this.rotZ = 0.0;

            this.tamX = 1.0;
            this.tamY = 1.0;
            this.tamZ = 1.0;
            
            // NOTE Aqui Andrés pone un botón para resetear la posicion y wireframe (modo alambre creo)
            // ...
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        folder.add (this.guiControls, 'posX', -10.0, 10.0, 0.001).name ('Posicion X :\t').listen();
        folder.add (this.guiControls, 'posY', -10.0, 10.0, 0.001).name ('Posicion Y :\t').listen();
        folder.add (this.guiControls, 'posZ', -10.0, 10.0, 0.001).name ('Posicion Z :\t').listen();

        folder.add (this.guiControls, 'rotX', 0.1, 2.0 * Math.PI, 0.001).name ('Rotacion X :\t').listen();
        folder.add (this.guiControls, 'rotY', 0.1, 2.0 * Math.PI, 0.001).name ('Rotacion Y :\t').listen();
        folder.add (this.guiControls, 'rotZ', 0.1, 2.0 * Math.PI, 0.001).name ('Rotacion Z :\t').listen();

        folder.add (this.guiControls, 'tamX', 0.1, 10.0, 0.001).name ('Tamano X :\t').listen();
        folder.add (this.guiControls, 'tamY', 0.1, 10.0, 0.001).name ('Tamano Y :\t').listen();
        folder.add (this.guiControls, 'tamZ', 0.1, 10.0, 0.001).name ('Tamano Z :\t').listen();
        
        // Reset?
    }

    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {
        this.position.set(
            this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ
        );
        this.rotation.set(
            this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ
        );
        this.scale.set(
            this.guiControls.tamX, this.guiControls.tamY, this.guiControls.tamZ
        );
    }
}

// ────────────────────────────────────────────────────────────────────────────────

// Creamos los objetos basicos que pide el ejercicio

class Cubo extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui, new THREE.Vector3(0, 0.5, 0));
        this.geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        var miMaterial = new THREE.MeshPhongMaterial({
            color: 0xBEFF33,
        });
        miMaterial.needsUpdate = true;
        this.material = miMaterial;
    }
}


class Cono extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui, new THREE.Vector3(0,0.5,3));
        this.geometry = new THREE.ConeGeometry(1.0, 1.0, 20);
        var miMaterial = new THREE.MeshNormalMaterial();
        miMaterial.needsUpdate = true;
        this.material = miMaterial;
        
    }
}

class Cilindro extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui, new THREE.Vector3(3,0.5,0));
        this.geometry = new THREE.CylinderGeometry(1.0, 1.0, 1.0, 20);
        var miMaterial = new THREE.MeshPhongMaterial({
            color: 0xE80606,
            shininess: 50,
        });
        miMaterial.flatShading = true;
        miMaterial.needsUpdate = true;
        this.material = miMaterial;
    }
}

class Esfera extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui, new THREE.Vector3(3,1,3));
        this.geometry = new THREE.SphereGeometry(1.0, 20, 20);
        var miMaterial = new THREE.MeshPhongMaterial({
            color: 0x90c620,
            shininess: 100,
            emissive: 0x0,
        });
        miMaterial.needsUpdate = true;
        this.material = miMaterial;
    }
}

class Icosaedro extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui, new THREE.Vector3(6,1,0));
        this.geometry = new THREE.IcosahedronGeometry(1.0);
        var miMaterial = new THREE.MeshPhongMaterial({
            color: 0x04094E,
            shininess: 50,
            

        });
        
        miMaterial.needsUpdate = true;
        this.material = miMaterial;
    }
}

class Toro extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui, new THREE.Vector3(0,1.5,6));
        this.geometry = new THREE.TorusGeometry(1.0, 0.5, 20, 20);
        var miMaterial = new THREE.MeshNormalMaterial({});
        //miMaterial.flatShading = true;
        miMaterial.needsUpdate = true;
        this.material = miMaterial;
    }
}


// ────────────────────────────────────────────────────────────────────────────────

export { Cubo, Cono, Cilindro, Esfera, Icosaedro, Toro };
