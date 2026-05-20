export function initAnimations() {
    // =========================
    // NAVBAR SCROLL EFFECT
    // =========================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // =========================
    // FADE-IN ON SCROLL (Observer)
    // =========================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15
    });

    const hiddenElements = document.querySelectorAll(
        '.tech-card, .pipeline-item, .vision-right, .demo-box, .stat-card'
    );
    
    hiddenElements.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });
}