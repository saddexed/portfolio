document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.floating-navbar .nav-link');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  });
  
  // Add this line to select fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in');

  function onScroll() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let offset = 120; // adjust if your navbar overlaps content

    let found = false;
    sections.forEach((section, idx) => {
      if (!section) return;
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      const nextSection = sections[idx + 1];
      const nextSectionTop = nextSection ? nextSection.offsetTop - offset : Infinity;

      if (!found && scrollPos >= sectionTop && scrollPos < nextSectionTop) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[idx].classList.add('active');
        found = true;
      }
    });

    // Add this code for fade-in functionality
    const viewportHeight = window.innerHeight;
    fadeElements.forEach(element => {
      // Get element's position relative to the viewport
      const elementTop = element.getBoundingClientRect().top;
      const elementHeight = element.getBoundingClientRect().height;
      
      // Define when element should start fading in (when it's 20% into the viewport)
      const triggerPoint = viewportHeight - (elementHeight * 0.2);
      
      if (elementTop < triggerPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const id = this.getAttribute('href').replace('#', '');
      e.preventDefault();
      if (id === 'header') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Initial call
  onScroll();
  
  // Apply default data-aos attributes to elements
  applyDefaultAOS();
  
  // Initialize AOS with custom settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false, // Change to false to make animations trigger every time
      offset: 100,
      //mirror: true // Add mirror option to animate out when scrolling past
    });
  }
});

// Function to apply default AOS animations to elements
function applyDefaultAOS() {
  // Select elements to animate
  const selectors = [
    // '*',
    'section > .container > h2', // Section headings
    '.project-row',              // Project rows
    '.skills-icons > li',        // Skill icons
    '.timeline-item',            // Timeline items
    '.experience-card',          // Experience items
    '.education-card',            // Education items
    '.card',                     // Contact cards
  ];
  
  // Combine all selectors and get matching elements
  const elements = document.querySelectorAll(selectors.join(', '));
  
  // Apply fade-up animation to elements that don't already have data-aos
  elements.forEach((element, index) => {
    if (!element.hasAttribute('data-aos')) {
      element.setAttribute('data-aos', 'fade-up');
      
      // Add varying delays to create a cascade effect
      const delay = (index % 3) * 100; // 0, 100, 200ms delays in groups of 3
      if (delay > 0) {
        element.setAttribute('data-aos-delay', delay.toString());
      }
    }
  });
}