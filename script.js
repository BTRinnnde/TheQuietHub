document.addEventListener('DOMContentLoaded', () => {
    // ========== DOM Elements ==========
    const folder = document.querySelector('.folder');
    const innerFolder = document.getElementById('innerFolder');
    const modal = document.getElementById('folderModal');
    const innerModal = document.getElementById('innerFolderModal');
    const clickableElements = document.querySelectorAll('.clickable');
    const cube = document.querySelector('.cube');
    const faces = Array.from(cube.children);

    // Remove blue highlight on touch devices
    folder.style.webkitTapHighlightColor = 'transparent';
    innerFolder.style.webkitTapHighlightColor = 'transparent';
    // Remove blue highlight from platform icons
    document.addEventListener('click', (e) => {
        const platformIcon = e.target.closest('.platform-icon');
        if (platformIcon) {
            platformIcon.style.webkitTapHighlightColor = 'transparent';
        }
    }, { capture: true });

    // ========== Animation State ==========
    let rotation = 0;
    let rotationInterval;

    // ========== Cover image loading (WebP with JPEG fallback, lazy where possible) ==========
    const setCoverBackground = (el) => {
        if (!el || el.dataset.bgLoaded === '1') return;
        const webp = el.dataset.bgWebp;
        const jpg = el.dataset.bgJpg;
        if (!webp || !jpg) return;
        el.style.backgroundImage = `url("${jpg}")`;
        el.style.backgroundImage = `image-set(url("${webp}") type("image/webp"), url("${jpg}") type("image/jpeg"))`;
        el.dataset.bgLoaded = '1';
    };

    const hydrateCoversIn = (root) => {
        (root || document).querySelectorAll('[data-bg-webp]').forEach(setCoverBackground);
    };

    // Homepage grid covers: load when near viewport (below-the-fold until scroll)
    const lazyCoverObserver = ('IntersectionObserver' in window)
        ? new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setCoverBackground(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px 0px' })
        : null;

    document.querySelectorAll('.bottom-section .element[data-bg-webp]').forEach((el) => {
        if (lazyCoverObserver) {
            lazyCoverObserver.observe(el);
        } else {
            setCoverBackground(el);
        }
    });

    // ========== Utility Functions ==========
    const toggleScroll = (disable) => {
        document.body.style.overflow = disable ? 'hidden' : '';
    };

    const syncAppHeight = () => {
        const viewport = window.visualViewport;
        const h = viewport ? viewport.height : window.innerHeight;
        document.documentElement.style.setProperty('--app-height', `${Math.round(h)}px`);
    };
    syncAppHeight();
    window.addEventListener('resize', syncAppHeight);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', syncAppHeight);
        window.visualViewport.addEventListener('scroll', syncAppHeight);
    }

    // ========== Modal Handlers ==========
    const handleFolderClick = (targetModal) => {
        // Clear any existing styles first
        targetModal.style.backgroundColor = '';
        targetModal.style.backdropFilter = '';
        targetModal.style.webkitBackdropFilter = '';

        // Load full-size covers only when the modal is opened
        hydrateCoversIn(targetModal);

        targetModal.classList.add('show');
        toggleScroll(true);  // Disable scrolling
    };

    const handleModalClose = (targetModal) => {
        targetModal.classList.remove('show');
        
        // Only enable scrolling if no other modals are open
        const anyModalOpen = document.querySelector('.modal.show, .element-modal.show');
        if (!anyModalOpen) {
            toggleScroll(false);
        }
    };

    const createElementModal = (element) => {
        const elementModal = document.createElement('div');
        elementModal.className = 'element-modal';
        
        const content = document.createElement('div');
        content.className = 'element-modal-content';
        
        const clone = element.cloneNode(true);
        clone.removeAttribute('tabindex');
        clone.removeAttribute('role');
        clone.style.width = '100%';
        clone.style.height = '100%';
        clone.style.transform = 'none';

        const cover = document.createElement('div');
        cover.className = 'element-modal-cover';
        cover.appendChild(clone);

        const wrapper = element.closest('.element-wrapper, .modal-element-wrapper');
        const fullName = element.getAttribute('data-full-name');
        const label = fullName || wrapper.querySelector('.element-label, .modal-element-label').textContent;

        const labelElement = document.createElement('div');
        labelElement.className = 'scaled-element-label';

        if (fullName) {
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.fontSize = '1.8rem';
            tempSpan.style.whiteSpace = 'nowrap';
            tempSpan.textContent = label;
            document.body.appendChild(tempSpan);

            const textWidth = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);

            labelElement.style.fontSize = '1.8rem';

            if (textWidth > window.innerWidth * 0.95) {
                const words = label.split(' ');

                if (textWidth > window.innerWidth * 1.4) {
                    const third = Math.floor(words.length / 3);
                    const firstLine = words.slice(0, third).join(' ');
                    const secondLine = words.slice(third, third * 2).join(' ');
                    const thirdLine = words.slice(third * 2).join(' ');

                    labelElement.style.top = '-120px';
                    labelElement.style.lineHeight = '1.2';
                    labelElement.innerHTML = `${firstLine}<br>${secondLine}<br>${thirdLine}`;
                } else {
                    const middle = Math.floor(words.length / 2);
                    const firstLine = words.slice(0, middle).join(' ');
                    const secondLine = words.slice(middle).join(' ');

                    labelElement.style.top = '-85px';
                    labelElement.style.lineHeight = '1.2';
                    labelElement.innerHTML = `${firstLine}<br>${secondLine}`;
                }
            } else {
                labelElement.textContent = label;
            }
        } else {
            labelElement.textContent = label;
        }
        
        // Add platform icons with URLs based on element
        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'platform-icons';

        const playlistPages = {
            '1': '/playlists/peaceful-piano/',
            '2': '/playlists/elegant-jazz/',
            '3': '/playlists/lofi-dreams/',
            'modal1': '/playlists/white-noise/',
            'modal2': '/playlists/brown-noise/',
            'modal3': '/playlists/pink-noise/',
            'modal4': '/playlists/forest-sounds/',
            'modal5': '/playlists/creek-sounds/',
            'modal6': '/playlists/rain-sounds/',
            'modal7': '/playlists/thunder-sounds/'
        };

        const elementId = element.getAttribute('data-element');
        const playlistSlug = (playlistPages[elementId] || '').replace(/^\/playlists\/|\/$/g, '');

        const platformUrls = {
            '1': {
                spotify: 'https://open.spotify.com/playlist/51FY41cuYWtjoeuY90aTkw?si=1101d1a908434425',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54fayVupFaxlfRU91v6xQw_a',
                apple: 'https://music.apple.com/no/playlist/peaceful-piano/pl.u-oZylD6gsGlJWPP3'
            },
            '2': {
                spotify: 'https://open.spotify.com/playlist/3OHE3VO1SApjBBqBc5ns8v?si=4445c994fce241d3',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54dENbyCekPMHI9Ptt95zHFD&feature=shared',
                apple: 'https://music.apple.com/no/playlist/gentle-jazz/pl.u-xlyNE32CJDL4XXA'
            },
            '3': {
                spotify: 'https://open.spotify.com/playlist/5FmNVvu1pSFCXSVSzQH9pr?si=7e7be45d6b404642',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54f524vMstaf4GTPpoTQF1SP&feature=shared',
                apple: 'https://music.apple.com/no/playlist/lofi-dreams/pl.u-kv9l2aJTJVZrXXv'
            },
            'modal1': {
                spotify: 'https://open.spotify.com/playlist/0ki4X4mN7ggUrYcvvv6pq1?si=df0f61d8d91741c6',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54fYV6kSiwRr74EvtwlBSA5c&feature=shared',
                apple: 'https://music.apple.com/no/playlist/white-noise/pl.u-KVXBkPPFLRWrzzv'
            },
            'modal2': {
                spotify: 'https://open.spotify.com/playlist/3TPmuEYCxb84sRYH4KXPiF?si=b0fc2132a1cd4e26',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54d82SmgIUMQcVj6-2TtSaQS&feature=shared',
                apple: 'https://music.apple.com/no/playlist/brown-noise/pl.u-8aAVZy9IvL2zNNX'
            },
            'modal3': {
                spotify: 'https://open.spotify.com/playlist/606f0E4BDtBtWAO9SjO7BM?si=00a8c1e6235d4d17',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54fIynp_4WdkFwE1fcFXszTb&feature=shared',
                apple: 'https://music.apple.com/no/playlist/pink-noise/pl.u-oZylD0lTGlJWPP3'
            },
            'modal4': {
                spotify: 'https://open.spotify.com/playlist/4J9hDxbs08490A7BDS52lw?si=9fe35ff1a6f54781',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54fhassniXp2M_P_KxerUBqw&feature=shared',
                apple: 'https://music.apple.com/no/playlist/relaxing-forest-ambience/pl.u-oZylD1esGlJWPP3'
            },
            'modal5': {
                spotify: 'https://open.spotify.com/playlist/4W7cNRDkx2I3Swy6zQtnMl?si=d335ca40e2614d8a',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54cwstgvj1FQAwZWzo9uKeAr&feature=shared',
                apple: 'https://music.apple.com/no/playlist/soothing-creek-sounds/pl.u-WabZv4PSel2aWWE'
            },
            'modal6': {
                spotify: 'https://open.spotify.com/playlist/6eAkOpgDdauoC53IBkMKkD?si=613c0cdb4d5842e9',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54cLk4ygJ5ES4VH-_RV7Q-Ys&feature=shared',
                apple: 'https://music.apple.com/no/playlist/gentle-rainstorm-sounds/pl.u-8aAVZ5jHvL2zNNX'
            },
            'modal7': {
                spotify: 'https://open.spotify.com/playlist/2ivC5Xlo0rXsUM8j38vufy?si=4be0794be7ee4479',
                youtube: 'https://music.youtube.com/playlist?list=PLbeAGNc9R54cZqRKtnHLfkq92h-2TSBYG&feature=shared',
                apple: 'https://music.apple.com/no/playlist/relaxing-thunderstorm-sounds/pl.u-NpXmze4t4gKovvl'
            }
        };

        function createPlatformLink(platform, href, src, fallback, label) {
            const link = document.createElement('a');
            link.href = href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'platform-icon';
            link.dataset.streamPlatform = platform;
            if (playlistSlug) link.dataset.streamPlaylist = playlistSlug;
            link.setAttribute('aria-label', label);
            link.addEventListener('click', (e) => e.stopPropagation());

            const img = document.createElement('img');
            img.src = src;
            img.onerror = () => { img.src = fallback; };
            img.width = 60;
            img.height = 60;
            img.decoding = 'async';
            img.alt = '';
            link.appendChild(img);
            return link;
        }

        const urls = platformUrls[elementId] || {};
        if (urls.spotify) {
            iconsContainer.appendChild(createPlatformLink(
                'spotify',
                urls.spotify,
                'images/spotify.webp',
                'images/spotify.png',
                'Open playlist on Spotify'
            ));
        }
        if (urls.youtube) {
            iconsContainer.appendChild(createPlatformLink(
                'youtube-music',
                urls.youtube,
                'images/youtube.webp',
                'images/youtube.png',
                'Open playlist on YouTube Music'
            ));
        }
        if (urls.apple) {
            iconsContainer.appendChild(createPlatformLink(
                'apple-music',
                urls.apple,
                'images/apple.webp',
                'images/apple.png',
                'Open playlist on Apple Music'
            ));
        }

        const learnMore = document.createElement('a');
        learnMore.className = 'element-modal-learn-more';
        learnMore.href = playlistPages[elementId] || '/';
        learnMore.textContent = 'Learn more';
        learnMore.addEventListener('click', (e) => e.stopPropagation());
        
        content.appendChild(labelElement);
        content.appendChild(cover);
        content.appendChild(learnMore);

        const dismissGap = document.createElement('div');
        dismissGap.className = 'element-modal-dismiss';
        dismissGap.setAttribute('aria-hidden', 'true');

        elementModal.appendChild(content);
        elementModal.appendChild(dismissGap);
        elementModal.appendChild(iconsContainer);
        
        return elementModal;
    };

    const handleElementClick = (element, e) => {
        e.stopPropagation();
        
        // Store which modal was open (if any) to restore its state later
        const openInnerFolder = document.querySelector('#innerFolderModal.show');
        const wasInnerFolderOpen = openInnerFolder !== null;
        
        // Temporarily hide folder modal effects
        if (openInnerFolder) {
            openInnerFolder.style.backgroundColor = 'transparent';
            openInnerFolder.style.backdropFilter = 'none';
            openInnerFolder.style.webkitBackdropFilter = 'none';
        }
        
        const elementModal = createElementModal(element);
        document.body.appendChild(elementModal);
        elementModal.classList.add('show');
        toggleScroll(true);

        elementModal.addEventListener('click', (e) => {
            const onDismissArea =
                e.target === elementModal ||
                (e.target && e.target.classList && e.target.classList.contains('element-modal-dismiss'));
            if (!onDismissArea) return;

            elementModal.remove();

            // Check if any folder modal is still open before enabling scroll
            const folderStillOpen = document.querySelector('.modal.show');
            if (!folderStillOpen) {
                toggleScroll(false);
            }

            // Restore level 2 effects if we were in the second folder
            if (wasInnerFolderOpen) {
                openInnerFolder.style.backgroundColor = '';
                openInnerFolder.style.backdropFilter = '';
                openInnerFolder.style.webkitBackdropFilter = '';
            }
        });
    };

    // ========== Cube Animation ==========
    function rotateCube() {
        // Get current and next faces
        const currentIndex = Math.abs(Math.floor(rotation / 90) % faces.length);
        const nextIndex = (currentIndex + 1) % faces.length;
        
        // Show next face before rotation
        faces[nextIndex].style.opacity = '1';
        
        // Increment rotation by 90 degrees (upward rotation)
        rotation += 90;
        
        // Apply the rotation
        cube.style.transform = `rotateX(${rotation}deg)`;
        
        // Hide previous face near end of rotation
        setTimeout(() => {
            faces[currentIndex].style.opacity = '0';
        }, 900); // Just before rotation completes
    }

    // ========== Event Listeners ==========
    // Element hover handlers - CSS handles the hover effect via :hover pseudo-class
    // The transition is defined in CSS, so the hover should work automatically
    // We keep this section for any future JavaScript-based hover enhancements if needed

    // Folder click handlers
    folder.addEventListener('click', () => handleFolderClick(modal));
    
    innerFolder.addEventListener('click', (e) => {
        e.stopPropagation();
        handleFolderClick(innerModal);
    });

    // Modal click handlers
    [modal, innerModal].forEach(modalElement => {
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) handleModalClose(modalElement);
        });
    });

    // Element click handlers
    clickableElements.forEach(element => {
        element.addEventListener('click', (e) => handleElementClick(element, e));
    });

    // Escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const elementModal = document.querySelector('.element-modal.show');
            const innerFolderModal = document.querySelector('#innerFolderModal.show');
            
            // Handle element modal escape
            if (elementModal) {
                elementModal.remove();
                
                // Check if any modal is still open before enabling scroll
                const anyModalOpen = document.querySelector('.modal.show');
                if (!anyModalOpen) {
                    toggleScroll(false);  // Re-enable scrolling only if no modals are open
                }
                
                // If inner folder is open, restore its styles
                if (innerFolderModal) {
                    innerFolderModal.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
                    innerFolderModal.style.backdropFilter = 'blur(5px)';
                    innerFolderModal.style.webkitBackdropFilter = 'blur(5px)';
                }
                return;
            }
            
            // Handle folder modal escape
            if (innerFolderModal) {
                handleModalClose(innerFolderModal);
                
                // Check if any modal is still open before enabling scroll
                const anyModalOpen = document.querySelector('.modal.show, .element-modal.show');
                if (!anyModalOpen) {
                    toggleScroll(false);
                }
                return;
            }
            
            // Handle main folder escape
            const folderModal = document.querySelector('#folderModal.show');
            if (folderModal) {
                handleModalClose(folderModal);
                toggleScroll(false);  // Re-enable scrolling
            }
        }
    });

    // Tab visibility handler
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Clear the interval when tab is hidden
            clearInterval(rotationInterval);
        } else {
            // Restart the interval when tab is visible again
            clearInterval(rotationInterval);
            rotationInterval = setInterval(rotateCube, 3500);
        }
    });

    // ========== Initialization ==========
    // The playlist panel is 107.5vh with a 7.5vh peek, so the document is 200vh.
    // Native #anchor scroll only reaches the panel start (~92.5vh). The intended
    // music view is maximum scroll, which lifts the hero as far as the layout allows.
    const MUSIC_PATH = '/music/';
    const MUSIC_HASHES = new Set(['#playlists', '#music', '#music-content']);
    const htmlEl = document.documentElement;
    const prefersReducedMotion = () =>
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getMaxScroll = () =>
        Math.max(0, htmlEl.scrollHeight - window.innerHeight);

    const pathnameIsMusic = () => {
        const path = (location.pathname || '/').replace(/\/+$/, '') || '/';
        return path === '/music';
    };

    const consumeMusicFlag = () => {
        try {
            if (sessionStorage.getItem('tqhMusicView') === '1') {
                sessionStorage.removeItem('tqhMusicView');
                return true;
            }
        } catch (e) { /* private mode */ }
        return false;
    };

    const setMusicUrl = (on) => {
        const next = on ? MUSIC_PATH : '/';
        const currentPath = location.pathname.endsWith('/') || location.pathname === ''
            ? (location.pathname || '/')
            : location.pathname + '/';
        if (currentPath === next && !location.hash && !location.search) return;
        try {
            history.replaceState(null, '', next);
        } catch (e) { /* ignore */ }
    };

    const scrollToMusicView = (smooth) => {
        const reduce = prefersReducedMotion();
        const top = getMaxScroll();
        const previousBehavior = htmlEl.style.scrollBehavior;
        if (!smooth || reduce) {
            htmlEl.style.scrollBehavior = 'auto';
            window.scrollTo(0, top);
            htmlEl.style.scrollBehavior = previousBehavior;
            return;
        }
        window.scrollTo({ top, behavior: 'smooth' });
    };

    const openMusicView = (smooth, updateUrl) => {
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }
        if (updateUrl !== false) setMusicUrl(true);
        scrollToMusicView(smooth);
    };

    const arrivedViaStub = consumeMusicFlag();
    const shouldOpenMusic =
        pathnameIsMusic() || MUSIC_HASHES.has(location.hash) || arrivedViaStub;

    if (shouldOpenMusic) {
        // Keep /#playlists working, but prefer /music/. The music/index.html stub
        // already sent us to /, so leave that URL alone to avoid a refresh flash.
        openMusicView(false, !arrivedViaStub);
        requestAnimationFrame(() => scrollToMusicView(false));
        window.setTimeout(() => scrollToMusicView(false), 50);
        window.setTimeout(() => scrollToMusicView(false), 250);
        window.addEventListener('load', () => scrollToMusicView(false), { once: true });
    }

    window.addEventListener('hashchange', () => {
        if (MUSIC_HASHES.has(location.hash)) openMusicView(true);
    });

    document.querySelectorAll('.scroll-up-arrow').forEach((arrow) => {
        arrow.addEventListener('click', () => {
            setMusicUrl(true);
            scrollToMusicView(true);
        });
    });

    document.querySelectorAll('.scroll-down-arrow').forEach((arrow) => {
        arrow.addEventListener('click', () => {
            setMusicUrl(false);
            const reduce = prefersReducedMotion();
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        });
    });

    // Initial cube state
    faces[0].style.opacity = '1';

    // Start rotation cycle
    setTimeout(() => {
        rotationInterval = setInterval(rotateCube, 3500); // 1.2s animation + 2.3s pause
    }, 100);
}); 