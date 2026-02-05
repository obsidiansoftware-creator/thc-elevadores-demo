let currentFloor = 1;
let isMoving = false;
let emergency = false;
let doorState = "CLOSED"; 

const elevator = document.getElementById("elevator");
const statusText = document.getElementById("status");
const floorText = document.getElementById("floor");

const FLOOR_HEIGHT = 70; // px por piso

function moveElevator(targetFloor) {
    if (doorState !== "CLOSED") {
        logEvent("Movimiento bloqueado: puertas abiertas");
        isMoving = false;
        return;
    }

    const distance = (targetFloor - 1) * FLOOR_HEIGHT;
    elevator.style.bottom = `${distance}px`;

    const travelTime = Math.abs(targetFloor - currentFloor) * 1200;

    setTimeout(() => {
        currentFloor = targetFloor;
        updateFloor();
        arriveAtFloor();
    }, travelTime);
}

/* 🚨 Emergencia real */
function emergencyStop() {
    systemMode = "EMERGENCIA";
    isMoving = false;
    requestQueue = [];

    updateStatus("🚨 PARO DE EMERGENCIA");
    logEvent("Paro de emergencia activado");

    openDoors();
}

function resetSystem() {
    systemMode = "NORMAL";
    updateStatus("Sistema restablecido");
    logEvent("Sistema rearmado");
}

const floorImages = {
    1: "assets/thclogoblanco.png",
    2: "assets/thclogoblanco.png",
    3: "assets/thclogoblanco.png",
    4: "assets/thclogoblanco.png",
    5: "assets/thclogoblanco.png"
};

function openDoors() {
    if (doorState !== "CLOSED") return;

    doorState = "OPENING";
    elevator.classList.add("open");

    setTimeout(() => {
        doorState = "OPEN";
        logEvent("Puertas abiertas");
    }, 1200);
}

function closeDoors(callback) {
    if (doorState !== "OPEN") {
        if (callback) callback();
        return;
    }

    doorState = "CLOSING";
    elevator.classList.remove("open");

    setTimeout(() => {
        doorState = "CLOSED";
        logEvent("Puertas cerradas");
        if (callback) callback();
    }, 1200);
}


function updateStatus(text) {
    statusText.textContent = text;
}

function updateFloor() {
    floorText.textContent = currentFloor;
}

/* 🚀 Llamar elevador a un piso */
function callElevator(targetFloor) {
    if (isMoving || systemMode !== "NORMAL") return;

    isMoving = true;
    updateStatus("Cerrando puertas...");

    closeDoors(() => {
        updateStatus("En movimiento...");
        simulateLoad();

        if (loadWeight > 450) {
            isMoving = false;
            openDoors();
            return;
        }

        moveElevator(targetFloor);
    });
}


/* 🛗 Movimiento realista */
function moveElevator(targetFloor) {
    updateStatus("En movimiento...");
    const distance = (targetFloor - 1) * FLOOR_HEIGHT;

    elevator.style.bottom = `${distance}px`;

    const travelTime = Math.abs(targetFloor - currentFloor) * 1200;

    setTimeout(() => {
        currentFloor = targetFloor;
        updateFloor();
        arriveAtFloor();
    }, travelTime);
}

/* ✅ Llegada */
function arriveAtFloor() {
    updateStatus("Puertas abriéndose...");

    const img = document.getElementById("floorImage");
    img.src = floorImages[currentFloor] || "img/default.jpg";

    openDoors();

    setTimeout(() => {
        updateStatus("En espera");
        isMoving = false;
        processQueue();
    }, 2000);
}


/* 🚨 Paro de emergencia */
function emergencyStop() {
    emergency = true;
    isMoving = false;

    updateStatus("🚨 EMERGENCIA");
    closeDoors();

    elevator.style.transition = "none";

    setTimeout(() => {
        elevator.style.transition = "bottom 2s ease-in-out";
        emergency = false;
        updateStatus("Sistema reiniciado");
    }, 3000);
}

/* 🔁 Auto demo (modo exhibición) */
setInterval(() => {
    if (!isMoving && !emergency) {
        const randomFloor = Math.floor(Math.random() * 5) + 1;
        callElevator(randomFloor);
    }
}, 12000);

/* ================================
   SISTEMA AVANZADO THC ELEVADORES
================================ */

let requestQueue = [];
let systemMode = "NORMAL"; // NORMAL | MANTENIMIENTO | EMERGENCIA
let loadWeight = 0;

/* 📟 Log del sistema */
function logEvent(event) {
    console.log(`[THC LOG] ${new Date().toLocaleTimeString()} - ${event}`);
}

/* 📥 Agregar solicitud a cola */
function requestFloor(floor) {
    if (systemMode !== "NORMAL") {
        updateStatus("Sistema no disponible");
        return;
    }

    if (!requestQueue.includes(floor)) {
        requestQueue.push(floor);
        logEvent(`Solicitud agregada: Piso ${floor}`);
    }

    processQueue();
}

/* 🔁 Procesar cola */
function processQueue() {
    if (isMoving || requestQueue.length === 0) return;

    const nextFloor = requestQueue.shift();
    callElevator(nextFloor);
}

/* 🔐 Bloqueo inteligente */
function callElevator(targetFloor) {
    if (isMoving || systemMode !== "NORMAL") return;

    isMoving = true;
    updateStatus("Verificando sistema...");
    closeDoors();

    setTimeout(() => {
        simulateLoad();
        moveElevator(targetFloor);
    }, 1200);
}

/* ⚖️ Simulación de carga */
function simulateLoad() {
    loadWeight = Math.floor(Math.random() * 600);

    if (loadWeight > 450) {
        updateStatus("⚠️ Sobrecarga");
        logEvent("Sobrecarga detectada");
        isMoving = false;
        openDoors();
        return;
    }

    logEvent(`Carga: ${loadWeight} kg`);
}

/* 🧠 Diagnóstico automático */
function systemCheck() {
    updateStatus("Ejecutando diagnóstico...");
    logEvent("Diagnóstico iniciado");

    setTimeout(() => {
        updateStatus("Sistema OK");
        logEvent("Diagnóstico correcto");
    }, 2000);
}

/* 🧰 Modo mantenimiento */
function maintenanceMode() {
    systemMode = "MANTENIMIENTO";
    updateStatus("🧰 Mantenimiento");
    logEvent("Modo mantenimiento activado");
    closeDoors();
}

/* ▶️ Reactivar sistema */
function resumeSystem() {
    systemMode = "NORMAL";
    updateStatus("Sistema operativo");
    logEvent("Sistema reactivado");
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

const whatsappBtn = document.getElementById("whatsappBtn");
const chatBot = document.getElementById("chatBot");

whatsappBtn.addEventListener("click", toggleChat);

function toggleChat() {
    chatBot.classList.toggle("hidden");
}

/* Mensaje automático estilo bot */
setTimeout(() => {
    if (chatBot.classList.contains("hidden")) {
        chatBot.classList.remove("hidden");
    }
}, 8000);

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar.classList.contains('show')) {
            new bootstrap.Collapse(navbar).toggle();
        }
    });
});

const revealSections = document.querySelectorAll('.reveal-section');

const revealOnScroll = () => {
    revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.75;

        if (sectionTop < triggerPoint) {
            section.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Ejecuta al cargar

