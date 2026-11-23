// Gas Stove & Chimney Repair Bhopal - Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 90;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();

  // Testimonials Carousel Controls
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.getElementById('prevStory');
  const nextBtn = document.getElementById('nextStory');
  let currentIndex = 0;

  function updateSlider() {
    testimonials.forEach((card, idx) => {
      if (idx === currentIndex) {
        card.style.display = 'flex';
        card.classList.add('active');
      } else {
        // On desktop, keep 3 visible if screen is wide; on mobile, toggle one by one
        if (window.innerWidth <= 768) {
          card.style.display = 'none';
        } else {
          card.style.display = 'flex';
        }
      }
    });
  }

  if (prevBtn && nextBtn && testimonials.length > 0) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateSlider();
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
  }

  // Booking Form Submission Handler (WhatsApp Redirect + In-page Success)
  const bookingForm = document.getElementById('bookingForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const service = document.getElementById('userService').value;
      const locality = document.getElementById('userLocality').value.trim();

      if (!name || !phone || !service) {
        alert('Please fill in your name, phone number, and service required.');
        return;
      }

      // UI state
      submitBtn.innerHTML = 'Booking Technician...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Format message for WhatsApp
        const waText = `Hello KitchenCare Bhopal!%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service)}%0A*Locality:* ${encodeURIComponent(locality || 'Bhopal')}`;
        
        formMessage.className = 'form-message success';
        formMessage.innerHTML = `✓ Thank you, <strong>${name}</strong>! We have received your booking request. Our technician will call you back within 30 minutes.`;
        
        bookingForm.reset();
        submitBtn.innerHTML = 'Request a callback <span>↗</span>';
        submitBtn.disabled = false;

        // Optionally launch WhatsApp directly in new tab for instant connectivity
        const waUrl = `https://wa.me/919301595548?text=${waText}`;
        window.open(waUrl, '_blank');
      }, 700);
    });
  }
});
