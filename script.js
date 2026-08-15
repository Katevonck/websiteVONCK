// ── Nav scroll effect ────────────────────────────────────────
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile burger / drawer ───────────────────────────────────
const burger = document.getElementById('burger');
const navDrawer = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const navClose = document.getElementById('navClose');

function openDrawer() {
  navDrawer.classList.add('open');
  navOverlay.classList.add('active');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  navDrawer.classList.remove('open');
  navOverlay.classList.remove('active');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

burger.addEventListener('click', openDrawer);
navClose && navClose.addEventListener('click', closeDrawer);
navOverlay.addEventListener('click', closeDrawer);

navDrawer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// ── Scroll reveal ────────────────────────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── Set min date for date picker ─────────────────────────────
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  dateInput.min = today.toISOString().split('T')[0];
}

// ── Booking form ─────────────────────────────────────────────
const form = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');
const successName = document.getElementById('successName');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    const required = form.querySelectorAll('[required]');

    required.forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    if (!valid) {
      const first = form.querySelector('.error');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      first?.focus();
      return;
    }

    const prenom = document.getElementById('prenom').value.trim();

    // Simulate sending (replace with real fetch/email service)
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    setTimeout(() => {
      form.hidden = true;
      successName.textContent = prenom;
      formSuccess.classList.add('visible');
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900);
  });

  // ── Remove error on input ──────────────────────────────────
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}

// ── Carrousel d'avis ─────────────────────────────────────────
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsDotsWrap = document.getElementById('reviewsDots');

if (reviewsTrack && reviewsDotsWrap) {
  const slides = reviewsTrack.querySelectorAll('.review-slide');
  let current = 0;
  let autoTimer;

  // Création des points de navigation
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'reviews-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Avis ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    reviewsDotsWrap.appendChild(dot);
  });
  const dots = reviewsDotsWrap.querySelectorAll('.reviews-dot');

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    reviewsTrack.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }

  function startAuto() { autoTimer = setInterval(next, 6000); }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  startAuto();

  // Pause au survol
  const carousel = document.getElementById('reviewsCarousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.addEventListener('mouseleave', startAuto);
}
