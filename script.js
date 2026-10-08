(() => {
  'use strict';

  document.body.classList.add('reveal-ready');

  const scenarios = [
    {
      key: 'normal', label: 'Operação normal', status: 'NORMAL', statusClass: 'status-normal',
      event: 'Serviços funcionando normalmente.', traffic: '42%', servers: '2', queue: '0', icr: '84', edge: 'Sincronizado', orders: '0 pendentes', essential: 'Capacidade preservada',
      explanation: 'A capacidade estável atende a demanda e o EdgeBox permanece sincronizado.'
    },
    {
      key: 'peak', label: 'Pico de demanda', status: 'PICO CONTROLADO', statusClass: 'status-warn',
      event: 'Cadastro do auxílio emergencial é liberado.', traffic: '180%', servers: '6', queue: '21.482', icr: '72', edge: 'Em atenção', orders: '0 pendentes', essential: 'Faixa reservada ativa',
      explanation: 'Novos servidores entram, a fila organiza o acesso e a capacidade essencial permanece reservada.'
    },
    {
      key: 'outage', label: 'Queda regional', status: 'CONTINGÊNCIA', statusClass: 'status-critical',
      event: 'Uma região perde conectividade externa.', traffic: '138%', servers: '5', queue: '8.940', icr: '22', edge: 'Modo isolado', orders: '14 pendentes', essential: 'Operação local ativa',
      explanation: 'A central continua operando; o EdgeBox oferece funções locais e guarda operações na fila regional.'
    },
    {
      key: 'recovery', label: 'Recuperação', status: 'SINCRONIZANDO', statusClass: 'status-recovery',
      event: 'Conectividade é restabelecida.', traffic: '96%', servers: '4', queue: '1.280', icr: '58', edge: 'Sincronização gradual', orders: '3 pendentes', essential: 'Prioridade na recuperação',
      explanation: 'A conexão volta em lotes: essenciais primeiro, duplicidades controladas e retorno progressivo.'
    }
  ];

  const $ = (selector) => document.querySelector(selector);
  const panel = $('.hero-panel');
  const scenarioLabel = $('#scenario-label');
  const globalStatus = $('#global-status');
  const scenarioEvent = $('#scenario-event');
  const scenarioExplanation = $('#scenario-explanation');
  const traffic = $('#metric-traffic');
  const servers = $('#metric-servers');
  const queue = $('#metric-queue');
  const icr = $('#metric-icr');
  const edge = $('#edge-state');
  const orders = $('#local-orders');
  const essential = $('#essential-state');
  const start = $('#start-sim');
  const play = $('#play-sim');
  const reset = $('#reset-sim');
  const steps = [...document.querySelectorAll('.sim-step')];
  let timer = null;

  function stopSimulation() {
    if (timer) window.clearInterval(timer);
    timer = null;
    if (play) play.textContent = 'Executar automaticamente';
  }

  function setScenario(index) {
    const scenario = scenarios[index];
    if (!scenario || !panel) return;
    panel.dataset.scenario = scenario.key;
    scenarioLabel.textContent = scenario.label;
    globalStatus.textContent = scenario.status;
    globalStatus.className = `status-pill ${scenario.statusClass}`;
    scenarioEvent.textContent = scenario.event;
    scenarioExplanation.textContent = scenario.explanation;
    traffic.textContent = scenario.traffic;
    servers.textContent = scenario.servers;
    queue.textContent = scenario.queue;
    icr.textContent = scenario.icr;
    edge.textContent = scenario.edge;
    orders.textContent = scenario.orders;
    essential.textContent = scenario.essential;
    steps.forEach((step, stepIndex) => {
      const active = stepIndex === index;
      step.classList.toggle('active', active);
      step.setAttribute('aria-current', active ? 'step' : 'false');
    });
  }

  function runSimulation() {
    stopSimulation();
    let index = 0;
    setScenario(index);
    if (play) play.textContent = 'Simulação em andamento…';
    timer = window.setInterval(() => {
      index += 1;
      if (index >= scenarios.length) {
        stopSimulation();
        setScenario(scenarios.length - 1);
        if (play) play.textContent = 'Repetir simulação';
        return;
      }
      setScenario(index);
    }, 2600);
  }

  steps.forEach((step, index) => step.addEventListener('click', () => {
    stopSimulation();
    setScenario(index);
  }));
  start?.addEventListener('click', () => {
    document.querySelector('#simulacao')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    runSimulation();
  });
  play?.addEventListener('click', runSimulation);
  reset?.addEventListener('click', () => {
    stopSimulation();
    setScenario(0);
  });

  const stateDescriptions = {
    normal: 'Serviços selecionados seguem sincronizados com a central.',
    attention: 'O ICR está piorando: o cache é atualizado e o link reserva é verificado antes da falha.',
    contingency: 'O link alternativo assume parte do tráfego para manter a região operando.',
    isolated: 'Sem internet externa, Wi-Fi local, serviços selecionados e fila local continuam disponíveis.',
    recovery: 'A conectividade voltou; lotes graduais, validação e prioridade evitam um novo pico.'
  };
  const stateDetail = $('#state-detail');
  document.querySelectorAll('.state').forEach((state) => {
    state.addEventListener('click', () => {
      document.querySelectorAll('.state').forEach((item) => {
        const active = item === state;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      if (stateDetail) stateDetail.textContent = stateDescriptions[state.dataset.state] || '';
    });
  });

  const menuButton = $('.menu-toggle');
  const nav = $('.nav');
  function closeMenu() {
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
  }
  menuButton?.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  setScenario(0);
})();
