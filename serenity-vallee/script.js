/* =============================================
   SERENITY VALLÉE — JavaScript Principal
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---- HEADER SCROLL ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ---- HERO BG ANIMATION ----
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  // ---- MENU HAMBURGER ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      if (isOpen) {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Fermer menu en cliquant sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- SCROLL REVEAL ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---- CAROUSEL "CE QUI NOUS DIFFÉRENCIE" ----
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');

  if (track) {
    const cards = track.querySelectorAll('.diff-card');
    let currentIndex = 0;
    let autoplayInterval;

    function getOffset() {
      const trackWidth = track.parentElement.offsetWidth;
      const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 364;
      // Centre la carte active
      return (trackWidth / 2) - (cardWidth / 2);
    }

    function goTo(index) {
      currentIndex = ((index % cards.length) + cards.length) % cards.length;
      const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 364;
      const offset = getOffset();
      track.style.transform = `translateX(${offset - currentIndex * cardWidth}px)`;

      cards.forEach((c, i) => {
        c.classList.toggle('active', i === currentIndex);
      });

      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    function startAutoplay() {
      autoplayInterval = setInterval(() => goTo(currentIndex + 1), 3200);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    // Init
    goTo(0);
    startAutoplay();

    // Dots click
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', startAutoplay);

    // Recalcul au resize
    window.addEventListener('resize', () => goTo(currentIndex));
  }

  // ---- RGPD BANNER ----
  if (!localStorage.getItem('sv_rgpd_accepted')) {
    const banner = document.querySelector('.rgpd-banner');
    if (banner) {
      setTimeout(() => banner.classList.add('show'), 1500);

      const acceptBtn = banner.querySelector('.rgpd-accept');
      const refuseBtn = banner.querySelector('.rgpd-refuse');

      function hideBanner() {
        banner.classList.remove('show');
        setTimeout(() => banner.style.display = 'none', 400);
      }

      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
          localStorage.setItem('sv_rgpd_accepted', 'true');
          hideBanner();
        });
      }
      if (refuseBtn) {
        refuseBtn.addEventListener('click', () => {
          localStorage.setItem('sv_rgpd_accepted', 'refused');
          hideBanner();
        });
      }
    }
  } else {
    const banner = document.querySelector('.rgpd-banner');
    if (banner) banner.style.display = 'none';
  }

  // ---- FORMULAIRE CONTACT ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-submit');
      const originalText = btn.textContent;

      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Message envoyé !';
        btn.style.background = '#4CAF50';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1200);
    });
  }

});
