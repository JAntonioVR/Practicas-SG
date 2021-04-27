import * as THREE from '../libs/three.module.js'

// TODO Importa las bibliotecas necesarias
// NOTE revisa las rutas
// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

//
// ─── CLASE1 ─────────────────────────────────────────────────────────────────────
//
class Clase1 extends THREE.Mesh{

    constructor(gui, titlegui){
        super();
        this.createGUI(gui, titlegui);

        // TODO Crear geometria
        // NOTE No te olvides de hacer BufferGeometry

        var geometry = new THREE.SphereBufferGeometry(), 
            material = THREE.MeshNormalMaterial();

        var esfera = new THREE.Mesh(geometry, material);
        this.add(esfera);

        // TODO Animaciones??
    }

    //
    // ─── INTERFAZ GRAFICA ───────────────────────────────────────────────────────────
    //
    createGUI (gui,titleGui) {

        this.guiControls = new function () {
            // TODO Añadir atributos de la interfaz
            this.xxxxx = 0;
        } 

        var that = this;

        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'xxxxx', -12, 12, 1).name ('XXXXX :\t').onChange(
            function(){
                // TODO Acciones a realizar a partir de la interfaz
            }
        );
    }

    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {
        // TODO Update
        // TWEEN.update() ??
    }

}

//
// ─── CLASE2 ─────────────────────────────────────────────────────────────────────
//
class Clase2 extends THREE.Mesh{

    constructor(gui, titlegui){
        super();
        this.createGUI(gui, titlegui);

        // TODO Crear geometria
        // NOTE No te olvides de hacer BufferGeometry

        var geometry = new THREE.SphereBufferGeometry(), 
            material = THREE.MeshNormalMaterial();

        var esfera = new THREE.Mesh(geometry, material);
        this.add(esfera);

        // TODO Animaciones??
    }

    //
    // ─── INTERFAZ GRAFICA ───────────────────────────────────────────────────────────
    //
    createGUI (gui,titleGui) {

        this.guiControls = new function () {
            // TODO Añadir atributos de la interfaz
            this.xxxxx = 0;
        } 

        var that = this;

        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'xxxxx', -12, 12, 1).name ('XXXXX :\t').onChange(
            function(){
                // TODO Acciones a realizar a partir de la interfaz
            }
        );
    }

    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {
        // TODO Update
        // TWEEN.update() ??
    }

}

// ────────────────────────────────────────────────────────────────────────────────

// TODO exportar las clases
export { Clase1, Clase2 }

    
