// DOM Elements
const preloader = document.getElementById('preloader');
const firstPlaylistCard = document.querySelector('.playlist-card:not(.coming-soon)');
const modal = document.getElementById('serviceModal');
const wrapper = document.createElement('div');

// State
let isDragging = false;
let startY = 0;
let currentTranslate = 0;
const maxPull = 100;

// Initialize
window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 300);
    initializeDraggableContent();
});

// Modal handlers
firstPlaylistCard.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.add('active');
});

modal.addEventListener('click', e => {
    if (!e.target.closest('.service-choice')) {
        modal.classList.remove('active');
    }
});

modal.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => e.stopPropagation());
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});

// Draggable functionality
function initializeDraggableContent() {
    wrapper.className = 'draggable-content';
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    
    header.parentNode.insertBefore(wrapper, header);
    wrapper.appendChild(header);
    wrapper.appendChild(main);

    // Touch events
    wrapper.addEventListener('touchstart', startDrag, { passive: false });
    wrapper.addEventListener('touchmove', drag, { passive: false });
    wrapper.addEventListener('touchend', endDrag);

    // Mouse events
    wrapper.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mouseleave', endDrag);
}

function startDrag(e) {
    isDragging = true;
    startY = e.type === 'mousedown' ? e.pageY : e.touches[0].pageY;
    wrapper.classList.add('dragging');
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const currentY = e.type === 'mousemove' ? e.pageY : e.touches[0].pageY;
    const diff = Math.sign(currentY - startY) * 
                Math.min(Math.abs(currentY - startY) * 0.3, maxPull);
    
    wrapper.style.transform = `translateY(${diff}px)`;
}

function endDrag() {
    if (!isDragging) return;
    
    isDragging = false;
    wrapper.classList.remove('dragging');
    wrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    wrapper.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        if (!isDragging) wrapper.style.transition = 'none';
    }, 500);
}

// Prevent default touch behavior
document.addEventListener('touchmove', e => {
    if (isDragging) e.preventDefault();
}, { passive: false }); 