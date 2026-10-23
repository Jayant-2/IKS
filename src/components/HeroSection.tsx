import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Orbit } from 'lucide-react';

interface HeroSectionProps {
  onStartExploring: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartExploring }) => {
  const [rotation, setRotation] = useState({ x: 12, y: -15 });
  const [isDragging, setIsDragging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastTouchTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Detect accessibility motion preferences and mobile devices for performance
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      const isNarrow = window.innerWidth <= 640;
      const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      setIsMobileDevice(Boolean(isNarrow && isTouch));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Restrained auto-rotation when user is not dragging and does not prefer reduced motion
  useEffect(() => {
    if (isDragging || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        ...prev,
        y: (prev.y + 0.12) % 360,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [isDragging, prefersReducedMotion]);

  // Touch event handlers for mobile gesture spinning with momentum inertia
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    lastTouchTimeRef.current = performance.now();
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const now = performance.now();
    const dt = Math.max(1, now - lastTouchTimeRef.current);

    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    lastTouchTimeRef.current = now;

    // Track instant velocity for kinetic release spin
    velocityRef.current = {
      x: deltaX / dt,
      y: deltaY / dt,
    };

    setRotation((prev) => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.45)),
      y: prev.y + deltaX * 0.6,
    }));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Kinetic momentum spin on finger release
    let vx = velocityRef.current.x * 14;
    let vy = velocityRef.current.y * 10;

    if (Math.abs(vx) < 0.2 && Math.abs(vy) < 0.2) return;

    const decayInertia = () => {
      vx *= 0.92;
      vy *= 0.92;

      setRotation((prev) => ({
        x: Math.max(-45, Math.min(45, prev.x - vy * 0.25)),
        y: prev.y + vx * 0.35,
      }));

      if (Math.abs(vx) > 0.05 || Math.abs(vy) > 0.05) {
        animationFrameRef.current = requestAnimationFrame(decayInertia);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(decayInertia);
  };

  // Mouse / Pointer fallback handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return; // Handled by touch handlers
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || e.pointerType === 'touch') return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.3)),
      y: prev.y + deltaX * 0.4,
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <section className="relative w-full bg-[#171717] pt-8 sm:pt-14 pb-16 px-4 sm:px-6 overflow-hidden flex flex-col items-center">
      {/* Full Cosmic Vortex Video Background (Without Music / Muted) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          src="/assets/aistudio/SaveClip.App_AQP-1_s6oKgmomsX2xzlp9k9a8r_Dx_s0F0w7MaLZbWhAkL3TLyL_i5igfDTiM0XZmg37G7JDVbQUqeP8GQeHgXsyKi3h4ZnrwIb3fs_0ab74794.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 filter brightness-90 saturate-125"
        />
        {/* Scrim overlays for contrast and #171717 charcoal tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/50 to-[#171717]/85" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#171717]/40 to-[#171717]" />
      </div>

      {/* Subtle charcoal gradient aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#21F1A8]/[0.04] rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10 w-full">
        
        {/* Subtle kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#21F1A8] mb-4 px-3 py-1 bg-[#171717]/80 rounded-full border border-[#21F1A8]/30 backdrop-blur-md">
          <span>Indian Knowledge Systems</span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>Spatial Universe</span>
        </div>

        {/* Oversized Expressive Headline with Space Grotesk */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[1.12] mb-4 max-w-3xl text-balance">
          Discover the Timeless <br className="hidden sm:inline" />
          <span className="text-[#21F1A8]">Knowledge of India.</span>
        </h1>

        {/* One short supporting sentence */}
        <p className="text-sm sm:text-base md:text-lg text-[#B0B0B0] max-w-xl mb-8 leading-relaxed font-body text-balance">
          Explore foundational Indian mathematics, ancient astronomy, philosophy, Ayurveda, and Panini's linguistics through an interactive spatial museum.
        </p>

        {/* Prominent "Start Exploring" Action Button (Mint #21F1A8) */}
        <button
          onClick={onStartExploring}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 active:scale-95 rounded-xl shadow-lg shadow-[#21F1A8]/20 hover:shadow-[#21F1A8]/30 transition-all min-h-[48px] min-w-[200px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#21F1A8]"
        >
          <span>Start Exploring</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* 3D-Inspired Knowledge Globe & Armillary Celestial Sphere */}
        <div 
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mt-10 mb-6 cursor-grab active:cursor-grabbing select-none perspective-universe flex items-center justify-center touch-none active:scale-[1.02] transition-transform duration-150"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          title="Swipe or drag to spin the 3D celestial knowledge globe"
          role="region"
          aria-label="Interactive 3D celestial sphere. Drag or swipe on mobile to rotate."
          tabIndex={0}
        >
          {/* Subtle Outer Ecliptic Ring */}
          <div className="absolute inset-0 rounded-full border border-white/[0.08] pointer-events-none flex items-center justify-center" />

          {/* 3D Preserve-3D Sphere Container */}
          <div 
            className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 relative preserve-3d transition-transform duration-75"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            }}
          >
            {/* Equatorial Celestial Ring */}
            <div 
              className="absolute inset-0 rounded-full border border-[#21F1A8]/40 shadow-[0_0_20px_rgba(33,241,168,0.15)] preserve-3d"
              style={{ transform: 'rotateX(90deg)' }}
            >
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[#21F1A8]/20" />
            </div>

            {/* Meridian Ring */}
            <div 
              className="absolute inset-0 rounded-full border border-white/20 preserve-3d"
              style={{ transform: 'rotateY(0deg)' }}
            />

            {/* Colure Ring */}
            <div 
              className="absolute inset-0 rounded-full border border-white/10 preserve-3d"
              style={{ transform: 'rotateY(90deg)' }}
            />

            {/* Oblique Ring (Kranti Vritta / Ecliptic tilted at 23.5 deg) */}
            <div 
              className="absolute inset-0 rounded-full border border-[#21F1A8]/60 shadow-[0_0_15px_rgba(33,241,168,0.25)] preserve-3d"
              style={{ transform: 'rotateX(66.5deg) rotateY(15deg)' }}
            >
              {/* Orbiting points on the ring */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#21F1A8] shadow-md shadow-[#21F1A8]" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#21F1A8] shadow-md shadow-[#21F1A8]" />
            </div>

            {/* Central Circular Celestial Globe (With high-performance static fallback for mobile & reduced motion) */}
            <div 
              className="absolute inset-12 sm:inset-14 rounded-full overflow-hidden border border-[#21F1A8]/60 shadow-[0_0_25px_rgba(33,241,168,0.3)] bg-black flex items-center justify-center"
              role="img"
              aria-label="Ancient Indian Celestial Knowledge Globe"
            >
              {prefersReducedMotion || isMobileDevice ? (
                /* High-Quality Static Image Fallback for Mobile and Reduced Motion */
                <img
                  src="/assets/aistudio/globe-fallback.jpg"
                  alt="Ancient Indian Celestial Knowledge Globe"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover scale-110 pointer-events-none select-none transition-opacity duration-300"
                />
              ) : (
                /* Smooth Celestial Loop without Music */
                <video
                  src="/assets/aistudio/WhatsApp_Video_2026-10-23_at_4.23.38_PM_066e68a8.mp4"
                  poster="/assets/aistudio/globe-fallback.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-110 pointer-events-none motion-reduce:hidden"
                >
                  <source src="/assets/aistudio/WhatsApp_Video_2026-10-23_at_4.23.38_PM_066e68a8.mp4" type="video/mp4" />
                  <source src="/assets/aistudio/SaveClip.App_AQPna0idJvQ_4qJxVX74hcgvVRvGaBicv91WaXqOP8IpIpa6AtxpwERZJ9jChZOihGbUkl27OAEU4-tOmyytA9ZpeHxw338jOC4XGkk_a5c4941d.mp4" type="video/mp4" />
                  <img
                    src="/assets/aistudio/globe-fallback.jpg"
                    alt="Ancient Indian Celestial Knowledge Globe"
                    className="w-full h-full object-cover scale-110"
                  />
                </video>
              )}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#21F1A8]/30 pointer-events-none" />
            </div>

            {/* Orbiting Nakshatra points */}
            <div 
              className="absolute w-2.5 h-2.5 rounded-full bg-[#21F1A8] shadow-[0_0_10px_#21F1A8]"
              style={{ transform: 'translate3d(100px, 30px, 60px)' }}
              title="Rohini"
            />
            <div 
              className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
              style={{ transform: 'translate3d(-80px, 90px, -40px)' }}
              title="Ashwini"
            />
            <div 
              className="absolute w-2 h-2 rounded-full bg-[#21F1A8]/80 shadow-[0_0_8px_#21F1A8]"
              style={{ transform: 'translate3d(20px, -90px, 50px)' }}
              title="Ardra"
            />
          </div>

          {/* Touch-Friendly Interaction Controls & Prompt */}
          <div className="absolute -bottom-7 flex items-center gap-2 text-[11px] font-mono text-white/60">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setRotation((prev) => ({ ...prev, y: prev.y - 35 }));
              }}
              className="px-2.5 py-1 rounded-md bg-[#242424] hover:bg-[#2c2c2c] active:bg-[#333333] border border-white/10 text-white/80 active:scale-95 transition-all cursor-pointer min-h-[32px] flex items-center gap-1 touch-manipulation"
              title="Spin left"
              aria-label="Spin 3D globe left"
            >
              <span>⟲</span>
              <span className="text-[10px]">Spin</span>
            </button>

            <span className="flex items-center gap-1.5 text-[#888888] px-1">
              <Orbit className="w-3.5 h-3.5 text-[#21F1A8]" />
              <span>{isMobileDevice ? 'Swipe to spin globe' : 'Drag or swipe to spin'}</span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setRotation((prev) => ({ ...prev, y: prev.y + 35 }));
              }}
              className="px-2.5 py-1 rounded-md bg-[#242424] hover:bg-[#2c2c2c] active:bg-[#333333] border border-white/10 text-white/80 active:scale-95 transition-all cursor-pointer min-h-[32px] flex items-center gap-1 touch-manipulation"
              title="Spin right"
              aria-label="Spin 3D globe right"
            >
              <span className="text-[10px]">Spin</span>
              <span>⟳</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
