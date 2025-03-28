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
  