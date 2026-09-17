const DADOS_FASES = {
    1: { bloco: 1, bNome: "BLOCO 1: A Ilusão da Normalidade", nome: "Fase 1: O Alistamento Padrão", desc: "O cenário é um quartel limpo e ensolarado. Atire nos alvos. Fácil e relaxante.", cor: 0xddffdd, fog: 0.02, inimigos: 3, velocidade: 0.01 },
    2: { bloco: 1, bNome: "BLOCO 1: A Ilusão da Normalidade", nome: "Fase 2: Patrulha de Rotina", desc: "Uma caminhada pela floresta. Surgem os primeiros zumbis lentos.", cor: 0x99cc99, fog: 0.04, inimigos: 4, velocidade: 0.015 },
    3: { bloco: 1, bNome: "BLOCO 1: A Ilusão da Normalidade", nome: "Fase 3: Limpeza Urbana", desc: "Você entra em uma cidadezinha vazia. Há muita munição por todo lado.", cor: 0x889988, fog: 0.05, inimigos: 5, velocidade: 0.02 },
    4: { bloco: 1, bNome: "BLOCO 1: A Ilusão da Normalidade", nome: "Fase 4: O Resgate", desc: "Salvar alguns soldados aliados. O jogo te dá armas melhores.", cor: 0x778877, fog: 0.06, inimigos: 6, velocidade: 0.025 },
    5: { bloco: 1, bNome: "BLOCO 1: A Ilusão da Normalidade", nome: "Fase 5: O Primeiro Alarme", desc: "Um ninho de zumbis pequeno. Você vence facilmente. Parece ganho.", cor: 0x667766, fog: 0.07, inimigos: 7, velocidade: 0.03 },

    6: { bloco: 2, bNome: "🟡 BLOCO 2: Algo Está Errado...", nome: "Fase 6: O Anoitecer", desc: "O sol se põe. A visibilidade cai pela metade. Eles correm.", cor: 0x223322, fog: 0.12, inimigos: 6, velocidade: 0.045 },
    7: { bloco: 2, bNome: "🟡 BLOCO 2: Algo Está Errado...", nome: "Fase 7: Sem Sinal", desc: "O rádio com a base militar falha. Você está completamente sozinho.", cor: 0x112211, fog: 0.15, inimigos: 7, velocidade: 0.055 },
    8: { bloco: 2, bNome: "🟡 BLOCO 2: Algo Está Errado...", nome: "Fase 8: Esgoto Claustrofóbico", desc: "O cenário fica apertado. Surge o primeiro mutante rápido.", cor: 0x0a110a, fog: 0.22, inimigos: 8, velocidade: 0.07 },
    9: { bloco: 2, bNome: "🟡 BLOCO 2: Algo Está Errado...", nome: "Fase 9: Hospital Abandonado", desc: "A lanterna pisca e falha. Os zumbis desviam erraticamente.", cor: 0x050a05, fog: 0.30, inimigos: 8, velocidade: 0.085 },
    10: { bloco: 2, bNome: "🟡 BLOCO 2: Algo Está Errado...", nome: "Fase 10: A Traição", desc: "O teto desaba num laboratório secreto. A brincadeira acabou.", cor: 0x1a0505, fog: 0.35, inimigos: 9, velocidade: 0.10 },

    11: { bloco: 3, bNome: "🟠 BLOCO 3: A Descida ao Caos", nome: "Fase 11: Névoa Tóxica", desc: "Ar contaminado. Se correr muito fica lento. Inimigos blindados.", cor: 0x2a2205, fog: 0.40, inimigos: 10, velocidade: 0.11 },
    12: { bloco: 3, bNome: "🟠 BLOCO 3: A Descida ao Caos", nome: "Fase 12: Labirinto de Vidro", desc: "Paredes invisíveis bloqueiam tiros. Inimigos brotam atrás de você.", cor: 0x221122, fog: 0.45, inimigos: 10, velocidade: 0.12 },
    13: { bloco: 3, bNome: "🟠 BLOCO 3: A Descida ao Caos", nome: "Fase 13: Alucinação Auditiva", desc: "Inversão de áudio e perturbações visuais na tela tiram seu foco.", cor: 0x111122, fog: 0.50, inimigos: 11, velocidade: 0.13 },
    14: { bloco: 3, bNome: "🟠 BLOCO 3: A Descida ao Caos", nome: "Fase 14: Pane no Sistema", desc: "A mira fica pesada e o gatilho da arma falha aleatoriamente.", cor: 0x220a0a, fog: 0.55, inimigos: 12, velocidade: 0.14 },
    15: { bloco: 3, bNome: "🟠 BLOCO 3: A Descida ao Caos", nome: "Fase 15: O Banquete dos Mortos", desc: "Sem munição alguma. Avance empurrando tudo NA FORÇA DO ÓDIO.", cor: 0x330000, fog: 0.65, inimigos: 15, velocidade: 0.16 },

    16: { bloco: 4, bNome: "🔴 BLOCO 4: O Jogo Mais Difícil do Mundo", nome: "Fase 16: O Purgatório de Pixels", desc: "O chão se move para trás. Elementos invisíveis dão morte instantânea.", cor: 0x150000, fog: 0.70, inimigos: 12, velocidade: 0.19 },
    17: { bloco: 4, bNome: "🔴 BLOCO 4: O Jogo Mais Difícil do Mundo", nome: "Fase 17: O Espelho Distorcido", desc: "Os controles do mouse inverteram! Os zumbis correm na velocidade da luz.", cor: 0x250000, fog: 0.75, inimigos: 12, velocidade: 0.24 },
    18: { bloco: 4, bNome: "🔴 BLOCO 4: O Jogo Mais Difícil do Mundo", nome: "Fase 18: Radiação Crítica", desc: "A vida máxima desce 1% a cada 3 segundos. Golpeie para reviver.", cor: 0x350000, fog: 0.80, inimigos: 14, velocidade: 0.27 },
    19: { bloco: 4, bNome: "🔴 BLOCO 4: O Jogo Mais Difícil do Mundo", nome: "Fase 19: Sem Checkpoints", desc: "Chefes na escuridão total. Se você morrer, regressa à Fase 16!", cor: 0x050000, fog: 0.90, inimigos: 3, velocidade: 0.30 },
    20: { bloco: 4, bNome: "🔴 BLOCO 4: O Jogo Mais Difícil do Mundo", nome: "Fase 20: O Epicentro do Ódio", desc: "O Deus Zumbi. Sobreviva sem cometer um erro por 30 segundos ou perderá o save.", cor: 0xff0000, fog: 0.40, inimigos: 1, velocidade: 0.38 }
};

let faseAtual = 1;
let vida = 100;
let forcaOdio = 0;
let listaInimigos = [];
let config = DADOS_FASES[faseAtual];
let clock = 0;
let jogoIniciado = false; // NOVA TRAVA DE INÍCIO

// --- CONFIGURAÇÃO THREE.JS ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(config.cor);
scene.fog = new THREE.FogExp2(config.cor, config.fog);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const lightAmbient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(lightAmbient);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

const floorGeo = new THREE.PlaneGeometry(50, 50);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x1d1d1d, roughness: 0.9 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// --- NOVA FUNÇÃO CHAMADA PELO BOTÃO HTML ---
function iniciarJogo() {
    const tela = document.getElementById('tela-inicio');
    tela.style.opacity = '0';
    tela.style.transform = 'scale(1.2)';

    setTimeout(() => {
        tela.style.display = 'none';
        jogoIniciado = true;
        carregarFase(1);
        animate(); // Inicia o loop gráfico após o clique
    }, 800);
}

function gerarInimigos() {
    listaInimigos.forEach(i => scene.remove(i.mesh));
    listaInimigos = [];
    document.getElementById('inimigos-qtd').innerText = config.inimigos;

    for (let i = 0; i < config.inimigos; i++) {
        let altura = (faseAtual >= 8) ? randomRange(1.6, 2.6) : 1.8;
        let geometry = new THREE.BoxGeometry(0.8, altura, 0.8);

        let corCubo = 0x2e6f40;
        if (config.bloco === 2) corCubo = 0x5a5a3a;
        if (config.bloco === 3) corCubo = 0x8b0000;
        if (config.bloco === 4) corCubo = 0xff0044;

        let material = new THREE.MeshStandardMaterial({ color: corCubo });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(randomRange(-5, 5), altura / 2, randomRange(-12, -4));
        scene.add(mesh);

        listaInimigos.push({
            mesh: mesh,
            velocidade: config.velocidade,
            vida: (config.bloco === 4) ? 2 : 1,
            driftX: randomRange(-0.02, 0.02)
        });
    }
}

function carregarFase(num) {
    if (num > 20) {
        alert("🚨 INCRÍVEL! Você venceu o Epicentro do Ódio e quebrou as regras do jogo!");
        window.location.reload();
        return;
    }
    faseAtual = num;
    config = DADOS_FASES[faseAtual];

    const tBloco = document.getElementById('bloco-titulo');
    tBloco.innerText = config.bNome;
    tBloco.className = `bloco-${config.bloco}`;

    document.getElementById('fase-nome').innerText = config.nome;
    document.getElementById('fase-desc').innerText = config.desc;

    if (config.bloco === 1) { document.getElementById('txt-municao').innerText = "Infinita"; }
    if (config.bloco === 2) { document.getElementById('txt-municao').innerText = "Limitada"; }
    if (config.bloco === 3) {
        document.getElementById('txt-odio-container').style.display = "block";
        document.getElementById('txt-municao').innerText = (faseAtual === 15) ? "ZERO" : "Escassa";
    }
    if (config.bloco === 4) { document.getElementById('chat-deus-zumbi').style.display = "block"; }

    scene.background = new THREE.Color(config.cor);
    scene.fog.color.setHex(config.cor);
    scene.fog.density = config.fog;

    vida = 100;
    atualizarVida(0);
    gerarInimigos();
}

function atualizarVida(valor) {
    vida += valor;
    if (vida > 100) vida = 100;
    if (vida <= 0) {
        vida = 0;
        if (faseAtual >= 16) {
            alert("💀 VOCÊ MORREU! Modo Sem Checkpoints ativo: Voltando para a Fase 16!");
            carregarFase(16);
        } else {
            alert("💀 Você falhou. Reiniciando a fase corrente.");
            carregarFase(faseAtual);
        }
    }
    document.getElementById('barra-vida').style.width = vida + "%";
    document.getElementById('barra-vida').style.backgroundColor = (vida > 40) ? "#00ff00" : "#ff0000";
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousedown', (event) => {
    if (!jogoIniciado) return; // Não atira na tela de início

    if (faseAtual === 14 && Math.random() < 0.35) {
        dispararEfeitoDano("⚠️ SISTEMA TRAVOU O DISPARO!");
        return;
    }

    if (faseAtual === 17) {
        mouse.x = -((event.clientX / window.innerWidth) * 2 - 1);
        mouse.y = ((event.clientY / window.innerHeight) * 2 - 1);
    } else {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    raycaster.setFromCamera(mouse, camera);
    const alvos = listaInimigos.map(i => i.mesh);
    const intersecoes = raycaster.intersectObjects(alvos);

    if (intersecoes.length > 0) {
        let atingido = intersecoes.object;
