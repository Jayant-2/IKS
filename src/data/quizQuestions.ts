import { QuizQuestion, QuizTopic } from '../types/iks';

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'topic-math-foundations',
    title: 'Vedic Geometry & Baudhayana Theorem',
    subject: 'mathematics',
    difficulty: 'beginner',
    questionCount: 4,
    description: 'Explore the geometric altar cord principles and right-triangle propositions of the Sulba Sutras.',
  },
  {
    id: 'topic-math-zero-algebra',
    title: 'Brahmagupta, Zero & Algebra',
    subject: 'mathematics',
    difficulty: 'intermediate',
    questionCount: 4,
    description: 'Test your understanding of the operational arithmetic of Shunya (zero) and negative numbers.',
  },
  {
    id: 'topic-math-calculus-series',
    title: 'Kerala School & Infinite Series',
    subject: 'mathematics',
    difficulty: 'advanced',
    questionCount: 4,
    description: 'Advanced trigonometric power series and infinite calculus expansions of Madhava and Nilakantha.',
  },
  {
    id: 'topic-astro-mechanics',
    title: 'Aryabhata & Planetary Motion',
    subject: 'astronomy',
    difficulty: 'beginner',
    questionCount: 4,
    description: 'Discoveries on Earth\'s axial rotation, eclipse shadow geometry, and planetary orbits.',
  },
  {
    id: 'topic-astro-yantras',
    title: 'Gola Yantra & Observational Instruments',
    subject: 'astronomy',
    difficulty: 'intermediate',
    questionCount: 4,
    description: 'Celestial armillary spheres, sidereal year calculations, and the 27 Nakshatra coordinates.',
  },
  {
    id: 'topic-philo-epistemology',
    title: 'Nyaya Epistemology & Pramanas',
    subject: 'philosophy',
    difficulty: 'beginner',
    questionCount: 4,
    description: 'The four valid instruments of knowledge (Pramanas) in classical Indian logic.',
  },
  {
    id: 'topic-philo-atomism-mind',
    title: 'Vaisheshika Atomism & Samkhya Cosmology',
    subject: 'philosophy',
    difficulty: 'intermediate',
    questionCount: 4,
    description: 'Kanada\'s Paramanu atomic particles and the 24 Tattvas of evolutionary cosmic nature.',
  },
  {
    id: 'topic-ayur-tridosha',
    title: 'Tridosha Principles & Physiology',
    subject: 'ayurveda',
    difficulty: 'beginner',
    questionCount: 4,
    description: 'Educational overview of Vata, Pitta, and Kapha homeostasis and circadian harmony.',
  },
  {
    id: 'topic-ayur-surgery',
    title: 'Sushruta\'s Surgical Sciences',
    subject: 'ayurveda',
    difficulty: 'intermediate',
    questionCount: 4,
    description: 'Ancient surgical instruments (Yantras & Shastras), reconstructive rhinoplasty, and medical ethics.',
  },
  {
    id: 'topic-lit-panini',
    title: 'Panini\'s Generative Grammar Engine',
    subject: 'literature',
    difficulty: 'intermediate',
    questionCount: 4,
    description: 'The 3,959 algorithmic sutras of Ashtadhyayi and their connection to computer science BNF grammars.',
  },
  {
    id: 'topic-lit-aesthetics',
    title: 'Natyashastra & Rasa Aesthetics',
    subject: 'literature',
    difficulty: 'beginner',
    questionCount: 4,
    description: 'The nine emotional Rasas and Bhavas codified by Bharata Muni for drama and poetry.',
  },
];

export const IKS_QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- MATHEMATICS: BEGINNER ---
  {
    id: 'math-1',
    subject: 'mathematics',
    topic: 'Vedic Geometry & Baudhayana Theorem',
    difficulty: 'beginner',
    question: 'In the Baudhayana Sulba Sutra (~800 BCE), what does the "diagonal cord" (akṣṇayā rajjuḥ) of a rectangle produce?',
    options: [
      'An area equal to the sum of the areas produced by both the longer and shorter sides',
      'An area equal to double the perimeter of the sacrificial altar',
      'A cube with volume equal to the base of the fire altar',
      'The circumference of a circumscribed circle'
    ],
    correctIndex: 0,
    explanation: 'Baudhayana Sulba Sutra 1.48 states that the diagonal cord of a rectangle produces by itself both the areas which the horizontal and vertical sides produce individually (a² + b² = c²), pre-dating Pythagoras by over two centuries.',
    sourceText: 'Baudhayana Sulba Sutra (1.48)'
  },
  {
    id: 'math-2',
    subject: 'mathematics',
    topic: 'Vedic Geometry & Baudhayana Theorem',
    difficulty: 'beginner',
    question: 'Which ancient text contains the earliest mathematical approximation of the square root of 2 as 1 + 1/3 + 1/(3×4) - 1/(3×4×34)?',
    options: [
      'Baudhayana Sulba Sutra',
      'Khandakhadyaka',
      'Lilavati',
      'Surya Siddhanta'
    ],
    correctIndex: 0,
    explanation: 'The Sulba Sutras gave √2 ≈ 1.4142156, accurate to five decimal places, used for constructing square fire altars with precision.',
    sourceText: 'Baudhayana Sulba Sutra (1.61-62)'
  },
  {
    id: 'math-3',
    subject: 'mathematics',
    topic: 'Vedic Geometry & Baudhayana Theorem',
    difficulty: 'beginner',
    question: 'What was the primary purpose of the mathematical formulas in the Vedic Sulba Sutras?',
    options: [
      'Constructing sacred Vedic fire altars (Chitis) with exact geometrical shapes and areas',
      'Calculating maritime trade tariffs across the Indian Ocean',
      'Tracking daily market commodity prices in ancient Pataliputra',
      'Architectural military fortification against river floods'
    ],
    correctIndex: 0,
    explanation: 'Sulba Sutras were engineering manuals for constructing fire altars like the Syena Chiti (falcon altar) requiring transformations of squares into circles of identical area.',
    sourceText: 'Sulba Sutras Historical Commentary'
  },
  {
    id: 'math-4',
    subject: 'mathematics',
    topic: 'Vedic Geometry & Baudhayana Theorem',
    difficulty: 'beginner',
    question: 'What is the Sanskrit name for the combinatoric triangle arranged by Acharya Pingala in the Chandas Shastra (~300 BCE)?',
    options: [
      'Meru Prastara',
      'Yantra Raj',
      'Chakravala',
      'Kuttaka'
    ],
    correctIndex: 0,
    explanation: 'Pingala called the triangular arrangement of binomial coefficients "Meru Prastara" (the staircase of Mount Meru), formulated 1,800 years before Blaise Pascal.',
    sourceText: 'Pingala Chandas Shastra'
  },

  // --- MATHEMATICS: INTERMEDIATE ---
  {
    id: 'math-5',
    subject: 'mathematics',
    topic: 'Brahmagupta, Zero & Algebra',
    difficulty: 'intermediate',
    question: 'In which 628 CE treatise did Brahmagupta first establish operational arithmetic rules for Zero (Shunya) and negative numbers?',
    options: [
      'Brahmasphutasiddhanta',
      'Aryabhatiya',
      'Bijaganita',
      'Siddhanta Shiromani'
    ],
    correctIndex: 0,
    explanation: 'Brahmagupta devoted Chapter 18 of Brahmasphutasiddhanta to defining 0 + a = a, 0 - a = -a, a × 0 = 0, and rules for fortunes (Dhana) and debts (Rina).',
    sourceText: 'Brahmasphutasiddhanta, Chapter 18'
  },
  {
    id: 'math-6',
    subject: 'mathematics',
    topic: 'Brahmagupta, Zero & Algebra',
    difficulty: 'intermediate',
    question: 'Which ancient manuscript, dated by radiocarbon testing to the 3rd–4th century CE, demonstrates the earliest recorded use of a dot for zero as a place-holder?',
    options: [
      'Bakhshali Manuscript',
      'Bower Manuscript',
      'Spitzer Manuscript',
      'Gilgit Manuscripts'
    ],
    correctIndex: 0,
    explanation: 'The Bakhshali birch bark manuscript, discovered in 1881 and held in the Bodleian Library at Oxford, contains the earliest known Indian dot numeral for zero.',
    sourceText: 'Bodleian Library Oxford Radiocarbon Study (2017)'
  },
  {
    id: 'math-7',
    subject: 'mathematics',
    topic: 'Brahmagupta, Zero & Algebra',
    difficulty: 'intermediate',
    question: 'What value did Aryabhata specify for Pi (π) in the Ganitapada of the Aryabhatiya (499 CE)?',
    options: [
      '62,832 / 20,000 = 3.1416 (stated as approximate)',
      '22 / 7 = 3.1428 (stated as exact)',
      '355 / 113 = 3.1415929',
      'Square root of 10 = 3.162'
    ],
    correctIndex: 0,
    explanation: 'Aryabhata gave the rule: add 4 to 100, multiply by 8, add 62,000 for a diameter of 20,000, giving 3.1416, and specifically qualified it with the word "āsanna" (approaching/approximate).',
    sourceText: 'Aryabhatiya, Ganitapada (verse 10)'
  },
  {
    id: 'math-8',
    subject: 'mathematics',
    topic: 'Brahmagupta, Zero & Algebra',
    difficulty: 'intermediate',
    question: 'What is the name of the cyclic algorithm invented by Jayadeva and perfected by Bhaskara II to solve indeterminate quadratic equations (Pell\'s equation)?',
    options: [
      'Chakravala method',
      'Kuttaka pulverizer',
      'Vilyukta procedure',
      'Samasa method'
    ],
    correctIndex: 0,
    explanation: 'The Chakravala method (from chakra meaning wheel/cyclic) is a continuous cyclic algorithm praised by European historians like Hankel as a masterpiece of number theory.',
    sourceText: 'Bhaskara II, Bijaganita'
  },

  // --- MATHEMATICS: ADVANCED ---
  {
    id: 'math-9',
    subject: 'mathematics',
    topic: 'Kerala School & Infinite Series',
    difficulty: 'advanced',
    question: 'Who founded the Kerala School of Astronomy and Mathematics in the 14th century, deriving infinite power series for sine, cosine, and arctan?',
    options: [
      'Madhava of Sangamagrama',
      'Nilakantha Somayaji',
      'Jyeshthadeva',
      'Parameshvara'
    ],
    correctIndex: 0,
    explanation: 'Madhava of Sangamagrama (c. 1340–1425 CE) formulated infinite trigonometric series and calculated π to 11 decimal places nearly 300 years before Gregory, Leibniz, and Newton.',
    sourceText: 'Yuktidipika & Tantrasangraha'
  },
  {
    id: 'math-10',
    subject: 'mathematics',
    topic: 'Kerala School & Infinite Series',
    difficulty: 'advanced',
    question: 'Which 1530 CE text by Jyeshthadeva is recognized as the world\'s first comprehensive calculus textbook written in Malayalam?',
    options: [
      'Yuktibhasa (Ganita-Yuktibhasa)',
      'Karanapaddhati',
      'Sadratnamala',
      'Drgganita'
    ],
    correctIndex: 0,
    explanation: 'Yuktibhasa presents rationales and mathematical proofs for the infinite series, term-by-term integration, and trigonometric identities derived by the Kerala School.',
    sourceText: 'Yuktibhasa of Jyeshthadeva'
  },

  // --- ASTRONOMY: BEGINNER & INTERMEDIATE ---
  {
    id: 'astro-1',
    subject: 'astronomy',
    topic: 'Aryabhata & Planetary Motion',
    difficulty: 'beginner',
    question: 'Which analogy did Aryabhata use in the Aryabhatiya (499 CE) to explain why the stars appear to move across the night sky?',
    options: [
      'A passenger sitting in a moving boat perceives stationary trees along the shore moving backward',
      'A bird flying through clouds at twilight seeing moving shadows',
      'A chariot wheel kicking up dust particles in a circle',
      'A fisherman casting a circular net across calm water'
    ],
    correctIndex: 0,
    explanation: 'In Golapada verse 9, Aryabhata states that just as someone in a boat moving down a river sees fixed objects moving in reverse, so the stars appear to move westward because Earth rotates eastward on its axis.',
    sourceText: 'Aryabhatiya, Golapada (verse 9)'
  },
  {
    id: 'astro-2',
    subject: 'astronomy',
    topic: 'Aryabhata & Planetary Motion',
    difficulty: 'beginner',
    question: 'How did classical Indian astronomers like Aryabhata explain solar and lunar eclipses scientifically?',
    options: [
      'Geometric shadow of the Moon falling on Earth (solar) and Earth\'s shadow falling on the Moon (lunar)',
      'The mythical demon Rahu swallowing the Sun and Ketu swallowing the Moon',
      'Seasonal atmospheric vapors obscuring celestial rays',
      'Sudden gravitational alignment with the Pole Star (Dhruva)'
    ],
    correctIndex: 0,
    explanation: 'Aryabhata explicitly dispelled superstitious mythology by proving that the Moon is illuminated by sunlight and lunar eclipses are caused by Earth\'s shadow cone (Bhoochhaya).',
    sourceText: 'Aryabhatiya, Golapada (verses 37-40)'
  },
  {
    id: 'astro-3',
    subject: 'astronomy',
    topic: 'Gola Yantra & Observational Instruments',
    difficulty: 'intermediate',
    question: 'According to the Surya Siddhanta, what is the length of the sidereal year?',
    options: [
      '365.25636 days (deviating by only 1.4 minutes from modern calculations)',
      '360 days exactly',
      '365.000 days',
      '366.500 days'
    ],
    correctIndex: 0,
    explanation: 'The Surya Siddhanta calculated the sidereal year with astounding precision (365.25636 days), showing the sophistication of ancient Indian observational astronomy.',
    sourceText: 'Surya Siddhanta (1.37)'
  },
  {
    id: 'astro-4',
    subject: 'astronomy',
    topic: 'Gola Yantra & Observational Instruments',
    difficulty: 'intermediate',
    question: 'How many Nakshatras (lunar mansions) divide the ecliptic in the Indian astronomical system?',
    options: [
      '27 Nakshatras (each spanning 13° 20\')',
      '12 Nakshatras (each spanning 30°)',
      '36 Nakshatras (each spanning 10°)',
      '60 Nakshatras (each spanning 6°)'
    ],
    correctIndex: 0,
    explanation: 'The 360-degree zodiac is divided into 27 Nakshatras of 13° 20\' each, tracking the synodic and sidereal transit of the Moon across stellar constellations.',
    sourceText: 'Vedanga Jyotisha & Surya Siddhanta'
  },

  // --- PHILOSOPHY: BEGINNER & INTERMEDIATE ---
  {
    id: 'philo-1',
    subject: 'philosophy',
    topic: 'Nyaya Epistemology & Pramanas',
    difficulty: 'beginner',
    question: 'How many orthodox philosophical systems (Shad-Darshanas) form the foundation of classical Indian philosophy?',
    options: [
      'Six (Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta)',
      'Four (Vedas, Upanishads, Puranas, Epics)',
      'Eight (Ashtanga systems of Patanjali)',
      'Twelve (The Buddhist and Jaina branches)'
    ],
    correctIndex: 0,
    explanation: 'The six Astika schools are: Nyaya (Logic), Vaisheshika (Atomism), Samkhya (Cosmology), Yoga (Mind psychology), Mimamsa (Hermeneutics), and Vedanta (Metaphysics).',
    sourceText: 'Sarva-Darshana-Samgraha'
  },
  {
    id: 'philo-2',
    subject: 'philosophy',
    topic: 'Nyaya Epistemology & Pramanas',
    difficulty: 'beginner',
    question: 'In Nyaya philosophy, what are the four accepted sources of valid knowledge (Pramanas)?',
    options: [
      'Pratyaksha (Perception), Anumana (Inference), Upamana (Comparison), Shabda (Testimony)',
      'Dharma, Artha, Kama, Moksha',
      'Vata, Pitta, Kapha, Ojas',
      'Sattva, Rajas, Tamas, Prakriti'
    ],
    correctIndex: 0,
    explanation: 'Gautama\'s Nyaya Sutras establish these four Pramanas as rigorous epistemology to test any scientific or philosophical proposition.',
    sourceText: 'Nyaya Sutras (1.1.3)'
  },
  {
    id: 'philo-3',
    subject: 'philosophy',
    topic: 'Vaisheshika Atomism & Samkhya Cosmology',
    difficulty: 'intermediate',
    question: 'Which ancient sage founded the Vaisheshika school and proposed that all physical matter is composed of indivisible atoms (Paramanu)?',
    options: [
      'Acharya Kanada',
      'Kapila Muni',
      'Jaimini',
      'Adi Shankara'
    ],
    correctIndex: 0,
    explanation: 'Sage Kanada in the Vaisheshika Sutras (~6th century BCE) proposed that matter can be divided until reaching the Paramanu, which is eternal and indestructible.',
    sourceText: 'Vaisheshika Sutras'
  },
  {
    id: 'philo-4',
    subject: 'philosophy',
    topic: 'Vaisheshika Atomism & Samkhya Cosmology',
    difficulty: 'intermediate',
    question: 'In Patanjali\'s Yoga Sutras, what is the core definition of Yoga given in Sutra 1.2?',
    options: [
      'Yogaś citta-vṛtti-nirodhaḥ (Yoga is the mastery over the fluctuations of consciousness)',
      'Yoga is physical contortion and postures exclusively',
      'Yoga is withdrawal from daily civic duties and society',
      'Yoga is scholastic debate between rival logical schools'
    ],
    correctIndex: 0,
    explanation: 'Patanjali defines yoga as the cognitive calming and cessation of involuntary mental turbulence (chitta-vritti-nirodha).',
    sourceText: 'Patanjali Yoga Sutras (1.2)'
  },

  // --- AYURVEDA: BEGINNER & INTERMEDIATE (EDUCATIONAL ONLY) ---
  {
    id: 'ayur-1',
    subject: 'ayurveda',
    topic: 'Tridosha Principles & Physiology',
    difficulty: 'beginner',
    question: 'In educational Ayurveda, what are the three constitutional biological forces (Tridosha) that maintain physiological balance?',
    options: [
      'Vata (Kinetic/Air-Space), Pitta (Metabolic/Fire-Water), Kapha (Structural/Earth-Water)',
      'Prana, Apana, Vyana',
      'Sat, Chit, Ananda',
      'Sthula, Sukshma, Karana'
    ],
    correctIndex: 0,
    explanation: 'Classical Ayurveda explains biological regulation through the dynamic balance of Vata (movement), Pitta (metabolism), and Kapha (lubrication/structure). (Educational notice: not personal medical advice).',
    sourceText: 'Charaka Samhita, Sutrasthana (1.57)'
  },
  {
    id: 'ayur-2',
    subject: 'ayurveda',
    topic: 'Tridosha Principles & Physiology',
    difficulty: 'beginner',
    question: 'What is the classical definition of a healthy individual (Svastha) according to the Sushruta Samhita?',
    options: [
      'Balanced doshas, balanced digestive fire, balanced biological tissues, and a serene mind and senses',
      'Absence of fever and physical pain for seven days',
      'Ability to run continuous long distances without resting',
      'Consuming herbal tonics three times daily'
    ],
    correctIndex: 0,
    explanation: 'Sushruta defines health (Svastha) holistically in Sutrasthana 15.41: "Samadosha samagnischa samadhatu malakriyah | Prasannatmendriya manah svastha ityabhidhiyate".',
    sourceText: 'Sushruta Samhita, Sutrasthana (15.41)'
  },
  {
    id: 'ayur-3',
    subject: 'ayurveda',
    topic: 'Sushruta\'s Surgical Sciences',
    difficulty: 'intermediate',
    question: 'Why is Sushruta celebrated internationally in medical history as the "Father of Surgery"?',
    options: [
      'He documented over 120 surgical tools, cataract couching, and pedicle flap reconstructive rhinoplasty (~600 BCE)',
      'He established the first modern microscope factory in ancient Varanasi',
      'He banned all forms of surgical dissection on cadavers',
      'He invented synthetic anesthesia in the 18th century'
    ],
    correctIndex: 0,
    explanation: 'The Sushruta Samhita describes surgical methods for bone setting, cataract extraction, and the cheek/forehead pedicle flap for nose reconstruction, which influenced modern plastic surgery.',
    sourceText: 'Sushruta Samhita, Sutrasthana'
  },
  {
    id: 'ayur-4',
    subject: 'ayurveda',
    topic: 'Sushruta\'s Surgical Sciences',
    difficulty: 'intermediate',
    question: 'How did Sushruta train his medical surgical students before operating on living human beings?',
    options: [
      'Practice incisions on watermelons, cucumbers, leather bags filled with slime, and lotus stalks',
      'Exclusively through memorizing oral verses without tactile practice',
      'By observing celestial moon eclipses at night',
      'Through chemical alchemical experiments on metals only'
    ],
    correctIndex: 0,
    explanation: 'In Sushruta Samhita Sutrasthana Chapter 9 (Yogyasutriya Adhyaya), Sushruta pioneered surgical simulation on gourds, watermelons, hollow reeds, and layered hides.',
    sourceText: 'Sushruta Samhita (Chapter 9, Yogyasutriya)'
  },

  // --- LITERATURE & LINGUISTICS: BEGINNER & INTERMEDIATE ---
  {
    id: 'lit-1',
    subject: 'literature',
    topic: 'Panini\'s Generative Grammar Engine',
    difficulty: 'intermediate',
    question: 'How many concise aphoristic sutras compose Panini\'s monumental generative Sanskrit grammar, the Ashtadhyayi (~500 BCE)?',
    options: [
      '3,959 sutras organized across 8 chapters',
      '108 sutras organized across 4 chapters',
      '1,000 verses organized into 10 mandalas',
      '12,000 sutras divided into 16 sections'
    ],
    correctIndex: 0,
    explanation: 'Panini\'s Ashtadhyayi contains 3,959 algorithmic rules that generate every grammatically valid form in Sanskrit through algebraic rule evaluation.',
    sourceText: 'Panini Ashtadhyayi'
  },
  {
    id: 'lit-2',
    subject: 'literature',
    topic: 'Panini\'s Generative Grammar Engine',
    difficulty: 'intermediate',
    question: 'Why did computer pioneer Donald Knuth and linguist Noam Chomsky highlight the brilliance of Panini\'s Ashtadhyayi?',
    options: [
      'It formulated the first complete formal generative grammar and context-free rules resembling Backus-Naur Form (BNF)',
      'It contains the first binary machine code program for electronic circuits',
      'It proposed replacing spoken languages with numerical digits exclusively',
      'It created the Roman alphabet lettering scheme'
    ],
    correctIndex: 0,
    explanation: 'Panini used auxiliary marker characters (It-samjna), operator precedence, recursion, and metarules identical in logical structure to compiler design and formal syntax specification.',
    sourceText: 'Formal Linguistics & Computational History'
  },
  {
    id: 'lit-3',
    subject: 'literature',
    topic: 'Natyashastra & Rasa Aesthetics',
    difficulty: 'beginner',
    question: 'Who codified the theory of aesthetic emotional experience (Rasa Theory) in the ancient encyclopedic drama treatise Natyashastra?',
    options: [
      'Bharata Muni',
      'Kalidasa',
      'Bhasa',
      'Banabhatta'
    ],
    correctIndex: 0,
    explanation: 'Bharata Muni in the Natyashastra formulated the Rasa-Sutra: "Vibhavanubhava-vyabhichari-samyogad rasa-nishpattih" (Rasa arises from the union of determinants, consequents, and transitory mental states).',
    sourceText: 'Natyashastra (Chapter 6)'
  },
  {
    id: 'lit-4',
    subject: 'literature',
    topic: 'Natyashastra & Rasa Aesthetics',
    difficulty: 'beginner',
    question: 'Which celebrated lyrical poem by Kalidasa describes a lonely Yaksha sending a message to his beloved across India via a monsoon cloud?',
    options: [
      'Meghaduta (The Cloud Messenger)',
      'Abhijnanashakuntalam',
      'Kumarasambhava',
      'Malavikagnimitram'
    ],
    correctIndex: 0,
    explanation: 'Kalidasa\'s Meghaduta is one of the greatest masterpieces of Sanskrit poetry, praised globally by Goethe, describing the geography and ecology of ancient India with exquisite lyrical imagery.',
    sourceText: 'Kalidasa, Meghaduta'
  }
];
