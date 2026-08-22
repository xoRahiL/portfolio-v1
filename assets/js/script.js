// ==========================================
// Scroll-reveal animations
// ==========================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

const heroTitle = document.querySelector(".hero-title");
const heroImage = document.querySelector(".hero-image");
const heroContent = document.querySelector(".hero-content");

const revealHero = () => {
  heroTitle?.classList.add("show");
  heroImage?.classList.add("show");
  heroContent?.classList.add("show");
};

window.addEventListener("load", () => {
  requestAnimationFrame(revealHero);
});

document
  .querySelectorAll(
    ".about-story, .timeline-item, .skills-intro, .stack-item, #skills .tech-item, .education-intro, .education-card, .education-content, .projects-intro, .project, .contact-intro, .contact-content, .footer-content, .footer-meta, #contact h2, #contact > p",
  )
  .forEach((item) => {
    observer.observe(item);
  });

// ==========================================
// Smooth scroll for in-page anchor links
// ==========================================
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const getHeaderOffset = () => {
  const header = document.querySelector("header");
  // small extra breathing room below the sticky header
  return (header?.getBoundingClientRect().height || 0) + 16;
};

const smoothScroll = (target, duration = 900) => {
  const targetEl = document.querySelector(target);
  if (!targetEl) return;

  const start = window.scrollY;
  const rawEnd = targetEl.getBoundingClientRect().top + start;
  const end = Math.max(0, rawEnd - getHeaderOffset());
  const startTime = performance.now();

  const scrollStep = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuad(progress);
    window.scrollTo(0, start + (end - start) * eased);

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  };

  requestAnimationFrame(scrollStep);
};

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (targetId.length > 1 && document.querySelector(targetId)) {
      event.preventDefault();
      smoothScroll(targetId);
      closeNavMenu();
    }
  });
});

// ==========================================
// Mobile navigation toggle
// ==========================================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

const closeNavMenu = () => {
  navMenu?.classList.remove("open");
  navToggle?.classList.remove("open");
  navToggle?.setAttribute("aria-expanded", "false");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// ==========================================
// Sticky header background on scroll
// ==========================================
const header = document.querySelector("header");
const toggleHeaderBg = () => {
  if (window.scrollY > 40) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
};
toggleHeaderBg();
window.addEventListener("scroll", toggleHeaderBg, { passive: true });
