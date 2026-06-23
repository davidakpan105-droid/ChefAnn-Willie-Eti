// ========================================
// js/script.js — Hero Slider + Animated Counters
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // 1. HERO SLIDER
    // ========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentIndex = 0;
    let slideInterval;
    let isTransitioning = false;

    function showSlide(index, direction = 'next') {
        if (isTransitioning) return;
        if (index === currentIndex) return;

        isTransitioning = true;

        // Remove active from all
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Set active
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    function nextSlide() {
        const next = (currentIndex + 1) % slides.length;
        showSlide(next, 'next');
    }

    function prevSlide() {
        const prev = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prev, 'prev');
    }

    function goToSlide(index) {
        if (index === currentIndex) return;
        clearInterval(slideInterval);
        showSlide(index);
        startAutoRotation();
    }

    function startAutoRotation() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5500);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', function () {
        clearInterval(slideInterval);
        nextSlide();
        startAutoRotation();
    });

    if (prevBtn) prevBtn.addEventListener('click', function () {
        clearInterval(slideInterval);
        prevSlide();
        startAutoRotation();
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', function () {
            goToSlide(idx);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            clearInterval(slideInterval);
            nextSlide();
            startAutoRotation();
        } else if (e.key === 'ArrowLeft') {
            clearInterval(slideInterval);
            prevSlide();
            startAutoRotation();
        }
    });

    // Pause on hover
    const hero = document.querySelector('.hero-slider');
    if (hero) {
        hero.addEventListener('mouseenter', function () {
            clearInterval(slideInterval);
        });
        hero.addEventListener('mouseleave', function () {
            startAutoRotation();
        });
    }

    // Init
    showSlide(0);
    startAutoRotation();

    // ========================================
    // 2. ANIMATED COUNTERS
    // ========================================
    const counters = document.querySelectorAll('.counter-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const triggerPoint = window.innerHeight * 0.85;
        const counterSection = document.querySelector('.counter-section');

        if (!counterSection) return;

        const rect = counterSection.getBoundingClientRect();

        if (rect.top < triggerPoint) {
            countersAnimated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const stepTime = 20;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        return;
                    }
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                };

                // Start with 0
                counter.textContent = '0';
                setTimeout(() => {
                    updateCounter();
                }, 300);
            });
        }
    }

    // Check on scroll
    window.addEventListener('scroll', animateCounters);
    window.addEventListener('resize', animateCounters);

    // Check on load
    setTimeout(animateCounters, 500);

    // ========================================
    // 3. HAMBURGER MENU
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function () {
            const menu = mainNav.querySelector('ul');
            menu.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        // Close menu on link click
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                const menu = mainNav.querySelector('ul');
                menu.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }

    // ========================================
    // 4. HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('.luxury-header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========================================
    // 5. ACTIVE NAV LINK HIGHLIGHT
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    window.addEventListener('scroll', function () {
        let current = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    });

    // Clean up
    window.addEventListener('beforeunload', function () {
        clearInterval(slideInterval);
    });

});



// ========================================
// SERVICES – SHOW MORE / SHOW LESS
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('servicesToggle');
    const hiddenCards = document.querySelectorAll('.service-card.hidden-card');
    const toggleText = toggleBtn ? toggleBtn.querySelector('.toggle-text') : null;
    const toggleIcon = toggleBtn ? toggleBtn.querySelector('.toggle-icon i') : null;
    let isExpanded = false;

    if (toggleBtn && hiddenCards.length) {
        toggleBtn.addEventListener('click', function () {
            isExpanded = !isExpanded;

            if (isExpanded) {
                hiddenCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 120);
                });
                toggleBtn.classList.add('active');
                if (toggleText) toggleText.textContent = 'Show Less Services';
                if (toggleIcon) toggleIcon.className = 'fas fa-chevron-up';
            } else {
                hiddenCards.forEach(card => {
                    card.classList.remove('visible');
                });
                toggleBtn.classList.remove('active');
                if (toggleText) toggleText.textContent = 'Show More Services';
                if (toggleIcon) toggleIcon.className = 'fas fa-chevron-down';
            }
        });
    }
});

// ========================================
// 3D TILT EFFECT ON SERVICE CARDS
// ========================================
document.querySelectorAll('.service-card[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        this.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        this.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    });
});


// ========================================
// PODCAST – COMING SOON MODAL
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('comingSoonModal');
    const closeBtn = document.getElementById('modalClose');
    const gotItBtn = document.getElementById('modalGotIt');
    const triggers = document.querySelectorAll('.cta-trigger');

    // Function to open modal
    function openModal(e) {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Add click listeners to all CTA triggers
    triggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // Close modal events
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (gotItBtn) gotItBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});


// ========================================
// GALLERY – SHOW MORE / SHOW LESS
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('galleryToggle');
    const hiddenImages = document.querySelectorAll('.gallery-item.hidden-image');
    const toggleText = toggleBtn ? toggleBtn.querySelector('.toggle-text') : null;
    const toggleIcon = toggleBtn ? toggleBtn.querySelector('.toggle-icon i') : null;
    let isExpanded = false;

    if (toggleBtn && hiddenImages.length) {
        toggleBtn.addEventListener('click', function () {
            isExpanded = !isExpanded;

            if (isExpanded) {
                // Show hidden images with stagger
                hiddenImages.forEach((img, index) => {
                    setTimeout(() => {
                        img.classList.add('visible');
                    }, index * 150);
                });
                toggleBtn.classList.add('active');
                if (toggleText) toggleText.textContent = 'Show Less Images';
                if (toggleIcon) toggleIcon.className = 'fas fa-chevron-up';
            } else {
                // Hide all hidden images
                hiddenImages.forEach(img => {
                    img.classList.remove('visible');
                });
                toggleBtn.classList.remove('active');
                if (toggleText) toggleText.textContent = 'Show More Images';
                if (toggleIcon) toggleIcon.className = 'fas fa-chevron-down';
            }
        });
    }

    // ========================================
    // GALLERY – CLICK ZOOM EFFECT
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            // Simple scale feedback on click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 250);
        });
    });
});


// ========================================
// CONSULTATION – WHATSAPP REDIRECT
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('consultationForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');
    const submitBtn = document.getElementById('submitBtn');
    const successDiv = document.getElementById('formSuccess');
    const formContainer = document.querySelector('.consultation-form-container');

    let currentStep = 1;
    const totalSteps = 3;

    // Service selection
    const serviceOptions = document.querySelectorAll('.service-option');
    const selectedServiceInput = document.getElementById('selectedService');

    serviceOptions.forEach(option => {
        option.addEventListener('click', function () {
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedServiceInput.value = this.dataset.service;
            document.getElementById('confirmService').textContent = this.querySelector('span').textContent;
        });
    });

    // Update confirmation details
    function updateConfirmation() {
        const name = document.getElementById('fullName').value || '—';
        const email = document.getElementById('email').value || '—';
        const phone = document.getElementById('phone').value || '—';
        const date = document.getElementById('preferredDate').value || 'Not specified';

        document.getElementById('confirmName').textContent = name;
        document.getElementById('confirmEmail').textContent = email;
        document.getElementById('confirmPhone').textContent = phone;
        document.getElementById('confirmDate').textContent = date || 'Not specified';
    }

    // Show step
    function showStep(step) {
        steps.forEach((s, index) => {
            s.classList.toggle('active', index + 1 === step);
        });

        progressSteps.forEach((ps, index) => {
            const num = index + 1;
            ps.classList.remove('active', 'completed');
            if (num === step) ps.classList.add('active');
            else if (num < step) ps.classList.add('completed');
        });

        progressLines.forEach((pl, index) => {
            pl.classList.toggle('completed', index + 1 < step);
        });

        if (step === 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        } else if (step === totalSteps) {
            prevBtn.style.display = 'inline-flex';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
            updateConfirmation();
        } else {
            prevBtn.style.display = 'inline-flex';
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }

        currentStep = step;
        const container = document.querySelector('.consultation-form-container');
        if (container) {
            setTimeout(() => {
                container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }

    // Validate step
    function validateStep(step) {
        if (step === 1) {
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            if (!name || !email || !phone) {
                alert('Please fill in all required fields.');
                return false;
            }
            if (!email.includes('@')) {
                alert('Please enter a valid email address.');
                return false;
            }
            return true;
        }
        if (step === 2) {
            const service = selectedServiceInput.value;
            const message = document.getElementById('message').value.trim();
            if (!service) {
                alert('Please select a service category.');
                return false;
            }
            if (!message || message.length < 10) {
                alert('Please describe your project in more detail (at least 10 characters).');
                return false;
            }
            return true;
        }
        return true;
    }

    // Next step
    function nextStep() {
        if (currentStep < totalSteps) {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        }
    }

    // Previous step
    function prevStep() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    }

    // ========================================
    // SUBMIT FORM – REDIRECT TO WHATSAPP
    // ========================================
    function submitForm(e) {
        e.preventDefault();

        if (!validateStep(2)) return;

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
        submitBtn.disabled = true;

        // Gather form data
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('preferredDate').value || 'Not specified';
        const service = document.getElementById('selectedService').value || 'Not specified';
        const messageText = document.getElementById('message').value.trim();

        // Construct WhatsApp message
        const whatsappMessage = `Hello Chef Ann,%0A%0AI would like to schedule a consultation.%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A*Preferred Date:* ${date}%0A%0A*Message:* ${messageText}`;

        // WhatsApp URL (International format - Nigeria country code)
        const phoneNumber = '2349010211707';
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Redirect after a short delay to show the loading state
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            // Optionally show success message
            form.style.display = 'none';
            successDiv.style.display = 'block';
            if (formContainer) {
                formContainer.style.padding = '2rem 1.5rem';
            }
        }, 800);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextStep);
    if (prevBtn) prevBtn.addEventListener('click', prevStep);
    if (form) form.addEventListener('submit', submitForm);

    // Enter key navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            const activeStep = document.querySelector('.form-step.active');
            if (activeStep) {
                const stepNum = parseInt(activeStep.dataset.step);
                if (stepNum === totalSteps) {
                    if (submitBtn.style.display !== 'none') {
                        form.dispatchEvent(new Event('submit'));
                    }
                } else {
                    nextStep();
                }
            }
        }
    });

    // Auto-update confirmation on input
    document.querySelectorAll('#fullName, #email, #phone, #preferredDate').forEach(input => {
        input.addEventListener('input', updateConfirmation);
    });

    // Initial state
    showStep(1);
});


// ========================================
// TESTIMONIALS – AUTO SLIDER
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    let currentIndex = 0;
    let slideInterval;
    let isTransitioning = false;

    const totalSlides = slides.length;

    function showSlide(index) {
        if (isTransitioning) return;
        if (index === currentIndex) return;
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        isTransitioning = true;

        // Remove active from current
        slides[currentIndex].classList.remove('active');
        slides[currentIndex].classList.add('exit');

        // Update dots
        dots.forEach(d => d.classList.remove('active'));

        setTimeout(() => {
            slides[currentIndex].classList.remove('exit');
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        const next = (currentIndex + 1) % totalSlides;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    function goToSlide(index) {
        if (index === currentIndex) return;
        clearInterval(slideInterval);
        showSlide(index);
        startAutoRotation();
    }

    function startAutoRotation() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            clearInterval(slideInterval);
            nextSlide();
            startAutoRotation();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            clearInterval(slideInterval);
            prevSlide();
            startAutoRotation();
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', function () {
            goToSlide(idx);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            clearInterval(slideInterval);
            nextSlide();
            startAutoRotation();
        } else if (e.key === 'ArrowLeft') {
            clearInterval(slideInterval);
            prevSlide();
            startAutoRotation();
        }
    });

    // Pause on hover
    const sliderWrapper = document.querySelector('.testimonials-slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', function () {
            clearInterval(slideInterval);
        });
        sliderWrapper.addEventListener('mouseleave', function () {
            startAutoRotation();
        });
    }

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    if (sliderWrapper) {
        sliderWrapper.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderWrapper.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                clearInterval(slideInterval);
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoRotation();
            }
        }, { passive: true });
    }

    // Initialize
    showSlide(0);
    startAutoRotation();

    window.addEventListener('beforeunload', function () {
        clearInterval(slideInterval);
    });
});

// ========================================
// CONTACT – ANIMATED FORM WITH TRANSITIONS
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const successDiv = document.getElementById('contactSuccess');
    const submitBtn = form ? form.querySelector('.submit-btn') : null;
    const formContainer = document.querySelector('.contact-form-container');

    if (form) {
        // ========================================
        // FLOATING LABEL ANIMATION
        // ========================================
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Check if input has value on load
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            }

            // Add event listeners for floating labels
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('focused');
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });

            // Update on input
            input.addEventListener('input', function () {
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });

        // ========================================
        // FORM SUBMISSION – WHATSAPP REDIRECT
        // ========================================
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                // Shake animation on invalid fields
                const emptyFields = form.querySelectorAll('input:invalid, textarea:invalid');
                emptyFields.forEach(field => {
                    field.style.animation = 'shake 0.5s ease';
                    setTimeout(() => {
                        field.style.animation = '';
                    }, 500);
                });

                // Simple alert for demo
                alert('Please fill in all required fields.');
                return;
            }

            if (!email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.querySelector('.btn-text').textContent = 'Sending...';
            }

            // Gather form data
            const phone = document.getElementById('contactPhone').value.trim() || 'Not provided';
            const subject = document.getElementById('contactSubject').value.trim() || 'General Inquiry';

            // Construct WhatsApp message
            const whatsappMessage = `Hello Chef Ann,%0A%0A*New Contact Form Submission*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Subject:* ${subject}%0A%0A*Message:* ${message}`;

            const phoneNumber = '2349010211707';
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            // Simulate sending delay for UX
            setTimeout(() => {
                // Hide form, show success
                form.style.display = 'none';
                successDiv.style.display = 'block';
                if (formContainer) {
                    formContainer.style.padding = '2.5rem 2rem';
                }
                // Open WhatsApp in new tab
                window.open(whatsappURL, '_blank');

                // Reset button state
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                }

                // Scroll to form container
                setTimeout(() => {
                    if (formContainer) {
                        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 300);
            }, 1500);
        });
    }

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe contact section elements
    const animatedElements = document.querySelectorAll('.contact-info-item, .social-link, .form-group');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
        observer.observe(el);
    });

    // ========================================
    // ADD SHAKE ANIMATION KEYFRAMES
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});

// ========================================
// FOOTER – BACK TO TOP BUTTON
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // FOOTER – SMOOTH SCROLL FOR ALL LINKS
    // ========================================
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-services a');

    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.luxury-header')?.offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // FOOTER – SCROLL REVEAL ANIMATIONS
    // ========================================
    const footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.footer-grid > *');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const footerGrid = document.querySelector('.footer-grid');
    if (footerGrid) {
        const items = footerGrid.querySelectorAll('.footer-grid > *');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        footerObserver.observe(footerGrid);
    }
});