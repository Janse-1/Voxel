export function initDemo() {
    const demoBox = document.querySelector('.demo-box');
    if (!demoBox) return;

    // Evitamos duplicados limpiando paneles previos si es que el script se reinicializa
    const oldPanel = document.querySelector('.equation-interactive-panel');
    if (oldPanel) oldPanel.remove();

    // ==========================================
    // 1. CREAR EL PANEL INTERACTIVO DE ABAJO
    // ==========================================
    const panelContainer = document.createElement('div');
    panelContainer.className = 'equation-interactive-panel';
    
    // Estilos avanzados para integrarse debajo del contenido original sin romper el diseño
    Object.assign(panelContainer.style, {
        position: 'relative',
        zIndex: '10',
        width: '100%',
        maxWidth: '850px',
        margin: '40px auto 0 auto', // Espaciado superior para separarse de ".demo-content"
        padding: '25px',
        background: 'rgba(10, 11, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        webkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '14px',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.7)',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        alignItems: 'center'
    });

    panelContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 18px;">
            <div>
                <label style="display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; color: #9ca3af;">Mathematical Target</label>
                <select id="eq-preset" style="width: 100%; padding: 10px 12px; background: #07080e; border: 1px solid rgba(59, 130, 246, 0.25); color: #fff; border-radius: 6px; font-family: monospace; cursor: pointer; outline: none; font-size: 0.85rem;">
                    <option value="ripple">z = sin(x² + y²)</option>
                    <option value="waves">z = cos(x) * sin(y)</option>
                    <option value="saddle">z = (x² - y²) * 0.1</option>
                </select>
            </div>

            <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <label style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: #9ca3af;">Frequency (Ω)</label>
                    <span id="val-freq" style="font-family: monospace; font-size: 0.8rem; color: #3b82f6;">1.1x</span>
                </div>
                <input type="range" id="slider-freq" min="0.5" max="3.0" step="0.1" value="1.1" style="width: 100%; accent-color: #3b82f6; cursor: pointer;">
            </div>

            <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <label style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: #9ca3af;">Amplitude (A)</label>
                    <span id="val-amp" style="font-family: monospace; font-size: 0.8rem; color: #3b82f6;">1.0x</span>
                </div>
                <input type="range" id="slider-amp" min="0.2" max="2.0" step="0.1" value="1.0" style="width: 100%; accent-color: #3b82f6; cursor: pointer;">
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; border: 1px solid rgba(59,130,246,0.1); font-family: monospace; font-size: 0.7rem; color: #10b981; display: flex; justify-content: space-between;">
                <span>● VOLUMETRIC PIPE</span>
                <span id="telemetry-log">GRID: 16x16 READY</span>
            </div>
        </div>

        <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
            <canvas id="voxel-matrix-canvas" width="360" height="300" style="background: #040508; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); max-width: 100%;"></canvas>
        </div>
    `;

    // Lo agregamos de forma adyacente abajo de los textos (.demo-content) de la sección
    demoBox.appendChild(panelContainer);

    // ==========================================
    // 2. MOTOR DEL CANVAS ISOMÉTRICO (NUEVO)
    // ==========================================
    const canvas = document.getElementById('voxel-matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    const sliderFreq = document.getElementById('slider-freq');
    const sliderAmp = document.getElementById('slider-amp');
    const eqPreset = document.getElementById('eq-preset');
    const valFreq = document.getElementById('val-freq');
    const valAmp = document.getElementById('val-amp');
    const telemetryLog = document.getElementById('telemetry-log');

    const gridSize = 16; 
    let tick = 0;

    // Algoritmo de proyección para simular perspectiva 3D en el plano
    function project(x, y, z) {
        const isoX = (x - y) * Math.cos(Math.PI / 6);
        const isoY = (x + y) * Math.sin(Math.PI / 6) - z;
        return {
            x: canvas.width / 2 + isoX,
            y: canvas.height / 2 + isoY + 20
        };
    }

    function renderVoxelMatrix() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tick += 0.03;

        const freq = parseFloat(sliderFreq.value);
        const amp = parseFloat(sliderAmp.value);
        const equation = eqPreset.value;

        // Dibujamos de atrás hacia adelante para la superposición matemática correcta
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                
                const cx = (x - gridSize / 2) * 0.6;
                const cy = (y - gridSize / 2) * 0.6;
                let cz = 0;

                if (equation === 'ripple') {
                    cz = Math.sin((cx * cx + cy * cy) * 0.4 * freq - tick) * amp * 12;
                } else if (equation === 'waves') {
                    cz = Math.cos(cx * freq + tick) * Math.sin(cy * freq) * amp * 14;
                } else if (equation === 'saddle') {
                    cz = Math.sin(tick) * (cx * cx - cy * cy) * freq * amp * 3;
                }

                const spaceScale = 13; 
                const pt = project(cx * spaceScale, cy * spaceScale, cz);
                const size = Math.max(2, 4 + cz * 0.08); 
                const opacity = Math.max(0.2, Math.min(1, (cz + 15) / 30));

                ctx.beginPath();
                ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
                
                // Mezcla tonal ciberpunk azul-violeta según el eje Z calculado
                const hue = 215 + (cz * 1.8); 
                ctx.fillStyle = `hsla(${hue}, 85%, 60%, ${opacity})`;
                ctx.fill();
            }
        }

        requestAnimationFrame(renderVoxelMatrix);
    }

    renderVoxelMatrix();

    // ==========================================
    // 3. LISTENERS PARA ENTRADAS Y PARÁMETROS
    // ==========================================
    function updateTelemetry() {
        const f = sliderFreq.value;
        const a = sliderAmp.value;
        const eq = eqPreset.value;
        valFreq.textContent = `${f}x`;
        valAmp.textContent = `${a}x`;
        telemetryLog.textContent = `MOD: ${eq.toUpperCase()} [F:${f} A:${a}]`;
    }

    sliderFreq.addEventListener('input', updateTelemetry);
    sliderAmp.addEventListener('input', updateTelemetry);
    eqPreset.addEventListener('change', updateTelemetry);

    // ==========================================
    // 4. ACCIÓN DEL BOTÓN "WATCH DEMO"
    // ==========================================
    const watchDemoBtn = document.querySelector('[data-translate="btn-watch"]');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Viaja elegantemente a la grilla inferior
            panelContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // ==========================================
    // 5. ANIMACIÓN ORIGINAL DE FONDO GRADIENTE
    // ==========================================
    let angle = 0;
    function animateDemoGradient() {
        angle += 0.5;
        demoBox.style.background = `
            radial-gradient(
                circle at ${50 + Math.sin(angle * 0.02) * 20}%
                ${50 + Math.cos(angle * 0.02) * 20}%,
                rgba(59,130,246,0.16),
                rgba(139,92,246,0.07),
                rgba(255,255,255,0.01)
            )
        `;
        requestAnimationFrame(animateDemoGradient);
    }
    animateDemoGradient();
}