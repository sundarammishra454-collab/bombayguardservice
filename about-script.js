// Advanced About Section Animations

// Feature Cards Animation Observer
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
                
                // Animate progress bars
                const progressBar = entry.target.querySelector('.progress-bar-fill');
                if (progressBar) {
                    const targetWidth = progressBar.dataset.width;
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 500);
                }
                
                // Animate counters
                const counter = entry.target.querySelector('.counter-animate');
                if (counter) {
                    animateCounter(counter);
                }
                
                // Animate 24/7 availability
                const availabilityCounter = entry.target.querySelector('.availability-counter');
                if (availabilityCounter) {
                    animateAvailability(availabilityCounter);
                }
            }, index * 200);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// Counter Animation Function
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// 3D Tilt Effect
function add3DTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            element.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Testimonial Carousel Functions
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const indicators = document.querySelectorAll('.indicator');

function showTestimonial(index) {
    // Remove active class from all testimonials and indicators
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current testimonial and indicator
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    // Move the track
    const track = document.querySelector('.testimonial-track');
    if (track) {
        track.style.transform = `translateX(-${index * 100}%)`;
    }
}

function currentTestimonial(n) {
    currentTestimonialIndex = n - 1;
    showTestimonial(currentTestimonialIndex);
}

function changeTestimonial(direction) {
    currentTestimonialIndex += direction;
    
    if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    }
    
    showTestimonial(currentTestimonialIndex);
}

// Auto-rotate testimonials
function startTestimonialAutoRotate() {
    setInterval(() => {
        changeTestimonial(1);
    }, 5000);
}

// Typewriter Effect for Titles
function addTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter-text');
    
    typewriterElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        setTimeout(() => {
            element.style.width = '100%';
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                if (i > text.length) {
                    clearInterval(typeInterval);
                    // Remove typewriter cursor after completion
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        }, index * 500);
    });
}

// Parallax Effect for Background Elements
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.feature-bg-glow');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// Initialize About Page Animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe feature cards
    const featureCards = document.querySelectorAll('.morph-feature');
    featureCards.forEach(card => {
        aboutObserver.observe(card);
    });
    
    // Add interactive effects
    add3DTiltEffect();
    addParallaxEffect();
    
    // Initialize testimonial carousel
    if (testimonials.length > 0) {
        showTestimonial(0);
        startTestimonialAutoRotate();
    }
    
    // Start typewriter effect after a delay
    setTimeout(() => {
        addTypewriterEffect();
    }, 1000);
});

// Export functions for global use
window.currentTestimonial = currentTestimonial;
window.changeTestimonial = changeTestimonial;