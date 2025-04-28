// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Theme toggling functionality
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  // Handle theme toggle click
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

    // Add transition effect when changing themes
    document.body.style.transition =
      "background-color 0.5s ease, color 0.5s ease";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 500);
  });

  // Handle resume download
  const resumeDownloadBtn = document.querySelector(
    'a[href="resume/resume.pdf"]'
  );
  if (resumeDownloadBtn) {
    // Get the website URL
    const portfolioUrl = window.location.origin + window.location.pathname;

    // Add tracking param when downloading the resume
    resumeDownloadBtn.addEventListener("click", (e) => {
      // Log that resume was downloaded (for potential future analytics)
      console.log("Resume downloaded");

      // Add source information to the download attribute
      resumeDownloadBtn.setAttribute(
        "download",
        "Jaya_Prakash_Pinninti_Resume.pdf"
      );

      // Show a brief message to the user
      const notification = document.createElement("div");
      notification.className = "resume-notification";
      notification.textContent = "Resume download started!";
      document.body.appendChild(notification);

      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);
    });
  }

  // Hide loader when content is loaded
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.classList.add("loader-hidden");

    // Remove loader from DOM after transition
    loader.addEventListener("transitionend", () => {
      loader.remove();
    });
  });

  // Fade in elements on scroll
  function animateOnScroll() {
    const sections = document.querySelectorAll(".section");
    const skills = document.querySelectorAll(".skill-progress-item");
    const cards = document.querySelectorAll(
      ".skill-category, .project-card, .blog-card"
    );

    // Add staggered animation to elements
    const animateItems = (items, delay = 0.1) => {
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.9;

        if (isVisible) {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, index * 100);
        }
      });
    };

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.9;

      if (isVisible) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";

        // Animate child elements with staggered delay
        const childElements = section.querySelectorAll(
          ".skill-category, .project-card, .timeline-item"
        );
        animateItems(childElements);
      }
    });

    // Animate skills with progress bars
    skills.forEach((skill) => {
      const rect = skill.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.9;

      if (isVisible) {
        const progressBar = skill.querySelector(".progress");
        if (progressBar && !progressBar.classList.contains("animated")) {
          progressBar.classList.add("animated");
          const width = progressBar.style.width;
          progressBar.style.width = "0";
          setTimeout(() => {
            progressBar.style.width = width;
          }, 100);
        }
      }
    });

    // Add parallax effect to 3D container
    if (window.scrollY > 0) {
      const container = document.getElementById("3d-container");
      if (container) {
        container.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    }
  }

  // Handle navigation highlight
  const nav = document.getElementById("main-nav");
  const sections = document.querySelectorAll("section[id]");
  const navHeight = nav.offsetHeight + 20;

  function updateActiveNavLink() {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight;
      const sectionHeight = section.offsetHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active");
      if (
        currentSection &&
        link.getAttribute("href") === `#${currentSection}`
      ) {
        link.classList.add("active");
      }
    });
  }

  // Ensure all elements with links are clickable
  function ensureClickableElements() {
    document.querySelectorAll("a, button").forEach((el) => {
      if (window.getComputedStyle(el).pointerEvents === "none") {
        el.style.pointerEvents = "auto";
      }
    });
  }

  // Initial call to ensure elements are clickable
  ensureClickableElements();

  // Add mouse move parallax effect to header
  const hero = document.querySelector(".hero");
  if (hero) {
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      hero.style.transform = `translateX(${x * 10}px) translateY(${y * 10}px)`;
    });
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

    // Animate elements on scroll
    animateOnScroll();
  });

  // Initial call to set active link on page load
  updateActiveNavLink();

  // Initial animation call
  animateOnScroll();

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

  // Implement gallery functionality
  const initGallery = () => {
    const galleries = document.querySelectorAll(".gallery-container");

    galleries.forEach((gallery) => {
      const featured = gallery.querySelector(".gallery-featured");
      const thumbnails = gallery.querySelectorAll(".thumbnail");
      const prev = gallery.querySelector(".gallery-prev");
      const next = gallery.querySelector(".gallery-next");

      let currentIndex = 0;

      const updateGallery = (index) => {
        featured.src = thumbnails[index].src;
        featured.alt = thumbnails[index].alt;

        thumbnails.forEach((thumb) => thumb.classList.remove("active"));
        thumbnails[index].classList.add("active");

        // Add a subtle animation on image change
        featured.style.opacity = "0";
        featured.style.transform = "scale(0.98)";

        setTimeout(() => {
          featured.style.opacity = "1";
          featured.style.transform = "scale(1)";
        }, 50);
      };

      thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
          currentIndex = index;
          updateGallery(currentIndex);
        });
      });

      if (prev && next) {
        prev.addEventListener("click", () => {
          currentIndex =
            (currentIndex - 1 + thumbnails.length) % thumbnails.length;
          updateGallery(currentIndex);
        });

        next.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % thumbnails.length;
          updateGallery(currentIndex);
        });
      }
    });
  };

  // Initialize gallery if it exists
  if (document.querySelector(".gallery-container")) {
    initGallery();
  }

  // Add text typing animation to the hero tagline
  const tagline = document.querySelector(".tagline");
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    setTimeout(typeWriter, 1000);
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
