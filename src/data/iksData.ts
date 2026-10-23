import { SubjectPortal, TimelineMilestone, VideoLesson, SearchableTopic } from '../types/iks';

export const IKS_SUBJECTS: SubjectPortal[] = [
  {
    id: 'mathematics',
    title: 'Indian Mathematics',
    sanskritTitle: 'गणितशास्त्र',
    tagline: 'From Zero to Infinity: India\'s Mathematical Legacy',
    summary: 'Explore the foundations of positional decimal notation, the formalization of zero as an operational numeral, early trigonometry, and combinatorial structures centuries ahead of Europe.',
    iconName: 'Calculator',
    verse: {
      sanskrit: 'यथा शिखा मयूराणां नागानां मणयो यथा । तद्वद् वेदाङ्गशास्त्राणां गणितं मूर्धनि स्थितम् ॥',
      transliteration: 'Yathā śikhā mayūrāṇāṁ nāgānāṁ maṇayo yathā | Tadvad vedāṅgaśāstrāṇāṁ gaṇitaṁ mūrdhani sthitam ||',
      english: 'Like the crest on the head of a peacock, or the jewel in the serpent hood, so mathematics stands at the pinnacle of all Vedanga sciences.',
      source: 'Vedanga Jyotisha (verse 4)'
    },
    keyScholars: [
      {
        name: 'Baudhayana',
        sanskritName: 'बौधायन',
        era: 'c. 800 BCE',
        location: 'Vedic Bharat',
        works: ['Baudhayana Sulba Sutra'],
        contribution: 'Formulated the geometric relationship between sides and diagonal of rectangles (pre-dating Pythagoras) and computed the square root of 2 accurate to five decimal places.'
      },
      {
        name: 'Aryabhata',
        sanskritName: 'आर्यभट',
        era: '476–550 CE',
        location: 'Kusumapura (Pataliputra)',
        works: ['Aryabhatiya', 'Arya-Siddhanta'],
        contribution: 'Calculated π as 3.1416, developed sine tables (Jya), solved indeterminate linear equations using the Kuttaka algorithm, and stated the diurnal rotation of the Earth.'
      },
      {
        name: 'Brahmagupta',
        sanskritName: 'ब्रह्मगुप्त',
        era: '598–668 CE',
        location: 'Bhillamala (Rajasthan)',
        works: ['Brahmasphutasiddhanta', 'Khandakhadyaka'],
        contribution: 'First to establish operational arithmetic rules for Zero (Shunya) and negative numbers (Rina), and formulated the exact area formula for cyclic quadrilaterals.'
      },
      {
        name: 'Pingala',
        sanskritName: 'पिङ्गल',
        era: 'c. 300–200 BCE',
        location: 'Ancient India',
        works: ['Chandas Shastra'],
        contribution: 'Invented binary numerical representation (laghu & guru metrics) and Meru Prastara (the triangular combinatorics sequence later named Pascal\'s Triangle).'
      },
      {
        name: 'Bhaskara II (Bhaskaracharya)',
        sanskritName: 'भास्कराचार्य',
        era: '1114–1185 CE',
        location: 'Ujjain / Patan',
        works: ['Siddhanta Shiromani', 'Lilavati', 'Bijaganita'],
        contribution: 'Pioneered early differential calculus concepts (tatkaliki gati or instantaneous velocity), discovered division by zero yields infinity (Khahara), and solved Pell\'s equation with the Chakravala method.'
      },
      {
        name: 'Madhava of Sangamagrama',
        sanskritName: 'माधव',
        era: '1340–1425 CE',
        location: 'Kerala',
        works: ['Venuvaroha', 'Sphutacandranapti'],
        contribution: 'Founder of the Kerala School; developed infinite series approximations for π, sine, and cosine (later rediscovered by Gregory, Leibniz, and Newton).'
      }
    ],
    coreDiscoveries: [
      {
        title: 'Shunya (Zero) as an Algebraic Numeral',
        era: '628 CE (Formalized)',
        description: 'While zero was used place-value-wise in the Bakhshali Manuscript (~3rd-4th century CE), Brahmagupta first defined mathematical operations with zero: 0 + a = a, 0 - a = -a, a × 0 = 0.',
        modernRelevance: 'The foundational pillar of modern computing, algebra, and information theory.'
      },
      {
        title: 'Baudhayana Geometric Theorem',
        era: 'c. 800 BCE',
        description: 'The diagonal of a rectangle produces by itself both areas which the longer and shorter sides produce separately: d² = l² + w².',
        modernRelevance: 'Precedes Pythagoras by over two centuries with practical construction proofs for Vedic fire altars.'
      },
      {
        title: 'Meru Prastara (Pingala Combinatorics)',
        era: 'c. 300 BCE',
        description: 'Geometric arrangement of binomial coefficients used in Sanskrit poetic meter analysis, identical to Pascal\'s Triangle described 1,800 years later.',
        modernRelevance: 'Used today in combinatorics, binomial distributions, and polynomial expansions.'
      },
      {
        title: 'Infinite Calculus Series (Kerala School)',
        era: 'c. 1350–1425 CE',
        description: 'Madhava derived the Taylor-Maclaurin series for trigonometric functions (sin θ, cos θ, arctan θ) and infinite series for π with correction terms.',
        modernRelevance: 'Formulates mathematical analysis and calculus centuries ahead of European contemporaries.'
      }
    ],
    manuscripts: [
      'Bakhshali Manuscript (Bodleian Library, Oxford)',
      'Aryabhatiya Palm-Leaf Folios (Trivandrum Collection)',
      'Brahmasphutasiddhanta (British Museum Archives)',
      'Yuktidipika & Tantrasangraha (Kerala Astrological Tradition)'
    ],
    interactiveSimId: 'baudhayana'
  },
  {
    id: 'astronomy',
    title: 'Ancient Astronomy',
    sanskritTitle: 'खगोलशास्त्र',
    tagline: 'The Sky Was Never the Limit: Celestial Mechanics & Epicycles',
    summary: 'Study planetary orbits, axial rotation, solar/lunar eclipse calculations without telecommunication, and the marvel of stone observatories like Jantar Mantar and Gola Yantras.',
    iconName: 'Compass',
    verse: {
      sanskrit: 'अचलोऽपि भ्रमतीव स्थिरोऽपि यद्वत् प्लवेन गच्छतः । भ्रमति मही तथा हि स्ववृत्तगा वायुना प्रेर्यमाणा ॥',
      transliteration: 'Acalo\'pi bhramatīva sthiro\'pi yadvat plavena gacchataḥ | Bhramati mahī tathā hi svavṛttagā vāyunā preryamāṇā ||',
      english: 'Just as a person in a moving boat perceives stationary objects along the riverbank moving backward, so the stars appear to move across the sky because the Earth itself rotates eastward on its axis.',
      source: 'Aryabhatiya, Golapada (verse 9)'
    },
    keyScholars: [
      {
        name: 'Aryabhata',
        sanskritName: 'आर्यभट',
        era: '476–550 CE',
        location: 'Kusumapura',
        works: ['Aryabhatiya (Golapada)'],
        contribution: 'Stated that celestial motion is an apparent effect caused by the diurnal rotation of the Earth on its axis, and accurately modeled eclipses by shadow geometry.'
      },
      {
        name: 'Varahamihira',
        sanskritName: 'वराहमिहिर',
        era: '505–587 CE',
        location: 'Ujjain',
        works: ['Pancha-Siddhantika', 'Brihat Samhita'],
        contribution: 'Synthesized five earlier astronomical schools (Surya, Romaka, Paulisa, Vasishtha, Paitamaha) and pioneered mathematical astrolabes.'
      },
      {
        name: 'Sawai Jai Singh II',
        sanskritName: 'सवाई जयसिंह',
        era: '1688–1743 CE',
        location: 'Jaipur / Delhi / Ujjain',
        works: ['Zij-i Muhammad Shahi'],
        contribution: 'Constructed the astronomical Jantar Mantar observatories with gigantic masonry instruments (Samrat Yantra) measuring local solar time to 2 seconds precision.'
      }
    ],
    coreDiscoveries: [
      {
        title: 'Diurnal Rotation of the Earth',
        era: '499 CE',
        description: 'Aryabhata correctly deduced that the starry sphere appears to rotate because of the continuous axial spin of the spherical Earth (Bhugola).',
        modernRelevance: 'Anticipated the heliocentric and geodynamic rotation concepts described by Copernicus.'
      },
      {
        title: 'Scientific Shadow-Based Eclipse Model',
        era: '5th Century CE',
        description: 'Demonstrated that lunar eclipses occur when the Moon enters Earth\'s shadow (Bhoochhaya) and solar eclipses when the Moon obstructs the solar disk.',
        modernRelevance: 'Dispelled supernatural myths by formalizing geometrical planetary shadows.'
      },
      {
        title: 'Sidereal Year Precision (Surya Siddhanta)',
        era: 'c. 5th–6th Century CE',
        description: 'Calculated the duration of the solar year as 365.25636 days, deviating by only 1.4 minutes from modern atomic clock calculations.',
        modernRelevance: 'Precision timekeeping underpinning the Indian lunisolar calendar (Panchanga).'
      }
    ],
    manuscripts: [
      'Surya Siddhanta Sanskrit Birch Bark Codex',
      'Pancha Siddhantika of Varahamihira',
      'Goladhyaya in Siddhanta Shiromani'
    ],
    interactiveSimId: 'armillary'
  },
  {
    id: 'philosophy',
    title: 'Indian Philosophy',
    sanskritTitle: 'षड्दर्शन',
    tagline: 'The Six Orthodox Systems of Epistemology & Reality',
    summary: 'Analyze valid sources of knowledge (Pramana), atomistic physics in Vaisheshika, cosmic evolution in Samkhya, meditative psychology in Yoga, and non-dualism in Vedanta.',
    iconName: 'BookOpen',
    verse: {
      sanskrit: 'सत्यं ज्ञानमनन्तं ब्रह्म । यो वेद निहितं गुहायां परमे व्योमन् ॥',
      transliteration: 'Satyaṁ jñānamanantaṁ brahma | Yo veda nihitaṁ guhāyāṁ parame vyoman ||',
      english: 'Reality is Truth, Knowledge, and the Infinite. Whoever realizes this dwelling in the secret recess of consciousness attains cosmic harmony.',
      source: 'Taittiriya Upanishad (2.1.1)'
    },
    keyScholars: [
      {
        name: 'Adi Shankara',
        sanskritName: 'आदि शङ्कराचार्य',
        era: '788–820 CE',
        location: 'Kalady / Across Bharat',
        works: ['Brahmasutra Bhashya', 'Vivekachudamani'],
        contribution: 'Consolidated Advaita Vedanta (non-dualism), demonstrating that supreme consciousness (Brahman) and individual awareness (Atman) are non-different.'
      },
      {
        name: 'Kanada',
        sanskritName: 'कणाद',
        era: 'c. 6th–2nd Century BCE',
        location: 'Prabhas Kshetra',
        works: ['Vaisheshika Sutra'],
        contribution: 'Pioneered atomism (Paramanu theory): all physical matter is composed of indivisible, indestructible particles combining into dyads and triads.'
      },
      {
        name: 'Patanjali',
        sanskritName: 'पतञ्जलि',
        era: 'c. 200 BCE',
        location: 'Ancient India',
        works: ['Yoga Sutras', 'Mahabhashya'],
        contribution: 'Codified the eight-limbed path (Ashtanga Yoga) to master the modifications of the mind (citta-vṛtti-nirodha).'
      },
      {
        name: 'Gautama',
        sanskritName: 'गौतम अक्षपाद',
        era: 'c. 2nd Century BCE',
        location: 'Mithila',
        works: ['Nyaya Sutras'],
        contribution: 'Established formal Indian logic, debating methods (Vada), syllogistic reasoning (Pancha-Avayava), and epistemological validity criteria.'
      }
    ],
    coreDiscoveries: [
      {
        title: 'Pramana Epistemology (Theory of Knowledge)',
        era: 'Vedic to Classical Era',
        description: 'Rigorous validation system examining Pratyaksha (direct perception), Anumana (inference), Upamana (analogy), and Shabda (verified testimony).',
        modernRelevance: 'Paved the way for modern epistemological philosophy and scientific falsifiability.'
      },
      {
        title: 'Paramanu (Atomic Theory of Kanada)',
        era: 'c. 6th Century BCE',
        description: 'Subdivided physical matter into smallest indivisible units (Paramanu) interacting via unseen natural cosmic force (Adrishta).',
        modernRelevance: 'Parallel to Democritus and early precursors to atomic-molecular bonding theories.'
      },
      {
        title: 'Mind Psychology (Chitta Vritti Nirodha)',
        era: 'c. 200 BCE',
        description: 'Systematic taxonomy of mental states: cognitive clarity, distraction, memory conditioning, and transcendent awareness.',
        modernRelevance: 'Core framework for contemporary neuroscience, cognitive behavioral therapy, and mindfulness.'
      }
    ],
    manuscripts: [
      'Nyaya Sutra Palm Leaves with Vatsyayana commentary',
      'Patanjali Yoga Sutra Folios (Sarada Script)',
      'Mandukya Upanishad Karika by Gaudapada'
    ],
    interactiveSimId: 'darshana'
  },
  {
    id: 'ayurveda',
    title: 'Ayurveda & Health',
    sanskritTitle: 'आयुर्वेदशास्त्र',
    tagline: 'Holistic Health for a Balanced Life: Mind, Body & Longevity',
    summary: 'Discover the ancient medical treatises of Sushruta and Charaka detailing 120+ surgical instruments, reconstructive rhinoplasty, circadian rhythms, and plant pharmacopeia.',
    iconName: 'Leaf',
    verse: {
      sanskrit: 'समदोषः समाग्निश्च समधातुमलक्रियः । प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते ॥',
      transliteration: 'Samadoṣaḥ samāgniśca samadhātumalakriyaḥ | Prasannātmendriyamanaḥ svastha ityabhidhīyate ||',
      english: 'One who has balanced doshas, balanced digestive fire, balanced biological tissues and metabolic waste, and whose self, senses, and mind remain serene is called truly healthy (Svastha).',
      source: 'Sushruta Samhita, Sutrasthana (15.41)'
    },
    keyScholars: [
      {
        name: 'Sushruta',
        sanskritName: 'सुश्रुत',
        era: 'c. 6th–5th Century BCE',
        location: 'Varanasi',
        works: ['Sushruta Samhita'],
        contribution: 'Regarded as the Father of Surgery. Documented over 120 surgical instruments, rhinoplastic skin flaps, cataract couching, and anatomical dissection methods.'
      },
      {
        name: 'Charaka',
        sanskritName: 'चरक',
        era: 'c. 300–200 BCE',
        location: 'Northwest India',
        works: ['Charaka Samhita'],
        contribution: 'Father of ancient Indian medicine. Elaborated physiological genetics, the three doshas, psychosomatic etiology, and medical ethics for physicians.'
      },
      {
        name: 'Vagbhata',
        sanskritName: 'वाग्भट',
        era: 'c. 6th–7th Century CE',
        location: 'Sindh / Kerala',
        works: ['Ashtanga Hridaya', 'Ashtanga Sangraha'],
        contribution: 'Brilliant synthesizer who rendered Charaka and Sushruta into poetic, accessible medical verses forming the backbone of Kerala Ayurveda.'
      }
    ],
    coreDiscoveries: [
      {
        title: 'Reconstructive Plastic Surgery (Rhinoplasty)',
        era: 'c. 600 BCE',
        description: 'Sushruta described pedicle flap rhinoplasty using skin from the forehead/cheek to rebuild injured noses, adopted in 18th-century Europe.',
        modernRelevance: 'The direct historical ancestor of modern plastic, reconstructive, and cosmetic flap surgery.'
      },
      {
        title: 'Tridosha Framework & Homeostasis',
        era: 'Classical Era',
        description: 'Dynamic biological regulation through Vata (movement/kinetic), Pitta (transformation/metabolism), and Kapha (structure/lubrication).',
        modernRelevance: 'Matches modern systems biology and personalized chronobiology principles.'
      },
      {
        title: 'Plant Pharmacopeia & Rasayana',
        era: 'Antiquity to Medieval',
        description: 'Standardized extraction of bioactive phytochemicals: Withania somnifera (Ashwagandha), Curcuma longa (Curcumin), and Bacopa monnieri (Brahmi).',
        modernRelevance: 'Extensively studied today in modern adaptogens, neuroprotective research, and anti-inflammatories.'
      }
    ],
    manuscripts: [
      'Bower Manuscript (Discovered in Kucha, 5th century CE)',
      'Sushruta Samhita Palm-Leaf Folios (Nepal Royal Library)',
      'Charaka Samhita with Chakrapanidatta commentary'
    ],
    interactiveSimId: 'tridosha'
  },
  {
    id: 'literature',
    title: 'Literature & Epics',
    sanskritTitle: 'साहित्य व व्याकरण',
    tagline: 'The Architecture of Thought: Panini\'s Formal Grammar & Epics',
    summary: 'Examine the world\'s first formal generative grammar engine in Panini\'s Ashtadhyayi, the timeless epics Mahabharata and Ramayana, and the aesthetic theory of Rasa.',
    iconName: 'Scroll',
    verse: {
      sanskrit: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते । तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ॥',
      transliteration: 'Na hi jñānena sadṛśaṁ pavitramiha vidyate | Tatsvayaṁ yogasaṁsiddhaḥ kālenātmani vindati ||',
      english: 'Indeed, in this world, there is nothing as purifying as sublime knowledge. One perfected in discipline discovers this truth within oneself in due time.',
      source: 'Bhagavad Gita (4.38)'
    },
    keyScholars: [
      {
        name: 'Panini',
        sanskritName: 'पाणिनि',
        era: 'c. 5th–4th Century BCE',
        location: 'Shalatula (Gandhara)',
        works: ['Ashtadhyayi', 'Dhatupatha', 'Shivasutras'],
        contribution: 'Constructed the world\'s first generative, context-free grammar with 3,959 algorithmic sutras, meta-rules, and recursion—the foundational inspiration for Backus-Naur Form (BNF).'
      },
      {
        name: 'Kalidasa',
        sanskritName: 'कालिदास',
        era: 'c. 4th–5th Century CE',
        location: 'Ujjain',
        works: ['Abhijnanashakuntalam', 'Meghaduta', 'Raghuvamsha'],
        contribution: 'Master of Sanskrit classical drama and lyric poetry, acclaimed globally for emotional depth, nature imagery, and poetic metaphors (Upama).'
      },
      {
        name: 'Bharata Muni',
        sanskritName: 'भरत मुनि',
        era: 'c. 200 BCE–200 CE',
        location: 'Ancient India',
        works: ['Natyashastra'],
        contribution: 'Formulated the Rasa-Bhava aesthetic theory explaining how dramatic performance evokes nine distinct emotional states in the audience.'
      }
    ],
    coreDiscoveries: [
      {
        title: 'Ashtadhyayi: Algorithmic Generative Grammar',
        era: 'c. 500 BCE',
        description: '3,959 sutras functioning as an algorithmic computing engine capable of generating every valid grammatical form of Sanskrit through formal transformations.',
        modernRelevance: 'Recognized by computer scientists as the earliest ancestor of Chomsky grammars, compilers, and formal linguistics.'
      },
      {
        title: 'Rasa Theory of Dramatic Aesthetics',
        era: 'c. 2nd Century BCE',
        description: 'Taxonomy of artistic experience: Shringara (Love), Hasya (Comic), Karuna (Compassion), Raudra (Fury), Vira (Heroism), Bhayanaka (Fear), Bibhatsa (Disgust), Adbhuta (Wonder), Shanta (Peace).',
        modernRelevance: 'Influences modern dramaturgy, cinema narrative design, and cognitive emotional engagement.'
      },
      {
        title: 'The Great Epics (Itihasa)',
        era: 'Vedic to Classical',
        description: 'Mahabharata (100,000 verses, the longest epic poem in world literature) and Ramayana, exploring ethical dilemmas (Dharma Sankata) in statecraft and philosophy.',
        modernRelevance: 'Universal literary heritage exploring moral philosophy, statecraft, and human nature.'
      }
    ],
    manuscripts: [
      'Critical Edition of Mahabharata (Bhandarkar Oriental Research Institute)',
      'Kashmirian Birch-Bark Recension of Kalidasa',
      'Ashtadhyayi with Kasikavritti'
    ],
    interactiveSimId: 'panini'
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: 'c. 1500 BCE',
    period: 'Vedic Astronomy',
    numericSortYear: -1500,
    title: 'Vedanga Jyotisha & 27 Nakshatras',
    sanskritName: 'वेदाङ्ग ज्योतिष',
    category: 'astronomy',
    scholar: 'Lagadha',
    institution: 'Vedic Ashrams',
    description: 'Systematic observation of the 27 Nakshatra lunar stations and solstices used to calibrate the 5-year Yuga cycle calendar.',
    impact: 'Established the earliest astronomical calendar framework in South Asia.',
    sourceText: 'Vedanga Jyotisha'
  },
  {
    year: 'c. 800 BCE',
    period: 'Vedic Geometry',
    numericSortYear: -800,
    title: 'Baudhayana Sulba Sutras',
    sanskritName: 'बौधायन शुल्बसूत्र',
    category: 'mathematics',
    scholar: 'Baudhayana',
    institution: 'Vedic Schools of the Black Yajurveda',
    description: 'Proved the diagonal-side area equivalence for rectangles, provided geometric circle-squaring algorithms, and calculated √2.',
    impact: 'Pre-dated Greek Pythagorean theorem by hundreds of years with rigorous sacrificial altar geometry.',
    sourceText: 'Baudhayana Sulba Sutra (1.48)'
  },
  {
    year: 'c. 600 BCE',
    period: 'Surgical Medicine',
    numericSortYear: -600,
    title: 'Sushruta Samhita & Surgical Rhinoplasty',
    sanskritName: 'सुश्रुतसंहिता',
    category: 'ayurveda',
    scholar: 'Sushruta',
    institution: 'Kashi (Varanasi) Medical School',
    description: 'Documented 120+ surgical instruments, cataract surgery (couching), pedicle skin flap rhinoplasty, and bone setting.',
    impact: 'Regarded internationally as the foundational text of reconstructive and ophthalmic surgery.',
    sourceText: 'Sushruta Samhita'
  },
  {
    year: 'c. 500 BCE',
    period: 'Formal Linguistics',
    numericSortYear: -500,
    title: 'Panini\'s Ashtadhyayi Generative Engine',
    sanskritName: 'अष्टाध्यायी',
    category: 'literature',
    scholar: 'Panini',
    institution: 'Takshashila University',
    description: 'Constructed 3,959 algebraic sutras that algorithmically describe the phonetic and morpho-syntactic structure of Sanskrit.',
    impact: 'Pioneered formal rule engines that later influenced BNF grammar and modern computer compiler theory.',
    sourceText: 'Ashtadhyayi'
  },
  {
    year: 'c. 300 BCE',
    period: 'Combinatorics',
    numericSortYear: -300,
    title: 'Pingala\'s Chandas Shastra & Binary System',
    sanskritName: 'छन्दःशास्त्र',
    category: 'mathematics',
    scholar: 'Pingala',
    institution: 'Ancient Bharat',
    description: 'Developed the binary representation (laghu & guru syllables) and Meru Prastara (combinatoric binomial triangle).',
    impact: 'Earliest known documentation of binary sequences and binomial coefficients.',
    sourceText: 'Chandas Shastra'
  },
  {
    year: 'c. 600 BCE – 500 CE',
    period: 'University Epoch',
    numericSortYear: -200,
    title: 'Takshashila & Nalanda Universities',
    sanskritName: 'नालन्दा व तक्षशिला विश्वविद्यालय',
    category: 'philosophy',
    institution: 'Nalanda Mahavihara (Magadha)',
    description: 'Premier residential universities attracting scholars across Asia (China, Korea, Tibet, Greece). Nalanda housed 10,000 scholars and 2,000 faculty in the Dharma Ganj library.',
    impact: 'Centuries of interdisciplinary debate in logic (Nyaya), medicine (Ayurveda), metallurgy, and philosophy.',
    sourceText: 'Xuanzang and Yijing Travelogues'
  },
  {
    year: '499 CE',
    period: 'Classical Astronomy',
    numericSortYear: 499,
    title: 'Aryabhatiya: Earth\'s Axial Rotation',
    sanskritName: 'आर्यभटीय',
    category: 'astronomy',
    scholar: 'Aryabhata',
    institution: 'Kusumapura (Pataliputra)',
    description: 'Demonstrated Earth\'s diurnal rotation on its axis, computed π = 3.1416, and explained solar and lunar eclipses as orbital shadows.',
    impact: 'Shifted Indian astronomy onto a rigorous mathematical footing.',
    sourceText: 'Aryabhatiya (499 CE)'
  },
  {
    year: '628 CE',
    period: 'Algebraic Foundation',
    numericSortYear: 628,
    title: 'Brahmagupta: Shunya (Zero) Arithmetic',
    sanskritName: 'ब्राह्मस्फुटसिद्धान्त',
    category: 'mathematics',
    scholar: 'Brahmagupta',
    institution: 'Bhillamala Academy',
    description: 'Established the algebraic properties of Zero as a number (0+a=a, 0-a=-a, 0×a=0) and negative integers (debt vs property).',
    impact: 'Transmitted to Baghdad (translated as Al-Zij al-Sindhind) and eventually revolutionized global mathematics.',
    sourceText: 'Brahmasphutasiddhanta'
  },
  {
    year: '1150 CE',
    period: 'Early Calculus',
    numericSortYear: 1150,
    title: 'Bhaskara II: Instantaneous Velocity',
    sanskritName: 'सिद्धान्तशिरोमणि',
    category: 'mathematics',
    scholar: 'Bhaskaracharya',
    institution: 'Ujjain Observatory',
    description: 'Formulated the concept of Tatkaliki Gati (instantaneous speed where differential of sine is cosine) and indeterminate equations.',
    impact: 'First documented mathematical conception resembling the derivative centuries before Newton and Leibniz.',
    sourceText: 'Siddhanta Shiromani'
  },
  {
    year: 'c. 1350–1450 CE',
    period: 'Infinite Series',
    numericSortYear: 1380,
    title: 'Madhava of Sangamagrama & Kerala School',
    sanskritName: 'केरलीय गणित परम्परा',
    category: 'mathematics',
    scholar: 'Madhava & Nilakantha Somayaji',
    institution: 'Kerala School of Astronomy and Mathematics',
    description: 'Discovered the infinite power series expansions for sine, cosine, and arctangent (the Madhava-Leibniz series) with remainder terms.',
    impact: 'Transitional bridge from medieval mathematics to modern continuous calculus.',
    sourceText: 'Tantrasangraha & Yuktidipika'
  }
];

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: 'lesson-1',
    title: 'The Architecture of Panini\'s Generative Grammar',
    category: 'literature',
    duration: '22:40',
    instructor: 'Prof. Ramesh Sharma (Computational Linguistics)',
    level: 'Advanced',
    description: 'How 3,959 concise sutras form a complete, recursive generative grammar system that modern computer scientists consider the precursor to formal language specifications.',
    chapters: [
      'The Shiva Sutras & Phonetic Matrix',
      'Pratyahara Abbreviations & Variable Binding',
      'Meta-Rules & Conflict Resolution Priority',
      'Parallels to Backus-Naur Form (BNF)'
    ],
    sourceReference: 'Panini\'s Ashtadhyayi (c. 500 BCE)'
  },
  {
    id: 'lesson-2',
    title: 'From Zero to Calculus: The Thousand-Year Journey',
    category: 'mathematics',
    duration: '28:15',
    instructor: 'Dr. Ananya Venkat (History of Mathematics)',
    level: 'Intermediate',
    description: 'Track the evolutionary arc from Brahmagupta\'s algebraic zero rules to Bhaskara II\'s instantaneous velocity and Madhava\'s infinite series.',
    chapters: [
      'Bakhshali Manuscript: The Dot That Changed Science',
      'Brahmagupta\'s Positive, Negative and Zero Algebra',
      'Bhaskara\'s Lilavati: Mathematical Poetry',
      'Kerala School\'s Infinite Series for Pi and Trigonometry'
    ],
    sourceReference: 'Brahmasphutasiddhanta & Tantrasangraha'
  },
  {
    id: 'lesson-3',
    title: 'Sushruta: Ancient Surgery, Instruments & Rhinoplasty',
    category: 'ayurveda',
    duration: '19:50',
    instructor: 'Dr. Devendra Joshi (Ayurvedic Surgery)',
    level: 'Beginner',
    description: 'Explore the 120 surgical tools described in the Sushruta Samhita, training methods on watermelons and leather, and the forehead flap rhinoplasty.',
    chapters: [
      'Surgical Tool Taxonomy: Yantras & Shastras',
      'Pre-Operative Disinfection & Sterile Environment',
      'Forehead Flap Reconstruction Technique',
      'The Global Legacy of Indian Plastic Surgery'
    ],
    sourceReference: 'Sushruta Samhita, Sutrasthana'
  },
  {
    id: 'lesson-4',
    title: 'Celestial Mechanics & The Gola Yantra',
    category: 'astronomy',
    duration: '25:10',
    instructor: 'Prof. S. Ranganathan (Ancient Indian Astronomy)',
    level: 'Intermediate',
    description: 'Understand how ancient astronomers constructed brass armillary spheres (Gola Yantras) to teach the celestial equator, ecliptic, and planetary retrogrades.',
    chapters: [
      'Spherical Geometry in Aryabhatiya Golapada',
      'The Mechanics of the Gola Yantra Armillary Sphere',
      'Calculating Sidereal Orbits Without Telescopes',
      'Eclipse Prediction using Trigonometric Projection'
    ],
    sourceReference: 'Aryabhatiya & Surya Siddhanta'
  },
  {
    id: 'lesson-5',
    title: 'The Six Darshanas: Logic, Matter, and Mind',
    category: 'philosophy',
    duration: '24:00',
    instructor: 'Swami Atmapriyananda (Indian Philosophical Traditions)',
    level: 'Intermediate',
    description: 'A structured comparative walkthrough of Nyaya epistemology, Vaisheshika atomism, Samkhya dualism, Patanjali yoga, Mimamsa ethics, and Vedanta unity.',
    chapters: [
      'Pramana: What Constitutes Valid Knowledge?',
      'Kanada\'s Paramanu: Indivisible Atomic Particles',
      'Samkhya\'s 24 Tattvas: Cosmic Manifestation',
      'Advaita Vedanta: Non-Dual Consciousness'
    ],
    sourceReference: 'Nyaya Sutras & Vaisheshika Sutras'
  }
];

export const SEARCHABLE_TOPICS: SearchableTopic[] = [
  {
    id: 't-1',
    title: 'Baudhayana Theorem',
    sanskritTitle: 'बौधायन प्रमेय',
    category: 'mathematics',
    era: '800 BCE',
    summary: 'The geometric proposition stating that the diagonal of a rectangle yields an area equal to the sum of the areas produced by its sides.',
    tags: ['Geometry', 'Sulba Sutras', 'Right Triangles', 'Vedic Altar'],
    readingTime: '4 min'
  },
  {
    id: 't-2',
    title: 'Shunya (Zero) Operational Rules',
    sanskritTitle: 'शून्य गणित',
    category: 'mathematics',
    era: '628 CE',
    summary: 'Formal mathematical definition of arithmetic operations involving zero and negative integers by Brahmagupta.',
    tags: ['Algebra', 'Brahmagupta', 'Positional System', 'Arithmetic'],
    readingTime: '5 min'
  },
  {
    id: 't-3',
    title: 'Meru Prastara (Pingala Triangle)',
    sanskritTitle: 'मेरु प्रस्तार',
    category: 'mathematics',
    era: '300 BCE',
    summary: 'Combinatorial staircase arrangement of binomial numbers codified for Sanskrit metric poetic meters.',
    tags: ['Combinatorics', 'Pingala', 'Binomial Theorem', 'Binary Code'],
    readingTime: '3 min'
  },
  {
    id: 't-4',
    title: 'Diurnal Rotation of Earth',
    sanskritTitle: 'भूभ्रमण सिद्धान्त',
    category: 'astronomy',
    era: '499 CE',
    summary: 'Aryabhata\'s deduction that the Earth rotates on its own axis daily, creating the apparent eastward motion of stellar bodies.',
    tags: ['Aryabhata', 'Earth Rotation', 'Planetary Orbits', 'Heliocentric Seed'],
    readingTime: '4 min'
  },
  {
    id: 't-5',
    title: 'Gola Yantra (Armillary Sphere)',
    sanskritTitle: 'गोल यन्त्र',
    category: 'astronomy',
    era: '5th Century CE',
    summary: 'Brass ring celestial instrument representing the celestial equator, ecliptic, horizon, and planetary orbits.',
    tags: ['Instruments', 'Armillary Sphere', 'Celestial Mechanics', 'Observatory'],
    readingTime: '6 min'
  },
  {
    id: 't-6',
    title: 'Sushruta\'s Rhinoplasty & Surgery',
    sanskritTitle: 'शस्त्रक्रिया व नासासंधान',
    category: 'ayurveda',
    era: '600 BCE',
    summary: 'Technique of reconstructing damaged noses using a vascularized forehead skin pedicle flap, praised globally.',
    tags: ['Surgery', 'Sushruta', 'Plastic Surgery', 'Instruments'],
    readingTime: '6 min'
  },
  {
    id: 't-7',
    title: 'Tridosha Biological Equilibrium',
    sanskritTitle: 'त्रिदोष सिद्धान्त',
    category: 'ayurveda',
    era: 'Classical Era',
    summary: 'The dynamic physiological balance between Vata (movement), Pitta (metabolism/digestion), and Kapha (structure/lubrication).',
    tags: ['Health', 'Doshas', 'Charaka', 'Homeostasis'],
    readingTime: '5 min'
  },
  {
    id: 't-8',
    title: 'Pramana Epistemology',
    sanskritTitle: 'प्रमाण शास्त्र',
    category: 'philosophy',
    era: 'Vedic to Classical',
    summary: 'The four valid instruments of knowledge in Nyaya philosophy: Perception (Pratyaksha), Inference (Anumana), Analogy (Upamana), and Testimony (Shabda).',
    tags: ['Logic', 'Epistemology', 'Nyaya', 'Scientific Method'],
    readingTime: '6 min'
  },
  {
    id: 't-9',
    title: 'Paramanu (Atomic Theory of Kanada)',
    sanskritTitle: 'परमाणुवाद',
    category: 'philosophy',
    era: '6th Century BCE',
    summary: 'The philosophy that all material reality is composed of indivisible, spherical particles that combine in dyads (Dyanuka) and triads.',
    tags: ['Physics', 'Atomism', 'Kanada', 'Vaisheshika'],
    readingTime: '5 min'
  },
  {
    id: 't-10',
    title: 'Panini\'s 3,959 Algorithmic Sutras',
    sanskritTitle: 'अष्टाध्यायी सूत्र',
    category: 'literature',
    era: '500 BCE',
    summary: 'The world\'s earliest formal generative grammar, containing phonetic rules, metarules, recursion, and morphological transformation.',
    tags: ['Linguistics', 'Panini', 'Computer Science', 'Grammar'],
    readingTime: '7 min'
  },
  {
    id: 't-11',
    title: 'Sulba Sutra Altar Geometry',
    sanskritTitle: 'शुल्बसूत्र रेखागणित',
    category: 'mathematics',
    era: '800 BCE',
    summary: 'Sacred geometric altar matrix (Syena Chiti) harmonizing circle-squaring algorithms, right triangle cord theorems, and geometric transformation.',
    tags: ['Mathematics', 'Sacred Geometry', 'Sulba Sutras', 'Vedic Altar'],
    readingTime: '5 min'
  },
  {
    id: 't-12',
    title: 'Madhava Infinite Series for Sine & Pi',
    sanskritTitle: 'माधव श्रेणी',
    category: 'mathematics',
    era: '1350 CE',
    summary: 'The infinite trigonometric series for sine, cosine, and arctangent formulated by Madhava of Sangamagrama.',
    tags: ['Calculus', 'Kerala School', 'Madhava', 'Infinite Series'],
    readingTime: '6 min'
  }
];

export const CURATED_TUTOR_PROMPTS = [
  {
    question: 'How did Aryabhata calculate the value of Pi (π)?',
    answer: 'In the Ganitapada section of the Aryabhatiya (499 CE), verse 10 states: "Add 4 to 100, multiply by 8, and then add 62,000. By this rule the circumference of a circle with a diameter of 20,000 can be approached." This gives (104 × 8 + 62000) / 20000 = 62832 / 20000 = 3.1416. Remarkably, Aryabhata used the word "āsanna" (approaching/approximate), demonstrating he understood that π was an irrational quantity that could only be approximated rather than expressed as an exact finite ratio.'
  },
  {
    question: 'What is the Baudhayana theorem and how does it compare to Pythagoras?',
    answer: 'The Baudhayana Sulba Sutra (~800 BCE, Sutra 1.48) states: "dīrghasyākṣṇayā rajjuḥ pārśvamānī tiryaṅmānī ca yat pṛthag bhūte kurutastadubhayāṅ karoti" (The diagonal cord of a rectangle produces both the areas which the horizontal and vertical sides produce separately). This is the exact geometric statement of a² + b² = c², written over 250 years before Pythagoras was born. Baudhayana used it for constructing complex Vedic fire altars (Syena chiti) with precise mathematical proportions.'
  },
  {
    question: 'Explain the Tridosha balance in Ayurveda with daily habits.',
    answer: 'In Ayurveda, the body operates through three functional biological forces (Doshas): Vata (space & air: movement, nervous system, respiration), Pitta (fire & water: digestion, thermoregulation, enzyme metabolism), and Kapha (earth & water: physical structure, lubrication, immunity). Good health (Svastha) is when these three remain in homeostatic equilibrium. Sushruta notes that imbalance occurs through improper diet, stress, or circadian disruption. Dinacharya (daily routine with sunrise waking, warm water hydration, mindful nutrition, and restorative rest) naturally preserves this harmony.'
  },
  {
    question: 'Why do computer scientists study Panini\'s Ashtadhyayi?',
    answer: 'Panini\'s Ashtadhyayi (~500 BCE) consists of 3,959 concise, rule-based algorithmic sutras that generate any valid Sanskrit sentence from root elements. In the 1960s, computer scientists John Backus and Peter Naur created Backus-Naur Form (BNF) to specify the syntax of modern programming languages (like ALGOL). Renowned computer scientists like Donald Knuth and Frits Staal demonstrated that Panini had already formulated a complete context-free generative grammar, recursion, auxiliary markers, and operator precedence 2,400 years earlier.'
  },
  {
    question: 'What are the six orthodox systems (Shad-Darshana) of Indian philosophy?',
    answer: 'The Shad-Darshanas are the six classical philosophical systems accepting the authority of the Vedas: 1. Nyaya (Epistemology, formal logic, and proof systems), 2. Vaisheshika (Atomism, physics, and categorization of material entities), 3. Samkhya (Cosmology of Purusha/consciousness and Prakriti/nature), 4. Yoga (Psychology, meditation, and mental control), 5. Mimamsa (Linguistic hermeneutics and ethical action), and 6. Vedanta (Metaphysics of non-dual consciousness and ultimate reality).'
  }
];
