// 3D animation for portfolio using Three.js
let scene, camera, renderer, cube;
let targetRotation = { x: 0, y: 0 };
let mouseDown = false;
let lastMousePosition = { x: 0, y: 0 };

function init3DScene() {
  // Create scene container
  const container = document.getElementById("3d-container");
  if (!container) return;

  // Set up scene
  scene = new THREE.Scene();

  // Set up camera
  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Set up renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  // Create geometry - use dodecahedron for more interesting shape
  const geometry = new THREE.DodecahedronGeometry(1.5, 0);

  // Create materials with different colors for a more interesting look
  const materials = [
    new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.3,
      roughness: 0.4,
    }), // Primary blue
    new THREE.MeshStandardMaterial({
      color: 0x1e40af,
      metalness: 0.3,
      roughness: 0.4,
    }), // Darker blue
  ];

  // Create group to hold our shapes
  const group = new THREE.Group();

  // Create main shape
  const mainShape = new THREE.Mesh(geometry, materials[0]);
  group.add(mainShape);

  // Add wireframe for effect
  const wireframe = new THREE.WireframeGeometry(geometry);
  const line = new THREE.LineSegments(wireframe);
  line.material.color.setHex(0xffffff);
  line.material.transparent = true;
  line.material.opacity = 0.2;
  group.add(line);

  // Add some smaller shapes orbiting around
  for (let i = 0; i < 3; i++) {
    const smallGeometry = new THREE.TetrahedronGeometry(0.3, 0);
    const smallShape = new THREE.Mesh(smallGeometry, materials[1]);

    // Position small shapes in orbit
    const angle = (i / 3) * Math.PI * 2;
    const radius = 2.5;
    smallShape.position.x = Math.cos(angle) * radius;
    smallShape.position.y = Math.sin(angle) * radius;

    // Store original position for animation
    smallShape.userData = {
      orbit: {
        angle: angle,
        radius: radius,
        speed: 0.01 + i * 0.005,
        yOffset: i * 0.2,
      },
    };

    group.add(smallShape);
  }

  // Add group to scene
  scene.add(group);
  cube = group; // Use existing cube variable to control rotation

  // Add event listeners for interaction
  container.addEventListener("mousedown", onMouseDown);
  container.addEventListener("mouseup", onMouseUp);
  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("touchstart", onTouchStart);
  container.addEventListener("touchend", onMouseUp);
  container.addEventListener("touchmove", onTouchMove);

  // Handle resize
  window.addEventListener("resize", onWindowResize);

  // Start animation
  animate();
}

function onWindowResize() {
  const container = document.getElementById("3d-container");
  if (!container || !camera || !renderer) return;

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function onMouseDown(event) {
  mouseDown = true;
  lastMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
}

function onMouseUp() {
  mouseDown = false;
}

function onMouseMove(event) {
  if (!mouseDown) return;

  const deltaMove = {
    x: event.clientX - lastMousePosition.x,
    y: event.clientY - lastMousePosition.y,
  };

  targetRotation.y += deltaMove.x * 0.01;
  targetRotation.x += deltaMove.y * 0.01;

  lastMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
}

function onTouchStart(event) {
  if (event.touches.length === 1) {
    mouseDown = true;
    lastMousePosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }
}

function onTouchMove(event) {
  if (event.touches.length === 1) {
    const deltaMove = {
      x: event.touches[0].clientX - lastMousePosition.x,
      y: event.touches[0].clientY - lastMousePosition.y,
    };

    targetRotation.y += deltaMove.x * 0.01;
    targetRotation.x += deltaMove.y * 0.01;

    lastMousePosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Smoothly rotate cube towards target rotation
  if (cube) {
    cube.rotation.x += (targetRotation.x - cube.rotation.x) * 0.1;
    cube.rotation.y += (targetRotation.y - cube.rotation.y) * 0.1;

    // Add subtle automatic rotation
    cube.rotation.x += 0.003;
    cube.rotation.y += 0.005;

    // Animate orbiting small shapes
    if (cube.children) {
      cube.children.forEach((child) => {
        if (child.userData && child.userData.orbit) {
          const orbit = child.userData.orbit;
          orbit.angle += orbit.speed;

          // Update position in circular path
          child.position.x = Math.cos(orbit.angle) * orbit.radius;
          child.position.y =
            Math.sin(orbit.angle) * orbit.radius + orbit.yOffset;

          // Add some y-axis wobble
          child.position.y += Math.sin(Date.now() * 0.002) * 0.1;

          // Rotate the small shapes
          child.rotation.x += 0.02;
          child.rotation.z += 0.02;
        }
      });
    }
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// Initialize when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // We'll call init3DScene after Three.js is loaded
  if (typeof THREE !== "undefined") {
    init3DScene();
  }
});
