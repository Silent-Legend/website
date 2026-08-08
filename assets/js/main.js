document.addEventListener("DOMContentLoaded", function () {
    // -----------------------------------
    // Loading Bar & Hero Image Preload
    // -----------------------------------
    const loadingBar = document.getElementById('loading-bar');
    const loadingBarProgress = loadingBar ? loadingBar.querySelector('.loading-bar-progress') : null;
    const body = document.body;
    const heroBgImage = new Image();
    const heroLogoImage = new Image();
    
    // Set image sources
    heroBgImage.src = 'images/Hero/Hero-BG.png';
    heroLogoImage.src = 'images/Hero/logo.png';
    
    // Track loaded images
    let imagesLoaded = 0;
    const totalImages = 2;
    const loadStartTime = Date.now();
    
    // Update progress bar
    function updateProgress(percent) {
        if (loadingBarProgress) {
            loadingBarProgress.style.width = percent + '%';
        }
        if (loadingBar) {
            loadingBar.setAttribute('aria-valuenow', Math.round(percent));
        }
    }
    
    // Simulate progress for better UX (even if images load fast)
    let progressPercent = 0;
    const progressInterval = setInterval(() => {
        if (progressPercent < 90) {
            progressPercent += Math.random() * 15;
            if (progressPercent > 90) progressPercent = 90;
            updateProgress(progressPercent);
        }
    }, 100);
    
    function handleImageLoad() {
        imagesLoaded++;
        progressPercent = (imagesLoaded / totalImages) * 100;
        updateProgress(progressPercent);
        
        if (imagesLoaded === totalImages) {
            clearInterval(progressInterval);
            updateProgress(100);
            
            // Wait a moment for the bar to reach 100%
            setTimeout(() => {
                // Hide loading bar
                if (loadingBar) {
                    loadingBar.classList.add('hidden');
                    loadingBar.setAttribute('aria-hidden', 'true');
                }
                
                // Remove preload class to show content with smooth fade
                body.classList.remove('is-preload');
                
                // Remove loading bar from DOM after animation
                setTimeout(() => {
                    if (loadingBar && loadingBar.parentNode) {
                        loadingBar.parentNode.removeChild(loadingBar);
                    }
                }, 800);
            }, 300);
        }
    }
    
    // Handle image load events
    heroBgImage.onload = handleImageLoad;
    heroLogoImage.onload = handleImageLoad;
    heroBgImage.onerror = handleImageLoad; // Continue even if image fails
    heroLogoImage.onerror = handleImageLoad;
    
    // Fallback: If images take too long, show content anyway
    setTimeout(() => {
        if (body.classList.contains('is-preload')) {
            clearInterval(progressInterval);
            updateProgress(100);
            handleImageLoad();
            handleImageLoad(); // Force both to complete
        }
    }, 5000);
    
    // -----------------------------------
    // Hamburger and Menu Toggle
    // -----------------------------------

    const hamburger = document.querySelector('.hamburger');
    const menuContainer = document.querySelector('#menu-container') || document.querySelector('.menu-container');
    const menuLinks = document.querySelectorAll('.menu-links a');

    // Toggle ARIA expanded state for accessibility
    function setAriaExpanded(expanded) {
        hamburger.setAttribute('aria-expanded', expanded);
        menuContainer.setAttribute('aria-hidden', !expanded);
    }

    // Add click event listener to the hamburger button
    hamburger.addEventListener('click', function () {
        const isActive = this.classList.contains('active');

        if (isActive) {
            // Close menu immediately
            menuContainer.classList.remove('active');
            setAriaExpanded(false);
            menuContainer.classList.add('hidden');
        } else {
            // Open menu
            menuContainer.classList.remove('hidden');
            menuContainer.classList.add('active');
            setAriaExpanded(true);
        }

        // Toggle hamburger 'active' state
        this.classList.toggle('active');
    });

    // Close menu and scroll to section without delay
    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Close menu immediately
            hamburger.classList.remove('active');
            menuContainer.classList.remove('active');
            menuContainer.classList.add('hidden');
            setAriaExpanded(false);

            // Scroll to the target section
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Ensure logo link scrolls to the top of the page with menu close if open
    const logoLink = document.querySelector('h1 a');

    if (logoLink) {
        logoLink.addEventListener("click", function (event) {
            event.preventDefault();
            // If menu open, close it first, then scroll
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                menuContainer.classList.remove('active');
                menuContainer.classList.add('closing');
                setAriaExpanded(false);
                setTimeout(function () {
                    menuContainer.classList.remove('closing');
                    menuContainer.classList.add('hidden');
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }, 1400);
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    }

    // -----------------------------------
    // Add Animation Class on Scroll
    // -----------------------------------
    const servicePosts = document.querySelectorAll('.service-post');
    const servicesHeader = document.querySelector('#services-header');
    const servicesSection = document.querySelector('#services');

    // Calculate the height of the services header
    const headerHeight = servicesHeader ? servicesHeader.getBoundingClientRect().height : 0;
    // Calculate the top position of the services section
    const sectionTop = servicesSection ? servicesSection.getBoundingClientRect().top + window.scrollY : 0;

    // Helper function to debounce events
    const debounce = (func, wait = 20, immediate = true) => {
        let timeout;
        return function (...args) {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // Function to add animation class when posts come into view
    const animateOnScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY > sectionTop - headerHeight) {
            servicePosts.forEach((post) => {
                // Check if the element already has the class to avoid repeated work
                if (!post.classList.contains('animate-in')) {
                    const postTop = post.getBoundingClientRect().top + scrollY;
                    const windowHeight = window.innerHeight;

                    // If the top of the post is less than the window height minus 50px
                    if (postTop < scrollY + windowHeight - 50) {
                        post.classList.add('animate-in');
                    }
                }
            });
        }
    };

    // Add scroll event listener with debounce and passive for better INP
    window.addEventListener('scroll', debounce(animateOnScroll), { passive: true });

    // Trigger animation on page load to animate visible elements
    animateOnScroll();



    // -----------------------------------
    // Lightbox Functionality
    // -----------------------------------
    const lightbox = document.querySelector("#lightbox");
    const lightboxModal = document.querySelector(".lightbox-modal");
    const lightboxImage = document.querySelector("#lightbox-image");
    const lightboxTitle = document.querySelector("#lightbox-title-sidebar");
    const lightboxCategory = document.getElementById('lightbox-category-sidebar');
    const lightboxPrev = document.querySelector("#lightbox-prev");
    const lightboxNext = document.querySelector("#lightbox-next");
    const lightboxClose = document.querySelector("#lightbox-close");
    const lightboxThumbnailsBottom = document.getElementById('lightbox-thumbnails-bottom');
    const lightboxShare = document.getElementById('lightbox-share');
    const lightboxShareDropdown = document.getElementById('lightbox-share-dropdown');

    // Declare portfolioItems once
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    let allImages = [];
    let allTitles = [];
    let allDescriptions = [];
    let allCategories = [];
    let currentIndex = -1;
    let currentFilter = '*'; // Track current filter
    let filteredIndices = []; // Indices of visible items based on filter

    // Store all portfolio data with categories
    portfolioItems.forEach((item, index) => {
        let imageSrc = item.querySelector("img").getAttribute("src");
        let titleElement = item.querySelector(".portfolio-overlay h3");
        let descriptionElement = item.querySelector(".portfolio-overlay-description");
        let title = titleElement ? titleElement.textContent : "";
        let description = descriptionElement ? descriptionElement.textContent : "";
        
        // Get category from class list
        let category = '*';
        if (item.classList.contains('visual-effects')) category = '.visual-effects';
        else if (item.classList.contains('motion-graphics')) category = '.motion-graphics';
        else if (item.classList.contains('graphic-design')) category = '.graphic-design';
        else if (item.classList.contains('photography')) category = '.photography';
        else if (item.classList.contains('photo-manipulation')) category = '.photo-manipulation';
        else if (item.classList.contains('retouching-and-restoration')) category = '.retouching-and-restoration';
        else if (item.classList.contains('ai-art')) category = '.ai-art';
        else if (item.classList.contains('ai-art-and-prompt-design')) category = '.ai-art-and-prompt-design';
        else if (item.classList.contains('branding-and-identity')) category = '.branding-and-identity';
        
        allImages.push(imageSrc);
        allTitles.push(title);
        allDescriptions.push(description);
        allCategories.push(category);
    });
    
    // Function to update filtered indices based on current filter
    function updateFilteredIndices() {
        filteredIndices = [];
        portfolioItems.forEach((item, index) => {
            if (currentFilter === '*' || item.classList.contains(currentFilter.substring(1))) {
                filteredIndices.push(index);
            }
        });
    }
    
    // Initialize with all items
    updateFilteredIndices();
    
    // Initialize total counter
    const totalCounter = document.getElementById('lightbox-total');
    if (totalCounter) {
        totalCounter.textContent = filteredIndices.length;
    }
    
    // -----------------------------------
    // Intersection Observer for Loading States
    // -----------------------------------
    const portfolioImages = document.querySelectorAll('.portfolio-item img');
    
    if ('IntersectionObserver' in window && portfolioImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading class if image hasn't loaded yet
                    if (!img.complete || img.naturalHeight === 0) {
                        img.classList.add('loading');
                    }
                    
                    // Remove loading class when image loads
                    if (img.complete && img.naturalHeight !== 0) {
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                    } else {
                        img.addEventListener('load', function() {
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                        }, { once: true });
                        
                        // Handle load errors
                        img.addEventListener('error', function() {
                            img.classList.remove('loading');
                            img.classList.add('error');
                        }, { once: true });
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start checking 50px before image enters viewport
        });
        
        portfolioImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // -----------------------------------
    // Ambient Logo Storm Video
    // -----------------------------------
    const ambientVideoSection = document.getElementById('ambient-logo-storm');
    const ambientVideo = document.getElementById('ambient-logo-storm-video');

    if (ambientVideoSection && ambientVideo) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const saveDataEnabled = Boolean(connection && connection.saveData);
        let isInViewport = false;
        let sourcesLoaded = false;

        function loadAmbientVideoSources() {
            if (sourcesLoaded || reducedMotion.matches || saveDataEnabled) return;

            ambientVideo.querySelectorAll('source[data-src]').forEach(source => {
                source.src = source.dataset.src;
            });
            ambientVideo.load();
            sourcesLoaded = true;
        }

        function updateAmbientVideoPlayback() {
            if (!isInViewport || document.hidden || reducedMotion.matches || saveDataEnabled) {
                ambientVideo.pause();
                return;
            }

            loadAmbientVideoSources();
            ambientVideo.play().catch(() => {
                // The poster remains visible if the browser blocks autoplay.
            });
        }

        if ('IntersectionObserver' in window) {
            const ambientVideoLoadObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadAmbientVideoSources();
                        if (sourcesLoaded) observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '300px 0px'
            });

            const ambientVideoPlaybackObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    isInViewport = entry.isIntersecting;
                    updateAmbientVideoPlayback();
                });
            }, {
                threshold: 0.01
            });

            ambientVideoLoadObserver.observe(ambientVideoSection);
            ambientVideoPlaybackObserver.observe(ambientVideoSection);
        }

        document.addEventListener('visibilitychange', updateAmbientVideoPlayback);
        reducedMotion.addEventListener('change', updateAmbientVideoPlayback);
    }
    
    // Update grid item count for CSS targeting
    function updateGridItemCount() {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            const visibleItems = portfolioGrid.querySelectorAll('.portfolio-item.visible').length;
            portfolioGrid.setAttribute('data-item-count', visibleItems.toString());
        }
    }
    
    // Update count on filter change
    const originalUpdateFilteredIndices = updateFilteredIndices;
    updateFilteredIndices = function() {
        originalUpdateFilteredIndices();
        updateGridItemCount();
    };
    
    // Initial count
    updateGridItemCount();

    // Generate thumbnails
    function generateThumbnails() {
        if (!lightboxThumbnailsBottom) return;
        
        // Clear existing thumbnails
        lightboxThumbnailsBottom.innerHTML = '';
        
        // Create thumbnails for filtered items
        filteredIndices.forEach((originalIndex, filteredIdx) => {
            // Bottom thumbnails
            const thumbBottom = document.createElement('img');
            thumbBottom.src = allImages[originalIndex];
            thumbBottom.alt = allTitles[originalIndex];
            thumbBottom.className = 'lightbox-thumbnail';
            if (filteredIdx === filteredIndices.indexOf(currentIndex)) {
                thumbBottom.classList.add('active');
            }
            thumbBottom.addEventListener('click', () => {
                currentIndex = originalIndex;
                updateLightboxContent();
            });
            lightboxThumbnailsBottom.appendChild(thumbBottom);
        });
    }

    function updateLightboxContent() {
        // Reset image state when changing images
        resetLightboxImageState();
        if (lightboxZoomIn) {
            lightboxZoomIn.innerHTML = '<i class="fas fa-search-plus"></i>';
        }
        
        // Update share links
        if (typeof window.updateShareLinks === 'function') {
            window.updateShareLinks();
        }
        
        // Show loader
        const loader = document.querySelector('.lightbox-loader');
        if (loader) {
            loader.classList.add('active');
        }
        
        // Hide image while loading
        if (lightboxImage) {
            lightboxImage.classList.remove('loaded');
        }
        
        // Get the actual index in filtered list
        const filteredIndex = filteredIndices.indexOf(currentIndex);
        const actualIndex = filteredIndex >= 0 ? filteredIndex : 0;
        
        // Update counter in header
        const currentCounterHeader = document.getElementById('lightbox-current-header');
        const totalCounterHeader = document.getElementById('lightbox-total-header');
        if (currentCounterHeader) currentCounterHeader.textContent = actualIndex + 1;
        if (totalCounterHeader) totalCounterHeader.textContent = filteredIndices.length;
        
        // Get current portfolio item for data attributes
        const currentItem = portfolioItems[currentIndex];
        const detailName = currentItem ? (currentItem.getAttribute('data-detail-name') || allTitles[currentIndex] || 'Project') : allTitles[currentIndex] || 'Project';
        const detailRole = currentItem ? (currentItem.getAttribute('data-detail-role') || '') : '';
        const detailCategory = currentItem ? (currentItem.getAttribute('data-detail-category') || '') : '';
        const detailDate = currentItem ? (currentItem.getAttribute('data-detail-date') || '') : '';
        const detailClient = currentItem ? (currentItem.getAttribute('data-detail-client') || '') : '';
        const detailDescription = currentItem ? (currentItem.getAttribute('data-detail-description') || '') : '';
        
        // Get category from filter or data attribute
        let categoryText = '';
        if (detailCategory) {
            categoryText = detailCategory;
        } else if (allCategories[currentIndex]) {
            // Map filter categories to display names
            const categoryMap = {
                '.visual-effects': 'Visual Effects',
                '.motion-graphics': 'Motion Graphics',
                '.graphic-design': 'Graphic Design',
                '.photography': 'Photography',
                '.photo-manipulation': 'Photo Manipulation',
                '.retouching-and-restoration': 'Retouching and Restoration',
                '.ai-art': 'AI Art',
                '.ai-art-and-prompt-design': 'AI Art and Prompt Design',
                '.branding-and-identity': 'Branding and Identity'
            };
            const filterCategory = allCategories[currentIndex];
            categoryText = categoryMap[filterCategory] || filterCategory.replace(/^\./, '').split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        }
        
        // Load new image
        const newImage = new Image();
        newImage.onload = function() {
            if (lightboxImage) {
                lightboxImage.src = allImages[currentIndex];
            }
            
            // Update title (project name)
            if (lightboxTitle) {
                lightboxTitle.textContent = detailName;
            }
            
            // Normalize strings for comparison (handle "&" vs "and", case differences, etc.)
            function normalizeForComparison(str) {
                return str.toLowerCase()
                    .replace(/&/g, 'and')
                    .replace(/\s+/g, ' ')
                    .trim();
            }
            
            // Check if role is essentially the same as category
            function isRoleDuplicate(category, role) {
                if (!category || !role) return false;
                const normCategory = normalizeForComparison(category);
                const normRole = normalizeForComparison(role);
                // Check if they're the same, or if one contains the other
                return normCategory === normRole || 
                       normCategory.includes(normRole) || 
                       normRole.includes(normCategory);
            }
            
            // Update category (main category only)
            const lightboxSub = document.getElementById('lightbox-category-sidebar');
            if (lightboxSub) {
                if (categoryText) {
                    lightboxSub.textContent = categoryText;
                    lightboxSub.style.display = 'block';
                } else {
                    lightboxSub.style.display = 'none';
                }
            }
            
            // Update role (subcategory, shown below category if different and meaningful)
            const lightboxRole = document.getElementById('lightbox-role-sidebar');
            if (lightboxRole) {
                if (detailRole && detailRole.trim() !== '' && !isRoleDuplicate(categoryText, detailRole)) {
                    lightboxRole.textContent = detailRole;
                    lightboxRole.style.display = 'block';
                } else {
                    lightboxRole.style.display = 'none';
                }
            }
            
            // Update meta (Year · Client)
            const lightboxMeta = document.getElementById('lightbox-meta-sidebar');
            if (lightboxMeta) {
                if (detailDate && detailClient) {
                    lightboxMeta.textContent = `${detailDate} · ${detailClient}`;
                    lightboxMeta.style.display = 'block';
                } else if (detailDate) {
                    lightboxMeta.textContent = detailDate;
                    lightboxMeta.style.display = 'block';
                } else if (detailClient) {
                    lightboxMeta.textContent = detailClient;
                    lightboxMeta.style.display = 'block';
                } else {
                    lightboxMeta.style.display = 'none';
                }
            }
            
            // Update description (2-line clamp)
            const lightboxDesc = document.getElementById('lightbox-desc-sidebar');
            if (lightboxDesc) {
                if (detailDescription && detailDescription.trim() !== '') {
                    lightboxDesc.textContent = detailDescription;
                    lightboxDesc.style.display = 'block';
                } else {
                    lightboxDesc.style.display = 'none';
                }
            }
            
            // Hide loader and show image
            if (loader) {
                loader.classList.remove('active');
            }
            setTimeout(() => {
                if (lightboxImage) {
                    lightboxImage.classList.add('loaded');
                }
            }, 50);
            
            // Update thumbnails active state
            updateThumbnailsActive();
        };
        newImage.onerror = function() {
            if (loader) {
                loader.classList.remove('active');
            }
            if (lightboxImage) {
                lightboxImage.src = allImages[currentIndex];
                lightboxImage.classList.add('loaded');
            }
            updateThumbnailsActive();
        };
        newImage.src = allImages[currentIndex];
    }
    
    function updateThumbnailsActive() {
        const filteredIndex = filteredIndices.indexOf(currentIndex);
        const allThumbnails = document.querySelectorAll('.lightbox-thumbnail');
        allThumbnails.forEach((thumb, idx) => {
            if (idx === filteredIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    if ((lightboxModal || lightbox) && lightboxImage && portfolioItems.length > 0) {
        const activeLightbox = lightboxModal || lightbox;
        portfolioItems.forEach((item, index) => {
            // Single click on item - show lightbox
            item.addEventListener("click", function (event) {
                event.preventDefault();
                currentIndex = index;
                generateThumbnails();
                if (activeLightbox) {
                    // Set aria-hidden to false BEFORE making it visible
                    activeLightbox.setAttribute('aria-hidden', 'false');
                    activeLightbox.classList.add("active");
                    // Update share links when opening
                    if (typeof window.updateShareLinks === 'function') {
                        window.updateShareLinks();
                    }
                }
                document.body.style.overflow = 'hidden';
                updateLightboxContent();
                // Focus the close button after lightbox is visible (for accessibility)
                if (lightboxClose) {
                    requestAnimationFrame(() => {
                        lightboxClose.focus();
                    });
                }
            });
        });
    }
    
    function closeLightbox() {
        // Close project details modal if open
        if (projectDetailsModal && projectDetailsModal.classList.contains('active')) {
            closeProjectDetailsModal();
        }
        
        // Reset image state
        resetLightboxImageState();
        
        // Close share dropdown
        if (lightboxShareDropdown) {
            lightboxShareDropdown.style.display = 'none';
            if (lightboxShare) {
                lightboxShare.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Exit fullscreen if active before closing
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => {
                console.log('Error exiting fullscreen:', err);
            });
        }
        
        const activeLightbox = lightboxModal || lightbox;
        if (activeLightbox) {
            // Remove active class first
            activeLightbox.classList.remove("active");
            
            // Move focus away from any element inside the lightbox before hiding
            const focusedElement = activeLightbox.querySelector(':focus');
            if (focusedElement && focusedElement.blur) {
                focusedElement.blur();
            }
            
            // Set aria-hidden after focus is moved (use setTimeout to ensure focus has moved)
            setTimeout(() => {
                if (activeLightbox) {
                    activeLightbox.setAttribute('aria-hidden', 'true');
                }
            }, 0);
        }
        document.body.style.overflow = ''; // Restore scrolling
        if (lightboxImage) {
            lightboxImage.classList.remove('loaded');
        }
    }

    // Close button handler - use direct event delegation to ensure it works
    if (lightboxModal || lightbox) {
        const activeLightbox = lightboxModal || lightbox;
        
        // Use event delegation on the lightbox container
        activeLightbox.addEventListener("click", function(e) {
            // Check if close button was clicked
            if (e.target.closest('#lightbox-close') || e.target.id === 'lightbox-close') {
                e.preventDefault();
                e.stopPropagation();
                closeLightbox();
                return;
            }
            
            // Don't close if clicking on buttons, images, or interactive elements
            if (e.target.closest('button') && !e.target.closest('#lightbox-close') || 
                e.target.closest('.lightbox-image') || 
                e.target.closest('.lightbox-nav') ||
                e.target.closest('.lightbox-sidebar-left') ||
                e.target.closest('.lightbox-thumbnails-bottom') ||
                e.target.closest('.lightbox-header')) {
                return;
            }
            
            // Close if clicking on the modal background
            if (e.target === activeLightbox || e.target.classList.contains('lightbox-modal') || e.target.classList.contains('lightbox-center')) {
                closeLightbox();
            }
        });
    }
    
    // Also add direct listener to close button as backup
    if (lightboxClose) {
        lightboxClose.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeLightbox();
        });
        lightboxClose.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                closeLightbox();
            }
        });
    }

    const handlePrev = function () {
        const currentFilteredIndex = filteredIndices.indexOf(currentIndex);
        const prevFilteredIndex = (currentFilteredIndex - 1 + filteredIndices.length) % filteredIndices.length;
        currentIndex = filteredIndices[prevFilteredIndex];
        updateLightboxContent();
    };

    const handleNext = function () {
        const currentFilteredIndex = filteredIndices.indexOf(currentIndex);
        const nextFilteredIndex = (currentFilteredIndex + 1) % filteredIndices.length;
        currentIndex = filteredIndices[nextFilteredIndex];
        updateLightboxContent();
    };

    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", handlePrev);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", handleNext);
    }


    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function (e) {
        const activeLightbox = lightboxModal || lightbox;
        const activeModal = projectDetailsModal && projectDetailsModal.classList.contains('active');
        
        // If modal is open, only handle Escape
        if (activeModal) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeProjectDetailsModal();
            }
            return;
        }
        
        // Lightbox keyboard navigation
        if (activeLightbox && activeLightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeLightbox();
            }
        }
    });
    
    // Touch swipe support for mobile
    {
        const activeLightbox = lightboxModal || lightbox;
        if (activeLightbox) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        activeLightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        activeLightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next
                    handleNext();
                } else {
                    // Swipe right - prev
                    handlePrev();
                }
            }
        }
        }
    }

    // -----------------------------------
    // Lightbox Info Toggle (Sidebar)
    // -----------------------------------
    const lightboxInfoToggle = document.getElementById('lightbox-info-toggle');
    const lightboxMainWrapper = document.querySelector('.lightbox-main-wrapper');
    const lightboxSidebar = document.getElementById('lightbox-sidebar');
    
    if (lightboxInfoToggle && lightboxMainWrapper) {
        // Default is off (sidebar hidden)
        lightboxInfoToggle.setAttribute('aria-pressed', 'false');
        
        // Check localStorage for saved preference
        const sidebarPreference = localStorage.getItem('lightbox-sidebar-visible');
        const shouldShowSidebar = sidebarPreference === 'true';
        
        if (shouldShowSidebar) {
            lightboxMainWrapper.classList.add('sidebar-visible');
            lightboxInfoToggle.classList.add('active');
            lightboxInfoToggle.setAttribute('aria-pressed', 'true');
        }
        
        lightboxInfoToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = lightboxInfoToggle.classList.contains('active');
            
            if (isActive) {
                lightboxMainWrapper.classList.remove('sidebar-visible');
                lightboxInfoToggle.classList.remove('active');
                lightboxInfoToggle.setAttribute('aria-pressed', 'false');
                localStorage.setItem('lightbox-sidebar-visible', 'false');
            } else {
                lightboxMainWrapper.classList.add('sidebar-visible');
                lightboxInfoToggle.classList.add('active');
                lightboxInfoToggle.setAttribute('aria-pressed', 'true');
                localStorage.setItem('lightbox-sidebar-visible', 'true');
            }
        });
    }
    
    // -----------------------------------
    // Lightbox Details Toggle (Modal)
    // -----------------------------------
    const lightboxDetailsToggle = document.getElementById('lightbox-details-toggle');
    
    if (lightboxDetailsToggle) {
        lightboxDetailsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = lightboxDetailsToggle.classList.contains('active');
            
            if (isActive) {
                // Close modal
                closeProjectDetailsModal();
                lightboxDetailsToggle.classList.remove('active');
                lightboxDetailsToggle.setAttribute('aria-pressed', 'false');
            } else {
                // Open modal
                openProjectDetailsModal();
                lightboxDetailsToggle.classList.add('active');
                lightboxDetailsToggle.setAttribute('aria-pressed', 'true');
            }
        });
    }
    

    // -----------------------------------
    // Fullscreen Functionality
    // -----------------------------------
    // Lightbox image zoom and drag state
    let lightboxImageState = {
        scale: 1,
        x: 0,
        y: 0,
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0
    };

    // Reset image state when opening lightbox or changing images
    function resetLightboxImageState() {
        lightboxImageState = { scale: 1, x: 0, y: 0, isDragging: false, startX: 0, startY: 0, currentX: 0, currentY: 0 };
        if (lightboxImage) {
            lightboxImage.style.transform = '';
            lightboxImage.style.cursor = 'default';
        }
        const lightboxCenter = document.querySelector('.lightbox-center');
        if (lightboxCenter) {
            lightboxCenter.style.overflow = 'hidden';
            lightboxCenter.style.cursor = 'default';
        }
    }

    // Apply transform to lightbox image
    function applyLightboxTransform() {
        if (lightboxImage) {
            const transform = `translate(${lightboxImageState.x}px, ${lightboxImageState.y}px) scale(${lightboxImageState.scale})`;
            lightboxImage.style.transform = transform;
            lightboxImage.style.transition = lightboxImageState.isDragging ? 'none' : 'transform 0.3s ease';
        }
    }

    // Zoom In / Actual Size - shows full image size
    const lightboxZoomIn = document.getElementById('lightbox-zoom-in');
    if (lightboxZoomIn) {
        lightboxZoomIn.addEventListener('click', function() {
            const lightboxCenter = document.querySelector('.lightbox-center');
            if (lightboxImageState.scale === 1) {
                // Get natural image size
                if (lightboxImage.complete && lightboxImage.naturalWidth) {
                    const containerWidth = lightboxCenter ? lightboxCenter.clientWidth : window.innerWidth;
                    const containerHeight = lightboxCenter ? lightboxCenter.clientHeight : window.innerHeight;
                    const scaleX = lightboxImage.naturalWidth / containerWidth;
                    const scaleY = lightboxImage.naturalHeight / containerHeight;
                    lightboxImageState.scale = Math.max(scaleX, scaleY, 1.5); // At least 1.5x or natural size
                } else {
                    lightboxImageState.scale = 2;
                }
                if (lightboxCenter) {
                    lightboxCenter.style.overflow = 'auto';
                    lightboxCenter.style.cursor = 'grab';
                }
                lightboxImage.style.cursor = 'grab';
            } else {
                lightboxImageState.scale = 1;
                lightboxImageState.x = 0;
                lightboxImageState.y = 0;
                if (lightboxCenter) {
                    lightboxCenter.style.overflow = 'hidden';
                    lightboxCenter.style.cursor = 'default';
                }
                lightboxImage.style.cursor = 'default';
            }
            applyLightboxTransform();
            lightboxZoomIn.innerHTML = lightboxImageState.scale > 1 
                ? '<i class="fas fa-search-minus"></i>' 
                : '<i class="fas fa-search-plus"></i>';
        });
    }

    // Drag functionality for lightbox
    if (lightboxImage) {
        const lightboxCenter = document.querySelector('.lightbox-center');
        
        lightboxImage.addEventListener('mousedown', function(e) {
            if (lightboxImageState.scale > 1) {
                lightboxImageState.isDragging = true;
                lightboxImageState.startX = e.clientX - lightboxImageState.x;
                lightboxImageState.startY = e.clientY - lightboxImageState.y;
                lightboxImage.style.cursor = 'grabbing';
                if (lightboxCenter) lightboxCenter.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', function(e) {
            if (lightboxImageState.isDragging && lightboxImageState.scale > 1) {
                lightboxImageState.x = e.clientX - lightboxImageState.startX;
                lightboxImageState.y = e.clientY - lightboxImageState.startY;
                applyLightboxTransform();
            }
        });

        document.addEventListener('mouseup', function() {
            if (lightboxImageState.isDragging) {
                lightboxImageState.isDragging = false;
                lightboxImage.style.cursor = 'grab';
                if (lightboxCenter) lightboxCenter.style.cursor = 'grab';
            }
        });
    }

    const lightboxFullscreen = document.getElementById('lightbox-fullscreen');
    if (lightboxFullscreen) {
        lightboxFullscreen.addEventListener('click', function() {
            const lightboxElement = lightboxModal || lightbox;
            if (!lightboxElement) return;
            
            if (!document.fullscreenElement) {
                lightboxElement.requestFullscreen().catch(err => {
                    console.log('Error attempting to enable fullscreen:', err);
                });
                lightboxFullscreen.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                document.exitFullscreen();
                lightboxFullscreen.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });
        
        // Update icon when fullscreen changes
        document.addEventListener('fullscreenchange', function() {
            if (lightboxFullscreen) {
                if (document.fullscreenElement) {
                    lightboxFullscreen.innerHTML = '<i class="fas fa-compress"></i>';
                } else {
                    lightboxFullscreen.innerHTML = '<i class="fas fa-expand"></i>';
                }
            }
        });
    }

    // -----------------------------------
    // Project Details Modal (from Lightbox)
    // -----------------------------------
    const projectDetailsModal = document.getElementById('project-details-modal');
    const projectDetailsClose = document.getElementById('project-details-close');
    const projectDetailsOverlay = document.querySelector('.project-details-overlay');
    
    // Function to open project details modal from lightbox
    function openProjectDetailsModal() {
        if (currentIndex < 0 || currentIndex >= portfolioItems.length) return;
        
        const item = portfolioItems[currentIndex];
        if (!item) return;
        
        // Read all detail data from data attributes
        const detailName = item.getAttribute('data-detail-name') || allTitles[currentIndex] || 'Project';
        const detailRole = item.getAttribute('data-detail-role') || '';
        const detailDescription = item.getAttribute('data-detail-description') || allDescriptions[currentIndex] || 'No description available.';
        const detailObjective = item.getAttribute('data-detail-objective') || '';
        const detailClient = item.getAttribute('data-detail-client') || '';
        const detailDate = item.getAttribute('data-detail-date') || '';
        const detailProjectUrl = item.getAttribute('data-detail-project-url') || '#';
        
        // Parse process data
        let processData = {};
        try {
            let processJson = item.getAttribute('data-detail-process');
            if (processJson && processJson.trim() !== '') {
                processJson = processJson.replace(/\\u0027/g, "'");
                processData = JSON.parse(processJson);
            }
        } catch (e) {
            console.warn('Could not parse process data for item', currentIndex, e);
        }
        
        // Parse detail images
        let detailImages = [];
        try {
            const imagesJson = item.getAttribute('data-detail-images');
            if (imagesJson) {
                detailImages = JSON.parse(imagesJson);
            }
        } catch (e) {
            console.warn('Could not parse images data for item', currentIndex);
        }
        
        if (detailImages.length === 0) {
            detailImages = [allImages[currentIndex]];
        }
        
        // Read BEFORE/AFTER data attributes
        const detailAfter = item.getAttribute('data-detail-after') || (detailImages[0] || allImages[currentIndex]);
        const detailBefore = item.getAttribute('data-detail-before') || '';

        // Update modal content
        const modalTitle = document.getElementById('modal-project-title');
        const modalDescription = document.getElementById('modal-project-description');
        // Note: Old modalImage element replaced with stacked images (modalImageAfter/Before)
        const modalImageAfter = document.getElementById('modal-project-image-after');
        const modalImageBefore = document.getElementById('modal-project-image-before');
        const baToggle = document.getElementById('ba-toggle');
        const baBeforeBtn = document.getElementById('ba-before-btn');
        const baAfterBtn = document.getElementById('ba-after-btn');
        const baLabel = document.getElementById('ba-label');
        const modalObjective = document.getElementById('modal-project-objective');
        const modalObjectiveContent = document.getElementById('modal-objective-content');
        const modalProcess = document.getElementById('modal-project-process');
        const modalProcessContent = document.getElementById('modal-process-content');
        const modalClient = document.getElementById('modal-client');
        const modalDate = document.getElementById('modal-date');
        const modalProjectUrl = document.getElementById('modal-project-url');
        const modalClientItem = document.getElementById('modal-client-item');
        const modalDateItem = document.getElementById('modal-date-item');
        const modalUrlItem = document.getElementById('modal-url-item');
        const modalWipThumbnails = document.getElementById('modal-wip-thumbnails');
        
        // Set title
        if (modalTitle) {
            modalTitle.textContent = detailName + (detailRole ? ` - ${detailRole}` : '');
        }
        
        // Set description
        if (modalDescription) {
            modalDescription.innerHTML = `<p>${detailDescription}</p>`;
        }
        
        // Set main image (use first image or current lightbox image)
        // Note: modalImage is kept for backward compatibility, but we now use modalImageAfter/Before
        // The old modalImage element has been replaced with stacked images, so this is optional
        // if (modalImage) {
        //     modalImage.src = detailImages[0] || allImages[currentIndex];
        //     modalImage.alt = detailName;
        // }
        
        // Setup BEFORE/AFTER images
        if (modalImageAfter) {
            modalImageAfter.src = detailAfter;
            modalImageAfter.alt = detailName + ' - After';
        }
        
        // Setup BEFORE image - preload for smooth transition
        if (modalImageBefore && detailBefore) {
            modalImageBefore.alt = detailName + ' - Before';
            // Preload the image for smooth crossfade
            const beforeImg = new Image();
            beforeImg.onload = function() {
                if (modalImageBefore) {
                    modalImageBefore.src = detailBefore;
                }
            };
            beforeImg.src = detailBefore;
        }
        
        // Show/hide BEFORE/AFTER toggle based on whether BEFORE exists
        if (detailBefore && detailBefore.trim() !== '') {
            // Show toggle and label
            if (baToggle) {
                baToggle.setAttribute('aria-hidden', 'false');
                baToggle.style.setProperty('display', 'flex', 'important');
            }
            if (baLabel) {
                baLabel.setAttribute('aria-hidden', 'false');
                baLabel.style.setProperty('display', 'block', 'important');
                baLabel.textContent = 'AFTER';
            }
        } else {
            // Hide toggle and label
            if (baToggle) {
                baToggle.setAttribute('aria-hidden', 'true');
                baToggle.style.setProperty('display', 'none', 'important');
            }
            if (baLabel) {
                baLabel.setAttribute('aria-hidden', 'true');
                baLabel.style.setProperty('display', 'none', 'important');
            }
        }
        
        // Reset to AFTER state (always start on AFTER)
        resetBeforeAfter();
        
        // Set objective
        if (detailObjective && detailObjective.trim() !== '') {
            if (modalObjective) modalObjective.style.display = 'block';
            if (modalObjectiveContent) modalObjectiveContent.innerHTML = `<p>${detailObjective}</p>`;
        } else {
            if (modalObjective) modalObjective.style.display = 'none';
        }
        
        // Set process
        if (processData && Object.keys(processData).length > 0) {
            if (modalProcess) modalProcess.style.display = 'block';
            if (modalProcessContent) {
                let processHTML = '';
                for (const [subsectionTitle, subsectionContent] of Object.entries(processData)) {
                    processHTML += `
                        <div class="modal-process-subsection">
                            <h4 class="modal-process-subsection-title">${subsectionTitle}:</h4>
                            <p class="modal-process-subsection-content">${subsectionContent}</p>
                        </div>
                    `;
                }
                modalProcessContent.innerHTML = processHTML;
            }
        } else {
            if (modalProcess) modalProcess.style.display = 'none';
        }
        
        // Set characteristics/outcome
        const detailCharacteristics = item.getAttribute('data-detail-characteristics') || '';
        const modalCharacteristics = document.getElementById('modal-project-characteristics');
        const modalCharacteristicsContent = document.getElementById('modal-characteristics-content');
        
        if (detailCharacteristics && detailCharacteristics.trim() !== '') {
            if (modalCharacteristics) modalCharacteristics.style.display = 'block';
            if (modalCharacteristicsContent) modalCharacteristicsContent.innerHTML = `<p>${detailCharacteristics}</p>`;
        } else {
            if (modalCharacteristics) modalCharacteristics.style.display = 'none';
        }
        
        // Set client info
        if (detailClient && detailClient.trim() !== '') {
            if (modalClientItem) modalClientItem.style.display = 'block';
            if (modalClient) modalClient.textContent = detailClient;
        } else {
            if (modalClientItem) modalClientItem.style.display = 'none';
        }
        
        if (detailDate && detailDate.trim() !== '') {
            if (modalDateItem) modalDateItem.style.display = 'block';
            if (modalDate) modalDate.textContent = detailDate;
        } else {
            if (modalDateItem) modalDateItem.style.display = 'none';
        }
        
        if (detailProjectUrl && detailProjectUrl !== '#') {
            if (modalUrlItem) modalUrlItem.style.display = 'block';
            if (modalProjectUrl) {
                modalProjectUrl.href = detailProjectUrl;
                modalProjectUrl.textContent = detailProjectUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');
            }
        } else {
            if (modalUrlItem) modalUrlItem.style.display = 'none';
        }
        
        // Handle WIP thumbnails for multi-image projects (with KW Final.png last)
        const imageSection = document.querySelector('.project-details-image-section');
        if (detailImages.length > 1 && modalWipThumbnails) {
            // Reorder thumbnails: move first image (KW Final.png) to the end
            const firstImage = detailImages[0];
            const otherImages = detailImages.slice(1);
            const reorderedThumbnails = [...otherImages, firstImage];
            
            modalWipThumbnails.style.display = 'flex';
            modalWipThumbnails.innerHTML = reorderedThumbnails.map((imgSrc, thumbIndex) => {
                // Find the original index in detailImages array
                const originalIndex = detailImages.indexOf(imgSrc);
                const isActive = originalIndex === 0; // First image (KW Final) is active
                return `
                <div class="modal-wip-thumbnail ${isActive ? 'active' : ''}" data-wip-index="${originalIndex}">
                    <img src="${imgSrc}" alt="${detailName} - Image ${originalIndex + 1}" />
                </div>
            `;
            }).join('');
            
            // Add has-thumbnails class to image section
            if (imageSection) {
                imageSection.classList.add('has-thumbnails');
            }
            
            // Add click handlers for WIP thumbnails
            const wipThumbnails = modalWipThumbnails.querySelectorAll('.modal-wip-thumbnail');
            const modalImageAfter = document.getElementById('modal-project-image-after');
            const modalImageBefore = document.getElementById('modal-project-image-before');
            
            wipThumbnails.forEach((thumb) => {
                thumb.addEventListener('click', function() {
                    const wipIndex = parseInt(thumb.getAttribute('data-wip-index'));
                    const newImageSrc = detailImages[wipIndex];
                    
                    if (!newImageSrc) return;
                    
                    // Check if currently viewing BEFORE
                    const isViewingBefore = modalImageBefore && 
                        modalImageBefore.style.opacity === '1' && 
                        modalImageBefore.style.pointerEvents === 'auto';
                    
                    if (isViewingBefore) {
                        // Option A: Switch to AFTER first, then update
                        setBeforeAfter('after');
                        
                        // Wait for crossfade to complete, then update AFTER image
                        setTimeout(() => {
                            if (modalImageAfter && newImageSrc) {
                                modalImageAfter.src = newImageSrc;
                            }
                        // Note: Old modalImage element replaced with stacked images
                        // Backward compatibility code removed
                        }, 250); // Match crossfade duration
                    } else {
                        // Already on AFTER, just update the image
                        if (modalImageAfter && newImageSrc) {
                            modalImageAfter.src = newImageSrc;
                        }
                        // Note: Old modalImage element replaced with stacked images
                        // Backward compatibility code removed
                    }
                    
                    // Update active thumbnail
                    wipThumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    
                    // Ensure we end on AFTER state
                    resetBeforeAfter();
                });
            });
        } else {
            if (modalWipThumbnails) modalWipThumbnails.style.display = 'none';
            // Remove has-thumbnails class if no thumbnails
            if (imageSection) {
                imageSection.classList.remove('has-thumbnails');
            }
        }
        
        // Show modal
        if (projectDetailsModal) {
            // Set aria-hidden to false BEFORE making it visible to avoid accessibility warnings
            projectDetailsModal.setAttribute('aria-hidden', 'false');
            projectDetailsModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Reset scroll position of text section to top
            const scrollableSection = document.querySelector('.project-details-scrollable');
            if (scrollableSection) {
                scrollableSection.scrollTop = 0;
            }
            
            // Use requestAnimationFrame to ensure DOM is updated before adding active class
            requestAnimationFrame(() => {
                projectDetailsModal.classList.add('active');
                // Focus the close button after modal is visible (for accessibility)
                const closeButton = document.getElementById('project-details-close');
                if (closeButton) {
                    closeButton.focus();
                }
            });
        }

    }
    
    // Function to reset BEFORE/AFTER to AFTER state
    function resetBeforeAfter() {
        const modalImageAfter = document.getElementById('modal-project-image-after');
        const modalImageBefore = document.getElementById('modal-project-image-before');
        const baBeforeBtn = document.getElementById('ba-before-btn');
        const baAfterBtn = document.getElementById('ba-after-btn');
        const baLabel = document.getElementById('ba-label');
        
        if (modalImageAfter && modalImageBefore) {
            // Show AFTER, hide BEFORE
            modalImageAfter.style.opacity = '1';
            modalImageAfter.style.pointerEvents = 'auto';
            modalImageBefore.style.opacity = '0';
            modalImageBefore.style.pointerEvents = 'none';
        }
        
        // Update button states
        if (baBeforeBtn) {
            baBeforeBtn.classList.remove('active');
        }
        if (baAfterBtn) {
            baAfterBtn.classList.add('active');
        }
        
        // Update label
        if (baLabel) {
            baLabel.textContent = 'AFTER';
        }
    }
    
    // Function to set BEFORE/AFTER mode
    function setBeforeAfter(mode) {
        const modalImageAfter = document.getElementById('modal-project-image-after');
        const modalImageBefore = document.getElementById('modal-project-image-before');
        const baBeforeBtn = document.getElementById('ba-before-btn');
        const baAfterBtn = document.getElementById('ba-after-btn');
        const baLabel = document.getElementById('ba-label');
        
        if (!modalImageAfter || !modalImageBefore) return;
        
        if (mode === 'before') {
            // Ensure BEFORE image is loaded (should be preloaded, but check anyway)
            if (modalImageBefore && !modalImageBefore.src && modalImageBefore.dataset.src) {
                modalImageBefore.src = modalImageBefore.dataset.src;
            }
            
            // Crossfade to BEFORE
            if (modalImageAfter) {
                modalImageAfter.style.opacity = '0';
                modalImageAfter.style.pointerEvents = 'none';
            }
            if (modalImageBefore) {
                modalImageBefore.style.opacity = '1';
                modalImageBefore.style.pointerEvents = 'auto';
            }
            
            // Update button states
            if (baBeforeBtn) baBeforeBtn.classList.add('active');
            if (baAfterBtn) baAfterBtn.classList.remove('active');
            
            // Update label
            if (baLabel) baLabel.textContent = 'BEFORE';
        } else if (mode === 'after') {
            // Crossfade to AFTER
            modalImageAfter.style.opacity = '1';
            modalImageAfter.style.pointerEvents = 'auto';
            modalImageBefore.style.opacity = '0';
            modalImageBefore.style.pointerEvents = 'none';
            
            // Update button states
            if (baBeforeBtn) baBeforeBtn.classList.remove('active');
            if (baAfterBtn) baAfterBtn.classList.add('active');
            
            // Update label
            if (baLabel) baLabel.textContent = 'AFTER';
        }

    }
    
    // Function to close project details modal
    function closeProjectDetailsModal() {
        if (projectDetailsModal) {
            // Reset to AFTER before closing
            resetBeforeAfter();
            
            // Remove active class first
            projectDetailsModal.classList.remove('active');
            
            // Move focus away from any element inside the modal before hiding
            const focusedElement = projectDetailsModal.querySelector(':focus');
            if (focusedElement && focusedElement.blur) {
                focusedElement.blur();
            }
            
            // Set aria-hidden after focus is moved (use setTimeout to ensure focus has moved)
            setTimeout(() => {
                if (projectDetailsModal) {
                    projectDetailsModal.setAttribute('aria-hidden', 'true');
                }
            }, 0);
            
            setTimeout(() => {
                if (projectDetailsModal) {
                    projectDetailsModal.style.display = 'none';
                    // Restore body overflow if lightbox is closed
                    const activeLightbox = lightboxModal || lightbox;
                    if (!activeLightbox || !activeLightbox.classList.contains('active')) {
                        document.body.style.overflow = '';
                    }
                    // Update toggle state
                    if (lightboxDetailsToggle) {
                        lightboxDetailsToggle.classList.remove('active');
                        lightboxDetailsToggle.setAttribute('aria-pressed', 'false');
                    }
                }
            }, 300);
        }
    }
    
    
    // Close modal handlers
    if (projectDetailsClose) {
        projectDetailsClose.addEventListener('click', closeProjectDetailsModal);
        projectDetailsClose.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeProjectDetailsModal();
            }
        });
    }
    
    if (projectDetailsOverlay) {
        projectDetailsOverlay.addEventListener('click', closeProjectDetailsModal);
    }
    
    // BEFORE/AFTER Toggle Event Listeners
    const baBeforeBtn = document.getElementById('ba-before-btn');
    const baAfterBtn = document.getElementById('ba-after-btn');
    
    if (baBeforeBtn) {
        baBeforeBtn.addEventListener('click', function() {
            setBeforeAfter('before');
        });
    }
    
    if (baAfterBtn) {
        baAfterBtn.addEventListener('click', function() {
            setBeforeAfter('after');
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectDetailsModal && projectDetailsModal.classList.contains('active')) {
            closeProjectDetailsModal();
        }
    });

    // -----------------------------------
    // Portfolio Detail View (Legacy - can be removed if not needed)
    // -----------------------------------
    const portfolioDetail = document.getElementById('portfolio-detail');
    const detailClose = document.querySelector('.portfolio-detail-close');
    const detailImageEl = document.getElementById('detail-image');
    const detailNameEl = document.getElementById('detail-name');
    const detailRoleEl = document.getElementById('detail-role');
    const detailDescriptionEl = document.getElementById('detail-description');
    const detailObjectiveEl = document.getElementById('detail-objective');
    const detailObjectiveSection = document.getElementById('detail-objective-section');
    const detailProcessEl = document.getElementById('detail-process');
    const detailProcessSection = document.getElementById('detail-process-section');
    const detailCharacteristicsEl = document.getElementById('detail-characteristics');
    const detailCharacteristicsSection = document.getElementById('detail-characteristics-section');
    const detailClientEl = document.getElementById('detail-client');
    const detailDateEl = document.getElementById('detail-date');
    const detailCategoryEl = document.getElementById('detail-category');
    const detailProjectUrlEl = document.getElementById('detail-project-url');
    
    // Function to show portfolio detail - reads from data attributes for easy expansion
    function showPortfolioDetail(index) {
        const item = portfolioItems[index];
        if (!item) return;
        
        // Read all detail data from data attributes
        const detailName = item.getAttribute('data-detail-name') || allTitles[index] || 'Project';
        const detailRole = item.getAttribute('data-detail-role') || '';
        const detailDescription = item.getAttribute('data-detail-description') || allDescriptions[index] || 'No description available.';
        const detailObjective = item.getAttribute('data-detail-objective') || '';
        const detailCharacteristics = item.getAttribute('data-detail-characteristics') || '';
        const detailClient = item.getAttribute('data-detail-client') || 'Client';
        const detailDate = item.getAttribute('data-detail-date') || new Date().getFullYear().toString();
        const detailCategory = item.getAttribute('data-detail-category') || '';
        const detailProjectUrl = item.getAttribute('data-detail-project-url') || '#';
        
        // Parse process data from JSON data attribute
        let processData = {};
        try {
            let processJson = item.getAttribute('data-detail-process');
            if (processJson && processJson.trim() !== '') {
                // Replace unicode escape sequences if present
                processJson = processJson.replace(/\\u0027/g, "'");
                processData = JSON.parse(processJson);
            }
        } catch (e) {
            console.warn('Could not parse process data for item', index, e);
        }
        
        // Parse skills from JSON data attribute
        let skills = [];
        try {
            const skillsJson = item.getAttribute('data-detail-skills');
            if (skillsJson) {
                skills = JSON.parse(skillsJson);
            }
        } catch (e) {
            console.warn('Could not parse skills data for item', index);
        }
        
        // Set default skills if none provided
        if (skills.length === 0) {
            skills = [
                { name: "Creative Direction", percent: 90 },
                { name: "Technical Execution", percent: 88 },
                { name: "Client Satisfaction", percent: 95 }
            ];
        }
        
        // Parse detail images from JSON data attribute
        let detailImages = [];
        try {
            const imagesJson = item.getAttribute('data-detail-images');
            if (imagesJson) {
                detailImages = JSON.parse(imagesJson);
            }
        } catch (e) {
            console.warn('Could not parse images data for item', index);
        }
        
        // If no detail images array, use the single portfolio image
        if (detailImages.length === 0) {
            detailImages = [allImages[index]];
        }
        
        // Update main image (use first image from array)
        const mainImageSrc = detailImages[0];
        if (detailImageEl) {
            detailImageEl.src = mainImageSrc;
            detailImageEl.alt = detailName;
        }
        
        // Update thumbnail gallery - always show all images as thumbnails
        const detailThumbnailsContainer = document.getElementById('detail-thumbnails');
        if (detailThumbnailsContainer) {
            // Always show thumbnail gallery if there are images (including single image)
            // Include all images as thumbnails - KW Typographic Portrait.png is image 0
            if (detailImages.length > 0) {
                detailThumbnailsContainer.style.display = 'flex';
                detailThumbnailsContainer.innerHTML = detailImages.map((imgSrc, imgIndex) => `
                    <div class="detail-thumbnail-item ${imgIndex === 0 ? 'active' : ''}" data-image-index="${imgIndex}" role="button" tabindex="0" aria-label="View image ${imgIndex + 1}">
                        <img src="${imgSrc}" alt="${detailName} - Image ${imgIndex + 1}" />
                    </div>
                `).join('');
                
                // Add click handlers for thumbnails
                const thumbnailItems = detailThumbnailsContainer.querySelectorAll('.detail-thumbnail-item');
                thumbnailItems.forEach((thumb) => {
                    thumb.addEventListener('click', function() {
                        // Get the image index from data attribute
                        const imageIndex = parseInt(thumb.getAttribute('data-image-index'));
                        const imageSrc = detailImages[imageIndex];
                        
                        // Update main image with loading state
                        if (detailImageEl) {
                            detailImageEl.style.opacity = '0.5';
                            const img = new Image();
                            img.onload = function() {
                                detailImageEl.src = imageSrc;
                                detailImageEl.style.opacity = '1';
                            };
                            img.onerror = function() {
                                detailImageEl.style.opacity = '1';
                                console.warn('Failed to load image:', imageSrc);
                            };
                            img.src = imageSrc;
                        }
                        
                        // Update active thumbnail
                        thumbnailItems.forEach(t => t.classList.remove('active'));
                        thumb.classList.add('active');
                    });
                    
                    // Keyboard support
                    thumb.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            thumb.click();
                        }
                    });
                });
            } else {
                // Hide thumbnail gallery if only one image, but keep container in DOM
                detailThumbnailsContainer.style.display = 'none';
                detailThumbnailsContainer.innerHTML = '';
            }
        }
        
        // Update basic content
        if (detailNameEl) detailNameEl.textContent = detailName;
        if (detailRoleEl) detailRoleEl.textContent = detailRole;
        if (detailDescriptionEl) detailDescriptionEl.innerHTML = `<p>${detailDescription}</p>`;
        if (detailClientEl) detailClientEl.textContent = detailClient;
        if (detailDateEl) detailDateEl.textContent = detailDate;
        if (detailCategoryEl) detailCategoryEl.textContent = detailCategory;
        if (detailProjectUrlEl) {
            detailProjectUrlEl.href = detailProjectUrl;
            detailProjectUrlEl.textContent = detailProjectUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');
        }
        
        // Handle Objective section
        if (detailObjective && detailObjective.trim() !== '') {
            if (detailObjectiveEl) detailObjectiveEl.innerHTML = `<p>${detailObjective}</p>`;
            if (detailObjectiveSection) detailObjectiveSection.style.display = 'block';
        } else {
            if (detailObjectiveSection) detailObjectiveSection.style.display = 'none';
        }
        
        // Handle Process section
        if (processData && Object.keys(processData).length > 0) {
            if (detailProcessEl && detailProcessSection) {
                let processHTML = '';
                for (const [subsectionTitle, subsectionContent] of Object.entries(processData)) {
                    processHTML += `
                        <div class="detail-process-subsection">
                            <h4 class="detail-process-subsection-title">${subsectionTitle}:</h4>
                            <p class="detail-process-subsection-content">${subsectionContent}</p>
                        </div>
                    `;
                }
                detailProcessEl.innerHTML = processHTML;
                detailProcessSection.style.display = 'block';
            } else {
                console.warn('Process section elements not found');
            }
        } else {
            if (detailProcessSection) detailProcessSection.style.display = 'none';
        }
        
        // Handle Characteristics section
        if (detailCharacteristics && detailCharacteristics.trim() !== '') {
            if (detailCharacteristicsEl) detailCharacteristicsEl.innerHTML = `<p>${detailCharacteristics}</p>`;
            if (detailCharacteristicsSection) detailCharacteristicsSection.style.display = 'block';
        } else {
            if (detailCharacteristicsSection) detailCharacteristicsSection.style.display = 'none';
        }
        
        // Update share button URLs
        const currentUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent(`${detailName} - ${detailRole}`);
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(btn => {
            const platform = btn.classList.contains('facebook') ? 'facebook' :
                           btn.classList.contains('twitter') ? 'twitter' :
                           btn.classList.contains('linkedin') ? 'linkedin' : 'pinterest';
            
            let shareUrl = '#';
            if (platform === 'facebook') {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
            } else if (platform === 'twitter') {
                shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`;
            } else if (platform === 'linkedin') {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
            } else if (platform === 'pinterest') {
                shareUrl = `https://pinterest.com/pin/create/button/?url=${currentUrl}&description=${shareText}`;
            }
            btn.href = shareUrl;
        });
        
        // Update skills
        const skillsContainer = document.querySelector('.detail-skills');
        if (skillsContainer && skills.length > 0) {
            const skillsHTML = `
                ${skills.map(skill => `
                    <div class="skill-item">
                        <div class="skill-header">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-percentage">${skill.percent}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" data-percent="${skill.percent}" style="width: 0%;"></div>
                        </div>
                    </div>
                `).join('')}
            `;
            skillsContainer.innerHTML = skillsHTML;
            
            // Animate skill bars
            setTimeout(() => {
                const progressBars = skillsContainer.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const percent = bar.getAttribute('data-percent');
                    bar.style.width = percent + '%';
                });
            }, 300);
        }
        
        if (portfolioDetail) {
            portfolioDetail.style.display = 'block';
            setTimeout(() => {
                portfolioDetail.classList.add('active');
                document.body.style.overflow = 'hidden';
                // Smooth scroll to top of left column
                const leftColumn = portfolioDetail.querySelector('.portfolio-detail-left');
                if (leftColumn) {
                    leftColumn.scrollTop = 0;
                }
            }, 10);
        }
    }
    
    function closePortfolioDetail() {
        portfolioDetail.classList.remove('active');
        setTimeout(() => {
            portfolioDetail.style.display = 'none';
            document.body.style.overflow = '';
        }, 400);
    }
    
    if (detailClose) {
        detailClose.addEventListener('click', closePortfolioDetail);
        detailClose.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closePortfolioDetail();
            }
        });
    }


    // -----------------------------------
    // Filter Toggle and Filtering
    // -----------------------------------
    const filterToggleButton = document.querySelector('.filter-toggle');
    const filtersContainer = document.querySelector('.portfolio-filters');

    if (filterToggleButton && filtersContainer) {
        filterToggleButton.addEventListener("click", function () {
            filtersContainer.classList.toggle('active');
            filterToggleButton.textContent = filtersContainer.classList.contains('active') ? "Hide Filters" : "Show Filters";
            filterToggleButton.setAttribute('aria-expanded', filtersContainer.classList.contains('active'));
        });
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    
    // Debounce function for filter clicks to prevent rapid-fire filtering
    let filterTimeout;
    function debounceFilter(callback, delay = 150) {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(callback, delay);
    }

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function () {
                const category = button.getAttribute("data-filter");
                
                // Debounce rapid clicks for better performance
                debounceFilter(() => {
                    // Update current filter for lightbox
                    currentFilter = category;
                    updateFilteredIndices();

                    filterButtons.forEach(btn => {
                        btn.classList.remove("active");
                        btn.setAttribute('aria-pressed', 'false');
                    });
                    button.classList.add("active");
                    button.setAttribute('aria-pressed', 'true');

                    // Use requestAnimationFrame for smooth transitions
                    requestAnimationFrame(() => {
                        portfolioItems.forEach(item => {
                            if (category === "*" || item.classList.contains(category.substring(1))) {
                                item.classList.remove('hidden');
                                item.classList.add('visible');
                            } else {
                                item.classList.remove('visible');
                                item.classList.add('hidden');
                            }
                        });
                        // Update grid item count after filtering
                        updateGridItemCount();
                    });
                    
                    // If lightbox is open, update it
                    if (lightbox && lightbox.classList.contains('active')) {
                        // Find current item in filtered list
                        const currentInFiltered = filteredIndices.indexOf(currentIndex);
                        if (currentInFiltered === -1 || filteredIndices.length === 0) {
                            // Current item not in filter, close lightbox or go to first
                            if (filteredIndices.length > 0) {
                                currentIndex = filteredIndices[0];
                                updateLightboxContent();
                            } else {
                                closeLightbox();
                            }
                        } else {
                            // Update counter
                            updateLightboxContent();
                        }
                    }
                });
            });
        });
    }

    // -----------------------------------
    // Smooth Scroll for Anchors except menu links
    // -----------------------------------
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not(.menu-links a)');

    smoothScrollLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // -----------------------------------
    // AI Art Section Reveal on Scroll
    // -----------------------------------
    const aiArtSection = document.getElementById('ai-art');
    function revealAIArtSection() {
        const windowBottom = window.scrollY + window.innerHeight;
        if (aiArtSection && !aiArtSection.classList.contains('visible')) {
            if (windowBottom >= aiArtSection.offsetTop + 100) {
                aiArtSection.classList.add('visible');
                window.removeEventListener('scroll', revealAIArtSection);
            }
        }
    }
    // Use passive listener for better INP
    window.addEventListener('scroll', revealAIArtSection, { passive: true });
    revealAIArtSection();

    // -----------------------------------
    // Contact Form Validation & Submission (simulated)
    // -----------------------------------
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Remove previous message classes
            formMessage.classList.remove('error', 'success');

            if (!name) {
                formMessage.textContent = 'Please enter your name.';
                formMessage.classList.add('error');
                contactForm.name.focus();
                return;
            }
            if (!email || !emailPattern.test(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.classList.add('error');
                contactForm.email.focus();
                return;
            }
            if (!message) {
                formMessage.textContent = 'Please enter your message.';
                formMessage.classList.add('error');
                contactForm.message.focus();
                return;
            }

            // Submit to Web3Forms
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    formMessage.textContent = "Thanks — your message has been sent. I'll be in touch soon.";
                    formMessage.classList.remove('error');
                    formMessage.classList.add('success');
                    contactForm.reset();
                } else {
                    formMessage.textContent = "Something went wrong. Please email joel.pagan00@gmail.com directly.";
                    formMessage.classList.remove('success');
                    formMessage.classList.add('error');
                }
            } catch (err) {
                formMessage.textContent = "Network error. Please email joel.pagan00@gmail.com directly.";
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
            }
        });
    }

    // -----------------------------------
    // Hero CTA Wipe Effect State Management
    // -----------------------------------
    const scrollButton = document.querySelector('.scroll-button');
    const designText = document.querySelector('.design-text'); // For listening to transitionend

    if (scrollButton && designText) {
        scrollButton.addEventListener('mouseenter', () => {
            scrollButton.classList.add('is-hovering');
            scrollButton.classList.remove('is-exiting');
        });

        scrollButton.addEventListener('mouseleave', () => {
            scrollButton.classList.remove('is-hovering');
            scrollButton.classList.add('is-exiting');
        });

        designText.addEventListener('transitionend', (event) => {
            if (event.propertyName === 'clip-path' && scrollButton.classList.contains('is-exiting')) {
                scrollButton.classList.remove('is-exiting');
            }
        });
    }

    // -----------------------------------
    // Footer: Update Current Year
    // -----------------------------------
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // -----------------------------------
    // Service Detail Expandable Sections
    // -----------------------------------
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceDetailSections = document.querySelectorAll('.service-detail-section');
    const serviceCloseButtons = document.querySelectorAll('.service-detail-close-btn');
    
    const serviceDetailsContainer = document.querySelector('.service-details-container');
    let scrollPosition = 0;
    let isClosing = false;
    
    // Function to close all service detail sections
    function closeAllServiceDetails(restoreScroll = true) {
        if (isClosing) return;
        isClosing = true;
        
        serviceDetailSections.forEach(section => {
            section.classList.remove('active');
        });
        if (serviceDetailsContainer) {
            serviceDetailsContainer.classList.remove('has-active');
        }
        
        // Re-enable body scroll after modal closes
        setTimeout(() => {
            document.body.classList.remove('service-modal-open');
            document.body.style.top = '';
            if (restoreScroll && scrollPosition !== undefined) {
                window.scrollTo({ top: scrollPosition, left: 0, behavior: 'instant' });
            }
            isClosing = false;
        }, 500); // Wait for modal close animation (0.5s)
        
        // Remove hash from URL without scrolling
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, window.location.pathname);
        }
    }
    
    // Function to open a specific service detail section
    function openServiceDetail(serviceId) {
        // Close all sections first
        serviceDetailSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Find the target section
        const targetSection = document.getElementById(serviceId);
        if (!targetSection) return;
        
        // Save current scroll position and prevent body scroll
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        document.body.classList.add('service-modal-open');
        document.body.style.top = `-${scrollPosition}px`;
        
        // Add active class to container for backdrop
        if (serviceDetailsContainer) {
            serviceDetailsContainer.classList.add('has-active');
        }
        
        // Activate the target section
        targetSection.classList.add('active');
    }
    
    // Handle service link clicks
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const serviceId = href.substring(1);
                openServiceDetail(serviceId);
                
                // Update URL hash
                if (window.history && window.history.pushState) {
                    window.history.pushState(null, null, href);
                } else {
                    window.location.hash = href;
                }
            }
        });
    });
    
    // Handle close button clicks
    serviceCloseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeAllServiceDetails();
        });
    });
    
    // Handle click on backdrop to close
    const backdrop = document.querySelector('.service-details-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', function(e) {
            closeAllServiceDetails();
        });
    }
    
    // Handle URL hash on page load
    function handleInitialHash() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#services-')) {
            const serviceId = hash.substring(1);
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                openServiceDetail(serviceId);
            }, 300);
        }
    }
    
    // Check hash on page load
    handleInitialHash();
    
    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#services-')) {
            const serviceId = hash.substring(1);
            openServiceDetail(serviceId);
        } else {
            closeAllServiceDetails();
        }
    });
    
    // Handle "Get Started" button clicks (close modal and scroll to contact)
    const getStartedButtons = document.querySelectorAll('.service-cta-button');
    getStartedButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Close service detail first (don't restore scroll position)
            closeAllServiceDetails(false);
            
            // Wait for modal to fully close, then scroll smoothly
            setTimeout(() => {
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        // Calculate proper offset accounting for header
                        const header = document.getElementById('header');
                        const headerHeight = header ? header.offsetHeight : 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: Math.max(0, offsetPosition),
                            behavior: 'smooth'
                        });
                    }
                }
            }, 600); // Wait for modal close animation to complete
        });
    });
    
    // Featured Work episode selector
    const featuredWorkPreview = document.getElementById('featured-work-preview');
    const featuredWorkPreviewImage = document.getElementById('featured-work-preview-image');
    const featuredEpisodeButtons = document.querySelectorAll('.featured-work-episode-button');

    function selectFeaturedEpisode(button) {
        const videoId = button.getAttribute('data-video-id');
        const episodeTitle = button.getAttribute('data-episode-title');

        if (!featuredWorkPreview || !featuredWorkPreviewImage || !videoId || !episodeTitle) return;

        featuredEpisodeButtons.forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-pressed', 'false');
        });

        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        featuredWorkPreview.href = `https://youtu.be/${videoId}`;
        featuredWorkPreview.setAttribute('aria-label', `Watch ${episodeTitle} on YouTube`);
        featuredWorkPreviewImage.alt = `Fighters' Destiny — ${episodeTitle}`;
        featuredWorkPreviewImage.onerror = function () {
            this.onerror = null;
            this.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        };
        featuredWorkPreviewImage.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }

    featuredEpisodeButtons.forEach(button => {
        button.addEventListener('click', () => selectFeaturedEpisode(button));
    });

    // Handle "View Portfolio" button clicks
    const portfolioFilterLinks = document.querySelectorAll('.service-cta-button-secondary');
    portfolioFilterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            const href = this.getAttribute('href');
            
            // Close service detail first (don't restore scroll position)
            closeAllServiceDetails(false);
            
            // Wait for modal to fully close, then filter and scroll smoothly
            setTimeout(() => {
                if (filter) {
                    // Find and click the corresponding filter button
                    const filterButton = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
                    if (filterButton) {
                        filterButton.click();
                    }
                }
                
                // Scroll to portfolio section
                setTimeout(() => {
                    if (href && href.startsWith('#')) {
                        const targetId = href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            // Calculate proper offset accounting for header
                            const header = document.getElementById('header');
                            const headerHeight = header ? header.offsetHeight : 80;
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                            
                            window.scrollTo({
                                top: Math.max(0, offsetPosition),
                                behavior: 'smooth'
                            });
                        }
                    }
                }, filter ? 100 : 0); // Small delay if filtering to let filter animation complete
            }, 600); // Wait for modal close animation to complete
        });
    });
});