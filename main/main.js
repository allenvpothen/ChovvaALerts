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
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xffffff, 0);
document.body.appendChild(renderer.domElement);
const textureLoader = new THREE.TextureLoader();
const marsBaseColor = textureLoader.load("textures/mars_color.jpg");
const marsNormal = textureLoader.load("textures/mars_normal.jpg");
const pinTexture = textureLoader.load("textures/pin.png");

//camera
camera.position.z = 35;
const controls = new OrbitControls(camera, canvas);
controls.minDistance = 19;
controls.maxDistance = 100;

// controls.enableDamping = true;

//Lights
const ambientLight = new THREE.AmbientLight(0x4f4738);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xdec9a4, 2);
directionalLight.position.set(-1, 0.3, 0.7);
scene.add(directionalLight);
// camera.add(directionalLight);
scene.add(camera);

//mars
const marsGeometry = new THREE.SphereGeometry(16, 80, 40);
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsBaseColor,
  normalMap: marsNormal,
});

const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

//locators
const locatorGeometry = new THREE.PlaneGeometry(1, 1);
const locatorMaterial = new THREE.MeshBasicMaterial({
  map: pinTexture,
  color: "rgb(210, 43, 43)",
  alphaMap: pinTexture,
  transparent: true,
});
const northPole = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(northPole);
northPole.position.set(0, 18, 0);
northPole.scale.set(1.5, 1.5, 1.5);

const southPole = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(southPole);
southPole.position.set(0, -18, 0);
southPole.scale.set(1.5, 1.5, 1.5);

const galeCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(galeCrater);
galeCrater.position.set(-17, -3, 0);
galeCrater.scale.set(1.5, 1.5, 1.5);

const jezeroCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(jezeroCrater);
jezeroCrater.position.set(17, 3, 0);
jezeroCrater.scale.set(1.5, 1.5, 1.5);

const olympusMons = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(olympusMons);
olympusMons.position.set(9, -3, 14);
olympusMons.scale.set(1.5, 1.5, 1.5);

const miyamotoCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(miyamotoCrater);
miyamotoCrater.position.set(-2, -1, 17);
miyamotoCrater.scale.set(1.5, 1.5, 1.5);

const eddieCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(eddieCrater);
eddieCrater.position.set(2, -2, -17);
eddieCrater.scale.set(1.5, 1.5, 1.5);

const keplerCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(keplerCrater);
keplerCrater.position.set(-4, -5, -14);
keplerCrater.scale.set(1.5, 1.5, 1.5);

const mawrthVallis = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(mawrthVallis);
mawrthVallis.position.set(-15, 8, -2);
mawrthVallis.scale.set(1.5, 1.5, 1.5);

// locator1.rotateZ(Math.PI/2);

//Locator 2.0
// let allParticles = [
//     { name: 'a', position: new THREE.Vector3( 400, 300, 300 ) },
//     { name: 'b', position: new THREE.Vector3( 300, 400, 300 ) },
//     { name: 'c', position: new THREE.Vector3( 100, 100, -100 ) },
//     { name: 'd', position: new THREE.Vector3( -300, -200, -300 ) },
//     { name: 'e', position: new THREE.Vector3( -400, 400, -200 ) },
//     { name: 'f', position: new THREE.Vector3( 500, -300, -500 ) },
// ];
// const locatorSphereGeometry = new THREE.SphereGeometry(16.5, 6, 3);
// locatorSphereGeometry.deleteAttribute( 'uv' );
// const locatorSphereMaterial = new THREE.PointsMaterial({
//     map: pinTexture,
//     color: "rgb(210, 43, 43)",
//     transparent: true,
//     size: 2,
//     alphaMap: pinTexture,
// });
// const particleSystem = new THREE.Points(locatorSphereGeometry, locatorSphereMaterial);
// particleSystem.name = "particleSystem";
// particleSystem.rotation.z = 1;
// particleSystem.rotation.y = 1.2;
// scene.add(particleSystem)

//Update
window.addEventListener("resize", () => {
  // Update sizes

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
function animate() {
  mars.rotation.y += Math.PI * (1 / 2048);
  //   particleSystem.rotation.y += Math.PI * (1/2048);
  northPole.lookAt(camera.position);
  southPole.lookAt(camera.position);
  galeCrater.lookAt(camera.position);
  jezeroCrater.lookAt(camera.position);
  olympusMons.lookAt(camera.position);
  miyamotoCrater.lookAt(camera.position);
  eddieCrater.lookAt(camera.position);
  keplerCrater.lookAt(camera.position);
  mawrthVallis.lookAt(camera.position);


  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
