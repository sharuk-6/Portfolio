import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsRight, Check, ArrowRight } from 'lucide-react';
import { 
  calculateSlideRatio, 
  checkCommitThreshold, 
  calculateHandlePosition 
} from '../utils/slideCommitMath';

export interface SlideCommitProps {
  onCommit: () => void;
  label?: string;
  committedLabel?: string;
  icon?: React.ReactNode;
  variant?: 'emerald' | 'cyan' | 'blue' | 'slate' | 'outline';
  compact?: boolean;
  className?: string;
  threshold?: number;
  disabled?: boolean;
  ariaLabel?: string;
}

export const SlideCommit: React.FC<SlideCommitProps> = ({
  onCommit,
  label = 'Slide to confirm',
  committedLabel = 'Committed!',
  icon,
  variant = 'emerald',
  compact = false,
  className = '',
  threshold = 0.82,
  disabled = false,
  ariaLabel,
}) => {
  const [ratio, setRatio] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const [isCommitted, setIsCommitted] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const maxDistanceRef = useRef(0);
  const resetTimeoutRef = useRef<number | null>(null);

  // Measure max travel distance (track width - handle width)
  const updateMetrics = useCallback(() => {
    if (trackRef.current && handleRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      const handleWidth = handleRef.current.offsetWidth;
      maxDistanceRef.current = Math.max(0, trackWidth - handleWidth - 6); // 3px padding on each side
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [updateMetrics]);

  // Handle Commit Execution
  const triggerCommit = useCallback(() => {
    setIsCommitted(true);
    setRatio(1);
    setIsDragging(false);

    onCommit();

    // Auto reset back after 2.4s so it can be used again
    resetTimeoutRef.current = window.setTimeout(() => {
      setIsCommitted(false);
      setRatio(0);
    }, 2400);
  }, [onCommit]);

  // Pointer Drag Handlers
  const handlePointerDown = (clientX: number) => {
    if (disabled || isCommitted) return;
    updateMetrics();
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDragging || isCommitted) return;
    const currentRatio = calculateSlideRatio(clientX, startXRef.current, maxDistanceRef.current);
    setRatio(currentRatio);

    if (checkCommitThreshold(currentRatio, threshold)) {
      triggerCommit();
    }
  }, [isDragging, isCommitted, threshold, triggerCommit]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (!isCommitted) {
      // Spring back to origin
      setRatio(0);
    }
  }, [isDragging, isCommitted]);

  // Global mouse & touch listeners while dragging
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX);
    const onMouseUp = () => handlePointerUp();
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handlePointerMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handlePointerUp();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Keyboard accessibility: ArrowRight slides forward, Enter commits
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || isCommitted) return;
    if (e.key === 'ArrowRight') {
      const nextRatio = Math.min(1, ratio + 0.35);
      setRatio(nextRatio);
      if (checkCommitThreshold(nextRatio, threshold)) {
        triggerCommit();
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      triggerCommit();
    } else if (e.key === 'ArrowLeft') {
      setRatio(0);
    }
  };

  // Color Variant Styles
  const variantStyles = {
    emerald: {
      track: 'bg-emerald-950/20 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-900 dark:text-emerald-200',
      fill: 'bg-gradient-to-r from-emerald-600/30 via-emerald-500/40 to-emerald-400/50',
      handle: 'bg-emerald-700 dark:bg-emerald-500 hover:bg-emerald-800 text-white shadow-emerald-500/30',
      committed: 'bg-emerald-700 text-white',
    },
    cyan: {
      track: 'bg-cyan-950/20 dark:bg-cyan-950/40 border-cyan-500/30 text-cyan-900 dark:text-cyan-200',
      fill: 'bg-gradient-to-r from-cyan-600/30 via-cyan-500/40 to-teal-400/50',
      handle: 'bg-cyan-700 dark:bg-cyan-500 hover:bg-cyan-800 text-white shadow-cyan-500/30',
      committed: 'bg-cyan-700 text-white',
    },
    blue: {
      track: 'bg-blue-950/20 dark:bg-blue-950/40 border-blue-500/30 text-blue-900 dark:text-blue-200',
      fill: 'bg-gradient-to-r from-blue-600/30 via-blue-500/40 to-sky-400/50',
      handle: 'bg-blue-700 dark:bg-blue-500 hover:bg-blue-800 text-white shadow-blue-500/30',
      committed: 'bg-blue-700 text-white',
    },
    slate: {
      track: 'bg-stone-200/60 dark:bg-[#141822] border-stone-300 dark:border-[#232936] text-slate-800 dark:text-slate-200',
      fill: 'bg-emerald-500/20 dark:bg-emerald-500/25',
      handle: 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-black/20',
      committed: 'bg-emerald-700 text-white',
    },
    outline: {
      track: 'bg-white/80 dark:bg-[#0e1219]/80 border-stone-300 dark:border-[#242b3b] text-slate-700 dark:text-slate-300',
      fill: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/30',
      handle: 'bg-emerald-700 dark:bg-emerald-400 text-white dark:text-slate-950 shadow-emerald-500/20',
      committed: 'bg-emerald-700 text-white',
    },
  }[variant];

  const handlePosition = calculateHandlePosition(ratio, maxDistanceRef.current);

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel || label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      onKeyDown={handleKeyDown}
      className={`relative select-none overflow-hidden rounded-full border transition-all duration-200 flex items-center justify-between ${
        compact ? 'h-9 px-1 min-w-[170px]' : 'h-11 px-1.5 min-w-[210px]'
      } ${variantStyles.track} ${
        isCommitted ? variantStyles.committed : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {/* Dynamic Slide Gradient Fill Trail behind handle */}
      {!isCommitted && (
        <div
          className={`absolute left-0 top-0 bottom-0 rounded-full transition-all duration-75 pointer-events-none ${variantStyles.fill}`}
          style={{
            width: `${Math.max(0, ratio * 100)}%`,
          }}
        />
      )}

      {/* Track Label Text */}
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-150 px-8 ${
          compact ? 'text-[11px]' : 'text-xs'
        } font-semibold tracking-wide ${
          isCommitted ? 'opacity-100 text-white' : ratio > 0.65 ? 'opacity-20' : 'opacity-85'
        }`}
      >
        {isCommitted ? (
          <span className="flex items-center gap-1.5 animate-in zoom-in-95 duration-150 font-bold">
            <Check className="w-4 h-4 text-emerald-300" />
            {committedLabel}
          </span>
        ) : (
          <span className="truncate flex items-center gap-1">
            {label}
            <span className="opacity-40 tracking-tighter">&rarr;</span>
          </span>
        )}
      </div>

      {/* Draggable Slider Handle / Thumb */}
      <div
        ref={handleRef}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) handlePointerDown(e.touches[0].clientX);
        }}
        style={{
          transform: `translate3d(${handlePosition}px, 0, 0)`,
          transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative z-10 flex items-center justify-center rounded-full shadow-md cursor-grab active:cursor-grabbing transform-gpu select-none shrink-0 ${
          compact ? 'w-7 h-7 text-xs' : 'w-8 h-8 text-sm'
        } ${variantStyles.handle} ${
          isCommitted ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {icon || <ChevronsRight className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />}
      </div>

      {/* Target Commit End Indicator Icon */}
      {!isCommitted && (
        <div className={`relative z-0 flex items-center justify-center opacity-30 pr-1 ${compact ? 'w-5' : 'w-6'}`}>
          <ArrowRight className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
        </div>
      )}
    </div>
  );
};
