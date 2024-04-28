import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import Stats from "three/addons/libs/stats.module.js"
import { GUI } from "dat.gui"

// Status GUI for visualizing productivity
const stats = new Stats();
document.body.appendChild(stats.dom)

// Init Scene
const scene = new THREE.Scene()

// Init render
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Init camera
const camera = new THREE.PerspectiveCamera(75,
  window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5
new OrbitControls(camera, renderer.domElement)

// Add geometry to the scene
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Add GUI control for geometry and camera
const dataGui = new GUI();

const cubeFolder = dataGui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);

const cameraFolder = dataGui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 1, 10);

// Update camera and render if window size changed
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Init and launch screen refresh loop
function animate() {
  requestAnimationFrame(animate)

  //cube.rotation.x += 0.01
  //cube.rotation.y += 0.01

  renderer.render(scene, camera)

  /*
  stats.begin();

  (async () => {
    // Do something before delay
    console.log('before delay');

    await new Promise(f => setTimeout(f, 10000));

    // Do something after
    console.log('after delay');
  })();

  stats.end();
  */

  stats.update()
};
animate()