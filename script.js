document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('h3, h4, h2'); // Select all h1 elements
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 1000); // Delay each animation by 1000ms (1 second)
    });
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animation class when element becomes visible
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the item is visible
    });

    // Observe each portfolio item
    portfolioItems.forEach(item => {
        observer.observe(item);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle animation
    function handleAnimation() {
        const elements = document.querySelectorAll('.slide-in, .slide-in-right, .slide-in-bottom');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Run on load
    handleAnimation();

    // Run on scroll
    window.addEventListener('scroll', handleAnimation);
    
    // Run on resize
    window.addEventListener('resize', handleAnimation);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Get all images and observe them
const images = document.querySelectorAll('.shap');
images.forEach(img => observer.observe(img));

 // Updated Navigation Button Functionality
 const toTopBtn = document.getElementById('toTopBtn');
 const backBtn = document.getElementById('backBtn');

 // Improved scroll listener for "To Top" button
 window.addEventListener('scroll', () => {
     requestAnimationFrame(() => {
         if (window.pageYOffset > 100) {
             toTopBtn.classList.add('visible');
         } else {
             toTopBtn.classList.remove('visible');
         }
     });
 });

 // Smooth scroll to top
 toTopBtn.addEventListener('click', () => {
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });

 // Go back to previous page
 backBtn.addEventListener('click', () => {
     window.history.back();
 });

// Carousel functionality
const carouselContainer = document.querySelector('.carousel-container');
const carouselImage = document.querySelector('.carousel-image');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const closeBtn = document.querySelector('.close-btn');
let currentIndex = 0;

// Open carousel when image is clicked
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        carouselContainer.classList.add('active');
    });
});

// Navigation functions
function updateCarousel() {
    carouselImage.src = images[currentIndex].src;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}

// Event listeners
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
closeBtn.addEventListener('click', () => {
    carouselContainer.classList.remove('active');
});





 
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!carouselContainer.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') carouselContainer.classList.remove('active');
});




