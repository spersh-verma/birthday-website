import { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { config } from '../config';

export default function PhotoGridSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = config.photoBookPages.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-40 relative overflow-hidden bg-babyPink/30 flex flex-col items-center justify-center">
      <Sparkles className="absolute top-1/4 left-1/4 w-12 h-12 text-yellow-400 animate-sparkle opacity-80" />

      <div className="max-w-4xl w-full px-6 relative z-10">
        {/* Heading */}
        <div className="mb-24 text-center">
          <h2 className="heading-lg text-gray-800 mb-4 tracking-wider">
            {config.photoBookTitle}
          </h2>
          <p className="font-inter text-lg text-gray-600 relative z-20">
            {config.photoBookSubtitle}
          </p>
        </div>

        {/* The Book Container */}
        <div className="relative mx-auto w-full max-w-[500px] aspect-[3/4] md:aspect-[4/3] perspective-1000 mt-24">
          <div className="relative w-full h-full flex items-center justify-center">

            {/* Book Spine Shadow */}
            <div className="absolute inset-y-4 left-1/2 w-4 bg-gradient-to-r from-gray-300/50 to-transparent -translate-x-1/2 z-0 hidden md:block rounded-full blur-sm" />

            {/* Current Page Card */}
            <div
              className="relative bg-white p-4 pb-12 shadow-2xl rounded-sm w-[320px] md:w-[380px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                if (e.clientX - rect.left > rect.width / 2) nextPage();
                else prevPage();
              }}
            >
              {/* Image */}
              <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm relative group">
                <img
                  src={config.photoBookPages[currentPage].src}
                  alt={config.photoBookPages[currentPage].caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Caption */}
              <p className="font-caveat text-2xl md:text-3xl text-center text-gray-800 mt-6 leading-tight min-h-[3rem]">
                {config.photoBookPages[currentPage].caption}
              </p>

              {/* Page Number */}
              <p className="absolute bottom-3 right-4 font-caveat text-gray-400 text-lg">
                Page {currentPage + 1} of {totalPages}
              </p>
            </div>

            {/* Book pile effect (pages behind) */}
            <div className="absolute top-2 left-1/2 -translate-x-[48%] w-[320px] md:w-[380px] h-full bg-white/50 rounded-sm -z-10 rotate-2 border border-white/60 pointer-events-none" />
            <div className="absolute top-4 left-1/2 -translate-x-[52%] w-[320px] md:w-[380px] h-full bg-white/30 rounded-sm -z-20 -rotate-1 border border-white/40 pointer-events-none" />
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-20 z-20">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-hotPink transition-all duration-200
                hover:scale-110 hover:-translate-x-1 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:translate-x-0
                ${currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-hotPink/20'}`}
            >
              <ArrowLeft size={32} strokeWidth={2.5} />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-20 z-20">
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-hotPink transition-all duration-200
                hover:scale-110 hover:translate-x-1 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:translate-x-0
                ${currentPage === totalPages - 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-hotPink/20'}`}
            >
              <ArrowRight size={32} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
