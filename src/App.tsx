import { useEffect, useState, useRef, useCallback } from 'react';
import CaptchaSection from './sections/CaptchaSection';
import IntroSection from './sections/IntroSection';
import WhoIsSheSection from './sections/WhoIsSheSection';
import ComplimentSection from './sections/ComplimentSection';
import PhotoGridSection from './sections/PhotoGridSection';
import TributeSection from './sections/TributeSection';
import FinaleSection from './sections/FinaleSection';
import ClosingSection from './sections/ClosingSection';
import FloatingFlowers from './components/FloatingFlowers';

import CursorSparkle from './components/CursorSparkle';
import { registerGSAP } from './lib/animations';
import { config } from './config';

// Register GSAP ScrollTrigger plugin once at app level
registerGSAP();

function App() {
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload background music on mount so it's ready instantly
  useEffect(() => {
    const audio = new Audio(config.backgroundMusic);
    audio.loop = true;
    audio.volume = config.backgroundMusicVolume;
    audio.preload = 'auto';
    audioRef.current = audio;
  }, []);

  // Play background music immediately after captcha
  useEffect(() => {
    if (captchaPassed && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [captchaPassed]);

  const handleMusicTransition = useCallback(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      // Smooth fade out
      const fadeAudio = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          audio.pause();
          clearInterval(fadeAudio);
        }
      }, 200);
    }
  }, []);

  // Page-entry fade-in
  useEffect(() => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
      document.body.style.transition = 'opacity 0.7s ease';
      document.body.style.opacity = '1';
    });
  }, []);

  return (
    <div className="relative overflow-x-hidden">
        {/* Grain overlay */}
        <div className="grain-overlay" />

        {/* Cursor sparkle trail (desktop) */}
        <CursorSparkle />

        {/* Floating flowers background */}
        <FloatingFlowers />



        {/* Sections */}
        <main className="relative">
          {/* Initial Captcha */}
          <section id="captcha" className="relative" style={{ zIndex: 100 }}>
            <CaptchaSection
              onPass={() => setCaptchaPassed(true)}
              isPassed={captchaPassed}
            />
          </section>

          {captchaPassed && (
            <>
              {/* Block 1 & 2: Question and Answer */}
              <section id="intro" className="relative" style={{ zIndex: 10 }}>
                <IntroSection />
              </section>

              {/* Block 3: Who Are They? */}
              <section id="who-is-she" className="relative" style={{ zIndex: 20 }}>
                <WhoIsSheSection />
              </section>

              {/* Block 4: Compliment Button */}
              <section id="compliment" className="relative" style={{ zIndex: 30 }}>
                <ComplimentSection />
              </section>

              {/* Block 5: Photo Book */}
              <section id="photos" className="relative" style={{ zIndex: 40 }}>
                <PhotoGridSection />
              </section>

              {/* Block 6: Blow the Candles */}
              <section id="finale" className="relative" style={{ zIndex: 50 }}>
                <FinaleSection onMusicTransition={handleMusicTransition} />
              </section>

              {/* Block 7: Tribute */}
              <section id="tribute" className="relative" style={{ zIndex: 60 }}>
                <TributeSection />
              </section>

              {/* Block 8: Closing */}
              <section id="closing" className="relative" style={{ zIndex: 70 }}>
                <ClosingSection />
              </section>
            </>
          )}
        </main>
      </div>
  );
}

export default App;
