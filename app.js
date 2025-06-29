document.addEventListener('DOMContentLoaded', function() {
    // Projects button scroll functionality
    const projectsBtn = document.getElementById('projects-scroll-btn');
    const discoverBtn = document.getElementById('discover-scroll-btn');
    const projectsHeaderBtn = document.getElementById('projects-header-btn');
    const projectsSection = document.getElementById('work');

    // For in-page scroll buttons
    if (projectsBtn && projectsSection) {
        projectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (discoverBtn && projectsSection) {
        discoverBtn.addEventListener('click', function(e) {
            e.preventDefault();
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // For header Projects button
    if (projectsHeaderBtn) {
        projectsHeaderBtn.addEventListener('click', function(e) {
            // If already on index.html, scroll smoothly
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ) {
                e.preventDefault();
                const section = document.getElementById('work');
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Otherwise, let the link navigate to index.html#work
            // (no need to preventDefault)
        });
    }
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}