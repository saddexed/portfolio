document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.floating-navbar .nav-link');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  });

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
});