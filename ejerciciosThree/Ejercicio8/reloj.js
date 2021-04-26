import * as THREE from '../libs/three.module.js'


//
// ─── CLASE RELOJ ────────────────────────────────────────────────────────────────
//

class Reloj extends THREE.Mesh {
    constructor(gui,titleGui) {
        super();
        this.velocidad = 0;
        this.createGUI(gui,titleGui);

        var radio = 10,
            angle = 2.0*Math.PI/12.0;
        var esferaGeo = new THREE.SphereBufferGeometry(1,20);

        var mesh

        for (let i = 0; i < 12 ; i++) {
            esferaGeo = new THREE.SphereBufferGeometry(1,20);
            esferaGeo.translate(radio,0,0);
            esferaGeo.rotateY(i*angle);
            mesh = new THREE.Mesh(
                esferaGeo,
                new THREE.MeshPhongMaterial({color: 0x00FF00})
            );
            
            this.add(mesh);
            console.log("Esfera" + i)
        }


        esferaGeo = new THREE.SphereBufferGeometry(1,20);
        esferaGeo.translate(radio-3,0,0);
        mesh = new THREE.Mesh(
                esferaGeo,
                new THREE.MeshPhongMaterial({color: 0xFF0000})
        );
        this.aguja = mesh;
        this.add(this.aguja);

        
        this.tiempoAnterior = Date.now();


    }
  
    //
    // ─── INTERFAZ GRAFICA ───────────────────────────────────────────────────────────
    //
    createGUI (gui,titleGui) {

        this.guiControls = new function () {
            this.velocidad = 0;
        } 

        var that = this;

        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'velocidad', -12, 12, 1).name ('Velocidad :\t').onChange(
            function(){
                that.velocidad = that.guiControls.velocidad;
            }
        );
    }

    //
    // ─── METODO UPDATE ──────────────────────────────────────────────────────────────
    //        
    update () {

        var tiempoActual = Date.now();
        var segundos = (tiempoActual-this.tiempoAnterior)/1000;

        this.aguja.rotation.y += (2.0*Math.PI)/12*this.velocidad*segundos;

        this.tiempoAnterior = tiempoActual;

    }
}


// ────────────────────────────────────────────────────────────────────────────────

export { Reloj };
