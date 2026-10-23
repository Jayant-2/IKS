import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AppRoute } from '../types/iks';
import { SpatialTiltCard } from '../components/SpatialTiltCard';
import { 
  Compass, 
  Binary, 
  Orbit, 
  Lightbulb, 
  HeartPulse, 
  BookMarked, 
  Languages, 
  Video, 
  Sparkles, 
  BarChart3, 
  HelpCircle, 
  Clock, 
  ArrowRight, 
  RotateCcw,
  Check,
  ChevronRight,
  Filter
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: AppRoute) => void;
}

interface DestinationItem {
  id: string;
  name: string;
  route: AppRoute;
  category: 'discipline' | 'practice' | 'tools';
  sanskrit: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: 'explore',
    name: 'Explore IKS',
    route: '/explore',
    category: 'tools',
    sanskrit: 'Anveshana',
    description: 'Interactive map & 3,000-year timeline',
    badge: 'Chronology',
    icon: Compass,
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    route: '/mathematics',
    category: 'discipline',
    sanskrit: 'Ganita Shastra',
    description: 'Sulba Sutras, zero & Kerala calculus',
    badge: 'Ganita',
    icon: Binary,
  },
  {
    id: 'astronomy',
    name: 'Astronomy',
    route: '/astronomy',
    category: 'discipline',
    sanskrit: 'Jyotisha',
    description: 'Surya Siddhanta & celestial mechanics',
    badge: 'Jyotisha',
    icon: Orbit,
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    route: '/philosophy',
    category: 'discipline',
    sanskrit: 'Darshana',
    description: 'Nyaya epistemology & Vedanta metaphysics',
    badge: 'Darshana',
    icon: Lightbulb,
  },
  {
    id: 'ayurveda',
    name: 'Ayurveda',
    route: '/ayurveda',
    category: 'discipline',
    sanskrit: 'Ayurveda',
    description: 'Charaka, Sushruta & Tridosha theory',
    badge: 'Chikitsa',
    icon: HeartPulse,
  },
  {
    id: 'literature',
    name: 'Literature',
    route: '/literature',
    category: 'discipline',
    sanskrit: 'Sahitya',
    description: 'Kalidasa kavya, drama & Natyashastra',
    badge: 'Sahitya',
    icon: BookMarked,
  },
  {
    id: 'sanskrit',
    name: 'Learn Sanskrit',
    route: '/sanskrit',
    category: 'practice',
    sanskrit: 'Vyakaranam',
    description: 'Panini generative grammar & phonetics',
    badge: 'Grammar',
    icon: Languages,
  },
  {
    id: 'video-learning',
    name: 'Video Learning',
    route: '/video-learning',
    category: 'tools',
    sanskrit: 'Chitra Shravana',
    description: 'Curated YouTube resource hub',
    badge: '8 Videos',
    icon: Video,
  },
  {
    id: 'ai-tutor',
    name: 'AI Tutor',
    route: '/ai-tutor',
    category: 'tools',
    sanskrit: 'Vidya Guru',
    description: 'Interactive Indic manuscript scholar',
    badge: 'Interactive',
    icon: Sparkles,
  },
  {
    id: 'study-tracker',
    name: 'Study Tracker',
    route: '/study-tracker',
    category: 'practice',
    sanskrit: 'Abhyasa Pustika',
    description: 'Mastery scores & assessment ledger',
    badge: 'Progress',
    icon: BarChart3,
  },
  {
    id: 'quizzes',
    name: 'Quiz Center',
    route: '/quizzes',
    category: 'practice',
    sanskrit: 'Prashnottari',
    description: 'Topic-wise practice with citations',
    badge: 'Practice',
    icon: HelpCircle,
  },
  {
    id: 'mock-tests',
    name: 'Mock Test Center',
    route: '/mock-tests',
    category: 'practice',
    sanskrit: 'Pariksha',
    description: 'Timed full-length exam simulations',
    badge: 'Timed Exam',
    icon: Clock,
  },
];

type CategoryFilter = 'all' | 'discipline' | 'practice' | 'tools';

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('all');

  // 3D Celestial Globe State & Gestures
  const [rotation, setRotation] = useState({ x: 12, y: -20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isGlobeHovered, setIsGlobeHovered] = useState(false);
  const [cursorTilt, setCursorTilt] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Six classical IKS knowledge domains represented on the 3D celestial sphere
  const IKS_SPATIAL_DOMAINS = useMemo(() => [
    {
      name: 'Astronomy & Astrophysics',
      sanskrit: 'Jyotisha',
      route: '/astronomy' as AppRoute,
      icon: Orbit,
    },
    {
      name: 'Mathematics & Algorithms',
      sanskrit: 'Ganita Shastra',
      route: '/mathematics' as AppRoute,
      icon: Binary,
    },
    {
      name: 'Classical Philosophy',
      sanskrit: 'Darshana',
      route: '/philosophy' as AppRoute,
      icon: Lightbulb,
    },
    {
      name: 'Ayurvedic Medicine',
      sanskrit: 'Ayurveda',
      route: '/ayurveda' as AppRoute,
      icon: HeartPulse,
    },
    {
      name: 'Literature & Aesthetics',
      sanskrit: 'Sahitya',
      route: '/literature' as AppRoute,
      icon: BookMarked,
    },
    {
      name: 'Generative Linguistics',
      sanskrit: 'Vyakaranam',
      route: '/sanskrit' as AppRoute,
      icon: Languages,
    },
  ], []);

  // Compute currently facing active domain based on globe azimuth rotation angle
  const normalizedY = ((rotation.y % 360) + 360) % 360;
  const activeDomainIndex = Math.floor(normalizedY / (360 / IKS_SPATIAL_DOMAINS.length)) % IKS_SPATIAL_DOMAINS.length;
  const activeDomain = IKS_SPATIAL_DOMAINS[activeDomainIndex];

  const dragStartRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastTouchTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Motion preference and mobile device detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      const isNarrow = window.innerWidth <= 1024;
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

  // Continuous smooth auto-moving rotation of the celestial globe (always moving)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      if (!isDragging) {
        setRotation((prev) => ({
          ...prev,
          // Continuous smooth auto-spin: ~15 degrees per second
          y: (prev.y + 0.35 * (dt / 16.67)) % 360,
        }));
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  // Touch handlers for mobile spinning
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

    velocityRef.current = {
      x: deltaX / dt,
      y: deltaY / dt,
    };

    setRotation((prev) => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.4)),
      y: prev.y + deltaX * 0.5,
    }));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    let vx = velocityRef.current.x * 12;
    let vy = velocityRef.current.y * 8;

    if (Math.abs(vx) < 0.2 && Math.abs(vy) < 0.2) return;

    const decayInertia = () => {
      vx *= 0.92;
      vy *= 0.92;

      setRotation((prev) => ({
        x: Math.max(-45, Math.min(45, prev.x - vy * 0.2)),
        y: prev.y + vx * 0.3,
      }));

      if (Math.abs(vx) > 0.05 || Math.abs(vy) > 0.05) {
        animationFrameRef.current = requestAnimationFrame(decayInertia);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(decayInertia);
  };

  // Pointer handlers for desktop mouse spinning
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;

    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      setRotation((prev) => ({
        x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.3)),
        y: prev.y + deltaX * 0.4,
      }));
    } else {
      // Mouse-tracking tilt interactions: globe gently tilts towards cursor
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Gentle responsive tilt (up to 12 degrees)
      const maxTilt = 12;
      const tiltX = -((y - centerY) / centerY) * maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      setCursorTilt({
        x: Math.max(-maxTilt, Math.min(maxTilt, tiltX)),
        y: Math.max(-maxTilt, Math.min(maxTilt, tiltY)),
      });
    }
  };

  const handleGlobeMouseLeave = () => {
    setIsGlobeHovered(false);
    setCursorTilt({ x: 0, y: 0 });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Filtered destinations
  const visibleDestinations = useMemo(() => {
    if (selectedFilter === 'all') return DESTINATIONS;
    return DESTINATIONS.filter((d) => d.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="w-full relative bg-[#171717] text-[#EDEDED] min-h-[calc(100vh-64px)] flex flex-col justify-between selection:bg-[#21F1A8]/20 selection:text-[#21F1A8] overflow-x-hidden">
      
      {/* Background Cosmic Video (Running clearly: "agaru jemiti clear video chalu thila semiti kar") */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          src="/assets/aistudio/SaveClip.App_AQP-1_s6oKgmomsX2xzlp9k9a8r_Dx_s0F0w7MaLZbWhAkL3TLyL_i5igfDTiM0XZmg37G7JDVbQUqeP8GQeHgXsyKi3h4ZnrwIb3fs_0ab74794.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-85 filter brightness-105 contrast-110"
        />
        {/* Soft atmospheric gradient allowing crystal clear video visibility with clean text legibility */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-[#171717]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#171717]/20 to-[#171717]/60" />
      </div>

      {/* Subtle mint aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#21F1A8]/[0.05] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* =========================================================================
          SECTION 1 (TOP/MIDDLE): 3D Globe in Middle of Front Page ("3d glob ta front page ra middle re rakha")
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8 flex flex-col items-center text-center">
        
        {/* Kicker Tag (Words & Lines in Black, Blue & Neon Rose) */}
        <div className="inline-flex items-center gap-2 text-xs font-mono font-medium px-3.5 py-1.5 bg-black/90 rounded-full border border-[#FF1361]/50 backdrop-blur-md shadow-lg shadow-black/60 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#FF1361] shadow-[0_0_8px_#FF1361] animate-pulse" />
          <span className="text-[#38BDF8] tracking-wider font-semibold">INDIAN KNOWLEDGE SYSTEMS</span>
          <span className="text-[#FF1361]/80">·</span>
          <span className="text-[#00D2FF] tracking-wider font-semibold">SPATIAL UNIVERSE</span>
        </div>

        {/* Centered Main Headline (Words in Blue & Neon Rose) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[1.12] mb-3 max-w-3xl drop-shadow-lg">
          Discover the Timeless <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#38BDF8] to-[#FF1361] bg-clip-text text-transparent drop-shadow-md">
            Knowledge of India.
          </span>
        </h1>

        {/* Short supporting subtitle (Words in soft Celestial Blue) */}
        <p className="text-xs sm:text-sm md:text-base text-[#BAE6FD]/90 max-w-xl mb-6 font-body leading-relaxed drop-shadow">
          Explore foundational Indian mathematics, ancient astronomy, philosophy, Ayurveda, and Panini's linguistics through an interactive spatial museum.
        </p>

        {/* Interactive 3D Knowledge Globe in the Center */}
        <div 
          className="relative flex flex-col items-center select-none my-2 group"
          onMouseEnter={() => setIsGlobeHovered(true)}
          onMouseLeave={() => setIsGlobeHovered(false)}
        >
          
          <div
            className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 cursor-grab active:cursor-grabbing perspective-universe flex items-center justify-center touch-none transition-transform active:scale-[1.02] animate-globe-always-moving"
            style={{
              transform: `perspective(1000px) rotateX(${cursorTilt.x.toFixed(2)}deg) rotateY(${cursorTilt.y.toFixed(2)}deg)`,
              transition: isDragging ? 'none' : 'transform 0.12s ease-out',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onMouseEnter={() => setIsGlobeHovered(true)}
            onMouseLeave={handleGlobeMouseLeave}
            title="Swipe or drag to spin the 3D knowledge globe"
            role="region"
            aria-label="Interactive 3D celestial knowledge globe"
          >
            {/* Outer Subtle Boundary Line */}
            <div className="absolute inset-0 rounded-full border border-[#38BDF8]/25 pointer-events-none" />

            {/* 3D Sphere Container */}
            <div 
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 relative preserve-3d"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
              }}
            >
              {/* Equatorial Celestial Ring Line (Electric Blue) */}
              <div 
                className="absolute inset-0 rounded-full border border-[#00D2FF]/75 shadow-[0_0_20px_rgba(0,210,255,0.3)] preserve-3d"
                style={{ transform: 'rotateX(90deg)' }}
              >
                <div className="absolute inset-1.5 rounded-full border border-dashed border-[#00D2FF]/35" />
              </div>

              {/* Meridian Ring Line (Ice Blue) */}
              <div 
                className="absolute inset-0 rounded-full border border-[#38BDF8]/35 preserve-3d"
                style={{ transform: 'rotateY(0deg)' }}
              />

              {/* Colure Ring Line (Deep Blue) */}
              <div 
                className="absolute inset-0 rounded-full border border-[#2563EB]/40 preserve-3d"
                style={{ transform: 'rotateY(90deg)' }}
              />

              {/* Oblique Ecliptic Ring Line (Neon Rose at 23.5 deg) */}
              <div 
                className="absolute inset-0 rounded-full border border-[#FF1361]/85 shadow-[0_0_20px_rgba(255,19,97,0.38)] preserve-3d"
                style={{ transform: 'rotateX(66.5deg) rotateY(15deg)' }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FF1361] shadow-md shadow-[#FF1361]" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FF1361] shadow-md shadow-[#FF1361]" />
              </div>

              {/* Central Circular Globe (Electric Blue & Neon Rose Border Lines) */}
              <div 
                className="absolute inset-10 sm:inset-12 rounded-full overflow-hidden border border-[#00D2FF]/85 shadow-[0_0_25px_rgba(0,210,255,0.4)] bg-black flex items-center justify-center animate-circle-auto-moving"
                role="img"
                aria-label="Ancient Indian Celestial Knowledge Globe"
              >
                <video
                  src="/assets/aistudio/WhatsApp_Video_2026-10-23_at_4.23.38_PM_066e68a8.mp4"
                  poster="/assets/aistudio/globe-fallback.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-110 pointer-events-none"
                >
                  <source src="/assets/aistudio/WhatsApp_Video_2026-10-23_at_4.23.38_PM_066e68a8.mp4" type="video/mp4" />
                  <img
                    src="/assets/aistudio/globe-fallback.jpg"
                    alt="Ancient Indian Celestial Globe"
                    className="w-full h-full object-cover scale-110"
                  />
                </video>
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#FF1361]/40 pointer-events-none" />
              </div>

              {/* Orbiting Nakshatras (Neon Rose & Electric Blue) */}
              <div 
                className="absolute w-2.5 h-2.5 rounded-full bg-[#FF1361] shadow-[0_0_12px_#FF1361]"
                style={{ transform: 'translate3d(85px, 25px, 50px)' }}
                title="Rohini"
              />
              <div 
                className="absolute w-2 h-2 rounded-full bg-[#00D2FF] shadow-[0_0_10px_#00D2FF]"
                style={{ transform: 'translate3d(-75px, 80px, -35px)' }}
                title="Ashwini"
              />
              <div 
                className="absolute w-2 h-2 rounded-full bg-[#FF2E93] shadow-[0_0_10px_#FF2E93]"
                style={{ transform: 'translate3d(25px, -80px, 45px)' }}
                title="Ardra"
              />
            </div>
          </div>

          {/* Subtle Floating Label on Hover (Words & Lines in Black, Blue & Neon Rose) */}
          <div 
            className={`transition-all duration-300 ease-out flex items-center justify-center mt-3 z-20 ${
              isGlobeHovered 
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
            }`}
            role="status"
            aria-live="polite"
          >
            <button
              type="button"
              onClick={() => onNavigate(activeDomain.route)}
              className="group/pill inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/95 border border-[#FF1361]/60 shadow-[0_8px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(255,19,97,0.3)] backdrop-blur-xl hover:border-[#00D2FF] hover:bg-[#070b19] active:scale-95 transition-all cursor-pointer text-xs"
              title={`Explore ${activeDomain.name} (${activeDomain.sanskrit})`}
            >
              <span className="w-2 h-2 rounded-full bg-[#FF1361] shadow-[0_0_8px_#FF1361] animate-pulse" />
              <activeDomain.icon className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span className="font-heading font-semibold text-white tracking-wide">{activeDomain.name}</span>
              <span className="font-mono text-[11px] text-[#FF2E93] bg-[#FF1361]/15 px-2 py-0.5 rounded-full border border-[#FF1361]/40 font-semibold">
                {activeDomain.sanskrit}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover/pill:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Auto-Rotating Sphere Indicator (Lines & Words in Black & Electric Blue) */}
          <div className={`flex items-center justify-center gap-2 text-xs font-mono text-[#CCCCCC] transition-all duration-300 ${isGlobeHovered ? 'mt-1.5' : 'mt-2.5'}`}>
            <div className="flex items-center gap-2 text-[#00D2FF] px-3 py-1 rounded-full bg-black/85 border border-[#00D2FF]/35 shadow-sm backdrop-blur-md">
              <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="tracking-wide">Auto-Rotating Celestial Sphere</span>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          SECTION 2 (BOTTOM): The Learning Destinations Section Placed Down Below ("ei page ta ku talaku neija")
          Targeted element: div#root > div > main > div > div > div > div > div
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-2">
        
        {/* The Focused Destination Card Container with Indic Cosmic Art Background Image */}
        <div 
          className="relative overflow-hidden backdrop-blur-xl border border-[#21F1A8]/30 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(33,241,168,0.12)] space-y-4 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(23, 23, 23, 0.88), rgba(20, 24, 22, 0.74), rgba(23, 23, 23, 0.88)), url('/assets/aistudio/WhatsApp_Image_2026-10-23_at_4.48.02_PM_9c97e980.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#171717',
          }}
        >
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2.5">
                <span>Learning Destinations</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#21F1A8]/15 text-[#21F1A8] border border-[#21F1A8]/30 font-semibold">
                  12 Interactive Modules
                </span>
              </h2>
              <p className="text-xs text-[#A0A0A0] font-body mt-0.5">
                Select any knowledge domain below to open its dedicated learning interface.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All (12)' },
                { id: 'discipline', label: 'Disciplines (5)' },
                { id: 'practice', label: 'Practice & Exams (4)' },
                { id: 'tools', label: 'Tools (3)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as CategoryFilter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer min-h-[36px] flex items-center gap-1 ${
                    selectedFilter === tab.id
                      ? 'bg-[#21F1A8] text-[#171717] font-bold shadow-sm'
                      : 'bg-[#242424] text-[#A0A0A0] hover:text-white border border-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 12 Destination Cards Responsive Grid with Vision Pro 3D-Tilt Hover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {visibleDestinations.map((item) => {
              const Icon = item.icon;
              return (
                <SpatialTiltCard
                  key={item.id}
                  onClick={() => onNavigate(item.route)}
                  className="p-3 rounded-xl bg-[#202020]/90 hover:bg-[#252525] border border-white/[0.08] hover:border-[#21F1A8]/55 flex flex-col justify-between text-left min-h-[98px] backdrop-blur-md"
                  ariaLabel={`Navigate to ${item.name}`}
                  maxTilt={10}
                >
                  <div className="flex items-start justify-between w-full mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#181818] border border-white/10 group-hover:border-[#21F1A8]/50 group-hover:bg-[#21F1A8]/15 text-[#21F1A8] flex items-center justify-center shrink-0 transition-colors shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181818]/90 border border-white/[0.06] text-[#888888] group-hover:text-[#21F1A8] group-hover:border-[#21F1A8]/30 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-heading font-bold text-white group-hover:text-[#21F1A8] transition-colors truncate">
                        {item.name}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#666666] group-hover:text-[#21F1A8] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </div>
                    <p className="text-[10px] text-[#888888] group-hover:text-[#BBBBBB] font-body line-clamp-1 mt-0.5 transition-colors">
                      {item.description}
                    </p>
                  </div>
                </SpatialTiltCard>
              );
            })}
          </div>

          {/* Quick Access & Canonical Note */}
          <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#888888]">
            <div className="flex items-center gap-2">
              <span className="text-[#21F1A8]">Quick Access:</span>
              <button 
                onClick={() => onNavigate('/quizzes')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Quizzes
              </button>
              <span>·</span>
              <button 
                onClick={() => onNavigate('/mock-tests')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Mock Tests
              </button>
              <span>·</span>
              <button 
                onClick={() => onNavigate('/sanskrit')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Learn Sanskrit
              </button>
              <span>·</span>
              <button 
                onClick={() => onNavigate('/video-learning')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Videos
              </button>
            </div>

            <div className="text-[#A0A0A0] text-[11px]">
              Academic Open Resource · Vision Pro Depth Architecture
            </div>
          </div>

        </div>

      </div>

      {/* Institutional Minimal Footer on Desktop */}
      <div className="relative z-10 w-full border-t border-white/[0.06] bg-[#171717]/90 backdrop-blur-md py-3 px-4 sm:px-6 flex items-center justify-between text-xs text-[#666666] font-mono">
        <div className="flex items-center gap-4">
          <span>Primary Canons: Aryabhatiya · Sulba Sutras · Ashtadhyayi · Charaka Samhita</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Vision Pro Spatial Architecture</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#21F1A8]">© {new Date().getFullYear()} IKS Explorer AI</span>
        </div>
      </div>

    </div>
  );
};
