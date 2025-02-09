// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic year in footer
document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} Rotondwa Vision Mavhungu. All rights reserved.`;