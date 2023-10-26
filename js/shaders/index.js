import { 
    Scene, PerspectiveCamera, 
    WebGLRenderer, Mesh,
    BoxGeometry, ShaderMaterial
} from 'three';

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

const cubeGeom = new BoxGeometry();
const cubeMat = new ShaderMaterial({
    vertexShader: simpleVert,
    fragmentShader: simpleFrag
});

const cubeMesh = new Mesh(cubeGeom, cubeMat);
scene.add(cubeMesh);

// render loop
function updateRender() {
    if (customMesh !== undefined) {
        cubeMesh.rotation.x += 0.01;
        cubeMesh.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(updateRender)
}

updateRender()