import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import { buttonPress } from '../lib/animations';
import { config } from '../config';

interface FinaleSectionProps {
  onMusicTransition?: () => void;
}

export default function FinaleSection({ onMusicTransition }: FinaleSectionProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const confettiLoopRef = useRef<number | null>(null);
  const cakeRef = useRef<HTMLDivElement>(null);

  const [isBlown, setIsBlown] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCounting, setIsCounting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  // ─── Confetti helpers ────────────────────────────────────────────────
  const triggerConfetti = useCallback(() => {
    const colors = ['#FF4D8D', '#F3B9E1', '#FFD700', '#FF6B9D'];
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 10, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 10, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    confetti({ particleCount: 250, spread: 120, origin: { y: 0.6 }, colors });
  }, []);

  const startCherryBlossomFall = useCallback(() => {
    const colors = ['#FF4D8D', '#F3B9E1', '#FFD700', '#FF6B9D', '#FFC0CB'];
    const fall = () => {
      confetti({
        particleCount: 6, startVelocity: 0, ticks: 400, gravity: 0.4,
        spread: 60, origin: { x: Math.random(), y: -0.1 },
        colors, shapes: ['circle'], scalar: 1.2, drift: (Math.random() - 0.5) * 0.5,
      });
      confettiLoopRef.current = window.setTimeout(fall, 200);
    };
    fall();
  }, []);

  useEffect(() => {
    return () => { if (confettiLoopRef.current !== null) clearTimeout(confettiLoopRef.current); };
  }, []);

  // ─── Button breathing pulse + ripple rings ────────────────────────────
  useEffect(() => {
    if (!isBlown && !isCounting && buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.04, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }
    return () => { if (buttonRef.current) gsap.killTweensOf(buttonRef.current); };
  }, [isBlown, isCounting]);

  // ─── Interaction ──────────────────────────────────────────────────────
  const handleTapToBlow = () => {
    if (isBlown) {
      if (audioRef.current) {
        if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
        else { audioRef.current.play(); setIsPlaying(true); }
      }
      return;
    }
    if (isCounting) return;

    // Click feedback
    buttonPress(buttonRef.current);
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 700);

    setIsCounting(true);
    setCountdown(3);
    setTimeout(() => setCountdown(2), 1000);

    // Fade out background music early so it's silent before candle music starts
    setTimeout(() => {
      onMusicTransition?.();
    }, 1800);

    // Play candle music after fade-out completes (at 2800ms)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = config.candleMusicVolume;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }, 2800);

    setTimeout(() => setCountdown(1), 2000);
    setTimeout(() => { setCountdown(null); setIsCounting(false); blowOutCandles(); }, 3000);
  };

  const blowOutCandles = () => {
    if (isBlown) return;
    setIsBlown(true);
    triggerConfetti();
    setTimeout(startCherryBlossomFall, 3000);

    // Cake glow-up on blow
    if (cakeRef.current) {
      gsap.fromTo(cakeRef.current, { scale: 0.95, filter: 'brightness(1)' }, {
        scale: 1.05, filter: 'brightness(1.25)', duration: 0.4, yoyo: true, repeat: 1, ease: 'power2.out',
      });
    }
  };

  return (
    <div className="section-pinned relative flex items-center justify-center py-20 min-h-screen overflow-hidden">
      <audio ref={audioRef} src={config.candleMusic} loop />

      {/* Countdown overlay */}
      {countdown !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-none">
          <span
            key={countdown}
            className="font-montserrat font-black text-[12rem] md:text-[16rem] text-hotPink animate-pop-in drop-shadow-[0_0_40px_rgba(255,77,141,0.6)]"
          >
            {countdown}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 -mt-8 md:-mt-12">
        {/* Headline */}
        <div className="text-center mb-1">
          <h2 className="heading-lg text-gray-800 mb-0 tracking-wider">
            {config.finaleHeading}
          </h2>
          <p className="font-caveat text-2xl text-gray-600">{config.finaleSubtitle}</p>
        </div>

        {/* Cake area */}
        <div className="relative flex items-center justify-center mb-2 w-full max-w-4xl mx-auto">
          {/* Left Dancing Sticker */}
          {isBlown && (
            <div className="absolute left-0 md:left-12 w-24 md:w-40 z-20 animate-pop-in">
              <img src={config.dancingGifs[0]} alt="Dance 1" className="w-full drop-shadow-xl" />
            </div>
          )}

          {/* Cake with flicker glow overlay */}
          <div ref={cakeRef} className="relative">
            <img
              src={config.cakeImage}
              alt="Birthday cake with candles"
              style={{ width: '100%', maxWidth: '340px', height: 'auto', display: 'block', position: 'relative', zIndex: 10 }}
            />
            {/* Candle glow flicker overlay */}
            {!isBlown && (
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none animate-flicker"
                style={{
                  background: 'radial-gradient(ellipse 60% 30% at 50% 35%, rgba(255,200,80,0.22) 0%, transparent 70%)',
                  zIndex: 11,
                }}
              />
            )}
          </div>

          {/* Right Dancing Sticker */}
          {isBlown && (
            <div className="absolute right-0 md:right-12 w-24 md:w-40 z-20 animate-pop-in" style={{ animationDelay: '0.15s' }}>
              <img src={config.dancingGifs[1]} alt="Dance 2" className="w-full drop-shadow-xl" />
            </div>
          )}
        </div>

        {/* Tap to blow button with ripple rings */}
        <div className="relative flex items-center justify-center mt-4">
          {/* Expanding ripple rings (idle) */}
          {!isBlown && !isCounting && (
            <>
              <span className="ripple-ring" />
              <span className="ripple-ring ripple-ring-2" />
            </>
          )}

          <button
            ref={buttonRef}
            onClick={handleTapToBlow}
            disabled={isCounting}
            className={`relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center font-montserrat font-bold text-lg overflow-hidden
              ${isBlown
                ? 'bg-hotPink text-white cursor-pointer hover:shadow-glow transition-shadow'
                : isCounting
                  ? 'bg-hotPink/70 text-white cursor-wait'
                  : 'bg-hotPink text-white'
              }`}
          >
            {showRipple && <span className="click-ripple" />}
            <span className="relative z-10 text-center px-2">
              {isBlown ? (isPlaying ? 'Pause Music ⏸️' : 'Play Music ▶️') : 'TAP TO BLOW'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
