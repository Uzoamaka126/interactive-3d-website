import { 
    Scene, PerspectiveCamera, 
    WebGLRenderer,
    MeshNormalMaterial, Mesh, BoxGeometry
} from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
    console.log({ glb });
    
    glb.scene.traverse(function(child) {
        if (child instanceof Mesh) {
            console.log({ child });
            customMesh = child;
            customMesh.material = new MeshNormalMaterial(); 
        }
    })
    scene.add(customMesh);
})

const cubeGeom = new BoxGeometry(1, 1, 1);
const cubeMat = new MeshNormalMaterial(); // create mesh material
const cubeMesh = new Mesh(cubeGeom, cubeMat) // create mesh object
scene.add(cubeMesh) // add mesh object to the scene/canvas 

// // render loop
function updateRender() {
    // cubeMesh.rotation.x += 0.01;
    // cubeMesh.rotation.y += 0.01;
    // cubeMesh.scale.y += Math.sin(Date.now() * 0.01)

    if (customMesh !== undefined) {
        customMesh.rotation.x += 0.01;
        customMesh.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(updateRender)
}

updateRender()