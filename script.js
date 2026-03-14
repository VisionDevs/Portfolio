// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
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

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Dynamic year in footer
document.querySelector('.footer-bottom p').innerHTML = `&copy; ${new Date().getFullYear()} Rotondwa Vision Mavhungu. All rights reserved.`;

// UPDATED: Formspree form submission with AJAX for better UX
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Send to Formspree
            const response = await fetch('https://formspree.io/f/xwvrqdee', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success message
                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset form
                contactForm.reset();
                
                // Show success notification
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
            } else {
                // Error
                const data = await response.json();
                throw new Error(data.error || 'Failed to send');
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = '<span>Failed to Send</span> <i class="fas fa-exclamation-triangle"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            showNotification('Failed to send message. Please try again or email me directly.', 'error');
        } finally {
            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #2563eb, #10b981)';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Download CV functionality
document.getElementById('downloadCv')?.addEventListener('click', (e) => {
    e.preventDefault();
    // Create a link to your CV file
    const link = document.createElement('a');
    link.href = 'Rotondwa_Vision_Mavhungu_CV_insurtech.docx'; // Make sure this file exists
    link.download = 'Rotondwa_Vision_Mavhungu_CV.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('CV download started!', 'success');
});

// Notification function
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Intersection Observer for skill items animation
const skillItems = document.querySelectorAll('.skill-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
    observer.observe(item);
});

// Certificate cards staggered animation
const certCards = document.querySelectorAll('.cert-card');
certCards.forEach((card, index) => {
    card.style.animation = `slideInUp 0.5s ease ${index * 0.1}s both`;
});

// Timeline items animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.8s ease';
    timelineObserver.observe(item);
});

// Counter animation for experience badge
const experienceBadge = document.querySelector('.experience-badge .years');
if (experienceBadge) {
    let count = 0;
    const target = 1;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    function updateCount() {
        if (count < target) {
            count += increment;
            if (count > target) count = target;
            experienceBadge.textContent = Math.floor(count) + '+';
            requestAnimationFrame(updateCount);
        }
    }
    
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount();
            }
        });
    });
    
    badgeObserver.observe(experienceBadge);
}
