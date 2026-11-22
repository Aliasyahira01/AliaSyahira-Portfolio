const projects = [
  {
    id: 'erp',
    title: 'Toolaku ERP: Finance Module',
    category: 'Web',
    icon: '🧾',
    logo: '',
    description: 'Finance features for an ERP system: general ledger, payables and receivables, banking, tax and e-Invoice.',
    details: 'Built features across the finance module of an ERP system, covering general ledger, accounts payable and receivable, banking, tax and e-Invoice, with a focus on accurate and reliable financial workflows. This is company work, so the source code is private.',
    tech: ['Angular', '.NET / C#', 'SQL Server', 'REST APIs'],
    github: '#',
    demo: '#',
    media: [],
  },
  {
    id: 'quickpay',
    title: 'QuickPay',
    category: 'Web',
    icon: '💰',
    logo: 'images/quickpay.png',
    description: 'Simple payroll system for managing employees, working days, and payroll calculations.',
    details: 'QuickPay is a payroll system designed to simplify employee payroll management. It supports employee records, working day tracking, salary calculation, and payroll generation.',
    tech: ['Angular', '.NET Web API', 'SQL Server'],
    github: '#',
    demo: '#',
    media: [
      { type: 'image', src: 'images/quickpay-screen-1.png' },
      { type: 'image', src: 'images/quickpay-screen-2.png' },
      { type: 'video', src: 'videos/quickpay-demo.mp4' },
    ],
  },
  {
    id: 'spendly',
    title: 'Spendly',
    category: 'Mobile',
    icon: '💸',
    logo: '',
    description: 'A personal finance tracker app with real-time spending updates and a weekly and daily history view.',
    details: 'A personal finance tracker mobile app. Users can sign up, log expenses and review their spending in a history view grouped by week and day, while the dashboard updates in real time.',
    tech: ['React Native', 'Expo', 'Firebase', 'Firestore'],
    github: 'https://github.com/Aliasyahira01/Spendly',
    demo: '#',
    media: [],
  },
  {
    id: 'ukm-outlet',
    title: 'UKM Outlet',
    category: 'Web',
    icon: '🛍️',
    logo: 'images/ukmoutlet.png',
    description: 'An online shopping platform for Universiti Kebangsaan Malaysia students.',
    details: 'UKM Outlet is an online shopping centre for UKM students. Most students sell their products through Google Forms, which is traditional and inefficient. We researched the problem using a descriptive method with Google Form surveys, then built a simpler system where students can both sell and buy each other\'s products, helping student entrepreneurs at UKM.',
    tech: ['Laravel', 'MySQL', 'Bootstrap'],
    github: '#',
    demo: '#',
    media: [],
  },
  {
    id: 'anatomy',
    title: 'Exploring Anatomy',
    category: 'Multimedia',
    icon: '🫀',
    logo: 'images/Anatomy.png',
    description: 'Human anatomy learning system through multimedia for fifth year students.',
    details: 'An educational multimedia system designed to help students understand human anatomy through interactive learning. This was my final year project at UKM.',
    tech: ['Unity', 'C#', 'Blender'],
    github: '#',
    demo: '#',
    media: [],
  },
  {
    id: 'tora',
    title: 'Tora The Explora',
    category: 'Animation',
    icon: '🌊',
    logo: 'images/Tora.png',
    description: 'A short story about a cold sudden flood, taking her on a wonderful adventure.',
    details: 'A creative storytelling project exploring themes of adventure and resilience during a sudden flood.',
    tech: ['Animation'],
    github: '#',
    demo: '#',
    media: [],
  },
  {
    id: 'undead',
    title: 'Trapped with the Undead',
    category: 'Animation',
    icon: '🧟',
    logo: 'images/zombie.png',
    description: 'One house. No escape. They are already inside.',
    details: 'A horror short story concept where a character is trapped inside a house surrounded by zombies.',
    tech: ['Animation', 'Story'],
    github: '#',
    demo: '#',
    media: [],
  },
];

const grid = document.getElementById('project-grid');
const filters = document.getElementById('project-filters');
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');

// Logo image, falling back to the emoji if the file is missing
function iconHTML(p) {
  return p.logo
    ? `<img src="${p.logo}" alt="" onerror="this.replaceWith(document.createTextNode('${p.icon}'))" />`
    : p.icon;
}

function chipsHTML(list) {
  return list.map((t) => `<span class="chip">${t}</span>`).join('');
}

function cardHTML(p) {
  return `
    <article class="project-card glass-card rounded-2xl p-7 reveal">
      <div class="project-icon">${iconHTML(p)}</div>
      <span class="status-tag self-start">${p.category}</span>
      <h3 class="text-xl font-bold mt-3 mb-2">${p.title}</h3>
      <p class="text-sm text-taupe leading-relaxed mb-5">${p.description}</p>
      <div class="flex flex-wrap gap-2 mb-6">${chipsHTML(p.tech)}</div>
      <button class="project-link self-start mt-auto" data-open="${p.id}">View details →</button>
    </article>`;
}

function renderProjects(category = 'All', instant = false) {
  const list = category === 'All' ? projects : projects.filter((p) => p.category === category);
  grid.innerHTML = list.map(cardHTML).join('');

  if (instant) {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 70}ms`;
      setTimeout(() => el.classList.add('visible'), 20);
    });
  }
}

function renderFilters() {
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  filters.innerHTML = categories
    .map((c, i) => `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${c}">${c}</button>`)
    .join('');
}

filters.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  filters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects(btn.dataset.filter, true);
});

// ---------- Details popup ----------
function openModal(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;

  const links = [
    p.github !== '#' ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub ↗</a>` : '',
    p.demo !== '#' ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="project-link">Live demo ↗</a>` : '',
  ].join('');

  const media = p.media
    .map((m) =>
      m.type === 'video'
        ? `<video src="${m.src}" controls preload="none" onerror="this.remove()"></video>`
        : `<img src="${m.src}" alt="${p.title} screenshot" loading="lazy" onerror="this.remove()" />`
    )
    .join('');

  modalBody.innerHTML = `
    <div class="flex items-center gap-4 mb-5">
      <div class="project-icon" style="margin:0">${iconHTML(p)}</div>
      <div>
        <span class="status-tag">${p.category}</span>
        <h3 class="text-2xl font-extrabold mt-1">${p.title}</h3>
      </div>
    </div>
    <p class="text-taupe leading-relaxed mb-5">${p.details}</p>
    <div class="flex flex-wrap gap-2 mb-5">${chipsHTML(p.tech)}</div>
    ${links ? `<div class="flex flex-wrap gap-3 mb-6">${links}</div>` : ''}
    ${media ? `<div class="modal-gallery">${media}</div>` : ''}
  `;

  modal.showModal();
  document.body.style.overflow = 'hidden';
}

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-open]');
  if (btn) openModal(btn.dataset.open);
});

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.closest('[data-close]')) modal.close();
});

modal.addEventListener('close', () => {
  document.body.style.overflow = '';
  modalBody.innerHTML = ''; // also stops any playing video
});

renderFilters();
renderProjects();