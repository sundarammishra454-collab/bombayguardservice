// Advanced JavaScript Features



// Mobile Menu Toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = this.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
});



// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stats-row')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Service Modal Functions
function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    
    const serviceDetails = {
        residential: {
            title: 'Residential Security Services',
            content: `
                <h3>Comprehensive Residential Security Solutions</h3>
                <p>Our residential security services are designed to provide complete peace of mind for housing societies and gated communities.</p>
                <ul>
                    <li>24/7 Trained Security Personnel</li>
                    <li>Access Control and Gate Management</li>
                    <li>Visitor Registration and Verification</li>
                    <li>CCTV Monitoring and Surveillance</li>
                    <li>Emergency Response and First Aid</li>
                    <li>Regular Patrolling and Inspection</li>
                </ul>
                <div class="pricing-info">
                    <h4>Pricing Plans:</h4>
                    <p><strong>Basic Plan:</strong> ₹15,000/month - Single guard, 12-hour shift</p>
                    <p><strong>Premium Plan:</strong> ₹25,000/month - 24/7 coverage with 2 guards</p>
                    <p><strong>Elite Plan:</strong> ₹35,000/month - 24/7 coverage + CCTV monitoring</p>
                </div>
            `
        },
        commercial: {
            title: 'Commercial Security Services',
            content: `
                <h3>Professional Commercial Security Solutions</h3>
                <p>Protect your business assets and ensure employee safety with our comprehensive commercial security services.</p>
                <ul>
                    <li>Corporate Security Management</li>
                    <li>Asset Protection and Loss Prevention</li>
                    <li>Employee and Visitor Safety</li>
                    <li>Risk Assessment and Security Planning</li>
                    <li>Emergency Evacuation Procedures</li>
                    <li>Executive Protection Services</li>
                </ul>
                <div class="pricing-info">
                    <h4>Pricing Plans:</h4>
                    <p><strong>Standard:</strong> ₹25,000/month - Office security, business hours</p>
                    <p><strong>Premium:</strong> ₹40,000/month - 24/7 security with surveillance</p>
                    <p><strong>Enterprise:</strong> ₹60,000/month - Complete security management</p>
                </div>
            `
        },
        event: {
            title: 'Event Security Services',
            content: `
                <h3>Professional Event Security Management</h3>
                <p>Ensure your events run smoothly and safely with our experienced event security team.</p>
                <ul>
                    <li>Crowd Control and Management</li>
                    <li>VIP and Celebrity Protection</li>
                    <li>Venue Security and Access Control</li>
                    <li>Emergency Response Planning</li>
                    <li>Bag Checking and Metal Detection</li>
                    <li>Coordination with Local Authorities</li>
                </ul>
                <div class="pricing-info">
                    <h4>Pricing Plans:</h4>
                    <p><strong>Small Events:</strong> ₹5,000/day - Up to 100 guests</p>
                    <p><strong>Medium Events:</strong> ₹12,000/day - 100-500 guests</p>
                    <p><strong>Large Events:</strong> ₹25,000/day - 500+ guests</p>
                </div>
            `
        },
        cctv: {
            title: 'CCTV Monitoring Services',
            content: `
                <h3>Advanced CCTV Surveillance Solutions</h3>
                <p>State-of-the-art surveillance systems with professional monitoring for complete security coverage.</p>
                <ul>
                    <li>24/7 Live Monitoring and Recording</li>
                    <li>HD Camera Installation and Setup</li>
                    <li>Remote Access via Mobile App</li>
                    <li>Motion Detection and Alerts</li>
                    <li>Cloud Storage and Backup</li>
                    <li>Regular System Maintenance</li>
                </ul>
                <div class="pricing-info">
                    <h4>Pricing Plans:</h4>
                    <p><strong>Basic:</strong> ₹8,000/month - 4 cameras, basic monitoring</p>
                    <p><strong>Standard:</strong> ₹15,000/month - 8 cameras, cloud storage</p>
                    <p><strong>Premium:</strong> ₹25,000/month - 16 cameras, AI analytics</p>
                </div>
            `
        }
    };
    
    modalBody.innerHTML = serviceDetails[serviceType].content;
    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('serviceModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Testimonial Slider
let currentTestimonialIndex = 1;

function currentTestimonial(n) {
    showTestimonial(currentTestimonialIndex = n);
}

function showTestimonial(n) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (n > testimonials.length) currentTestimonialIndex = 1;
    if (n < 1) currentTestimonialIndex = testimonials.length;
    
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[currentTestimonialIndex - 1].classList.add('active');
    dots[currentTestimonialIndex - 1].classList.add('active');
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonialIndex++;
    showTestimonial(currentTestimonialIndex);
}, 5000);

// Enhanced Form Submission
function handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('span');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    btnText.style.opacity = '0';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        name: event.target.querySelector('#name').value,
        email: event.target.querySelector('#email').value,
        phone: event.target.querySelector('#phone').value,
        service: event.target.querySelector('#service').value,
        location: event.target.querySelector('#location').value,
        requirements: event.target.querySelector('#requirements').value
    };
    
    // Simulate API call
    setTimeout(() => {
        // Hide loading state
        btnText.style.opacity = '1';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        
        // Show success message
        alert(`Thank you ${formData.name}! We've received your request for ${formData.service} services. Our team will contact you within 24 hours at ${formData.phone}.`);
        
        // Reset form
        event.target.reset();
    }, 2000);
}

// Particle Background Animation
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right, .animate-bounce-in, .stats-row');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Create particle background
    createParticles();
    
    // Initialize testimonial slider
    showTestimonial(1);
});



