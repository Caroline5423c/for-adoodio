let scene, camera, renderer, raycaster, mouse, light;
let cubos = [];
let faseAtual = 1;
let vida = 100;
let pontosOdio = 0;
let jogoIniciado = false;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onClick);

    document.getElementById('btn-jogar').addEventListener('click', iniciarJogo);
}

function iniciarJogo() {
    document.getElementById('tela-inicio').style.display = 'none';
    document.getElementById('hud').style.display = 'block';
    document.getElementById('instrucoes').style.display = 'block';
    document.getElementById('chat-deus-zumbi').style.display = 'block';
    jogoIniciado = true;
    carregarFase(faseAtual);
    animate();
}

function criarCubo(bloco) {
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    let cor = 0x00ff00;
    if (bloco === 2) cor = 0xffff00;
    if (bloco === 3) cor = 0xff6600;
    if (bloco === 4) cor = 0xff0000;

    const material = new THREE.MeshBasicMaterial({ color: cor, wireframe: true });
    const cubo = new THREE.Mesh(geometry, material);

    cubo.position.x = (Math.random() - 0.5) * 6;
    cubo.position.y = (Math.random() - 0.5) * 4;
    cubo.position.z = (Math.random() - 0.5) * 2;

    cubo.userData = {
        velX: (Math.random() - 0.5) * (0.01 * bloco),
        velY: (Math.random() - 0.5) * (0.01 * bloco)
    };

    scene.add(cubo);
    cubos.push(cubo);
}

function carregarFase(fase) {
    cubos.forEach(c => scene.remove(c));
    cubos = [];

    const bloco = Math.ceil(fase / 5);

    // Ajustes ambientais por Bloco
    if (bloco === 1) light.intensity = 1.0;
    if (bloco === 2) light.intensity = 0.4;
    if (bloco === 3) light.intensity = 0.2;
    if (bloco === 4) {
        light.intensity = 0.1;
        document.body.classList.add('tremor-tela');
        document.getElementById('txt-odio-container').style.display = 'block';
    } else {
        document.body.classList.remove('tremor-tela');
    }

    const titulo = document.getElementById('bloco-titulo');
    titulo.className = `bloco-${bloco}`;
    titulo.innerText = `BLOCO ${bloco}: ${obterNomeBloco(bloco)}`;

    document.getElementById('fase-nome').innerText = `Fase ${fase} de 20`;
    document.getElementById('fase-desc').innerText = obterDescricaoFase(fase);

    const qtdInimigos = 2 + fase;
    for (let i = 0; i < qtdInimigos; i++) {
        criarCubo(bloco);
    }

    document.getElementById('inimigos-qtd').innerText = cubos.length;
}

function obterNomeBloco(b) {
    return ["A Ilusão da Normalidade", "Escassez e Escuridão", "Pane no Hardware", "Modo Sádico"][b - 1];
}

function obterDescricaoFase(f) {
    if (f <= 5) return "Elimine os alvos de teste.";
    if (f <= 10) return "A iluminação está falhando. Mantenha o foco.";
    if (f <= 15) return "ALERTA: Falhas de entrada detectadas nos disparos.";
    return "PERIGO EXTREMO: Controles Invertidos e Dano Fatal!";
}

function onClick(event) {
    if (!jogoIniciado) return;

    const bloco = Math.ceil(faseAtual / 5);

    // Bloco 3: 35% de chance da arma falhar
    if (bloco === 3 && Math.random() < 0.35) {
        document.getElementById('chat-deus-zumbi').innerText = "[SISTEMA]: PANE NO DISPARO!";
        return;
    }

    // Bloco 4: Inversão de coordenadas do mouse
    let clientX = event.clientX;
    if (bloco === 4) {
        clientX = window.innerWidth - event.clientX;
    }

    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubos);

    if (intersects.length > 0) {
        const alvo = intersects[0].object;
        scene.remove(alvo);
        cubos = cubos.filter(c => c !== alvo);

        if (bloco >= 3) {
            pontosOdio += 10;
            document.getElementById('pts-odio').innerText = pontosOdio;
        }

        document.getElementById('inimigos-qtd').innerText = cubos.length;

        if (cubos.length === 0) {
            faseAtual++;
            if (faseAtual <= 20) {
                carregarFase(faseAtual);
            } else {
                alert("SISTEMA DEPURADO! Você superou todas as 20 fases!");
                location.reload();
            }
        }
    } else {
        // Penalidade por erro de clique
        aplicarDano(bloco === 4 ? 50 : 10);
    }
}

function aplicarDano(qtd) {
    vida -= qtd;
    if (vida < 0) vida = 0;

    const barra = document.getElementById('barra-vida');
    barra.style.width = vida + '%';

    if (vida <= 50) barra.style.background = '#ffff00';
    if (vida <= 20) barra.style.background = '#ff0000';

    if (vida <= 0) {
        alert("INTEGRIDADE DESTRUÍDA! Reiniciando fase...");
        vida = 100;
        barra.style.width = '100%';
        barra.style.background = '#00ff00';
        carregarFase(faseAtual);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    cubos.forEach(cubo => {
        cubo.rotation.x += 0.01;
        cubo.rotation.y += 0.01;
        cubo.position.x += cubo.userData.velX;
        cubo.position.y += cubo.userData.velY;

        // Rebater nas bordas da tela
        if (Math.abs(cubo.position.x) > 3.5) cubo.userData.velX *= -1;
        if (Math.abs(cubo.position.y) > 2.5) cubo.userData.velY *= -1;
    });

    renderer.render(scene, camera);
}

init();