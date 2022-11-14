// Variables
let container, camera, renderer, scene, car;

// Constants
const LEFT = 37;  // Left arrow key
const UP = 38; // Up arrow key
const RIGHT = 39; // Right arrow key
const DOWN = 40; // Down arrow key

// Initialize scene
function init() {
  container = document.querySelector(".scene");

  // Create the scene
  scene = new THREE.Scene();

  // Widow sizes
  const sizes = {
    width: container.clientWidth, // Screen width
    height: container.clientHeight  // Screen height
  }

  // Camera setup arguments
  const fov = 75; // Field of view (higher fov creates a wider camera)
  const aspect = sizes.width / sizes.height;
  const near = 0.1;
  const far = 1000000;

  // Setup the camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 1070);


  // Add light
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Load our car model
  let loader = new THREE.GLTFLoader();
  loader.load("./models/car/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    car = gltf.scene.children[0];
    animate();
  });
}

// Animate (rotate)
function animate() {
  requestAnimationFrame(animate);
  car.rotation.z += 0.015;
  renderer.render(scene, camera);
}

init();

// Make window responsive
function onWindowResize() {
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Move using arrow keys
document.onkeydown = function(e) {
  switch(e.keyCode) {
    case LEFT:
      scene.position.x -= 25;
      break;
    case RIGHT:
      scene.position.x += 25;
      break;
    case UP:
      scene.position.z += 25;
      break;
    case DOWN:
      scene.position.z -= 25;
      break;
  }
}

window.addEventListener("resize", onWindowResize);
