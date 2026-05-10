// ══════════════════════════════════════
//  APP — Roleta, Tabs & Renderização
// ══════════════════════════════════════

// ── STATE ──
let currentCategory = 'leve';
let isSpinning = false;
let shownLeve   = new Set();
let shownPesada = new Set();
let currentAngle = 0;
let animFrame;

// ── WHEEL SETUP ──
const wheelCanvas = document.getElementById('wheelCanvas');
const wCtx = wheelCanvas.getContext('2d');
const SEGMENTS = 12;
const CX = wheelCanvas.width / 2;
const CY = wheelCanvas.height / 2;
const RADIUS = 148;

const SEG_COLORS = [
  '#0b4f5e','#d9694a','#c8973a','#1a7a90',
  '#d9694a','#0b4f5e','#e4ba6a','#1a7a90',
  '#c8973a','#0b4f5e','#d9694a','#1a7a90',
];

const SEG_ICONS = ['♥','★','♦','♥','★','♦','♥','★','♦','♥','★','♦'];

function drawWheel(rotation) {
  wCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  // Shadow
  wCtx.save();
  wCtx.shadowColor = 'rgba(11,79,94,0.35)';
  wCtx.shadowBlur = 28;
  wCtx.beginPath();
  wCtx.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  wCtx.fillStyle = '#0b4f5e';
  wCtx.fill();
  wCtx.restore();

  const arc = (Math.PI * 2) / SEGMENTS;

  for (let i = 0; i < SEGMENTS; i++) {
    const start = arc * i + rotation;
    const end   = start + arc;

    // Segment
    wCtx.beginPath();
    wCtx.moveTo(CX, CY);
    wCtx.arc(CX, CY, RADIUS, start, end);
    wCtx.closePath();
    wCtx.fillStyle = SEG_COLORS[i];
    wCtx.fill();

    // Divider
    wCtx.beginPath();
    wCtx.moveTo(CX, CY);
    wCtx.arc(CX, CY, RADIUS, start, end);
    wCtx.closePath();
    wCtx.strokeStyle = 'rgba(255,255,255,0.18)';
    wCtx.lineWidth = 2;
    wCtx.stroke();

    // Icon
    wCtx.save();
    wCtx.translate(CX, CY);
    wCtx.rotate(start + arc / 2);
    wCtx.translate(RADIUS * 0.65, 0);
    wCtx.rotate(Math.PI / 2);
    wCtx.fillStyle = 'rgba(255,255,255,0.9)';
    wCtx.font = 'bold 16px serif';
    wCtx.textAlign = 'center';
    wCtx.textBaseline = 'middle';
    wCtx.fillText(SEG_ICONS[i], 0, 0);
    wCtx.restore();
  }

  // Outer ring
  wCtx.beginPath();
  wCtx.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  wCtx.strokeStyle = 'rgba(255,255,255,0.25)';
  wCtx.lineWidth = 3;
  wCtx.stroke();

  // Gold ring
  wCtx.beginPath();
  wCtx.arc(CX, CY, RADIUS - 4, 0, Math.PI * 2);
  wCtx.strokeStyle = 'rgba(200,151,58,0.4)';
  wCtx.lineWidth = 2;
  wCtx.stroke();

  // Center circle
  wCtx.beginPath();
  wCtx.arc(CX, CY, 32, 0, Math.PI * 2);
  const grd = wCtx.createRadialGradient(CX, CY, 4, CX, CY, 32);
  grd.addColorStop(0, '#f8f3ea');
  grd.addColorStop(1, '#e4ba6a');
  wCtx.fillStyle = grd;
  wCtx.fill();
  wCtx.strokeStyle = '#c8973a';
  wCtx.lineWidth = 3;
  wCtx.stroke();

  // Center heart
  wCtx.fillStyle = '#d9694a';
  wCtx.font = 'bold 18px serif';
  wCtx.textAlign = 'center';
  wCtx.textBaseline = 'middle';
  wCtx.fillText('♥', CX, CY);
}

// ── SPIN ──
function spin() {
  if (isSpinning) return;

  const pool = getPool();
  if (pool.length === 0) {
    resetShown();
    return;
  }

  isSpinning = true;
  document.getElementById('spinBtn').classList.add('spinning');
  document.getElementById('questionReveal').classList.remove('visible');

  const extraRotations = (5 + Math.random() * 5) * Math.PI * 2;
  const targetAngle    = currentAngle + extraRotations;
  const duration       = 3000 + Math.random() * 1000;
  const startAngle     = currentAngle;
  const startTime      = performance.now();

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animate(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    currentAngle   = startAngle + (targetAngle - startAngle) * easeOut(progress);

    drawWheel(currentAngle);

    if (progress < 1) {
      animFrame = requestAnimationFrame(animate);
    } else {
      currentAngle = targetAngle % (Math.PI * 2);
      isSpinning   = false;
      document.getElementById('spinBtn').classList.remove('spinning');
      showQuestion(pool);
    }
  }

  animFrame = requestAnimationFrame(animate);
}

function getPool() {
  let pool = [];
  if (currentCategory === 'leve' || currentCategory === 'surpresa') {
    PERGUNTAS_LEVES.forEach((q, i) => {
      if (!shownLeve.has(i)) pool.push({ q, cat: 'leve', idx: i });
    });
  }
  if (currentCategory === 'pesada' || currentCategory === 'surpresa') {
    PERGUNTAS_PESADAS.forEach((q, i) => {
      if (!shownPesada.has(i)) pool.push({ q, cat: 'pesada', idx: i });
    });
  }
  return pool;
}

function resetShown() {
  shownLeve.clear();
  shownPesada.clear();
  updateCounter();
  spin();
}

function showQuestion(pool) {
  const pick = pool[Math.floor(Math.random() * pool.length)];

  if (pick.cat === 'leve') shownLeve.add(pick.idx);
  else shownPesada.add(pick.idx);

  const badge = document.getElementById('qrBadge');
  const text  = document.getElementById('qrText');
  const card  = document.getElementById('questionCard');
  const reveal = document.getElementById('questionReveal');

  badge.textContent = pick.cat === 'leve' ? '🍃 Leve' : '🌑 Pesada';
  badge.className   = 'qr-badge ' + pick.cat;
  text.textContent  = pick.q;

  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = '';

  reveal.classList.add('visible');
  updateCounter();
}

function updateCounter() {
  const el = document.getElementById('questionsCounter');
  const total = currentCategory === 'leve' ? PERGUNTAS_LEVES.length
              : currentCategory === 'pesada' ? PERGUNTAS_PESADAS.length
              : PERGUNTAS_LEVES.length + PERGUNTAS_PESADAS.length;
  const seen  = currentCategory === 'leve' ? shownLeve.size
              : currentCategory === 'pesada' ? shownPesada.size
              : shownLeve.size + shownPesada.size;

  if (seen === 0) { el.textContent = ''; return; }
  el.textContent = `${seen} de ${total} perguntas respondidas`;
}

// ── CATEGORY ──
function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('questionReveal').classList.remove('visible');
  updateCounter();
}

// ── TABS ──
function showTab(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  const tabMap = { roleta:0, brincadeiras:1, leves:2, pesadas:3 };
  document.querySelectorAll('.tab-btn')[tabMap[id]].classList.add('active');
  window.scrollTo({ top: document.querySelector('.nav-sticky').offsetTop, behavior: 'smooth' });
}

// ── RENDER BRINCADEIRAS ──
function renderGames() {
  const grid = document.getElementById('gamesGrid');
  grid.innerHTML = BRINCADEIRAS.map((g, i) => `
    <div class="game-card color-${g.cor}" onclick="toggleGame(${i})" id="game-${i}">
      <div class="game-card-top">
        <div class="game-emoji">${g.emoji}</div>
        <div class="game-info">
          <h3>${g.titulo}</h3>
          <div class="game-meta">
            <span class="meta-tag">${g.clima}</span>
            <span class="meta-tag">⏱ ${g.tempo}</span>
          </div>
          <p class="game-desc">${g.descricao}</p>
        </div>
        <div class="game-chevron" id="chevron-${i}">›</div>
      </div>
      <div class="game-instructions" id="instructions-${i}">
        <div class="instructions-inner">
          <h4>Como jogar</h4>
          <ol>
            ${g.instrucoes.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleGame(i) {
  const instructions = document.getElementById(`instructions-${i}`);
  const chevron      = document.getElementById(`chevron-${i}`);
  const card         = document.getElementById(`game-${i}`);
  const isOpen       = instructions.classList.contains('open');

  document.querySelectorAll('.game-instructions').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.game-chevron').forEach(el => { el.style.transform = ''; });
  document.querySelectorAll('.game-card').forEach(el => el.classList.remove('expanded'));

  if (!isOpen) {
    instructions.classList.add('open');
    chevron.style.transform = 'rotate(90deg)';
    card.classList.add('expanded');
  }
}

// ── RENDER QUESTION LISTS ──
function renderQuestions() {
  const levesList   = document.getElementById('levesList');
  const pesadasList = document.getElementById('pesadasList');

  levesList.innerHTML = PERGUNTAS_LEVES.map((q, i) => `
    <div class="question-item leve-item" style="animation-delay: ${i * 0.06}s">
      <span class="q-num">${String(i+1).padStart(2,'0')}</span>
      <p>${q}</p>
    </div>
  `).join('');

  pesadasList.innerHTML = PERGUNTAS_PESADAS.map((q, i) => `
    <div class="question-item pesada-item" style="animation-delay: ${i * 0.06}s">
      <span class="q-num">${String(i+1).padStart(2,'0')}</span>
      <p>${q}</p>
    </div>
  `).join('');
}

// ── HERO CANVAS ──
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * canvas.width;
      this.y     = Math.random() * canvas.height;
      this.r     = Math.random() * 1.5 + 0.3;
      this.vx    = (Math.random() - 0.5) * 0.3;
      this.vy    = -Math.random() * 0.4 - 0.1;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '#c8973a' : '#ffffff';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -5 || this.x < -5 || this.x > canvas.width + 5) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.globalAlpha = 0.04;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.strokeStyle = '#c8973a';
      ctx.lineWidth = 1;
      const t = Date.now() / 3000 + i;
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = canvas.height * 0.6 + Math.sin(x / 120 + t) * 35 + i * 25;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    particles.forEach(p => { p.update(); p.draw(); });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();
  window.addEventListener('resize', () => { resize(); initParticles(); });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  drawWheel(0);
  renderGames();
  renderQuestions();
  initHeroCanvas();
});
