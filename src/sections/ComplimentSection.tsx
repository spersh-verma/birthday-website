import { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { config } from '../config';

export default function ComplimentSection() {
  const [clickCount, setClickCount] = useState(0);
  const [showRipple, setShowRipple] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);

  const isAnnoyed = clickCount >= config.compliments.length + 1;

  const handleClick = () => {
    if (isAnnoyed) return;
    setClickCount(prev => prev + 1);
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 700);
  };

  return (
    <div className="min-h-screen py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="heading-lg text-gray-800 mb-2">
            {config.complimentTitle}
          </h2>
          <p className="font-caveat text-2xl md:text-3xl text-hotPink">
            {config.complimentSubtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left content - Button and Text */}
          <div className="flex flex-col items-center text-center gap-8">

            {/* Click Me Button */}
            <div className="relative">
              <button
                ref={btnRef}
                onClick={handleClick}
                disabled={isAnnoyed}
                className={`relative px-10 py-5 rounded-full font-bold text-xl transition-colors duration-300 overflow-hidden
                  ${isAnnoyed
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-hotPink text-white animate-breathing-glow cursor-pointer'
                  }`}
              >
                {showRipple && <span className="click-ripple" />}
                click me
                {!isAnnoyed && <Sparkles className="inline-block ml-2 w-5 h-5" />}
              </button>
            </div>

            {/* Result text */}
            <div className="max-w-[500px] min-h-[100px] flex items-center justify-center">
              <p
                className={`font-inter text-lg md:text-xl transition-all duration-300 ${isAnnoyed ? 'text-gray-600 font-caveat text-2xl' : 'text-gray-700'}`}
              >
                {clickCount === 0 ? "Click the button for a surprise..." :
                  clickCount <= config.compliments.length ? config.compliments[clickCount - 1] :
                    config.complimentAnnoyedMessage}
              </p>
            </div>
          </div>

          {/* Right - Dynamic Image */}
          <div className="w-[280px] md:w-[350px] rotate-3 transition-all duration-500 hover:rotate-0 flex-shrink-0">
            <img
              src={
                clickCount === 0 ? config.complimentImages[0] :
                  clickCount <= config.compliments.length ? config.complimentImages[clickCount] :
                    config.complimentImages[config.complimentImages.length - 1]
              }
              alt="Reaction"
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Background sparkles */}
      <Sparkles className="absolute top-[20%] left-[10%] w-10 h-10 text-yellow-300 opacity-40 animate-sparkle" />
      <Sparkles className="absolute bottom-[30%] right-[15%] w-8 h-8 text-hotPink opacity-30 animate-sparkle" style={{ animationDelay: '1s' }} />
    </div>
  );
}
