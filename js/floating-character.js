document.addEventListener("DOMContentLoaded", function () {
  console.log("Initializing floating blob with expressions");

  // Create the character element
  const character = document.createElement("div");
  character.id = "floating-blob";

  // Style the character element with a cuter color
  Object.assign(character.style, {
    position: "fixed",
    width: "130px",
    height: "130px",
    borderRadius: "55%", // Slightly more egg-shaped for cuteness
    background: "radial-gradient(circle at 30% 25%, #c8fbf2, #a5f3e9, #8de2d9)", // Enhanced gradient
    boxShadow:
      "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -10px 15px rgba(255, 255, 255, 0.7), inset 5px -5px 15px rgba(0, 0, 0, 0.05)",
    zIndex: "9999",
    top: "150px",
    left: "100px",
    pointerEvents: "none",
    transition:
      "transform 0.1s ease-out, background 0.5s ease, filter 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    filter: "drop-shadow(0 8px 20px rgba(141, 226, 217, 0.3))",
  });

  // Create the face
  const face = document.createElement("div");
  face.className = "blob-face";
  Object.assign(face.style, {
    position: "relative",
    width: "100%",
    height: "100%",
  });

  // Create eyes container for better positioning
  const eyesContainer = document.createElement("div");
  eyesContainer.className = "eyes-container";
  Object.assign(eyesContainer.style, {
    position: "absolute",
    width: "100%",
    top: "35px", // Moved down slightly for cuter look
    display: "flex",
    justifyContent: "space-between",
    padding: "0 30px", // Wider spacing between eyes
    boxSizing: "border-box",
  });

  // Left eye - rounder and cuter
  const leftEye = document.createElement("div");
  leftEye.className = "blob-eye left";
  Object.assign(leftEye.style, {
    width: "24px", // Even smaller for cuteness
    height: "24px", // Even smaller for cuteness
    backgroundColor: "white", // White background instead of body color
    border: "3px solid #333", // Darker but thinner border
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
  });

  // Right eye - rounder and cuter
  const rightEye = document.createElement("div");
  rightEye.className = "blob-eye right";
  Object.assign(rightEye.style, {
    width: "24px", // Even smaller for cuteness
    height: "24px", // Even smaller for cuteness
    backgroundColor: "white", // White background instead of body color
    border: "3px solid #333", // Darker but thinner border
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
  });

  // Pupils - rounder and cuter
  const leftPupil = document.createElement("div");
  leftPupil.className = "blob-pupil";
  Object.assign(leftPupil.style, {
    position: "absolute",
    width: "9px", // Smaller for cuteness
    height: "9px", // More round
    backgroundColor: "#333", // Softer than pure black
    borderRadius: "50%",
    top: "8px",
    left: "8px",
    transition: "all 0.2s ease",
  });

  const rightPupil = document.createElement("div");
  rightPupil.className = "blob-pupil";
  Object.assign(rightPupil.style, {
    position: "absolute",
    width: "9px", // Smaller for cuteness
    height: "9px", // More round
    backgroundColor: "#333", // Softer than pure black
    borderRadius: "50%",
    top: "8px",
    left: "8px",
    transition: "all 0.2s ease",
  });

  // Add cute shines to eyes
  const leftShine = document.createElement("div");
  leftShine.className = "eye-shine";
  Object.assign(leftShine.style, {
    position: "absolute",
    width: "4px",
    height: "4px",
    backgroundColor: "white",
    borderRadius: "50%",
    top: "6px",
    left: "12px",
    zIndex: "1",
  });

  const rightShine = document.createElement("div");
  rightShine.className = "eye-shine";
  Object.assign(rightShine.style, {
    position: "absolute",
    width: "4px",
    height: "4px",
    backgroundColor: "white",
    borderRadius: "50%",
    top: "6px",
    left: "12px",
    zIndex: "1",
  });

  // Mouth container for different expressions
  const mouthContainer = document.createElement("div");
  mouthContainer.className = "mouth-container";
  Object.assign(mouthContainer.style, {
    position: "absolute",
    width: "100%",
    bottom: "40px", // Slightly higher for a cuter face
    display: "flex",
    justifyContent: "center",
  });

  // Create mouth element that will change based on expression
  const mouth = document.createElement("div");
  mouth.className = "blob-mouth";

  // Add cute cheeks
  const leftCheek = document.createElement("div");
  leftCheek.className = "blob-cheek left";
  Object.assign(leftCheek.style, {
    position: "absolute",
    width: "15px",
    height: "8px",
    backgroundColor: "#ff9eb8", // Cute pink blush
    borderRadius: "50%",
    opacity: "0.6",
    bottom: "45px",
    left: "25px",
    transform: "rotate(10deg)",
  });

  const rightCheek = document.createElement("div");
  rightCheek.className = "blob-cheek right";
  Object.assign(rightCheek.style, {
    position: "absolute",
    width: "15px",
    height: "8px",
    backgroundColor: "#ff9eb8", // Cute pink blush
    borderRadius: "50%",
    opacity: "0.6",
    bottom: "45px",
    right: "25px",
    transform: "rotate(-10deg)",
  });

  // Eyebrows for extra expressiveness
  const leftEyebrow = document.createElement("div");
  leftEyebrow.className = "blob-eyebrow left";
  Object.assign(leftEyebrow.style, {
    position: "absolute",
    width: "20px",
    height: "3px",
    backgroundColor: "#333", // Darker, matching the eyes
    top: "20px",
    left: "30px",
    borderRadius: "3px",
    transform: "rotate(0deg)",
    transformOrigin: "left center",
    transition: "all 0.3s ease",
    opacity: "0",
  });

  const rightEyebrow = document.createElement("div");
  rightEyebrow.className = "blob-eyebrow right";
  Object.assign(rightEyebrow.style, {
    position: "absolute",
    width: "20px",
    height: "3px",
    backgroundColor: "#333", // Darker, matching the eyes
    top: "20px",
    right: "30px",
    borderRadius: "3px",
    transform: "rotate(0deg)",
    transformOrigin: "right center",
    transition: "all 0.3s ease",
    opacity: "0",
  });

  // Assemble the character
  leftEye.appendChild(leftPupil);
  leftEye.appendChild(leftShine);
  rightEye.appendChild(rightPupil);
  rightEye.appendChild(rightShine);
  eyesContainer.appendChild(leftEye);
  eyesContainer.appendChild(rightEye);
  mouthContainer.appendChild(mouth);
  face.appendChild(eyesContainer);
  face.appendChild(leftEyebrow);
  face.appendChild(rightEyebrow);
  face.appendChild(leftCheek);
  face.appendChild(rightCheek);
  face.appendChild(mouthContainer);
  character.appendChild(face);

  // Create speech bubble for chat functionality
  const speechBubble = document.createElement("div");
  speechBubble.className = "blob-speech-bubble";
  Object.assign(speechBubble.style, {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "12px 18px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.05)",
    maxWidth: "220px",
    fontFamily: "'Nunito', 'Segoe UI', Arial, sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    top: "-85px",
    left: "50%",
    transform: "translateX(-50%)",
    opacity: "0",
    transition: "opacity 0.3s ease, transform 0.2s ease",
    pointerEvents: "none",
    zIndex: "10000",
    textAlign: "center",
    lineHeight: "1.4",
    border: "2px solid #8de2d9",
  });

  // Create speech bubble arrow/tail
  const speechBubbleTail = document.createElement("div");
  Object.assign(speechBubbleTail.style, {
    position: "absolute",
    bottom: "-11px",
    left: "50%",
    marginLeft: "-10px",
    borderWidth: "10px 10px 0",
    borderStyle: "solid",
    borderColor: "white transparent transparent",
    filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1))",
    zIndex: "1",
  });

  speechBubble.appendChild(speechBubbleTail);
  character.appendChild(speechBubble);
  document.body.appendChild(character);

  // Variables for animation
  let mouseX = 0;
  let mouseY = 0;
  let characterX = parseInt(character.style.left, 10) || 100;
  let characterY = parseInt(character.style.top, 10) || 150;
  let scrollY = 0;
  let targetScrollY = 0;
  let clicked = false;
  let hovered = false;
  let isFollowingCursor = false;
  let positionRelativeToViewport = true; // New flag to control positioning behavior

  // Variables for independent movement
  let isExploring = false;
  let exploreTimer = null;
  let exploreTargetX = characterX;
  let exploreTargetY = characterY;
  let lastExplorationChange = 0;

  // Variables to track state transitions
  let transitionTimer = null;
  let isTransitioning = false;
  let lastMode = "idle"; // "idle", "exploring", "following"
  let transitionStartX = 0;
  let transitionStartY = 0;
  let transitionTargetX = 0;
  let transitionTargetY = 0;
  let transitionProgress = 0;
  let transitionDuration = 1000; // ms

  // Variables for delayed eye movement
  let targetPupilX = 8;
  let targetPupilY = 8;
  let currentPupilX = 8;
  let currentPupilY = 8;
  let eyeMovementDelay = 0.07; // Lower values = faster eye movement

  // Variables for speech/chat functionality
  let isSpeaking = false;
  let speechTimer = null;
  let lastVisitedSection = "";

  // Section-specific messages
  const sectionMessages = {
    about: [
      "That's me! I'm a web developer, game modder, and QA tester!",
      "I studied at KL University in India!",
      "I love creating websites and game mods!",
      "Want to know more about me?",
    ],
    skills: [
      "Check out my skills! Pretty cool, right?",
      "I'm great at frontend development!",
      "I use AI tools to boost my coding efficiency!",
      "I've worked with React, Next.js, and more!",
    ],
    experience: [
      "Here's my work experience!",
      "I've worked on WorldBox modding!",
      "I was a QA tester for WorldBox!",
      "I had a data analytics internship too!",
    ],
    projects: [
      "These are my favorite projects!",
      "Check out my e-commerce projects!",
      "I made a unit mod for WorldBox!",
      "Want to see more? Check my GitHub!",
    ],
    certifications: [
      "I've got certifications in AWS and Azure!",
      "These certifications show my technical knowledge!",
      "I'm continuously learning new skills!",
    ],
    blog: [
      "Read my technical blog posts!",
      "I write about web development and more!",
      "Want to learn about e-commerce development?",
    ],
    contact: [
      "Want to get in touch? Contact me here!",
      "I'd love to hear from you!",
      "Send me a message, I'll reply soon!",
      "Let's connect and collaborate!",
    ],
  };

  // Greeting messages when the blob appears
  const greetings = [
    "Hi there! 👋",
    "Welcome to my site! ✨",
    "Hello! Nice to see you!",
    "Thanks for visiting! 😊",
    "Hey! Look around!",
  ];

  // Messages for when user has been inactive
  const idleMessages = [
    "Finding everything okay?",
    "Check out my projects!",
    "Feel free to explore!",
    "Need any help?",
    "Don't be shy, I don't bite!",
    "Like what you see?",
  ];

  // Messages for when user hovers near the blob
  const hoverMessages = [
    "Hello there!",
    "Oh! Hi!",
    "Need something?",
    "You found me!",
    "I'm here to help!",
    "Double-click to make me follow you!",
  ];

  // Messages for when in following mode
  const followingMessages = [
    "I'll follow you!",
    "Leading the way?",
    "Where are we going?",
    "I'm right behind you!",
    "This is fun!",
  ];

  // Double click detection
  let lastClickTime = 0;

  // Current expression
  let currentExpression = "happy";

  // List of expressions
  const expressions = [
    "happy",
    "surprised",
    "excited",
    "sleepy",
    "uwu", // Added a cute "uwu" expression
    "bouncy", // Added a cute bouncy expression
  ];

  // Cute color schemes for different moods - now with enhanced gradients
  const colorSchemes = {
    happy: "radial-gradient(circle at 30% 25%, #c8fbf2, #a5f3e9, #8de2d9)", // Mint/teal
    surprised: "radial-gradient(circle at 30% 25%, #fff0f3, #ffd6e0, #ffbed0)", // Light pink
    excited: "radial-gradient(circle at 30% 25%, #e9ffd8, #ccffa8, #b8f090)", // Light green
    sleepy: "radial-gradient(circle at 30% 25%, #efe5ff, #d3c5f8, #c4b2f5)", // Lavender
    uwu: "radial-gradient(circle at 30% 25%, #ffe5e7, #ffccd0, #ffb8bd)", // Soft coral
    bouncy: "radial-gradient(circle at 30% 25%, #d9f2ff, #b8e6ff, #a0d8ff)", // Sky blue
  };

  // Function to make the blob speak
  function speak(message, duration = 3000) {
    // Don't interrupt if already speaking, queue it up
    if (isSpeaking) {
      setTimeout(() => speak(message, duration), duration);
      return;
    }

    // Update speech bubble
    speechBubble.textContent = message;
    speechBubble.style.opacity = "1";

    // Match speech bubble border color to current mood
    let borderColor = "#8de2d9"; // Default color

    // Set border color based on current expression
    switch (currentExpression) {
      case "happy":
        borderColor = "#8de2d9";
        break; // Mint/teal
      case "surprised":
        borderColor = "#ffbed0";
        break; // Light pink
      case "excited":
        borderColor = "#b8f090";
        break; // Light green
      case "sleepy":
        borderColor = "#c4b2f5";
        break; // Lavender
      case "uwu":
        borderColor = "#ffb8bd";
        break; // Soft coral
      case "bouncy":
        borderColor = "#a0d8ff";
        break; // Sky blue
    }

    speechBubble.style.borderColor = borderColor;

    isSpeaking = true;

    // Clear any existing timer
    clearTimeout(speechTimer);

    // Set timer to hide speech bubble
    speechTimer = setTimeout(() => {
      speechBubble.style.opacity = "0";
      isSpeaking = false;
    }, duration);
  }

  // Function to set expression
  function setExpression(expression) {
    currentExpression = expression;

    // Reset all styles first
    character.style.background = colorSchemes[expression] || colorSchemes.happy;
    leftEye.style.height = "24px";
    rightEye.style.height = "24px";
    leftEyebrow.style.opacity = "0";
    rightEyebrow.style.opacity = "0";
    leftEyebrow.style.transform = "rotate(0deg)";
    rightEyebrow.style.transform = "rotate(0deg)";
    leftPupil.style.width = "9px";
    leftPupil.style.height = "9px";
    rightPupil.style.width = "9px";
    rightPupil.style.height = "9px";
    leftCheek.style.opacity = "0.6";
    rightCheek.style.opacity = "0.6";

    // Add subtle shadow adjustment for each mood
    switch (expression) {
      case "happy":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -10px 15px rgba(255, 255, 255, 0.7), inset 5px -5px 15px rgba(0, 0, 0, 0.05)";
        character.style.filter =
          "drop-shadow(0 8px 20px rgba(141, 226, 217, 0.3))";
        break;
      case "surprised":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -10px 15px rgba(255, 255, 255, 0.7), inset 5px -5px 15px rgba(0, 0, 0, 0.05)";
        character.style.filter =
          "drop-shadow(0 8px 20px rgba(255, 190, 208, 0.4))";
        break;
      case "excited":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -10px 15px rgba(255, 255, 255, 0.7), inset 5px -5px 15px rgba(0, 0, 0, 0.05)";
        character.style.filter =
          "drop-shadow(0 8px 20px rgba(184, 240, 144, 0.4))";
        break;
      case "sleepy":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -10px 15px rgba(255, 255, 255, 0.5), inset 5px -5px 15px rgba(0, 0, 0, 0.05)";
        character.style.filter =
          "drop-shadow(0 8px 15px rgba(196, 178, 245, 0.3))";
        break;
      case "uwu":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -10px 15px rgba(255, 255, 255, 0.7), inset 5px -5px 15px rgba(0, 0, 0, 0.05)";
        character.style.filter =
          "drop-shadow(0 8px 20px rgba(255, 184, 189, 0.4))";
        break;
      case "bouncy":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -10px 15px rgba(255, 255, 255, 0.8), inset 5px -5px 15px rgba(0, 0, 0, 0.05)";
        character.style.filter =
          "drop-shadow(0 8px 25px rgba(160, 216, 255, 0.5))";
        break;
    }

    switch (expression) {
      case "happy":
        // Cute happy smile
        Object.assign(mouth.style, {
          width: "35px",
          height: "10px",
          background: "transparent",
          border: "none",
          borderBottom: "3px solid #333",
          borderRadius: "0 0 20px 20px",
          position: "relative",
          transform: "rotate(0deg) scale(1, 1.2)",
        });

        // Remove any existing detail elements
        while (mouth.firstChild) {
          mouth.removeChild(mouth.firstChild);
        }
        break;

      case "surprised":
        // Cute small O-shaped mouth
        Object.assign(mouth.style, {
          width: "20px",
          height: "20px",
          border: "3px solid #333",
          borderRadius: "50%",
          transform: "rotate(0deg)",
          background: "transparent",
        });

        // Remove any existing detail elements
        while (mouth.firstChild) {
          mouth.removeChild(mouth.firstChild);
        }

        // Wide eyes with surprise
        leftPupil.style.width = "10px";
        leftPupil.style.height = "10px";
        rightPupil.style.width = "10px";
        rightPupil.style.height = "10px";

        // Raised eyebrows
        leftEyebrow.style.opacity = "1";
        rightEyebrow.style.opacity = "1";
        leftEyebrow.style.transform = "rotate(-15deg) translateY(-4px)";
        rightEyebrow.style.transform = "rotate(15deg) translateY(-4px)";
        break;

      case "excited":
        // Cute wide smile
        Object.assign(mouth.style, {
          width: "45px",
          height: "20px",
          border: "none",
          borderBottom: "3px solid #333",
          borderLeft: "2px solid #333",
          borderRight: "2px solid #333",
          borderRadius: "0 0 35px 35px",
          transform: "rotate(0deg)",
          background: "transparent",
        });

        // Remove any existing detail elements
        while (mouth.firstChild) {
          mouth.removeChild(mouth.firstChild);
        }

        // Rosy cheeks
        leftCheek.style.opacity = "0.8";
        rightCheek.style.opacity = "0.8";
        break;

      case "sleepy":
        // Small gentle smile
        Object.assign(mouth.style, {
          width: "30px",
          height: "8px",
          border: "none",
          borderBottom: "3px solid #333",
          borderRadius: "0 0 20px 20px",
          transform: "rotate(0deg)",
          background: "transparent",
        });

        // Remove any existing detail elements
        while (mouth.firstChild) {
          mouth.removeChild(mouth.firstChild);
        }

        // Half-closed eyes
        leftEye.style.height = "12px";
        rightEye.style.height = "12px";
        break;

      case "uwu":
        // Cute uwu closed-eye smile
        Object.assign(mouth.style, {
          width: "30px",
          height: "15px",
          border: "none",
          background: "transparent",
          position: "relative",
        });

        // Remove any existing detail elements
        while (mouth.firstChild) {
          mouth.removeChild(mouth.firstChild);
        }

        // Create the uwu mouth shape
        const uwuMouth = document.createElement("div");
        Object.assign(uwuMouth.style, {
          width: "30px",
          height: "12px",
          borderBottom: "3px solid #333",
          borderRadius: "0 0 10px 10px",
          position: "absolute",
          top: "0",
          left: "0",
        });
        mouth.appendChild(uwuMouth);

        // Closed happy eyes
        leftEye.style.height = "7px";
        rightEye.style.height = "7px";

        // Maximum cuteness with rosy cheeks
        leftCheek.style.opacity = "1";
        rightCheek.style.opacity = "1";
        break;

      case "bouncy":
        // Wide happy smile
        Object.assign(mouth.style, {
          width: "40px",
          height: "18px",
          border: "none",
          borderBottom: "3px solid #333",
          borderRadius: "0 0 40px 40px",
          transform: "rotate(0deg)",
          background: "transparent",
        });

        // Remove any existing detail elements
        while (mouth.firstChild) {
          mouth.removeChild(mouth.firstChild);
        }

        // Bigger eyes
        leftPupil.style.width = "12px";
        leftPupil.style.height = "12px";
        rightPupil.style.width = "12px";
        rightPupil.style.height = "12px";
        break;
    }
  }

  // Helper function for smooth transitions between states
  function startTransition(fromX, fromY, toX, toY, onComplete) {
    // Clear any existing transition
    clearTimeout(transitionTimer);

    isTransitioning = true;
    transitionStartX = fromX;
    transitionStartY = fromY;
    transitionTargetX = toX;
    transitionTargetY = toY;
    transitionProgress = 0;

    // Function to advance the transition
    function advanceTransition() {
      transitionProgress += 16; // ~60fps

      if (transitionProgress >= transitionDuration) {
        // Transition complete
        isTransitioning = false;
        characterX = transitionTargetX;
        characterY = transitionTargetY;

        if (onComplete) onComplete();
      } else {
        // Schedule next frame
        transitionTimer = setTimeout(advanceTransition, 16);
      }
    }

    // Start the transition
    advanceTransition();
  }

  // Function to start the blob exploring on its own
  function startExploring() {
    // Don't start exploring if we're following the cursor
    if (isFollowingCursor) return;

    isExploring = true;

    // Get current position to avoid teleporting
    const blobRect = character.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate a point within view but not too close to edges
    const padding = 150;

    // Current position within viewport
    const currentX = blobRect.left + blobRect.width / 2;
    const currentY = blobRect.top + blobRect.height / 2;

    // Limit movement to a reasonable distance to prevent teleporting
    const maxMove = Math.min(300, windowHeight / 3, windowWidth / 3); // More limited movement to stay in view

    // Encourage exploration across the full width
    // Bias towards unexplored areas
    let targetDirection = 0;

    // If we're in the left half, bias towards the right
    if (currentX < windowWidth / 2) {
      targetDirection = Math.random() * Math.PI * 0.5 - Math.PI * 0.25; // -45 to +45 degrees
    }
    // If we're in the right half, bias towards the left
    else {
      targetDirection = Math.random() * Math.PI * 0.5 + Math.PI * 0.75; // 135 to 225 degrees
    }

    // Sometimes use completely random direction to avoid getting stuck
    if (Math.random() < 0.3) {
      targetDirection = Math.random() * Math.PI * 2;
    }

    // Calculate distance - random but weighted towards more movement
    const distance = Math.pow(Math.random(), 0.7) * maxMove;

    // Calculate new position using angle and distance within viewport
    let newX = currentX + Math.cos(targetDirection) * distance;
    let newY = currentY + Math.sin(targetDirection) * distance;

    // Keep within viewport boundaries with more generous padding
    newX = Math.max(padding, Math.min(windowWidth - padding, newX));
    newY = Math.max(padding, Math.min(windowHeight - padding, newY));

    exploreTargetX = newX;
    exploreTargetY = newY;

    // Change expression to match exploration mood - more variety with cute expressions
    const randomExpression =
      expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(randomExpression);

    // Occasionally say something during exploration
    if (Math.random() < 0.2) {
      const randomMessage =
        idleMessages[Math.floor(Math.random() * idleMessages.length)];
      speak(randomMessage);
    }

    // Set timeout for next exploration - shorter duration for more activity
    const explorationDuration = 2000 + Math.random() * 3000; // 2-5 seconds
    exploreTimer = setTimeout(() => {
      if (Math.random() < 0.15) {
        // Sometimes pause briefly
        isExploring = false;
        setTimeout(() => {
          if (!isFollowingCursor) startExploring();
        }, 800 + Math.random() * 1200); // Shorter pauses
      } else {
        // Continue exploring in a new direction
        if (!isFollowingCursor) startExploring();
      }
    }, explorationDuration);
  }

  // Track mouse movement
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Only need to check for hover, not for following
    const blobRect = character.getBoundingClientRect();
    const blobCenterX = blobRect.left + blobRect.width / 2;
    const blobCenterY = blobRect.top + blobRect.height / 2;
    const distX = mouseX - blobCenterX;
    const distY = mouseY - blobCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Update hover state without changing behavior
    if (distance < 200 && !hovered) {
      hovered = true;
      // Show surprise expression briefly when hovered
      if (!isFollowingCursor) {
        setExpression("surprised");

        // Adjust eye movement delay to be faster (more attentive) when mouse is hovering
        eyeMovementDelay = 0.15; // Faster eye movement when cursor is nearby

        // Sometimes say a greeting when hovered
        if (Math.random() < 0.7) {
          const randomMessage =
            hoverMessages[Math.floor(Math.random() * hoverMessages.length)];
          speak(randomMessage);
        }

        setTimeout(() => {
          if (hovered && !isFollowingCursor) {
            // Sometimes show uwu when hover ends
            if (Math.random() < 0.3) {
              setExpression("uwu");
              setTimeout(() => setExpression("happy"), 1200);
            } else {
              setExpression("happy");
            }
          }
        }, 800);
      }
    } else if (distance > 200 && hovered) {
      hovered = false;
      // Return eye movement to normal delay
      eyeMovementDelay = 0.07;
    }

    // Dynamically adjust eye movement speed based on cursor distance
    if (!isFollowingCursor && !hovered) {
      // Farther cursor = slower eye movement
      const normalizedDistance = Math.min(1, distance / 800);
      eyeMovementDelay = 0.05 + normalizedDistance * 0.07; // 0.05 (closer) to 0.12 (farther)
    }
  });

  // Double click detection (for making the blob follow cursor)
  document.addEventListener("click", function (e) {
    // Check if click was near the blob
    const blobRect = character.getBoundingClientRect();
    const blobCenterX = blobRect.left + blobRect.width / 2;
    const blobCenterY = blobRect.top + blobRect.height / 2;
    const distX = e.clientX - blobCenterX;
    const distY = e.clientY - blobCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    const now = Date.now();

    // If click is near the blob, check for double click - made detection area larger
    if (distance < 180) {
      if (now - lastClickTime < 300) {
        // 300ms for double click detection
        // Double click detected - toggle cursor following

        // Get current position before changing state
        const blobRect = character.getBoundingClientRect();
        const blobLeft = blobRect.left;
        const blobTop = blobRect.top;

        // Toggle following state
        isFollowingCursor = !isFollowingCursor;

        if (isFollowingCursor) {
          // Stop exploration when switching to cursor following
          clearTimeout(exploreTimer);
          isExploring = false;

          // Update characterX/Y to actual current position to avoid teleporting
          characterX = blobLeft;
          characterY = blobTop;

          setExpression("bouncy"); // Use the bouncy expression when following

          // Say a following message
          const randomMessage =
            followingMessages[
              Math.floor(Math.random() * followingMessages.length)
            ];
          speak(randomMessage);
        } else {
          // Start exploring again when done following
          setExpression("happy");

          // Make sure we keep the current position when transitioning
          characterX = blobLeft;
          characterY = blobTop;

          // Say goodbye to following
          speak("I'll explore on my own now!");

          setTimeout(startExploring, 500);
        }
      } else {
        // Single click - sometimes show uwu and say something
        if (Math.random() < 0.3 && !isFollowingCursor) {
          setExpression("uwu");

          // Say something cute when clicked
          speak("Hehe, that tickles!");

          setTimeout(() => {
            if (!isFollowingCursor) setExpression("happy");
          }, 1000);
        }
      }
      lastClickTime = now;
    }

    // Regular click animation regardless of following state
    clicked = true;
    setTimeout(() => {
      clicked = false;
    }, 500);
  });

  // Track scroll position
  window.addEventListener("scroll", function () {
    targetScrollY = window.scrollY;

    // When scrolling, if the blob is exploring, update the exploration target
    // to be within the current viewport
    if (isExploring) {
      const blobRect = character.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // If the exploration target is now outside the viewport, get a new target
      const targetInViewport =
        exploreTargetX >= 0 &&
        exploreTargetX <= viewportWidth &&
        exploreTargetY >= 0 &&
        exploreTargetY <= viewportHeight;

      if (!targetInViewport && Math.random() < 0.3) {
        // Only sometimes get a new target
        // Get current position within viewport
        const currentX = blobRect.left + blobRect.width / 2;
        const currentY = blobRect.top + blobRect.height / 2;

        // Calculate a point within the current viewport
        const padding = 100;
        const newTargetX = Math.max(
          padding,
          Math.min(
            viewportWidth - padding,
            currentX + (Math.random() - 0.5) * 200
          )
        );
        const newTargetY = Math.max(
          padding,
          Math.min(
            viewportHeight - padding,
            currentY + (Math.random() - 0.5) * 200
          )
        );

        // Set new exploration target within viewport
        exploreTargetX = newTargetX;
        exploreTargetY = newTargetY;
      }
    }
  });

  // Animation function
  function animateCharacter() {
    // Update position based on scrolling
    scrollY += (targetScrollY - scrollY) * 0.05;

    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Add a subtle scale pulsing effect for "breathing"
    const breathScale = 1 + Math.sin(Date.now() / 2000) * 0.02;

    // Squash and stretch effect based on vertical movement
    let squashStretch = 1;
    let floatY, floatX;

    // Bouncier animation when in bouncy mode
    if (currentExpression === "bouncy") {
      floatY = Math.sin(Date.now() / 800) * 5;
      floatX = Math.sin(Date.now() / 1200) * 3;
      // Add squash and stretch for bouncy mode - squash at bottom, stretch at top
      const bouncePhase = Math.sin(Date.now() / 800);
      squashStretch = bouncePhase > 0.7 ? 0.95 : bouncePhase < -0.7 ? 1.05 : 1;
    } else {
      floatY = Math.sin(Date.now() / 1000) * 3;
      floatX = Math.sin(Date.now() / 1500) * 2;
      // More subtle squash and stretch for normal modes
      squashStretch = 1 + Math.sin(Date.now() / 1000) * 0.02;
    }

    // Handle transitioning state specifically
    if (isTransitioning) {
      // Calculate smooth easing using sine interpolation
      const progress = transitionProgress / transitionDuration;
      const smoothProgress = Math.sin((progress * Math.PI) / 2);

      // Interpolate between start and target positions
      characterX =
        transitionStartX +
        (transitionTargetX - transitionStartX) * smoothProgress;
      characterY =
        transitionStartY +
        (transitionTargetY - transitionStartY) * smoothProgress;

      // Apply position
      character.style.left = characterX + "px";
      character.style.top = characterY + "px";
    }
    // If actively following cursor (after double click)
    else if (isFollowingCursor) {
      // Target position based on mouse (offset from mouse position)
      const targetX = mouseX - 50; // Closer to mouse
      const targetY = mouseY - 50; // Closer to mouse, no scroll offset needed for fixed position

      // Constrain target position to viewport bounds
      const charWidth = character.offsetWidth;
      const charHeight = character.offsetHeight;
      const padding = 20;

      // Calculate bounded target - using viewport coordinates only
      const boundedTargetX = Math.max(
        padding,
        Math.min(window.innerWidth - charWidth - padding, targetX)
      );

      const boundedTargetY = Math.max(
        padding,
        Math.min(window.innerHeight - charHeight - padding, targetY)
      );

      // Smooth following with distance-based easing
      const dx = boundedTargetX - characterX;
      const dy = boundedTargetY - characterY;

      // Distance-based easing (slower when closer to target)
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If too far, use faster movement to catch up, otherwise very gentle
      const speed =
        distance > 300 ? 0.1 : Math.max(0.03, Math.min(0.05, distance / 300));

      characterX += dx * speed;
      characterY += dy * speed;

      // Apply position
      character.style.left = characterX + "px";
      character.style.top = characterY + "px";

      // Make eyes follow cursor intensely
      const eyeCenterX = window.innerWidth / 2;
      const eyeCenterY = window.innerHeight / 2;

      // Calculate pupil movement - more pronounced when following
      const pupilXOffset = (mouseX - eyeCenterX) / 150;
      const pupilYOffset = (mouseY - eyeCenterY) / 150;

      // Set target for smooth eye movement
      targetPupilX = 8 + Math.max(-4, Math.min(4, pupilXOffset));
      targetPupilY = 8 + Math.max(-4, Math.min(4, pupilYOffset));
    }
    // Exploring on its own
    else if (isExploring) {
      // Move toward exploration target with ultra-slow easing
      const dx = exploreTargetX - characterX;
      const dy = exploreTargetY - characterY;

      // Use distance-based easing
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.max(0.006, Math.min(0.015, distance / 500)); // Slightly faster for more movement

      characterX += dx * speed;
      characterY += dy * speed;

      // Apply position
      character.style.left = characterX + "px";
      character.style.top = characterY + "px";

      // Look at cursor position with subtle movement
      const eyeCenterX = window.innerWidth / 2;
      const eyeCenterY = window.innerHeight / 2;

      // Calculate pupil movement with reduced intensity
      const pupilXOffset = (mouseX - eyeCenterX) / 250; // Reduced intensity
      const pupilYOffset = (mouseY - eyeCenterY) / 250; // Reduced intensity

      // Direction of movement (exploration) still influences the eyes slightly
      const lookDirectionX =
        Math.sign(dx) * Math.min(1.5, Math.abs(dx) * 0.008);
      const lookDirectionY =
        Math.sign(dy) * Math.min(1.5, Math.abs(dy) * 0.008);

      // Combine cursor position and movement direction (30% movement direction, 70% cursor)
      // Set target for smooth eye movement
      targetPupilX =
        8 +
        Math.max(-3, Math.min(3, pupilXOffset * 0.7 + lookDirectionX * 0.3));
      targetPupilY =
        8 +
        Math.max(-3, Math.min(3, pupilYOffset * 0.7 + lookDirectionY * 0.3));
    }
    // Idle state - just floating in place
    else {
      // Stay in place
      character.style.left = characterX + "px";
      character.style.top = characterY + "px";

      // Make eyes look at cursor with subtle movement
      const eyeCenterX = window.innerWidth / 2;
      const eyeCenterY = window.innerHeight / 2;

      // Calculate pupil movement - subtle when idle
      const pupilXOffset = (mouseX - eyeCenterX) / 300; // Even more subtle when idle
      const pupilYOffset = (mouseY - eyeCenterY) / 300; // Even more subtle when idle

      // Set target for smooth eye movement
      targetPupilX = 8 + Math.max(-2.5, Math.min(2.5, pupilXOffset));
      targetPupilY = 8 + Math.max(-2.5, Math.min(2.5, pupilYOffset));

      // Start exploring if we're idle too long and not following cursor
      if (
        !isExploring &&
        !clicked &&
        !isTransitioning &&
        !isFollowingCursor &&
        Date.now() - lastExplorationChange > 3000 // Reduced from 4000 for more activity
      ) {
        lastExplorationChange = Date.now();
        startExploring();
      }
    }

    // Apply smooth eye movement with delay
    currentPupilX += (targetPupilX - currentPupilX) * eyeMovementDelay;
    currentPupilY += (targetPupilY - currentPupilY) * eyeMovementDelay;

    // Apply calculated pupil positions
    leftPupil.style.left = currentPupilX + "px";
    leftPupil.style.top = currentPupilY + "px";
    rightPupil.style.left = currentPupilX + "px";
    rightPupil.style.top = currentPupilY + "px";

    // Apply transform with improved animation effects
    character.style.transform = `translate(${floatX}px, ${floatY}px) scale(${breathScale}) scaleY(${squashStretch}) scaleX(${
      1 / squashStretch
    })`;

    // Ensure the blob stays within the viewport regardless of mode
    const charRect = character.getBoundingClientRect();
    const charWidth = charRect.width;
    const charHeight = charRect.height;

    // Calculate bounds with padding
    const padding = 20;
    const minX = padding;
    const maxX = viewportWidth - charWidth - padding;
    const minY = padding;
    const maxY = viewportHeight - charHeight - padding;

    // Check if outside bounds and adjust - use client-relative positions since we're fixed
    let needsRepositioning = false;

    if (charRect.left < minX) {
      characterX = minX;
      needsRepositioning = true;
    } else if (charRect.right > viewportWidth - padding) {
      characterX = maxX;
      needsRepositioning = true;
    }

    if (charRect.top < minY) {
      characterY = minY;
      needsRepositioning = true;
    } else if (charRect.bottom > viewportHeight - padding) {
      characterY = maxY;
      needsRepositioning = true;
    }

    // Apply position correction if needed
    if (needsRepositioning) {
      character.style.left = characterX + "px";
      character.style.top = characterY + "px";

      // If exploring, update the target too to avoid fighting with the constraints
      if (isExploring) {
        exploreTargetX = characterX;
        exploreTargetY = characterY;
      }
    }

    // Continue animation
    requestAnimationFrame(animateCharacter);
  }

  // Add a shimmer effect to eyeShines
  function updateShimmer() {
    // Random subtle movement for eye shine for a twinkling effect
    const leftOffset = 11 + Math.sin(Date.now() / 800) * 2;
    const topOffset = 5 + Math.cos(Date.now() / 1000) * 2;

    leftShine.style.left = `${leftOffset}px`;
    leftShine.style.top = `${topOffset}px`;
    rightShine.style.left = `${leftOffset}px`;
    rightShine.style.top = `${topOffset}px`;

    // Subtle size pulsing
    const size = 3.5 + Math.sin(Date.now() / 1200) * 1;
    leftShine.style.width = `${size}px`;
    leftShine.style.height = `${size}px`;
    rightShine.style.width = `${size}px`;
    rightShine.style.height = `${size}px`;

    requestAnimationFrame(updateShimmer);
  }

  // Call the shimmer function
  updateShimmer();

  // Set initial expression
  setExpression("happy");

  // Start animation
  animateCharacter();

  // Say hello when first loaded
  setTimeout(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    speak(randomGreeting);
  }, 1000);

  // Begin exploring after a short delay
  setTimeout(startExploring, 2000);

  // Add event listener for scrolling to detect sections
  window.addEventListener("scroll", function () {
    // Only proceed if not speaking and not following cursor
    if (isSpeaking || isFollowingCursor) return;

    // Check which section is currently in view
    const sections = document.querySelectorAll("section[id]");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <= sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    // If we've moved to a new section and it has messages, possibly speak
    if (
      currentSection &&
      currentSection !== lastVisitedSection &&
      sectionMessages[currentSection]
    ) {
      lastVisitedSection = currentSection;

      // Only speak sometimes (30% chance) to avoid being too chatty
      if (Math.random() < 0.3) {
        const messages = sectionMessages[currentSection];
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        speak(randomMessage);

        // Also change expression sometimes
        if (Math.random() < 0.5) {
          const randomExpression =
            expressions[Math.floor(Math.random() * expressions.length)];
          setExpression(randomExpression);
        }
      }
    }
  });

  console.log("Floating blob with expressions initialized");
});
