// Initial animation for text elements
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('h3, h4, h2'); 
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 1000); 
    });
});

// Portfolio items animation
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    portfolioItems.forEach(item => {
        observer.observe(item);
    });
});

// Slide-in animation handler
document.addEventListener('DOMContentLoaded', function() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleAnimation() {
        const elements = document.querySelectorAll('.slide-in, .slide-in-right, .slide-in-bottom');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    handleAnimation();
    window.addEventListener('scroll', handleAnimation);
    window.addEventListener('resize', handleAnimation);
});

// Image fade-in observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

const images = document.querySelectorAll('.shap');
images.forEach(img => observer.observe(img));

// Navigation buttons handling
const toTopBtn = document.getElementById('toTopBtn');
const backBtn = document.getElementById('backBtn');

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        if (window.pageYOffset > 100) {
            toTopBtn.classList.add('visible');
        } else {
            toTopBtn.classList.remove('visible');
        }
    });
});

toTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backBtn.addEventListener('click', () => {
    window.history.back();
});

// Enhanced carousel functionality with high-resolution support
const carouselContainer = document.querySelector('.carousel-container');
const carouselImage = document.querySelector('.carousel-image');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const closeBtn = document.querySelector('.close-btn');
let currentIndex = 0;

function openCarousel() {
    const header = document.querySelector('.sticky-top');
    header.style.opacity = '0';
    header.style.pointerEvents = 'none';
    header.style.position = 'absolute';
    header.style.zIndex = '-1';
}

function closeCarousel() {
    const header = document.querySelector('.sticky-top');
    header.style.opacity = '1';
    header.style.pointerEvents = 'auto';
    header.style.position = 'sticky';
    header.style.zIndex = '1020';
}

// Updated carousel image handling with high-resolution support
function updateCarousel() {
    const currentImage = images[currentIndex];
    // First show the low-res version immediately
    carouselImage.src = currentImage.src;
    
    // Then load the high-res version if available
    const highResSrc = currentImage.dataset.fullRes;
    if (highResSrc) {
        const highResImage = new Image();
        highResImage.onload = function() {
            carouselImage.src = highResSrc;
        };
        highResImage.src = highResSrc;
    }
}

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        carouselContainer.classList.add('active');
        openCarousel();
    });
});

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
closeBtn.addEventListener('click', () => {
    carouselContainer.classList.remove('active');
    closeCarousel();
});

document.addEventListener('keydown', (e) => {
    if (!carouselContainer.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') {
        carouselContainer.classList.remove('active');
        closeCarousel();
    }
});