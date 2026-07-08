/* ==================================================
   ChefAnn Willie Eti — Site Scripts
   ================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('loaded');
    }, 400);
  });

  /* ---------- AOS Init ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }

  /* ---------- Sticky Navbar ---------- */
  const header = document.getElementById('site-header');
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll);

  /* ---------- Scroll Progress Bar ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  /* ---------- Back To Top ---------- */
  const backToTop = document.getElementById('back-to-top');
  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  window.addEventListener('scroll', toggleBackToTop);
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link-custom');

  function setActiveNav() {
    let current = '';
    sections.forEach(function (sec) {
      const sectionTop = sec.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  /* ---------- Collapse mobile nav on link click ---------- */
  const navCollapseEl = document.getElementById('mainNavbar');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapseEl.classList.contains('show') && window.bootstrap) {
        const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
        bsCollapse.hide();
      }
    });
  });

  /* ---------- Hero Slider ---------- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let heroInterval;

  function showSlide(index) {
    heroSlides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === index);
      const bg = slide.querySelector('.hero-slide-bg');
      if (i === index) {
        bg.style.animation = 'none';
        void bg.offsetWidth;
        bg.style.animation = '';
      }
    });
    heroDots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % heroSlides.length);
  }

  function startHeroAutoplay() {
    heroInterval = setInterval(nextSlide, 6000);
  }

  if (heroSlides.length) {
    showSlide(0);
    startHeroAutoplay();
    heroDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        clearInterval(heroInterval);
        showSlide(i);
        startHeroAutoplay();
      });
    });
  }

  /* ---------- Hero Particles ---------- */
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    const particleCount = window.innerWidth < 768 ? 12 : 24;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('span');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (10 + Math.random() * 12) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = (0.2 + Math.random() * 0.4).toString();
      particleContainer.appendChild(p);
    }
  }

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('.counter-number');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        counter.querySelector('.count-value').textContent = value;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.querySelector('.count-value').textContent = target;
        }
      }
      requestAnimationFrame(tick);
    });
  }

  const countersSection = document.querySelector('.counters-row');
  if (countersSection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    counterObserver.observe(countersSection);
  }

  /* ---------- Gallery Lightbox ---------- */
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  let currentImageIndex = 0;
  const galleryImages = Array.from(galleryItems).map(function (img) { return img.getAttribute('src'); });

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.setAttribute('src', galleryImages[index]);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showImage(offset) {
    currentImageIndex = (currentImageIndex + offset + galleryImages.length) % galleryImages.length;
    lightboxImg.setAttribute('src', galleryImages[currentImageIndex]);
  }

  galleryItems.forEach(function (img, index) {
    img.addEventListener('click', function () { openLightbox(index); });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', function () { showImage(-1); });
  if (lightboxNext) lightboxNext.addEventListener('click', function () { showImage(1); });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showImage(1);
    if (e.key === 'ArrowLeft') showImage(-1);
  });

  /* ---------- Testimonials Slider ---------- */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let testimonialIndex = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    testimonialCards.forEach(function (card, i) {
      card.classList.toggle('active', i === index);
    });
    testimonialDots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
    testimonialIndex = index;
  }

  function nextTestimonial() {
    showTestimonial((testimonialIndex + 1) % testimonialCards.length);
  }

  function startTestimonialAutoplay() {
    testimonialInterval = setInterval(nextTestimonial, 6500);
  }

  if (testimonialCards.length) {
    showTestimonial(0);
    startTestimonialAutoplay();
    testimonialDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        clearInterval(testimonialInterval);
        showTestimonial(i);
        startTestimonialAutoplay();
      });
    });
  }

  /* ---------- Show More / Show Fewer Cards ---------- */
  const showMoreButtons = document.querySelectorAll('.show-more-btn');

  showMoreButtons.forEach(function (btn) {
    const targetId = btn.getAttribute('data-target');
    const grid = document.getElementById(targetId);
    if (!grid) return;

    const extraCards = grid.querySelectorAll('.card-extra');
    const labelSpan = btn.querySelector('span');
    const labelMore = btn.getAttribute('data-label-more');
    const labelLess = btn.getAttribute('data-label-less');
    let expanded = false;

    btn.addEventListener('click', function () {
      expanded = !expanded;
      extraCards.forEach(function (card) {
        card.classList.toggle('is-visible', expanded);
      });
      labelSpan.textContent = expanded ? labelLess : labelMore;
      btn.classList.toggle('is-expanded', expanded);

      if (window.AOS) {
        setTimeout(function () { AOS.refresh(); }, 50);
      }

      if (!expanded) {
        const rect = grid.getBoundingClientRect();
        if (rect.top < 0) {
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Contact Form (front-end only) ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Message Sent';
      submitBtn.disabled = true;
      contactForm.reset();
      setTimeout(function () {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });
  }

  /* ---------- Newsletter Form (front-end only) ---------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      input.value = 'Subscribed';
      newsletterForm.reset();
    });
  }

});