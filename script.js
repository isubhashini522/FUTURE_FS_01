document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile nav when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Active Link Switching on Scroll
    const sections = document.querySelectorAll('.section, .hero');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Typing Effect for Hero Title
    const typingText = document.querySelector('.typing-text');
    const textToType = "Aspiring Full Stack Developer & AI Enthusiast";
    let index = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!typingText) return;

        if (isDeleting) {
            typingText.textContent = textToType.substring(0, index - 1);
            index--;
            typeSpeed = 50; // faster when deleting
        } else {
            typingText.textContent = textToType.substring(0, index + 1);
            index++;
            typeSpeed = 100;
        }

        if (!isDeleting && index === textToType.length) {
            typeSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            typeSpeed = 500; // pause before typing starts again
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect after short delay
    setTimeout(type, 1000);

    // 5. Scroll Animations (Intersection Observer)
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const blurInElements = document.querySelectorAll('.blur-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to trigger only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(el => observer.observe(el));
    
    // trigger blur immediately on load for hero segment if visible
    setTimeout(() => {
        blurInElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});
