// Security: Safe event handlers to replace inline onclick
document.addEventListener('DOMContentLoaded', function() {
    
    // Phone link handlers (contact.html)
    const phoneLinks = document.querySelectorAll('.phone-link');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = this.getAttribute('data-phone');
            if (phone && /^\+\d+$/.test(phone)) {
                window.location.href = 'tel:' + encodeURIComponent(phone);
            }
        });
        link.style.cursor = 'pointer';
    });
    
    // Email link handlers (contact.html)
    const emailLinks = document.querySelectorAll('.email-link');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('data-email');
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                window.location.href = 'mailto:' + encodeURIComponent(email);
            }
        });
        link.style.cursor = 'pointer';
    });
    
    // Contact button on contact page
    const floatingContactBtn2 = document.getElementById('floatingContactBtn2');
    if (floatingContactBtn2) {
        floatingContactBtn2.addEventListener('click', function() {
            window.location.href = 'contact.html';
        });
    }
    
    const contactFabBtn2 = document.getElementById('contactFabBtn2');
    if (contactFabBtn2) {
        contactFabBtn2.addEventListener('click', function() {
            const contactInfo = document.getElementById('contactInfo');
            if (contactInfo) {
                contactInfo.style.display = contactInfo.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
    
    // Service modal handlers (services.html)
    const residentialBtn = document.getElementById('serviceBtn-residential');
    if (residentialBtn) {
        residentialBtn.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            if (service && typeof openServiceModal === 'function') {
                openServiceModal(service);
            }
        });
    }
    
    const commercialBtn = document.getElementById('serviceBtn-commercial');
    if (commercialBtn) {
        commercialBtn.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            if (service && typeof openServiceModal === 'function') {
                openServiceModal(service);
            }
        });
    }
    
    const eventBtn = document.getElementById('serviceBtn-event');
    if (eventBtn) {
        eventBtn.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            if (service && typeof openServiceModal === 'function') {
                openServiceModal(service);
            }
        });
    }
    
    // Testimonial navigation (about.html)
    const testimonialPrevBtn = document.getElementById('testimonialPrevBtn');
    if (testimonialPrevBtn) {
        testimonialPrevBtn.addEventListener('click', function() {
            if (typeof changeTestimonial === 'function') {
                changeTestimonial(-1);
            }
        });
    }
    
    const testimonialNextBtn = document.getElementById('testimonialNextBtn');
    if (testimonialNextBtn) {
        testimonialNextBtn.addEventListener('click', function() {
            if (typeof changeTestimonial === 'function') {
                changeTestimonial(1);
            }
        });
    }
    
    // Testimonial indicator handlers
    const indicators = document.querySelectorAll('[id^="testimonialInd-"]');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const testimonialNum = this.getAttribute('data-testimonial');
            if (testimonialNum && typeof currentTestimonial === 'function') {
                currentTestimonial(parseInt(testimonialNum));
            }
        });
    });
    
    // About page floating buttons
    const contactFabAbout = document.getElementById('contactFabAbout');
    if (contactFabAbout) {
        contactFabAbout.addEventListener('click', function() {
            window.location.href = 'contact.html';
        });
    }
    
    const toggleContactAbout = document.getElementById('toggleContactAbout');
    if (toggleContactAbout) {
        toggleContactAbout.addEventListener('click', function() {
            const contactInfo = document.getElementById('contactInfo');
            if (contactInfo) {
                contactInfo.style.display = contactInfo.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
    
    // Services page floating buttons
    const contactFabServices = document.getElementById('contactFabServices');
    if (contactFabServices) {
        contactFabServices.addEventListener('click', function() {
            window.location.href = 'contact.html';
        });
    }
    
    const toggleContactServices = document.getElementById('toggleContactServices');
    if (toggleContactServices) {
        toggleContactServices.addEventListener('click', function() {
            const contactInfo = document.getElementById('contactInfo');
            if (contactInfo) {
                contactInfo.style.display = contactInfo.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
});
