// Handle Expand/Collapse Sections
function toggleSection(sectionId) {
    var sectionContent = document.getElementById(sectionId);
    var allSections = document.querySelectorAll('.section-content');
  
    // Hide other sections before showing the selected one
    allSections.forEach(function(section) {
      if (section !== sectionContent) {
        section.style.display = 'none';
      }
    });
  
    // Toggle visibility
    if (sectionContent.style.display === 'none' || sectionContent.style.display === '') {
      sectionContent.style.display = 'block';
    } else {
      sectionContent.style.display = 'none';
    }
  }
  
  // FAQ Toggle
  function toggleFAQ(faq) {
    var faqAnswer = faq.nextElementSibling;
    faqAnswer.style.display =
      faqAnswer.style.display === 'block' ? 'none' : 'block';
  
    var arrow = faq.querySelector('.arrow');
    arrow.classList.toggle('rotate');
  }
  // Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Highlight Active Section on Scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
        document.querySelectorAll('.navbar-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').slice(1) === section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  
  // Scroll Back to Top Button
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '⬆️';
  scrollToTopBtn.id = 'scrollToTopBtn';
  scrollToTopBtn.style.display = 'none';
  scrollToTopBtn.style.position = 'fixed';
  scrollToTopBtn.style.bottom = '20px';
  scrollToTopBtn.style.right = '20px';
  scrollToTopBtn.style.padding = '10px';
  scrollToTopBtn.style.backgroundColor = '#f4d35e';
  scrollToTopBtn.style.color = '#0d3b66';
  scrollToTopBtn.style.border = 'none';
  scrollToTopBtn.style.borderRadius = '50%';
  scrollToTopBtn.style.cursor = 'pointer';
  document.body.appendChild(scrollToTopBtn);
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });