import React, { useState, useRef, useCallback } from 'react';

interface SpatialTiltCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  maxTilt?: number;
}

/**
 * SpatialTiltCard - Vision Pro inspired 3D tilt card with specular glass glare,
 * dynamic perspective rotation, and spatial depth layering.
 */
export const SpatialTiltCard: React.FC<SpatialTiltCardProps> = ({
  children,
  onClick,
  className = '',
  ariaLabel,
  maxTilt = 9,
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-maxTilt to +maxTilt)
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  }, [maxTilt]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      className={`group relative overflow-hidden text-left cursor-pointer preserve-3d will-change-transform ${className}`}
      style={{
        perspective: '1000px',
        transform: `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateZ(${isHovered ? '8px' : '0px'}) scale3d(${isHovered ? 1.025 : 1}, ${isHovered ? 1.025 : 1}, 1)`,
        transition: isHovered 
          ? 'transform 0.08s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out' 
          : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease-out, border-color 0.3s ease-out',
        boxShadow: isHovered
          ? '0 16px 36px -8px rgba(0, 0, 0, 0.75), 0 0 20px rgba(33, 241, 168, 0.16)'
          : '0 4px 14px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Specular Vision Pro Glass Glare highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 z-10"
        style={{
          opacity: glare.opacity ? 0.38 : 0,
          background: `radial-gradient(circle 120px at ${glare.x}% ${glare.y}%, rgba(33, 241, 168, 0.25), rgba(255, 255, 255, 0.09) 30%, transparent 70%)`,
        }}
      />

      {/* Spatial Content with 3D Depth translation */}
      <div 
        className="relative z-0 w-full h-full preserve-3d"
        style={{
          transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)',
          transition: 'transform 0.2s ease-out',
        }}
      >
        {children}
      </div>
    </button>
  );
};
