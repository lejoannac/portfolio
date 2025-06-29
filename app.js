
document.addEventListener('DOMContentLoaded', function() {
    // Projects button scroll functionality
    const btn = document.getElementById('projects-scroll-btn');
    const projectsSection = document.querySelector('.projects-title');
    
    if (btn && projectsSection) {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default button behavior
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Projects button scroll functionality
    const btn = document.getElementById('discover-scroll-btn');
    const projectsSection = document.querySelector('.projects-title');
    
    if (btn && projectsSection) {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default button behavior
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});