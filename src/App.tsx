import React, { useState, useRef, useEffect } from 'react';
import FloatingBanner from './components/FloatingBanner';
import logoImg from './assets/Logo.webp';
import { motion, AnimatePresence, useScroll, useTransform} from 'framer-motion';
import { 
  MessageCircle, Star, MapPin, Clock, Phone, ChevronUp, Shield, 
  Award,Car, Plus, Minus, Instagram, Facebook, 
  ArrowRight, Heart, Sparkles, Activity
} from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility for Tailwind Classes ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data Models ---
const TABS = [
  { id: 'home', label: 'Inicio' },
  { id: 'treatments', label: 'Tratamientos' },
  { id: 'clinic', label: 'Nuestra Clínica' },
  { id: 'experience', label: 'Experiencias' }
] as const;

type TabID = typeof TABS[number]['id'];

const TREATMENTS = [
  {
    id: 'ortho',
    title: 'Invisalign y Ortodoncia Moderna',
    desc: 'Transforma tu sonrisa discretamente con tecnología de alineadores transparentes de vanguardia. Planes personalizados diseñados para tu comodidad y rapidez.',
    stats: 'Más de 500 casos exitosos',
    image: 'https://plus.unsplash.com/premium_photo-1673773401710-d23ef113e06f?q=80',
    icon: Activity
  },
  {
    id: 'whitening',
    title: 'Blanqueamiento Láser',
    desc: 'Resultados seguros, indoloros y dramáticos. Nuestra avanzada tecnología láser ofrece hasta 8 tonos más blancos en menos de una hora.',
    stats: 'Transformación en 1 sesión',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    icon: Sparkles
  },
  {
    id: 'implants',
    title: 'Implantes Dentales',
    desc: 'Restaura la funcionalidad y estética con implantes premium biocompatibles. Una solución permanente que se siente completamente natural.',
    stats: 'Garantía de por vida',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    icon: Shield
  }
];

const TESTIMONIALS = [
  {
    name: 'Maria G.',
    quote: 'Absolutamente indoloro. El ambiente se siente más como un spa que como una clínica. Mi sonrisa nunca se ha visto mejor.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Carlos R.',
    quote: 'La tecnología de escaneo 3D me impresionó. Me mostraron exactamente cómo se verían mis dientes antes de comenzar.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Ana P.',
    quote: 'Resultados de blanqueamiento increíbles en solo una hora. El Dr. Sonrisas y su equipo son verdaderos perfeccionistas.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Luis M.',
    quote: 'Tenía mucha ansiedad dental, pero sus protocolos de sedación y su trato calmado cambiaron por completo mi perspectiva.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  }
];

const FAQS = [
  {
    question: '¿Aceptan seguros dentales?',
    answer: 'Sí, trabajamos con la mayoría de los seguros en Perú. Nuestro equipo administrativo te ayudará a verificar tu cobertura y manejar el papeleo para una experiencia sin complicaciones.',
  },
  {
    question: '¿Cuánto dura la sesión de blanqueamiento dental?',
    answer: 'Nuestro tratamiento de blanqueamiento láser dura aproximadamente 45-60 minutos. Verás resultados inmediatos con dientes hasta 8 tonos más blancos en una sola sesión.',
  },
  {
    question: '¿Hay estacionamiento disponible en la clínica de Miraflores?',
    answer: 'Absolutamente. Ofrecemos estacionamiento privado gratuito para todos nuestros pacientes directamente debajo de la clínica. También somos de fácil acceso en transporte público.',
  },
  {
    question: '¿Ofrecen planes de pago para tratamientos más grandes?',
    answer: 'Sí, ofrecemos opciones de financiamiento flexibles con cuotas sin intereses para tratamientos como Invisalign e Implantes Dentales. Nos aseguramos de que la atención premium sea accesible.',
  },
];

// --- Animation Variants ---
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

// --- Components ---

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={cn("relative overflow-hidden transition-shadow duration-300", className)}
    >
      {children}
    </motion.button>
  );
};

// --- Tab Views ---

const HomeView = ({ setActiveTab }: { setActiveTab: (id: TabID) => void }) => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-32 pb-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="relative z-10">
            <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 rounded-pill bg-coral/30 px-5 py-2 text-sm font-medium text-deep-teal/80">
              <Sparkles className="h-4 w-4 text-coral" />
              <span>CLÍNICA PREMIUM EN MIRAFLORES</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-syne text-5xl font-bold leading-tight text-deep-teal md:text-6xl lg:text-7xl">
              Una Sonrisa Que <br />
              <span className="relative inline-block text-coral">
                Refleja Tu
                <motion.span
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: 6, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -right-8 -top-8 rounded-lg bg-deep-teal px-4 py-2 text-xs font-bold tracking-wider text-white shadow-xl"
                >
                  40% DSCTO ESCANEO
                </motion.span>
              </span>
              <br /> Energía.
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-8 max-w-lg font-jakarta text-lg leading-relaxed text-deep-teal/70">
              Experimenta la odontología redefinida. Combinamos bioseguridad de vanguardia con la tranquilidad de un spa para diseñar tu sonrisa perfecta.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton 
                onClick={() => window.open('https://wa.me/51999888777', '_blank')}
                className="inline-flex items-center gap-3 rounded-pill bg-deep-teal px-8 py-4 font-syne text-lg font-semibold text-white shadow-soft hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                Agendar Consulta
              </MagneticButton>
              <button 
                onClick={() => setActiveTab('treatments')}
                className="group flex items-center gap-2 font-syne text-lg font-semibold text-deep-teal transition-colors hover:text-coral"
              >
                Explorar Tratamientos
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-md"
          >
            <div className="organic-mask relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-deep-teal/10 to-coral/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&q=80&w=800"
                alt="Sonrisa radiante de paciente"
                className="h-full w-full object-cover"
              />
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-1/4 h-24 w-24 rounded-full bg-coral/40 backdrop-blur-3xl" 
              />
              <motion.div 
                animate={{ y: [0, 20, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-deep-teal/20 backdrop-blur-3xl" 
              />
            </div>
            
            {/* Floating Review Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -left-12 bottom-12 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur-sm sm:-left-24"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                  <p className="font-syne text-xs font-bold text-deep-teal">5.0 de más de 200 reseñas</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TreatmentsView = () => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-32 pb-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-syne text-4xl font-bold text-deep-teal md:text-5xl">
            Atención Especializada
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-lg text-deep-teal/60">
            Tratamientos premium diseñados para el viaje único de tu sonrisa
          </motion.p>
        </div>

        <div className="space-y-32">
          {TREATMENTS.map((treatment, i) => (
            <motion.div 
              key={treatment.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={cn(
                "flex flex-col items-center gap-12 lg:flex-row lg:gap-20",
                i % 2 !== 0 && "lg:flex-row-reverse"
              )}
            >
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-coral/20 text-coral">
                  <treatment.icon className="h-8 w-8" />
                </div>
                <h3 className="font-syne text-3xl font-bold text-deep-teal md:text-4xl">
                  {treatment.title}
                </h3>
                <p className="max-w-lg font-jakarta text-lg leading-relaxed text-deep-teal/70 mx-auto lg:mx-0">
                  {treatment.desc}
                </p>
                <div className="inline-flex items-center gap-3 rounded-full bg-deep-teal/5 px-6 py-3 text-deep-teal">
                  <Star className="h-5 w-5 text-coral fill-coral" />
                  <span className="font-syne font-semibold">{treatment.stats}</span>
                </div>
              </div>
              
              <div className="w-full flex-1">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden shadow-2xl",
                    i % 2 === 0 ? "organic-mask" : "organic-mask-alt"
                  )}
                >
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/40 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ClinicView = () => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-32 pb-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="organic-mask aspect-square overflow-hidden shadow-2xl lg:aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800" 
                alt="Interior de la clínica" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 hidden h-64 w-64 rounded-full border border-coral/30 bg-white/50 backdrop-blur-xl lg:flex items-center justify-center shadow-soft">
              <div className="text-center">
                <span className="block font-syne text-5xl font-bold text-coral">15+</span>
                <span className="font-jakarta text-sm font-medium tracking-widest text-deep-teal">AÑOS DE<br/>EXCELENCIA</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-syne text-4xl font-bold text-deep-teal md:text-5xl">
              Elevando el Estándar de la <span className="text-coral">Odontología Moderna.</span>
            </h2>
            <div className="mt-8 space-y-6 font-jakarta text-lg leading-relaxed text-deep-teal/70">
              <p>
                Fundada en el corazón de Miraflores, Dr. Sonrisas fue construida con una visión singular: eliminar la ansiedad tradicionalmente asociada con las visitas al dentista y reemplazarla con una experiencia verdaderamente relajante y tipo spa.
              </p>
              <p>
                Creemos que la bioseguridad y la comodidad no son excluyentes. Nuestras instalaciones integran protocolos de esterilización de grado hospitalario dentro de un entorno diseñado para calmar los sentidos, desde aromaterapia hasta auriculares con cancelación de ruido durante los tratamientos.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { icon: Shield, title: 'Bioseguridad', desc: 'Estrictos protocolos internacionales' },
                { icon: Award, title: 'Especialistas', desc: 'Credenciales de posgrado' },
                { icon: Heart, title: 'Confort Primero', desc: 'Sedación y entorno spa' },
                { icon: Activity, title: 'Tecnología', desc: 'Escaneo intraoral 3D' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft transition-shadow hover:shadow-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/20">
                    <item.icon className="h-5 w-5 text-coral" />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-deep-teal">{item.title}</h4>
                    <p className="text-sm text-deep-teal/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceView = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-32 pb-section" ref={containerRef}>
      
      {/* Testimonials Ticker */}
      <div className="overflow-hidden bg-deep-teal py-20 text-white">
        <div className="mx-auto mb-16 max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-syne text-4xl font-bold md:text-5xl">Historias de Pacientes Reales</h2>
        </div>
        
        <div className="relative flex w-full flex-nowrap items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-8">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-[400px] flex-shrink-0 rounded-3xl bg-white/10 p-8 backdrop-blur-md">
                <div className="mb-6 flex gap-1 text-coral">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mb-8 font-jakarta text-lg italic leading-relaxed text-white/90">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-syne font-bold">{t.name}</h4>
                    <p className="text-sm text-white/60">Paciente Verificado</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQs */}
      <div className="mx-auto mt-32 max-w-3xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-syne text-4xl font-bold text-deep-teal md:text-5xl">Respuestas Claras</h2>
          <p className="mt-4 text-lg text-deep-teal/60">Todo lo que necesitas saber antes de tu visita.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div 
              key={i}
              initial={false}
              animate={{ backgroundColor: openFaq === i ? 'rgba(250, 208, 196, 0.1)' : 'rgba(255, 255, 255, 1)' }}
              className="overflow-hidden rounded-2xl border border-deep-teal/10 shadow-sm transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-syne text-lg font-semibold text-deep-teal">{faq.question}</span>
                <motion.span 
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-deep-teal/5"
                >
                  {openFaq === i ? <Minus className="h-4 w-4 text-deep-teal" /> : <Plus className="h-4 w-4 text-deep-teal" />}
                </motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-6 font-jakarta text-deep-teal/70">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabID>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-cream text-deep-teal selection:bg-coral selection:text-deep-teal">
      
      {/* Header & Tab Navigation */}
      <header 
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-4" : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
           <div 
            className="flex cursor-pointer items-center gap-3" 
            onClick={() => { setActiveTab('home'); scrollToTop(); }}
          >
            {/* Logo de la imagen reemplazando al ícono Sparkles */}
            <img 
              src={logoImg} 
              alt="Logo Dr. Sonrisas" 
              className="h-20 w-auto object-contain" 
            />
            <span className="font-syne text-xl font-bold tracking-wide text-deep-teal">
              DR. SONRISAS
            </span>
          </div>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex items-center gap-2 rounded-full bg-deep-teal/5 p-1 backdrop-blur-md">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); scrollToTop(); }}
                className={cn(
                  "relative rounded-full px-6 py-2.5 font-syne text-sm font-semibold transition-colors",
                  activeTab === tab.id ? "text-white" : "text-deep-teal hover:text-deep-teal/70"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-full bg-deep-teal"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </nav>
          
          {/* Mobile menu fallback indicator */}
          <div className="md:hidden flex space-x-2">
             <select 
               className="bg-transparent font-syne font-bold text-deep-teal outline-none"
               value={activeTab}
               onChange={(e) => { setActiveTab(e.target.value as TabID); scrollToTop(); }}
             >
               {TABS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
             </select>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeView key="home" setActiveTab={setActiveTab} />}
          {activeTab === 'treatments' && <TreatmentsView key="treatments" />}
          {activeTab === 'clinic' && <ClinicView key="clinic" />}
          {activeTab === 'experience' && <ExperienceView key="experience" />}
        </AnimatePresence>
      </main>

      {/* Persistent CTA Section */}
      <section className="relative overflow-hidden bg-deep-teal py-section">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-coral via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            ¿Listo para tu sonrisa más segura?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-jakarta text-lg text-white/70"
          >
            Agenda tu consulta hoy y descubre la diferencia que hace una atención dental premium y personalizada.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <MagneticButton 
              onClick={() => window.open('https://wa.me/51999888777', '_blank')}
              className="mt-10 inline-flex items-center gap-3 rounded-pill bg-coral px-10 py-5 font-syne text-xl font-bold text-deep-teal shadow-glow hover:shadow-coral/60"
            >
              <MessageCircle className="h-6 w-6" />
              Chatea Directamente con Nosotros
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2A26] py-16 text-white/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6 text-white">
                {/* Logo de la imagen en el footer */}
                <img 
                  src={logoImg} 
                  alt="Logo Dr. Sonrisas" 
                  className="h-12 w-auto object-contain drop-shadow-sm" 
                />
                <span className="font-syne text-2xl font-bold tracking-wide">
                  DR. SONRISAS
                </span>
              </div>
              <p className="max-w-sm font-jakarta text-sm leading-relaxed">
                Clínica dental premium en Miraflores, Lima. Especialistas en ortodoncia moderna, estética dental y tratamientos sin dolor.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-coral hover:text-deep-teal">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-coral hover:text-deep-teal">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-syne text-lg font-semibold text-white mb-6">Visítanos</h4>
              <ul className="space-y-4 font-jakarta text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-coral" />
                  <span>Av. Larco 123, Cerca del Parque Kennedy<br />Miraflores, Lima, Perú</span>
                </li>
                <li className="flex items-start gap-3">
                  <Car className="h-5 w-5 flex-shrink-0 text-coral" />
                  <span>Estacionamiento privado gratuito disponible</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-syne text-lg font-semibold text-white mb-6">Contacto y Horarios</h4>
              <ul className="space-y-4 font-jakarta text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-coral" />
                  <span>+51 999 888 777</span>
                </li>
                <li className="flex items-start gap-3 mt-4">
                  <Clock className="h-5 w-5 flex-shrink-0 text-coral" />
                  <div>
                    <p>Lun - Vie: 9:00 AM - 7:00 PM</p>
                    <p>Sáb: 9:00 AM - 2:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-sm font-jakarta">© 2024 Clínica Dental Dr. Sonrisas. Todos los derechos reservados.</p>
            <div className="mt-4 flex gap-6 text-sm font-jakarta sm:mt-0">
              <a href="#" className="hover:text-coral transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-coral transition-colors">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Floating Actions */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.5 }}
        onClick={scrollToTop}
        // NOTA: Cambié el bottom-6 a bottom-28 para que no choque con el FloatingBanner
        className="fixed bottom-28 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-deep-teal text-white shadow-xl transition-colors hover:bg-[#0A2A26] pointer-events-auto"
        style={{ pointerEvents: scrolled ? 'auto' : 'none' }}
      >
        <ChevronUp className="h-6 w-6" />
      </motion.button>

      <a
        href="https://wa.me/51999888777"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp-green shadow-xl shadow-whatsapp-green/30 transition-transform duration-300 hover:scale-110"
        aria-label="Chatear por WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.416z"/>
        </svg>
      </a>

      {/* NUEVA ETIQUETA FLOTANTE */}
      <FloatingBanner />

    </div>
  );
}