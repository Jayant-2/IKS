import React, { useState } from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

export const BaudhayanaSimulator: React.FC = () => {
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);

  const diagonal = Math.sqrt(sideA * sideA + sideB * sideB);
  const areaA = sideA * sideA;
  const areaB = sideB * sideB;
  const areaDiag = diagonal * diagonal;

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-6 sm:p-7 border border-white/[0.08] shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#21F1A8]">
            Sulba Sutra Geometry Simulator · c. 800 BCE
          </span>
          <h4 className="text-lg sm:text-xl font-heading font-bold text-white">
            Baudhayana Geometric Theorem (Diagonal Cord Area)
          </h4>
        </div>
        <button
          onClick={() => { setSideA(3); setSideB(4); }}
          className="text-xs text-[#888888] hover:text-[#21F1A8] flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
          title="Reset dimensions"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="text-xs text-[#B0B0B0] italic mb-6 bg-[#171717] p-3.5 rounded-xl border border-white/[0.06]">
        "दीर्घस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ्मानी च यत् पृथग् भूते कुरुतस्तदुभयाङ् करोति ॥"
        <span className="block mt-1 text-[#21F1A8] not-italic font-mono text-[11px]">
          — Baudhayana Sulba Sutra 1.48: The cord stretched along the diagonal of a rectangle produces both the areas which the horizontal and vertical sides produce individually.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Interactive Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-[#CCCCCC] mb-1">
              <span>Horizontal side (Pārśvamānī) a:</span>
              <span className="font-mono font-bold text-[#21F1A8]">{sideA} units</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="12" 
              value={sideA} 
              onChange={(e) => setSideA(Number(e.target.value))}
              className="w-full accent-[#21F1A8] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CCCCCC] mb-1">
              <span>Vertical side (Tiryaṅmānī) b:</span>
              <span className="font-mono font-bold text-[#21F1A8]">{sideB} units</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="12" 
              value={sideB} 
              onChange={(e) => setSideB(Number(e.target.value))}
              className="w-full accent-[#21F1A8] cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#242424] border border-white/[0.06] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#888888]">Horizontal Area a²:</span>
              <span className="font-mono text-white font-semibold">{areaA} sq units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Vertical Area b²:</span>
              <span className="font-mono text-white font-semibold">{areaB} sq units</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/[0.08] text-[#21F1A8] font-bold">
              <span>Diagonal Square c² = a² + b²:</span>
              <span className="font-mono">{areaA} + {areaB} = {areaDiag.toFixed(1)} sq units</span>
            </div>
            <div className="flex justify-between text-white font-bold">
              <span>Diagonal Cord Length (c):</span>
              <span className="font-mono text-sm text-[#21F1A8]">{diagonal.toFixed(3)} units</span>
            </div>
          </div>
        </div>

        {/* Dynamic SVG Altar Diagram */}
        <div className="flex flex-col items-center justify-center p-4 bg-[#171717] rounded-xl border border-white/[0.08]">
          <svg viewBox="0 0 320 240" className="w-full max-w-[280px] h-auto">
            <defs>
              <pattern id="altarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="320" height="240" fill="url(#altarGrid)" />

            {(() => {
              const scale = 14;
              const ox = 40;
              const oy = 190;
              const w = sideA * scale;
              const h = sideB * scale;

              return (
                <g>
                  {/* Rectangle fill in charcoal & mint */}
                  <rect 
                    x={ox} 
                    y={oy - h} 
                    width={w} 
                    height={h} 
                    fill="rgba(33, 241, 168, 0.08)" 
                    stroke="#21F1A8" 
                    strokeWidth="1.5" 
                  />

                  {/* Diagonal line */}
                  <line 
                    x1={ox} 
                    y1={oy} 
                    x2={ox + w} 
                    y2={oy - h} 
                    stroke="#FFFFFF" 
                    strokeWidth="2" 
                    strokeDasharray="4 2"
                  />

                  {/* Corner indicator */}
                  <rect 
                    x={ox} 
                    y={oy - 12} 
                    width="12" 
                    height="12" 
                    fill="none" 
                    stroke="#21F1A8" 
                    strokeWidth="1" 
                  />

                  {/* Labels */}
                  <text x={ox + w / 2} y={oy + 18} fill="#21F1A8" fontSize="12" textAnchor="middle" fontFamily="monospace">
                    a = {sideA}
                  </text>
                  <text x={ox - 16} y={oy - h / 2} fill="#21F1A8" fontSize="12" textAnchor="middle" fontFamily="monospace">
                    b = {sideB}
                  </text>
                  <text x={ox + w / 2 - 10} y={oy - h / 2 - 10} fill="#FFFFFF" fontSize="12" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                    c = {diagonal.toFixed(2)}
                  </text>
                </g>
              );
            })()}
          </svg>
          <span className="text-[11px] font-mono text-[#888888] mt-2 text-center">
            Vedic Chiti (Sacrificial Altar) Rectangle Geometry
          </span>
        </div>
      </div>
    </div>
  );
};

export const TridoshaSimulator: React.FC = () => {
  const [vata, setVata] = useState(33);
  const [pitta, setPitta] = useState(33);
  const [kapha, setKapha] = useState(34);

  const total = vata + pitta + kapha;
  const vataPct = Math.round((vata / total) * 100);
  const pittaPct = Math.round((pitta / total) * 100);
  const kaphaPct = 100 - vataPct - pittaPct;

  const getDominantDosha = () => {
    const max = Math.max(vataPct, pittaPct, kaphaPct);
    if (Math.abs(vataPct - pittaPct) <= 5 && Math.abs(pittaPct - kaphaPct) <= 5) {
      return {
        title: 'Sama-Dosha (Tridoshic Harmony)',
        desc: 'Ideal balanced state according to Charaka and Sushruta. Metabolism, mental agility, and physical endurance operate in synergy.',
        recommendation: 'Maintain regular circadian rhythms (Dinacharya), seasonal diet (Ritucharya), and moderate daily mindfulness.'
      };
    }
    if (max === vataPct) {
      return {
        title: 'Vata Dominance (Air & Ether Principle)',
        desc: 'Governs biological movement, nerve impulses, breath, and creativity. High Vata causes dry skin, anxiety, or insomnia.',
        recommendation: 'Grounding warm spiced food (sesame oil, ginger), fixed sleep schedules, and restorative rest.'
      };
    }
    if (max === pittaPct) {
      return {
        title: 'Pitta Dominance (Fire & Water Principle)',
        desc: 'Governs digestion, hormonal transformation, vision, and cognitive intellect. High Pitta causes acidity or irritability.',
        recommendation: 'Cooling herbal infusions (fennel, coriander), sweet and bitter fruits, avoid excessive chili.'
      };
    }
    return {
      title: 'Kapha Dominance (Earth & Water Principle)',
      desc: 'Governs physical lubrication, anabolic tissue structure, immunity, and stability. High Kapha causes lethargy or slow digestion.',
      recommendation: 'Invigorating physical exercise, dry massage, pungent herbs (pippali, black pepper), avoid sedentary habits.'
    };
  };

  const analysis = getDominantDosha();

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-6 sm:p-7 border border-white/[0.08] shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#21F1A8]">
            Ayurvedic Homeostasis Engine · Sushruta & Charaka
          </span>
          <h4 className="text-lg sm:text-xl font-heading font-bold text-white">
            Tridosha Equilibrium Balancer
          </h4>
        </div>
        <button
          onClick={() => { setVata(33); setPitta(33); setKapha(34); }}
          className="text-xs text-[#888888] hover:text-[#21F1A8] flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Equilibrate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-[#CCCCCC] mb-1">
              <span>Vata (Kinetic / Air & Ether)</span>
              <span className="font-mono font-bold text-[#21F1A8]">{vataPct}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={vata} 
              onChange={(e) => setVata(Number(e.target.value))}
              className="w-full accent-[#21F1A8] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CCCCCC] mb-1">
              <span>Pitta (Metabolic / Fire & Water)</span>
              <span className="font-mono font-bold text-[#21F1A8]">{pittaPct}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={pitta} 
              onChange={(e) => setPitta(Number(e.target.value))}
              className="w-full accent-[#21F1A8] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#CCCCCC] mb-1">
              <span>Kapha (Structural / Water & Earth)</span>
              <span className="font-mono font-bold text-[#21F1A8]">{kaphaPct}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={kapha} 
              onChange={(e) => setKapha(Number(e.target.value))}
              className="w-full accent-[#21F1A8] cursor-pointer"
            />
          </div>

          {/* Ratio bar in charcoal & mint shades */}
          <div className="h-2 rounded-full overflow-hidden flex bg-[#171717] border border-white/10 mt-3">
            <div style={{ width: `${vataPct}%` }} className="bg-[#21F1A8] transition-all duration-200" title={`Vata ${vataPct}%`} />
            <div style={{ width: `${pittaPct}%` }} className="bg-[#17b980] transition-all duration-200" title={`Pitta ${pittaPct}%`} />
            <div style={{ width: `${kaphaPct}%` }} className="bg-[#0f6848] transition-all duration-200" title={`Kapha ${kaphaPct}%`} />
          </div>
        </div>

        {/* Diagnosis & Lifestyle Wisdom */}
        <div className="p-5 rounded-xl bg-[#242424] border border-white/[0.06] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#21F1A8] uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Constitutional Profile</span>
          </div>
          <h5 className="text-base sm:text-lg font-heading font-bold text-white">
            {analysis.title}
          </h5>
          <p className="text-xs text-[#B0B0B0] leading-relaxed">
            {analysis.desc}
          </p>
          <div className="pt-3 border-t border-white/[0.08] text-xs text-[#E0E0E0] leading-relaxed">
            <strong className="text-[#21F1A8] block mb-0.5 font-heading">Dinacharya Regimen:</strong>
            {analysis.recommendation}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MeruPrastaraSimulator: React.FC = () => {
  const [rows, setRows] = useState(5);

  const generateTriangle = (n: number) => {
    const triangle: number[][] = [];
    for (let i = 0; i < n; i++) {
      triangle[i] = [];
      triangle[i][0] = 1;
      for (let j = 1; j < i; j++) {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
      triangle[i][i] = 1;
    }
    return triangle;
  };

  const triangle = generateTriangle(rows);

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-6 sm:p-7 border border-white/[0.08] shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#21F1A8]">
            Pingala's Chandas Shastra · c. 300 BCE
          </span>
          <h4 className="text-lg sm:text-xl font-heading font-bold text-white">
            Meru Prastara (Pingala's Combinatoric Pyramid)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#888888]">Tiers:</span>
          <input 
            type="range" 
            min="3" 
            max="6" 
            value={rows} 
            onChange={(e) => setRows(Number(e.target.value))}
            className="w-20 accent-[#21F1A8] cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-[#21F1A8] w-4">{rows}</span>
        </div>
      </div>

      <p className="text-xs text-[#B0B0B0] mb-6 bg-[#171717] p-3 rounded-xl border border-white/[0.06]">
        Acharya Pingala arranged metric combinations of long (Guru) and short (Laghu) syllables into a triangular staircase ("Meru Prastara"). 
        Over 1,800 years later, this exact combinatoric array was named Pascal's Triangle in Europe.
      </p>

      {/* Visual stepped pyramid in charcoal & mint */}
      <div className="flex flex-col items-center gap-2 py-4 overflow-x-auto">
        {triangle.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#777777] w-8 text-right">
              2^{rIdx}
            </span>
            <div className="flex items-center gap-1.5">
              {row.map((num, cIdx) => (
                <div 
                  key={cIdx}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#242424] border border-white/10 hover:border-[#21F1A8]/50 flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-[#21F1A8] shadow-sm transition-colors"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#888888] font-mono">
        <span>Sum of row n equals 2^n (Total metric permutations)</span>
        <span className="text-[#21F1A8]">Combinatorics in 300 BCE</span>
      </div>
    </div>
  );
};
