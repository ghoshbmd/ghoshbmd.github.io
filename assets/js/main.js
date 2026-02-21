// =============================================
// SOURAV GHOSH - PORTFOLIO JAVASCRIPT
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. ANIMATED CIRCUIT BACKGROUND ──────────────
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let W, H, nodes = [], connections = [], pulses = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initNodes() {
    nodes = [];
    connections = [];
    pulses = [];
    const count = Math.floor((W * H) / 22200);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5
      });
    }
  }

  function drawConnections() {
    const maxDist = 150;
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = m.x - n.x, dy = m.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.4)';
      ctx.fill();
    }

    // Pulse data packets
    pulses.forEach((p, idx) => {
      p.progress += 0.015;
      if (p.progress >= 1) {
        pulses.splice(idx, 1);
        return;
      }
      const px = p.x1 + (p.x2 - p.x1) * p.progress;
      const py = p.y1 + (p.y2 - p.y1) * p.progress;
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.9)';
      ctx.fill();
    });

    // Occasionally spawn pulses
    if (Math.random() < 0.04 && nodes.length > 1) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      if (a !== b) {
        pulses.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, progress: 0 });
      }
    }

    requestAnimationFrame(drawConnections);
  }

  resize();
  initNodes();
  drawConnections();
  window.addEventListener('resize', () => { resize(); initNodes(); });


  // ── 2. NAVBAR SCROLL ─────────────────────────────
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });


  // ── 3. HAMBURGER MENU ────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close menu on link click
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });


  // ── 4. COUNTER ANIMATION ─────────────────────────
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));


  // ── 5. SKILL BAR ANIMATION ───────────────────────
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const pct = bar.dataset.pct;
          setTimeout(() => { bar.style.width = pct + '%'; }, 300);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.about-skills').forEach(el => skillObserver.observe(el));


  // ── 6. SCROLL REVEAL ─────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .timeline-item, .skill-card, .edu-card').forEach(el => {
    revealObserver.observe(el);
  });


  // ── 7. TIMELINE STAGGER ──────────────────────────
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.timeline-item');
        items.forEach((item, idx) => {
          setTimeout(() => item.classList.add('visible'), idx * 200);
        });
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline').forEach(el => timelineObserver.observe(el));


  // ── 8. SKILL CARDS STAGGER ───────────────────────
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.skill-card');
        cards.forEach((card, idx) => {
          setTimeout(() => card.classList.add('visible'), idx * 100);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skills-grid-full').forEach(el => cardObserver.observe(el));


  // ── 9. ACTIVE NAV LINK ON SCROLL ─────────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sTop = section.offsetTop - 120;
      if (window.scrollY >= sTop) current = section.getAttribute('id');
    });

    navItems.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent-cyan)' : '';
    });
  });


  // ── 10. TYPED TITLE EFFECT ───────────────────────
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const texts = ['AI Enthusiastic', 'Automotive ECU Engineer'];
    let textIdx = 0, charIdx = 0, deleting = false;

    function type() {
      const current = texts[textIdx];
      if (!deleting) {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          textIdx = (textIdx + 1) % texts.length;
        }
      }
      setTimeout(type, deleting ? 60 : 90);
    }
    setTimeout(type, 1500);
  }


  // ── 11. CONTACT FORM ─────────────────────────────
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'MESSAGE SENT ✓';
    btn.style.background = '#00c48c';
    setTimeout(() => {
      btn.textContent = 'SEND MESSAGE';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });


  // ── 12. SMOOTH ACTIVE NAV INDICATOR ──────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
