import { useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
  scale: number;
}

const EMOJIS = ['😂', '🤣', '😹', '🤪', '😜', '🙃', '😋', '🤭'];

export default function DoNotPressButton() {
  const [clickCount, setClickCount] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleIdRef = useRef(0);

  const createExplosion = useCallback(() => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 25; i++) {
      const angle = (Math.PI * 2 * i) / 25 + Math.random() * 0.5;
      const distance = 100 + Math.random() * 200;
      
      newParticles.push({
        id: particleIdRef.current++,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        rotation: Math.random() * 360 - 180,
        scale: 0.5 + Math.random() * 1,
      });
    }
    
    setParticles(newParticles);
    setShowMessage(true);
    
    // Animate particles
    setTimeout(() => {
      const particleElements = document.querySelectorAll('.emoji-particle');
      particleElements.forEach((el, i) => {
        const particle = newParticles[i];
        if (!particle) return;
        
        gsap.fromTo(el,
          { 
            x: centerX, 
            y: centerY, 
            scale: 0, 
            rotation: 0,
            opacity: 1 
          },
          { 
            x: particle.x, 
            y: particle.y, 
            scale: particle.scale, 
            rotation: particle.rotation,
            opacity: 0,
            duration: 1.5 + Math.random(),
            ease: 'power2.out',
            onComplete: () => {
              if (i === particleElements.length - 1) {
                setParticles([]);
              }
            }
          }
        );
      });
    }, 50);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, []);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 3) {
      createExplosion();
      setClickCount(0);
    } else {
      // Shake animation for first two clicks
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          x: "+=5",
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          ease: 'power2.out',
        });
      }
    }
  };

  return (
    <>
      {/* Fixed sidebar button */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] group"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="inline-block bg-hotPink text-white font-caveat font-bold text-lg px-3 py-6 rounded-full shadow-lg transform rotate-180 hover:shadow-glow hover:scale-105 transition-all duration-300">
          DO NOT PRESS
        </span>
      </button>
      
      {/* Explosion message */}
      {showMessage && (
        <div className="fixed right-24 top-1/2 -translate-y-1/2 z-[100] bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sticker animate-pop-in">
          <p className="font-caveat font-bold text-xl text-gray-800">
            I said It might do something!
          </p>
        </div>
      )}
      
      {/* Emoji particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="emoji-particle fixed z-[99] pointer-events-none text-4xl"
          style={{
            left: 0,
            top: 0,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </>
  );
}
