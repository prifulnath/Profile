/* ════════════════════════════════
   PRIFULNATH PORTFOLIO — JAVASCRIPT
════════════════════════════════ */

'use strict';

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Typewriter ──
const ROLES = [
  'Senior Team Lead – L1',
  'Agentic AI Architect',
  'AWS Cloud Engineer',
  'Keycloak IAM Expert',
  'Full-Stack Developer',
  'CrewAI Specialist',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const twEl = document.getElementById('typewriterText');

function typewriter() {
  const current = ROLES[roleIdx];
  if (!deleting) {
    twEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typewriter, 2200);
      return;
    }
    setTimeout(typewriter, 70);
  } else {
    twEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % ROLES.length;
      setTimeout(typewriter, 400);
      return;
    }
    setTimeout(typewriter, 38);
  }
}
typewriter();

// ── Animated counters ──
function animateCounter(el) {
  const target = +el.dataset.target;
  let start = 0;
  const step = Math.ceil(target / 50);
  const interval = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start;
    if (start >= target) clearInterval(interval);
  }, 35);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// ── Scroll fade-in ──
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.info-card, .skill-category, .timeline-card, .project-card, .community-card, .cert-card, .timeline-item').forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// ── Particle canvas ──
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let particles = [], W, H, raf;

  function resize() {
    W = canvas.width  = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * (W || 1200),
      y: Math.random() * (H || 800),
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${p.a})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }
  draw();

  // Pause when hero is not visible
  const heroObserver = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  });
  heroObserver.observe(container);
})();

// ── AI Agent chat ──
const KB = {
  aws: `Prifulnath has deep AWS expertise spanning 9+ years. He works hands-on with Lambda (serverless functions), ECS/EC2 (containerised workloads), Step Functions (workflow orchestration), S3, CloudFront (CDN), Cognito (IAM), RDS, and SNS. He has architected end-to-end serverless ETL pipelines using Step Functions + Lambda + Databricks.`,

  crewai: `Prifulnath is a CrewAI specialist and AI Orchestration expert. He builds real-world multi-agent systems, RAG (Retrieval-Augmented Generation) pipelines, and context-engineered prompt workflows. He has completed the "Multi AI Agent Systems with CrewAI" and "Practical Multi AI Agents and Advanced Use Cases" certifications from DeepLearning.AI.`,

  lead: `Prifulnath has 5+ years of team leadership at Feathersoft. As Development Team Lead (2021-2025) and Senior Team Lead L1 (2025-Present), he has guided cross-functional engineering teams through complex digital transformation projects. He is adept at Agile methodology, Jira-based delivery, and technical mentoring. He has won the Extra Miler Award twice for going beyond expectations.`,

  keycloak: `Keycloak is one of Prifulnath's deepest specialisations. He implements multi-realm Keycloak SSO solutions with custom JWT claim mappers, federated identity, RBAC (Role-Based Access Control), and enterprise IAM strategies. He is a top contributor for Keycloak on Stack Overflow and has built live demos of SSO configurations.`,

  python: `Python is Prifulnath's primary language. He uses it for FastAPI microservices, Django applications, AI/ML scripting, CrewAI agent workflows, data engineering, and automation. He also uses Python alongside AWS Lambda and Databricks for ETL and serverless computing.`,

  fullstack: `Prifulnath covers the full stack: Angular (TypeScript) for frontends, FastAPI/Django/Laravel/Laminas for backends, MySQL/PostgreSQL/Databricks for data, all orchestrated via Docker and deployed to AWS. He built Progressive Web Apps (PWAs) with offline support and real-time WebSocket updates.`,

  experience: `Prifulnath has worked at Feathersoft (Kochi, Kerala) for nearly 10 years across five progressive roles: Intern (Jul-Oct 2016) → Trainee (2016-2017) → Software Engineer (2017-2021) → Development Team Lead (2021-2025) → Senior Team Lead L1 (2025-Present, current role). He holds a B.Tech from College of Engineering, Thalassery.`,

  default: `Prifulnath is a Senior Team Lead – L1 at Feathersoft with 9+ years of experience. His core expertise covers Agentic AI (CrewAI), AWS Cloud Architecture, Keycloak IAM, Python (FastAPI/Django), Angular, and ETL pipelines. He has won 2 Extra Miler Awards and holds AI certifications from DeepLearning.AI. Ask me about his AWS skills, CrewAI work, team leadership, Keycloak expertise, or Python experience!`,
};

function getAgentReply(q) {
  const lq = q.toLowerCase();
  if (/aws|lambda|step function|ecs|ec2|cloud|s3|cognito|cloudfront|serverless/.test(lq)) return KB.aws;
  if (/crew|agent|ai|rag|openai|ml|llm|multi.agent|artificial/.test(lq))  return KB.crewai;
  if (/lead|team|manage|senior|junior|agile|jira|award/.test(lq))          return KB.lead;
  if (/keycloak|sso|jwt|iam|identity|auth|oauth|rbac/.test(lq))            return KB.keycloak;
  if (/python|fastapi|django/.test(lq))                                     return KB.python;
  if (/angular|pwa|frontend|full.?stack|php|laravel/.test(lq))             return KB.fullstack;
  if (/experience|year|role|career|journey|history/.test(lq))              return KB.experience;
  return KB.default;
}

const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const chatSend     = document.getElementById('chatSend');
const clearChat    = document.getElementById('clearChat');
const logEntries   = document.getElementById('logEntries');
const responseTime = document.getElementById('responseTime');

function addLog(text) {
  const el = document.createElement('div');
  el.className = 'log-entry';
  el.textContent = `> ${text}`;
  logEntries.appendChild(el);
  logEntries.scrollTop = logEntries.scrollHeight;
}

function appendMessage(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `message message--${role}`;
  wrap.setAttribute('role', 'article');
  const icon = role === 'agent' ? 'fa-robot' : 'fa-user';
  wrap.innerHTML = `
    <div class="message-avatar" aria-hidden="true"><i class="fa-solid ${icon}"></i></div>
    <div class="message-bubble"><p>${text}</p></div>`;
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return wrap;
}

function sendMessage(text) {
  text = text.trim();
  if (!text) return;
  appendMessage('user', escapeHtml(text));
  chatInput.value = '';
  addLog('Query received');

  const typing = appendMessage('agent', '');
  typing.classList.add('chat-typing');
  addLog('Processing query...');

  const t0 = Date.now();
  const delay = 600 + Math.random() * 700;

  setTimeout(() => {
    const reply = getAgentReply(text);
    typing.classList.remove('chat-typing');
    typing.querySelector('.message-bubble').innerHTML = `<p>${reply}</p>`;
    const elapsed = Date.now() - t0;
    responseTime.textContent = `~${elapsed}ms`;
    addLog(`Response sent (${elapsed}ms)`);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, delay);
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

chatSend.addEventListener('click', () => sendMessage(chatInput.value));
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(chatInput.value); } });

document.querySelectorAll('.suggestion-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chatInput.value = chip.dataset.query;
    sendMessage(chip.dataset.query);
  });
});

clearChat.addEventListener('click', () => {
  chatMessages.innerHTML = '';
  appendMessage('agent', 'Chat cleared. Ask me anything about Prifulnath!');
  addLog('Chat cleared');
});

// ── Contact form ──
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('contactSubmit');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    this.reset();
    const success = document.getElementById('formSuccess');
    success.hidden = false;
    setTimeout(() => { success.hidden = true; }, 4000);
    addLog('Contact form submitted');
  }, 1200);
});

// ── Newsletter form ──
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ Subscribed!';
  btn.style.background = 'var(--clr-green)';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// ── Footer year ──
document.getElementById('footerYear').textContent = new Date().getFullYear();

// ── System log ticker ──
const sysLog = document.getElementById('sysLog');
const SYS_MESSAGES = [
  'site.status = online',
  'experience.years = 9',
  'awards.count = 2',
  'agent.mode = active',
  'skills.count = 50+',
  'location = Kochi, India',
  'stack = AWS + CrewAI + Keycloak',
  'availability = open',
];
let sysIdx = 0;
setInterval(() => {
  sysIdx = (sysIdx + 1) % SYS_MESSAGES.length;
  const lines = sysLog.querySelectorAll('.sys-log-line');
  const oldest = lines[0];
  if (oldest) oldest.remove();
  const el = document.createElement('div');
  el.className = 'sys-log-line';
  el.style.animation = 'fadeInUp 0.4s ease';
  el.textContent = `> ${SYS_MESSAGES[sysIdx]}`;
  sysLog.appendChild(el);
}, 2800);

// ── Skill pill tooltip ──
document.querySelectorAll('.pill[data-level]').forEach(pill => {
  pill.title = `Proficiency: ${pill.dataset.level}%`;
  pill.setAttribute('aria-label', `${pill.textContent} – ${pill.dataset.level}% proficiency`);
});

// ── Active nav highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link[href^="#"]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => sectionObserver.observe(s));

// ── Add active nav style ──
const styleEl = document.createElement('style');
styleEl.textContent = `.nav-link.active{color:var(--clr-text)!important;background:var(--clr-surface);}`;
document.head.appendChild(styleEl);
