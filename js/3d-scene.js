// 3D animation for portfolio using Three.js
let scene, camera, renderer, cube;
let targetRotation = { x: 0, y: 0 };
let mouseDown = false;
let lastMousePosition = { x: 0, y: 0 };
let scrollY = 0;
let windowHeight = 0;
let animationFrame = null;

function init3DScene() {
  // Create scene container
  const container = document.getElementById("3d-container");
  if (!container) {
    console.error("3D container not found");
    return;
  }

  console.log("Initializing 3D scene");

  // Set up scene
  scene = new THREE.Scene();

  // Set up camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Set up renderer with better quality settings
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  // Add point light for more dynamic lighting
  const pointLight = new THREE.PointLight(0x2563eb, 1, 10);
  pointLight.position.set(-2, 1, 3);
  scene.add(pointLight);

  // Create geometry - use dodecahedron for more interesting shape
  const geometry = new THREE.DodecahedronGeometry(1.5, 0);

  // Create materials with different colors for a more interesting look
  const materials = [
    new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0x1034a6,
      emissiveIntensity: 0.2,
    }), // Primary blue with glow
    new THREE.MeshStandardMaterial({
      color: 0x1e40af,
      metalness: 0.4,
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

  // Add particle system for background effect
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 150;
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Create particles in a sphere around the main object
    const radius = 8 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i + 2] = radius * Math.cos(phi);
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x2563eb,
    transparent: true,
    opacity: 0.8,
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  group.add(particleSystem);

  // Add some smaller shapes orbiting around
  for (let i = 0; i < 5; i++) {
    const smallGeometry = new THREE.TetrahedronGeometry(0.3, 0);
    const smallShape = new THREE.Mesh(smallGeometry, materials[1]);

    // Position small shapes in orbit
    const angle = (i / 5) * Math.PI * 2;
    const radius = 2.5;
    smallShape.position.x = Math.cos(angle) * radius;
    smallShape.position.y = Math.sin(angle) * radius;

    // Store original position for animation
    smallShape.userData = {
      orbit: {
        angle: angle,
        radius: radius,
        speed: 0.005 + i * 0.002,
        yOffset: i * 0.1,
        verticalSpeed: 0.002 + Math.random() * 0.003,
      },
    };

    group.add(smallShape);
  }

  // Add group to scene
  scene.add(group);
  cube = group; // Use existing cube variable to control rotation

  // Position the 3D object
  cube.position.set(0, 0, 0);

  // Make container full-screen and fixed position
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.zIndex = "-1"; // Behind content
  container.style.pointerEvents = "auto"; // Enable mouse events

  // Add event listeners for interaction - add them to the window to ensure they work
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchstart", onTouchStart, { passive: false });
  window.addEventListener("touchend", onMouseUp);
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("scroll", onScroll);

  // Store window height
  windowHeight = window.innerHeight;

  // Handle resize
  window.addEventListener("resize", onWindowResize);

  // Start animation
  animate();

  console.log("3D scene initialized");
}

function onScroll() {
  scrollY = window.pageYOffset || document.documentElement.scrollTop;
  console.log("Scroll position:", scrollY);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  windowHeight = window.innerHeight;
}

function onMouseDown(event) {
  mouseDown = true;
  lastMousePosition = {
    x: event.clientX || event.touches[0].clientX,
    y: event.clientY || event.touches[0].clientY,
  };
  console.log("Mouse down at:", lastMousePosition);
}

function onMouseUp() {
  mouseDown = false;
}

function onMouseMove(event) {
  if (!mouseDown) return;

  const x =
    event.clientX ||
    (event.touches && event.touches[0]
      ? event.touches[0].clientX
      : lastMousePosition.x);
  const y =
    event.clientY ||
    (event.touches && event.touches[0]
      ? event.touches[0].clientY
      : lastMousePosition.y);

  const deltaMove = {
    x: x - lastMousePosition.x,
    y: y - lastMousePosition.y,
  };

  targetRotation.y += deltaMove.x * 0.01;
  targetRotation.x += deltaMove.y * 0.01;

  lastMousePosition = { x, y };

  console.log("Dragging, new rotation target:", targetRotation);
}

function onTouchStart(event) {
  event.preventDefault();
  if (event.touches.length === 1) {
    mouseDown = true;
    lastMousePosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
    console.log("Touch start at:", lastMousePosition);
  }
}

function onTouchMove(event) {
  if (!mouseDown || event.touches.length !== 1) return;

  event.preventDefault();

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

  console.log("Touch move, new rotation target:", targetRotation);
}

function animate() {
  // Always ensure we keep animating with requestAnimationFrame
  animationFrame = requestAnimationFrame(animate);

  // Only render if cube, renderer, scene, and camera exist
  if (!cube || !renderer || !scene || !camera) {
    console.warn("3D elements not fully initialized, retrying animation frame");
    return;
  }

  // Always maintain continuous rotation, even without user interaction
  const autoRotationX = 0.003;
  const autoRotationY = 0.005;

  // Calculate scroll position effect - add 1 to ensure movement even at top
  const scrollFactor = scrollY / windowHeight + 1;

  // Basic continuous rotation regardless of other factors
  cube.rotation.x += autoRotationX;
  cube.rotation.y += autoRotationY;

  // Add user interaction rotation (smooth towards target)
  cube.rotation.x += (targetRotation.x - cube.rotation.x) * 0.05;
  cube.rotation.y += (targetRotation.y - cube.rotation.y) * 0.05;

  // Scroll-based effects
  // Move the cube based on scroll position
  cube.position.y = -scrollY * 0.001;

  // Increase rotation speed based on scroll
  const scrollRotationFactor = Math.min(1 + scrollFactor * 0.05, 1.5);

  // Scale based on scroll - subtle effect
  const baseScale = 1.0;
  const scrollScaleFactor = Math.max(1 - scrollY * 0.0005, 0.8);
  cube.scale.set(
    baseScale * scrollScaleFactor,
    baseScale * scrollScaleFactor,
    baseScale * scrollScaleFactor
  );

  // Animate orbiting small shapes
  if (cube.children) {
    cube.children.forEach((child, index) => {
      if (child.userData && child.userData.orbit) {
        const orbit = child.userData.orbit;

        // Adjust orbit speed based on scroll
        orbit.angle += orbit.speed * scrollRotationFactor;

        // Update position in circular path
        child.position.x = Math.cos(orbit.angle) * orbit.radius;
        child.position.y = Math.sin(orbit.angle) * orbit.radius + orbit.yOffset;

        // Add vertical motion with scroll influence
        child.position.y +=
          Math.sin(Date.now() * orbit.verticalSpeed) *
          (0.1 + scrollFactor * 0.1);

        // Rotate the small shapes
        child.rotation.x += 0.02 * scrollRotationFactor;
        child.rotation.z += 0.02 * scrollRotationFactor;
      }

      // If it's the particle system (typically the last child)
      if (child instanceof THREE.Points) {
        // Rotate the particle system slowly but continuously
        child.rotation.y += 0.001 * scrollRotationFactor;
        child.rotation.x -= 0.0005 * scrollRotationFactor;
      }
    });
  }

  renderer.render(scene, camera);
}

// Initialize when the DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThreeJS);
} else {
  // If DOMContentLoaded has already fired, initialize immediately
  initThreeJS();
}

function initThreeJS() {
  console.log("DOM content loaded, waiting to initialize THREE.js");

  // Check if THREE is available
  if (typeof THREE === "undefined") {
    console.error("THREE.js not loaded! Attempting to load via script tag");

    // Try to load Three.js dynamically if it's not already loaded
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      console.log("THREE.js loaded dynamically, initializing scene");
      init3DScene();
    };
    script.onerror = () => {
      console.error("Failed to load THREE.js dynamically");
    };
    document.head.appendChild(script);
  } else {
    console.log("THREE.js already loaded, initializing scene");
    // Short delay to ensure everything is ready
    setTimeout(init3DScene, 300);
  }
}

// Handle page visibility changes to pause/resume animation
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Page is hidden, pause animation to save resources
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  } else {
    // Page is visible again, resume animation if it was paused
    if (!animationFrame) {
      animate();
    }
  }
});
