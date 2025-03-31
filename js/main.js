// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Music Player
class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentTrack = null;
        
        // Initialize play buttons
        this.initPlayButtons();
    }

    initPlayButtons() {
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const albumCard = btn.closest('.album-card');
                const trackUrl = albumCard.dataset.trackUrl;
                const trackTitle = albumCard.querySelector('.album-info h3').textContent;
                
                if (this.currentTrack === trackUrl) {
                    this.togglePlay();
                } else {
                    this.loadAndPlay(trackUrl, trackTitle, btn);
                }
            });
        });
    }

    loadAndPlay(trackUrl, trackTitle, btn) {
        this.audio.src = trackUrl;
        this.currentTrack = trackUrl;
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                this.updatePlayButton(btn);
            })
            .catch(error => console.error('Error playing audio:', error));
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
    }

    updatePlayButton(btn) {
        document.querySelectorAll('.play-btn i').forEach(icon => {
            icon.className = 'fas fa-play';
        });
        
        if (btn && this.isPlaying) {
            btn.querySelector('i').className = 'fas fa-pause';
        }
    }
}

// Project Gallery
class ProjectGallery {
    constructor() {
        this.initLightbox();
    }

    initLightbox() {
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            project.addEventListener('click', (e) => {
                if (e.target.closest('.project-links')) return;
                
                const img = project.querySelector('.project-image img');
                const title = project.querySelector('.project-info h3').textContent;
                const desc = project.querySelector('.project-info p').textContent;
                
                this.showLightbox(img.src, title, desc);
            });
        });
    }

    showLightbox(imgSrc, title, desc) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="close-btn">&times;</button>
                <img src="${imgSrc}" alt="${title}">
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        `;

        document.body.appendChild(lightbox);
        
        // Close button functionality
        lightbox.querySelector('.close-btn').onclick = () => {
            lightbox.remove();
        };

        // Click outside to close
        lightbox.onclick = (e) => {
            if (e.target === lightbox) lightbox.remove();
        };
    }
}

// Animation Effects
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-title, .album-card, .project-card, .about-content')
    .forEach(el => observer.observe(el));

// Contact Form
document.querySelector('form[name="contact"]').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    try {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        });

        if (response.ok) {
            form.reset();
            showNotification('Message sent successfully!', 'success');
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Notification helper
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Image loading handler
function handleImageLoading() {
    const images = document.querySelectorAll('img');
    let notificationShown = false;
    
    images.forEach(img => {
        img.classList.add('loading');
        
        if (img.classList.contains('profile-image')) {
            img.style.backgroundColor = '#f0f0f0';
            const tempHeight = img.closest('.about-image')?.offsetWidth || 300;
            img.style.minHeight = `${tempHeight}px`;
        }
        
        img.onload = function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
            this.style.minHeight = 'auto';
        };
        
        img.onerror = function() {
            this.classList.remove('loading');
            
            // Only show notification once
            if (!notificationShown) {
                showNotification('Some images failed to load. Using placeholders.', 'warning');
                notificationShown = true;
            }
            
            // Set appropriate placeholder based on image type
            const imagePath = this.getAttribute('src');
            console.log(`Image failed to load: ${imagePath}`);

            // Update placeholder paths based on image type
            if (this.classList.contains('profile-image')) {
                this.src = '/images/placeholder-profile.jpg';
            } else if (this.classList.contains('logo-img')) {
                this.src = '/images/logo.png';
            } else if (this.classList.contains('project-image')) {
                this.src = '/images/placeholder-project.jpg';
            } else if (this.classList.contains('album-art')) {
                this.src = '/images/placeholder-album.jpg';
            } else {
                this.src = '/images/placeholder.jpg';
            }

            // Add error class for styling
            this.classList.add('image-error');
            
            // Prevent infinite error loop
            this.onerror = null;
        };
    });
}

// Add this to verify image paths on load
function verifyImagePaths() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Check if using generic placeholder
        if (img.getAttribute('src') === 'images/placeholder.jpg') {
            // Trigger error handler to set appropriate placeholder
            img.dispatchEvent(new Event('error'));
        } else {
            const src = img.getAttribute('src');
            fetch(src)
                .then(response => {
                    if (!response.ok) {
                        console.error(`Image not found: ${src}`);
                        img.dispatchEvent(new Event('error'));
                    }
                })
                .catch(error => {
                    console.error(`Error loading image ${src}:`, error);
                    img.dispatchEvent(new Event('error'));
                });
        }
    });
}

// Add this CSS to your style.css file
document.head.insertAdjacentHTML('beforeend', `
    <style>
        img.loading {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        img.loaded {
            opacity: 1;
        }
        
        img.image-error {
            filter: grayscale(1);
            opacity: 0.8;
        }
    </style>
`);

// Navbar color change on scroll
function handleNavbarScroll() {
    const nav = document.querySelector('nav');
    const heroSection = document.querySelector('.hero');
    
    function updateNavbar() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > heroBottom - nav.offsetHeight) {
            nav.classList.remove('dark');
            nav.classList.add('light');
        } else {
            nav.classList.remove('light');
            nav.classList.add('dark');
        }
    }
    
    // Initial check
    updateNavbar();
    
    // Update on scroll
    window.addEventListener('scroll', updateNavbar);
}

// Logo loading handler
function handleLogoLoading() {
    const logo = document.querySelector('.logo-img');
    
    // Add loaded class immediately if image is cached
    if (logo.complete) {
        logo.classList.add('loaded');
    }
    
    logo.addEventListener('load', () => {
        logo.classList.add('loaded');
        console.log('Logo loaded successfully');
    });
    
    logo.addEventListener('error', (e) => {
        console.error('Logo failed to load:', e);
        // Fallback to text
        const logoContainer = logo.parentElement;
        logoContainer.innerHTML = 'PEEMKAY';
    });

    // Debug info
    console.log('Logo src:', logo.src);
    console.log('Logo natural dimensions:', logo.naturalWidth, 'x', logo.naturalHeight);
}

// Add this to check if image path is correct
function validateLogoPath() {
    const logo = document.querySelector('.logo-img');
    console.log('Attempting to load logo from:', logo.src);
    
    // Test if file exists
    fetch(logo.src)
        .then(response => {
            if (!response.ok) {
                throw new Error('Logo file not found');
            }
            console.log('Logo file exists');
        })
        .catch(error => {
            console.error('Logo path error:', error);
        });
}

// Mobile Navigation
function setupMobileNav() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuItems = document.querySelectorAll('.nav-links li');
    
    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', () => {
        // Toggle active classes
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-open');

        // Animate menu items
        menuItems.forEach((item, index) => {
            if (item.style.animation) {
                item.style.animation = '';
            } else {
                item.style.animation = `fadeInRight 0.3s ease forwards ${index * 0.1 + 0.2}s`;
            }
        });
    });

    // Close menu when clicking links
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            menuItems.forEach(item => {
                item.style.animation = '';
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('nav-open') && 
            !navLinks.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize mobile nav on DOM load
document.addEventListener('DOMContentLoaded', setupMobileNav);

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
});

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    handleLogoLoading();
    validateLogoPath();
    handleImageLoading();
    handleNavbarScroll();
    verifyImagePaths();
});









