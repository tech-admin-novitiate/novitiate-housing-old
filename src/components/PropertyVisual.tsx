import React from 'react';

interface PropertyVisualProps {
  preset?: string;
  title: string;
  type: 'rent' | 'sale';
  className?: string;
  aspectRatio?: '4:3' | '16:9';
}

export const PropertyVisual: React.FC<PropertyVisualProps> = ({
  preset = 'modern_tower',
  title,
  type,
  className = 'h-52 w-full',
  aspectRatio = '4:3'
}) => {
  // Preset styles with elegant architectural vectors and palettes
  const getVisual = () => {
    switch (preset) {
      case 'luxury_interior':
        return {
          bg: 'from-stone-800 via-zinc-900 to-stone-950',
          accent: '#E2B883',
          secondary: '#38BDF8',
          svg: (
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 260H360" stroke="#78716c" strokeWidth="2" />
              {/* Floor to ceiling window frame */}
              <rect x="60" y="40" width="160" height="200" stroke="#a8a29e" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="140" y1="40" x2="140" y2="240" stroke="#78716c" strokeWidth="1.5" />
              <line x1="60" y1="140" x2="220" y2="140" stroke="#78716c" strokeWidth="1.5" />
              {/* Sunbeam warm rays */}
              <polygon points="60,40 160,40 240,260 100,260" fill="url(#sunray)" opacity="0.3" />
              {/* Minimalist sofa & lounge */}
              <path d="M240 180H350V230H240V180Z" fill="#292524" stroke="#d6d3d1" strokeWidth="1.5" />
              <path d="M230 195H240V240H230Z" fill="#44403c" />
              <path d="M350 195H360V240H350Z" fill="#44403c" />
              <line x1="250" y1="240" x2="250" y2="255" stroke="#a8a29e" strokeWidth="2" />
              <line x1="340" y1="240" x2="340" y2="255" stroke="#a8a29e" strokeWidth="2" />
              {/* Modern ambient lamp */}
              <line x1="50" y1="250" x2="50" y2="120" stroke="#f59e0b" strokeWidth="2" />
              <path d="M35 120H65L55 90H45L35 120Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="50" cy="105" r="14" fill="#fbbf24" opacity="0.25" filter="blur(4px)" />
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
          secondary: '#F59E0B',
          svg: (
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 270H380" stroke="#475569" strokeWidth="2" />
              {/* Low-rise society building */}
              <rect x="50" y="90" width="140" height="180" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              {/* Windows grid */}
              {[110, 150, 190, 230].map((y, i) => (
                <g key={i}>
                  <rect x="70" y={y} width="24" height="20" rx="2" fill="#38bdf8" fillOpacity="0.3" stroke="#94a3b8" />
                  <rect x="110" y={y} width="24" height="20" rx="2" fill="#fef08a" fillOpacity="0.4" stroke="#94a3b8" />
                  <rect x="150" y={y} width="24" height="20" rx="2" fill="#38bdf8" fillOpacity="0.2" stroke="#94a3b8" />
                </g>
              ))}
              {/* Society entrance arch */}
              <path d="M100 270V235C100 230 110 225 120 225C130 225 140 230 140 235V270" stroke="#f1f5f9" strokeWidth="2" />
              {/* Adjoining wing */}
              <rect x="210" y="60" width="130" height="210" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
              {[80, 120, 160, 200, 240].map((y, i) => (
                <g key={i}>
                  <rect x="230" y={y} width="22" height="18" rx="2" fill="#fef08a" fillOpacity={i % 2 === 0 ? "0.4" : "0.15"} stroke="#64748b" />
                  <rect x="270" y={y} width="22" height="18" rx="2" fill="#38bdf8" fillOpacity="0.25" stroke="#64748b" />
                  <rect x="305" y={y} width="22" height="18" rx="2" fill="#64748b" fillOpacity="0.2" stroke="#64748b" />
                </g>
              ))}
              {/* Garden landscape trees */}
              <circle cx="360" cy="245" r="16" fill="#065f46" stroke="#10b981" strokeWidth="1" />
              <line x1="360" y1="261" x2="360" y2="270" stroke="#78350f" strokeWidth="2" />
              <circle cx="35" cy="250" r="14" fill="#065f46" stroke="#10b981" strokeWidth="1" />
              <line x1="35" y1="264" x2="35" y2="270" stroke="#78350f" strokeWidth="2" />
            </svg>
          )
        };
      case 'modern_tower':
      default:
        return {
          bg: 'from-blue-950 via-slate-900 to-indigo-950',
          accent: '#38BDF8',
          secondary: '#60A5FA',
          svg: (
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 270H380" stroke="#334155" strokeWidth="2" />
              {/* Tall contemporary residential tower */}
              <rect x="130" y="30" width="140" height="240" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Architectural balconies */}
              {[50, 85, 120, 155, 190, 225].map((y, i) => (
                <g key={i}>
                  <rect x="145" y={y} width="110" height="22" rx="2" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                  <line x1="145" y1={y + 12} x2="255" y2={y + 12} stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <rect x="155" y={y + 2} width="20" height="12" fill="#bae6fd" fillOpacity="0.4" />
                  <rect x="225" y={y + 2} width="20" height="12" fill="#fef08a" fillOpacity={i % 2 === 1 ? "0.5" : "0.2"} />
                </g>
              ))}
              {/* Rooftop terrace pergola */}
              <line x1="130" y1="25" x2="270" y2="25" stroke="#94a3b8" strokeWidth="2" />
              <line x1="150" y1="25" x2="150" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="200" y1="25" x2="200" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="250" y1="25" x2="250" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Background skyline silhouette */}
              <path d="M40 270V140H100V270" fill="#090d16" stroke="#1e293b" />
              <path d="M300 270V110H360V270" fill="#090d16" stroke="#1e293b" />
            </svg>
          )
        };
    }
  };

  const current = getVisual();

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${current.bg} flex items-center justify-center ${className}`}>
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      {/* Architectural Rendering Vector */}
      <div className="absolute inset-0 flex items-center justify-center">
        {current.svg}
      </div>

      {/* Subtle bottom gradient shadow for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Badge container: Top Right NOC & Type info */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <span
          className={`text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded shadow-xs text-white backdrop-blur-md ${
            type === 'rent'
              ? 'bg-[#E84144]/90 border border-[#E84144]/40'
              : 'bg-[#F59415]/90 border border-[#F59415]/40'
          }`}
        >
          {type === 'rent' ? 'For Rent' : 'For Sale'}
        </span>
      </div>

      {/* Bottom overlay title info */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between">
        <p className="text-xs font-medium text-white/90 line-clamp-1 drop-shadow-sm">
          {title}
        </p>
      </div>
    </div>
  );
};
