import React, { useState } from 'react';
import { AppRoute } from '../types/iks';
import { 
  ArrowLeft, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight,
  RotateCcw,
  ExternalLink,
  Code2
} from 'lucide-react';

interface SanskritLearningPageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenTutorWithPrompt: (prompt: string) => void;
}

interface PhoneticGroup {
  sthana: string;
  organ: string;
  devanagari: string[];
  iast: string[];
  description: string;
}

const PHONETIC_GROUPS: PhoneticGroup[] = [
  {
    sthana: 'Kantha (कण्ठ्य)',
    organ: 'Velar / Throat',
    devanagari: ['अ', 'आ', 'क', 'ख', 'ग', 'घ', 'ङ', 'ह'],
    iast: ['a', 'ā', 'ka', 'kha', 'ga', 'gha', 'ṅa', 'ha'],
    description: 'Vocalized from the base of the throat without contact with the tongue blade.',
  },
  {
    sthana: 'Talu (तालव्य)',
    organ: 'Palatal / Hard Palate',
    devanagari: ['इ', 'ई', 'च', 'छ', 'ज', 'झ', 'ञ', 'य', 'श'],
    iast: ['i', 'ī', 'ca', 'cha', 'ja', 'jha', 'ña', 'ya', 'śa'],
    description: 'Produced by pressing the flat middle of the tongue against the hard palate.',
  },
  {
    sthana: 'Murdha (मूर्धन्य)',
    organ: 'Retroflex / Roof of Mouth',
    devanagari: ['ऋ', 'ॠ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'र', 'ष'],
    iast: ['ṛ', 'ṝ', 'ṭa', 'ṭha', 'ḍa', 'ḍha', 'ṇa', 'ra', 'ṣa'],
    description: 'Produced by curling the tongue tip backwards against the alveolar ridge/dome of palate.',
  },
  {
    sthana: 'Danta (दन्त्य)',
    organ: 'Dental / Upper Teeth',
    devanagari: ['ऌ', 'त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
    iast: ['ḷ', 'ta', 'tha', 'da', 'dha', 'na', 'la', 'sa'],
    description: 'Articulated with the tip of the tongue contacting the back of the upper front teeth.',
  },
  {
    sthana: 'Oshtha (ओष्ठ्य)',
    organ: 'Labial / Lips',
    devanagari: ['उ', 'ऊ', 'प', 'फ', 'ब', 'भ', 'म', 'व'],
    iast: ['u', 'ū', 'pa', 'pha', 'ba', 'bha', 'ma', 'va'],
    description: 'Formed by bringing both lips together or rounding them cleanly.',
  },
];

const MAHESHVARA_SUTRAS = [
  { num: 1, sutra: 'अ इ उ ण्', translit: 'a i u ṇ', note: 'Basic short vowels; ends with marker ṇ' },
  { num: 2, sutra: 'ऋ ऌ क्', translit: 'ṛ ḷ k', note: 'Vocalic r and l; ends with marker k' },
  { num: 3, sutra: 'ए ओ ङ्', translit: 'e o ṅ', note: 'Monophthongs; ends with marker ṅ' },
  { num: 4, sutra: 'ऐ औ च्', translit: 'ai au c', note: 'Diphthongs; ends with marker c' },
  { num: 5, sutra: 'ह य व र ट्', translit: 'ha ya va ra ṭ', note: 'Semi-vowels beginning; ends with marker ṭ' },
  { num: 6, sutra: 'लँ ण्', translit: 'la ṇ', note: 'Nasalized liquid l' },
  { num: 7, sutra: 'ञ म ङ ण न म्', translit: 'ña ma ṅa ṇa na m', note: 'All class nasals (Class 5 consonants)' },
  { num: 8, sutra: 'झ भ ञ्', translit: 'jha bha ñ', note: 'Voiced aspirated stops (Class 4 consonants)' },
  { num: 9, sutra: 'घ ढ ध ष्', translit: 'gha ḍha dha ṣ', note: 'Remaining voiced aspirated stops' },
  { num: 10, sutra: 'ज ब ग ड द श्', translit: 'ja ba ga ḍa da ś', note: 'Voiced unaspirated stops (Class 3 consonants)' },
  { num: 11, sutra: 'ख फ छ ठ थ च ट त व्', translit: 'kha pha cha ṭha tha ca ṭa ta v', note: 'Voiceless stops' },
  { num: 12, sutra: 'क प य्', translit: 'ka pa y', note: 'Unaspirated voiceless velar and labial' },
  { num: 13, sutra: 'श ष स र्', translit: 'śa ṣa sa r', note: 'Sibilants (Fricatives)' },
  { num: 14, sutra: 'ह ल्', translit: 'ha l', note: 'Glottal aspirate h concluding all sounds' },
];

const PREDEFINED_PRATYAHARAS: Record<string, { expansion: string; meaning: string }> = {
  'अच् (ac)': {
    expansion: 'a, i, u, ṛ, ḷ, e, o, ai, au',
    meaning: 'All Vowels (Svara) — from sutra 1 (a) to sutra 4 marker (c)',
  },
  'हल् (hal)': {
    expansion: 'h, y, v, r, l, ñ, m, ṅ, ṇ, n, jh, bh, gh, ḍh, dh, j, b, g, ḍ, d, kh, ph, ch, ṭh, th, c, ṭ, t, k, p, ś, ṣ, s, h',
    meaning: 'All Consonants (Vyañjana) — from sutra 5 (h) to sutra 14 marker (l)',
  },
  'यण् (yaṇ)': {
    expansion: 'y, v, r, l',
    meaning: 'The Semivowels (Antastha) — transformed from vowels in Sandhi (iko yaṇaci)',
  },
  'झल् (jhal)': {
    expansion: 'All non-nasal stops and sibilants',
    meaning: 'Consonants undergoing Devoicing or Aspiration shifts',
  },
  'अल् (al)': {
    expansion: 'The complete set of all Sanskrit phonemes (vowels + consonants)',
    meaning: 'Universal sound spectrum',
  },
};

export const SanskritLearningPage: React.FC<SanskritLearningPageProps> = ({
  onNavigate,
  onOpenTutorWithPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'phonetics' | 'panini' | 'dhatus' | 'shlokas'>('phonetics');
  const [selectedPratyahara, setSelectedPratyahara] = useState<string>('अच् (ac)');
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const speakSound = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
      setActiveSound(text);
      setTimeout(() => setActiveSound(null), 1200);
    }
  };

  return (
    <div className="w-full bg-[#171717] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Consistent Top Navigation Bar with Back to Spatial Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1f1f1f] border border-white/10 hover:border-[#21F1A8]/50 text-white hover:text-[#21F1A8] transition-all text-xs font-mono group w-fit cursor-pointer min-h-[44px]"
            aria-label="Back to Spatial Dashboard"
          >
            <ArrowLeft className="w-4 h-4 text-[#21F1A8] group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Spatial Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/quizzes')}
              className="text-xs font-mono text-[#A0A0A0] hover:text-[#21F1A8] py-1.5 px-3 rounded-lg border border-white/10 hover:border-[#21F1A8]/40 transition-colors"
            >
              Quiz Center
            </button>
            <button
              onClick={() => onNavigate('/study-tracker')}
              className="text-xs font-mono text-[#A0A0A0] hover:text-[#21F1A8] py-1.5 px-3 rounded-lg border border-white/10 hover:border-[#21F1A8]/40 transition-colors"
            >
              Study Tracker
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#21F1A8] mb-2">
            <Cpu className="w-4 h-4" />
            <span>Algorithmic Linguistics & Sacred Grammar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Learn Sanskrit <span className="text-[#21F1A8] font-serif">(संस्कृतम्)</span>
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] max-w-3xl mt-2 leading-relaxed font-body">
            Sanskrit is the precise, rule-based linguistic foundation of Indian Knowledge Systems. Discover Panini's formal generative grammar—formulated in 500 BCE with recursion and algebraic notation that directly influenced modern computer science.
          </p>
        </div>

        {/* Vision Pro Depth Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-white/[0.08]">
          {[
            { id: 'phonetics', label: '1. Varnamala Matrix', icon: Volume2 },
            { id: 'panini', label: '2. Paninian Computing & Sutras', icon: Code2 },
            { id: 'dhatus', label: '3. Verbal Roots (Dhatus)', icon: Layers },
            { id: 'shlokas', label: '4. Scientific Shlokas Breakdown', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-[#21F1A8] text-[#171717] shadow-lg shadow-[#21F1A8]/20'
                    : 'bg-[#1f1f1f] text-[#CCCCCC] hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PHONETICS MATRIX */}
        {activeTab === 'phonetics' && (
          <div className="space-y-6">
            <div className="bg-[#1f1f1f] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-heading font-bold text-white">
                    Varnamala: The Scientific Matrix of Articulation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1 font-body">
                    Unlike Latin or English alphabets arranged randomly, Sanskrit organizes letters strictly by anatomical place of production (Sthana) from throat to lips. Click any sound to pronounce.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#21F1A8] flex items-center gap-1.5 bg-[#171717] px-3 py-1.5 rounded-lg border border-[#21F1A8]/30 w-fit">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Click to Listen</span>
                </div>
              </div>

              <div className="space-y-4">
                {PHONETIC_GROUPS.map((group) => (
                  <div
                    key={group.sthana}
                    className="p-4 rounded-xl bg-[#171717] border border-white/[0.08] hover:border-[#21F1A8]/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-heading font-bold text-[#21F1A8]">
                          {group.sthana}
                        </span>
                        <span className="text-xs font-mono text-[#888888]">
                          ({group.organ})
                        </span>
                      </div>
                      <span className="text-[11px] text-[#A0A0A0] font-body italic">
                        {group.description}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-3">
                      {group.devanagari.map((char, idx) => {
                        const isSpeaking = activeSound === char;
                        return (
                          <button
                            key={char}
                            onClick={() => speakSound(char)}
                            className={`flex flex-col items-center justify-center p-2.5 rounded-lg border transition-all cursor-pointer min-h-[56px] group ${
                              isSpeaking
                                ? 'bg-[#21F1A8] border-[#21F1A8] text-[#171717] scale-105 shadow-md'
                                : 'bg-[#242424] border-white/5 hover:border-[#21F1A8]/40 hover:bg-[#2b2b2b] text-white'
                            }`}
                            title={`Pronounce ${char} (${group.iast[idx]})`}
                          >
                            <span className="text-lg font-bold leading-none mb-1">
                              {char}
                            </span>
                            <span className="text-[11px] font-mono text-[#A0A0A0] group-hover:text-[#21F1A8]">
                              {group.iast[idx]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PANINIAN COMPUTING & SUTRAS */}
        {activeTab === 'panini' && (
          <div className="space-y-6">
            <div className="bg-[#1f1f1f] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#21F1A8] mb-1">
                  <Code2 className="w-4 h-4" />
                  <span>Panini (~500 BCE) · Ashtadhyayi</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  The 14 Shiva Sutras & Algebraic Pratyaharas
                </h2>
                <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1 leading-relaxed font-body">
                  Panini invented a mathematical compression scheme 2,400 years ago. He arranged the phonemes into 14 sutras with dummy marker consonants (*it*). Taking any starting sound and ending marker sound compresses a complex subset into a two-syllable code (*pratyahara*), exactly like regular expressions and Backus-Naur grammar rules!
                </p>
              </div>

              {/* Interactive Pratyahara Explorer */}
              <div className="p-4 bg-[#171717] rounded-xl border border-[#21F1A8]/30 mb-6">
                <div className="text-xs font-mono text-[#21F1A8] font-bold mb-2 uppercase">
                  Live Pratyahara Evaluator
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.keys(PREDEFINED_PRATYAHARAS).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPratyahara(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                        selectedPratyahara === key
                          ? 'bg-[#21F1A8] text-[#171717] font-bold'
                          : 'bg-[#242424] text-[#CCCCCC] hover:text-white border border-white/10'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <div className="bg-[#1f1f1f] p-4 rounded-lg border border-white/10">
                  <div className="text-sm font-heading font-bold text-white mb-1">
                    {PREDEFINED_PRATYAHARAS[selectedPratyahara].meaning}
                  </div>
                  <div className="text-xs font-mono text-[#21F1A8] break-words">
                    Expanded Set: <span className="text-white">{PREDEFINED_PRATYAHARAS[selectedPratyahara].expansion}</span>
                  </div>
                </div>
              </div>

              {/* 14 Sutras Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MAHESHVARA_SUTRAS.map((s) => (
                  <div
                    key={s.num}
                    className="p-3.5 rounded-xl bg-[#171717] border border-white/[0.06] flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#242424] text-[#21F1A8] font-mono text-[11px] flex items-center justify-center font-bold">
                          {s.num}
                        </span>
                        <span className="text-base font-bold text-white font-heading">
                          {s.sutra}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-[#A0A0A0] mt-1 pl-7">
                        {s.translit}
                      </div>
                      <div className="text-[11px] text-[#777777] font-body mt-0.5 pl-7">
                        {s.note}
                      </div>
                    </div>
                    <button
                      onClick={() => speakSound(s.sutra)}
                      className="p-2 rounded-lg bg-[#242424] text-[#888888] hover:text-[#21F1A8] transition-colors"
                      title="Pronounce sutra"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DHATUS (VERBAL ROOTS) */}
        {activeTab === 'dhatus' && (
          <div className="space-y-6">
            <div className="bg-[#1f1f1f] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              <h2 className="text-xl font-heading font-bold text-white mb-2">
                Dhatupatha: Generative Verbal Roots
              </h2>
              <p className="text-xs sm:text-sm text-[#A0A0A0] mb-6 font-body leading-relaxed">
                Almost every Sanskrit word is derived algorithmically from ~2,000 elemental seeds called **Dhatus** (verbal roots) by applying specific affixes, prefixes (Upasargas), and suffixes (Pratyayas).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    dhatu: 'गम् (Gam)',
                    meaning: 'To move, to go',
                    sample: 'गच्छति (Gacchati - He/She goes)',
                    derivative: 'गति (Gati - Speed/State), गमन (Gamana - Motion), आगम (Agama - Arrival)',
                  },
                  {
                    dhatu: 'भू (Bhū)',
                    meaning: 'To be, exist, happen',
                    sample: 'भवति (Bhavati - It becomes/exists)',
                    derivative: 'भवन (Bhavana - Being), भाव (Bhava - Emotion/State), भूत (Bhuta - Past/Element)',
                  },
                  {
                    dhatu: 'विद् (Vid)',
                    meaning: 'To know, contemplate',
                    sample: 'वेत्ति (Vetti - Knows)',
                    derivative: 'वेद (Veda - Sacred Knowledge), विद्या (Vidya - Science), विद्वान् (Vidvan - Scholar)',
                  },
                  {
                    dhatu: 'कृ (Kṛ)',
                    meaning: 'To do, create, execute',
                    sample: 'करोति (Karoti - Does)',
                    derivative: 'कर्म (Karma - Action), क्रिया (Kriya - Verb/Process), संस्कृत (Samskrita - Refined)',
                  },
                  {
                    dhatu: 'ज्ञा (Jñā)',
                    meaning: 'To perceive, comprehend',
                    sample: 'जानाति (Janati - Knows)',
                    derivative: 'ज्ञान (Jnana - Cognition), विज्ञान (Vijnana - Empirical Science), प्रज्ञा (Prajna - Insight)',
                  },
                  {
                    dhatu: 'गण् (Gaṇ)',
                    meaning: 'To count, calculate, categorize',
                    sample: 'गणयति (Ganayati - Calculates)',
                    derivative: 'गणित (Ganita - Mathematics), गण (Gana - Group), गणना (Ganana - Computation)',
                  },
                ].map((item) => (
                  <div
                    key={item.dhatu}
                    className="p-4 rounded-xl bg-[#171717] border border-white/[0.08] hover:border-[#21F1A8]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-heading font-bold text-[#21F1A8]">
                        {item.dhatu}
                      </span>
                      <span className="text-[11px] font-mono text-[#CCCCCC] bg-[#242424] px-2 py-0.5 rounded">
                        {item.meaning}
                      </span>
                    </div>
                    <div className="text-xs text-white mb-2 font-mono">
                      Present tense: <span className="text-[#21F1A8]">{item.sample}</span>
                    </div>
                    <div className="text-[11px] text-[#888888] font-body">
                      Derived words: <span className="text-[#CCCCCC]">{item.derivative}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SHLOKAS BREAKDOWN */}
        {activeTab === 'shlokas' && (
          <div className="space-y-6">
            <div className="bg-[#1f1f1f] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              <h2 className="text-xl font-heading font-bold text-white mb-2">
                IKS Scientific Shlokas: Word-by-Word Analysis
              </h2>
              <p className="text-xs sm:text-sm text-[#A0A0A0] mb-6 font-body">
                Ancient Indian mathematicians and scientists encoded sophisticated equations in metered poetic verses for memory retention and mnemonic checking.
              </p>

              <div className="space-y-6">
                {/* Aryabhata's Pi */}
                <div className="p-5 rounded-2xl bg-[#171717] border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#21F1A8] mb-2">
                    <span>Aryabhata (499 CE) · Aryabhatiya, Ganitapada 10</span>
                    <span className="bg-[#21F1A8]/10 px-2 py-0.5 rounded text-[#21F1A8]">Value of Pi (π)</span>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-[#1f1f1f] border border-[#21F1A8]/20 font-serif text-base sm:text-lg text-white text-center leading-loose mb-4">
                    चतुरधिकं शतमष्टगुणं द्वाषष्टिस्तथा सहस्राणाम् ।<br />
                    अयुतद्वयविष्कम्भस्यासन्नो वृत्तपरिणाहः ॥
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-[#1f1f1f] p-3 rounded-lg border border-white/5 space-y-1.5">
                      <div className="text-[#21F1A8] font-bold">Word-by-word Breakdown:</div>
                      <div>• <span className="text-white">चतुरधिकं शतम्</span>: 104 (100 + 4)</div>
                      <div>• <span className="text-white">अष्टगुणम्</span>: Multiplied by 8 (= 832)</div>
                      <div>• <span className="text-white">द्वाषष्टिः सहस्राणाम्</span>: Plus 62,000 (= 62,832)</div>
                      <div>• <span className="text-white">अयुतद्वय-विष्कम्भस्य</span>: Of diameter 20,000 (2 × 10,000)</div>
                      <div>• <span className="text-white">आसन्नः वृत्तपरिणाहः</span>: Approximated circumference</div>
                    </div>

                    <div className="bg-[#1f1f1f] p-3 rounded-lg border border-white/5 space-y-2">
                      <div className="text-[#21F1A8] font-bold">Mathematical Formulation:</div>
                      <div className="text-white">Circumference / Diameter = 62,832 / 20,000 = <span className="text-[#21F1A8] font-bold">3.1416</span></div>
                      <div className="text-[#888888] font-body text-[11px] leading-relaxed">
                        Remarkably, Aryabhata used the word <span className="text-[#21F1A8]">आसन्न (āsanna)</span>, meaning "approaching/approximated", proving he recognized that π is an irrational number that cannot be represented as an exact rational ratio.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charaka's Definition of Ayurveda */}
                <div className="p-5 rounded-2xl bg-[#171717] border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#21F1A8] mb-2">
                    <span>Charaka Samhita · Sutrasthana 1.41</span>
                    <span className="bg-[#21F1A8]/10 px-2 py-0.5 rounded text-[#21F1A8]">Definition of Health</span>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-[#1f1f1f] border border-[#21F1A8]/20 font-serif text-base sm:text-lg text-white text-center leading-loose mb-4">
                    हिताहितं सुखं दुःखमायुस्तस्य हिताहितम् ।<br />
                    मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते ॥
                  </div>

                  <div className="text-xs text-[#CCCCCC] bg-[#1f1f1f] p-3 rounded-lg border border-white/5 font-body leading-relaxed">
                    <strong className="text-[#21F1A8]">Translation:</strong> "That science is designated as Ayurveda which explains wholesome (hita) and unwholesome (ahita), happy (sukha) and unhappy (dukha) states of life; what is beneficial and detrimental for longevity; and the measure (span and quality) of life itself."
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Tutor Prompt Integration */}
        <div className="mt-10 p-5 rounded-2xl bg-[#1f1f1f] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#21F1A8] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Linguistic Assistant</span>
            </div>
            <h3 className="text-base font-heading font-bold text-white">
              Have questions about Paninian grammar or Sanskrit shlokas?
            </h3>
            <p className="text-xs text-[#A0A0A0] mt-0.5 font-body">
              Chat with the AI Indic Scholar to dissect any Sanskrit verse or grammar sutra in real time.
            </p>
          </div>

          <button
            onClick={() => onOpenTutorWithPrompt('Explain how Panini\'s Ashtadhyayi and Shiva Sutras anticipated modern computer science context-free grammars and Backus-Naur Form (BNF).')}
            className="px-4 py-2.5 rounded-xl bg-[#21F1A8] hover:bg-[#21F1A8]/90 text-[#171717] font-semibold text-xs transition-all whitespace-nowrap cursor-pointer shadow-md shadow-[#21F1A8]/20 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult AI Scholar</span>
          </button>
        </div>

      </div>
    </div>
  );
};
