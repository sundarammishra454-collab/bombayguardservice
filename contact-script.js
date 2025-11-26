// Advanced Contact Section Animations

// Form Animation Observer
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate form groups
            const formGroups = entry.target.querySelectorAll('.floating-group');
            formGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.classList.add('animate');
                }, index * 100);
            });
            
            // Animate contact items
            const contactItems = entry.target.querySelectorAll('.morphing-contact');
            contactItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });
            
            // Animate benefits
            const benefits = entry.target.querySelectorAll('.bounce-in');
            benefits.forEach((benefit, index) => {
                setTimeout(() => {
                    benefit.classList.add('animate');
                }, 1000 + (index * 100));
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Enhanced Form Validation
function validateForm() {
    const inputs = document.querySelectorAll('.morphing-input, .morphing-select, .morphing-textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        
        // Remove previous validation classes
        input.classList.remove('valid', 'invalid');
        
        if (isRequired && !value) {
            input.classList.add('invalid');
            isValid = false;
        } else if (value) {
            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(value)) {
                    input.classList.add('valid');
                } else {
                    input.classList.add('invalid');
                    isValid = false;
                }
            }
            // Phone validation
            else if (input.type === 'tel') {
                const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
                if (phoneRegex.test(value)) {
                    input.classList.add('valid');
                } else {
                    input.classList.add('invalid');
                    isValid = false;
                }
            }
            // Other inputs
            else {
                input.classList.add('valid');
            }
        }
    });
    
    return isValid;
}

// Real-time validation
function addRealTimeValidation() {
    const inputs = document.querySelectorAll('.morphing-input, .morphing-select, .morphing-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateSingleField(input);
        });
        
        input.addEventListener('input', () => {
            // Clear invalid state on input
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
            }
        });
    });
}

function validateSingleField(input) {
    const value = input.value.trim();
    const isRequired = input.hasAttribute('required');
    
    input.classList.remove('valid', 'invalid');
    
    if (isRequired && !value) {
        input.classList.add('invalid');
        return false;
    } else if (value) {
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
                input.classList.add('valid');
                return true;
            } else {
                input.classList.add('invalid');
                return false;
            }
        } else if (input.type === 'tel') {
            const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
            if (phoneRegex.test(value)) {
                input.classList.add('valid');
                return true;
            } else {
                input.classList.add('invalid');
                return false;
            }
        } else {
            input.classList.add('valid');
            return true;
        }
    }
    return true;
}

// Enhanced Form Submission with WhatsApp Integration
function handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.morphing-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const btnSuccess = submitBtn.querySelector('.btn-success');
    
    // Validate form
    if (!validateForm()) {
        // Shake invalid inputs
        const invalidInputs = document.querySelectorAll('.invalid');
        invalidInputs.forEach(input => {
            input.style.animation = 'none';
            setTimeout(() => {
                input.style.animation = 'shake 0.5s ease-in-out';
            }, 10);
        });
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.opacity = '0';
    btnLoader.style.display = 'block';
    
    // Get form data
    const formData = {
        name: event.target.querySelector('#name').value,
        email: event.target.querySelector('#email').value,
        phone: event.target.querySelector('#phone').value,
        service: event.target.querySelector('#service').value,
        location: event.target.querySelector('#location').value,
        requirements: event.target.querySelector('#requirements').value
    };
    
    // Process submission
    setTimeout(() => {
        // Hide loading, show success
        btnLoader.style.display = 'none';
        submitBtn.classList.add('success');
        
        // Save booking data for admin dashboard
        const stored = localStorage.getItem('bookingSubmissions') || '[]';
        const bookings = JSON.parse(stored);
        const booking = {
            ...formData,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        bookings.unshift(booking);
        localStorage.setItem('bookingSubmissions', JSON.stringify(bookings));
        
        // Send WhatsApp notifications
        if (typeof whatsappNotifier !== 'undefined') {
            whatsappNotifier.sendBookingNotifications(formData);
        }
        
        // Show success message
        setTimeout(() => {
            alert(`Thank you ${formData.name}! We've received your request for ${formData.service} services. WhatsApp notifications have been sent to both you and our admin team.`);
            
            // Reset form
            event.target.reset();
            
            // Reset button state
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            
            // Clear validation classes
            const inputs = document.querySelectorAll('.morphing-input, .morphing-select, .morphing-textarea');
            inputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
        }, 2000);
    }, 2000);
}

// Floating Label Animation
function addFloatingLabelEffect() {
    const inputs = document.querySelectorAll('.morphing-input, .morphing-select, .morphing-textarea');
    
    inputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            const label = input.nextElementSibling;
            if (label && label.classList.contains('floating-label')) {
                label.style.top = '-8px';
                label.style.fontSize = '0.85rem';
                label.style.color = '#ffd700';
            }
        }
        
        input.addEventListener('focus', () => {
            const label = input.nextElementSibling;
            if (label && label.classList.contains('floating-label')) {
                label.style.top = '-8px';
                label.style.fontSize = '0.85rem';
                label.style.color = '#ffd700';
                label.style.fontWeight = '600';
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                const label = input.nextElementSibling;
                if (label && label.classList.contains('floating-label')) {
                    label.style.top = '1.2rem';
                    label.style.fontSize = '1rem';
                    label.style.color = '#666';
                    label.style.fontWeight = 'normal';
                }
            }
        });
    });
}

// Contact Item Click Effects
function addContactItemEffects() {
    const contactItems = document.querySelectorAll('.morphing-contact');
    
    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const ripple = item.querySelector('.contact-ripple');
            const rect = item.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            // Reset ripple
            setTimeout(() => {
                ripple.style.width = ripple.style.height = '0px';
            }, 600);
        });
    });
}

// Magnetic Effect for Contact Items
function addMagneticEffect() {
    const contactItems = document.querySelectorAll('.morphing-contact');
    
    contactItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const rotateX = deltaY * 5;
            const rotateY = deltaX * 5;
            const translateX = deltaX * 3;
            const translateY = deltaY * 3;
            
            item.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateX(${translateX}px) 
                translateY(${translateY}px)
                scale(1.02)
            `;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateX(0) translateY(0) scale(1)';
        });
    });
}

// Initialize Contact Page Animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
    
    // Add interactive effects
    addRealTimeValidation();
    addFloatingLabelEffect();
    addContactItemEffects();
    addMagneticEffect();
    
    // Override global handleSubmit function
    window.handleSubmit = handleSubmit;
});