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

// ── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));

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

// ── Remove error on input ────────────────────────────────────
form.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('error'));
});
