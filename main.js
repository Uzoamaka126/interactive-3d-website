import { 
    Scene, PerspectiveCamera, 
    WebGLRenderer,
    MeshNormalMaterial, Mesh, BoxGeometry
} from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { simpleVert } from './js/'

// // Renderer setup
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.webGLContainer').appendChild(renderer.domElement);

// // Scene setup
const scene = new Scene();

// // Camera
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0) // centered view

let customMesh;

// setup GLTFLoader
const loader = new GLTFLoader();

loader.load('assets/squareRing.glb', function(glb) {    
    glb.scene.traverse(function(child) {
        if (child instanceof Mesh) {
            customMesh = child;
            customMesh.material = new MeshNormalMaterial(); 
        }
    })

    for (var i = 0; i < 20; i++) {
        const c = customMesh.clone();
        c.rotation.y = 

        scene.add(c)
    }
    scene.add(customMesh);
})

// render loop
function updateRender() {
    if (customMesh !== undefined) {
        customMesh.rotation.x += 0.01;
        customMesh.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(updateRender)
}

updateRender()