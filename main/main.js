import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//Lights
const ambientLight = new THREE.AmbientLight( 0x404040 );
scene.add( ambientLight );

const marsGeometry = new THREE.SphereGeometry(15, 32, 16);
const marsMaterial = new THREE.MeshStandardMaterial();

const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);
camera.position.z = 30;

function animate() {
  mars.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
