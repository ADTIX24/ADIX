// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out-cubic',
    once: true,
    offset: 100
});

// Preloader
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Mobile Menu
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-title', {
    duration: 1,
    opacity: 0,
    y: 50,
    ease: 'power3.out'
});

gsap.from('.hero-subtitle', {
    duration: 1,
    opacity: 0,
    y: 30,
    delay: 0.2,
    ease: 'power3.out'
});

gsap.from('.btn', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    delay: 0.4,
    ease: 'power3.out'
});

gsap.from('.hero-image', {
    duration: 1,
    opacity: 0,
    x: 100,
    ease: 'power3.out',
    delay: 0.3
});

// Products Section Scroll Animations
gsap.from('.products-section .section-header', {
    scrollTrigger: {
        trigger: '.products-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    duration: 1,
    opacity: 0,
    y: 50,
    ease: 'power3.out'
});

// Product Cards Staggered Animation
gsap.from('.product-card', {
    scrollTrigger: {
        trigger: '.products-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    duration: 0.8,
    opacity: 0,
    y: 50,
    stagger: 0.1,
    ease: 'power3.out'
});

// About Section Animation
gsap.from('.about-container', {
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    duration: 1,
    opacity: 0,
    y: 50,
    ease: 'power3.out'
});

// Contact Section Animation
gsap.from('.contact-container', {
    scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    duration: 1,
    opacity: 0,
    y: 50,
    ease: 'power3.out'
});

// Timeline Scroll Effect
gsap.timeline({
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
}).to('.hero-image', {
    scale: 0.8,
    rotation: 10,
    ease: 'none'
}, 0);

// Fade in sections on scroll
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section.querySelector('h2') || section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out'
    });
});

// WhatsApp Integration
const whatsappButtons = document.querySelectorAll('.add-to-cart');
const phoneNumber = '1234567890';

whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const productName = this.getAttribute('data-product');
        const message = 'مرحبا، أريد طلب: ' + productName + '\nالسعر: 50$\n';
        const whatsappUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
        
        window.open(whatsappUrl, '_blank');
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create WhatsApp message for form submission
        const formMessage = 'مرحبا من شركة البشير\nالاسم: ' + name + 
                          '\nالبريد الإلكتروني: ' + email + 
                          '\nالرسالة: ' + message;
        const whatsappUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(formMessage);
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success notification
        showNotification('تم إرسال رسالتك إلى واتساب بنجاح!');
    });
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 50%;
        transform: translateX(50%);
        background: var(--accent-color);
        color: var(--dark-color);
        padding: 15px 25px;
        border-radius: 30px;
        font-weight: 600;
        box-shadow: var(--box-shadow);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.scrollTo(target.offsetTop - 80, {
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    });
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Window Resize Handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Add CSS variables to root
document.documentElement.style.setProperty('--accent-color', '#FFA500');
document.documentElement.style.setProperty('--primary-color', '#0b0d17');

// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    // Trigger AOS
    AOS.refresh();
    
    // Start animations
    gsap.globalTimeline.play();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${rate * 0.3}px)`;
    }
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent-color);
    color: var(--dark-color);
    border: none;
    cursor: pointer;
    font-size: 20px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--box-shadow);
`;

document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    gsap.to(window, 1, {
        scrollTo: 0,
        ease: 'power3.inOut'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Lazy loading for images
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});