import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap, scrollFadeInUp } from '../lib/animations';
import { config } from '../config';

export default function IntroSection() {
  const questionRef = useRef<HTMLHeadingElement>(null);
  const screen2Ref = useRef<HTMLDivElement>(null);
  const dateBadgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  // Scale POP animation on whole heading
  useEffect(() => {
    if (!questionRef.current) return;
    gsap.fromTo(
      questionRef.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)', delay: 0.1 }
    );
  }, []);

  // Screen 2 — staggered fade-ins
  useEffect(() => {
    if (!screen2Ref.current) return;
    scrollFadeInUp(dateBadgeRef.current, { y: 50, duration: 0.85, start: 'top 78%' });
    scrollFadeInUp(titleRef.current, { y: 40, duration: 0.85, delay: 0.15, start: 'top 75%' });
    scrollFadeInUp(pillRef.current, { y: 30, duration: 0.6, delay: 0.3, start: 'top 90%' });
  }, []);

  // Split question text into lines for the heading
  const questionLines = config.introQuestion.split('\n');

  return (
    <div className="section-pinned flex items-center">
      <div className="w-full">
        {/* Screen 1: The Question */}
        <div className="min-h-screen flex items-center justify-center sticky top-0 left-0 w-full overflow-hidden">
          <div className="relative">
            <h2
              ref={questionRef}
              className="heading-xl text-gray-800 text-center px-4 relative z-10"
              style={{ opacity: 0 }}
            >
              {questionLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < questionLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <img
              src="/thinking_monkey.png"
              alt="Thinking Monkey"
              className="absolute -right-12 md:-right-32 top-1/2 -translate-y-[60%] -mt-4 md:-mt-8 w-24 md:w-40 object-contain z-0 animate-bounce-soft"
            />
          </div>

          {/* Background twinkle stars */}
          {[
            { top: '18%', right: '18%', size: '0.8rem', delay: '0s' },
            { top: '70%', left: '12%', size: '0.65rem', delay: '0.5s' },
            { top: '35%', right: '32%', size: '0.5rem', delay: '1.1s' },
            { top: '80%', right: '25%', size: '0.9rem', delay: '0.3s' },
            { top: '12%', left: '30%', size: '0.7rem', delay: '0.8s' },
            { top: '55%', left: '45%', size: '1rem', delay: '0.1s' },
          ].map((s, i) => (
            <span
              key={i}
              className="sparkle-star text-yellow-400"
              style={{ top: s.top, right: s.right, left: s.left, fontSize: s.size, animationDelay: s.delay }}
            >✦</span>
          ))}

          <Sparkles className="absolute top-[20%] right-[20%] w-12 h-12 text-yellow-400 animate-sparkle opacity-60" />
        </div>

        {/* Screen 2: The Answer */}
        <div ref={screen2Ref} className="min-h-screen flex items-center justify-center relative bg-babyPink/80">
          <div className="flex flex-col items-center gap-8 px-4 relative z-10">
            {/* Date and Shocked GIF */}
            <div ref={dateBadgeRef} className="flex items-center gap-8 mb-8" style={{ opacity: 0 }}>
              <img
                src="/Shocked_GIF.gif"
                alt="Shocked"
                className="w-24 h-24 md:w-48 md:h-48 object-contain"
              />
              <p className="font-caveat font-bold text-6xl md:text-8xl text-hotPink">
                {config.introDate}
              </p>
            </div>

            {/* Title with inline cat sticker matching font size */}
            <div className="relative inline-block">
              <p
                ref={titleRef}
                className="font-caveat font-bold text-7xl md:text-9xl text-hotPink text-center leading-tight flex items-center justify-center gap-2 md:gap-4"
                style={{ opacity: 0 }}
              >
                {config.introTitle}
                <img
                  src="/heppy_cat.png"
                  alt="Happy Cat"
                  className="h-[1.7em] w-auto object-contain z-0 animate-float-slow -translate-y-4 md:-translate-y-6"
                />
              </p>
            </div>

            {/* Polaroid photo */}
            <div
              className="polaroid-frame rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl max-w-[420px] w-full mt-16"
            >
              <img
                src={config.introPhoto}
                alt={config.introPhotoAlt}
                className="w-full h-auto aspect-[4/5] object-cover rounded-sm"
              />
              <p className="font-caveat text-3xl text-center text-gray-600 mt-6">{config.introPhotoCaption}</p>
            </div>

            <div ref={pillRef} className="flex justify-center mt-8 w-full" style={{ opacity: 0 }}>
              <div className="hot-pink-pill flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {config.introPill}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
