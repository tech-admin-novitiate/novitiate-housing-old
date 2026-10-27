import React from 'react';

interface NovitiateLogoProps {
  variant?: 'full' | 'mark' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
  className?: string;
}

export const NovitiateLogo: React.FC<NovitiateLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'dark',
  className = ''
}) => {
  // Dimensions for the icon mark
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;

  // The trademarked 3x3 node network "N" icon
  const LogoMark = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Background connecting lines forming 'N' and grid links */}
      {/* Left column vertical line: (20,20) -> (20,80) */}
      <line x1="22" y1="22" x2="22" y2="78" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
      
      {/* Diagonal line: (22,22) -> (50,50) -> (78,78) */}
      <line x1="22" y1="22" x2="78" y2="78" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
      
      {/* Right column vertical line with segment: (78,22) -> (78,78) */}
      <line x1="78" y1="22" x2="78" y2="40" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
      <line x1="78" y1="60" x2="78" y2="78" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />

      {/* Row 1 Nodes */}
      {/* (0,0) - Orange */}
      <circle cx="22" cy="22" r="11" fill="#F59415" />
      {/* (0,1) - Medium Neutral Grey */}
      <circle cx="50" cy="22" r="11" fill="#8C929D" />
      {/* (0,2) - Slate Indigo */}
      <circle cx="78" cy="22" r="11" fill="#757C9E" />

      {/* Row 2 Nodes */}
      {/* (1,0) - Sky / Denim Blue */}
      <circle cx="22" cy="50" r="11" fill="#5C96D2" />
      {/* (1,1) - Coral / Crimson Red (Center Focal Point) */}
      <circle cx="50" cy="50" r="11" fill="#E84144" />
      {/* (1,2) - Empty in trademarked logo (vertical line passes through) */}

      {/* Row 3 Nodes */}
      {/* (2,0) - Slate Purple / Dark Indigo */}
      <circle cx="22" cy="78" r="11" fill="#6E739B" />
      {/* (2,1) - Medium Neutral Grey */}
      <circle cx="50" cy="78" r="11" fill="#8C929D" />
      {/* (2,2) - Leaf Green */}
      <circle cx="78" cy="78" r="11" fill="#72A346" />
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{LogoMark}</div>;
  }

  const textColor = theme === 'light' ? 'text-white' : 'text-neutral-900';
  const subtextColor = theme === 'light' ? 'text-neutral-400' : 'text-neutral-500';

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        {LogoMark}
        <div className="space-y-0.5">
          <div className={`text-base font-bold tracking-wider uppercase font-sans ${textColor}`}>
            Novitiate Housing Pvt. Ltd.
          </div>
          <div className={`text-[10px] tracking-[0.25em] uppercase font-medium ${subtextColor}`}>
            House of New Beginning
          </div>
        </div>
      </div>
    );
  }

  // Horizontal variant (default for Header and UI elements)
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {LogoMark}
      <div className="flex flex-col text-left">
        <span className={`text-sm sm:text-base font-extrabold tracking-tight uppercase leading-none font-sans ${textColor}`}>
          Novitiate Housing
        </span>
        <span className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold mt-1 leading-none ${subtextColor}`}>
          House of New Beginning
        </span>
      </div>
    </div>
  );
};
