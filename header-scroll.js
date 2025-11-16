// Hide/Show Header on Scroll with Hover Reveal
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let scrollTimeout;
    let isHovering = false;
    
    if (!header) return;
    
    // Track scroll position
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Clear previous timeout
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        // Show header while scrolling
        header.classList.remove('header-hidden');
        
        // Hide header after scroll stops (if not hovering)
        scrollTimeout = setTimeout(function() {
            if (currentScroll > 80 && !isHovering) {
                header.classList.add('header-hidden');
            }
        }, 1500);
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
    
    // Show header on hover
    header.addEventListener('mouseenter', function() {
        isHovering = true;
        header.classList.remove('header-hidden');
    });
    
    header.addEventListener('mouseleave', function() {
        isHovering = false;
        if (window.pageYOffset > 80) {
            header.classList.add('header-hidden');
        }
    });
    
    // Show header when mouse is at the top of page
    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 50 && window.pageYOffset > 80) {
            header.classList.remove('header-hidden');
            isHovering = true;
            // Auto-hide again after 2 seconds of no interaction
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                if (!isHovering) {
                    header.classList.add('header-hidden');
                }
            }, 2000);
        }
    });
    
    // Keep header visible at the top of the page
    if (window.pageYOffset <= 80) {
        header.classList.remove('header-hidden');
    }
});
