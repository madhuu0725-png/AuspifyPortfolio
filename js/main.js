/**
 * Main Application Logic & Interactivity
 * Author: Madhulatha Konka (MERN Full Stack Developer)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Themes & Accents
  initThemeSystem();

  // 2. Initialize Dynamic Typing Effect
  initTypingEffect();

  // 3. Render Dynamic Content (Skills, Projects, Testimonials)
  renderSkills('all');
  renderProjects('all');
  renderTestimonials();

  // 4. Initialize Navigation & Scroll Spy
  initNavigation();

  // 5. Initialize Interactive Filters & Search
  initFilters();

  // 6. Initialize About Section Tabs
  initAboutTabs();

  // 7. Initialize Contact Form & Validation
  initContactForm();

  // 8. Initialize Floating Dock & Utilities
  initFloatingDock();
});

/* ==========================================================================
   THEME & ACCENT MANAGEMENT
   ========================================================================== */
function initThemeSystem() {
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  const savedAccent = localStorage.getItem('portfolio_accent') || 'indigo';

  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-accent', savedAccent);

  updateThemeIcons(savedTheme);
  updateAccentDots(savedAccent);

  document.querySelectorAll('[data-toggle-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      updateThemeIcons(newTheme);
      showToast(`Switched to ${newTheme} mode!`, 'info');
      if (window.ModalSystem) window.ModalSystem.playBeep(520, 0.04);
    });
  });

  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      const accent = e.currentTarget.getAttribute('data-color');
      document.documentElement.setAttribute('data-accent', accent);
      localStorage.setItem('portfolio_accent', accent);
      updateAccentDots(accent);
      showToast(`Accent theme: ${accent.toUpperCase()}`, 'info');
      if (window.ModalSystem) window.ModalSystem.playBeep(680, 0.04);
    });
  });
}

function updateThemeIcons(theme) {
  const sunIcons = document.querySelectorAll('.theme-icon-sun');
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  
  if (theme === 'light') {
    sunIcons.forEach(i => i.style.display = 'none');
    moonIcons.forEach(i => i.style.display = 'inline-block');
  } else {
    sunIcons.forEach(i => i.style.display = 'inline-block');
    moonIcons.forEach(i => i.style.display = 'none');
  }
}

function updateAccentDots(accent) {
  document.querySelectorAll('.color-dot').forEach(dot => {
    if (dot.getAttribute('data-color') === accent) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

/* ==========================================================================
   DYNAMIC TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = [
    "MERN Full Stack Developer",
    "React.js & Node.js Specialist",
    "Python Full Stack Certified",
    "AI-Assisted Web Builder",
    "REST API & Database Engineer"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   RENDER SKILLS
   ========================================================================== */
function renderSkills(categoryFilter = 'all') {
  const container = document.getElementById('skills-grid');
  if (!container || !window.PORTFOLIO_DATA) return;

  const filteredSkills = categoryFilter === 'all'
    ? window.PORTFOLIO_DATA.skills
    : window.PORTFOLIO_DATA.skills.filter(s => s.category === categoryFilter);

  container.innerHTML = filteredSkills.map(skill => `
    <div class="skill-card">
      <div class="skill-header">
        <div class="skill-info">
          <div class="skill-icon-wrap">${skill.icon}</div>
          <div>
            <h4 class="skill-name">${skill.name}</h4>
            <span class="skill-category-tag">${skill.category.toUpperCase()}</span>
          </div>
        </div>
        <span class="skill-level-badge">${skill.percentage}%</span>
      </div>
      <div class="skill-bar-wrapper">
        <div class="skill-bar-fill" style="width: ${skill.percentage}%;"></div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   RENDER PROJECTS
   ========================================================================== */
function renderProjects(categoryFilter = 'all', searchQuery = '') {
  const grid = document.getElementById('projects-grid');
  if (!grid || !window.PORTFOLIO_DATA) return;

  let projects = window.PORTFOLIO_DATA.projects;

  if (categoryFilter !== 'all') {
    projects = projects.filter(p => p.category === categoryFilter);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    projects = projects.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q))
    );
  }

  if (projects.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔍 No matching projects found</p>
        <p style="font-size: 0.95rem;">Try adjusting your search criteria or switching categories.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = projects.map(proj => `
    <div class="project-card glass-card" data-category="${proj.category}">
      <div class="project-thumb-wrap">
        <img src="${proj.image}" alt="${proj.title}" class="project-thumb" loading="lazy" />
        ${proj.featured ? '<span class="project-badge-featured">⭐ Featured</span>' : ''}
      </div>
      <div class="project-body">
        <span class="project-category">${proj.categoryName}</span>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.summary}</p>
        
        <div class="project-tags">
          ${proj.technologies.slice(0, 4).map(t => `<span class="project-tag">${t}</span>`).join('')}
          ${proj.technologies.length > 4 ? `<span class="project-tag">+${proj.technologies.length - 4}</span>` : ''}
        </div>

        <div class="project-footer-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ModalSystem.openProjectModal('${proj.id}')">
            <span>Case Study</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
          
          <div class="project-action-links">
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" title="View GitHub" aria-label="GitHub Repository">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" title="Project Details" aria-label="Project Link">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   RENDER TESTIMONIALS / ENDORSEMENTS
   ========================================================================== */
function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container || !window.PORTFOLIO_DATA) return;

  container.innerHTML = window.PORTFOLIO_DATA.testimonials.map(item => `
    <div class="testimonial-card glass-card">
      <p class="testimonial-quote">“${item.quote}”</p>
      <div class="testimonial-author">
        <div class="author-avatar">${item.initials}</div>
        <div>
          <h4 class="author-name">${item.name}</h4>
          <span class="author-role">${item.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   FILTERS & SEARCH
   ========================================================================== */
function initFilters() {
  let currentProjectCategory = 'all';
  let currentSearchQuery = '';

  const projFilterBtns = document.querySelectorAll('[data-project-filter]');
  projFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      projFilterBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentProjectCategory = e.currentTarget.getAttribute('data-project-filter');
      renderProjects(currentProjectCategory, currentSearchQuery);
      if (window.ModalSystem) window.ModalSystem.playBeep(600, 0.03);
    });
  });

  const searchInput = document.getElementById('project-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderProjects(currentProjectCategory, currentSearchQuery);
    });
  }

  const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');
  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const category = e.currentTarget.getAttribute('data-skill-filter');
      renderSkills(category);
      if (window.ModalSystem) window.ModalSystem.playBeep(600, 0.03);
    });
  });
}

/* ==========================================================================
   ABOUT TABS (Experience & Internships vs Education vs Certifications)
   ========================================================================== */
function initAboutTabs() {
  const tabBtns = document.querySelectorAll('[data-about-tab]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const targetId = e.currentTarget.getAttribute('data-about-tab');
      document.querySelectorAll('.about-tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });

      const activePanel = document.getElementById(targetId);
      if (activePanel) activePanel.classList.add('active');

      if (window.ModalSystem) window.ModalSystem.playBeep(580, 0.03);
    });
  });
}

/* ==========================================================================
   NAVIGATION, MOBILE DRAWER & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    const backToTop = document.getElementById('back-to-top-btn');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.ModalSystem) window.ModalSystem.playBeep(500, 0.04);
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   CONTACT FORM & CLIENT-SIDE VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const serviceInput = document.getElementById('contact-service');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');

    let isValid = true;

    if (!nameInput.value.trim()) {
      showFieldError(nameInput, "Please enter your name");
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, "Please enter a valid email address");
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showFieldError(messageInput, "Please write at least 10 characters");
      isValid = false;
    } else {
      clearFieldError(messageInput);
    }

    if (!isValid) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spin-animation" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Sending Message...
    `;

    setTimeout(() => {
      const inquiry = {
        id: Date.now(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim() || 'General Inquiry',
        service: serviceInput ? serviceInput.value : 'General',
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
      existing.unshift(inquiry);
      localStorage.setItem('portfolio_inquiries', JSON.stringify(existing));

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      showToast("🎉 Message sent successfully! Madhulatha will get back to you shortly.", "success");
      if (window.ModalSystem) window.ModalSystem.playBeep(880, 0.1);
    }, 850);
  });
}

function showFieldError(input, message) {
  input.style.borderColor = 'var(--accent-rose)';
  let errorMsg = input.parentElement.querySelector('.field-error-msg');
  if (!errorMsg) {
    errorMsg = document.createElement('span');
    errorMsg.className = 'field-error-msg';
    errorMsg.style.cssText = 'color: var(--accent-rose); font-size: 0.75rem; margin-top: 0.3rem; display: block;';
    input.parentElement.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
}

function clearFieldError(input) {
  input.style.borderColor = '';
  const errorMsg = input.parentElement.querySelector('.field-error-msg');
  if (errorMsg) errorMsg.remove();
}

/* ==========================================================================
   FLOATING SETTINGS DOCK & UTILITIES
   ========================================================================== */
function initFloatingDock() {
  const dockTrigger = document.getElementById('dock-settings-trigger');
  const dockPanel = document.getElementById('dock-settings-panel');
  const soundToggle = document.getElementById('sound-toggle-btn');
  const soundStatus = document.getElementById('sound-status-text');

  dockTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    dockPanel?.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!dockPanel?.contains(e.target) && e.target !== dockTrigger) {
      dockPanel?.classList.remove('active');
    }
  });

  soundToggle?.addEventListener('click', () => {
    if (window.ModalSystem) {
      window.ModalSystem.soundEnabled = !window.ModalSystem.soundEnabled;
      if (soundStatus) {
        soundStatus.textContent = window.ModalSystem.soundEnabled ? 'ON' : 'OFF';
      }
      showToast(`Audio feedback: ${window.ModalSystem.soundEnabled ? 'Enabled' : 'Muted'}`, 'info');
      if (window.ModalSystem.soundEnabled) {
        window.ModalSystem.playBeep(700, 0.05);
      }
    }
  });

  const backToTop = document.getElementById('back-to-top-btn');
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.ModalSystem) window.ModalSystem.playBeep(800, 0.04);
  });
}

function showToast(message, type = 'info') {
  let container = document.getElementById('portfolio-toasts');
  if (!container) {
    container = document.createElement('div');
    container.id = 'portfolio-toasts';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function copyEmailToClipboard(email = 'Madhuu0725@gmail.com') {
  navigator.clipboard.writeText(email).then(() => {
    showToast('📋 Email copied: Madhuu0725@gmail.com', 'success');
    if (window.ModalSystem) window.ModalSystem.playBeep(720, 0.04);
  }).catch(() => {
    showToast('Email: ' + email, 'info');
  });
}

window.showToast = showToast;
window.copyEmailToClipboard = copyEmailToClipboard;
