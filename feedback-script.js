// Feedback Page Advanced Functionality

// Form Animation Observer
const feedbackObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const formGroups = entry.target.querySelectorAll('.floating-group');
            formGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.classList.add('animate');
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Star Rating Functionality
function initializeStarRating() {
    const stars = document.querySelectorAll('.star-rating input');
    const labels = document.querySelectorAll('.star-rating label');
    
    stars.forEach((star, index) => {
        star.addEventListener('change', () => {
            const rating = star.value;
            console.log(`Rating selected: ${rating} stars`);
            
            // Add visual feedback with staggered animation
            labels.forEach((label, labelIndex) => {
                setTimeout(() => {
                    if (labelIndex >= (5 - rating)) {
                        label.style.filter = 'grayscale(0%)';
                        label.style.transform = 'scale(1.2) rotate(15deg)';
                        label.style.animation = 'starPulse 0.6s ease';
                    } else {
                        label.style.filter = 'grayscale(100%)';
                        label.style.transform = 'scale(1)';
                        label.style.animation = 'none';
                    }
                }, labelIndex * 100);
            });
            
            // Add confetti effect for 5-star rating
            if (rating === '5') {
                createConfetti();
            }
        });
    });
    
    // Add hover effects
    labels.forEach((label, index) => {
        label.addEventListener('mouseenter', () => {
            for (let i = index; i < labels.length; i++) {
                labels[i].style.filter = 'grayscale(0%)';
                labels[i].style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        label.addEventListener('mouseleave', () => {
            // Reset to current rating state
            const checkedStar = document.querySelector('.star-rating input:checked');
            if (checkedStar) {
                const rating = checkedStar.value;
                labels.forEach((lbl, idx) => {
                    if (idx >= (5 - rating)) {
                        lbl.style.filter = 'grayscale(0%)';
                        lbl.style.transform = 'scale(1.2) rotate(15deg)';
                    } else {
                        lbl.style.filter = 'grayscale(100%)';
                        lbl.style.transform = 'scale(1)';
                    }
                });
            } else {
                labels.forEach(lbl => {
                    lbl.style.filter = 'grayscale(100%)';
                    lbl.style.transform = 'scale(1)';
                });
            }
        });
    });
}

// Enhanced Feedback Form Submission
async function handleFeedbackSubmit(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.morphing-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Get form data
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const formData = {
        type: 'feedback',
        rating: rating || 0,
        name: event.target.querySelector('#customerName').value,
        email: event.target.querySelector('#customerEmail').value,
        service: event.target.querySelector('#serviceUsed').value,
        message: event.target.querySelector('#feedbackMessage').value,
        suggestions: event.target.querySelector('#suggestions').value || 'None',
        timestamp: new Date().toISOString()
    };
    
    // Validate form
    if (!validateFeedbackForm()) {
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.opacity = '0';
    btnLoader.style.display = 'block';
    
    // Submit to backend API with fallback
    try {
        const result = await submitFeedbackToAPI(formData);
        
        // Hide loading, show success
        btnLoader.style.display = 'none';
        submitBtn.classList.add('success');
        
        // Show success animation
        showFeedbackSuccess();
        
        const message = result.offline ? 
            `Thank you ${formData.name}! Your ${formData.rating}-star feedback has been saved offline.` :
            `Thank you ${formData.name}! Your ${formData.rating}-star feedback has been submitted.`;
        
        showFeedbackMessage(message, 'success');
        
        // Reset form after delay
        setTimeout(() => {
            event.target.reset();
            resetStarRating();
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
        }, 3000);
        
    } catch (error) {
        // Handle submission error
        btnLoader.style.display = 'none';
        btnText.style.opacity = '1';
        submitBtn.disabled = false;
        
        showFeedbackMessage('Submission failed. Please try again.', 'error');
        console.error('Feedback submission error:', error);
    }
}

// Reset star rating visual state
function resetStarRating() {
    const labels = document.querySelectorAll('.star-rating label');
    labels.forEach(label => {
        label.style.filter = 'grayscale(100%)';
        label.style.transform = 'scale(1)';
    });
}

// Create confetti effect for 5-star rating
function createConfetti() {
    const colors = ['#ffd700', '#ff6b35', '#4CAF50', '#00d4ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 20%;
            left: ${Math.random() * 100}%;
            border-radius: 50%;
            pointer-events: none;
            z-index: 2000;
            animation: confettiFall ${2 + Math.random() * 3}s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            document.body.removeChild(confetti);
        }, 5000);
    }
}

// Add confetti animation to CSS dynamically
if (!document.querySelector('#confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Show feedback success animation
function showFeedbackSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'feedback-success';
    successDiv.innerHTML = `
        <div class="success-icon">🎉</div>
        <h3>Thank You!</h3>
        <p>Your feedback has been submitted successfully.</p>
        <p>We appreciate your input and will use it to improve our services.</p>
    `;
    
    document.body.appendChild(successDiv);
    
    // Show animation
    setTimeout(() => {
        successDiv.classList.add('show');
        createConfetti();
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 600);
    }, 4000);
}

// Show feedback message
function showFeedbackMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `feedback-message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'error' ? 'background: #f44336;' : 'background: #4CAF50;'}
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Show animation
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Animate satisfaction meter
function animateSatisfactionMeter() {
    const meter = document.querySelector('.satisfaction-meter');
    const meterText = document.querySelector('.meter-text');
    
    if (meter && meterText) {
        const targetPercentage = 96;
        let currentPercentage = 0;
        let currentDisplayed = 0;
        
        // Animate the conic gradient and number
        const animateInterval = setInterval(() => {
            if (currentPercentage < targetPercentage) {
                currentPercentage += 2;
                currentDisplayed = Math.min(currentPercentage, targetPercentage);
                
                const degrees = (currentPercentage / 100) * 360;
                meter.style.background = `conic-gradient(
                    #4CAF50 0deg,
                    #4CAF50 ${degrees}deg,
                    #e0e0e0 ${degrees}deg,
                    #e0e0e0 360deg
                )`;
                
                meterText.textContent = `${Math.floor(currentDisplayed)}%`;
                
                // Add pulse effect at milestones
                if (currentDisplayed % 25 === 0 && currentDisplayed > 0) {
                    meter.style.animation = 'meterSpin 2s ease-in-out, meterPulse 0.5s ease';
                }
            } else {
                clearInterval(animateInterval);
                // Final celebration animation
                setTimeout(() => {
                    meter.style.animation = 'meterSpin 2s ease-in-out, meterPulse 3s ease-in-out infinite';
                }, 500);
            }
        }, 30);
    }
}

// Form validation
function validateFeedbackForm() {
    const rating = document.querySelector('input[name="rating"]:checked');
    const name = document.querySelector('#customerName');
    const email = document.querySelector('#customerEmail');
    const service = document.querySelector('#serviceUsed');
    const message = document.querySelector('#feedbackMessage');
    
    let isValid = true;
    
    // Clear previous validation
    document.querySelectorAll('.field-error').forEach(error => error.remove());
    document.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
    
    // Validate rating
    if (!rating) {
        showFieldError(document.querySelector('.star-rating'), 'Please select a rating');
        isValid = false;
    }
    
    // Validate name
    if (!name.value.trim()) {
        showFieldError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showFieldError(email, 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate service
    if (!service.value) {
        showFieldError(service, 'Please select a service');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showFieldError(message, 'Feedback message is required');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #f44336;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        animation: shake 0.5s ease;
    `;
    
    if (field.classList.contains('star-rating')) {
        field.parentElement.appendChild(errorDiv);
    } else {
        field.parentElement.appendChild(errorDiv);
    }
}

// Real-time validation
function addRealTimeValidation() {
    const fields = document.querySelectorAll('#customerName, #customerEmail, #serviceUsed, #feedbackMessage');
    
    fields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.classList.contains('invalid')) {
                field.classList.remove('invalid');
                const error = field.parentElement.querySelector('.field-error');
                if (error) error.remove();
            }
            
            // Add success state for valid fields
            if (field.value.trim()) {
                field.classList.add('field-success');
            } else {
                field.classList.remove('field-success');
            }
        });
        
        field.addEventListener('blur', () => {
            // Validate individual field on blur
            if (field.id === 'customerEmail' && field.value) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    showFieldError(field, 'Please enter a valid email');
                }
            }
        });
    });
}

// Initialize feedback page
document.addEventListener('DOMContentLoaded', async () => {
    // Observe feedback section
    const feedbackSection = document.querySelector('#feedback');
    if (feedbackSection) {
        feedbackObserver.observe(feedbackSection);
    }
    
    // Initialize star rating
    initializeStarRating();
    
    // Add real-time validation
    addRealTimeValidation();
    
    // Load and animate satisfaction meter
    try {
        const stats = await getFeedbackStats();
        const meterFill = document.querySelector('.meter-fill');
        const meterText = document.querySelector('.meter-text');
        
        if (meterFill && meterText) {
            meterFill.setAttribute('data-percentage', stats.satisfactionRate);
            setTimeout(() => {
                animateSatisfactionMeter();
            }, 1000);
        }
    } catch (error) {
        // Use default animation
        setTimeout(() => {
            animateSatisfactionMeter();
        }, 1000);
    }
    
    // Override global handleSubmit function for this page
    window.handleFeedbackSubmit = handleFeedbackSubmit;
    
    // Add form field animations on focus
    const formFields = document.querySelectorAll('.morphing-input, .morphing-select, .morphing-textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.style.transform = 'scale(1.02)';
            field.parentElement.style.zIndex = '10';
        });
        
        field.addEventListener('blur', () => {
            field.parentElement.style.transform = 'scale(1)';
            field.parentElement.style.zIndex = '1';
        });
    });
    
    console.log('🌟 Feedback page initialized with full functionality');
});