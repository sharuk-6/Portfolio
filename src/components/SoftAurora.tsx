import React from 'react';

interface SoftAuroraProps {
  theme?: 'dark' | 'light';
  className?: string;
  intensity?: 'subtle' | 'vibrant';
}

/**
 * SoftAurora - Ethereal ambient fluid aurora borealis background inspired by ReactBits
 * Smooth, floating organic light ribbons that blend seamlessly with the starfield particles.
 */
export const SoftAurora: React.FC<SoftAuroraProps> = ({
  theme = 'dark',
  className = '',
  intensity = 'subtle',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none -z-10 ${className}`}
    >
      {/* Background Gradient Mesh Container */}
      <div className="absolute inset-0 opacity-70 dark:opacity-60 transition-opacity duration-1000">
        
        {/* Aurora Blob 1 - Vibrant Emerald / Mint Wave */}
        <div
          className={`absolute -top-32 left-1/4 w-[540px] h-[480px] rounded-full mix-blend-screen filter blur-[100px] transition-all duration-700 animate-aurora-slow ${
            isDark 
              ? 'bg-gradient-to-tr from-emerald-600/35 via-teal-500/25 to-emerald-400/20' 
              : 'bg-gradient-to-tr from-emerald-300/25 via-teal-200/20 to-emerald-100/15'
          }`}
          style={{
            animation: 'auroraFloat 18s ease-in-out infinite alternate',
          }}
        />

        {/* Aurora Blob 2 - Cyan / Sapphire Data Ribbon */}
        <div
          className={`absolute top-1/4 -right-20 w-[600px] h-[520px] rounded-full mix-blend-screen filter blur-[120px] transition-all duration-700 ${
            isDark 
              ? 'bg-gradient-to-bl from-cyan-500/30 via-sky-600/20 to-blue-600/15' 
              : 'bg-gradient-to-bl from-cyan-200/20 via-sky-100/20 to-blue-100/10'
          }`}
          style={{
            animation: 'auroraFloatReverse 22s ease-in-out infinite alternate',
          }}
        />

        {/* Aurora Blob 3 - Indigo / Cosmic Violet (Soft middle band) */}
        <div
          className={`absolute top-2/3 left-1/3 w-[640px] h-[460px] rounded-full mix-blend-screen filter blur-[130px] transition-all duration-700 ${
            isDark 
              ? 'bg-gradient-to-r from-indigo-600/25 via-emerald-600/20 to-teal-500/15' 
              : 'bg-gradient-to-r from-indigo-200/15 via-emerald-100/15 to-teal-100/10'
          }`}
          style={{
            animation: 'auroraFloat 26s ease-in-out infinite alternate',
          }}
        />

        {/* Aurora Blob 4 - Warm Amber / SAP Gold Pulse (Subtle enterprise accent) */}
        <div
          className={`absolute -bottom-24 right-1/4 w-[480px] h-[420px] rounded-full mix-blend-screen filter blur-[110px] transition-all duration-700 ${
            isDark 
              ? 'bg-gradient-to-tl from-teal-500/20 via-emerald-500/20 to-transparent' 
              : 'bg-gradient-to-tl from-teal-200/15 via-emerald-100/15 to-transparent'
          }`}
          style={{
            animation: 'auroraFloatReverse 20s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Subtle organic noise overlay for authentic depth */}
      <div 
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
