import './agency-ultra.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { createIcons, icons } from 'lucide';

createIcons({ icons });

// Navbar Scroll Effect (GSAP properly triggered)
const navbar = document.querySelector('.navbar-ai');
if (navbar) {
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top -50px',
        onEnter: () => navbar.classList.add('scrolled'),
        onLeaveBack: () => navbar.classList.remove('scrolled'),
    });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle-ai');
const navLinks = document.querySelector('.nav-links-ai');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// FAQ Accordion Logic
const faqNodes = document.querySelectorAll('.faq-node');

const initFAQ = () => {
    faqNodes.forEach(node => {
        const body = node.querySelector('.node-body');
        if (node.classList.contains('active')) {
            body.style.maxHeight = body.scrollHeight + 'px';
        }

        node.addEventListener('click', () => {
            const isActive = node.classList.contains('active');
            
            // Close all
            faqNodes.forEach(otherNode => {
                otherNode.classList.remove('active');
                otherNode.querySelector('.node-body').style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                node.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
};

initFAQ();

// Activity Ticker Logic
const activityText = document.getElementById('activity-text');
if (activityText) {
    const activities = [
        "2 users recently initialized Meta Ads protocol",
        "1 user recently deployed TikTok Lead Funnel",
        "Success: 3 businesses integrated AI Voice Agents",
        "Operational: 12 Google Ads campaigns optimized",
        "4 users starting Meta Protocol deployment",
        "System Alert: New Lead generated for Real Estate Hub"
    ];
    let currentIndex = 0;
    
    const updateActivity = () => {
        currentIndex = (currentIndex + 1) % activities.length;
        gsap.to(activityText, {
            opacity: 0,
            x: 20,
            duration: 0.5,
            onComplete: () => {
                activityText.textContent = activities[currentIndex];
                gsap.set(activityText, { x: -20 });
                gsap.to(activityText, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    };

    setInterval(updateActivity, 5000);
}

// Hero Animations
const tl = gsap.timeline();

tl.from('.badge-ai', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2
})
.from('.hero-title span', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out',
}, "-=0.6")
.from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
}, "-=0.6");

// Generic Scroll Reveal
const revealElements = document.querySelectorAll('.section-header, .bento-card, .service-card-ai, .compare-row, .result-card, .faq-item, .cta-box');

revealElements.forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    });
});

// Carousel Logic
const slider = document.getElementById('af-slider');
const btnNext = document.getElementById('af-next');
const btnPrev = document.getElementById('af-prev');

if (slider && btnNext && btnPrev) {
    const scrollAmount = 430;
    
    const slideNext = () => {
        // If at the end, scroll back to start
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const slidePrev = () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    btnNext.addEventListener('click', slideNext);
    btnPrev.addEventListener('click', slidePrev);

    // Autoplay functionality
    let autoplayInterval;

    const startAutoplay = () => {
        if (!autoplayInterval) {
            autoplayInterval = setInterval(slideNext, 3000);
        }
    };

    const stopAutoplay = () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    };

    startAutoplay();

    // Interaction controls (Pause on Hover & Touch)
    const wrapper = document.querySelector('.af-slider-wrapper');
    if (wrapper) {
        // Desktop Hover
        wrapper.addEventListener('mouseenter', stopAutoplay);
        wrapper.addEventListener('mouseleave', startAutoplay);

        // Mobile Touch
        wrapper.addEventListener('touchstart', stopAutoplay, { passive: true });
        wrapper.addEventListener('touchend', startAutoplay, { passive: true });
        wrapper.addEventListener('touchcancel', startAutoplay, { passive: true });
    }
}

// Neural Core Parallax Logic Removed
// Card Mouse Tracking Glow Logic Removed

// Slot Counter Logic
const slotCount = document.getElementById('slot-count');
if (slotCount) {
    let currentSlots = 9;
    
    const updateSlots = () => {
        if (currentSlots > 3) {
            currentSlots--;
            slotCount.textContent = currentSlots.toString().padStart(2, '0');
            
            // Add a little punch animation on change
            gsap.fromTo(slotCount, 
                { scale: 1.5, opacity: 0.5 }, 
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
            );
        }
    };

    // Decrement slots at semi-random long intervals to simulate scarcity
    const scheduleNextUpdate = () => {
        const randomDelay = Math.random() * 15000 + 10000; // 10-25 seconds
        setTimeout(() => {
            updateSlots();
            if (currentSlots > 3) scheduleNextUpdate();
        }, randomDelay);
    };

    scheduleNextUpdate();
}


