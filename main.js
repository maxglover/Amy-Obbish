/* ═══════════════════════════════════════════
   Amy Obbish — main.js
   ═══════════════════════════════════════════ */

// ── YEAR ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

// ── NAV: scrolled state ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── MOBILE MENU ──
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── GALLERY FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ── LIGHTBOX ──
const lightbox        = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxPrev    = document.getElementById('lightboxPrev');
const lightboxNext    = document.getElementById('lightboxNext');

let visibleCards = [];
let currentIndex = 0;

function openLightbox(card) {
  visibleCards = Array.from(cards).filter(c => !c.classList.contains('hidden') && !c.querySelector('.card__placeholder'));
  currentIndex = visibleCards.indexOf(card);
  if (currentIndex === -1) return; // placeholder — don't open
  showLightboxItem(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxItem(index) {
  const card    = visibleCards[index];
  const media   = card.querySelector('img, video');
  const title   = card.querySelector('h3')?.textContent || '';
  const meta    = card.querySelector('p')?.textContent  || '';

  lightboxContent.innerHTML = '';

  if (!media) return;

  if (media.tagName === 'VIDEO') {
    const vid = document.createElement('video');
    vid.src     = media.src;
    vid.controls = true;
    vid.autoplay = true;
    vid.style.maxWidth  = '88vw';
    vid.style.maxHeight = '80vh';
    lightboxContent.appendChild(vid);
  } else {
    const img = document.createElement('img');
    img.src = media.src;
    img.alt = media.alt || title;
    lightboxContent.appendChild(img);
  }

  lightboxCaption.textContent = meta ? `${title} — ${meta}` : title;
  lightboxPrev.style.display = visibleCards.length > 1 ? '' : 'none';
  lightboxNext.style.display = visibleCards.length > 1 ? '' : 'none';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxContent.innerHTML = '';
}

cards.forEach(card => {
  card.addEventListener('click', () => openLightbox(card));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

lightboxPrev.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
  showLightboxItem(currentIndex);
});

lightboxNext.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleCards.length;
  showLightboxItem(currentIndex);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   { currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length; showLightboxItem(currentIndex); }
  if (e.key === 'ArrowRight')  { currentIndex = (currentIndex + 1) % visibleCards.length; showLightboxItem(currentIndex); }
});

// ── VIDEO: hover to play ──
document.querySelectorAll('.card--video video').forEach(vid => {
  const card = vid.closest('.card');
  card.addEventListener('mouseenter', () => vid.play().catch(() => {}));
  card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(
  '.gallery__header, .card, .about__grid, .contact__inner, .footer'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // stagger cards
      if (entry.target.classList.contains('card')) {
        const idx = Array.from(cards).indexOf(entry.target);
        entry.target.style.transitionDelay = (idx % 3) * 0.08 + 's';
      }
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));
