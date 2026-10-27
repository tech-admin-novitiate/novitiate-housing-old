import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles } from 'lucide-react';

interface PropertyVisualProps {
  preset?: string;
  title: string;
  type: 'rent' | 'sale';
  className?: string;
  aspectRatio?: '4:3' | '16:9';
  images?: string[];
  cycleIntervalSeconds?: number;
  showCycleTime?: boolean;
}

export const PropertyVisual: React.FC<PropertyVisualProps> = ({
  preset = 'modern_tower',
  title,
  type,
  className = 'h-52 w-full',
  aspectRatio = '4:3',
  images = [],
  cycleIntervalSeconds = 6,
  showCycleTime = false,
}) => {
  // Normalize images array, filtering any empty strings
  const validImages = (images || []).filter((img) => Boolean(img && img.trim()));
  const hasMultipleImages = validImages.length > 1;

  // System governed cycle rate clamped to 3 - 15 seconds
  const cycleSeconds = Math.max(3, Math.min(15, cycleIntervalSeconds || 6));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageErrorIndices, setImageErrorIndices] = useState<Set<number>>(new Set());
  const timerRef = useRef<any>(null);

  // Auto-cycle through images with system-governed cadence
  useEffect(() => {
    if (!hasMultipleImages) return;

    // Set interval according to system-governed cycle rate for this tile
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, cycleSeconds * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasMultipleImages, validImages.length, cycleSeconds]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  const handleImageError = (index: number) => {
    setImageErrorIndices((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  // Preset styles with elegant architectural vectors and palettes (fallback when no valid images)
  const getVisualPreset = () => {
    switch (preset) {
      case 'luxury_interior':
        return {
          bg: 'from-stone-800 via-zinc-900 to-stone-950',
          accent: '#E2B883',
          svg: (
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 260H360" stroke="#78716c" strokeWidth="2" />
              <rect x="60" y="40" width="160" height="200" stroke="#a8a29e" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="140" y1="40" x2="140" y2="240" stroke="#78716c" strokeWidth="1.5" />
              <line x1="60" y1="140" x2="220" y2="140" stroke="#78716c" strokeWidth="1.5" />
              <polygon points="60,40 160,40 240,260 100,260" fill="url(#sunray)" opacity="0.3" />
              <path d="M240 180H350V230H240V180Z" fill="#292524" stroke="#d6d3d1" strokeWidth="1.5" />
              <line x1="50" y1="250" x2="50" y2="120" stroke="#f59e0b" strokeWidth="2" />
              <path d="M35 120H65L55 90H45L35 120Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
              <defs>
                <linearGradient id="sunray" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )
        };
      case 'exterior_building':
        return {
          bg: 'from-slate-900 via-neutral-900 to-emerald-950',
          accent: '#10B981',
          svg: (
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 270H380" stroke="#475569" strokeWidth="2" />
              <rect x="50" y="90" width="140" height="180" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              {[110, 150, 190, 230].map((y, i) => (
                <g key={i}>
                  <rect x="70" y={y} width="24" height="20" rx="2" fill="#38bdf8" fillOpacity="0.3" stroke="#94a3b8" />
                  <rect x="110" y={y} width="24" height="20" rx="2" fill="#fef08a" fillOpacity="0.4" stroke="#94a3b8" />
                </g>
              ))}
              <circle cx="360" cy="245" r="16" fill="#065f46" stroke="#10b981" strokeWidth="1" />
              <line x1="360" y1="261" x2="360" y2="270" stroke="#78350f" strokeWidth="2" />
            </svg>
          )
        };
      case 'modern_tower':
      default:
        return {
          bg: 'from-blue-950 via-slate-900 to-indigo-950',
          accent: '#38BDF8',
          svg: (
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 270H380" stroke="#334155" strokeWidth="2" />
              <rect x="110" y="30" width="180" height="240" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
              {[50, 85, 120, 155, 190, 225].map((y, i) => (
                <g key={i}>
                  <rect x="130" y={y} width="35" height="22" rx="2" fill="#38bdf8" fillOpacity="0.35" stroke="#0ea5e9" />
                  <rect x="182" y={y} width="35" height="22" rx="2" fill="#bae6fd" fillOpacity="0.25" stroke="#38bdf8" />
                  <rect x="235" y={y} width="35" height="22" rx="2" fill="#fef08a" fillOpacity="0.4" stroke="#eab308" />
                </g>
              ))}
            </svg>
          )
        };
    }
  };

  const visualPreset = getVisualPreset();
  const currentImg = validImages[currentIndex];
  const isCurrentImgValid = Boolean(currentImg && !imageErrorIndices.has(currentIndex));

  return (
    <div
      className={`relative overflow-hidden select-none bg-neutral-900 group/visual ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo Mode with Cycling */}
      {isCurrentImgValid ? (
        <div className="relative w-full h-full">
          {validImages.map((imgUrl, idx) => {
            const isActive = idx === currentIndex;
            return (
              <img
                key={`${imgUrl}-${idx}`}
                src={imgUrl}
                alt={`${title} - Photo ${idx + 1}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                onError={() => handleImageError(idx)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              />
            );
          })}

          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>
      ) : (
        /* Vector Preset Fallback */
        <div className={`w-full h-full bg-gradient-to-br ${visualPreset.bg} flex items-center justify-center p-4 relative`}>
          {visualPreset.svg}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* Top Controls & Badges */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        {/* Listing Type Badge */}
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs shadow-xs ${
            type === 'rent'
              ? 'bg-[#72A346]/90 text-white'
              : 'bg-[#5C96D2]/90 text-white'
          }`}
        >
          {type === 'rent' ? 'For Tenancy' : 'For Sale'}
        </span>

        {/* Photo Count and optional Admin Cycle Rate */}
        {hasMultipleImages && (
          <div className="flex items-center gap-1.5">
            {/* System Cadence Pill (Hidden for normal users; only visible if showCycleTime is true) */}
            {showCycleTime && (
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-md transition-opacity duration-200 flex items-center gap-1 ${
                  isHovered ? 'opacity-100 bg-neutral-900/80 text-amber-300' : 'opacity-75 bg-neutral-900/50 text-white/90'
                }`}
                title={`System governed cycle rate: ${cycleSeconds}s`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>{cycleSeconds}s cycle</span>
              </span>
            )}

            {/* Photo Counter */}
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-white/90 backdrop-blur-md flex items-center gap-1">
              <ImageIcon className="w-3 h-3 text-neutral-300" />
              <span>
                {currentIndex + 1}/{validImages.length}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Manual Previous / Next Arrows (revealed on hover) */}
      {hasMultipleImages && (
        <div
          className={`absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={handlePrev}
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-110 shadow-md cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-110 shadow-md cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Cycling Dots Navigation */}
      {hasMultipleImages && (
        <div className="absolute bottom-2.5 left-0 right-0 z-30 flex items-center justify-center gap-1.5 px-4">
          {validImages.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleDotClick(e, idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-5 h-1.5 bg-white shadow-xs'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
