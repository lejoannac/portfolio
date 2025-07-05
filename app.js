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

function typeWriterWithCursor(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor and keep text permanently
            element.innerHTML = text;
        }
    }
    type();
}

// Initialize the typing effect
document.addEventListener('DOMContentLoaded', function() {
    const line1 = document.querySelector('.main-title .line:first-child');
    const line2 = document.querySelector('.main-title .line:last-child');
    
    // Hide both lines initially
    line1.style.opacity = '0';
    line2.style.opacity = '0';
    
    // Type "JOANNA" first
    setTimeout(() => {
        line1.style.opacity = '1';
        typeWriterWithCursor(line1, 'JOANNA', 150);
    }, 500);
    
    // Type "CAI" after first line is done
    setTimeout(() => {
        line2.style.opacity = '1';
        typeWriterWithCursor(line2, 'CAI', 150);
    }, 2000);
});

// Add this to your app.js file

function copyEmail() {
    const email = 'jxcai534@gmail.com';
    
    navigator.clipboard.writeText(email).then(function() {
        showCopyPopup();
    }).catch(function(err) {
        console.error('Failed to copy email: ', err);
        // Fallback for older browsers
        fallbackCopyText(email);
        showCopyPopup();
    });
}

function showCopyPopup() {
    // Create popup element
    const popup = document.createElement('div');
    popup.innerHTML = '✓ Email copied to clipboard!';
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4CAF50;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(popup);
    
    // Show popup
    setTimeout(() => {
        popup.style.opacity = '1';
    }, 10);
    
    // Hide and remove popup after 2 seconds
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 300);
    }, 2000);
}

// Fallback copy function for older browsers
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}