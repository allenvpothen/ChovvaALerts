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
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


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


let INTERSECTED = mars;
// camera.position.set(INTERSECTED.position)

camera.zoom = 1;

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
northPole.name = "North Pole";

const southPole = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(southPole);
southPole.position.set(0, -18, 0);
southPole.scale.set(1.5, 1.5, 1.5);
southPole.name = "South Pole";


const galeCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(galeCrater);
galeCrater.position.set(-17, -3, 0);
galeCrater.scale.set(1.5, 1.5, 1.5);
galeCrater.name = "Gale Crater";


const jezeroCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(jezeroCrater);
jezeroCrater.position.set(17, 3, 0);
jezeroCrater.scale.set(1.5, 1.5, 1.5);
jezeroCrater.name = "Jezero Crater";


const olympusMons = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(olympusMons);
olympusMons.position.set(9, -3, 14);
olympusMons.scale.set(1.5, 1.5, 1.5);
olympusMons.name = "Olympus Mons";



const miyamotoCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(miyamotoCrater);
miyamotoCrater.position.set(-2, -1, 17);
miyamotoCrater.scale.set(1.5, 1.5, 1.5);
miyamotoCrater.name = "Miyamoto Crater";


const eddieCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(eddieCrater);
eddieCrater.position.set(2, -2, -17);
eddieCrater.scale.set(1.5, 1.5, 1.5);
eddieCrater.name = "Eddie Crater";


const keplerCrater = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(keplerCrater);
keplerCrater.position.set(-4, -5, -14);
keplerCrater.scale.set(1.5, 1.5, 1.5);
keplerCrater.name = "Kepler Crater";


const mawrthVallis = new THREE.Mesh(locatorGeometry, locatorMaterial);
mars.add(mawrthVallis);
mawrthVallis.position.set(-15, 8, -2);
mawrthVallis.scale.set(1.5, 1.5, 1.5);
mawrthVallis.name = "Mawarth Vallis";


//Clicks
let site = INTERSECTED.name;

document.addEventListener("click", clicked);
function clicked(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(mars.children, false);

  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED)
    // camera.autoRotate
        // document.querySelector("canvas").style.left = "-20rem"
        // camera.position.x = 15;
        
      INTERSECTED = intersects[0].object;
    }
  } else {
    if (INTERSECTED)
    INTERSECTED = INTERSECTED;
  }
}

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
//   camera.lookAt(INTERSECTED.position)
// camera.position.set(INTERSECTED.position)
camera.updateProjectionMatrix()
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


  