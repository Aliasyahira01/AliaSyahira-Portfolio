// Typing effect in the hero
new Typed('#typed', {
  strings: ['Full-Stack Developer', '.NET / C# Developer', 'Angular Developer'],
  typeSpeed: 60,
  backSpeed: 35,
  backDelay: 1500,
  loop: true,
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function closeMenu() {
  mobileMenu.classList.add('hidden');
  mobileMenu.classList.remove('flex');
  menuBtn.textContent = '☰';
}

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  if (isOpen) {
    closeMenu();
  } else {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    menuBtn.textContent = '✕';
  }
});

mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

// Highlight the nav link of the section currently in view
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
        );
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

sections.forEach((section) => observer.observe(section));

// ---------- Code rain background ----------
(function () {
  const canvas = document.getElementById('code-rain');
  if (!canvas) return;

  // Respect users who prefer no motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  const chars = '01{}[]()<>/\\;:=+-*&|!?#$%'.split('');
  const colors = ['#ff9d4d', '#b8743a', '#ffd2a1'];
  const fontSize = 16;
  const frameDelay = 60; // ms per tick, higher = slower

  let width, height, columns, drops;
  let lastTime = 0;
  let visible = true;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.floor(width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -40);
  }

  function draw(time) {
    requestAnimationFrame(draw);
    if (!visible || time - lastTime < frameDelay) return;
    lastTime = time;

    // Fade the previous frame to leave a trail (keeps the canvas transparent)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    ctx.font = `${fontSize}px "Courier New", monospace`;

    for (let i = 0; i < columns; i++) {
      const y = drops[i] * fontSize;
      if (y > 0) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y);
      }
      // Some columns pause for a tick so the speeds vary
      if (Math.random() > 0.35) drops[i]++;
      if (y > height && Math.random() > 0.975) drops[i] = Math.random() * -20;
    }
  }

  // Pause the animation when the hero is off screen (saves battery)
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }).observe(canvas);

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();

// ---------- Scroll reveal ----------
// const revealObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('visible');
//         revealObserver.unobserve(entry.target);
//       }
//     });
//   },
//   { threshold: 0.15 }
// );

// document.querySelectorAll('.reveal').forEach((el, i) => {
//   el.style.transitionDelay = `${(i % 3) * 120}ms`;
//   revealObserver.observe(el);
// });

// ---------- Hero spotlight (desktop only) ----------
(function () {
  const hero = document.getElementById('home');
  const spot = hero && hero.querySelector('.hero-spotlight');
  if (!spot) return;
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
    spot.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
})();