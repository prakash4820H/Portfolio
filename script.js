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

  // Navigation scroll effect
  const nav = document.querySelector("nav");

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
  });

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
    hamburger.classList.toggle("hamburger-active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav-active");
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

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

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
});
