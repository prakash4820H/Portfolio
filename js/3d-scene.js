// 3D animation for portfolio using Three.js
let scene, camera, renderer, cube;
let targetRotation = { x: 0, y: 0 };
let mouseDown = false;
let lastMousePosition = { x: 0, y: 0 };
let scrollY = 0;
let lastScrollY = 0;
let windowHeight = 0;
let animationFrame = null;
let isAnimating = false;
let startTime = null;
let isInitializing = false;

// Initialize the scene when the page loads
window.addEventListener("load", function () {
  console.log("Window loaded, initializing Three.js");

  // Prevent multiple initializations
  if (isInitializing) return;
  isInitializing = true;

  // Try to initialize Three.js
  if (typeof THREE !== "undefined") {
    init3DScene();
  } else {
    console.error("THREE.js not loaded, trying to load it");
    loadThreeJs();
  }
});

function init3DScene() {
  // Prevent double initialization
  if (scene && renderer) {
    console.log("3D scene already initialized");
    return;
  }

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

  // Clear any existing content in the container
  container.innerHTML = "";
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

  // Initial position - center of screen
  cube.position.set(0, 0, 0);

  // Get initial scroll position
  scrollY = window.pageYOffset || document.documentElement.scrollTop;
  lastScrollY = scrollY;
  windowHeight = window.innerHeight;

  // Set up event listeners
  setupEventListeners(container);

  // Reset animation flags
  isAnimating = false;

  // Start animation after a short delay to avoid initial glitch
  setTimeout(function () {
    startTime = Date.now();
    startAnimation();

    // Hide the loader when scene is initialized
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("loader-hidden");
    }
  }, 50);

  console.log("3D scene successfully initialized");
  isInitializing = false;
}

function setupEventListeners(container) {
  // Mouse/touch events for interactivity
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("touchstart", onTouchStart, { passive: false });
  document.addEventListener("touchend", onMouseUp);
  document.addEventListener("touchmove", onTouchMove, { passive: false });

  // Add scroll event listener
  window.addEventListener("scroll", onScroll, { passive: true });

  // Handle window resize
  window.addEventListener("resize", onWindowResize);

  // Handle page visibility changes
  document.addEventListener("visibilitychange", onVisibilityChange);
}

function onVisibilityChange() {
  if (document.hidden) {
    stopAnimation();
  } else {
    // Reset start time when becoming visible
    startTime = Date.now();
    startAnimation();
  }
}

function startAnimation() {
  if (!isAnimating) {
    isAnimating = true;
    animate();
    console.log("Animation started");
  }
}

function stopAnimation() {
  if (isAnimating) {
    isAnimating = false;
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    console.log("Animation stopped");
  }
}

function onScroll() {
  // Update scroll position
  lastScrollY = scrollY;
  scrollY = window.pageYOffset || document.documentElement.scrollTop;
}

function onWindowResize() {
  if (!camera || !renderer) return;

  // Update camera and renderer on resize
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  windowHeight = window.innerHeight;
}

function onMouseDown(event) {
  // Only handle left mouse button
  if (event.button !== undefined && event.button !== 0) return;

  mouseDown = true;
  lastMousePosition = {
    x:
      event.clientX ||
      (event.touches && event.touches[0] ? event.touches[0].clientX : 0),
    y:
      event.clientY ||
      (event.touches && event.touches[0] ? event.touches[0].clientY : 0),
  };

  // Don't prevent default here to allow other interactions
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

  // Adjust rotation based on mouse movement
  targetRotation.y += deltaMove.x * 0.01;
  targetRotation.x += deltaMove.y * 0.01;

  lastMousePosition = { x, y };
}

function onTouchStart(event) {
  if (event.touches.length === 1) {
    // Only prevent default for touches on the 3D container
    if (event.target.closest("#3d-container")) {
      event.preventDefault();
    }

    mouseDown = true;
    lastMousePosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }
}

function onTouchMove(event) {
  if (!mouseDown || event.touches.length !== 1) return;

  // Only prevent default for touches on the 3D container
  if (event.target.closest("#3d-container")) {
    event.preventDefault();
  }

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

function animate() {
  // Request next animation frame first to ensure continuous animation
  animationFrame = requestAnimationFrame(animate);

  // Ensure we have all the necessary components
  if (!cube || !renderer || !scene || !camera) {
    console.warn("3D elements not fully initialized");
    return;
  }

  // Get the current time for animations (in seconds)
  const now = Date.now();
  const elapsedMilliseconds = startTime ? now - startTime : 0;
  const time = now * 0.001;

  // Apply smooth start effect - gradually increase animation speed during first second
  // This prevents the initial glitchy double rotation
  const startupProgress = Math.min(elapsedMilliseconds / 1000, 1);
  const easedStartup = startupProgress * startupProgress; // Quadratic easing

  // ==================== BASE ROTATION ====================
  // Apply base rotation with smooth startup
  const baseRotationX = 0.005 * easedStartup;
  const baseRotationY = 0.007 * easedStartup;
  cube.rotation.x += baseRotationX;
  cube.rotation.y += baseRotationY;

  // ==================== USER INTERACTION ROTATION ====================
  // Apply any user interaction rotation on top of the base rotation
  const interactionFactor = 0.05 * easedStartup;
  cube.rotation.x += (targetRotation.x - cube.rotation.x) * interactionFactor;
  cube.rotation.y += (targetRotation.y - cube.rotation.y) * interactionFactor;

  // ==================== SCROLL EFFECTS ====================
  // Calculate scroll effects - make it dramatic enough to be noticeable
  // This maps scroll position to 0-1 range based on viewport height
  const scrollProgress = Math.min(scrollY / (windowHeight * 2), 1);

  // Calculate the scroll delta (how fast user is scrolling)
  const scrollDelta = (scrollY - lastScrollY) * 0.01;

  // 1. Position effect: Maintain centered Y position but add wave effect
  const waveOffset = Math.sin(time * 0.5) * 0.2 * easedStartup;
  cube.position.y = waveOffset;

  // 2. Rotation boost based on scroll position and scroll speed
  const rotationBoost =
    1 + (scrollProgress * 0.5 + Math.abs(scrollDelta)) * easedStartup;

  // 3. Scale effect based on scroll - subtle zoom out as you scroll down
  const baseScale = 1.0;
  const scrollScaleFactor = Math.max(1 - scrollProgress * 0.1, 0.9);
  cube.scale.set(
    baseScale * scrollScaleFactor,
    baseScale * scrollScaleFactor,
    baseScale * scrollScaleFactor
  );

  // ==================== ORBITING OBJECTS ANIMATION ====================
  if (cube.children) {
    cube.children.forEach((child, index) => {
      if (child.userData && child.userData.orbit) {
        const orbit = child.userData.orbit;

        // Orbit speed increases with scroll (apply smooth startup)
        orbit.angle += orbit.speed * rotationBoost * easedStartup;

        // Update position in circular path
        child.position.x = Math.cos(orbit.angle) * orbit.radius;
        child.position.y = Math.sin(orbit.angle) * orbit.radius + orbit.yOffset;

        // Add vertical motion based on time (apply smooth startup)
        child.position.y += Math.sin(time * 2 + index) * 0.1 * easedStartup;

        // Each small object rotates around its own axis (apply smooth startup)
        child.rotation.x += 0.02 * rotationBoost * easedStartup;
        child.rotation.z += 0.02 * rotationBoost * easedStartup;

        // Add extra rotation when scrolling fast
        if (Math.abs(scrollDelta) > 0.1) {
          child.rotation.y += scrollDelta * 0.1 * easedStartup;
        }
      }

      // Particle system animation (usually the last child)
      if (child instanceof THREE.Points) {
        // Rotate based on time for smooth motion (apply smooth startup)
        child.rotation.y = time * 0.1 * easedStartup;
        child.rotation.x = time * 0.05 * easedStartup;

        // When scrolling, add extra rotation to particles
        if (Math.abs(scrollDelta) > 0.1) {
          child.rotation.y += scrollDelta * 0.05 * easedStartup;
        }
      }
    });
  }

  // Render the scene
  renderer.render(scene, camera);
}

// Load Three.js dynamically if it's not available
function loadThreeJs() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  script.onload = function () {
    console.log("THREE.js loaded dynamically");
    setTimeout(init3DScene, 100);
  };
  script.onerror = function () {
    console.error("Failed to load THREE.js");
  };
  document.head.appendChild(script);
}
