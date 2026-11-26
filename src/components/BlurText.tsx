import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  delayStep?: number;
  initialDelay?: number;
  as?: 'h1' | 'h2' | 'p' | 'span';
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = '',
  delayStep = 0.065,
  initialDelay = 0.08,
  as = 'h1',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag className={className} aria-label={text}>
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <motion.span
            aria-hidden="true"
            initial={{
              opacity: 0,
              filter: 'blur(10px)',
              y: 10,
            }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
            }}
            transition={{
              duration: 0.52,
              delay: initialDelay + index * delayStep,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block will-change-[transform,filter,opacity]"
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </MotionTag>
  );
};
