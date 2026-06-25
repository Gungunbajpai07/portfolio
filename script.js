document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Logic ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Accessibility state update
            const isOpen = navMenu.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close sidebar layout when individual navigation link items are triggered
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', false);
            });
        });
    }

    // --- Performance Optimization: Intersection Observer for Scroll Reveals ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve after element enters viewing scope to optimize computational overhead
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Active Link Indicator on Scroll ---
    const sections = document.querySelectorAll('section');
    
    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => {
        activeSectionObserver.observe(section);
    });
});