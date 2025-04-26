// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Theme toggling functionality
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply theme based on saved preference or system preference
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let newTheme;

    if (currentTheme === "dark") {
      newTheme = "";
      themeIcon.classList.replace("fa-sun", "fa-moon");
    } else {
      newTheme = "dark";
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // Handle loader for 3D scene
  const loader = document.getElementById("loader");

  // Hide loader when window is fully loaded
  window.addEventListener("load", () => {
    // Allow a slight delay to ensure 3D scene starts rendering
    setTimeout(() => {
      loader.classList.add("loader-hidden");
    }, 1000);
  });

  // Function to ensure navigation elements are clickable
  function ensureClickableElements() {
    const navLinks = document.querySelectorAll(".nav-links a");
    const logo = document.querySelector(".logo");
    const hamburger = document.querySelector(".hamburger");

    // Make sure all nav elements are clickable
    [logo, hamburger, ...navLinks].forEach((el) => {
      if (el) {
        el.style.pointerEvents = "auto";
        el.style.cursor = "pointer";
        // Force link to be on top
        el.style.position = "relative";
        el.style.zIndex = "2000";
      }
    });
  }

  // Run this on page load and periodically
  ensureClickableElements();
  // Run this check every second to ensure links remain clickable
  setInterval(ensureClickableElements, 1000);

  // Navigation scroll effect
  const nav = document.getElementById("main-nav");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Function to highlight active nav item
  function updateActiveNavLink() {
    // Get current scroll position with a buffer for better UX
    let scrollPosition = window.scrollY + 200;

    // Find the section that is currently in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      // Check if scroll position is within the section
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active class from all links
        navLinks.forEach((link) => link.classList.remove("active"));

        // Add active class to the corresponding link
        const activeLink = document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });

    // Special case for the top of the page
    if (window.scrollY < 100) {
      navLinks.forEach((link) => link.classList.remove("active"));
    }
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("nav-scrolled");
      document.querySelector(".logo").style.color = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--text-color");
    } else {
      nav.classList.remove("nav-scrolled");
      document.querySelector(".logo").style.color = "white";
    }

    // Update active nav link on scroll
    updateActiveNavLink();

    // Re-ensure clickability on scroll
    ensureClickableElements();
  });

  // Initial call to set active link on page load
  updateActiveNavLink();

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinksContainer = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinksContainer.classList.toggle("nav-active");
    hamburger.classList.toggle("hamburger-active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("nav-active");
      hamburger.classList.remove("hamburger-active");
    });
  });

  // Form submission handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // We don't prevent default here since we want the form to submit to Formspree

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = "Sending...";

      // We let Formspree handle the submission
      // This is just for visual feedback until the form redirects
      setTimeout(() => {
        submitButton.textContent = originalText;
      }, 2000);
    });
  }

  // Logo click - scroll to top
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Smooth scrolling for navigation links with debugging
  document.querySelectorAll(".nav-links a").forEach((anchor) => {
    // Add a visible click indicator class
    anchor.classList.add("nav-link-active");

    // Add the click event listener
    anchor.addEventListener("click", function (e) {
      console.log("Nav link clicked:", this.getAttribute("href"));
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        // Get the height of the navigation
        const navHeight = nav.offsetHeight;

        // Calculate the position to scroll to
        const targetPosition = target.offsetTop - navHeight - 10; // 10px buffer

        console.log("Scrolling to position:", targetPosition);
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        console.log("Target not found:", targetId);
      }
    });
  });

  // Manually add link click functions to ensure they work
  document.querySelector('.nav-links a[href="#about"]').onclick = function (e) {
    e.preventDefault();
    const target = document.querySelector("#about");
    const navHeight = nav.offsetHeight;
    window.scrollTo({
      top: target.offsetTop - navHeight - 10,
      behavior: "smooth",
    });
  };

  // Animate elements on scroll
  const animateOnScroll = () => {
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.style.opacity = 1;
        section.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial styles for animation
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Run animation on page load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  // Initialize 3D scene if Three.js is loaded
  if (typeof THREE !== "undefined" && document.getElementById("3d-container")) {
    init3DScene();
  }

  // Scroll Progress Indicator
  const scrollProgress = document.querySelector(".scroll-progress-bar");

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercentage + "%";
  }

  // Initial update
  updateScrollProgress();

  // Update on scroll
  window.addEventListener("scroll", updateScrollProgress);
});
