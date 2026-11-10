import React, { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  theme: 'dark' | 'light';
  density?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  glow: number;
  pulseSpeed: number;
  color: string;
}

interface MouseTrail {
  x: number;
  y: number;
  alpha: number;
  size: number;
  color: string;
}

export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({ theme, density = 65 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; isHovering: boolean }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    isHovering: false,
  });
  const trailsRef = useRef<MouseTrail[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color definitions based on theme
    const isDark = theme === 'dark';
    const primaryGlow = isDark ? 'rgba(52, 211, 153, ' : 'rgba(5, 150, 105, '; // Emerald
    const secondaryGlow = isDark ? 'rgba(34, 211, 238, ' : 'rgba(14, 165, 233, '; // Cyan
    const starColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(30, 41, 59, ';

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = Math.floor((width * height) / 18000) * (density / 50);
      for (let i = 0; i < count; i++) {
        const isAccent = Math.random() < 0.25;
        const color = isAccent 
          ? (Math.random() > 0.5 ? primaryGlow : secondaryGlow) 
          : starColor;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.8 + 0.6,
          baseAlpha: Math.random() * 0.45 + (isDark ? 0.2 : 0.15),
          alpha: Math.random() * 0.45 + 0.2,
          glow: Math.random() * 8 + 4,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          color,
        });
      }
    };

    initParticles();

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovering = true;

      // Add mouse sparkle trails
      if (Math.random() < 0.4) {
        trailsRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          alpha: 0.8,
          size: Math.random() * 2.5 + 1.2,
          color: Math.random() > 0.5 ? primaryGlow : secondaryGlow,
        });
        if (trailsRef.current.length > 30) trailsRef.current.shift();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.15;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.15;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw subtle mouse ambient glow aura
      if (mouseRef.current.isHovering && mx > 0 && my > 0) {
        const auraGradient = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        auraGradient.addColorStop(0, isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(5, 150, 105, 0.05)');
        auraGradient.addColorStop(0.5, isDark ? 'rgba(6, 182, 212, 0.03)' : 'rgba(14, 165, 233, 0.02)');
        auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(mx, my, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw starlight particles & constellation lines
      const maxDist = 110;
      const mouseDistThreshold = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Pulsate
        const pulse = Math.sin(tick * p.pulseSpeed) * 0.2;
        p.alpha = Math.max(0.1, Math.min(1, p.baseAlpha + pulse));

        // Interactive mouse interaction (repulsion & boost)
        const dx = mx - p.x;
        const dy = my - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < mouseDistThreshold) {
          const force = (1 - distToMouse / mouseDistThreshold) * 1.5;
          p.x -= (dx / distToMouse) * force * 1.2;
          p.y -= (dy / distToMouse) * force * 1.2;
          p.alpha = Math.min(1, p.alpha + force * 0.5);

          // Draw connection to mouse
          ctx.beginPath();
          ctx.strokeStyle = `${primaryGlow}${(1 - distToMouse / mouseDistThreshold) * 0.28})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles (constellation grid)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isDark ? 0.12 : 0.07);
            ctx.beginPath();
            ctx.strokeStyle = isDark ? `rgba(16, 185, 129, ${lineAlpha})` : `rgba(5, 150, 105, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw cursor sparkles trail
      for (let k = trailsRef.current.length - 1; k >= 0; k--) {
        const trail = trailsRef.current[k];
        trail.alpha -= 0.025;
        trail.size = Math.max(0, trail.size - 0.05);

        if (trail.alpha <= 0) {
          trailsRef.current.splice(k, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = `${trail.color}${trail.alpha})`;
        ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme, density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
