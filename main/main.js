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
        controls.maxDistance = 500000;

// controls.enableDamping = true;

//Lights
const ambientLight = new THREE.AmbientLight( 0x4f4738);
scene.add( ambientLight );
const directionalLight = new THREE.DirectionalLight( 0xdec9a4,  2);
directionalLight.position.set(-1,0.3,0.7);
scene.add( directionalLight );
// camera.add(directionalLight);
scene.add(camera)


//mars
const marsGeometry = new THREE.SphereGeometry(16, 80, 40);
const marsMaterial = new THREE.MeshStandardMaterial(
    {
        map: marsBaseColor,
        normalMap: marsNormal
    }
);

const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

//locators
// const locatorGeometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 
// const locatorMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
// const locator1 = new THREE.Mesh( locatorGeometry, locatorMaterial ); 
// scene.add( locator1 );
// locator1.position.set(16,5,0)
// locator1.scale.set(0.5,0.5,0.5)
// locator1.rotateZ(Math.PI/2);

//Locator 2.0
const locatorSphereGeometry = new THREE.SphereGeometry(16.5, 6, 3);
locatorSphereGeometry.deleteAttribute( 'uv' );
const locatorSphereMaterial = new THREE.PointsMaterial({
    map: pinTexture,
    color: "rgb(210, 43, 43)",
    transparent: true,
    size: 2,
    alphaMap: pinTexture,
});
const particleSystem = new THREE.Points(locatorSphereGeometry, locatorSphereMaterial);
particleSystem.name = "particleSystem";
particleSystem.rotation.z = 1;
particleSystem.rotation.y = 1.2;
scene.add(particleSystem)





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
  mars.rotation.y += Math.PI * (1/2048);
  particleSystem.rotation.y += Math.PI * (1/2048);

 //   locator1.lookAt(mars.position)
//   locator1.position.set(Math.sin())
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
