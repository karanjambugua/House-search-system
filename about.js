// Carousel JavaScript
let slideIndex = 0;
showSlides(slideIndex);

// Next/prev controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Dots controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Show and Hide Slides
function showSlides(n) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');

  if (n >= slides.length) {
    slideIndex = 0;
  }

  if (n < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  dots.forEach((dot) => {
    dot.classList.remove('active');
  });

  slides[slideIndex].style.display = 'block';
  slides[slideIndex].classList.add('fade-in');
  dots[slideIndex].classList.add('active');
}

// Auto Slide every 5 seconds
setInterval(() => {
  plusSlides(1);
}, 5000);
