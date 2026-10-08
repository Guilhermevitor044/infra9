const scenarios = [
  {
    key: 'normal', label: 'Operação normal', status: 'NORMAL', statusClass: 'status-normal',
    traffic: '42%', servers: '2', queue: '0', icr: '84', edge: 'Sincronizado', orders: '0 pendentes', essential: 'Capacidade preservada'
  },
  {
    key: 'peak', label: 'Pico de demanda', status: 'PICO CONTROLADO', statusClass: 'status-warn',
    traffic: '180%', servers: '6', queue: '21.482', icr: '72', edge: 'Em atenção', orders: '0 pendentes', essential: 'Faixa reservada ativa'
  },
  {
    key: 'outage', label: 'Queda regional', status: 'CONTINGÊNCIA', statusClass: 'status-critical',
    traffic: '138%', servers: '5', queue: '8.940', icr: '22', edge: 'Modo isolado', orders: '14 pendentes', essential: 'Operação local ativa'
  },
  {
    key: 'recovery', label: 'Recuperação', status: 'SINCRONIZANDO', statusClass: 'status-recovery',
    traffic: '96%', servers: '4', queue: '1.280', icr: '58', edge: 'Sincronização gradual', orders: '3 pendentes', essential: 'Prioridade na recuperação'
  }
];

const panel = document.querySelector('.hero-panel');
const scenarioLabel = document.getElementById('scenario-label');
const globalStatus = document.getElementById('global-status');
const traffic = document.getElementById('metric-traffic');
const servers = document.getElementById('metric-servers');
const queue = document.getElementById('metric-queue');
const icr = document.getElementById('metric-icr');
const edge = document.getElementById('edge-state');
const orders = document.getElementById('local-orders');
const essential = document.getElementById('essential-state');
const steps = [...document.querySelectorAll('.sim-step')];
const start = document.getElementById('start-sim');
let timer = null;
let current = 0;

function setScenario(index) {
  current = index;
  const s = scenarios[index];
  panel.dataset.scenario = s.key;
  scenarioLabel.textContent = s.label;
  globalStatus.textContent = s.status;
  globalStatus.className = `status-pill ${s.statusClass}`;
  traffic.textContent = s.traffic;
  servers.textContent = s.servers;
  queue.textContent = s.queue;
  icr.textContent = s.icr;
  edge.textContent = s.edge;
  orders.textContent = s.orders;
  essential.textContent = s.essential;
  steps.forEach((btn, i) => btn.classList.toggle('active', i === index));
}

steps.forEach((btn, i) => btn.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  start.textContent = 'Simular uma crise';
  setScenario(i);
}));

start.addEventListener('click', () => {
  clearInterval(timer);
  setScenario(0);
  start.textContent = 'Simulação em andamento…';
  let i = 0;
  timer = setInterval(() => {
    i += 1;
    if (i >= scenarios.length) {
      clearInterval(timer);
      timer = null;
      start.textContent = 'Repetir simulação';
      return;
    }
    setScenario(i);
  }, 2200);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
