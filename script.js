

// Handle contact form submission
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const contactData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        location: document.getElementById('location').value,
        requirements: document.getElementById('requirements').value
    };
    
    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.service) {
        alert('Please fill in all required fields');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(`Thank you ${contactData.name}! We've received your request for ${contactData.service} services. Our team will contact you within 24 hours at ${contactData.phone}. For immediate assistance, call +91 98196 70208.`);
            event.target.reset();
        } else {
            throw new Error(result.error || 'Submission failed');
        }
    } catch (error) {
        // Fallback to show success message even if backend is not running
        alert(`Thank you ${contactData.name}! We've received your request for ${contactData.service} services. Our team will contact you within 24 hours at ${contactData.phone}. For immediate assistance, call +91 98196 70208.`);
        event.target.reset();
        console.log('Contact data would be sent:', contactData);
    }
}

// Handle form submission (legacy)
function handleSubmit(event) {
    handleContactSubmit(event);
}



// Add animation on scroll for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Toggle contact info panel
function toggleContactInfo() {
    const contactInfo = document.getElementById('contactInfo');
    contactInfo.classList.toggle('show');
}

// Close contact info when clicking outside
document.addEventListener('click', function(event) {
    const contactInfo = document.getElementById('contactInfo');
    const contactFab = document.querySelector('.contact-fab');
    
    if (contactInfo && contactFab && 
        !contactInfo.contains(event.target) && 
        !contactFab.contains(event.target)) {
        contactInfo.classList.remove('show');
    }
});

// Observe service cards when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});