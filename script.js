// Matrix Rain Effect
function initMatrix() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 20;
    const columns = canvas.width / fontSize;
    
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = `${fontSize}px monospace`;
        
        drops.forEach((y, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, y * fontSize);
            
            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    setInterval(draw, 50);
}

// Typing Animation
function initTyping() {
    const typingText = document.getElementById('typing-text');
    const cursor = document.getElementById('cursor');
    
    const texts = [
        'Full Stack Developer',
        'Java Developer',
        'Django Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Navbar Scroll Effects
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    let isMenuOpen = false;
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navMenu.style.display = isMenuOpen ? 'flex' : 'none';
        navMenu.style.flexDirection = isMenuOpen ? 'column' : 'row';
        navMenu.style.position = isMenuOpen ? 'fixed' : 'static';
        navMenu.style.top = isMenuOpen ? '100px' : '0';
        navMenu.style.left = isMenuOpen ? '0' : '0';
        navMenu.style.width = isMenuOpen ? '100%' : 'auto';
        navMenu.style.background = isMenuOpen ? 'rgba(2, 6, 23, 0.98)' : 'transparent';
        navMenu.style.padding = isMenuOpen ? '2rem' : '0';
        navMenu.style.backdropFilter = isMenuOpen ? 'blur(20px)' : 'none';
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(2, 6, 23, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(2, 6, 23, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                hamburger.click();
            }
        });
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.section, .feature-card, .project-card, .timeline-item, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
}

function animateSkillBars(container) {
    const progressBars = container.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Navbar Active Link on Scroll
function initActiveNav() {
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! 🎉';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Project Image Hover Effect
function initProjectHover() {
    document.querySelectorAll('.project-card').forEach(card => {
        const img = card.querySelector('.project-image img');
        
        card.addEventListener('mouseenter', () => {
            img.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            img.style.filter = 'brightness(1) contrast(1)';
        });
    });
}

// Initialize all features when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    initTyping();
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNav();
    initContactForm();
    initProjectHover();
    
    // Preload animations after short delay
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize matrix on resize
    initMatrix();
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations handled by IntersectionObserver
}, 16));

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #00d4ff !important;
    }
    .nav-link.active::after {
        width: 100% !important;
        background: linear-gradient(135deg, #00d4ff, #a855f7) !important;
    }
`;
document.head.appendChild(style);