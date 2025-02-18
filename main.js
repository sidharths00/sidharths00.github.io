// Smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const start = window.pageYOffset;
            const targetPosition = target.getBoundingClientRect().top;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, start, targetPosition, 1000);
                window.scrollTo(0, run);
                if (timeElapsed < 1000) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// Parallax effect for hero section
const hero = document.querySelector('#hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scroll * 0.5}px)`;
        heroContent.style.transform = `translateY(${scroll * 0.8}px)`;
    }
});

// Interactive background effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

// Initial check for elements in view
fadeInOnScroll();

// Add scroll event listener
window.addEventListener('scroll', fadeInOnScroll);

// Magnetic effect for project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / 15;
        const deltaY = (y - centerY) / 15;
        
        card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.2}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translate(0, 0) rotate(0deg)';
    });
});

// Dynamic text effect for the hero section
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let index = 0;
    const typeWriter = () => {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 40);
        }
    };
    
    // Start the typing effect when the page loads
    window.addEventListener('load', typeWriter);
}

// Project Item Expansion
document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't toggle if clicking a link
            if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                return;
            }
            
            // Toggle expanded class
            item.classList.toggle('expanded');
        });
    });
});

// Project Details Expansion
document.addEventListener('DOMContentLoaded', () => {
    const expandButtons = document.querySelectorAll('.expand-details');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            button.setAttribute('aria-expanded', !isExpanded);
            if (isExpanded) {
                details.style.display = 'none';
            } else {
                details.style.display = 'block';
            }
        });
    });
});
