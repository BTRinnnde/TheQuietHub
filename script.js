window.addEventListener('load', function() {
    document.getElementById('preloader').style.opacity = '0';
    setTimeout(function() {
        document.getElementById('preloader').style.display = 'none';
    }, 300);
});

const firstPlaylistCard = document.querySelector('.playlist-card:not(.coming-soon)');
const modal = document.getElementById('serviceModal');

firstPlaylistCard.addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.add('active');
});

modal.addEventListener('click', function(e) {
    if (!e.target.closest('.service-choice')) {
        this.classList.remove('active');
    }
});

modal.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
        e.stopPropagation();
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});

// Add elastic drag functionality
let isDragging = false;
let startY = 0;
let currentTranslate = 0;
const maxPull = 100;

// Create a wrapper for all draggable content
const header = document.querySelector('header');
const main = document.querySelector('main');
const wrapper = document.createElement('div');
wrapper.className = 'draggable-content';

// Wrap header and main in the draggable container
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

function startDrag(e) {
    isDragging = true;
    startY = e.type === 'mousedown' ? e.pageY : 
             e.type === 'touchstart' ? e.touches[0].pageY : 
             e.pageY;
    wrapper.classList.add('dragging');
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const currentY = e.type === 'mousemove' ? e.pageY : 
                    e.type === 'touchmove' ? e.touches[0].pageY : 
                    e.pageY;
    let diff = currentY - startY;
    
    // Apply resistance
    diff = Math.sign(diff) * Math.min(Math.abs(diff) * 0.3, maxPull);
    
    wrapper.style.transform = `translateY(${diff}px)`;
}

function endDrag() {
    if (!isDragging) return;
    
    isDragging = false;
    wrapper.classList.remove('dragging');
    wrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    wrapper.style.transform = 'translateY(0)';
    
    // Reset transition after animation
    setTimeout(() => {
        if (!isDragging) {
            wrapper.style.transition = 'none';
        }
    }, 500);
}

// Prevent default touch behavior to avoid page scrolling
document.addEventListener('touchmove', function(e) {
    if (isDragging) {
        e.preventDefault();
    }
}, { passive: false }); 