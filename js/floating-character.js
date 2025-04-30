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
    background: "radial-gradient(circle at 30% 25%, #d9fcf7, #a5f3e9, #79d0c7)", // Enhanced 3D gradient
    boxShadow:
      "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -20px 30px rgba(255, 255, 255, 0.7), inset 20px -20px 30px rgba(0, 0, 0, 0.1)",
    zIndex: "9999",
    top: "150px",
    left: "100px",
    pointerEvents: "none",
    transition:
      "transform 0.5s ease-out, background 0.5s ease, filter 0.3s ease, box-shadow 0.3s ease, perspective 0.5s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    filter: "drop-shadow(0 8px 20px rgba(141, 226, 217, 0.3))",
    perspective: "800px",
    transformStyle: "preserve-3d",
  });

  // Create a highlight shine effect for 3D appearance
  const highlight = document.createElement("div");
  highlight.className = "blob-highlight";
  Object.assign(highlight.style, {
    position: "absolute",
    width: "40px",
    height: "40px",
    background:
      "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
    borderRadius: "50%",
    top: "20px",
    left: "30px",
    pointerEvents: "none",
    zIndex: "1",
    opacity: "0.7",
  });

  // Create surface texture for more depth
  const texture = document.createElement("div");
  texture.className = "blob-texture";
  Object.assign(texture.style, {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at 60% 60%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.03) 80%)",
    borderRadius: "55%",
    pointerEvents: "none",
    zIndex: "1",
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

  // Add our new 3D elements
  character.appendChild(texture);
  character.appendChild(highlight);

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
    top: "30px", // Positioned to the right side
    left: "140px", // Positioned to the right side
    transform: "none", // Reset transform
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
    bottom: "50%", // Center vertically
    left: "-10px", // Point to the left
    marginLeft: "0",
    marginBottom: "-10px",
    borderWidth: "10px 10px 10px 0", // Point to the left
    borderStyle: "solid",
    borderColor: "transparent white transparent transparent", // Right side arrow
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

  // Path waypoints for more interesting movement
  let waypoints = [];
  let currentWaypointIndex = 0;

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
    "spooky", // New spooky expression
  ];

  // Cute color schemes for different moods - now with enhanced gradients
  const colorSchemes = {
    happy: "radial-gradient(circle at 30% 25%, #c8fbf2, #a5f3e9, #8de2d9)", // Mint/teal
    surprised: "radial-gradient(circle at 30% 25%, #fff0f3, #ffd6e0, #ffbed0)", // Light pink
    excited: "radial-gradient(circle at 30% 25%, #e9ffd8, #ccffa8, #b8f090)", // Light green
    sleepy: "radial-gradient(circle at 30% 25%, #efe5ff, #d3c5f8, #c4b2f5)", // Lavender
    uwu: "radial-gradient(circle at 30% 25%, #ffe5e7, #ffccd0, #ffb8bd)", // Soft coral
    bouncy: "radial-gradient(circle at 30% 25%, #d9f2ff, #b8e6ff, #a0d8ff)", // Sky blue
    spooky: "radial-gradient(circle at 30% 25%, #c9c3de, #ada5c7, #8679ae)", // Purple/ghostly
  };

  // Function to make the blob speak with typed animation
  function speak(message, duration = 3000) {
    // Don't interrupt if already speaking, queue it up
    if (isSpeaking) {
      setTimeout(() => speak(message, duration), duration);
      return;
    }

    // Clear the speech bubble
    speechBubble.textContent = "";

    // Position the speech bubble based on blob's position on screen
    positionSpeechBubble();

    // Show the speech bubble
    speechBubble.style.opacity = "1";

    isSpeaking = true;

    // Clear any existing timer
    clearTimeout(speechTimer);

    // Type out the message one character at a time
    let charIndex = 0;
    const typingSpeed = Math.max(30, Math.min(70, 500 / message.length)); // Between 30-70ms per char, adjusted for message length

    function typeNextChar() {
      if (charIndex < message.length) {
        speechBubble.textContent += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeNextChar, typingSpeed);
      }
    }

    // Start typing
    typeNextChar();

    // Set timer to hide speech bubble after typed animation plus viewing time
    speechTimer = setTimeout(() => {
      speechBubble.style.opacity = "0";
      isSpeaking = false;
    }, duration + typingSpeed * message.length);
  }

  // Function to position the speech bubble based on blob position
  function positionSpeechBubble() {
    const blobRect = character.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    // Determine border color based on current expression
    let borderColor = "#8de2d9"; // Default color

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
      case "spooky":
        borderColor = "#c9c3de";
        break; // Purple/ghostly
    }

    // If blob is near the right edge of the screen, put bubble on the left
    if (blobRect.right > windowWidth - 250) {
      speechBubble.style.left = "-230px";
      speechBubble.style.top = "30px";
      speechBubbleTail.style.left = "100%";
      speechBubbleTail.style.right = "auto";
      speechBubbleTail.style.bottom = "50%";
      speechBubbleTail.style.marginBottom = "-10px";
      speechBubbleTail.style.borderWidth = "10px 0 10px 10px";
      speechBubbleTail.style.borderColor = `transparent transparent transparent ${borderColor}`;
    }
    // Default: put bubble on the right
    else {
      speechBubble.style.left = "140px";
      speechBubble.style.top = "30px";
      speechBubbleTail.style.left = "-10px";
      speechBubbleTail.style.right = "auto";
      speechBubbleTail.style.bottom = "50%";
      speechBubbleTail.style.marginBottom = "-10px";
      speechBubbleTail.style.borderWidth = "10px 10px 10px 0";
      speechBubbleTail.style.borderColor = `transparent ${borderColor} transparent transparent`;
    }

    // Set speech bubble border color
    speechBubble.style.borderColor = borderColor;
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

    // Remove any additional elements that might have been added
    const extraEyes = character.querySelectorAll(".extra-eye");
    extraEyes.forEach((eye) => eye.remove());

    // Update 3D highlight and texture based on mood
    switch (expression) {
      case "happy":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -20px 30px rgba(255, 255, 255, 0.7), inset 20px -20px 30px rgba(0, 0, 0, 0.1)";
        character.style.filter =
          "drop-shadow(0 8px 20px rgba(141, 226, 217, 0.3))";
        highlight.style.background =
          "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)";
        texture.style.background =
          "radial-gradient(circle at 60% 60%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.03) 80%)";
        break;
      case "surprised":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.15), inset 0 -20px 30px rgba(255, 255, 255, 0.6), inset 20px -20px 30px rgba(0, 0, 0, 0.12)";
        character.style.filter =
          "drop-shadow(0 8px 20px rgba(255, 190, 208, 0.4))";
        highlight.style.background =
          "radial-gradient(circle at center, rgba(255,220,220,0.8) 0%, rgba(255,255,255,0) 70%)";
        texture.style.background =
          "radial-gradient(circle at 60% 60%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.05) 80%)";
        break;
      case "excited":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -20px 30px rgba(255, 255, 255, 0.8), inset 20px -20px 30px rgba(0, 0, 0, 0.08)";
        character.style.filter =
          "drop-shadow(0 8px 20px rgba(184, 240, 144, 0.4))";
        highlight.style.background =
          "radial-gradient(circle at center, rgba(220,255,220,0.8) 0%, rgba(255,255,255,0) 70%)";
        texture.style.background =
          "radial-gradient(circle at 60% 60%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.03) 80%)";
        break;
      case "sleepy":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -20px 25px rgba(255, 255, 255, 0.5), inset 20px -20px 30px rgba(0, 0, 0, 0.1)";
        character.style.filter =
          "drop-shadow(0 8px 15px rgba(196, 178, 245, 0.3))";
        highlight.style.background =
          "radial-gradient(circle at center, rgba(220,220,255,0.6) 0%, rgba(255,255,255,0) 70%)";
        texture.style.background =
          "radial-gradient(circle at 60% 60%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.04) 80%)";
        break;
      case "uwu":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -20px 30px rgba(255, 255, 255, 0.7), inset 20px -20px 30px rgba(0, 0, 0, 0.1)";
        character.style.filter =
          "drop-shadow(0 8px 20px rgba(255, 184, 189, 0.4))";
        highlight.style.background =
          "radial-gradient(circle at center, rgba(255,220,225,0.8) 0%, rgba(255,255,255,0) 70%)";
        texture.style.background =
          "radial-gradient(circle at 60% 60%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.03) 80%)";
        break;
      case "bouncy":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -20px 30px rgba(255, 255, 255, 0.8), inset 20px -20px 30px rgba(0, 0, 0, 0.07)";
        character.style.filter =
          "drop-shadow(0 8px 25px rgba(160, 216, 255, 0.5))";
        highlight.style.background =
          "radial-gradient(circle at center, rgba(210,235,255,0.8) 0%, rgba(255,255,255,0) 70%)";
        texture.style.background =
          "radial-gradient(circle at 60% 60%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.02) 80%)";
        break;
      case "spooky":
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.3), inset 0 -20px 30px rgba(255, 255, 255, 0.3), inset 20px -20px 30px rgba(0, 0, 0, 0.2)";
        character.style.filter =
          "drop-shadow(0 8px 20px rgba(134, 121, 174, 0.5))";
        highlight.style.background =
          "radial-gradient(circle at center, rgba(200,180,255,0.5) 0%, rgba(255,255,255,0) 70%)";
        texture.style.background =
          "radial-gradient(circle at 60% 60%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.08) 80%)";
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

      case "spooky":
        // Spooky zigzag mouth
        Object.assign(mouth.style, {
          width: "40px",
          height: "15px",
          border: "none",
          background: "transparent",
          position: "relative",
        });

        // Remove any existing detail elements
        while (mouth.firstChild) {
          mouth.removeChild(mouth.firstChild);
        }

        // Create spooky zigzag mouth
        const spookyMouth = document.createElement("div");
        Object.assign(spookyMouth.style, {
          width: "40px",
          height: "15px",
          borderBottom: "none",
          position: "absolute",
          top: "0",
          left: "0",
        });

        // Create SVG for zigzag mouth
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "40");
        svg.setAttribute("height", "15");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute(
          "d",
          "M0,8 Q5,3 10,8 Q15,13 20,8 Q25,3 30,8 Q35,13 40,8"
        );
        path.setAttribute("stroke", "#333");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("fill", "none");

        svg.appendChild(path);
        spookyMouth.appendChild(svg);
        mouth.appendChild(spookyMouth);

        // Spooky eyes - make them more intense
        leftPupil.style.backgroundColor = "#6e5887";
        rightPupil.style.backgroundColor = "#6e5887";
        leftPupil.style.width = "11px";
        leftPupil.style.height = "11px";
        rightPupil.style.width = "11px";
        rightPupil.style.height = "11px";

        // Add a third eye for extra spookiness
        const thirdEye = document.createElement("div");
        thirdEye.className = "blob-eye extra-eye";
        Object.assign(thirdEye.style, {
          width: "20px",
          height: "20px",
          backgroundColor: "white",
          border: "3px solid #333",
          borderRadius: "50%",
          position: "absolute",
          overflow: "hidden",
          top: "25px",
          left: "calc(50% - 10px)",
        });

        const thirdPupil = document.createElement("div");
        thirdPupil.className = "blob-pupil";
        Object.assign(thirdPupil.style, {
          position: "absolute",
          width: "9px",
          height: "9px",
          backgroundColor: "#6e5887",
          borderRadius: "50%",
          top: "6px",
          left: "6px",
          transition: "all 0.2s ease",
        });

        thirdEye.appendChild(thirdPupil);
        face.appendChild(thirdEye);

        // Spooky raised eyebrows
        leftEyebrow.style.opacity = "1";
        rightEyebrow.style.opacity = "1";
        leftEyebrow.style.transform = "rotate(20deg) translateY(-5px)";
        rightEyebrow.style.transform = "rotate(-20deg) translateY(-5px)";
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
    const padding = 100; // Reduced padding to allow more movement area

    // Current position within viewport
    const currentX = blobRect.left + blobRect.width / 2;
    const currentY = blobRect.top + blobRect.height / 2;

    // Generate a path with multiple waypoints
    generateExplorationPath(
      currentX,
      currentY,
      windowWidth,
      windowHeight,
      padding
    );

    // Update exploration target to the first waypoint
    if (waypoints.length > 0) {
      currentWaypointIndex = 0;
      exploreTargetX = waypoints[0].x;
      exploreTargetY = waypoints[0].y;
    }

    // Change expression to match exploration mood - more variety with cute expressions
    const randomExpression =
      expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(randomExpression);

    // Occasionally say something during exploration
    if (Math.random() < 0.3) {
      // Increased chance to talk
      const randomMessage =
        idleMessages[Math.floor(Math.random() * idleMessages.length)];
      speak(randomMessage);
    }
  }

  // Generate a path with multiple waypoints
  function generateExplorationPath(
    startX,
    startY,
    windowWidth,
    windowHeight,
    padding
  ) {
    // Clear previous waypoints
    waypoints = [];

    // Number of waypoints to generate (2-3 instead of 2-4)
    const numWaypoints = Math.floor(Math.random() * 2) + 2;

    // Limit movement to a reasonable distance to prevent teleporting
    const maxMove = Math.min(300, windowHeight / 2.5, windowWidth / 2.5); // Reduced from 400

    // Current position for chain of waypoints
    let currentX = startX;
    let currentY = startY;

    // Generate waypoints
    for (let i = 0; i < numWaypoints; i++) {
      // Generate a random direction
      const targetDirection = Math.random() * Math.PI * 2;

      // Calculate distance - random but weighted towards more movement
      const distance =
        Math.pow(Math.random(), 0.6) * // Increased from 0.5 for more medium distances
        maxMove *
        (0.4 + (i / numWaypoints) * 0.5); // Reduced from 0.5 for slightly slower start

      // Calculate new position
      let newX = currentX + Math.cos(targetDirection) * distance;
      let newY = currentY + Math.sin(targetDirection) * distance;

      // Keep within viewport boundaries
      newX = Math.max(padding, Math.min(windowWidth - padding, newX));
      newY = Math.max(padding, Math.min(windowHeight - padding, newY));

      // Add to waypoints
      waypoints.push({ x: newX, y: newY });

      // Update current position for next waypoint
      currentX = newX;
      currentY = newY;
    }
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
      floatY = Math.sin(Date.now() / 900) * 4; // Reduced from 5
      floatX = Math.sin(Date.now() / 1300) * 2.5; // Reduced from 3
      // Add squash and stretch for bouncy mode - squash at bottom, stretch at top
      const bouncePhase = Math.sin(Date.now() / 900);
      squashStretch = bouncePhase > 0.7 ? 0.96 : bouncePhase < -0.7 ? 1.04 : 1; // Reduced from 0.95/1.05
    } else {
      floatY = Math.sin(Date.now() / 1200) * 2.5; // Reduced from 3, slowed from 1000 to 1200
      floatX = Math.sin(Date.now() / 1700) * 1.5; // Reduced from 2, slowed from 1500 to 1700
      // More subtle squash and stretch for normal modes
      squashStretch = 1 + Math.sin(Date.now() / 1200) * 0.015; // Reduced from 0.02
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
        distance > 300 ? 0.08 : Math.max(0.02, Math.min(0.04, distance / 350)); // Reduced from 0.1/0.03/0.05

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
      const speed = Math.max(0.008, Math.min(0.02, distance / 450)); // Reduced from 0.01/0.025/400

      characterX += dx * speed;
      characterY += dy * speed;

      // Apply position
      character.style.left = characterX + "px";
      character.style.top = characterY + "px";

      // If we're close enough to the current waypoint, move to the next one
      if (distance < 10 && waypoints.length > 0) {
        currentWaypointIndex++;

        // If we've reached the end of the path, generate a new one
        if (currentWaypointIndex >= waypoints.length) {
          // Sometimes pause briefly
          if (Math.random() < 0.2) {
            // Increased from 0.1 for more pauses
            isExploring = false;
            setTimeout(() => {
              if (!isFollowingCursor) startExploring();
            }, 800 + Math.random() * 1200); // Increased from 500-1300ms to 800-2000ms
          } else {
            // Generate a new path starting from current position
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const padding = 100;
            generateExplorationPath(
              characterX,
              characterY,
              windowWidth,
              windowHeight,
              padding
            );
            currentWaypointIndex = 0;

            // Change expression sometimes
            if (Math.random() < 0.4) {
              const randomExpression =
                expressions[Math.floor(Math.random() * expressions.length)];
              setExpression(randomExpression);
            }
          }
        }

        // Update target to the next waypoint
        if (isExploring && currentWaypointIndex < waypoints.length) {
          exploreTargetX = waypoints[currentWaypointIndex].x;
          exploreTargetY = waypoints[currentWaypointIndex].y;
        }
      }
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
        Date.now() - lastExplorationChange > 3000 // Increased from 2000ms back to 3000ms
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
  setTimeout(startExploring, 1000);

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
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Changed from /2 to /3 to detect sections earlier

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <= sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    // If we've moved to a new section and it has messages, speak
    if (
      currentSection &&
      currentSection !== lastVisitedSection &&
      sectionMessages[currentSection]
    ) {
      updateCurrentSection(currentSection); // Update section memory
      lastVisitedSection = currentSection;

      // Increased chance to speak from 30% to 80%
      if (Math.random() < 0.8) {
        const messages = sectionMessages[currentSection];
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];

        // Force the blob to speak with a slight delay for better experience
        setTimeout(() => {
          speak(randomMessage, 4000); // Increased duration from 3000 to 4000ms

          // Also change expression to match the section
          let expressionToUse;
          switch (currentSection) {
            case "about":
              expressionToUse = "happy";
              break;
            case "skills":
              expressionToUse = "excited";
              break;
            case "experience":
              expressionToUse = "bouncy";
              break;
            case "projects":
              expressionToUse = "surprised";
              break;
            case "certifications":
              expressionToUse = "excited";
              break;
            case "blog":
              expressionToUse = "uwu";
              break;
            case "contact":
              expressionToUse = "happy";
              break;
            default:
              expressionToUse =
                expressions[Math.floor(Math.random() * expressions.length)];
          }
          setExpression(expressionToUse);
        }, 300);
      }
    }
  });

  // Additional scroll handler specifically for sections (runs less frequently)
  setInterval(function checkSectionVisibility() {
    // Don't check if already speaking
    if (isSpeaking) return;

    // Force a check of visible sections
    const sections = document.querySelectorAll("section[id]");
    let visibleSection = "";

    // Find which section is most visible in the viewport
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if section is at least 50% visible in viewport (increased from 40%)
      // This makes the detection more deliberate and requires more scrolling
      if (
        rect.top < viewportHeight * 0.5 &&
        rect.bottom > viewportHeight * 0.4
      ) {
        visibleSection = section.id;
      }
    });

    // If we're in a section with messages and it's not the last section we spoke about
    if (
      visibleSection &&
      visibleSection !== lastVisitedSection &&
      sectionMessages[visibleSection]
    ) {
      lastVisitedSection = visibleSection;

      // Lower chance to speak when entering a section (50% instead of 90%)
      // This reduces the feeling of randomness in messages
      if (Math.random() < 0.5) {
        const messages = sectionMessages[visibleSection];
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        speak(randomMessage, 4000);

        // Change expression sometimes, but less frequently (30% vs 100% before)
        if (Math.random() < 0.3) {
          const randomExpression =
            expressions[Math.floor(Math.random() * expressions.length)];
          setExpression(randomExpression);
        }
      }
    }
  }, 5000); // Check less frequently - every 5 seconds instead of 3

  // Additional keyboard interactions and easter eggs
  document.addEventListener("keydown", function (e) {
    // Don't trigger if user is typing in an input field
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      return;
    }

    // Space bar - make blob jump with excitement
    if (e.code === "Space") {
      character.style.transform = `translateY(-30px) scale(0.9, 1.1)`;
      setTimeout(() => {
        character.style.transform = `translateY(0) scale(1)`;
        if (Math.random() < 0.5) {
          speak("Whee! I can jump!");
          setExpression("excited");
        }
      }, 300);
    }

    // 'B' key - Blob gets bigger temporarily
    if (e.code === "KeyB") {
      const originalWidth = character.style.width;
      const originalHeight = character.style.height;

      // Store original dimensions in pixel values
      const originalWidthValue = parseInt(originalWidth) || 130;
      const originalHeightValue = parseInt(originalHeight) || 130;

      character.style.width = "160px";
      character.style.height = "160px";
      speak("I'm getting bigger!");

      setTimeout(() => {
        // Ensure we restore to specific pixel values
        character.style.width = originalWidthValue + "px";
        character.style.height = originalHeightValue + "px";
      }, 2000);
    }

    // 'H' key - Blob says hello
    if (e.code === "KeyH") {
      const helloMessages = [
        "Hello there! 👋",
        "Hi! Nice to meet you!",
        "Hey! How's it going?",
        "Greetings, human!",
        "Hello! I'm your portfolio buddy!",
      ];
      const randomMessage =
        helloMessages[Math.floor(Math.random() * helloMessages.length)];
      speak(randomMessage);
      setExpression("happy");
    }

    // 'S' key - Blob goes to sleep
    if (e.code === "KeyS") {
      setExpression("sleepy");
      speak("Zzzz... so sleepy...");

      // Show Z's coming from the blob
      const createSleepZ = () => {
        const zElement = document.createElement("div");
        Object.assign(zElement.style, {
          position: "absolute",
          fontFamily: "Arial, sans-serif",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#c4b2f5",
          top: "-20px",
          left: "60px",
          opacity: "0",
          transition: "all 2s ease",
          zIndex: "10000",
          textShadow: "0 0 5px rgba(255,255,255,0.7)",
        });
        zElement.textContent = "z";
        character.appendChild(zElement);

        // Animate the Z moving up and fading out
        setTimeout(() => {
          Object.assign(zElement.style, {
            transform: "translate(-30px, -40px) rotate(-10deg)",
            opacity: "1",
          });

          setTimeout(() => {
            Object.assign(zElement.style, {
              transform: "translate(-50px, -80px) rotate(-20deg)",
              opacity: "0",
            });

            // Remove the element after animation
            setTimeout(() => {
              character.removeChild(zElement);
            }, 2000);
          }, 1000);
        }, 10);
      };

      // Create multiple Z's with delays
      createSleepZ();
      setTimeout(createSleepZ, 700);
      setTimeout(createSleepZ, 1400);

      // Wake up after a few seconds
      setTimeout(() => {
        setExpression("happy");
        speak("Oh! I'm awake now!");
      }, 5000);
    }

    // 'D' key - Blob dances
    if (e.code === "KeyD") {
      speak("Let's dance!");

      // Temporary dance animation
      let danceStep = 0;
      const danceInterval = setInterval(() => {
        danceStep++;

        switch (danceStep % 6) {
          case 0:
            character.style.transform = "translateY(-10px) rotate(5deg)";
            break;
          case 1:
            character.style.transform = "translateX(10px) rotate(-5deg)";
            break;
          case 2:
            character.style.transform = "translateY(10px) rotate(5deg)";
            break;
          case 3:
            character.style.transform = "translateX(-10px) rotate(-5deg)";
            break;
          case 4:
            character.style.transform = "scale(1.1, 0.9) rotate(3deg)";
            break;
          case 5:
            character.style.transform = "scale(0.9, 1.1) rotate(-3deg)";
            break;
        }

        // Cycle through expressions while dancing
        if (danceStep % 2 === 0) {
          const danceExpressions = ["excited", "happy", "bouncy"];
          const randomExpression =
            danceExpressions[
              Math.floor(Math.random() * danceExpressions.length)
            ];
          setExpression(randomExpression);
        }

        // Stop dancing after 10 steps
        if (danceStep >= 12) {
          clearInterval(danceInterval);
          character.style.transform = "";
          setExpression("happy");
          speak("That was fun!");
        }
      }, 300);
    }

    // 'P' key - Take a photo/snapshot pose
    if (e.code === "KeyP") {
      speak("Cheese! 📸");
      setExpression("surprised");

      // Flash effect for taking photo
      const flash = document.createElement("div");
      Object.assign(flash.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        opacity: "0",
        transition: "opacity 0.1s ease",
        zIndex: "9998", // Below the blob
        pointerEvents: "none",
      });

      document.body.appendChild(flash);

      // Flash animation
      setTimeout(() => {
        flash.style.opacity = "0.7";
        setTimeout(() => {
          flash.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(flash);
            setExpression("happy");
          }, 300);
        }, 100);
      }, 300);
    }

    // 'R' key - Reset blob size and appearance if it gets stuck
    if (e.code === "KeyR") {
      // Reset to default dimensions
      character.style.width = "130px";
      character.style.height = "130px";
      character.style.transform = "";

      // Reset appearance
      setExpression("happy");
      speak("Back to normal!");

      // Clear any ongoing animations or timers
      clearTimeout(speechTimer);

      // Remove any added elements (like z's or hearts)
      const elementsToRemove = character.querySelectorAll(
        "div:not(.blob-face):not(.blob-eye):not(.blob-pupil):not(.eye-shine):not(.blob-mouth):not(.blob-cheek):not(.blob-eyebrow):not(.eyes-container):not(.mouth-container):not(.blob-speech-bubble)"
      );
      elementsToRemove.forEach((el) => {
        character.removeChild(el);
      });
    }
  });

  // Magic Sequence - Konami Code Easter Egg (up, up, down, down, left, right, left, right, b, a)
  let konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];
  let konamiIndex = 0;

  document.addEventListener("keydown", function (e) {
    // Check if the key matches the next in the sequence
    if (e.code === konamiSequence[konamiIndex]) {
      konamiIndex++;

      // If the full sequence is matched
      if (konamiIndex === konamiSequence.length) {
        // Reset index
        konamiIndex = 0;

        // Activate rainbow mode!
        speak("RAINBOW MODE ACTIVATED! 🌈");

        // Start color cycling
        let rainbowIndex = 0;
        const rainbowColors = [
          "radial-gradient(circle at 30% 25%, #ff9aa2, #ff6b8a, #ff5177)", // Red
          "radial-gradient(circle at 30% 25%, #ffb347, #ff9021, #ff7b00)", // Orange
          "radial-gradient(circle at 30% 25%, #fdfd96, #fdfd54, #fdfd00)", // Yellow
          "radial-gradient(circle at 30% 25%, #a8e6cf, #7fdfc2, #4cd3ac)", // Green
          "radial-gradient(circle at 30% 25%, #a0d8ff, #77c0ff, #54acff)", // Blue
          "radial-gradient(circle at 30% 25%, #d8a0ff, #c277ff, #ac54ff)", // Purple
        ];

        const rainbowInterval = setInterval(() => {
          rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
          character.style.background = rainbowColors[rainbowIndex];

          // End rainbow mode after cycling through colors a few times
          if (rainbowIndex === 0) {
            clearInterval(rainbowInterval);
            character.style.background = colorSchemes[currentExpression];
            speak("Rainbow mode deactivated. That was colorful!");
          }
        }, 500);
      }
    } else {
      // Reset sequence on wrong key
      konamiIndex = 0;
    }
  });

  // Special reaction to portfolio owner's name
  document.addEventListener("mouseover", function (e) {
    // Check if the element or its children contain the portfolio owner's name
    const targetText = e.target.textContent;
    if (targetText && !isSpeaking) {
      // Check for variations of the name
      if (
        targetText.includes("Jaya Prakash") ||
        targetText.includes("Jaya P.") ||
        targetText.includes("JP") ||
        targetText.includes("Pinninti")
      ) {
        // Lower the chance to react - only 15% chance when hovering over name
        // This reduces the frequency of seemingly random name comments
        if (Math.random() < 0.15) {
          const ownerMessages = [
            "That's my creator!",
            "Jaya Prakash is awesome!",
            "I was created by JP!",
            "That's the portfolio owner!",
            "My maker is talented, right?",
          ];
          const randomMessage =
            ownerMessages[Math.floor(Math.random() * ownerMessages.length)];
          speak(randomMessage);

          // Reduce the heart animation frequency
          if (Math.random() < 0.3) {
            const heart = document.createElement("div");
            heart.textContent = "❤️";
            Object.assign(heart.style, {
              position: "absolute",
              fontSize: "24px",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: "0",
              transition: "all 1.5s ease",
              zIndex: "10000",
            });

            character.appendChild(heart);

            // Animate heart floating up
            setTimeout(() => {
              heart.style.opacity = "1";
              heart.style.transform = "translateX(-50%) translateY(-40px)";

              // Remove heart after animation
              setTimeout(() => {
                character.removeChild(heart);
              }, 1500);
            }, 10);
          }
        }
      }
    }
  });

  // Add day/night awareness
  function checkDayNightCycle() {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 19; // Night time between 7pm and 6am

    if (isNight && !character.classList.contains("night-mode")) {
      // Switch to night mode occasionally
      if (Math.random() < 0.7 && !isSpeaking) {
        character.classList.add("night-mode");
        setExpression("sleepy");
        speak("It's getting late! *yawn*");

        // Add a soft glow to the blob at night
        character.style.boxShadow =
          "0 10px 25px rgba(0, 0, 0, 0.15), inset 0 -10px 15px rgba(255, 255, 255, 0.3), inset 5px -5px 15px rgba(0, 0, 0, 0.1)";
      }
    } else if (!isNight && character.classList.contains("night-mode")) {
      // Switch back to day mode
      character.classList.remove("night-mode");
      setExpression("happy");
      speak("Good morning! A new day!");

      // Restore normal shadow
      character.style.boxShadow =
        "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 -10px 15px rgba(255, 255, 255, 0.7), inset 5px -5px 15px rgba(0, 0, 0, 0.05)";
    }
  }

  // Check day/night cycle every 5 minutes
  setInterval(checkDayNightCycle, 300000);

  // Run once on initialization
  setTimeout(checkDayNightCycle, 5000);

  // 'G' key - Ghost mode (new spooky expression)
  document.addEventListener("keydown", function (e) {
    if (
      e.code === "KeyG" &&
      e.target.tagName !== "INPUT" &&
      e.target.tagName !== "TEXTAREA"
    ) {
      setExpression("spooky");
      speak("OoOoOoOoh! I'm a spoOoOoky ghost!");

      // Add floating and fading animation
      character.style.animation = "float-ghost 3s ease-in-out infinite";

      // Add ghost animation styles if not already present
      if (!document.getElementById("ghost-animation-style")) {
        const style = document.createElement("style");
        style.id = "ghost-animation-style";
        style.textContent = `
          @keyframes float-ghost {
            0% { transform: translateY(0) translateX(0); opacity: 0.9; }
            50% { transform: translateY(-15px) translateX(5px); opacity: 0.8; }
            100% { transform: translateY(0) translateX(0); opacity: 0.9; }
          }
        `;
        document.head.appendChild(style);
      }

      // Return to normal after a while
      setTimeout(() => {
        character.style.animation = "";
        setExpression("happy");
      }, 7000);
    }
  });

  console.log("Floating blob with expressions initialized");

  // Check weather and adjust blob appearance accordingly
  async function checkWeather() {
    try {
      // Get approximate location from IP (no permission needed)
      const response = await fetch("https://geolocation-db.com/json/");
      const locationData = await response.json();

      if (locationData && locationData.latitude && locationData.longitude) {
        // Use a fallback without API key for privacy and to avoid exposing keys
        const weatherResponse = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=abcdef1234567890&q=${locationData.latitude},${locationData.longitude}&aqi=no`
        ).catch(() => ({ ok: false })); // Fake API key, will safely fail

        // If we can't get weather data, we'll silently fail
        if (!weatherResponse.ok) {
          // Attempt weather based on geolocation time
          const date = new Date();
          const hours = date.getHours();

          // Basic weather guesses based on time to avoid API needs
          if (hours >= 19 || hours < 6) {
            // Night time
            return; // Already handled by night mode
          } else if (Math.random() < 0.05) {
            // Drastically reduce chance (from 20% to 5%) to simulate weather
            // This will make weather comments much less frequent and random-seeming
            // Just guess a random weather condition
            const conditions = ["clear", "cloudy", "rainy"];
            const randomCondition =
              conditions[Math.floor(Math.random() * conditions.length)];

            if (randomCondition === "clear") {
              setExpression("happy");
              speak(
                getTranslation(
                  "weather",
                  "clear",
                  "What a lovely clear day today!"
                )
              );
            } else if (randomCondition === "cloudy") {
              setExpression("sleepy");
              speak(
                getTranslation(
                  "weather",
                  "cloudy",
                  "A bit cloudy today, but still nice!"
                )
              );
            } else if (randomCondition === "rainy") {
              setExpression("sleepy");
              speak(
                getTranslation(
                  "weather",
                  "rainy",
                  "Looks rainy outside! Good thing I'm here to cheer you up!"
                )
              );
              addWeatherEffect("rain");
            }
          }
          return;
        }

        const weatherData = await weatherResponse.json();

        // React to different weather conditions
        if (weatherData.current && weatherData.current.condition) {
          const weatherCondition =
            weatherData.current.condition.text.toLowerCase();

          // Don't interrupt if already speaking
          if (isSpeaking) return;

          if (
            weatherCondition.includes("rain") ||
            weatherCondition.includes("drizzle")
          ) {
            setExpression("sleepy");
            speak(
              getTranslation(
                "weather",
                "rainy",
                "Looks rainy outside! Good thing I'm here to cheer you up!"
              )
            );

            // Add rain animation to blob
            addWeatherEffect("rain");
          } else if (weatherCondition.includes("snow")) {
            setExpression("surprised");
            speak(
              getTranslation(
                "weather",
                "snowy",
                "It's snowing! ❄️ Brr, looks cold out there!"
              )
            );

            // Add snow animation to blob
            addWeatherEffect("snow");
          } else if (weatherCondition.includes("thunder")) {
            setExpression("spooky");
            speak(
              getTranslation(
                "weather",
                "thunder",
                "Thunder and lightning! How exciting!"
              )
            );

            // Add lightning effect
            addWeatherEffect("thunder");
          } else if (
            weatherCondition.includes("clear") ||
            weatherCondition.includes("sunny")
          ) {
            setExpression("happy");
            speak(
              getTranslation(
                "weather",
                "clear",
                "What a lovely clear day today!"
              )
            );
          } else if (
            weatherCondition.includes("cloud") ||
            weatherCondition.includes("overcast")
          ) {
            setExpression("sleepy");
            speak(
              getTranslation(
                "weather",
                "cloudy",
                "A bit cloudy today, but still nice!"
              )
            );
          }
        }
      }
    } catch (error) {
      // Silently fail - weather feature is non-critical
      console.log("Weather feature unavailable");
    }
  }

  // Add weather effect animations
  function addWeatherEffect(effect) {
    // Add weather particles container if not already present
    let weatherContainer = character.querySelector(".weather-effects");
    if (!weatherContainer) {
      weatherContainer = document.createElement("div");
      weatherContainer.className = "weather-effects";
      Object.assign(weatherContainer.style, {
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "55%",
        pointerEvents: "none",
        zIndex: "10001",
      });
      character.appendChild(weatherContainer);
    }

    // Clear any existing effects
    weatherContainer.innerHTML = "";

    if (effect === "rain") {
      // Add a few raindrops
      for (let i = 0; i < 5; i++) {
        createRaindrop(weatherContainer);
      }

      // Continue creating raindrops periodically
      const rainInterval = setInterval(() => {
        if (weatherContainer.children.length < 10) {
          createRaindrop(weatherContainer);
        }
      }, 800);

      // Stop after a while
      setTimeout(() => {
        clearInterval(rainInterval);
        setTimeout(() => {
          weatherContainer.remove();
        }, 3000);
      }, 8000);
    } else if (effect === "snow") {
      // Add a few snowflakes
      for (let i = 0; i < 8; i++) {
        createSnowflake(weatherContainer);
      }

      // Continue creating snowflakes periodically
      const snowInterval = setInterval(() => {
        if (weatherContainer.children.length < 15) {
          createSnowflake(weatherContainer);
        }
      }, 800);

      // Stop after a while
      setTimeout(() => {
        clearInterval(snowInterval);
        setTimeout(() => {
          weatherContainer.remove();
        }, 3000);
      }, 8000);
    } else if (effect === "thunder") {
      // Create lightning effect
      flashLightning(weatherContainer);

      // Add more lightning flashes
      const timer1 = setTimeout(() => flashLightning(weatherContainer), 1500);
      const timer2 = setTimeout(() => flashLightning(weatherContainer), 3000);

      // Track timeouts in an array
      const timeouts = [timer1, timer2];

      // Remove effects after a while
      setTimeout(() => {
        // Clear all timeouts
        timeouts.forEach((timeout) => clearTimeout(timeout));

        // Remove container if it still exists
        if (weatherContainer && weatherContainer.parentNode) {
          weatherContainer.remove();
        }
      }, 5000);
    }
  }

  // Create a raindrop element
  function createRaindrop(container) {
    const raindrop = document.createElement("div");
    Object.assign(raindrop.style, {
      position: "absolute",
      background:
        "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.6))",
      width: "2px",
      height: Math.random() * 10 + 10 + "px",
      top: "-10px",
      left: Math.random() * 100 + "%",
      borderRadius: "2px",
      opacity: "0.7",
      transform: "rotate(10deg)",
      transition: "top 1s linear, opacity 0.5s linear",
    });

    container.appendChild(raindrop);

    // Animate raindrop falling
    setTimeout(() => {
      raindrop.style.top = "110%";
    }, 50);

    // Remove raindrop after animation
    setTimeout(() => {
      raindrop.remove();
    }, 1500);
  }

  // Create a snowflake element
  function createSnowflake(container) {
    const snowflake = document.createElement("div");
    const size = Math.random() * 4 + 3;
    Object.assign(snowflake.style, {
      position: "absolute",
      background: "white",
      width: size + "px",
      height: size + "px",
      top: "-5px",
      left: Math.random() * 100 + "%",
      borderRadius: "50%",
      opacity: "0.8",
      boxShadow: "0 0 2px rgba(255,255,255,0.8)",
      transition: "top 3s linear, left 2s ease-in-out, opacity 0.5s linear",
    });

    container.appendChild(snowflake);

    // Animate snowflake falling with drift
    setTimeout(() => {
      const drift = Math.random() * 40 - 20;
      const newLeft = parseFloat(snowflake.style.left) + drift;
      snowflake.style.left = newLeft + "%";
      snowflake.style.top = "110%";
    }, 50);

    // Remove snowflake after animation
    setTimeout(() => {
      snowflake.remove();
    }, 3000);
  }

  // Create lightning flash effect
  function flashLightning(container) {
    const flash = document.createElement("div");
    Object.assign(flash.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "white",
      opacity: "0",
      transition: "opacity 0.1s ease",
      borderRadius: "55%",
      zIndex: "1",
    });

    container.appendChild(flash);

    // Flash animation
    setTimeout(() => {
      flash.style.opacity = "0.7";
      setTimeout(() => {
        flash.style.opacity = "0";
        setTimeout(() => {
          flash.style.opacity = "0.5";
          setTimeout(() => {
            flash.style.opacity = "0";
            flash.remove();
          }, 50);
        }, 80);
      }, 50);
    }, 50);
  }

  // Check weather once on load (with delay to avoid initial overload)
  setTimeout(checkWeather, 10000);

  // Responsive positioning - adjust blob for different screen sizes
  function adjustForScreenSize() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Handle mobile screens
    if (viewportWidth < 768) {
      // On mobile, position blob at the bottom right by default
      if (!character.hasAttribute("data-user-positioned")) {
        characterX = viewportWidth - 150;
        characterY = viewportHeight - 150;
        character.style.left = characterX + "px";
        character.style.top = characterY + "px";

        // Make blob smaller on very small screens
        if (viewportWidth < 400) {
          // Very small screens (most phones)
          character.style.width = "100px";
          character.style.height = "100px";

          // Scale facial features proportionally
          const eyesContainer = character.querySelector(".eyes-container");
          if (eyesContainer) {
            eyesContainer.style.top = "25px";
            eyesContainer.style.padding = "0 22px";
          }

          // Scale eyes
          const eyes = character.querySelectorAll(".blob-eye");
          eyes.forEach((eye) => {
            eye.style.width = "18px";
            eye.style.height = "18px";
            eye.style.border = "2px solid #333";
          });

          // Scale pupils
          const pupils = character.querySelectorAll(".blob-pupil");
          pupils.forEach((pupil) => {
            pupil.style.width = "7px";
            pupil.style.height = "7px";
            pupil.style.top = "6px";
            pupil.style.left = "6px";
          });

          // Scale mouth
          const mouthContainer = character.querySelector(".mouth-container");
          if (mouthContainer) {
            mouthContainer.style.bottom = "30px";
          }

          // Scale cheeks
          const cheeks = character.querySelectorAll(".blob-cheek");
          cheeks.forEach((cheek) => {
            cheek.style.width = "12px";
            cheek.style.height = "6px";
            cheek.style.bottom = "35px";
          });
          if (cheeks[0]) cheeks[0].style.left = "18px";
          if (cheeks[1]) cheeks[1].style.right = "18px";

          // Adjust speech bubble for very small screens
          speechBubble.style.maxWidth =
            Math.min(180, viewportWidth * 0.5) + "px";
          speechBubble.style.fontSize = "14px";
          speechBubble.style.padding = "8px";
        } else {
          // Medium mobile screens
          character.style.width = "120px";
          character.style.height = "120px";

          // Scale facial features proportionally
          const eyesContainer = character.querySelector(".eyes-container");
          if (eyesContainer) {
            eyesContainer.style.top = "32px";
            eyesContainer.style.padding = "0 28px";
          }

          // Scale eyes
          const eyes = character.querySelectorAll(".blob-eye");
          eyes.forEach((eye) => {
            eye.style.width = "22px";
            eye.style.height = "22px";
            eye.style.border = "3px solid #333";
          });

          // Scale pupils
          const pupils = character.querySelectorAll(".blob-pupil");
          pupils.forEach((pupil) => {
            pupil.style.width = "8px";
            pupil.style.height = "8px";
            pupil.style.top = "7px";
            pupil.style.left = "7px";
          });

          // Scale mouth
          const mouthContainer = character.querySelector(".mouth-container");
          if (mouthContainer) {
            mouthContainer.style.bottom = "35px";
          }

          // Scale cheeks
          const cheeks = character.querySelectorAll(".blob-cheek");
          cheeks.forEach((cheek) => {
            cheek.style.width = "14px";
            cheek.style.height = "7px";
            cheek.style.bottom = "40px";
          });
          if (cheeks[0]) cheeks[0].style.left = "22px";
          if (cheeks[1]) cheeks[1].style.right = "22px";

          // Adjust speech bubble
          speechBubble.style.maxWidth =
            Math.min(200, viewportWidth * 0.6) + "px";
          speechBubble.style.fontSize = "15px";
          speechBubble.style.padding = "10px";
        }

        // Ensure speech bubbles are positioned correctly on mobile
        if (speechBubble) {
          // On small screens, always put speech bubble above the blob
          speechBubble.style.left = "0";
          speechBubble.style.top = "-120px";
          speechBubbleTail.style.left = "50%";
          speechBubbleTail.style.marginLeft = "-10px";
          speechBubbleTail.style.bottom = "-10px";
          speechBubbleTail.style.right = "auto";
          speechBubbleTail.style.top = "auto";
          speechBubbleTail.style.borderWidth = "10px 10px 0 10px";
          speechBubbleTail.style.borderColor = `${speechBubble.style.borderColor} transparent transparent transparent`;
        }
      }
    } else {
      // Reset to normal size on larger screens
      if (!character.getAttribute("data-custom-size")) {
        character.style.width = "130px";
        character.style.height = "130px";

        // Reset facial features to original sizes
        const eyesContainer = character.querySelector(".eyes-container");
        if (eyesContainer) {
          eyesContainer.style.top = "35px";
          eyesContainer.style.padding = "0 30px";
        }

        // Reset eyes
        const eyes = character.querySelectorAll(".blob-eye");
        eyes.forEach((eye) => {
          eye.style.width = "24px";
          eye.style.height = "24px";
          eye.style.border = "3px solid #333";
        });

        // Reset pupils
        const pupils = character.querySelectorAll(".blob-pupil");
        pupils.forEach((pupil) => {
          pupil.style.width = "9px";
          pupil.style.height = "9px";
          pupil.style.top = "8px";
          pupil.style.left = "8px";
        });

        // Reset mouth
        const mouthContainer = character.querySelector(".mouth-container");
        if (mouthContainer) {
          mouthContainer.style.bottom = "40px";
        }

        // Reset cheeks
        const cheeks = character.querySelectorAll(".blob-cheek");
        cheeks.forEach((cheek) => {
          cheek.style.width = "15px";
          cheek.style.height = "8px";
          cheek.style.bottom = "45px";
        });
        if (cheeks[0]) cheeks[0].style.left = "25px";
        if (cheeks[1]) cheeks[1].style.right = "25px";
      }

      // Reset speech bubble size
      speechBubble.style.maxWidth = "220px";
      speechBubble.style.fontSize = "16px";
      speechBubble.style.padding = "12px";
    }
  }

  // Improve speech bubble positioning
  function positionSpeechBubble() {
    const blobRect = character.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth < 768;

    // Determine border color based on current expression
    let borderColor = "#8de2d9"; // Default color

    // Get current accent color from the character's background
    const charStyle = window.getComputedStyle(character);
    const charBg = charStyle.background || charStyle.backgroundColor;

    if (charBg && charBg.includes("gradient")) {
      // Try to extract color from gradient
      const match = charBg.match(/#[a-f0-9]{6}|#[a-f0-9]{3}|rgba?\([^)]+\)/gi);
      if (match && match.length > 0) {
        borderColor = match[1] || match[0]; // Use second color in gradient if available
      }
    }

    // Mobile-specific positioning
    if (isMobile) {
      // On small screens, always put speech bubble above the blob
      speechBubble.style.left = "0";
      speechBubble.style.top = "-120px";
      speechBubbleTail.style.left = "50%";
      speechBubbleTail.style.marginLeft = "-10px";
      speechBubbleTail.style.bottom = "-10px";
      speechBubbleTail.style.right = "auto";
      speechBubbleTail.style.top = "auto";
      speechBubbleTail.style.borderWidth = "10px 10px 0 10px";
      speechBubbleTail.style.borderColor = `${borderColor} transparent transparent transparent`;
    }
    // Desktop positioning
    else if (blobRect.right > windowWidth - 250) {
      // If blob is near the right edge of the screen, put bubble on the left
      speechBubble.style.left = "-230px";
      speechBubble.style.top = "30px";
      speechBubbleTail.style.left = "100%";
      speechBubbleTail.style.right = "auto";
      speechBubbleTail.style.bottom = "50%";
      speechBubbleTail.style.marginBottom = "-10px";
      speechBubbleTail.style.borderWidth = "10px 0 10px 10px";
      speechBubbleTail.style.borderColor = `transparent transparent transparent ${borderColor}`;
    }
    // Default: put bubble on the right
    else {
      speechBubble.style.left = "140px";
      speechBubble.style.top = "30px";
      speechBubbleTail.style.left = "-10px";
      speechBubbleTail.style.right = "auto";
      speechBubbleTail.style.bottom = "50%";
      speechBubbleTail.style.marginBottom = "-10px";
      speechBubbleTail.style.borderWidth = "10px 10px 10px 0";
      speechBubbleTail.style.borderColor = `transparent ${borderColor} transparent transparent`;
    }

    // Set speech bubble border color
    speechBubble.style.borderColor = borderColor;
  }

  // Run the screen size adjustment on resize
  window.addEventListener("resize", adjustForScreenSize);

  // Run once at start
  setTimeout(adjustForScreenSize, 1000);

  // Mark when user has manually positioned the blob
  document.addEventListener("click", function (e) {
    const blobRect = character.getBoundingClientRect();
    const distX = e.clientX - (blobRect.left + blobRect.width / 2);
    const distY = e.clientY - (blobRect.top + blobRect.height / 2);
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 100) {
      character.setAttribute("data-user-positioned", "true");
    }
  });

  // Add memory capability to the blob
  const blobMemory = {
    visitCount: 0,
    lastVisit: null,
    favoriteSection: null,
    sectionVisits: {},
    interactionCount: 0,
  };

  // Try to load memory from localStorage
  function loadBlobMemory() {
    try {
      const savedMemory = localStorage.getItem("blobMemory");
      if (savedMemory) {
        const parsedMemory = JSON.parse(savedMemory);

        // Update memory with saved values but keep structure intact
        blobMemory.visitCount = parsedMemory.visitCount || 0;
        blobMemory.lastVisit = parsedMemory.lastVisit || null;
        blobMemory.favoriteSection = parsedMemory.favoriteSection || null;
        blobMemory.sectionVisits = parsedMemory.sectionVisits || {};
        blobMemory.interactionCount = parsedMemory.interactionCount || 0;

        // Greet returning visitor
        const lastVisitDate = blobMemory.lastVisit
          ? new Date(blobMemory.lastVisit)
          : null;
        const now = new Date();

        blobMemory.visitCount++;

        if (lastVisitDate && blobMemory.visitCount > 1) {
          // Calculate days since last visit
          const daysSinceLastVisit = Math.floor(
            (now - lastVisitDate) / (1000 * 60 * 60 * 24)
          );

          if (daysSinceLastVisit < 1) {
            setTimeout(() => {
              setExpression("excited");
              speak("Welcome back! Nice to see you again today!");
            }, 2000);
          } else if (daysSinceLastVisit < 7) {
            setTimeout(() => {
              setExpression("excited");
              speak(
                `Welcome back! It's been ${daysSinceLastVisit} day${
                  daysSinceLastVisit > 1 ? "s" : ""
                } since your last visit!`
              );
            }, 2000);
          } else if (daysSinceLastVisit < 30) {
            setTimeout(() => {
              setExpression("surprised");
              speak("Wow, you're back! It's been a while!");
            }, 2000);
          } else {
            setTimeout(() => {
              setExpression("excited");
              speak("Oh my! You've returned after so long! Welcome back!");
            }, 2000);
          }

          // If user has a favorite section, mention it
          if (blobMemory.favoriteSection) {
            setTimeout(() => {
              speak(
                `I remember you liked the ${blobMemory.favoriteSection} section. Want to check it out again?`
              );
            }, 5000);
          }
        }

        // Update last visit
        blobMemory.lastVisit = now.toISOString();
      } else {
        // First visit
        blobMemory.visitCount = 1;
        blobMemory.lastVisit = new Date().toISOString();
      }
    } catch (error) {
      console.log("Error loading blob memory:", error);
    }

    // Save initial/updated memory
    saveBlobMemory();
  }

  // Save memory to localStorage
  function saveBlobMemory() {
    try {
      localStorage.setItem("blobMemory", JSON.stringify(blobMemory));
    } catch (error) {
      console.log("Error saving blob memory:", error);
    }
  }

  // Update section visits and determine favorite
  function updateSectionMemory(sectionId) {
    if (!sectionId) return;

    if (!blobMemory.sectionVisits[sectionId]) {
      blobMemory.sectionVisits[sectionId] = 0;
    }

    blobMemory.sectionVisits[sectionId]++;

    // Determine favorite section (most visited)
    let maxVisits = 0;
    for (const section in blobMemory.sectionVisits) {
      if (blobMemory.sectionVisits[section] > maxVisits) {
        maxVisits = blobMemory.sectionVisits[section];
        blobMemory.favoriteSection = section;
      }
    }

    saveBlobMemory();
  }

  // Track user interactions with blob
  function trackInteraction() {
    blobMemory.interactionCount++;
    saveBlobMemory();

    // Milestone achievements
    if (blobMemory.interactionCount === 10) {
      speak("We're becoming friends! You've interacted with me 10 times!");
    } else if (blobMemory.interactionCount === 50) {
      speak("Wow! 50 interactions! You must really like me!");
    }
  }

  // Color theme awareness - detect and match website theme
  function detectColorTheme() {
    try {
      // Check if the website uses a dark theme
      const isDarkTheme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      // Check for actual dark mode by sampling background color
      const bodyBgColor = window.getComputedStyle(
        document.body
      ).backgroundColor;
      const isBodyDark = isColorDark(bodyBgColor);

      // If body has dark background or system prefers dark
      if (
        isBodyDark ||
        (isDarkTheme && !character.classList.contains("dark-mode-aware"))
      ) {
        character.classList.add("dark-mode-aware");

        // Adjust blob for dark mode - brighter colors and glow
        Object.assign(character.style, {
          filter: "drop-shadow(0 8px 25px rgba(141, 226, 217, 0.4))",
          boxShadow:
            "0 10px 25px rgba(0, 0, 0, 0.25), inset 0 -10px 15px rgba(255, 255, 255, 0.8), inset 5px -5px 15px rgba(0, 0, 0, 0.1)",
        });

        // Make eyes stand out more in dark mode
        leftEye.style.backgroundColor = "white";
        rightEye.style.backgroundColor = "white";
        leftEye.style.borderColor = "#444";
        rightEye.style.borderColor = "#444";

        // Make speech bubble more visible on dark backgrounds
        Object.assign(speechBubble.style, {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 5px 15px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.1)",
          color: "#222",
        });

        // Update bubble tail to match
        speechBubbleTail.style.borderColor =
          "transparent rgba(255, 255, 255, 0.95) transparent transparent";
      } else if (
        !isBodyDark &&
        character.classList.contains("dark-mode-aware")
      ) {
        // Switch back to light mode
        character.classList.remove("dark-mode-aware");

        // Reset styles to original
        setExpression(currentExpression);
      }
    } catch (error) {
      console.log("Error detecting color theme:", error);
    }
  }

  // Helper function to determine if a color is dark
  function isColorDark(rgbColor) {
    try {
      // Extract RGB values
      const rgb = rgbColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const [r, g, b] = rgb.map(Number);
        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // Check for special dates and holidays
  function checkSpecialDates() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();

    // Add a safety check to prevent false positive special dates
    // Only check once per day and store result in localStorage
    const today = `${now.getFullYear()}-${month}-${day}`;
    const lastCheckedDate = localStorage.getItem("lastSpecialDateCheck");

    if (lastCheckedDate === today) {
      // Already checked today, don't repeat
      return;
    }

    // Save that we checked today
    localStorage.setItem("lastSpecialDateCheck", today);

    const specialOccasion = getSpecialOccasion(month, day);

    if (specialOccasion) {
      setTimeout(() => {
        setExpression("excited");
        speak(specialOccasion.message);

        // Add festive effects if available
        if (specialOccasion.effect) {
          addFestiveEffect(specialOccasion.effect);
        }
      }, 3000);
    }
  }

  // Determine special occasions based on date
  function getSpecialOccasion(month, day) {
    // Exact matches for special dates, no ranges to prevent false positives

    // New Year's Day
    if (month === 1 && day === 1) {
      return {
        message: "Happy New Year! 🎉 Here's to a wonderful year ahead!",
        effect: "confetti",
      };
    }

    // Valentine's Day
    if (month === 2 && day === 14) {
      return {
        message: "Happy Valentine's Day! ❤️ Spread the love!",
        effect: "hearts",
      };
    }

    // St. Patrick's Day
    if (month === 3 && day === 17) {
      return {
        message: "Happy St. Patrick's Day! ☘️ Feeling lucky?",
        effect: "clovers",
      };
    }

    // April Fools
    if (month === 4 && day === 1) {
      return {
        message:
          "April Fools' Day! Don't worry, I won't play any pranks on you... or will I? 😏",
        effect: "trick",
      };
    }

    // Halloween
    if (month === 10 && day === 31) {
      return {
        message: "Happy Halloween! 🎃 Trick or treat!",
        effect: "halloween",
      };
    }

    // Thanksgiving (US) - Hardcoded dates to avoid false positives
    // 2024: Nov 28, 2025: Nov 27
    const year = new Date().getFullYear();
    if (
      (year === 2024 && month === 11 && day === 28) ||
      (year === 2025 && month === 11 && day === 27)
    ) {
      return {
        message: "Happy Thanksgiving! 🦃 I'm thankful for your visit!",
        effect: "thanksgiving",
      };
    }

    // Christmas
    if (month === 12 && day === 25) {
      return {
        message: "Merry Christmas! 🎄 Wishing you joy and happiness!",
        effect: "christmas",
      };
    }

    // Christmas Eve
    if (month === 12 && day === 24) {
      return {
        message: "It's Christmas Eve! 🎁 Excitement is in the air!",
        effect: "christmas",
      };
    }

    // New Year's Eve
    if (month === 12 && day === 31) {
      return {
        message: "Happy New Year's Eve! 🎆 Ready to count down?",
        effect: "confetti",
      };
    }

    return null;
  }

  // Add festive effects based on special occasions
  function addFestiveEffect(effectType) {
    switch (effectType) {
      case "confetti":
        createConfetti();
        break;
      case "hearts":
        createHearts();
        break;
      case "halloween":
        setExpression("spooky");
        // Add jack-o-lantern hat
        addHat("🎃");
        break;
      case "christmas":
        // Add Santa hat
        addHat("🎅");
        break;
      case "thanksgiving":
        // Add turkey effect
        addHat("🦃");
        break;
    }
  }

  // Create confetti effect around blob
  function createConfetti() {
    const count = 30;
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        Object.assign(confetti.style, {
          position: "absolute",
          width: size + "px",
          height: size + "px",
          backgroundColor: color,
          borderRadius: "2px",
          opacity: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: "9997",
        });

        character.appendChild(confetti);

        // Animate the confetti out in random directions
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const duration = 1000 + Math.random() * 1000;

        confetti.animate(
          [
            { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1 },
            {
              transform: `translate(calc(-50% + ${
                Math.cos(angle) * distance
              }px), calc(-50% + ${Math.sin(angle) * distance}px)) rotate(${
                Math.random() * 360
              }deg)`,
              opacity: 0,
            },
          ],
          {
            duration: duration,
            easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
          }
        );

        setTimeout(() => {
          confetti.remove();
        }, duration);
      }, Math.random() * 1000); // Stagger the creation
    }
  }

  // Create heart particles
  function createHearts() {
    const count = 15;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.textContent = "❤️";
        const size = 14 + Math.random() * 10;

        Object.assign(heart.style, {
          position: "absolute",
          fontSize: size + "px",
          opacity: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: "9997",
        });

        character.appendChild(heart);

        // Animate the heart floating up
        const angle =
          -Math.PI / 2 + ((Math.random() * Math.PI) / 4 - Math.PI / 8); // Mostly upward
        const distance = 50 + Math.random() * 70;
        const duration = 2000 + Math.random() * 1000;

        heart.animate(
          [
            { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
            {
              transform: `translate(calc(-50% + ${
                Math.cos(angle) * distance
              }px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1.2)`,
              opacity: 0.7,
              offset: 0.6,
            },
            {
              transform: `translate(calc(-50% + ${
                Math.cos(angle) * distance * 1.2
              }px), calc(-50% + ${
                Math.sin(angle) * distance * 1.2
              }px)) scale(0.5)`,
              opacity: 0,
            },
          ],
          {
            duration: duration,
            easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
          }
        );

        setTimeout(() => {
          heart.remove();
        }, duration);
      }, Math.random() * 1500);
    }
  }

  // Add hat to blob for holidays
  function addHat(emoji) {
    const hat = document.createElement("div");
    hat.textContent = emoji;
    Object.assign(hat.style, {
      position: "absolute",
      fontSize: "30px",
      top: "-25px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "10001",
    });

    // Add a subtle bobbing animation
    hat.animate(
      [
        { transform: "translateX(-50%) translateY(0px)" },
        { transform: "translateX(-50%) translateY(-3px)" },
        { transform: "translateX(-50%) translateY(0px)" },
      ],
      {
        duration: 2000,
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );

    character.appendChild(hat);

    // Remove after some time
    setTimeout(() => {
      if (hat.parentNode === character) {
        character.removeChild(hat);
      }
    }, 60000); // Remove after a minute
  }

  // Add smooth entrance animation when blob first appears
  function addEntranceAnimation() {
    // Store original transform for restoration
    const originalTransform = character.style.transform;

    // Start off-screen
    character.style.opacity = "0";

    // Use Web Animations API instead of style.transform to avoid conflicts
    const enterAnimation = character.animate(
      [
        { transform: "translateY(100vh) scale(0.8)", opacity: 0 },
        { transform: "translateY(0) scale(1.1)", opacity: 1, offset: 0.8 },
        { transform: "translateY(0) scale(1)", opacity: 1 },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "forwards",
      }
    );

    enterAnimation.onfinish = () => {
      // Only restore opacity via style
      character.style.opacity = "1";
      // Don't set transform directly to avoid conflicts with animations
    };
  }

  // Fix conflicts between parallax and transform in scroll event
  window.addEventListener("scroll", function () {
    // Get scroll position
    const scrollPos = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPos / maxScroll;

    // Different reactions based on scroll depth
    if (scrollPercentage > 0.95 && !isSpeaking) {
      // Near the bottom of the page
      setExpression("excited");
      if (Math.random() < 0.2) {
        // Don't speak too often
        speak(
          getTranslation(
            "scroll",
            "bottom",
            "Wow, you've reached the bottom! Thanks for exploring everything!"
          )
        );
      }
    } else if (
      scrollPercentage > 0.8 &&
      scrollPercentage < 0.9 &&
      !isSpeaking &&
      Math.random() < 0.1
    ) {
      // Almost at the bottom
      setExpression("surprised");
      speak(
        getTranslation(
          "scroll",
          "almostBottom",
          "Almost at the end! Keep going!"
        )
      );
    } else if (
      scrollPercentage > 0.5 &&
      scrollPercentage < 0.6 &&
      !isSpeaking &&
      Math.random() < 0.1
    ) {
      // Middle of the page
      speak(
        getTranslation(
          "scroll",
          "middle",
          "You're halfway through! So much cool stuff, right?"
        )
      );
    }

    // Add parallax effect to blob based on scroll - use animation API instead of direct transform
    if (!isFollowingCursor && !isExploring && !character.style.animation) {
      const parallaxAmount = scrollPos * 0.05;
      // Use animate() instead of directly setting transform
      character.animate([{ transform: `translateY(${parallaxAmount}px)` }], {
        duration: 300,
        fill: "forwards",
        easing: "ease-out",
      });
    }
  });

  // Fix potential memory leaks with weather effects
  function addWeatherEffect(effect) {
    // Add weather particles container if not already present
    let weatherContainer = character.querySelector(".weather-effects");

    // Always remove existing container to prevent memory leaks
    if (weatherContainer) {
      weatherContainer.remove();
    }

    // Create new container
    weatherContainer = document.createElement("div");
    weatherContainer.className = "weather-effects";
    Object.assign(weatherContainer.style, {
      position: "absolute",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: "55%",
      pointerEvents: "none",
      zIndex: "10001",
    });
    character.appendChild(weatherContainer);

    // Store any intervals to clear later
    const intervals = [];

    if (effect === "rain") {
      // Add a few raindrops
      for (let i = 0; i < 5; i++) {
        createRaindrop(weatherContainer);
      }

      // Continue creating raindrops periodically
      const rainInterval = setInterval(() => {
        if (weatherContainer && weatherContainer.children.length < 10) {
          createRaindrop(weatherContainer);
        }
      }, 800);

      intervals.push(rainInterval);

      // Stop after a while
      setTimeout(() => {
        // Clear all intervals
        intervals.forEach((interval) => clearInterval(interval));

        // Remove container if it still exists
        if (weatherContainer && weatherContainer.parentNode) {
          weatherContainer.remove();
        }
      }, 8000);
    } else if (effect === "snow") {
      // Add a few snowflakes
      for (let i = 0; i < 8; i++) {
        createSnowflake(weatherContainer);
      }

      // Continue creating snowflakes periodically
      const snowInterval = setInterval(() => {
        if (weatherContainer && weatherContainer.children.length < 15) {
          createSnowflake(weatherContainer);
        }
      }, 800);

      intervals.push(snowInterval);

      // Stop after a while
      setTimeout(() => {
        // Clear all intervals
        intervals.forEach((interval) => clearInterval(interval));

        // Remove container if it still exists
        if (weatherContainer && weatherContainer.parentNode) {
          weatherContainer.remove();
        }
      }, 8000);
    } else if (effect === "thunder") {
      // Create lightning effect
      flashLightning(weatherContainer);

      // Add more lightning flashes
      const timer1 = setTimeout(() => flashLightning(weatherContainer), 1500);
      const timer2 = setTimeout(() => flashLightning(weatherContainer), 3000);

      // Track timeouts in an array
      const timeouts = [timer1, timer2];

      // Remove effects after a while
      setTimeout(() => {
        // Clear all timeouts
        timeouts.forEach((timeout) => clearTimeout(timeout));

        // Remove container if it still exists
        if (weatherContainer && weatherContainer.parentNode) {
          weatherContainer.remove();
        }
      }, 5000);
    }
  }

  // Fix translations object by adding missing weather and scroll categories
  if (!window.translationsInitialized) {
    translations.en = translations.en || {};
    translations.es = translations.es || {};

    // Add weather translations if not present
    if (!translations.en.weather) {
      translations.en.weather = {
        rainy: "Looks rainy outside! Good thing I'm here to cheer you up!",
        snowy: "It's snowing! ❄️ Brr, looks cold out there!",
        thunder: "Thunder and lightning! How exciting!",
        clear: "What a lovely clear day today!",
        cloudy: "A bit cloudy today, but still nice!",
      };
    }

    if (!translations.es.weather) {
      translations.es.weather = {
        rainy:
          "¡Parece que llueve afuera! ¡Menos mal que estoy aquí para animarte!",
        snowy: "¡Está nevando! ❄️ ¡Brr, parece que hace frío ahí fuera!",
        thunder: "¡Truenos y relámpagos! ¡Qué emocionante!",
        clear: "¡Qué día tan hermoso hoy!",
        cloudy: "Un poco nublado hoy, ¡pero sigue siendo agradable!",
      };
    }

    // Add scroll translations if not present
    if (!translations.en.scroll) {
      translations.en.scroll = {
        bottom:
          "Wow, you've reached the bottom! Thanks for exploring everything!",
        almostBottom: "Almost at the end! Keep going!",
        middle: "You're halfway through! So much cool stuff, right?",
      };
    }

    if (!translations.es.scroll) {
      translations.es.scroll = {
        bottom: "¡Vaya, has llegado al final! ¡Gracias por explorar todo!",
        almostBottom: "¡Casi al final! ¡Sigue adelante!",
        middle: "¡Estás a mitad de camino! Muchas cosas interesantes, ¿verdad?",
      };
    }

    window.translationsInitialized = true;
  }

  // Fix ghost mode animation
  document.addEventListener("keydown", function (e) {
    if (
      e.code === "KeyG" &&
      e.target.tagName !== "INPUT" &&
      e.target.tagName !== "TEXTAREA"
    ) {
      setExpression("spooky");
      speak("OoOoOoOoh! I'm a spoOoOoky ghost!");

      // Cancel any existing animations
      const animations = character.getAnimations();
      animations.forEach((animation) => animation.cancel());

      // Add floating and fading animation
      const ghostAnimation = character.animate(
        [
          { transform: "translateY(0) translateX(0)", opacity: 0.9 },
          { transform: "translateY(-15px) translateX(5px)", opacity: 0.8 },
          { transform: "translateY(0) translateX(0)", opacity: 0.9 },
        ],
        {
          duration: 3000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );

      // Return to normal after a while
      setTimeout(() => {
        ghostAnimation.cancel();
        setExpression("happy");
      }, 7000);
    }
  });

  // Add proper cleanup of intervals
  let dayNightInterval;

  function startDayNightCycle() {
    // Clear existing interval if any
    if (dayNightInterval) {
      clearInterval(dayNightInterval);
    }

    // Check once immediately
    checkDayNightCycle();

    // Set up new interval
    dayNightInterval = setInterval(checkDayNightCycle, 300000);
  }

  // Start the day/night cycle
  startDayNightCycle();

  // Initialize with translations for all necessary categories
  function initializeTranslations() {
    // Make sure all translation categories exist
    const requiredCategories = [
      "greetings",
      "idle",
      "hover",
      "following",
      "sections",
      "accessibility",
      "weather",
      "scroll",
    ];

    // Ensure all languages have all categories
    Object.keys(translations).forEach((lang) => {
      requiredCategories.forEach((category) => {
        if (!translations[lang][category]) {
          // Create empty category if missing
          translations[lang][category] = {};
          console.log(
            `Warning: Missing translation category '${category}' for language '${lang}'`
          );
        }
      });
    });
  }

  // Run translation initialization
  initializeTranslations();

  // Add 3D rotation toggle button
  const rotateButton = document.createElement("button");
  rotateButton.id = "rotate-blob";
  rotateButton.textContent = "3D";
  Object.assign(rotateButton.style, {
    position: "absolute",
    bottom: "-15px",
    right: "-15px",
    width: "30px",
    height: "30px",
    backgroundColor: "#4fc3f7",
    color: "white",
    border: "none",
    borderRadius: "50%",
    fontSize: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    zIndex: "10000",
    pointerEvents: "auto",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  });

  // Add 3D rotation functionality
  let isRotating = false;
  let rotationInterval;

  rotateButton.addEventListener("click", function (e) {
    e.stopPropagation();

    if (!isRotating) {
      // Start rotating
      isRotating = true;
      rotateButton.textContent = "2D";
      rotateButton.style.backgroundColor = "#f44336";

      // Make sure the face is visible during rotation
      face.style.backfaceVisibility = "visible";

      // Speech bubble for 3D effect
      speak("Whoa! I'm truly spherical! Watch me spin in 3D! 🌐");

      // Start continuous rotation with multiple axes for more dynamic effect
      let rotateX = 0;
      let rotateY = 0;
      let rotateZ = 0;
      let time = 0;

      rotationInterval = setInterval(() => {
        time += 0.03;

        // Create more interesting rotation patterns using sine waves
        rotateX = 20 * Math.sin(time * 0.5);
        rotateY += 2;
        if (rotateY >= 360) rotateY = 0;
        rotateZ = 10 * Math.sin(time * 0.7);

        // Apply rotation transformation with multiple axes
        const rotation = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        character.style.transform = rotation;

        // Dynamically adjust lighting based on angle for more 3D effect
        const highlightOpacity = 0.7 - Math.abs(rotateY - 180) / 360;
        highlight.style.opacity = Math.max(0.2, highlightOpacity).toString();

        // Move highlight position based on rotation to simulate light source
        const highlightX = 30 + 20 * Math.sin((rotateY * Math.PI) / 180);
        const highlightY = 20 + 15 * Math.sin((rotateX * Math.PI) / 180);
        highlight.style.left = `${highlightX}px`;
        highlight.style.top = `${highlightY}px`;

        // For more realistic 3D effect, sometimes hide the face when rotating away from viewer
        if (rotateY > 90 && rotateY < 270) {
          // Back side of sphere, face should be hidden or minimized
          face.style.opacity = Math.max(
            0.1,
            1 - Math.sin(((rotateY - 90) * Math.PI) / 180)
          ).toString();
          face.style.transform = `scaleX(${
            0.5 + 0.3 * Math.cos((rotateY * Math.PI) / 180)
          }) scaleY(${0.7 + 0.3 * Math.cos((rotateY * Math.PI) / 180)})`;
        } else {
          // Front side of sphere, face fully visible
          face.style.opacity = "1";
          face.style.transform = `scaleX(${
            0.8 + 0.2 * Math.cos((rotateY * Math.PI) / 180)
          }) scaleY(1)`;
        }

        // Add occasional wobble for more playful effect
        if (Math.random() < 0.01) {
          const wobbleX = Math.random() * 40 - 20;
          const wobbleY = Math.random() * 40 - 20;
          character.style.transform += ` translate(${wobbleX}px, ${wobbleY}px)`;

          // Quick bounce back
          setTimeout(() => {
            if (isRotating) {
              character.style.transform = rotation;
            }
          }, 150);
        }
      }, 30);
    } else {
      // Stop rotating
      isRotating = false;
      rotateButton.textContent = "3D";
      rotateButton.style.backgroundColor = "#4fc3f7";

      // Clear the rotation interval
      clearInterval(rotationInterval);

      // Reset to original position
      character.style.transform = "none";
      face.style.transform = "none";
      face.style.opacity = "1";
      highlight.style.opacity = "0.7";
      highlight.style.left = "30px";
      highlight.style.top = "20px";

      speak("Back to normal mode! That was fun!");
    }
  });

  // Add a "crazy mode" double-click on the 3D button
  rotateButton.addEventListener("dblclick", function (e) {
    e.stopPropagation();

    // Always reset first
    if (isRotating) {
      clearInterval(rotationInterval);
    }

    // Set to rotating state
    isRotating = true;
    rotateButton.textContent = "STOP!";
    rotateButton.style.backgroundColor = "#ff1744";

    speak("WOOOAAAAH! I'm going CRAZY! 🤪");

    // Extreme 3D madness mode with rapid unpredictable rotations
    let time = 0;
    rotationInterval = setInterval(() => {
      time += 0.1;

      // Chaotic rotations using complex sine/cosine combinations
      const rotateX = 180 * Math.sin(time * 1.2) * Math.cos(time * 0.5);
      const rotateY = 180 * Math.sin(time) * Math.cos(time * 0.8);
      const rotateZ = 90 * Math.sin(time * 0.7);

      // Apply wild rotation
      const rotation = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
      character.style.transform = rotation;

      // Random scaling for pulsing effect
      const scale = 0.8 + 0.4 * Math.sin(time * 2);
      character.style.transform += ` scale(${scale})`;

      // Radomly move highlight for chaotic lighting
      highlight.style.opacity = Math.random().toString();
      highlight.style.left = `${Math.random() * 100}px`;
      highlight.style.top = `${Math.random() * 100}px`;

      // Make face go wild too
      face.style.opacity = 0.3 + 0.7 * Math.random();
      face.style.transform = `scaleX(${0.5 + Math.random()}) scaleY(${
        0.5 + Math.random()
      })`;
    }, 40);
  });

  character.appendChild(rotateButton);

  // Add proper touch event handling for mobile
  character.addEventListener("touchstart", function (e) {
    e.preventDefault(); // Prevent scrolling when touching the blob
    trackInteraction();

    // Simulate click behavior on touch
    if (e.touches.length === 1) {
      const touch = e.touches[0];

      // Store initial position for potential drag
      initialTouchX = touch.clientX;
      initialTouchY = touch.clientY;

      // Mark as being touched
      isTouched = true;
      touchStartTime = Date.now();
    }
  });

  character.addEventListener("touchmove", function (e) {
    e.preventDefault();

    if (isTouched && e.touches.length === 1) {
      const touch = e.touches[0];

      // Calculate distance moved
      const dx = touch.clientX - initialTouchX;
      const dy = touch.clientY - initialTouchY;

      // If moved enough, consider it a drag
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        isDragging = true;

        // Update character position
        characterX += dx;
        characterY += dy;

        // Apply position
        character.style.left = characterX + "px";
        character.style.top = characterY + "px";

        // Update initial position for next move
        initialTouchX = touch.clientX;
        initialTouchY = touch.clientY;

        // Mark as user-positioned
        character.setAttribute("data-user-positioned", "true");
      }
    }
  });

  character.addEventListener("touchend", function (e) {
    e.preventDefault();

    // If it was a quick tap (not a drag)
    if (isTouched && !isDragging && Date.now() - touchStartTime < 300) {
      setExpression("excited");
      speak(
        getTranslation(
          "hover",
          Math.floor(Math.random() * 5),
          "Hello there! *waves*"
        )
      );
    }

    // Reset touch states
    isTouched = false;
    isDragging = false;
  });

  // Enhanced variables
  let eyeMovementDelay = 0.07;
  let originalMouthWidth;
  let currentRotationDegree = 0;
  let jumpHeight = 0;
  let isJumping = false;
  let hovered = false;
  let isDancing = false;
  let lastDetectedSection = null;
  let isSleeping = false;
  let sessionStartTime = Date.now();

  // Track touch events for mobile
  let isTouched = false;
  let isDragging = false;
  let initialTouchX = 0;
  let initialTouchY = 0;
  let touchStartTime = 0;
});
