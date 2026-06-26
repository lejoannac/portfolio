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

    // Only run on contact page
    if (document.querySelector('.contact-title')) {
        const line1 = document.getElementById('contact-line-1');
        const line2 = document.getElementById('contact-line-2');
        if (line1 && line2) {
            line1.style.opacity = '0';
            line2.style.opacity = '0';
            setTimeout(() => {
                line1.style.opacity = '1';
                typeWriterWithCursor(line1, 'SHOOT A', 120);
            }, 300);
            setTimeout(() => {
                line2.style.opacity = '1';
                typeWriterWithCursor(line2, 'MESSAGE', 120);
            }, 1800);
        }
    }
});

function setDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('dark-mode');
        try { localStorage.setItem('darkMode', 'true'); } catch(e) {}
    } else {
        document.body.classList.remove('dark-mode');
        try { localStorage.setItem('darkMode', 'false'); } catch(e) {}
    }
}

function toggleDarkMode() {
    const enabled = document.body.classList.contains('dark-mode');
    setDarkMode(!enabled);
}

function toggleMobileMenu() {
    console.log('toggleMobileMenu called!');
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    console.log('Hamburger element:', hamburger);
    console.log('Mobile menu element:', mobileMenu);
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    console.log('Hamburger classes:', hamburger.classList.toString());
    console.log('Mobile menu classes:', mobileMenu.classList.toString());
}

// Close mobile menu when clicking on a menu item
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const hamburger = document.querySelector('.hamburger-menu');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
});

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
    if (document.body.classList.contains('contact-page')) return;

    const lines = document.querySelectorAll('.main-title .line');
    if (lines.length >= 2) {
        const line1 = lines[0];
        const line2 = lines[lines.length - 1];
        line1.style.opacity = '0';
        line2.style.opacity = '0';
        setTimeout(() => {
            line1.style.opacity = '1';
            typeWriterWithCursor(line1, 'JOANNA', 150);
        }, 500);
        setTimeout(() => {
            line2.style.opacity = '1';
            typeWriterWithCursor(line2, 'CAI', 150);
        }, 2000);
    } else if (lines.length === 1) {
        const line = lines[0];
        const text = (line.textContent || '').trim();
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '1';
            typeWriterWithCursor(line, text, 120);
        }, 500);
    }
});

// Initialize dark mode from saved preference
document.addEventListener('DOMContentLoaded', function() {
    try {
        const darkPref = localStorage.getItem('darkMode');
        if (darkPref === 'true') setDarkMode(true);
    } catch (e) {
        // ignore
    }
});

// Project card modal: click a project tile to open its full case study,
// back out to return to the grid. Supports deep-linking via #project-id.
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('projectModalOverlay');
    if (!overlay) return; // not on projects page

    const closeBtn = document.getElementById('projectModalClose');
    const backBtn = document.getElementById('projectModalBack');
    const scroll = document.getElementById('projectModalScroll');
    const tiles = document.querySelectorAll('.project-tile, [data-project]');
    let lastFocused = null;

    function openProjectModal(id, opts) {
        const target = document.getElementById(id);
        if (!target || !target.classList.contains('project-detail')) return;
        document.querySelectorAll('.project-detail.active').forEach(d => d.classList.remove('active'));
        target.classList.add('active');
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (scroll) scroll.scrollTop = 0;
        if (!opts || opts.pushState !== false) {
            history.pushState({ project: id }, '', '#' + id);
        }
        closeBtn.focus();
    }

    function closeProjectModal(opts) {
        if (!overlay.classList.contains('open')) return;
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if ((!opts || opts.popHistory !== false) && window.location.hash) {
            history.pushState(null, '', window.location.pathname + window.location.search);
        }
        if (lastFocused) lastFocused.focus();
    }

    tiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            e.preventDefault();
            lastFocused = tile;
            openProjectModal(tile.dataset.project);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => closeProjectModal());
    if (backBtn) backBtn.addEventListener('click', () => closeProjectModal());

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeProjectModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeProjectModal();
    });

    window.addEventListener('popstate', function() {
        const id = window.location.hash.substring(1);
        const el = id ? document.getElementById(id) : null;
        if (el && el.classList.contains('project-detail')) {
            openProjectModal(id, { pushState: false });
        } else {
            closeProjectModal({ popHistory: false });
        }
    });

    // Open directly if the page was loaded with a project hash (e.g. linked from index.html)
    if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const el = document.getElementById(id);
        if (el && el.classList.contains('project-detail')) {
            openProjectModal(id, { pushState: false });
        }
    }
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
    
    // Check if dark mode is active
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${isDarkMode ? 'rgba(34, 51, 102, 0.9)' : 'rgba(0, 31, 77, 0.9)'};
        color: #fff;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Inter', 'Segoe UI', Arial, Helvetica, sans-serif;
        box-shadow: 0 4px 16px rgba(0, 31, 77, 0.3);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        border: 2px solid ${isDarkMode ? 'rgba(34, 51, 102, 0.8)' : 'rgba(0, 31, 77, 0.8)'};
        backdrop-filter: blur(8px);
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

// Generic toast used for form feedback
function showToast(message) {
    const popup = document.createElement('div');
    popup.innerHTML = message || '';
    const isDarkMode = document.body.classList.contains('dark-mode');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${isDarkMode ? 'rgba(34, 51, 102, 0.9)' : 'rgba(0, 31, 77, 0.9)'};
        color: #fff;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Inter', 'Segoe UI', Arial, Helvetica, sans-serif;
        box-shadow: 0 4px 16px rgba(0, 31, 77, 0.3);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        border: 2px solid ${isDarkMode ? 'rgba(34, 51, 102, 0.8)' : 'rgba(0, 31, 77, 0.8)'};
        backdrop-filter: blur(8px);
    `;
    document.body.appendChild(popup);
    setTimeout(() => { popup.style.opacity = '1'; }, 10);
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 300);
    }, 2200);
}

// EmailJS contact form integration
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    // Initialize EmailJS - replace with your user ID from emailjs.com
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('YOUR_EMAILJS_USER_ID');
        }
    } catch (err) {
        console.warn('EmailJS not loaded:', err);
    }

    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        // Replace these placeholders with your EmailJS service/template IDs
        const SERVICE_ID = 'service_722xbcu';
        const TEMPLATE_ID = 'template_f201grs';

        if (typeof emailjs === 'undefined') {
            showToast('Email service unavailable.');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
            return;
        }

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
            .then(function() {
                showToast('Message sent — thank you!');
                form.reset();
                if (submitBtn) { submitBtn.textContent = 'Sent!'; }
                setTimeout(() => {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
                }, 2000);
            }, function(error) {
                console.error('EmailJS error:', error);
                showToast('Failed to send message. Try again later.');
                if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
            });
    });
});

// Image modal/lightbox functionality
function openImageModal(src, alt) {
    // prevent multiple overlays
    if (document.querySelector('.image-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'image-modal-overlay';

    const content = document.createElement('div');
    content.className = 'image-modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'image-modal-close';
    closeBtn.setAttribute('aria-label', 'Close image');
    closeBtn.innerText = '✕';

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';

    content.appendChild(closeBtn);
    content.appendChild(img);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    function keyHandler(e) {
        if (e.key === 'Escape') closeImageModal();
    }

    overlay._keyHandler = keyHandler;
    document.addEventListener('keydown', keyHandler);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeImageModal();
    });
    closeBtn.addEventListener('click', closeImageModal);
}

function closeImageModal() {
    const overlay = document.querySelector('.image-modal-overlay');
    if (!overlay) return;
    if (overlay._keyHandler) document.removeEventListener('keydown', overlay._keyHandler);
    overlay.remove();
    document.body.style.overflow = '';
}

// Attach click handlers to project images
document.addEventListener('DOMContentLoaded', function() {
    const selectors = document.querySelectorAll('.project-gallery img, .project-image img');
    selectors.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            openImageModal(img.src, img.alt || '');
        });
    });
});