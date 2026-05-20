// Variable global para almacenar las traducciones
let translations = {};

// 1. Cargar el archivo JSON
async function loadTranslations() {
    try {
        const response = await fetch('./languages.json');
        translations = await response.json();
        
        // Revisar si el usuario ya tenía un idioma guardado, si no, usar Inglés ('en') por defecto
        const savedLang = localStorage.getItem('preferred-lang') || 'en';
        setLanguage(savedLang);
    } catch (error) {
        console.error("Error cargando las traducciones:", error);
    }
}

// 2. Función para cambiar el idioma en el HTML
function setLanguage(lang) {
    // Guardar preferencia en el navegador
    localStorage.setItem('preferred-lang', lang);
    
    // Cambiar el atributo lang en la etiqueta HTML (bueno para SEO y accesibilidad)
    document.documentElement.lang = lang;

    // Buscar todos los elementos que tengan el atributo 'data-translate'
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Actualizar el estado visual de los botones del selector
    updateLanguageButtons(lang);
}

// 3. Actualizar la clase activa en los botones
function updateLanguageButtons(activeLang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.getElementById(`btn-${activeLang}`);
    if (activeBtn) activeBtn.classList.add('active');
}

// 4. Escuchar los clics en los botones selector de idioma
document.getElementById('btn-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('btn-es').addEventListener('click', () => setLanguage('es'));

// Inicializar el script cuando cargue el documento
document.addEventListener('DOMContentLoaded', loadTranslations);