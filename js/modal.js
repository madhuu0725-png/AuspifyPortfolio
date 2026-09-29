/**
 * Portfolio Modal & Audio Interactivity System
 * Author: Madhulatha Konka (MERN Full Stack Developer)
 */

const ModalSystem = {
  activeModal: null,
  soundEnabled: false,
  audioCtx: null,

  init() {
    this.createModalMarkup();
    this.bindGlobalEvents();
  },

  playBeep(freq = 600, duration = 0.04, type = "sine") {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or supported
    }
  },

  createModalMarkup() {
    if (document.getElementById('portfolio-modals-root')) return;

    const root = document.createElement('div');
    root.id = 'portfolio-modals-root';
    root.innerHTML = `
      <!-- Project Details Modal -->
      <div id="project-modal" class="modal-overlay" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 id="modal-project-title" class="modal-title">Project Title</h3>
            <button class="modal-close-btn" data-close-modal aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body">
            <img id="modal-project-image" src="" alt="Project Preview" class="modal-project-img" />
            <div id="modal-project-tags" class="modal-project-tags"></div>
            <p id="modal-project-description" class="about-intro-text"></p>
            
            <h4 class="modal-section-title">✨ Key Engineering & Feature Highlights</h4>
            <ul id="modal-project-features" class="modal-feature-list"></ul>

            <h4 class="modal-section-title">📐 Architecture & Workflow</h4>
            <div id="modal-project-architecture" class="modal-architecture-box"></div>

            <div id="modal-project-review-wrap" style="margin-top: 1.5rem;">
              <h4 class="modal-section-title">💬 Project Review</h4>
              <p id="modal-project-review" class="testimonial-quote" style="border-left: 3px solid var(--primary); padding-left: 1rem;"></p>
            </div>
          </div>
          <div class="modal-footer">
            <a id="modal-github-link" href="https://github.com/madhuu0725-png" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub
            </a>
            <a id="modal-demo-link" href="https://github.com/madhuu0725-png" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Project Repository
            </a>
          </div>
        </div>
      </div>

      <!-- Resume Modal -->
      <div id="resume-modal" class="modal-overlay" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="modal-dialog" style="max-width: 860px;">
          <div class="modal-header">
            <h3 class="modal-title">Curriculum Vitae • Madhulatha Konka</h3>
            <button class="modal-close-btn" data-close-modal aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="resume-modal-content">
              <!-- Top Preview Header -->
              <div class="resume-header-preview">
                <img src="assets/images/profile_avatar.jpg" alt="Madhulatha Konka" class="resume-avatar-mini" />
                <div>
                  <h3 style="font-size: 1.5rem; color: var(--text-heading); font-weight: 800;">MADHULATHA KONKA</h3>
                  <p style="color: var(--primary); font-weight: 700; font-size: 1.05rem;">MERN Full Stack Developer</p>
                  <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
                    📍 Anantapur, Andhra Pradesh | 📞 +91 6309194613 | ✉️ Madhuu0725@gmail.com | 🌐 github.com/madhuu0725-png
                  </p>
                </div>
              </div>

              <!-- Professional Summary -->
              <div class="resume-summary-box">
                <strong>Professional Summary:</strong> Results-driven MERN Full Stack Developer (B.Tech ECE, CGPA 8.1) with proven ability to design, build, and deploy responsive, full-stack web applications using React.js, Node.js, Express.js, and MongoDB. Proficient in REST API design, JSON data handling, and SQL-based data management. Certified in Python Full Stack Development and Responsive Web Design; recognized for writing clean, maintainable code and rapidly mastering new frameworks. Eager to bring strong full-stack fundamentals and a fast learning curve to a growth-focused engineering team.
              </div>

              <!-- Technical Skills Grid -->
              <div>
                <h4 style="font-size: 1.05rem; margin-bottom: 0.75rem; color: var(--primary);">🛠️ Technical Skills</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.85rem;">
                  <div class="timeline-item-card" style="padding: 0.85rem;">
                    <strong style="color: var(--text-heading);">MERN Stack:</strong> JavaScript (ES6+), React.js, Node.js, Express.js, MongoDB
                  </div>
                  <div class="timeline-item-card" style="padding: 0.85rem;">
                    <strong style="color: var(--text-heading);">Frontend:</strong> HTML5, CSS3, Bootstrap, Responsive Web Design, MVC Architecture
                  </div>
                  <div class="timeline-item-card" style="padding: 0.85rem;">
                    <strong style="color: var(--text-heading);">Backend & APIs:</strong> REST API Design & Integration, JSON Handling, Node.js, Express.js
                  </div>
                  <div class="timeline-item-card" style="padding: 0.85rem;">
                    <strong style="color: var(--text-heading);">Database:</strong> MongoDB, SQL, Database Queries & Data Management
                  </div>
                  <div class="timeline-item-card" style="padding: 0.85rem;">
                    <strong style="color: var(--text-heading);">Programming:</strong> Python, JavaScript, Object-Oriented Programming (OOP)
                  </div>
                  <div class="timeline-item-card" style="padding: 0.85rem;">
                    <strong style="color: var(--text-heading);">AI-Assisted Dev:</strong> Claude, ChatGPT, Cursor, Gemini, Antigravity IDE
                  </div>
                </div>
              </div>

              <!-- Projects & Internships Columns -->
              <div class="resume-columns">
                <div class="resume-column">
                  <h4>💼 Technical Projects</h4>
                  <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                      <strong style="color: var(--text-heading);">Kapture AI – Maya | Voice Assistant</strong>
                      <div style="font-size: 0.8rem; color: var(--secondary);">HTML, CSS, JavaScript, Python, CRM Webhooks</div>
                      <p style="font-size: 0.825rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        Built full-stack AI voice assistant for automated payment & loan collection calls, with identity verification and Promise-to-Pay (PTP) logging.
                      </p>
                    </div>

                    <div>
                      <strong style="color: var(--text-heading);">32-Bit FPGA ALU Using Reversible Logic</strong>
                      <div style="font-size: 0.8rem; color: var(--secondary);">FPGA, Digital Logic Design, ModelSim</div>
                      <p style="font-size: 0.825rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        Designed 32-bit ALU with reversible logic gates, improving power efficiency, area, and speed through simulation & hardware testing.
                      </p>
                    </div>

                    <div>
                      <strong style="color: var(--text-heading);">MERN Full Stack E-Commerce Platform</strong>
                      <div style="font-size: 0.8rem; color: var(--secondary);">React.js, Node.js, Express.js, MongoDB, JWT</div>
                      <p style="font-size: 0.825rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        Interactive product catalog, stateful shopping cart, secure authentication, and RESTful API endpoints.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="resume-column">
                  <h4>🎓 Education & Certifications</h4>
                  <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                      <strong style="color: var(--text-heading);">B.Tech, Electronics & Comm. Eng.</strong>
                      <div style="font-size: 0.8rem; color: var(--secondary);">AnanthaLakshmi Inst. of Tech. & Science, Anantapur | CGPA 8.1 (2026)</div>
                    </div>

                    <div>
                      <strong style="color: var(--text-heading);">Diploma, Electronics & Comm. Eng.</strong>
                      <div style="font-size: 0.8rem; color: var(--secondary);">Govt. Polytechnic College, Tadipatri | CGPA 8.13 (2023)</div>
                    </div>

                    <div>
                      <strong style="color: var(--text-heading);">Certifications:</strong>
                      <ul style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.35rem; padding-left: 1rem;">
                        <li>Python Full Stack Development (EduSkills)</li>
                        <li>Static & Responsive Web Design (NxtWave)</li>
                        <li>SQL – Database Queries & Data Management (NxtWave)</li>
                        <li>Programming Foundations with Python (NxtWave)</li>
                      </ul>
                    </div>

                    <div>
                      <strong style="color: var(--text-heading);">Internships:</strong>
                      <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        • Data Analytics & AI Agents Virtual Internship – TCS (July 2026)<br>
                        • Data Analytics Virtual Internship – Deloitte (July 2026)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <a href="assets/Madhulatha_Konka_Resume.pdf" download="Madhulatha_Konka_Resume.pdf" class="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PDF Resume
            </a>
            <button class="btn btn-secondary" onclick="window.print()">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Print CV
            </button>
            <a href="mailto:Madhuu0725@gmail.com?subject=Job%20Opportunity%20-%20MERN%20Full%20Stack%20Developer" class="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Hire Madhulatha
            </a>
          </div>
        </div>
      </div>

      <!-- Inquiries Inbox Modal (Demo Feature) -->
      <div id="inbox-modal" class="modal-overlay" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title">Sent Inquiries Inbox (Demo)</h3>
            <button class="modal-close-btn" data-close-modal aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body">
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
              Messages sent through the contact form are stored in local storage and simulated here for presentation testing.
            </p>
            <div id="inbox-messages-list" style="display: flex; flex-direction: column; gap: 1rem;">
              <p style="color: var(--text-muted); font-size: 0.9rem;">No messages sent yet in this session.</p>
            </div>
          </div>
          <div class="modal-footer">
            <button id="clear-inbox-btn" class="btn btn-outline btn-sm">Clear Inquiries</button>
            <button class="btn btn-secondary btn-sm" data-close-modal>Close</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(root);
  },

  openProjectModal(projectId) {
    if (!window.PORTFOLIO_DATA) return;
    const project = window.PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!project) return;

    this.playBeep(750, 0.05);

    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-image').src = project.image;
    document.getElementById('modal-project-image').alt = project.title;
    document.getElementById('modal-project-description').textContent = project.fullDescription;
    document.getElementById('modal-project-architecture').textContent = project.architecture;

    // Tags
    const tagsContainer = document.getElementById('modal-project-tags');
    tagsContainer.innerHTML = project.technologies.map(t => `<span class="project-tag">${t}</span>`).join('');

    // Features
    const featContainer = document.getElementById('modal-project-features');
    featContainer.innerHTML = project.features.map(f => `
      <li class="modal-feature-item">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${f}</span>
      </li>
    `).join('');

    // Review
    const reviewWrap = document.getElementById('modal-project-review-wrap');
    if (project.clientReview) {
      reviewWrap.style.display = 'block';
      document.getElementById('modal-project-review').textContent = project.clientReview;
    } else {
      reviewWrap.style.display = 'none';
    }

    // Links
    document.getElementById('modal-github-link').href = project.githubUrl;
    document.getElementById('modal-demo-link').href = project.demoUrl;

    this.showModal('project-modal');
  },

  openResumeModal() {
    this.playBeep(650, 0.05);
    this.showModal('resume-modal');
  },

  openInboxModal() {
    this.playBeep(550, 0.05);
    this.renderInboxMessages();
    this.showModal('inbox-modal');
  },

  renderInboxMessages() {
    const list = document.getElementById('inbox-messages-list');
    const stored = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');

    if (!stored || stored.length === 0) {
      list.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md);">📭 No inquiries submitted yet. Try sending one through the contact form!</div>`;
      return;
    }

    list.innerHTML = stored.map((msg, idx) => `
      <div style="padding: 1.25rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="color: var(--text-heading); font-size: 1rem;">${msg.name}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(msg.timestamp).toLocaleString()}</span>
        </div>
        <div style="font-size: 0.85rem; color: var(--primary); margin-bottom: 0.5rem;">
          📧 ${msg.email} • 🏷️ ${msg.subject || 'General Inquiry'} • 💼 ${msg.service || 'Web Development'}
        </div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); white-space: pre-wrap;">${msg.message}</p>
      </div>
    `).join('');
  },

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    this.activeModal = modal;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    if (!this.activeModal) return;
    this.playBeep(450, 0.03);
    this.activeModal.classList.remove('active');
    this.activeModal.setAttribute('aria-hidden', 'true');
    this.activeModal = null;
    document.body.style.overflow = '';
  },

  bindGlobalEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.closeModal();
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-close-modal]') || e.target.closest('[data-close-modal]')) {
        this.closeModal();
      } else if (e.target.classList.contains('modal-overlay')) {
        this.closeModal();
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.id === 'clear-inbox-btn') {
        localStorage.removeItem('portfolio_inquiries');
        this.renderInboxMessages();
        if (window.showToast) window.showToast('Inquiries cleared!', 'info');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ModalSystem.init();
});

window.ModalSystem = ModalSystem;
