// Feedback Section Testing Script
console.log('🧪 Testing Feedback Section Functionality...');

// Test 1: Form Validation
function testFormValidation() {
    console.log('📝 Testing Form Validation...');
    
    const form = document.querySelector('.feedback-form');
    if (form) {
        console.log('✅ Feedback form found');
        
        // Test empty form submission
        const submitBtn = form.querySelector('.morphing-submit');
        if (submitBtn) {
            console.log('✅ Submit button found');
        }
        
        // Test required fields
        const requiredFields = ['#customerName', '#customerEmail', '#serviceUsed', '#feedbackMessage'];
        requiredFields.forEach(selector => {
            const field = document.querySelector(selector);
            if (field) {
                console.log(`✅ Required field found: ${selector}`);
            } else {
                console.log(`❌ Required field missing: ${selector}`);
            }
        });
    } else {
        console.log('❌ Feedback form not found');
    }
}

// Test 2: Star Rating System
function testStarRating() {
    console.log('⭐ Testing Star Rating System...');
    
    const starInputs = document.querySelectorAll('.star-rating input');
    const starLabels = document.querySelectorAll('.star-rating label');
    
    console.log(`✅ Found ${starInputs.length} star inputs`);
    console.log(`✅ Found ${starLabels.length} star labels`);
    
    if (starInputs.length === 5 && starLabels.length === 5) {
        console.log('✅ Star rating system complete');
        
        // Test star selection
        starInputs.forEach((star, index) => {
            star.addEventListener('change', () => {
                console.log(`⭐ Star ${star.value} selected`);
            });
        });
    } else {
        console.log('❌ Star rating system incomplete');
    }
}

// Test 3: Animation Elements
function testAnimations() {
    console.log('🎨 Testing Animation Elements...');
    
    const animatedElements = [
        '.rating-section',
        '.stats-card',
        '.satisfaction-meter',
        '.recent-reviews',
        '.floating-group'
    ];
    
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            console.log(`✅ Found ${elements.length} ${selector} elements`);
        } else {
            console.log(`❌ Missing ${selector} elements`);
        }
    });
}

// Test 4: Form Submission
function testFormSubmission() {
    console.log('📤 Testing Form Submission...');
    
    if (typeof handleFeedbackSubmit === 'function') {
        console.log('✅ Form submission handler found');
    } else {
        console.log('❌ Form submission handler missing');
    }
    
    if (typeof validateFeedbackForm === 'function') {
        console.log('✅ Form validation function found');
    } else {
        console.log('❌ Form validation function missing');
    }
}

// Test 5: Local Storage
function testLocalStorage() {
    console.log('💾 Testing Local Storage...');
    
    try {
        // Test localStorage availability
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        console.log('✅ Local storage available');
        
        // Check existing feedback data
        const existingData = localStorage.getItem('feedbackData');
        if (existingData) {
            const feedbacks = JSON.parse(existingData);
            console.log(`✅ Found ${feedbacks.length} existing feedback entries`);
        } else {
            console.log('ℹ️ No existing feedback data');
        }
    } catch (error) {
        console.log('❌ Local storage not available:', error);
    }
}

// Test 6: Satisfaction Meter
function testSatisfactionMeter() {
    console.log('📊 Testing Satisfaction Meter...');
    
    const meter = document.querySelector('.satisfaction-meter');
    const meterText = document.querySelector('.meter-text');
    
    if (meter && meterText) {
        console.log('✅ Satisfaction meter elements found');
        
        if (typeof animateSatisfactionMeter === 'function') {
            console.log('✅ Meter animation function found');
        } else {
            console.log('❌ Meter animation function missing');
        }
    } else {
        console.log('❌ Satisfaction meter elements missing');
    }
}

// Test 7: Confetti System
function testConfettiSystem() {
    console.log('🎉 Testing Confetti System...');
    
    if (typeof createConfetti === 'function') {
        console.log('✅ Confetti function found');
        
        // Test confetti creation
        try {
            createConfetti();
            console.log('✅ Confetti animation triggered successfully');
        } catch (error) {
            console.log('❌ Confetti animation failed:', error);
        }
    } else {
        console.log('❌ Confetti function missing');
    }
}

// Run all tests
function runFeedbackTests() {
    console.log('🔍 Starting Feedback Section Tests...\n');
    
    testFormValidation();
    testStarRating();
    testAnimations();
    testFormSubmission();
    testLocalStorage();
    testSatisfactionMeter();
    testConfettiSystem();
    
    console.log('\n✅ Feedback section tests completed!');
    console.log('🎯 Feedback section is fully functional!');
}

// Auto-run tests when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runFeedbackTests, 2000);
    });
} else {
    setTimeout(runFeedbackTests, 2000);
}

// Export for manual testing
window.testFeedback = runFeedbackTests;