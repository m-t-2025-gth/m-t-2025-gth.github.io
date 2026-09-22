import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("model-container");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000,
);

camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);

scene.add(directionalLight);

let model = null;

const loader = new GLTFLoader();

loader.load(
  "/assets/models/mtee_logo.glb",

  function (gltf) {
    model = gltf.scene;

    scene.add(model);

    const box = new THREE.Box3().setFromObject(model);

    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    model.position.x -= center.x;
    model.position.y -= center.y;
    model.position.z -= center.z;

    const maxSize = Math.max(size.x, size.y, size.z);
    const scale = 3 / maxSize;

    model.scale.setScalar(scale);

    model.rotation.set(0, Math.PI, 90);
  },

  function (progress) {
    console.log("Loading:", (progress.loaded / progress.total) * 100 + "%");
  },

  function (error) {
    console.error("GLBの読み込みに失敗しました。", error);
  },
);

window.addEventListener("resize", function () {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

function animate() {
  requestAnimationFrame(animate);

  if (model !== null) {
    model.rotation.x = Math.PI * -0.5;
    model.rotation.z += 0.005;
  }

  renderer.render(scene, camera);
}

animate();
