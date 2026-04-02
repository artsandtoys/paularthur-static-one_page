document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------------
    // 1. GLOBAL ELEMENT SELECTORS
    // -----------------------------------------------------------------

    const rightColumn = document.querySelector('.right-column-wrapper');
    const navLinks = document.querySelectorAll('.left-content nav a.nav-link');
    
    // Selectors for elements that might be hidden when dynamic content loads
    const defaultSplash = document.getElementById('splash-content'); // (Not used in the provided HTML, but kept for context)
    const staticFooter = document.getElementById('static-footer');    // (Not used in the provided HTML, but kept for context)
    
    // GALLERY STATE VARIABLES
    let currentGallery = [];
    let currentIndex = 0;
    let keyboardListenerAdded = false;

    // -----------------------------------------------------------------
    // 2. CORE UTILITY FUNCTIONS
    // -----------------------------------------------------------------

    /**
     * Removes the 'active' class from all navigation links.
     */
    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    /**
     * Hides default content elements (splash/footer) and clears the right column.
     * This prepares the column for new content loaded via fetch.
     */
    function hideDefaultContent() {
        if (defaultSplash) defaultSplash.style.display = 'none';
        if (staticFooter) staticFooter.style.display = 'none';
        
        // Clear previous content
        rightColumn.innerHTML = ''; 
    }

    /**
     * Fetches an HTML file, injects it into the right column, and re-attaches events.
     * @param {string} fileName - The name of the HTML file to load.
     */
    async function loadContent(fileName) {
        // 1. Prepare the column
        hideDefaultContent(); 
        
        try {
            const response = await fetch(fileName);
            if (!response.ok) {
                throw new Error(`Failed to load content file: ${fileName}`);
            }
            const htmlContent = await response.text();

            // 2. Insert new HTML and scroll to top
            rightColumn.innerHTML = htmlContent;
            window.scrollTo(0, 0); 

            // 3. Re-attach gallery event listeners (CRITICAL for dynamically loaded content)
            attachGalleryTriggers(); 

        } catch (error) {
            console.error('Content loading error:', error);
            rightColumn.innerHTML = `<h2>Error</h2><p>Could not load content for ${fileName}. Please ensure <code>${fileName}</code> exists in the same directory.</p>`;
        }
    }

    // -----------------------------------------------------------------
    // 3. GALLERY / POP-UP LOGIC
    // -----------------------------------------------------------------

    /**
     * Stops any currently playing video and removes all media (img/video) 
     * from the pop-up container to prepare for the next item.
     * @param {HTMLElement} popup - The gallery pop-up container element.
     */
    function clearMedia(popup) {
        popup.querySelectorAll('img, video').forEach(el => {
            if (el.tagName && el.tagName.toLowerCase() === 'video') {
                try { el.pause(); } catch (err) {}
                el.removeAttribute('src');
            }
            el.remove();
        });
    }

    /**
     * Loads and displays the image or video at the current index in the pop-up.
     * @param {HTMLElement} popup - The gallery pop-up container.
     * @param {HTMLElement} prevBtn - The previous button element (used for positioning).
     * @param {HTMLElement} nextBtn - The next button element (used for positioning).
     * @param {number} index - The index of the media in the currentGallery array.
     */
    function showMedia(popup, prevBtn, nextBtn, index) {
        clearMedia(popup);
        const src = currentGallery[index];
        if (!src) return;

        const isVideo = src.match(/\.(mp4|webm)(\?.*)?$/i);
        // Media is inserted before the next button to keep buttons visible on top
        const insertionPoint = nextBtn; 

        if (isVideo) {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.style.maxWidth = '100%';
            video.maxHeight = '100%';
            // Insert video element into the popup
            popup.insertBefore(video, insertionPoint);

            video.addEventListener('error', (ev) => console.warn('Video error', ev));
            video.play().catch(err => {
                console.warn('Play promise rejected:', err);
            });
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Gallery image';
            img.style.maxWidth = '100%';
            img.maxHeight = '100%';
            // Insert image element into the popup
            popup.insertBefore(img, insertionPoint);
        }
        
        // Update current index after successful display
        currentIndex = index;
    }
    
    /**
     * Defines and attaches all event listeners for the gallery pop-up.
     * This function MUST be run for both initial content AND after loading new content.
     */
    function attachGalleryTriggers() {
        // Find the pop-up elements inside the currently loaded content
        // The ID columnPopup is in your main HTML for the 'works' section
        const popup = document.querySelector('#columnPopup'); 
        if (!popup) return;

        const prevBtn = popup.querySelector('#prevBtn');
        const nextBtn = popup.querySelector('#nextBtn');
        
        // Define the click handler for the timeline links
        const galleryTriggerHandler = function(e) {
            e.preventDefault();
            
            // 1. Parse the list of images/videos from the data attribute
            currentGallery = e.currentTarget.dataset.images.split(',').map(x => x.trim()).filter(x => x.length);
            currentIndex = 0; // Always start at the first item
            
            // 2. Show the first piece of media and display the pop-up
            showMedia(popup, prevBtn, nextBtn, currentIndex);
            popup.style.display = 'flex';
        };

        // Attach click listeners to all timeline items with the 'gallery-trigger' class
        document.querySelectorAll('.gallery-trigger').forEach(item => {
            // Remove previous listeners (needed when content is reloaded)
            item.removeEventListener('click', galleryTriggerHandler); 
            item.addEventListener('click', galleryTriggerHandler);
        });
        
        // ATTACH NAV BUTTON EVENTS
        nextBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent background click from closing
            if (!currentGallery.length) return;
            currentIndex = (currentIndex + 1) % currentGallery.length; // Loop to start
            showMedia(popup, prevBtn, nextBtn, currentIndex);
        };

        prevBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent background click from closing
            if (!currentGallery.length) return;
            // Loop to end if moving back from the start
            currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; 
            showMedia(popup, prevBtn, nextBtn, currentIndex);
        };

        // ATTACH CLOSE EVENT (Close when clicking the semi-transparent background)
        popup.onclick = (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
                const vid = popup.querySelector('video');
                if (vid) vid.pause();
                clearMedia(popup); 
            }
        };

        // ATTACH KEYBOARD EVENTS (Add only once to the document)
        if (!keyboardListenerAdded) {
            document.addEventListener('keydown', keyboardHandler);
            keyboardListenerAdded = true;
        }
    }
    
    /**
     * Handles keyboard shortcuts for the pop-up (Escape to close, Arrows to navigate).
     */
    function keyboardHandler(e) {
        const popup = document.querySelector('#columnPopup'); 
        
        if (popup && popup.style.display === 'flex') {
            const prevBtn = popup.querySelector('#prevBtn');
            const nextBtn = popup.querySelector('#nextBtn');
            
            if (e.key === 'Escape') {
                // Manually trigger the background close action
                popup.click(); 
            }
            if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
            if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
        }
    }

    // -----------------------------------------------------------------
    // 4. EVENT ATTACHMENT / INITIALIZATION
    // -----------------------------------------------------------------

    // --- NAV LINK CLICK HANDLER ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const contentFile = this.getAttribute('data-content-file');
            if (contentFile) {
                loadContent(contentFile);
                
                removeActiveClasses();
                this.classList.add('active');
            }
        });
    });
    
    // 🚀 THE FIX: INITIALIZE GALLERY FOR DEFAULT CONTENT
    // This is the critical addition to make the 'works' section (present on load) functional.
    attachGalleryTriggers();
    
    // --- Disable right-click on the entire page --- 
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert("Right-click is disabled on this page.");
    });
});


// =================================================================
// SECONDARY LIGHTBOX FUNCTIONS (FOR GRID CONTENT, IF USED)
// =================================================================
// These functions appear to be for a separate image grid (e.g., in snaps.html)
// and rely on a different lightbox structure than the timeline pop-up (#columnPopup).

/**
 * Opens a simple image lightbox used for grid elements.
 * @param {HTMLElement} element - The grid image element that was clicked.
 */
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    const fullSrc = element.getAttribute('data-full-src');
    if (!fullSrc) {
        console.error('Image element missing data-full-src attribute.');
        return;
    }

    lightboxImage.src = fullSrc;
    lightbox.style.display = 'flex'; 

    document.body.style.overflow = 'hidden'; 
}

/**
 * Closes the simple image lightbox.
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    lightbox.style.display = 'none';
    
    document.body.style.overflow = '';
    
    document.getElementById('lightbox-image').src = '';
}
