import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'

//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: C L A S E   G E O M E T R I A : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//

class Geometria extends THREE.Mesh {
    constructor(gui,titleGui) {
        super();
        this.createGUI(gui,titleGui);
    }
  
    //
    // ─── INTERFAZ GRAFICA ───────────────────────────────────────────────────────────
    //
    createGUI (gui,titleGui) {
        // Controles para el movimiento de la parte móvil
        this.guiControls = new function () {
            this.posX = 0.0;
            this.posY = 0.5;
            this.posZ = 0.0;

            this.rotX = 0.0;
            this.rotY = 0.0;
            this.rotZ = 0.0;

            this.tamX = 1.0;
            this.tamY = 1.0;
            this.tamZ = 1.0;

            this.spawnPosition = new THREE.Vector3(this.posX, this.posY, this.posZ);
            
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

    setSpawnPosition(x, y, z){
        this.guiControls.posX = x;
        this.guiControls.posY = y;
        this.guiControls.posZ = z;

        this.guiControls.spawnPosition.x = x;
        this.guiControls.spawnPosition.y = y;
        this.guiControls.spawnPosition.z = z;
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
        super(gui, titleGui);
        this.geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xBEFF33,
            flatShading: true,
            specular: 0.4,
            shininess: 0.9,
            reflectivity: 0.2,
        });
    }
}


class Cono extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui);
        this.geometry = new THREE.ConeGeometry(1.0, 1.0, 20);
        this.material = new THREE.MeshPhongMaterial({
            color: 0x33B2FF,
            specular: 0.9,
            shininess: 0.9,
            reflectivity: 0.8,
        });
        
    }
}


class Cilindro extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui);
        this.geometry = new THREE.CylinderGeometry(1.0, 1.0, 1.0, 20);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xE80606
        });
    }
}

class Esfera extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui);
        this.geometry = new THREE.SphereGeometry(1.0, 20, 20);
        this.material = new THREE.MeshPhongMaterial({
            color: 0x12C968
        });
    }
}

class Icosaedro extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui);
        this.geometry = new THREE.IcosahedronGeometry(1.0);
        this.material = new THREE.MeshPhongMaterial({
            color: 0x04094E
        });
    }
}

class Toro extends Geometria{
    constructor(gui, titleGui){
        super(gui, titleGui);
        this.geometry = new THREE.TorusGeometry(1.0, 0.5, 20, 20);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xC98E0F
        });
    }
}


// ────────────────────────────────────────────────────────────────────────────────



export { Cubo, Cono, Cilindro, Esfera, Icosaedro, Toro };
