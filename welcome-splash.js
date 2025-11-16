// Vibrant Welcome Splash Screen Script
document.addEventListener('DOMContentLoaded', function() {
    // Create splash screen HTML
    const splashHTML = `
        <div class="welcome-splash" id="welcomeSplash">
            <div class="splash-particles">
                <div class="splash-particle"></div>
                <div class="splash-particle"></div>
                <div class="splash-particle"></div>
                <div class="splash-particle"></div>
                <div class="splash-particle"></div>
            </div>
            <div class="splash-content">
                <div class="splash-logo-container">
                    <img src="1000079924.png" alt="Logo" class="splash-logo-img">
                    <div class="splash-logo-text">
                        <span class="splash-brand-text">BOMBAY</span> 
                        <span class="splash-guard-text">GUARD</span> 
                        <span class="splash-security-text">SERVICES</span>
                    </div>
                </div>
                <div class="splash-tagline">Elite Protection • Trusted Excellence</div>
                <div class="splash-loader"></div>
            </div>
        </div>
    `;
    
    // Insert splash screen at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', splashHTML);
    
    // Hide splash screen after 5 seconds with fade out effect
    setTimeout(function() {
        const splash = document.getElementById('welcomeSplash');
        if (splash) {
            splash.classList.add('fade-out');
            
            // Remove splash screen from DOM after fade out
            setTimeout(function() {
                splash.remove();
            }, 800);
        }
    }, 5000);
    
    // Add vibrant entrance animations to page elements
    setTimeout(function() {
        // Animate navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.animation = `slideInFromTop 0.6s ease-out ${index * 0.1}s both`;
            }, 500);
        });
        
        // Add sparkle effect to hero section
        addSparkleEffect();
    }, 5500);
});

// Add sparkle effect function
function addSparkleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleAnimation 2s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 10px white;
        `;
        
        hero.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }, 500);
}

// Add sparkle animation CSS
const sparkleCSS = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes slideInFromTop {
        0% {
            opacity: 0;
            transform: translateY(-30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject sparkle CSS
const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);