import { config } from '../config';

export default function TributeSection() {
  return (
    <div className="section-pinned flex items-center overflow-hidden bg-[#111111]">
      <div className="w-full px-[6vw] py-[10vh]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left - Text content */}
          <div className="flex-1 max-w-[44vw]">
            <h2 className="heading-lg text-white mb-6">
              {config.tributeTitle}
            </h2>

            <div>
              <p className="font-inter text-lg md:text-xl text-gray-300 leading-relaxed">
                {config.tributeText}
              </p>
            </div>
          </div>

          {/* Right - Group photo */}
          <div className="relative">
            <div className="sticker-frame w-[300px] md:w-[450px] lg:w-[520px] -rotate-[4deg]">
              <img
                src={config.tributePhoto}
                alt={config.tributePhotoAlt}
                className="w-full aspect-[16/10] object-cover rounded-xl"
              />
            </div>

            {/* Photo sparkles */}
            {[
              { top: '-1.5rem', right: '-1.5rem', delay: '0s', emoji: '✦', color: '#FFD700' },
              { bottom: '-1rem', left: '-1rem', delay: '0.5s', emoji: '✦', color: '#FF4D8D' },
              { top: '50%', right: '-2rem', delay: '1s', emoji: '✦', color: '#D4A0FF' },
              { top: '20%', left: '-1.5rem', delay: '0.8s', emoji: '✦', color: '#FF8EC4' },
            ].map((s, i) => (
              <span
                key={i}
                className="photo-sparkle text-xl"
                style={{ top: s.top, right: s.right, bottom: s.bottom, left: s.left, color: s.color, animationDelay: s.delay }}
              >{s.emoji}</span>
            ))}

            {/* Caption */}
            <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-caveat text-xl text-gray-400 whitespace-nowrap">
              {config.tributePhotoCaption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
