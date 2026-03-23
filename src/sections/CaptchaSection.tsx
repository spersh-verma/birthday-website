import { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap } from '../lib/animations';
import { config } from '../config';

interface CaptchaSectionProps {
  onPass: () => void;
  isPassed: boolean;
}

interface SparkParticle { id: number; x: number; y: number; color: string; }

export default function CaptchaSection({ onPass, isPassed }: CaptchaSectionProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showError, setShowError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [particles, setParticles] = useState<SparkParticle[]>([]);
  const [verifyRipple, setVerifyRipple] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const verifyBtnRef = useRef<HTMLButtonElement>(null);
  const cellRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const particleIdRef = useRef(0);

  // Container fade-in on mount
  useEffect(() => {
    if (containerRef.current && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 0.1 }
      );
    }
  }, []);

  const spawnParticles = (btnEl: HTMLButtonElement) => {
    const rect = btnEl.getBoundingClientRect();
    const colors = ['#FF4D8D', '#FFD700', '#F3B9E1', '#D4A0FF', '#FF8EC4'];
    const newParticles: SparkParticle[] = Array.from({ length: 5 }, () => ({
      id: particleIdRef.current++,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 40,
      y: rect.top + rect.height / 2 + (Math.random() - 0.5) * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)));
    }, 700);
  };

  const toggleSelection = useCallback((id: number) => {
    const btnEl = cellRefs.current.get(id);
    if (btnEl) {
      gsap.fromTo(btnEl, { scale: 0.87 }, { scale: 1, duration: 0.4, ease: 'back.out(2.5)' });
      if (!selectedIds.includes(id)) spawnParticles(btnEl);
    }
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    setShowError(false);
  }, [selectedIds]);

  const handleVerify = () => {
    setIsVerifying(true);
    if (verifyBtnRef.current) {
      gsap.fromTo(verifyBtnRef.current, { scale: 1 }, { scale: 0.92, yoyo: true, repeat: 1, duration: 0.1 });
      setVerifyRipple(true);
      setTimeout(() => setVerifyRipple(false), 700);
    }

    const correctIds = config.captchaImages.filter(item => item.isCorrect).map(item => item.id);
    const isCorrect =
      selectedIds.length === correctIds.length &&
      selectedIds.every(id => correctIds.includes(id));

    setTimeout(() => {
      if (isCorrect) {
        onPass();
      } else {
        setFailCount(prev => prev + 1);
        setShowError(true);
        setIsVerifying(false);
      }
    }, 500);
  };

  if (isPassed) return null;

  return (
    <div ref={containerRef} className="section-pinned flex items-center justify-center p-4">
      {/* Floating sparkle particles (DOM-based, positional) */}
      {particles.map(p => (
        <span
          key={p.id}
          className="fixed pointer-events-none z-50 text-lg"
          style={{
            left: p.x,
            top: p.y,
            color: p.color,
            animation: 'pop-in 0.35s ease-out forwards, float-sparkle 0.7s ease-out forwards',
            lineHeight: 1,
          }}
        >✦</span>
      ))}

      {/* Floating hint stickers — appear after 3+ failures */}
      {failCount >= 3 && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute left-[3vw] top-[18vh] -rotate-12 animate-float">
            <div className="bg-yellow-300 text-gray-800 px-4 py-2 rounded-full font-caveat font-bold text-base md:text-lg shadow-md">
              {config.captchaHints[0]}
            </div>
          </div>
          <div className="absolute right-[3vw] top-[22vh] rotate-[10deg] animate-float-slow">
            <div className="bg-hotPink text-white px-4 py-2 rounded-full font-caveat font-bold text-base md:text-lg shadow-md">
              {config.captchaHints[1]}
            </div>
          </div>
          <div className="absolute left-[4vw] bottom-[18vh] rotate-[6deg] animate-float">
            <div className="bg-purple-400 text-white px-4 py-2 rounded-full font-caveat font-bold text-base md:text-lg shadow-md">
              {config.captchaHints[2]}
            </div>
          </div>
          <div className="absolute right-[4vw] bottom-[22vh] -rotate-[8deg] animate-float-slow">
            <div className="bg-pink-300 text-gray-800 px-4 py-2 rounded-full font-caveat font-bold text-base md:text-lg shadow-md">
              {config.captchaHints[3]}
            </div>
          </div>
        </div>
      )}

      {/* Background twinkle stars */}
      {['10%', '85%', '20%', '70%', '50%', '40%', '90%'].map((left, i) => (
        <span
          key={i}
          className="sparkle-star text-yellow-400"
          style={{
            left,
            top: ['8%', '15%', '80%', '75%', '12%', '88%', '45%'][i],
            animationDelay: `${i * 0.45}s`,
            fontSize: ['0.7rem', '1rem', '0.8rem', '0.65rem', '0.9rem', '0.75rem', '1.1rem'][i],
          }}
        >✦</span>
      ))}

      {/* Main CAPTCHA card */}
      <div ref={cardRef} className="glass-card w-full max-w-[480px] p-4 md:p-6 relative flex flex-col items-center z-20">
        {/* Header */}
        <div className="mb-3 text-center">
          <h1 className="font-montserrat font-black text-xl md:text-2xl text-gray-800 mb-1">
            {config.captchaTitle}
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            {config.captchaSubtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[360px]">
          {config.captchaImages.map((item) => (
            <button
              key={item.id}
              ref={el => { if (el) cellRefs.current.set(item.id, el); }}
              onClick={() => toggleSelection(item.id)}
              className={`captcha-grid-cell aspect-square relative rounded-lg overflow-hidden border-[3px] transition-all duration-200
                hover:scale-[1.07] hover:shadow-xl
                ${selectedIds.includes(item.id)
                  ? 'border-hotPink shadow-[0_0_16px_rgba(255,105,180,0.55)] scale-[0.96]'
                  : 'border-transparent hover:border-pink-300 hover:-rotate-1'
                }`}
              style={{ transition: 'border-color 0.2s, shadow 0.2s' }}
            >
              <img
                src={item.image}
                alt={`Sticker ${item.id}`}
                className="w-full h-full object-cover"
              />
              {selectedIds.includes(item.id) && (
                <div className="absolute inset-0 bg-hotPink/20 flex items-center justify-center">
                  <div className="bg-hotPink text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg animate-pop-in">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Verify button */}
        <button
          ref={verifyBtnRef}
          onClick={handleVerify}
          disabled={selectedIds.length === 0 || isVerifying}
          className={`relative hot-pink-pill mt-4 w-full max-w-[360px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden
            ${!isVerifying && selectedIds.length > 0 ? 'animate-breathing-glow' : ''}
          `}
        >
          {verifyRipple && <span className="click-ripple" />}
          {isVerifying ? (
            <span className="animate-pulse">Verifying...</span>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              VERIFY
            </>
          )}
        </button>

        {/* Error message */}
        {showError && (
          <div className="mt-3 bg-red-500 text-white px-5 py-2 rounded-full font-caveat font-bold text-base animate-shake text-center">
            {failCount >= 2
              ? config.captchaFailMessageRepeat
              : config.captchaFailMessage}
          </div>
        )}
      </div>
    </div>
  );
}
