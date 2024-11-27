document.addEventListener('DOMContentLoaded', function () {
    // Initialize tool cards hover effects
    initializeToolCards();

    // Initialize premium banner
    initializePremiumBanner();

    // Initialize navigation
    initializeNavigation();
});

function initializeToolCards() {
    const toolCards = document.querySelectorAll('.tool-item');

    toolCards.forEach(card => {
        // Add hover animation class
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(5px)';
            const icon = this.querySelector('.tool-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-5deg)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0)';
            const icon = this.querySelector('.tool-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });

        // Add click effect for non-link cards
        if (!card.hasAttribute('href')) {
            card.addEventListener('click', function () {
                const badge = this.querySelector('.status-badge');
                if (badge && badge.classList.contains('premium')) {
                    showPremiumModal();
                }
            });
        }
    });
}

function initializePremiumBanner() {
    const premiumBanner = document.querySelector('.premium-banner');
    if (premiumBanner) {
        premiumBanner.addEventListener('click', function () {
            showPremiumModal();
        });
    }
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Set active state based on current path
        if (link.getAttribute('href') === currentPath ||
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }

        // Add hover animation
        link.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        link.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

function showPremiumModal() {
    // Simple alert for now, could be replaced with a modal
    alert('Upgrade to Premium to access this feature!');
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-nav');
});

// Handle responsive navigation
const mediaQuery = window.matchMedia('(max-width: 768px)');
function handleMobileNav(e) {
    const nav = document.querySelector('.main-nav');
    if (e.matches) {
        // Mobile view adjustments
        nav.setAttribute('aria-label', 'Main navigation - tap to expand');
    } else {
        // Desktop view adjustments
        nav.setAttribute('aria-label', 'Main navigation');
    }
}
mediaQuery.addListener(handleMobileNav);
handleMobileNav(mediaQuery);

// Add loading states for tool interactions
document.querySelectorAll('.tool-item').forEach(tool => {
    if (tool.hasAttribute('href')) {
        tool.addEventListener('click', function (e) {
            const icon = this.querySelector('.tool-icon');
            if (icon) {
                icon.style.opacity = '0.7';
                setTimeout(() => {
                    icon.style.opacity = '1';
                }, 200);
            }
        });
    }
});
