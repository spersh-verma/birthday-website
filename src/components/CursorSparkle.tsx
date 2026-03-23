import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
    color: string;
    life: number;
}

const COLORS = ['#FF4D8D', '#F3B9E1', '#FFD700', '#FF8EC4', '#FFC0CB', '#D4A0FF'];

export default function CursorSparkle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);
    const tickRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Bug 5 fix: canvas is position:fixed, so size it to VIEWPORT (not scrollHeight).
        // This ensures it always covers the visible screen correctly on all sections.
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Bug 5 fix: listener is on window (global document level), not any specific element.
        // Use e.clientX / e.clientY (viewport coords) — NOT adding scrollY, since canvas is fixed.
        const onMouseMove = (e: MouseEvent) => {
            tickRef.current++;
            // Spawn particles every other move event for performance
            if (tickRef.current % 2 === 0) {
                for (let i = 0; i < 3; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 0.8 + Math.random() * 1.4;
                    particlesRef.current.push({
                        // Bug 5 fix: store viewport coords (clientX/Y), not page coords
                        x: e.clientX,
                        y: e.clientY,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed - 0.5,
                        alpha: 1,
                        size: 4 + Math.random() * 5,
                        color: COLORS[Math.floor(Math.random() * COLORS.length)],
                        life: 1,
                    });
                }
            }
        };

        // Attach to window — works everywhere on the page regardless of section or scroll position
        window.addEventListener('mousemove', onMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.02);
            for (const p of particlesRef.current) {
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                // Draw a 4-pointed star
                ctx.translate(p.x, p.y);
                ctx.rotate(p.life * Math.PI * 2);
                ctx.beginPath();
                const r = p.size;
                const r2 = r * 0.35;
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
                    const midAngle = angle + Math.PI / 4;
                    ctx.lineTo(Math.cos(midAngle) * r2, Math.sin(midAngle) * r2);
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.06; // subtle gravity
                p.alpha -= 0.025;
                p.life -= 0.02;
                p.size *= 0.97;
            }
            rafRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            // Bug 5 fix: position:fixed + inset-0 + pointer-events:none ensures it overlays
            // the entire visible viewport on EVERY section, not just the top of the page.
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9998, mixBlendMode: 'screen' }}
            aria-hidden="true"
        />
    );
}
