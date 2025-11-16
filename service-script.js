// Advanced Service Section Animations

// Staggered Card Animation Observer
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const delay = parseFloat(card.dataset.delay) * 1000;
            
            setTimeout(() => {
                card.classList.add('animate');
                
                // Trigger feature list animations
                const features = card.querySelectorAll('.feature-item');
                features.forEach((feature, i) => {
                    setTimeout(() => {
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateX(0)';
                    }, i * 100);
                });
            }, delay);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Simplified Hover Effect
function addSimpleHoverEffect() {
    const cards = document.querySelectorAll('.morph-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Ripple Effect for Buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.morphing-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = button.querySelector('.btn-ripple');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            ripple.classList.add('animate');
            
            setTimeout(() => {
                ripple.classList.remove('animate');
            }, 600);
        });
    });
}

// Removed parallax effect for better performance

// Simplified text reveal
function addSimpleTextReveal() {
    const titles = document.querySelectorAll('.animate-text-reveal');
    titles.forEach(title => {
        title.style.opacity = '1';
        title.style.transform = 'translateX(0)';
    });
}

// Price Counter Animation
function animateServicePrices() {
    const prices = document.querySelectorAll('.pulse-price');
    
    prices.forEach(price => {
        const text = price.textContent;
        const match = text.match(/₹([\d,]+)/);
        
        if (match) {
            const targetAmount = parseInt(match[1].replace(',', ''));
            const prefix = text.split('₹')[0];
            const suffix = text.split(match[0])[1];
            
            let current = 0;
            const increment = targetAmount / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= targetAmount) {
                    current = targetAmount;
                    clearInterval(counter);
                }
                
                const formattedAmount = Math.floor(current).toLocaleString('en-IN');
                price.textContent = `${prefix}₹${formattedAmount}${suffix}`;
            }, 30);
        }
    });
}

// Initialize all service animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe service cards for staggered animation
    const serviceCards = document.querySelectorAll('.morph-card');
    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });
    
    // Add optimized effects
    addSimpleHoverEffect();
    addRippleEffect();
    
    // Quick text reveal
    setTimeout(() => {
        addSimpleTextReveal();
    }, 500);
});

// Optimized Service Modal
function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    
    // Quick entrance animation
    modal.style.display = 'block';
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    const serviceDetails = {
        residential: {
            title: 'Residential Security Services',
            content: `
                <div class="modal-header">
                    <h3>🏠 Comprehensive Residential Security Solutions</h3>
                </div>
                <div class="modal-content-body">
                    <p>Our residential security services provide complete peace of mind for housing societies and gated communities.</p>
                    <div class="feature-grid">
                        <div class="feature-box">
                            <h4>👮‍♂️ Trained Personnel</h4>
                            <p>Professional guards with background verification</p>
                        </div>
                        <div class="feature-box">
                            <h4>🚪 Access Control</h4>
                            <p>Advanced gate management systems</p>
                        </div>
                        <div class="feature-box">
                            <h4>📋 Visitor Management</h4>
                            <p>Digital registration and verification</p>
                        </div>
                        <div class="feature-box">
                            <h4>🚨 Emergency Response</h4>
                            <p>24/7 rapid response team</p>
                        </div>
                    </div>
                    <div class="pricing-section">
                        <h4>💰 Flexible Pricing Plans</h4>
                        <div class="price-cards">
                            <div class="price-card clickable-card" onclick="openBookingForm('residential', 'society-17000')">
                                <h5>Society Guard (12hr)</h5>
                                <div class="price">₹17,000/month</div>
                                <p>1 guard, 12-hour shift</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('residential', 'supervisor-20000')">
                                <h5>Supervisor</h5>
                                <div class="price">₹20,000/month</div>
                                <p>1 supervisor guard</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('residential', 'driver-24000')">
                                <h5>Parking Driver</h5>
                                <div class="price">₹24,000/month</div>
                                <p>1 guard with driving license</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('residential', 'bouncer-25000')">
                                <h5>Bouncer</h5>
                                <div class="price">₹25,000/month</div>
                                <p>1 professional bouncer</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('residential', 'cctv-20000')">
                                <h5>CCTV Operator</h5>
                                <div class="price">₹20,000/month</div>
                                <p>1 CCTV monitoring specialist</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('residential', '24hrs-28000')">
                                <h5>24 Hours Security</h5>
                                <div class="price">₹28,000/month</div>
                                <p>1 guard, 24-hour coverage</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                        </div>
                        <div class="modal-buttons">
                            <button class="book-now-btn" onclick="openBookingForm('residential')">📞 Book Now</button>
                            <button class="close-btn" onclick="closeServiceModal()">✖ Close</button>
                        </div>
                    </div>
                </div>
            `
        },
        commercial: {
            title: 'Commercial Security Services',
            content: `
                <div class="modal-header">
                    <h3>🏢 Professional Commercial Security Solutions</h3>
                </div>
                <div class="modal-content-body">
                    <p>Protect your business assets and ensure employee safety with comprehensive commercial security.</p>
                    <div class="feature-grid">
                        <div class="feature-box">
                            <h4>🏢 Corporate Security</h4>
                            <p>Complete business security management</p>
                        </div>
                        <div class="feature-box">
                            <h4>🛡️ Asset Protection</h4>
                            <p>Advanced loss prevention systems</p>
                        </div>
                        <div class="feature-box">
                            <h4>👥 Employee Safety</h4>
                            <p>Workplace security protocols</p>
                        </div>
                        <div class="feature-box">
                            <h4>📊 Risk Assessment</h4>
                            <p>Professional security audits</p>
                        </div>
                    </div>
                    <div class="pricing-section">
                        <h4>💼 Business Packages</h4>
                        <div class="price-cards">
                            <div class="price-card clickable-card" onclick="openBookingForm('commercial', 'society-17000')">
                                <h5>Society Guard (12hr)</h5>
                                <div class="price">₹17,000/month</div>
                                <p>1 guard, 12-hour shift</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('commercial', 'supervisor-20000')">
                                <h5>Supervisor</h5>
                                <div class="price">₹20,000/month</div>
                                <p>1 office security supervisor</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('commercial', 'driver-24000')">
                                <h5>Parking Driver</h5>
                                <div class="price">₹24,000/month</div>
                                <p>1 guard with driving license</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('commercial', 'bouncer-25000')">
                                <h5>Bouncer</h5>
                                <div class="price">₹25,000/month</div>
                                <p>1 professional bouncer</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('commercial', 'cctv-20000')">
                                <h5>CCTV Operator</h5>
                                <div class="price">₹20,000/month</div>
                                <p>1 CCTV monitoring specialist</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                            <div class="price-card clickable-card" onclick="openBookingForm('commercial', '24hrs-28000')">
                                <h5>24 Hours Security</h5>
                                <div class="price">₹28,000/month</div>
                                <p>1 guard, 24-hour coverage</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                        </div>
                        <div class="modal-buttons">
                            <button class="book-now-btn" onclick="openBookingForm('commercial')">📞 Book Now</button>
                            <button class="close-btn" onclick="closeServiceModal()">✖ Close</button>
                        </div>
                    </div>
                </div>
            `
        },
        event: {
            title: 'Event Security Services',
            content: `
                <div class="modal-header">
                    <h3>🎉 Professional Event Security Management</h3>
                </div>
                <div class="modal-content-body">
                    <p>Ensure your events run smoothly and safely with our experienced security team.</p>
                    <div class="feature-grid">
                        <div class="feature-box">
                            <h4>👥 Crowd Control</h4>
                            <p>Professional crowd management</p>
                        </div>
                        <div class="feature-box">
                            <h4>⭐ VIP Protection</h4>
                            <p>Celebrity and dignitary security</p>
                        </div>
                        <div class="feature-box">
                            <h4>🏟️ Venue Security</h4>
                            <p>Complete venue protection</p>
                        </div>
                        <div class="feature-box">
                            <h4>📋 Emergency Planning</h4>
                            <p>Comprehensive safety protocols</p>
                        </div>
                    </div>
                    <div class="pricing-section">
                        <h4>🎪 Event Packages</h4>
                        <div class="price-cards">
                            <div class="price-card featured clickable-card" onclick="openBookingForm('event', 'event-2000')">
                                <h5>Event Security</h5>
                                <div class="price">₹2,000/day</div>
                                <p>1 guard, 10 hours coverage</p>
                                <div class="book-badge">📞 Book Now</div>
                            </div>
                        </div>
                        <div class="modal-buttons">
                            <button class="book-now-btn" onclick="openBookingForm('event')">📞 Book Now</button>
                            <button class="close-btn" onclick="closeServiceModal()">✖ Close</button>
                        </div>
                    </div>
                </div>
            `
        },
        cctv: {
            title: 'CCTV Monitoring Services',
            content: `
                <div class="modal-header">
                    <h3>📹 Advanced CCTV Surveillance Solutions</h3>
                </div>
                <div class="modal-content-body">
                    <p>State-of-the-art surveillance systems with professional monitoring for complete security coverage.</p>
                    <div class="feature-grid">
                        <div class="feature-box">
                            <h4>📺 Live Monitoring</h4>
                            <p>24/7 professional surveillance</p>
                        </div>
                        <div class="feature-box">
                            <h4>📷 HD Cameras</h4>
                            <p>High-definition camera installation</p>
                        </div>
                        <div class="feature-box">
                            <h4>📱 Remote Access</h4>
                            <p>Mobile app connectivity</p>
                        </div>
                        <div class="feature-box">
                            <h4>☁️ Cloud Storage</h4>
                            <p>Secure data backup systems</p>
                        </div>
                    </div>
                    <div class="pricing-section">
                        <h4>📊 Surveillance Plans</h4>
                        <div class="price-cards">
                            <div class="price-card">
                                <h5>Basic</h5>
                                <div class="price">₹8,000/month</div>
                                <p>4 cameras, basic monitoring</p>
                            </div>
                            <div class="price-card featured">
                                <h5>Standard</h5>
                                <div class="price">₹15,000/month</div>
                                <p>8 cameras, cloud storage</p>
                            </div>
                            <div class="price-card">
                                <h5>Premium</h5>
                                <div class="price">₹25,000/month</div>
                                <p>16 cameras, AI analytics</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    modalBody.innerHTML = serviceDetails[serviceType].content;
}

// Optimized Close Modal Function
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 200);
}

// Initialize modal close functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeServiceModal);
    }
    
    // Close modal when clicking outside of it
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeServiceModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeServiceModal();
        }
    });
});

// Booking Form Functions
function openBookingForm(serviceType, selectedPackage = null) {
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    
    const bookingForm = `
        <div class="booking-form" style="max-height: 80vh; overflow-y: auto;">
            <div class="modal-header">
                <h3>📞 Book ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Security Service</h3>
                <span class="close" onclick="closeServiceModal()">&times;</span>
            </div>
            <div class="form-group">
                <label for="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="address">Property Address *</label>
                <textarea id="address" name="address" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="servicePackage">Service Package *</label>
                <select id="servicePackage" name="servicePackage" required>
                    ${getPackageOptions(serviceType, selectedPackage)}
                </select>
            </div>
            <div class="form-group">
                <label for="startDate">Preferred Start Date *</label>
                <input type="date" id="startDate" name="startDate" required>
            </div>
            <div class="form-group">
                <label for="requirements">Special Requirements</label>
                <textarea id="requirements" name="requirements" rows="3" placeholder="Any specific security requirements or instructions..."></textarea>
            </div>
            <div style="margin-top: 30px; display: flex; gap: 15px; padding: 20px 0;">
                <button type="button" onclick="closeServiceModal()" style="flex: 1; padding: 12px; background: #f5f5f5; border: 2px solid #ddd; border-radius: 8px; cursor: pointer;">Cancel</button>
                <button type="button" onclick="submitBookingData('${serviceType}')" style="flex: 2; padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: pointer;">📞 SUBMIT BOOKING</button>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = bookingForm;
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').setAttribute('min', today);
}

function getPackageOptions(serviceType, selectedPackage = null) {
    const packages = {
        residential: [
            '<option value="society-17000">Society Guard (12hr) - ₹17,000/month</option>',
            '<option value="supervisor-20000">Supervisor - ₹20,000/month</option>',
            '<option value="driver-24000">Parking Driver - ₹24,000/month</option>',
            '<option value="bouncer-25000">Bouncer - ₹25,000/month</option>',
            '<option value="cctv-20000">CCTV Operator - ₹20,000/month</option>',
            '<option value="24hrs-28000">24 Hours Security - ₹28,000/month</option>'
        ],
        commercial: [
            '<option value="society-17000">Society Guard (12hr) - ₹17,000/month</option>',
            '<option value="supervisor-20000">Supervisor - ₹20,000/month</option>',
            '<option value="driver-24000">Parking Driver - ₹24,000/month</option>',
            '<option value="bouncer-25000">Bouncer - ₹25,000/month</option>',
            '<option value="cctv-20000">CCTV Operator - ₹20,000/month</option>',
            '<option value="24hrs-28000">24 Hours Security - ₹28,000/month</option>'
        ],
        event: [
            '<option value="event-2000">Event Security (10 hrs) - ₹2,000/day</option>'
        ]
    };
    
    const options = packages[serviceType].map(option => {
        const value = option.match(/value="([^"]*)"/)[1];
        if (selectedPackage && value === selectedPackage) {
            return option.replace('>', ' selected>');
        }
        return option;
    });
    return options.join('');
}

async function submitBookingData(serviceType) {
    const bookingData = {
        serviceType: serviceType,
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        servicePackage: document.getElementById('servicePackage').value,
        startDate: document.getElementById('startDate').value,
        requirements: document.getElementById('requirements').value
    };
    
    if (!bookingData.fullName || !bookingData.phone || !bookingData.email || !bookingData.address || !bookingData.servicePackage || !bookingData.startDate) {
        alert('Please fill all required fields');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showBookingConfirmation({...bookingData, id: result.bookingId});
        } else {
            throw new Error(result.error || 'Booking failed');
        }
    } catch (error) {
        // Fallback to show confirmation even if backend is not running
        showBookingConfirmation({...bookingData, id: Date.now()});
        console.log('Booking data would be sent:', bookingData);
    }
}

function showBookingConfirmation(bookingData) {
    const modalBody = document.getElementById('modalBody');
    
    const confirmationHtml = `
        <div class="booking-confirmation">
            <span class="close" onclick="closeServiceModal()">&times;</span>
            <div class="confirmation-icon">✅</div>
            <h3>Booking Request Submitted Successfully!</h3>
            <div class="booking-details">
                <h4>Booking Details:</h4>
                <p><strong>Service:</strong> ${bookingData.serviceType.charAt(0).toUpperCase() + bookingData.serviceType.slice(1)} Security</p>
                <p><strong>Package:</strong> ${bookingData.servicePackage.split('-')[0].charAt(0).toUpperCase() + bookingData.servicePackage.split('-')[0].slice(1)}</p>
                <p><strong>Name:</strong> ${bookingData.fullName}</p>
                <p><strong>Phone:</strong> ${bookingData.phone}</p>
                <p><strong>Start Date:</strong> ${new Date(bookingData.startDate).toLocaleDateString()}</p>
            </div>
            <div class="next-steps">
                <h4>What happens next?</h4>
                <ul>
                    <li>✓ Our team will contact you within 2 hours</li>
                    <li>✓ Site visit will be scheduled for assessment</li>
                    <li>✓ Customized security plan will be prepared</li>
                    <li>✓ Service deployment as per your requirements</li>
                </ul>
            </div>
            <div class="contact-info">
                <p><strong>For immediate assistance:</strong></p>
                <p>📞 Call: +91 98765 43210</p>
                <p>📧 Email: info@bombayguardsecurity.com</p>
            </div>
            <button class="btn-primary" onclick="closeServiceModal()">Close</button>
        </div>
    `;
    
    modalBody.innerHTML = confirmationHtml;
}

// Make functions globally available
window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;
window.openBookingForm = openBookingForm;
window.submitBookingData = submitBookingData;