import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Orbit, Compass, Play, BookOpen } from 'lucide-react';

interface HeroGlobeProps {
  onExploreClick: () => void;
  onOpenTutor: () => void;
}

export const HeroGlobe: React.FC<HeroGlobeProps> = ({ onExploreClick, onOpenTutor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState({ x: 15, y: -20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Floating golden particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;
        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `rgba(251, 191, 36, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow around larger particles
        if (p.size > 1.8) {
          ctx.fillStyle = `rgba(245, 158, 11, ${currentOpacity * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Subtle continuous auto-rotation if not dragging
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        ...prev,
        y: (prev.y + 0.18) % 360,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.3)),
      y: prev.y + deltaX * 0.4,
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-gradient-to-b from-[#030712] via-[#070d1e] to-[#040817]"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Architectural Canvas & Halo */}
      <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen overflow-hidden">
        <img 
          src="/assets/aistudio/WhatsApp_Image_2026-10-23_at_2.52.15_PM_97def166.jpeg" 
          alt="Ancient Indian sanctuary with sage and manuscripts"
          className="w-full h-full object-cover object-center filter saturate-125 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/60 to-[#030712]" />
      </div>

      {/* Golden Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10" 
      />

      {/* Subtle Cosmic Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />

      {/* Main Content Layout */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-amber-300/90 mb-4 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-400/20 backdrop-blur-md">
          <span>Ancient Wisdom</span>
          <span aria-hidden="true" className="text-amber-500">·</span>
          <span>Spatial Universe</span>
          <span aria-hidden="true" className="text-amber-500">·</span>
          <span>Modern Insight</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-medium tracking-tight text-white mb-6 leading-tight max-w-4xl text-balance">
          Explore India's <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">Timeless Wisdom</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed font-sans text-balance">
          Enter an interactive spatial knowledge universe. Discover the breakthroughs of Indian Mathematics, Ancient Astronomy, Philosophy, Ayurveda, and Panini's Linguistics.
        </p>

        {/* 3D Knowledge Globe & Gola Yantra Visualizer */}
        <div 
          className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 my-2 cursor-grab active:cursor-grabbing select-none perspective-universe flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          title="Click and drag to rotate the ancient celestial armillary sphere"
        >
          {/* Glowing Sanskrit Orbit Ring */}
          <div 
            className="absolute inset-0 rounded-full border border-amber-400/20 animate-celestial pointer-events-none flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.15)]"
          >
            <div className="absolute -top-3 text-[11px] font-serif text-amber-300/80 tracking-widest uppercase bg-[#030712]/90 px-2 py-0.5 rounded border border-amber-500/30">
              सत्यं · ज्ञानं · अनन्तम्
            </div>
            <div className="absolute -bottom-3 text-[11px] font-serif text-amber-300/80 tracking-widest uppercase bg-[#030712]/90 px-2 py-0.5 rounded border border-amber-500/30">
              खगोल मण्डल · गोल यन्त्र
            </div>
          </div>

          {/* 3D Preserved Transform Sphere Container */}
          <div 
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 relative preserve-3d transition-transform duration-75"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            }}
          >
            {/* Outer Golden Armillary Ring (Equator) */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-amber-400/70 shadow-[0_0_25px_rgba(251,191,36,0.4)] preserve-3d"
              style={{ transform: 'rotateX(90deg)' }}
            >
              {/* Radial Degree Markers */}
              <div className="absolute inset-2 rounded-full border border-dashed border-amber-300/40" />
            </div>

            {/* Meridian Ring */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-amber-300/60 shadow-[0_0_20px_rgba(251,191,36,0.3)] preserve-3d"
              style={{ transform: 'rotateY(0deg)' }}
            />

            {/* Solstitial Colure Ring */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-amber-500/50 preserve-3d"
              style={{ transform: 'rotateY(90deg)' }}
            />

            {/* Ecliptic Oblique Ring (Kranti Vritta - tilted ~23.5 degrees) */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-amber-200/80 shadow-[0_0_30px_rgba(254,240,138,0.5)] preserve-3d"
              style={{ transform: 'rotateX(66.5deg) rotateY(15deg)' }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-md shadow-amber-300" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-md shadow-amber-300" />
            </div>

            {/* Central Luminous Core / Bhugola (Earth & Knowledge Core) */}
            <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-amber-700 via-amber-500 to-yellow-200 opacity-90 blur-[1px] shadow-[0_0_60px_rgba(245,158,11,0.6)] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#030712]/70 backdrop-blur-sm flex items-center justify-center border border-amber-300/50">
                <span className="font-serif text-amber-200 font-bold text-2xl animate-pulse-subtle">
                  ज्ञान
                </span>
              </div>
            </div>

            {/* Floating Nakshatra Pin Points in 3D */}
            <div 
              className="absolute w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24]"
              style={{ transform: 'translate3d(120px, 40px, 80px)' }}
              title="Rohini Nakshatra"
            />
            <div 
              className="absolute w-2.5 h-2.5 rounded-full bg-yellow-200 shadow-[0_0_10px_#fde047]"
              style={{ transform: 'translate3d(-90px, 110px, -50px)' }}
              title="Ashwini Nakshatra"
            />
            <div 
              className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]"
              style={{ transform: 'translate3d(30px, -110px, 70px)' }}
              title="Ardra Nakshatra"
            />
          </div>

          {/* Interactive Hint */}
          <div className="absolute -bottom-8 text-[11px] font-sans text-slate-400 flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <Orbit className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Drag to inspect the Gola Yantra armillary sphere</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <button
            onClick={onExploreClick}
            className="px-6 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
          >
            <span>Explore 6 Portals</span>
            <ArrowDown className="w-4 h-4 text-slate-950 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenTutor}
            className="px-6 py-3 text-sm font-medium text-amber-200 bg-white/[0.04] hover:bg-white/[0.08] border border-amber-400/30 hover:border-amber-400/60 rounded-xl backdrop-blur-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Consult AI Manuscript Sage</span>
          </button>
        </div>

        {/* Quick Domain Anchors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 w-full max-w-4xl mt-14 pt-8 border-t border-white/[0.08]">
          {[
            { label: 'Mathematics', sub: 'Zero & Calculus' },
            { label: 'Astronomy', sub: 'Planetary Orbits' },
            { label: 'Philosophy', sub: '6 Darshanas' },
            { label: 'Ayurveda', sub: 'Surgical Science' },
            { label: 'Linguistics', sub: 'Panini Grammar' },
            { label: 'Architecture', sub: 'Temple Acoustics' }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="text-left px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/30 transition-colors"
            >
              <div className="text-xs font-semibold text-slate-200">{item.label}</div>
              <div className="text-[11px] text-amber-400/80 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
