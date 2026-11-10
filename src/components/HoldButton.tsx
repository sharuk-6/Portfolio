import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Check } from 'lucide-react';
import { calculateHoldProgress, calculateCircleDashOffset } from '../utils/holdProgress';

export interface HoldButtonProps {
  onHoldComplete: () => void;
  label: string;
  holdingLabel?: string;
  completedLabel?: string;
  holdDurationMs?: number;
  icon?: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'blue' | 'outline' | 'subtle';
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export const HoldButton: React.FC<HoldButtonProps> = ({
  onHoldComplete,
  label,
  holdingLabel = 'Hold to confirm...',
  completedLabel = 'Confirmed!',
  holdDurationMs = 1100,
  icon,
  variant = 'emerald',
  className = '',
  ariaLabel,
  disabled = false,
}) => {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const completedTimeoutRef = useRef<number | null>(null);

  const resetHold = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    startTimeRef.current = null;
    setIsHolding(false);
    setProgress(0);
  }, []);

  const triggerCompletion = useCallback(() => {
    setIsCompleted(true);
    setProgress(1);
    setIsHolding(false);

    // Call the completion action
    onHoldComplete();

    // Reset completion feedback after 2.2 seconds
    completedTimeoutRef.current = window.setTimeout(() => {
      setIsCompleted(false);
      setProgress(0);
    }, 2200);
  }, [onHoldComplete]);

  const tick = useCallback(() => {
    if (!startTimeRef.current) return;
    const elapsed = performance.now() - startTimeRef.current;
    const { progress: currentProgress, isComplete } = calculateHoldProgress(elapsed, holdDurationMs);

    setProgress(currentProgress);

    if (isComplete) {
      triggerCompletion();
    } else {
      animFrameRef.current = requestAnimationFrame(tick);
    }
  }, [holdDurationMs, triggerCompletion]);

  const startHold = (e: React.SyntheticEvent) => {
    if (disabled || isCompleted) return;
    e.preventDefault();
    setIsHolding(true);
    startTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(tick);
  };

  const endHold = () => {
    if (isCompleted) return;
    resetHold();
  };

  // Keyboard accessibility: hold on Space or Enter keydown, release on keyup
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      if (!isHolding && !isCompleted) {
        startHold(e);
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      endHold();
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (completedTimeoutRef.current) clearTimeout(completedTimeoutRef.current);
    };
  }, []);

  // Variant themes
  const variantStyles = {
    emerald: 'bg-emerald-700 dark:bg-emerald-500 hover:bg-emerald-800 dark:hover:bg-emerald-400 text-white shadow-sm',
    amber: 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    outline: 'bg-white/80 dark:bg-[#141822]/80 hover:bg-stone-100 dark:hover:bg-[#1b212e] text-slate-800 dark:text-slate-200 border border-stone-300 dark:border-[#232936]',
    subtle: 'bg-stone-100 dark:bg-slate-800/80 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-stone-200 dark:border-slate-700',
  }[variant];

  // Circle dimensions for radial progress
  const radius = 10;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = calculateCircleDashOffset(progress, radius);

  return (
    <button
      type="button"
      onMouseDown={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      onTouchCancel={endHold}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      disabled={disabled}
      aria-label={ariaLabel || label}
      title="Press and hold to confirm action"
      className={`relative select-none overflow-hidden rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 group ${variantStyles} ${className} ${
        isHolding ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-black/5 dark:ring-offset-[#08090a]' : ''
      }`}
    >
      {/* Background progress fill overlay */}
      <span
        className="absolute inset-0 bg-white/20 dark:bg-white/25 origin-left pointer-events-none transition-transform duration-75"
        style={{
          transform: `scaleX(${progress})`,
        }}
        aria-hidden="true"
      />

      {/* Radial progress ring icon or state icon */}
      <span className="relative z-10 flex items-center justify-center w-5 h-5 shrink-0" aria-hidden="true">
        {isCompleted ? (
          <Check className="w-4 h-4 text-emerald-300 animate-in zoom-in-50 duration-200" />
        ) : isHolding ? (
          <svg className="w-5 h-5 -rotate-90 transform" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-white/30"
              fill="transparent"
            />
            <circle
              cx="12"
              cy="12"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              fill="transparent"
            />
          </svg>
        ) : (
          icon || (
            <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )
        )}
      </span>

      {/* Button Text & Feedback */}
      <span className="relative z-10 whitespace-nowrap flex items-center gap-1.5">
        {isCompleted ? (
          <span className="font-bold">{completedLabel}</span>
        ) : isHolding ? (
          <span className="font-mono text-[11px] font-medium tracking-tight">
            {holdingLabel} {Math.round(progress * 100)}%
          </span>
        ) : (
          <span>{label}</span>
        )}
      </span>

      {/* Small helper pill indicating "Hold" */}
      {!isHolding && !isCompleted && (
        <span className="relative z-10 text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-black/15 dark:bg-white/10 text-white/90">
          Hold
        </span>
      )}
    </button>
  );
};
