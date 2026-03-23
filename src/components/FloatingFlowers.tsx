import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const flowers = [
  { src: '/bouquet.png', size: 180, x: '5%', y: '10%', delay: 0 },
  { src: '/bouquet.png', size: 140, x: '85%', y: '15%', delay: 1 },
  { src: '/bouquet.png', size: 160, x: '90%', y: '60%', delay: 2 },
  { src: '/bouquet.png', size: 120, x: '3%', y: '70%', delay: 1.5 },
  { src: '/bouquet.png', size: 100, x: '15%', y: '45%', delay: 0.5 },
  { src: '/bouquet.png', size: 130, x: '75%', y: '85%', delay: 2.5 },
  { src: '/bouquet.png', size: 90, x: '50%', y: '5%', delay: 3 },
  { src: '/bouquet.png', size: 110, x: '95%', y: '35%', delay: 1.8 },
];

export default function FloatingFlowers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const flowerEls = containerRef.current.querySelectorAll('.floating-flower');

    // Float animation per flower
    flowerEls.forEach((flower, index) => {
      const duration = 7 + Math.random() * 5;
      const yMove = -12 - Math.random() * 12;
      const rotation = 2 + Math.random() * 4;

      gsap.to(flower, {
        y: yMove,
        rotation,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      });
    });

    // Subtle mouse parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      // Normalise to -1 … +1
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      // Smooth lerp toward target
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      flowerEls.forEach((flower, i) => {
        const strength = 8 + i * 1.5; // each flower reacts slightly differently
        const el = flower as HTMLElement;
        // Only apply parallax x/y offset on top of GSAP float (additive via data attrs)
        el.style.transform = (el.style.transform || '').replace(/\s*translate\(.*?\)/g, '') +
          ` translate(${currentX * strength}px, ${currentY * strength * 0.6}px)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    tick();

    return () => {
      flowerEls.forEach(flower => gsap.killTweensOf(flower));
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
    >
      {flowers.map((flower, index) => (
        <img
          key={index}
          src={flower.src}
          alt=""
          className="floating-flower absolute opacity-40"
          style={{
            width: flower.size,
            height: 'auto',
            left: flower.x,
            top: flower.y,
          }}
        />
      ))}
    </div>
  );
}
