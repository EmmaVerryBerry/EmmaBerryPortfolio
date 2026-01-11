// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Scroll Progress Bar
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
};

createScrollProgress();

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(254, 249, 245, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 145, 71, 0.25)';
    } else {
        navbar.style.background = 'rgba(254, 249, 245, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 145, 71, 0.2)';
    }
});

// Floating Particles System
const createParticles = () => {
    const particleCount = 15;
    const heroSection = document.querySelector('.hero');

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size between 3 and 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random horizontal position
        particle.style.left = `${Math.random() * 100}%`;

        // Random delay
        particle.style.animationDelay = `${Math.random() * 15}s`;

        // Random duration between 10-20s
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;

        // Alternate colors
        if (Math.random() > 0.5) {
            particle.style.background = '#babd8d'; // sage
        }

        heroSection.appendChild(particle);
    }
};

createParticles();

// Advanced Scroll Reveal with Intersection Observer
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, revealOptions);

// Observe sections with fade-in effect
const sections = document.querySelectorAll('section:not(.hero)');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealOnScroll.observe(section);

    section.addEventListener('transitionend', () => {
        if (section.classList.contains('reveal')) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Enhanced reveal for cards with stagger effect
const staggerReveal = (selector, delay = 100) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        element.style.transitionDelay = `${index * delay}ms`;
        revealOnScroll.observe(element);
    });
};

staggerReveal('.skill-category', 150);
staggerReveal('.project-card', 120);
staggerReveal('.leadership-card', 100);
staggerReveal('.timeline-item', 200);

// About text paragraphs reveal
const aboutParagraphs = document.querySelectorAll('.about-text p');
aboutParagraphs.forEach((p, index) => {
    p.style.transitionDelay = `${index * 200}ms`;
    revealOnScroll.observe(p);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation state
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// Advanced Parallax Effect for Hero Shapes
let ticking = false;

const updateParallax = () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.floating-shape');

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        const rotation = scrolled * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });

    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Magnetic Button Effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Skill Tag Wave Animation on Hover
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    const tags = category.querySelectorAll('.skill-tag');

    category.addEventListener('mouseenter', () => {
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(-5px) scale(1.05)';
                setTimeout(() => {
                    tag.style.transform = '';
                }, 200);
            }, index * 50);
        });
    });
});

// Timeline Pulse Effect on Scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const pulseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const dot = entry.target.querySelector('.timeline-dot');
            if (dot) {
                dot.style.animation = 'pulse 0.6s ease';
                setTimeout(() => {
                    dot.style.animation = '';
                }, 600);
            }
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => pulseObserver.observe(item));

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.4); }
    }
`;
document.head.appendChild(style);

// Project Card 3D Tilt Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Cursor Trail Effect (subtle)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.borderRadius = '50%';
        trail.style.background = 'rgba(255, 145, 71, 0.3)';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.transition = 'all 0.5s ease';

        document.body.appendChild(trail);
        cursorTrail.push(trail);

        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 50);

        setTimeout(() => {
            trail.remove();
            cursorTrail.shift();
        }, 500);

        if (cursorTrail.length > maxTrailLength) {
            const oldest = cursorTrail.shift();
            if (oldest && oldest.parentNode) {
                oldest.remove();
            }
        }
    }
});

// Section Title Underline Animation
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const title = entry.target;
            title.style.animation = 'titleReveal 0.8s ease forwards';
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => titleObserver.observe(title));

const titleStyle = document.createElement('style');
titleStyle.textContent = `
    @keyframes titleReveal {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(titleStyle);

// Console greeting with new colors
console.log('%c👋 Hi there!', 'font-size: 20px; color: #ff9147; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #77685d;');
console.log('%c💼 Looking to connect? Email me at Emmamb275@gmail.com', 'font-size: 14px; color: #ff9147;');
console.log('%c✨ Built with love and lots of JavaScript magic', 'font-size: 12px; color: #babd8d; font-style: italic;');

// Loading animation complete
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-detailed');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'grid';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const cardCategories = card.getAttribute('data-category');
                    if (cardCategories && cardCategories.includes(filterValue)) {
                        card.style.display = 'grid';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Update active nav link based on current page
const updateActiveNavForPage = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
};

// Run on page load
updateActiveNavForPage();

