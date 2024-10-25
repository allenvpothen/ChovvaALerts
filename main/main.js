import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const canvas = document.querySelector("canvas.webgl");
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const textureLoader = new THREE.TextureLoader();
const marsBaseColor = textureLoader.load("textures/mars_color.jpg");
const marsNormal = textureLoader.load("textures/mars_normal.jpg");

//Lights
const ambientLight = new THREE.AmbientLight( 0x4f4738);
scene.add( ambientLight );
const directionalLight = new THREE.DirectionalLight( 0xdec9a4,  2);
directionalLight.position.set(-1,0.3,0.7);
scene.add( directionalLight );
const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );

const marsGeometry = new THREE.SphereGeometry(15, 80, 40);
const marsMaterial = new THREE.MeshStandardMaterial(
    {
        map: marsBaseColor,
        normalMap: marsNormal
    }
);

const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);
camera.position.z = 30;
const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

function animate() {
  mars.rotation.y += 0.003;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
