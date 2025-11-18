// Hide/Show Header on Scroll with Hover Reveal
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    let ticking = false;
    let isHovering = false;
    const HIDE_THRESHOLD = 80; // only hide when scrolled this far
    const DELTA = 10; // minimal delta before reacting

    if (!header) return;

    // Core scroll handler (uses requestAnimationFrame for performance)
    function onScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // avoid reacting to tiny scrolls
        if (Math.abs(currentScroll - lastScrollTop) <= DELTA) {
            ticking = false;
            return;
        }

        if (currentScroll > lastScrollTop && currentScroll > HIDE_THRESHOLD) {
            // Scrolling down -> hide header
            header.classList.add('header-hidden');
        } else {
            // Scrolling up -> show header
            header.classList.remove('header-hidden');
        }

        lastScrollTop = Math.max(0, currentScroll);
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // Show header on hover (desktop) or when touching near top (mobile)
    header.addEventListener('mouseenter', function() {
        isHovering = true;
        header.classList.remove('header-hidden');
    });

    header.addEventListener('mouseleave', function() {
        isHovering = false;
        // re-hide if we're scrolled down
        if ((window.pageYOffset || document.documentElement.scrollTop) > HIDE_THRESHOLD) {
            header.classList.add('header-hidden');
        }
    });

    // For desktops: reveal header when mouse moves near top edge
    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 50) {
            header.classList.remove('header-hidden');
        }
    });

    // For touch devices: reveal when user swipes/touches near top
    document.addEventListener('touchstart', function(e) {
        if (e.touches && e.touches[0] && e.touches[0].clientY < 60) {
            header.classList.remove('header-hidden');
        }
    }, { passive: true });

    // Ensure header visible at top
    if ((window.pageYOffset || document.documentElement.scrollTop) <= HIDE_THRESHOLD) {
        header.classList.remove('header-hidden');
    }
});
