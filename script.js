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
        if (e.target.classList.contains('platform-icon')) {
            e.target.style.webkitTapHighlightColor = 'transparent';
        }
    }, { capture: true });

    // ========== Animation State ==========
    let rotation = 0;
    let rotationInterval;

    // ========== Utility Functions ==========
    const toggleScroll = (disable) => {
        document.body.style.overflow = disable ? 'hidden' : '';
    };

    const getScaleFactor = (element) => {
        const modalWidth = (115 * 2) + 32 + 40;
        return modalWidth / element.offsetWidth;
    };

    // ========== Modal Handlers ==========
    const handleFolderClick = (targetModal) => {
        // Clear any existing styles first
        targetModal.style.backgroundColor = '';
        targetModal.style.backdropFilter = '';
        targetModal.style.webkitBackdropFilter = '';
        
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
        clone.style.transform = `scale(${getScaleFactor(element)})`;
        
        // Handle labels (keep existing label logic)
        const wrapper = element.closest('.element-wrapper, .modal-element-wrapper');
        const fullName = element.getAttribute('data-full-name');
        const label = fullName || wrapper.querySelector('.element-label, .modal-element-label').textContent;
        
        const labelElement = document.createElement('div');
        labelElement.className = 'scaled-element-label';

        // If it's a full name (nature sounds), check if it needs splitting
        if (fullName) {
            // Create temporary span to measure text width
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.fontSize = '1.8rem';  // Smaller font size for nature sounds
            tempSpan.style.whiteSpace = 'nowrap';
            tempSpan.textContent = label;
            document.body.appendChild(tempSpan);

            const textWidth = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);

            labelElement.style.fontSize = '1.8rem';  // Set smaller font size
            
            // If text is wider than 95% viewport
            if (textWidth > window.innerWidth * 0.95) {
                const words = label.split(' ');
                
                // For very small screens, split into three lines
                if (textWidth > window.innerWidth * 1.4) {
                    const third = Math.floor(words.length / 3);
                    const firstLine = words.slice(0, third).join(' ');
                    const secondLine = words.slice(third, third * 2).join(' ');
                    const thirdLine = words.slice(third * 2).join(' ');
                    
                    labelElement.style.top = '-120px';  // More space for three lines
                    labelElement.style.lineHeight = '1.2';
                    labelElement.innerHTML = `${firstLine}<br>${secondLine}<br>${thirdLine}`;
                } else {
                    // Split into two lines
                    const middle = Math.floor(words.length / 2);
                    const firstLine = words.slice(0, middle).join(' ');
                    const secondLine = words.slice(middle).join(' ');
                    
                    labelElement.style.top = '-85px';  // Space for two lines
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
        
        const spotifyIcon = document.createElement('img');
        spotifyIcon.src = 'images/spotify.png';
        spotifyIcon.className = 'platform-icon';
        spotifyIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            const elementId = element.getAttribute('data-element');
            switch(elementId) {
                case '1':  // Peaceful Piano
                    window.open('https://open.spotify.com/playlist/51FY41cuYWtjoeuY90aTkw?si=1101d1a908434425', '_blank');
                    break;
                case '2':  // Elegant Jazz
                    window.open('https://open.spotify.com/playlist/3OHE3VO1SApjBBqBc5ns8v?si=4445c994fce241d3', '_blank');
                    break;
                case '3':  // Lofi Dreams
                    window.open('https://open.spotify.com/playlist/5FmNVvu1pSFCXSVSzQH9pr?si=7e7be45d6b404642', '_blank');
                    break;
                case 'modal1':  // White Noise
                    window.open('https://open.spotify.com/playlist/0ki4X4mN7ggUrYcvvv6pq1?si=df0f61d8d91741c6', '_blank');
                    break;
                case 'modal2':  // Brown Noise
                    window.open('https://open.spotify.com/playlist/3TPmuEYCxb84sRYH4KXPiF?si=b0fc2132a1cd4e26', '_blank');
                    break;
                case 'modal3':  // Pink Noise
                    window.open('https://open.spotify.com/playlist/606f0E4BDtBtWAO9SjO7BM?si=00a8c1e6235d4d17', '_blank');
                    break;
                case 'modal4':  // Forest
                    window.open('https://open.spotify.com/playlist/4J9hDxbs08490A7BDS52lw?si=9fe35ff1a6f54781', '_blank');
                    break;
                case 'modal5':  // Creek
                    window.open('https://open.spotify.com/playlist/4W7cNRDkx2I3Swy6zQtnMl?si=d335ca40e2614d8a', '_blank');
                    break;
                case 'modal6':  // Rain
                    window.open('https://open.spotify.com/playlist/6eAkOpgDdauoC53IBkMKkD?si=613c0cdb4d5842e9', '_blank');
                    break;
                case 'modal7':  // Thunder
                    window.open('https://open.spotify.com/playlist/2ivC5Xlo0rXsUM8j38vufy?si=4be0794be7ee4479', '_blank');
                    break;
            }
        });
        
        const youtubeIcon = document.createElement('img');
        youtubeIcon.src = 'images/youtube.png';
        youtubeIcon.className = 'platform-icon';
        youtubeIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            const elementId = element.getAttribute('data-element');
            switch(elementId) {
                case '1':  // Peaceful Piano
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54fayVupFaxlfRU91v6xQw_a', '_blank');
                    break;
                case '2':  // Elegant Jazz
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54dENbyCekPMHI9Ptt95zHFD&feature=shared', '_blank');
                    break;
                case '3':  // Lofi Dreams
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54f524vMstaf4GTPpoTQF1SP&feature=shared', '_blank');
                    break;
                case 'modal1':  // White Noise
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54fYV6kSiwRr74EvtwlBSA5c&feature=shared', '_blank');
                    break;
                case 'modal2':  // Brown Noise
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54d82SmgIUMQcVj6-2TtSaQS&feature=shared', '_blank');
                    break;
                case 'modal3':  // Pink Noise
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54fIynp_4WdkFwE1fcFXszTb&feature=shared', '_blank');
                    break;
                case 'modal4':  // Forest
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54fhassniXp2M_P_KxerUBqw&feature=shared', '_blank');
                    break;
                case 'modal5':  // Creek
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54cwstgvj1FQAwZWzo9uKeAr&feature=shared', '_blank');
                    break;
                case 'modal6':  // Rain
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54cLk4ygJ5ES4VH-_RV7Q-Ys&feature=shared', '_blank');
                    break;
                case 'modal7':  // Thunder
                    window.open('https://music.youtube.com/playlist?list=PLbeAGNc9R54cZqRKtnHLfkq92h-2TSBYG&feature=shared', '_blank');
                    break;
            }
        });
        
        const appleIcon = document.createElement('img');
        appleIcon.src = 'images/apple.png';
        appleIcon.className = 'platform-icon';
        appleIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            const elementId = element.getAttribute('data-element');
            switch(elementId) {
                case '1':  // Peaceful Piano
                    window.open('https://music.apple.com/no/playlist/peaceful-piano/pl.u-oZylD6gsGlJWPP3', '_blank');
                    break;
                case '2':  // Gentle Jazz
                    window.open('https://music.apple.com/no/playlist/gentle-jazz/pl.u-xlyNE32CJDL4XXA', '_blank');
                    break;
                case '3':  // Lofi Dreams
                    window.open('https://music.apple.com/no/playlist/lofi-dreams/pl.u-kv9l2aJTJVZrXXv', '_blank');
                    break;
                case 'modal1':  // White Noise
                    window.open('https://music.apple.com/no/playlist/white-noise/pl.u-KVXBkPPFLRWrzzv', '_blank');
                    break;
                case 'modal2':  // Brown Noise
                    window.open('https://music.apple.com/no/playlist/brown-noise/pl.u-8aAVZy9IvL2zNNX', '_blank');
                    break;
                case 'modal3':  // Pink Noise
                    window.open('https://music.apple.com/no/playlist/pink-noise/pl.u-oZylD0lTGlJWPP3', '_blank');
                    break;
                case 'modal4':  // Forest
                    window.open('https://music.apple.com/no/playlist/relaxing-forest-ambience/pl.u-oZylD1esGlJWPP3', '_blank');
                    break;
                case 'modal5':  // Creek
                    window.open('https://music.apple.com/no/playlist/soothing-creek-sounds/pl.u-WabZv4PSel2aWWE', '_blank');
                    break;
                case 'modal6':  // Rain
                    window.open('https://music.apple.com/no/playlist/gentle-rainstorm-sounds/pl.u-8aAVZ5jHvL2zNNX', '_blank');
                    break;
                case 'modal7':  // Thunder
                    window.open('https://music.apple.com/no/playlist/relaxing-thunderstorm-sounds/pl.u-NpXmze4t4gKovvl', '_blank');
                    break;
            }
        });
        
        iconsContainer.appendChild(spotifyIcon);
        iconsContainer.appendChild(youtubeIcon);
        iconsContainer.appendChild(appleIcon);
        
        // Append in correct order
        content.appendChild(labelElement);
        content.appendChild(clone);
        content.appendChild(iconsContainer);
        elementModal.appendChild(content);
        
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
            if (e.target === elementModal) {
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
    // Element hover handlers for large screens
    if (window.matchMedia("(min-width: 769px)").matches) {
        clickableElements.forEach(element => {
            // Set initial state with smooth transition
            element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.05)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

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
    // Initial cube state
    faces[0].style.opacity = '1';

    // Start rotation cycle
    setTimeout(() => {
        rotationInterval = setInterval(rotateCube, 3500); // 1.2s animation + 2.3s pause
    }, 100);
}); 