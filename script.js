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
        
        content.appendChild(labelElement);
        content.appendChild(clone);
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
                toggleScroll(false);
                
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
            const folderModal = document.querySelector('#folderModal.show');

            // Close only the topmost modal
            if (elementModal) {
                elementModal.remove();
                // Check if any folder modal is still open
                const folderStillOpen = document.querySelector('.modal.show');
                if (!folderStillOpen) {
                    toggleScroll(false);
                }
            } else if (innerFolderModal) {
                handleModalClose(innerFolderModal);
            } else if (folderModal) {
                handleModalClose(folderModal);
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