import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap, ScrollTrigger, letterStagger, splitLetters } from '../lib/animations';
import { config } from '../config';

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Cinematic fade-in from black on scroll entry
  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    // Heading split letters
    if (headingRef.current) {
      const lines = [config.closingHeadingLine1, config.closingHeadingLine2];
      headingRef.current.innerHTML = lines
        .map(l => `<span class="block overflow-hidden">${splitLetters(l)}</span>`)
        .join('');
    }

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }
        );
        letterStagger(headingRef.current, { stagger: 0.04, delay: 0.35 });
        if (subRef.current) {
          gsap.fromTo(subRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, delay: 0.9, ease: 'expo.out', clearProps: 'all' }
          );
        }
      },
    });


    // Looping glow pulse on radial overlay
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.35, scale: 1.12, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }
  }, []);

  // Floating star data
  const stars = [
    { top: '12%', left: '8%', size: '1.1rem', delay: '0s', color: '#FFD700' },
    { top: '25%', right: '12%', size: '0.8rem', delay: '0.5s', color: '#FF4D8D' },
    { top: '50%', left: '5%', size: '0.6rem', delay: '1s', color: '#D4A0FF' },
    { top: '70%', right: '8%', size: '1rem', delay: '0.2s', color: '#FFD700' },
    { top: '85%', left: '20%', size: '0.75rem', delay: '0.8s', color: '#FF8EC4' },
    { top: '40%', right: '25%', size: '0.9rem', delay: '1.3s', color: '#FF4D8D' },
    { top: '60%', left: '40%', size: '0.65rem', delay: '0.4s', color: '#D4A0FF' },
    { top: '18%', left: '55%', size: '1.2rem', delay: '0.7s', color: '#FFD700' },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#111111] flex items-center justify-center relative py-20 overflow-hidden">
      {/* Radial glow behind content */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 77, 141, 0.18) 0%, transparent 70%)',
          opacity: 0.15,
        }}
      />

      {/* Floating sparkle stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="sparkle-star"
          style={{
            top: s.top, left: s.left, right: s.right,
            fontSize: s.size, animationDelay: s.delay, color: s.color,
          }}
        >✦</span>
      ))}

      <div ref={contentRef} className="max-w-4xl mx-auto px-6 text-center" style={{ opacity: 0 }}>
        {/* Main text */}
        <div className="mb-16">
          <h2
            ref={headingRef}
            className="font-montserrat font-black text-3xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          >
            {config.closingHeadingLine1} {config.closingHeadingLine2}
          </h2>
          <p ref={subRef} className="font-caveat text-2xl md:text-3xl text-hotPink" style={{ opacity: 0 }}>
            {config.closingSubtitle}
          </p>
        </div>

        {/* Sparkles decoration */}
        <div className="flex justify-center gap-6 mb-12">
          <Sparkles className="w-8 h-8 text-yellow-400 animate-sparkle" />
          <Sparkles className="w-12 h-12 text-hotPink animate-sparkle" style={{ animationDelay: '0.3s' }} />
          <Sparkles className="w-8 h-8 text-purple-400 animate-sparkle" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>
    </div>
  );
}
