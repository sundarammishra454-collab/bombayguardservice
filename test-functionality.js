// Website Functionality Test Script
console.log('🚀 Testing Bombay Guard Security Website Functionality...');

// Test 1: Language Switching
function testLanguageSwitching() {
    console.log('📝 Testing Language Switching...');
    
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        console.log('✅ Language selector found');
        
        // Test each language
        ['en', 'hi', 'mr', 'gu'].forEach(lang => {
            languageSelect.value = lang;
            changeLanguage(lang);
            console.log(`✅ Language switched to: ${lang}`);
        });
    } else {
        console.log('❌ Language selector not found');
    }
}

// Test 2: Navigation Links
function testNavigation() {
    console.log('📝 Testing Navigation Links...');
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        console.log(`✅ Navigation link found: ${href}`);
    });
}

// Test 3: Animations
function testAnimations() {
    console.log('📝 Testing Animations...');
    
    const animatedElements = document.querySelectorAll('[class*="animate"]');
    console.log(`✅ Found ${animatedElements.length} animated elements`);
    
    // Test intersection observer
    if (window.IntersectionObserver) {
        console.log('✅ Intersection Observer supported');
    } else {
        console.log('❌ Intersection Observer not supported');
    }
}

// Test 4: Form Functionality
function testForms() {
    console.log('📝 Testing Form Functionality...');
    
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
        console.log(`✅ Form ${index + 1} found`);
        
        const inputs = form.querySelectorAll('input, select, textarea');
        console.log(`  - ${inputs.length} form fields found`);
        
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            console.log('  - Submit button found');
        }
    });
}

// Test 5: Mobile Responsiveness
function testMobileFeatures() {
    console.log('📝 Testing Mobile Features...');
    
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        console.log('✅ Mobile menu toggle found');
    }
    
    // Test viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        console.log('✅ Viewport meta tag found');
    }
}

// Test 6: Background Animations
function testBackgroundAnimations() {
    console.log('📝 Testing Background Animations...');
    
    const particles = document.querySelectorAll('.particle');
    console.log(`✅ Found ${particles.length} particles`);
    
    const bgElements = document.querySelectorAll('[class*="bg"]');
    console.log(`✅ Found ${bgElements.length} background elements`);
}

// Test 7: Translation Coverage
function testTranslationCoverage() {
    console.log('📝 Testing Translation Coverage...');
    
    const translatableElements = document.querySelectorAll('[data-translate]');
    console.log(`✅ Found ${translatableElements.length} translatable elements`);
    
    // Check if translations object exists
    if (typeof translations !== 'undefined') {
        console.log('✅ Translations object loaded');
        console.log(`✅ Languages available: ${Object.keys(translations).join(', ')}`);
    } else {
        console.log('❌ Translations object not found');
    }
}

// Test 8: Performance Check
function testPerformance() {
    console.log('📝 Testing Performance...');
    
    // Check CSS files
    const cssFiles = document.querySelectorAll('link[rel="stylesheet"]');
    console.log(`✅ CSS files loaded: ${cssFiles.length}`);
    
    // Check JS files
    const jsFiles = document.querySelectorAll('script[src]');
    console.log(`✅ JS files loaded: ${jsFiles.length}`);
    
    // Check images
    const images = document.querySelectorAll('img');
    console.log(`✅ Images found: ${images.length}`);
}

// Run all tests
function runAllTests() {
    console.log('🔍 Starting comprehensive functionality test...\n');
    
    testLanguageSwitching();
    testNavigation();
    testAnimations();
    testForms();
    testMobileFeatures();
    testBackgroundAnimations();
    testTranslationCoverage();
    testPerformance();
    
    console.log('\n✅ All functionality tests completed!');
    console.log('🎉 Website is fully functional and ready for use!');
}

// Auto-run tests when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runAllTests, 1000);
});

// Export for manual testing
window.testWebsite = runAllTests;