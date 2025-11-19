// Vibrant Welcome Splash Screen Script
document.addEventListener('DOMContentLoaded', function() {
    // Create splash screen using safe DOM creation
    const splashDiv = document.createElement('div');
    splashDiv.id = 'welcomeSplash';
    splashDiv.className = 'welcome-splash';
    
    const particlesDiv = document.createElement('div');
    particlesDiv.className = 'splash-particles';
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'splash-particle';
        particlesDiv.appendChild(particle);
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'splash-content';
    
    const logoContainer = document.createElement('div');
    logoContainer.className = 'splash-logo-container';
    
    const img = document.createElement('img');
    img.src = '1000079924.png';
    img.alt = 'Logo';
    img.className = 'splash-logo-img';
    
    const logoText = document.createElement('div');
    logoText.className = 'splash-logo-text';
    
    const spanBomb = document.createElement('span');
    spanBomb.className = 'splash-brand-text';
    spanBomb.textContent = 'BOMBAY';
    
    const spanGuard = document.createElement('span');
    spanGuard.className = 'splash-guard-text';
    spanGuard.textContent = 'GUARD';
    
    const spanServ = document.createElement('span');
    spanServ.className = 'splash-security-text';
    spanServ.textContent = 'SERVICES';
    
    logoText.appendChild(spanBomb);
    logoText.appendChild(document.createTextNode(' '));
    logoText.appendChild(spanGuard);
    logoText.appendChild(document.createTextNode(' '));
    logoText.appendChild(spanServ);
    
    logoContainer.appendChild(img);
    logoContainer.appendChild(logoText);
    
    const tagline = document.createElement('div');
    tagline.className = 'splash-tagline';
    tagline.textContent = 'Elite Protection • Trusted Excellence';
    
    const loader = document.createElement('div');
    loader.className = 'splash-loader';
    
    contentDiv.appendChild(logoContainer);
    contentDiv.appendChild(tagline);
    contentDiv.appendChild(loader);
    
    splashDiv.appendChild(particlesDiv);
    splashDiv.appendChild(contentDiv);
    
    document.body.insertBefore(splashDiv, document.body.firstChild);
    
    // Hide splash screen after 1 second with fade out effect
    setTimeout(function() {
        const splash = document.getElementById('welcomeSplash');
        if (splash) {
            splash.classList.add('fade-out');
            
            // Remove splash screen from DOM after fade out
            setTimeout(function() {
                splash.remove();
            }, 800);
        }
    }, 1000);
    
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
    }, 1800);
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