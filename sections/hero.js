export function initHero() {
    // =========================
    // PARALLAX GLOW EFFECT
    // =========================
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');

    if (glow1 && glow2) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            glow1.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
            glow2.style.transform = `translate(-${x * 40}px, -${y * 40}px)`;
        });
    }

    // =========================
    // RANDOM VOXEL GLOW
    // =========================
    const voxels = document.querySelectorAll('.cube-grid span');

    function animateVoxels() {
        voxels.forEach((voxel) => {
            voxel.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
            voxel.style.boxShadow = Math.random() > 0.5
                ? '0 0 25px rgba(59,130,246,0.8)'
                : '0 0 10px rgba(139,92,246,0.2)';
        });
    }

    if (voxels.length > 0) {
        setInterval(animateVoxels, 500);
    }
}