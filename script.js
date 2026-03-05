// Xpanse Custom Scripts

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes into full view
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // trigger initial load animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content.reveal-left, .hero-mockup.reveal-right').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // 2. Navbar Glass Effect on Scroll
    const navbar = document.querySelector('.glass-navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 27, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 27, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Mockup Phone Screenshot Slideshow
    const mockupImages = document.querySelectorAll('.mockup-img');
    if (mockupImages.length > 0) {
        let currentImageIndex = 0;

        setInterval(() => {
            // Remove active class from current image
            mockupImages[currentImageIndex].classList.remove('active');

            // Increment index, loop back to start if at the end
            currentImageIndex = (currentImageIndex + 1) % mockupImages.length;

            // Add active class to new image
            mockupImages[currentImageIndex].classList.add('active');
        }, 3000); // Change image every 3 seconds
    }
});
