import { useState, useEffect } from 'react';
import { Cake, RotateCcw } from 'lucide-react';
import { config } from '../config';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-sm px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <button 
            onClick={() => scrollTo('captcha')}
            className="font-caveat font-bold text-2xl text-hotPink hover:scale-105 transition-transform"
          >
            {config.navLogo}
          </button>
          
          {/* Nav links */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('captcha')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-hotPink font-medium text-sm hover:bg-pink-200 transition-colors"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Restart</span>
            </button>
            <button
              onClick={() => scrollTo('finale')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-hotPink text-white font-medium text-sm hover:shadow-glow transition-all"
            >
              <Cake size={16} />
              <span className="hidden sm:inline">Cake</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
