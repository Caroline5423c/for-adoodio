const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let jogoAtivo = false;

// Estado central do jogo conforme as 20 fases solicitadas
let jogo = {
    fase: 1,
    odio: 0,
    infeccao: 0,
    morteUmHit: false,
    controlesInvertidos: false,
    iaLeInput: false,
    chanceTravarArma: 0,
    taxaInfeccao: 0,
    zumbisParaPassar: 5,
    zumbisMortosNaFase: 0
};

// Soldado de elite (Jogador)
let jogador = {
    x: 400,
    y: 250,
    r: 16,
    velocidade: 4.5,
    anguloOlhar: 0
};

let balas = [];
let zumbis = [];
let teclas = {};
let mousePos = { x: 400, y: 250 };

// Frases de deboche customizadas para que o jogador passe raiva
const frasesMorte = [
    "Sério que você morreu nessa fase? Patético.",
    "O sargento zumbi ordenou que você limpe o chão do quartel de novo.",
    "Seus reflexos falharam miseravelmente.",
    "PUNIÇÃO EXTREMA: Você morreu no mundo 4 e voltou para a fase 16!",
    "O Deus Zumbi detectou seus comandos e esmagou você."
];

// Mapeamento dinâmico das 20 fases
function configurarFase(numFase) {
    jogo.fase = numFase;
    jogo.zumbisMortosNaFase = 0;
    jogo.odio = 0;
    zumbis = [];
    balas = [];

    // Resets de segurança
    jogo.morteUmHit = false;
    jogo.controlesInvertidos = false;
    jogo.iaLeInput = false;
    jogo.chanceTravarArma = 0;
    jogo.taxaInfeccao = 0;
    jogo.zumbisParaPassar = 5 + numFase * 3;

    document.getElementById("canvas-container").classList.remove("efeito-odio");
    let nomeFase = "Alistamento Inicial";

    // Implementação da curva de dificuldade progressiva
    if (numFase >= 6 && numFase <= 10) {
        nomeFase = "Cidade Morta - Infecção Crônica";
        jogo.taxaInfeccao = 0.08;
    }
    else if (numFase >= 11 && numFase <= 15) {
        nomeFase = "Subterrâneo - Pane e Sabotagem";
        jogo.taxaInfeccao = 0.18;
        if (numFase === 12) { jogo.controlesInvertidos = true; nomeFase = "Controles Invertidos!"; }
        if (numFase >= 14) jogo.chanceTravarArma = 0.25;
    }
    else if (numFase >= 16 && numFase <= 20) {
        nomeFase = "EPICENTRO - PESADELO IMPOSSÍVEL";
        jogo.morteUmHit = true;
        jogo.iaLeInput = true;
        jogo.taxaInfeccao = 0.40;
        if (numFase === 17) jogo.controlesInvertidos = true;
        document.getElementById("canvas-container").classList.add("efeito-odio");
    }

    document.getElementById("txt-fase").innerText = numFase;
    document.getElementById("nome-fase").innerText = nomeFase;
}

// Eventos de teclas
window.addEventListener("keydown", (e) => { teclas[e.key.toLowerCase()] = true; });
window.addEventListener("keyup", (e) => { teclas[e.key.toLowerCase()] = false; });

// Capturar posição do mouse para rotação realista do soldado
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
});

// Ação de Atirar
window.addEventListener("mousedown", (e) => {
    if (!jogoAtivo) return;

    const anguloTiro = Math.atan2(mousePos.y - jogador.y, mousePos.x - jogador.x);

    // Sistema de travamento estressante
    if (Math.random() < jogo.chanceTravarArma) {
        jogo.odio = Math.min(jogo.odio + 15, 100);
        return;
    }

    // Input Reading automático da IA trapaceira nas fases finais
    if (jogo.iaLeInput) {
        zumbis.forEach(z => {
            let dist = Math.hypot(jogador.x - z.x, jogador.y - z.y);
            if (dist < 250) {
                // Esquiva lateral milimétrica instantânea
                z.x += Math.sin(anguloTiro) * 50;
                z.y -= Math.cos(anguloTiro) * 50;
            }
        });
    }

    balas.push({
        x: jogador.x + Math.cos(anguloTiro) * 15,
        y: jogador.y + Math.sin(anguloTiro) * 15,
        vx: Math.cos(anguloTiro) * 9,
        vy: Math.sin(anguloTiro) * 9
    });
});

// Botão de Iniciar Jogo (Ativa o motor gráfico)
document.getElementById("btn-iniciar").addEventListener("click", () => {
    document.getElementById("tela-inicio").style.display = "none";
    jogoAtivo = true;
    configurarFase(1);
    requestAnimationFrame(loop); // Dispara o loop com segurança aqui
});

// Botão de reiniciar
document.getElementById("btn-reiniciar").addEventListener("click", () => {
    document.getElementById("tela-morte").style.display = "none";
    jogoAtivo = true;

    // Punição cruel: se morrer no fim do jogo, volta para a 16 obrigatoriamente
    if (jogo.fase >= 16 && jogo.fase <= 20) {
        configurarFase(16);
    } else {
        configurarFase(jogo.fase);
    }
    jogo.infeccao = 0;
    requestAnimationFrame(loop);
});

function processarMorte() {
    jogoAtivo = false;
    document.getElementById("tela-morte").style.display = "flex";

    if (jogo.fase >= 16) {
        document.getElementById("msg-deboche").innerText = frasesMorte[3];
    } else {
        let rng = Math.floor(Math.random() * 3);
        document.getElementById("msg-deboche").innerText = frasesMorte[rng];
    }
}

// Mecânica e Atualizações internas do jogo
function update() {
    if (!jogoAtivo) return false;

    let mx = 0;
    let my = 0;
    if (teclas['w'] || teclas['arrowup']) my = -1;
    if (teclas['s'] || teclas['arrowdown']) my = 1;
    if (teclas['a'] || teclas['arrowleft']) mx = -1;
    if (teclas['d'] || teclas['arrowright']) mx = 1;

    // Sabotagem de direção
    if (jogo.controlesInvertidos) { mx *= -1; my *= -1; }

    jogador.x += mx * jogador.velocidade;
    jogador.y += my * jogador.velocidade;

    // Conter o personagem dentro da tela militar
    jogador.x = Math.max(jogador.r, Math.min(canvas.width - jogador.r, jogador.x));
    jogador.y = Math.max(jogador.r, Math.min(canvas.height - jogador.r, jogador.y));

    // Rotação em direção ao mouse
    jogador.anguloOlhar = Math.atan2(mousePos.y - jogador.y, mousePos.x - jogador.x);

    // Dreno passivo provocado pela infecção biológica
    if (jogo.taxaInfeccao > 0) {
        jogo.infeccao += jogo.taxaInfeccao;
        if (jogo.infeccao >= 100) { processarMorte(); return false; }
    }

    // Movimentação dos tiros
    for (let i = balas.length - 1; i >= 0; i--) {
        balas[i].x += balas[i].vx;
        balas[i].y += balas[i].vy;
        if (balas[i].x < 0 || balas[i].x > canvas.width || balas[i].y < 0 || balas[i].y > canvas.height) {
            balas.splice(i, 1);
        }
    }

    // Geração de hordas com base na fase atual
    if (zumbis.length < 5 + (jogo.fase * 0.7) && Math.random() < 0.05) {
        let borda = Math.floor(Math.random() * 4);
        let zx, zy;
        if (borda === 0) { zx = Math.random() * canvas.width; zy = -30; }
        else if (borda === 1) { zx = canvas.width + 30; zy = Math.random() * canvas.height; }
        else if (borda === 2) { zx = Math.random() * canvas.width; zy = canvas.height + 30; }
        else { zx = -30; zy = Math.random() * canvas.height; }

        let velInimigo = 1.2 + (jogo.fase * 0.18);
        zumbis.push({ x: zx, y: zy, r: 14, vel: velInimigo });
    }

    // Inteligência e Colisão dos Zumbis
    for (let i = zumbis.length - 1; i >= 0; i--) {
        let z = zumbis[i];
        let anguloZumbi = Math.atan2(jogador.y - z.y, jogador.x - z.x);
        z.x += Math.cos(anguloZumbi) * z.vel;
        z.y += Math.sin(anguloZumbi) * z.vel;

        // Ataque do zumbi no Humano
        let distHumano = Math.hypot(jogador.x - z.x, jogador.y - z.y);
        if (distHumano < jogador.r + z.r) {
            if (jogo.morteUmHit) { processarMorte(); return false; }
            else {
                jogo.infeccao = Math.min(jogo.infeccao + 18, 100);
                zumbis.splice(i, 1);
                if (jogo.infeccao >= 100) { processarMorte(); return false; }
                continue;
            }
        }

        // Colisão do Projétil com os mortos-vivos
        for (let j = balas.length - 1; j >= 0; j--) {
            let b = balas[j];
            let distBala = Math.hypot(b.x - z.x, b.y - z.y);
            if (distBala < z.r + 4) {
                zumbis.splice(i, 1);
                balas.splice(j, 1);
                jogo.zumbisMortosNaFase++;

                jogo.odio = Math.min(jogo.odio + 8, 100);
                jogo.infeccao = Math.max(jogo.infeccao - 4, 0);

                // Trocar de fase ao atingir a meta da tabela
                if (jogo.zumbisMortosNaFase >= jogo.zumbisParaPassar) {
                    if (jogo.fase < 20) {
                        configurarFase(jogo.fase + 1);
                    } else {
                        alert("SUPREMO! VOCÊ ZEROU O JOGO MAIS DIFÍCIL DO MUNDO NA FORÇA DO ÓDIO!");
                        jogoAtivo = false;
                        location.reload();
                    }
                }
                break;
            }
        }
    }

    // Vinculação com o layout CSS
    document.getElementById("fill-odio").style.width = jogo.odio + "%";
    document.getElementById("fill-infeccao").style.width = jogo.infeccao + "%";
    return true;
}

// Arte vetorial direta via Canvas (Pessoas e Zumbis reais)
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Renderizar Tiros (Balas de fósforo)
    ctx.fillStyle = "#ffcc00";
    balas.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    // Renderizar Zumbis com braços esticados e detalhes de infecção
    zumbis.forEach(z => {
        let angZ = Math.atan2(jogador.y - z.y, jogador.x - z.x);

        ctx.save();
        ctx.translate(z.x, z.y);
        ctx.rotate(angZ);

        // Desenhar Braços de Zumbi esticados para frente
        ctx.fillStyle = jogo.iaLeInput ? "#4a154b" : "#3b4d24";
        ctx.fillRect(0, -10, 20, 5);
        ctx.fillRect(0, 5, 20, 5);

        // Corpo do Infectado
        ctx.beginPath();
        ctx.arc(0, 0, z.r, 0, Math.PI * 2);
