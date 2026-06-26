// =====================================================
//  INIT
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initAOS();
    initNavbar();
    initMobileMenu();
    initTypewriter();
    initSmoothScroll();
    initScrollTop();
    initSkillBars();
    initCounters();
    initContactForm();
    initActiveLinks();
});

// =====================================================
//  LOADER
// =====================================================
function initLoader() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 600);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 2400);
}

// =====================================================
//  AOS
// =====================================================
function initAOS() {
    AOS.init({
        offset: 60,
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
    });
}

// =====================================================
//  NAVBAR
// =====================================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// =====================================================
//  MOBILE MENU
// =====================================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('closeMenu');
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const links = menu.querySelectorAll('a');

    function openMenu() {
        menu.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        menu.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// =====================================================
//  TYPEWRITER
// =====================================================
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = ['Full Stack Developer', 'Graphic Designer', 'AI Engineer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 55;
    const pauseMs = 1800;

    function type() {
        const current = words[wordIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === current.length) {
            delay = pauseMs;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 400;
        }
        setTimeout(type, delay);
    }
    setTimeout(type, 800);
}

// =====================================================
//  SMOOTH SCROLL
// =====================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navH = document.getElementById('navbar').offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - navH;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// =====================================================
//  SCROLL TO TOP
// =====================================================
function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// =====================================================
//  SKILL BARS
// =====================================================
function initSkillBars() {
    const bars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}

// =====================================================
//  COUNTERS
// =====================================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

// =====================================================
//  CONTACT FORM
// =====================================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (validateForm(form)) {
            const nameVal = document.getElementById('name').value.trim();
            const emailVal = document.getElementById('email').value.trim();
            const messageVal = document.getElementById('message').value.trim();

            const subject = `Portfolio contact from ${nameVal || emailVal}`;
            const bodyLines = [];
            if (nameVal) bodyLines.push(`Name: ${nameVal}`);
            if (emailVal) bodyLines.push(`Reply-to: ${emailVal}`);
            if (messageVal) bodyLines.push('\n' + messageVal);
            const body = bodyLines.join('\n');

            const mailto = `mailto:aiengineer75@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailto;

            showNotification('Opening your mail client...', 'info');
            form.reset();
            clearFormErrors(form);
        }
    });

    // Live email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
            emailInput.classList.toggle('error', !valid && emailInput.value.length > 0);
        });
    }
}

function validateForm(form) {
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    clearFormErrors(form);

    if (!name.value.trim()) {
        setError(name, 'nameError', 'Please enter your name.');
        valid = false;
    }
    if (!email.value.trim()) {
        setError(email, 'emailError', 'Please enter your email.');
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        setError(email, 'emailError', 'Please enter a valid email address.');
        valid = false;
    }
    if (!message.value.trim()) {
        setError(message, 'messageError', 'Please enter a message.');
        valid = false;
    }

    if (!valid) showNotification('Please fill in all fields correctly.', 'error');
    return valid;
}

function setError(input, errorId, msg) {
    input.classList.add('error');
    const el = document.getElementById(errorId);
    if (el) el.textContent = msg;
}

function clearFormErrors(form) {
    form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

// =====================================================
//  NOTIFICATION
// =====================================================
function showNotification(message, type = 'info') {
    const el = document.getElementById('notification');
    el.textContent = message;
    el.className = `notification ${type} show`;

    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), 3500);
}

// =====================================================
//  ACTIVE NAV LINKS
// =====================================================
function initActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    const navH = document.getElementById('navbar').offsetHeight;

    function update() {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - navH - 80) {
                current = sec.getAttribute('id');
            }
        });
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
}

// =====================================================
//  PROJECT NOTIFICATION
// =====================================================
function showProject(name) {
    showNotification(`Opening ${name}…`, 'info');
}
