import { Sparkles } from 'lucide-react';
import { config } from '../config';

export default function WhoIsSheSection() {
    return (
        <div className="min-h-screen py-20 relative flex items-center overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div className="mb-12">
                    <h2 className="heading-lg text-gray-800 mb-4">
                        {config.whoTitle}
                    </h2>
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    {/* Left - Photo */}
                    <div
                        className="polaroid-frame w-full max-w-[320px] lg:max-w-[380px] -rotate-3 flex-shrink-0"
                    >
                        <img
                            src={config.whoPhoto}
                            alt={config.whoPhotoAlt}
                            className="w-full aspect-[4/5] object-cover rounded"
                        />
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                            <p className="font-caveat text-xl text-gray-600">{config.whoPhotoCaption}</p>
                        </div>
                    </div>

                    {/* Right - Paragraph */}
                    <div className="flex-1 max-w-[600px]">
                        <p className="font-inter text-lg md:text-xl text-gray-700 leading-relaxed">
                            {config.whoBio}
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative sparkles */}
            <Sparkles className="absolute top-[20%] right-[10%] w-10 h-10 text-yellow-400 opacity-40 animate-sparkle" />
            <Sparkles className="absolute bottom-[25%] left-[8%] w-8 h-8 text-hotPink opacity-30 animate-sparkle" style={{ animationDelay: '0.7s' }} />
            {['15%', '80%', '60%', '35%'].map((left, i) => (
                <span
                    key={i}
                    className="sparkle-star text-yellow-300"
                    style={{ left, top: ['20%', '60%', '85%', '10%'][i], animationDelay: `${i * 0.55}s`, fontSize: '0.75rem' }}
                >✦</span>
            ))}
        </div>
    );
}
