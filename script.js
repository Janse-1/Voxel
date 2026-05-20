import { initHero } from './sections/hero.js';
import { initDemo } from './sections/demo.js';
import { initAnimations } from './sections/animations.js';

// ==========================================
// MOTOR CENTRAL DE IDIOMAS (RESPALDO CORS INTEGRADO)
// ==========================================
let translations = {};

const backupTranslations = {
  "en": {
    "nav-tech": "Technology", "nav-system": "System", "nav-vision": "Vision", "nav-demo": "Demo", "nav-btn": "Explore Platform",
    "hero-tag": "VOLUMETRIC COMPUTING PLATFORM", "hero-title": "Visualize Mathematics Beyond Screens.",
    "hero-desc": "A voxel-based volumetric system capable of transforming mathematical equations into immersive spatial experiences through real-time computational rendering.",
    "btn-watch": "Watch Demo", "btn-explore": "Explore Technology", "stat-grid": "Voxel Grid", "stat-spatial": "Spatial Rendering", "stat-pipeline": "Processing Pipeline",
    "tech-label": "TECHNOLOGY", "tech-title": "A Complete Spatial Visualization Pipeline", "tech-desc": "Combining computational mathematics, embedded systems and volumetric rendering into a unified educational platform.",
    "card1-title": "Python Processing Engine", "card1-desc": "Generates mathematical structures, spatial coordinates and volumetric data representations.",
    "card2-title": "Embedded Translation Layer", "card2-desc": "Converts high-level computational logic into optimized low-level instructions for hardware control.",
    "card3-title": "Voxel Rendering System", "card3-desc": "Displays equations and spatial structures through a physical 3D voxel environment.",
    "sys-label": "SYSTEM ARCHITECTURE", "sys-title": "Mathematical Input To Physical Visualization",
    "pipe-input": "Mathematical Input", "pipe-engine": "Python Engine", "pipe-layer": "C Translation Layer", "pipe-display": "Voxel Display",
    "vision-label": "VISION", "vision-title": "Redefining How Humans Interact With Mathematics",
    "vision-p1": "Our goal is to transform abstract scientific concepts into tangible spatial experiences through volumetric visualization and interactive computational systems.",
    "vision-p2": "We believe the future of STEM learning depends on immersive representations capable of bridging the gap between equations and intuition.",
    "demo-label": "INTERACTIVE DEMO", "demo-title": "Real-Time Volumetric Function Simulation", "demo-box-h3": "Spatial Function Rendering", "demo-box-p": "Interactive 3D mathematical visualization interface.",
    "footer-credits": "Spatial Computing • STEM Visualization • Embedded Systems",
    "nav-horizon": "Horizon",
    "horizon-label": "PLATFORM HORIZON",
    "horizon-title": "The Future of Volumetric Architecture",
    "horizon-desc": "The 16³ voxel engine is only the beginning. Moving from physical hardware instances to a global spatial computing standard.",
    "phase1-title": "Real-Time Discretization Engine",
    "phase1-desc": "Development of the computational core pipeline in Python and deployment of low-latency embedded translation maps onto the local physical spatial array.",
    "phase2-title": "Universal Volumetric API",
    "phase2-desc": "Decoupling software from hardware constraints. Launching an open-source development kit allowing any scientific engine to stream 3D coordinate arrays seamlessly.",
    "phase3-title": "Fluid Dynamics & Medical Tomography",
    "phase3-desc": "Expanding the visual engine to stream multi-variable scientific fields: mapping vector fields, real-time wave propagation mechanics, and volumetric medical data slicing."
  },
  "es": {
    "nav-tech": "Tecnología", "nav-system": "Sistema", "nav-vision": "Visión", "nav-demo": "Demo", "nav-btn": "Explorar Plataforma",
    "hero-tag": "PLATAFORMA DE COMPUTACIÓN VOLUMÉTRICA", "hero-title": "Visualiza las Matemáticas Más Allá de las Pantallas.",
    "hero-desc": "Un sistema volumétrico basado en vóxeles capaz de transformar ecuaciones matemáticas en experiencias espaciales inmersivas mediante renderizado computacional en tiempo real.",
    "btn-watch": "Ver Demo", "btn-explore": "Explorar Tecnología", "stat-grid": "Matriz de Vóxeles", "stat-spatial": "Renderizado Espacial", "stat-pipeline": "Flujo de Procesamiento",
    "tech-label": "TECNOLOGÍA", "tech-title": "Un Flujo Completo de Visualización Espacial", "tech-desc": "Combinando matemáticas computacionales, sistemas embebidos y renderizado volumétrico en una plataforma educativa unificada.",
    "card1-title": "Motor de Procesamiento Python", "card1-desc": "Genera estructuras matemáticas, coordenadas espaciales y representaciones de datos volumétricos.",
    "card2-title": "Capa de Traducción Embebida", "card2-desc": "Convierte la lógica computacional de alto nivel en instrucciones optimizadas de bajo nivel para el control del hardware.",
    "card3-title": "Sistema de Renderizado de Vóxeles", "card3-desc": "Muestra ecuaciones y estructuras espaciales a través de un entorno físico de vóxeles en 3D.",
    "sys-label": "ARQUITECTURA DEL SISTEMA", "sys-title": "De la Entrada Matemática a la Visualización Física",
    "pipe-input": "Entrada Matemática", "pipe-engine": "Motor de Python", "pipe-layer": "Capa de Traducción en C", "pipe-display": "Pantalla de Vóxeles",
    "vision-label": "VISIÓN", "vision-title": "Redefiniendo Cómo los Humanos Interactúan con las Matemáticas",
    "vision-p1": "Nuestro objetivo es transformar conceptos científicos abstractos en experiencias espaciales tangibles mediante visualización volumétrica y sistemas computacionales interactivos.",
    "vision-p2": "Creemos que el futuro del aprendizaje STEM depende de representaciones inmersivas capaces de cerrar la brecha entre las ecuaciones y la intuición.",
    "demo-label": "DEMO INTERACTIVA", "demo-title": "Simulación de Funciones Volumétricas en Tiempo Real", "demo-box-h3": "Renderizado Espacial de Funciones", "demo-box-p": "Interfaz interactiva de visualización matemática en 3D.",
    "footer-credits": "Computación Espacial • Visualización STEM • Sistemas Embebidos",
    "nav-horizon": "Horizonte",
    "horizon-label": "HORIZONTE DE LA PLATAFORMA",
    "horizon-title": "El Futuro de la Arquitectura Volumétrica",
    "horizon-desc": "El motor de vóxeles 16³ es solo el comienzo. Pasando de instancias físicas de hardware a un estándar global de computación espacial.",
    "phase1-title": "Motor de Discretización en Tiempo Real",
    "phase1-desc": "Desarrollo del núcleo computacional en Python y despliegue de mapas de traducción embebidos de baja latencia en la matriz espacial física local.",
    "phase2-title": "API Volumétrica Universal",
    "phase2-desc": "Desacoplando el software de las limitaciones del hardware. Lanzando un kit de desarrollo de código abierto que permita a cualquier motor científico transmitir matrices de coordenadas 3D sin problemas.",
    "phase3-title": "Dinámica de Fluidos y Tomografía Médica",
    "phase3-desc": "Expandiendo el motor visual para transmitir campos científicos multivariables: mapeo de campos vectoriales, mecánica de propagación de ondas en tiempo real y corte volumétrico de datos médicos."
  }
};

async function initTranslations() {
    try {
        const response = await fetch('./languages.json');
        if (!response.ok) throw new Error();
        translations = await response.json();
    } catch {
        translations = backupTranslations;
    }
    setLanguage(localStorage.getItem('preferred-lang') || 'en');
}

function setLanguage(lang) {
    localStorage.setItem('preferred-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang]?.[key]) element.textContent = translations[lang][key];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`)?.classList.add('active');
}

// ==========================================
// ORQUESTADOR DE INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar lógica de traducción global
    initTranslations();
    document.getElementById('btn-en')?.addEventListener('click', () => setLanguage('en'));
    document.getElementById('btn-es')?.addEventListener('click', () => setLanguage('es'));

    // Inicializar los componentes modulares de cada sección
    initHero();
    initDemo();
    initAnimations();
});

document.addEventListener('DOMContentLoaded', () => {
    const explorePlatformBtn = document.querySelector('[data-translate="nav-btn"]');
    
    if (explorePlatformBtn) {
        explorePlatformBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Redirección directa al estudio de desarrollo de la plataforma
            window.location.href = 'platform.html';
        });
    }
});