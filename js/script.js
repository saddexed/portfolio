// Modern Portfolio JavaScript - Performance Optimized

class PortfolioApp {
  constructor() {
    this.isLoaded = false;
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupGreetings();
    this.setupPreloader();
    this.setupNavigation();
    this.setupCustomCursor();
    this.setupSmoothScrolling();
    this.setupFormValidation();
    this.setupIntersectionObserver();
    this.setupTimelineAnimations();
    this.setupEducationAnimations();
    this.setupLocalTime();
    this.setupPerformanceOptimizations();
  }

  setupEventListeners() {
    // Optimize scroll events with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Resize events
    window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
    
    // Load event
    window.addEventListener('load', () => {
      this.handleLoad();
    });

    // Add mobile-specific handling
    this.setupMobileHandling();
  }

  setupMobileHandling() {
    const isMobile = () => window.innerWidth <= 768;
    
    // Handle viewport height changes on mobile (keyboard)
    if (isMobile()) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      window.addEventListener('resize', () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    }

    // Optimize touch performance
    document.addEventListener('touchstart', () => {}, { passive: true });
    
    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }

  setupGreetings() {
    const greetings = document.querySelector('.greetings');
    if (!greetings) return;

    // Hide greetings after animation completes
    setTimeout(() => {
      greetings.style.display = 'none';
    }, 3000);
  }

  setupPreloader() {
    const preloader = document.getElementById('preloader');
    const greetingElement = document.querySelector('.preloader-greeting');
    
    if (!preloader || !greetingElement) return;

    const greetings = ['Hello','नमस्ते', 'Bonjour', 'こんにちは', 'Hallo'];
    let currentIndex = 0;

    // GSAP timeline for greeting animation (3 seconds total)
    const greetingDuration = 2.5 / greetings.length; // Reserve 0.5s for final fade out
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide preloader after all greetings
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            preloader.style.display = 'none';
            document.body.style.overflow = '';
            this.isLoaded = true;
            this.triggerEntranceAnimations();
          }
        });
      }
    });

    // Animate each greeting with calculated timing
    greetings.forEach((greeting, index) => {
      tl.set(greetingElement, { textContent: greeting }, index * greetingDuration)
        .fromTo(greetingElement, 
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: greetingDuration * 0.3, 
            ease: "power2.out" 
          }, 
          index * greetingDuration
        )
        .to(greetingElement, 
          { 
            opacity: 0, 
            y: -20, 
            duration: greetingDuration * 0.3, 
            ease: "power2.in" 
          }, 
          index * greetingDuration + greetingDuration * 0.7
        );
    });
  }

  setupNavigation() {
    const staticNav = document.getElementById('static-nav');
    const menuBtn = document.getElementById('menu-btn');
    const navSidebar = document.getElementById('nav-sidebar');
    const navOverlay = document.getElementById('nav-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const staticLinks = document.querySelectorAll('.static-nav-link');
    
    if (!staticNav || !menuBtn || !navSidebar || !navOverlay) return;

    let isMenuOpen = false;

    // Initialize mobile navigation state
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      staticNav.classList.add('hidden');
      menuBtn.classList.add('visible');
    }

    // Handle scroll to show/hide navigation elements
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // When hero is mostly out of view
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // On mobile, always show menu button and hide static nav
        staticNav.classList.add('hidden');
        menuBtn.classList.add('visible');
      } else {
        // Desktop behavior - toggle based on scroll
        if (scrollY > heroHeight) {
          staticNav.classList.add('hidden');
          menuBtn.classList.add('visible');
        } else {
          staticNav.classList.remove('hidden');
          menuBtn.classList.remove('visible');
        }
      }
    });

    // Menu button click handler
    menuBtn.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        this.openSidebar();
      } else {
        this.closeSidebar();
      }
    });

    // Sidebar link clicks - close sidebar and navigate
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        this.closeSidebar();
        
        // Navigate after animation completes
        setTimeout(() => {
          this.smoothScrollTo(document.querySelector(href));
        }, 300);
      });
    });

    // Static nav link clicks
    staticLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.smoothScrollTo(document.querySelector(href));
      });
    });

    // Close sidebar when clicking on overlay
    navOverlay.addEventListener('click', () => {
      if (isMenuOpen) {
        this.closeSidebar();
      }
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        this.closeSidebar();
      }
    });
  }

  openSidebar() {
    const menuBtn = document.getElementById('menu-btn');
    const navSidebar = document.getElementById('nav-sidebar');
    const navOverlay = document.getElementById('nav-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    menuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Use GSAP timeline for synchronized animations
    const tl = gsap.timeline();
    
    // Animate overlay and sidebar simultaneously
    tl.set([navOverlay, navSidebar], { display: 'block' })
      .to(navOverlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, 0)
      .fromTo(navSidebar, 
        {
          x: '100%'
        },
        {
          x: '0%',
          duration: 0.4,
          ease: "power3.out"
        }, 0.1)
      .fromTo(sidebarLinks,
        {
          opacity: 0,
          x: 50,
          y: 20
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          stagger: {
            amount: 0.3,
            from: "start"
          },
          ease: "back.out(1.2)"
        }, 0.2);
  }

  closeSidebar() {
    const menuBtn = document.getElementById('menu-btn');
    const navSidebar = document.getElementById('nav-sidebar');
    const navOverlay = document.getElementById('nav-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Use GSAP timeline for smooth exit
    const tl = gsap.timeline({
      onComplete: () => {
        navOverlay.style.display = 'none';
        navSidebar.style.display = 'block'; // Keep visible for next entrance
        document.body.style.overflow = '';
      }
    });
    
    tl.to(sidebarLinks, {
        opacity: 0,
        x: 30,
        y: -10,
        duration: 0.3,
        stagger: {
          amount: 0.15,
          from: "end"
        },
        ease: "power2.in"
      })
      .to(navSidebar, {
        x: '100%',
        duration: 0.35,
        ease: "power3.in"
      }, 0.1)
      .to(navOverlay, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in"
      }, 0.2);
    
    menuBtn.classList.remove('active');
  }

  setupCustomCursor() {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');
    
    if (!cursor || !cursorDot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    let cursorImage = null;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animate cursor with smooth following
    const animateCursor = () => {
      // Smooth following animation
      const hasImage = cursor.classList.contains('has-image');
      const offsetX = hasImage ? 60 : 10;
      const offsetY = hasImage ? 40 : 10;
      
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;

      cursor.style.transform = `translate(${cursorX - offsetX}px, ${cursorY - offsetY}px)`;
      cursorDot.style.transform = `translate(${dotX - 2}px, ${dotY - 2}px)`;

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Work item hover effects with images
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const imageUrl = item.getAttribute('data-image');
        if (imageUrl) {
          // Create image element if it doesn't exist
          if (!cursorImage) {
            cursorImage = document.createElement('img');
            cursorImage.className = 'cursor-image';
            cursor.appendChild(cursorImage);
          }
          
          cursorImage.src = imageUrl;
          cursor.classList.add('has-image');
          cursorDot.classList.add('hidden');
          
          // Add visible class after a small delay for smooth transition
          setTimeout(() => {
            cursor.classList.add('visible');
          }, 50);
        }
      });
      
      item.addEventListener('mouseleave', () => {
        cursor.classList.remove('has-image', 'visible');
        cursorDot.classList.remove('hidden');
      });
    });

    // General cursor interactions for other elements
    const interactiveElements = document.querySelectorAll('a:not(.work-item a), button, .submit-btn');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!cursor.classList.contains('has-image')) {
          cursor.style.transform += ' scale(1.5)';
          cursor.style.backgroundColor = 'rgba(0, 112, 243, 0.3)';
        }
      });
      
      el.addEventListener('mouseleave', () => {
        if (!cursor.classList.contains('has-image')) {
          cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
          cursor.style.backgroundColor = 'rgba(0, 112, 243, 0.2)';
        }
      });
    });
  }

  setupSmoothScrolling() {
    // Enhanced smooth scrolling for all navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    allNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          this.smoothScrollTo(targetElement);
        }
  });
});

    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const workSection = document.getElementById('work');
        if (workSection) {
          this.smoothScrollTo(workSection);
        }
      });
    }

    // Add smooth scroll behavior to window for better browser support
    this.addSmoothScrollPolyfill();
  }

  smoothScrollTo(element) {
    const headerOffset = 80; // Account for any fixed headers
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // Enhanced smooth scroll with custom easing
    this.smoothScrollToPosition(offsetPosition, 800); // 800ms duration
  }

  smoothScrollToPosition(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Easing function for smooth animation
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  addSmoothScrollPolyfill() {
    // Enhance smooth scrolling for browsers that need it
    if (!('scrollBehavior' in document.documentElement.style)) {
      const smoothscroll = {
        polyfill: () => {
          const w = window;
          const d = document;
          
          if (w.requestAnimationFrame && 'scrollBehavior' in d.documentElement.style) return;
          
          w.Element.prototype.scrollIntoView = function(options) {
            const element = this;
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + w.pageYOffset;
            const middle = absoluteElementTop - (w.innerHeight / 2);
            
            if (options && options.behavior === 'smooth') {
              smoothScrollTo(middle, 600);
  } else {
              w.scrollTo(0, middle);
            }
          };
        }
      };
      
      smoothscroll.polyfill();
    }
  }

  setupFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('.submit-btn');

    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    form.addEventListener('submit', (e) => {
  e.preventDefault();
      this.handleFormSubmit(form, submitBtn);
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    this.clearFieldError(field);

    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email';
          isValid = false;
        }
        break;
      case 'text':
        if (!value) {
          errorMessage = 'This field is required';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'Must be at least 2 characters';
          isValid = false;
        }
        break;
      default:
        if (field.tagName === 'TEXTAREA') {
          if (!value) {
            errorMessage = 'Message is required';
            isValid = false;
          } else if (value.length < 10) {
            errorMessage = 'Message must be at least 10 characters';
            isValid = false;
          }
        }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.style.borderColor = '#ff4757';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #ff4757;
      font-size: 0.75rem;
      margin-top: 0.25rem;
      opacity: 0;
      animation: fadeInUp 0.3s ease forwards;
    `;
    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.style.borderColor = '';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  async handleFormSubmit(form, submitBtn) {
    const formData = new FormData(form);
    const inputs = form.querySelectorAll('input, textarea');
    
    // Validate all fields
    let isFormValid = true;
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) return;

    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <div class="spinner"></div>
      <span>Sending...</span>
    `;
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual endpoint)
      await this.simulateFormSubmission(formData);
      
      // Show success message
      this.showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      
    } catch (error) {
      this.showFormMessage('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% of the time)
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Simulation error'));
        }
      }, 2000);
    });
  }

  showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-size: 0.875rem;
      background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      opacity: 0;
      animation: fadeInUp 0.3s ease forwards;
    `;

    const form = document.getElementById('contact-form');
    form.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }

  setupLocalTime() {
    const localTimeElement = document.getElementById('local-time');
    if (!localTimeElement) return;

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
      });
      localTimeElement.textContent = `${timeString} IST`;
    };

    // Update immediately and then every minute
    updateTime();
    setInterval(updateTime, 60000);
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          this.animateSection(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections for card animations
    const sections = document.querySelectorAll('#work, #achievements, #education, #contact');
    sections.forEach(section => {
      observer.observe(section);
    });

    // Setup individual card animations
    this.setupCardAnimations();

    // Setup additional elements for animation
    this.setupAdditionalAnimations();
  }

  setupCardAnimations() {
    // Set initial states for all cards
    const workItems = document.querySelectorAll('.work-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const educationCards = document.querySelectorAll('.education-card');

    // Set initial invisible state
    gsap.set([...workItems, ...timelineItems, ...educationCards], {
      opacity: 0,
      y: 50,
      scale: 0.9
    });
  }

  setupAdditionalAnimations() {
    // Set initial states for section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    const contactForm = document.querySelector('.contact-form');
    const contactHeader = document.querySelector('.contact-header');

    gsap.set(sectionHeaders, {
      opacity: 0,
      y: 30
    });

    if (contactForm) {
      gsap.set(contactForm, {
        opacity: 0,
        y: 40
      });
    }

    if (contactHeader) {
      gsap.set(contactHeader, {
        opacity: 0,
        y: 30
      });
    }
  }

  animateSection(section) {
    const sectionId = section.id;

    switch(sectionId) {
      case 'work':
        this.animateWorkSection();
        break;
      case 'achievements':
        this.animateAchievementsSection();
        break;
      case 'education':
        this.animateEducationSection();
        break;
      case 'contact':
        this.animateContactSection();
        break;
    }
  }

  animateWorkSection() {
    const workItems = document.querySelectorAll('.work-item');
    const sectionHeader = document.querySelector('#work .section-header');

    // Animate section header first
    gsap.fromTo(sectionHeader, 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Animate work items with stagger
    gsap.to(workItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        from: "start"
      },
      ease: "power2.out",
      delay: 0.3
    });
  }

  animateAchievementsSection() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const sectionHeader = document.querySelector('#achievements .section-header');

    // Animate section header first
    gsap.fromTo(sectionHeader, 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Animate timeline items with alternating pattern
    gsap.to(timelineItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: {
        amount: 1.2,
        from: "start"
      },
      ease: "back.out(1.2)",
      delay: 0.4
    });
  }

  animateEducationSection() {
    const educationCards = document.querySelectorAll('.education-card');
    const sectionHeader = document.querySelector('#education .section-header');

    // Animate section header first
    gsap.fromTo(sectionHeader, 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Animate education cards with bounce effect
    gsap.to(educationCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      stagger: {
        amount: 0.8,
        from: "start"
      },
      ease: "back.out(1.4)",
      delay: 0.3
    });
  }

  animateContactSection() {
    const contactHeader = document.querySelector('.contact-header');
    const contactForm = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    const submitButton = document.querySelector('.contact-form button');

    // Animate contact header
    gsap.to(contactHeader, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Animate form container
    gsap.to(contactForm, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.2
    });

    // Animate form inputs with stagger
    gsap.set(formInputs, { opacity: 0, y: 20 });
    gsap.to(formInputs, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: {
        amount: 0.4,
        from: "start"
      },
      ease: "power2.out",
      delay: 0.4
    });

    // Animate submit button
    if (submitButton) {
      gsap.set(submitButton, { opacity: 0, scale: 0.8 });
      gsap.to(submitButton, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.2)",
        delay: 0.8
      });
    }
  }

  handleScroll() {
    // Update active nav link highlighting
    this.updateActiveNavLink();
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const staticLinks = document.querySelectorAll('.static-nav-link, .sidebar-link');
    
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    staticLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  handleResize() {
    // Close sidebar on resize
    if (window.innerWidth > 768) {
      this.closeSidebar();
    }
  }

  handleLoad() {
    // Performance monitoring
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Portfolio Performance:', {
        loadTime: `${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`,
        domContentLoaded: `${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`,
        totalTime: `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`
      });
    }
  }

  triggerEntranceAnimations() {
    // Hero section entrance animation
    const heroElements = document.querySelectorAll('.hero-title .char');
    const subtitle = document.querySelector('.subtitle-text');
    const infoItems = document.querySelectorAll('.info-item');

    heroElements.forEach((char, index) => {
      char.style.animationDelay = `${0.1 + index * 0.05}s`;
    });

    if (subtitle) {
      subtitle.style.animationDelay = '0.8s';
    }

    infoItems.forEach((item, index) => {
      item.style.animationDelay = `${1 + index * 0.1}s`;
    });
  }

  setupPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Prefetch important resources
    this.prefetchResources();
  }

  prefetchResources() {
    const links = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    links.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  // Utility functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timelineItems.length) return;

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
      timelineObserver.observe(item);
    });
  }

  setupEducationAnimations() {
    const educationCards = document.querySelectorAll('.education-card');
    
    if (!educationCards.length) return;

    const educationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    educationCards.forEach(card => {
      educationObserver.observe(card);
    });
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Add CSS for animations and styles
const additionalStyles = `
  @keyframes fadeOut {
    to { opacity: 0; transform: translateY(-10px); }
  }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .nav-link.active {
    color: var(--color-primary) !important;
  }
  
  .nav-link.active::before {
    width: 100% !important;
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

