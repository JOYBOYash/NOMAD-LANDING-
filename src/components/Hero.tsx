/**
 * Default empty export
 */
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowDown, Play, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import assets from '../config/assets.json';
import { useCountdown } from './Countdown';

const CountdownBadge = () => {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="inline-flex items-center mb-8 lg:mb-12 z-10"
    >
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 bg-black/40 backdrop-blur-xl px-4 py-2.5 md:px-5 md:py-2.5 rounded-3xl md:rounded-full border border-white/10 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nomad-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-nomad-green"></span>
          </span>
          <span className="text-white/60 uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold font-sans text-center">
            Live to the world in
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono tracking-wider text-xs md:text-sm font-bold">
            <span className="bg-white/5 border border-white/10 px-1.5 md:px-2 py-1 rounded text-white">{days.toString().padStart(2, '0')}</span>
            <span className="text-white/30 px-0.5">:</span>
            <span className="bg-white/5 border border-white/10 px-1.5 md:px-2 py-1 rounded text-white">{hours.toString().padStart(2, '0')}</span>
            <span className="text-white/30 px-0.5">:</span>
            <span className="bg-white/5 border border-white/10 px-1.5 md:px-2 py-1 rounded text-white">{minutes.toString().padStart(2, '0')}</span>
            <span className="text-white/30 px-0.5">:</span>
            <span className="bg-nomad-green/10 border border-nomad-green/30 px-1.5 md:px-2 py-1 rounded text-nomad-green">{seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>
    </motion.div>
  );
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function NavPanelContent({ handleJoin, setCursorVariant, activeSection, isSoundEnabled, toggleSound }: any) {
  const sections = [
    { id: 'home', label: 'HOME' },
    { id: 'problem', label: 'THE PROBLEM' },
    { id: 'difference', label: 'DIFFERENCE' },
    { id: 'features', label: 'FEATURES' },
    { id: 'how-it-works', label: 'HOW IT WORKS' },
    { id: 'wall-of-fame', label: 'WALL OF FAME' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <>
      <div className="h-28 p-6 md:p-8 flex justify-start items-center border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <img src={assets.images.logo} alt="Nomad Logo" className="h-6 filter brightness-0 invert opacity-90" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(50%) saturate(579%) hue-rotate(63deg) brightness(98%) contrast(93%)' }} />
          <span className="text-2xl font-display font-black tracking-tighter text-nomad-ivory uppercase">Nomad</span>
        </div>
      </div>
      
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-[14px] font-sans font-black text-sm uppercase tracking-wider text-white/50 relative bg-nomad-charcoal/40 backdrop-blur-sm overflow-y-auto" data-lenis-prevent>
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button 
              key={id}
              className={`text-left w-full flex items-center gap-3 cursor-none transition-colors py-1 ${isActive ? 'text-nomad-green' : 'hover:text-white'}`} 
              onMouseEnter={() => setCursorVariant('hover')} 
              onMouseLeave={() => setCursorVariant('default')} 
              onClick={() => scrollToSection(id)}
            >
                <div className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${isActive ? 'bg-nomad-green shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-transparent'}`} /> 
                {label}
            </button>
          )
        })}
        
        <div className="mt-4 flex flex-col gap-3">
          <button 
            onClick={handleJoin}
            onMouseEnter={() => setCursorVariant('waitlist')}
            onMouseLeave={() => setCursorVariant('default')}
            className="w-full bg-[#FFD700] text-nomad-charcoal px-6 py-4 font-black text-sm uppercase tracking-widest cursor-none hover:bg-white transition-colors flex items-center justify-between group shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
          >
            EARLY ACCESS
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button 
            onClick={toggleSound}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="w-full border border-white/20 text-white/70 px-6 py-4 font-black text-sm uppercase tracking-widest cursor-none hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between group"
          >
            AUDIO {isSoundEnabled ? 'ON' : 'OFF'}
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </>
  );
}

export default function Hero({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const { setCursorVariant, isSoundEnabled, toggleSound } = useAppContext();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [showVideo, setShowVideo] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (bgVideoRef.current) bgVideoRef.current.muted = !isSoundEnabled;
    if (modalVideoRef.current) modalVideoRef.current.muted = !isSoundEnabled;
  }, [isSoundEnabled]);

  useEffect(() => {
    if ((isMenuOpen && typeof window !== 'undefined' && window.innerWidth < 1024) || showVideo) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // @ts-ignore
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // @ts-ignore
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // @ts-ignore
      if (window.lenis) window.lenis.start();
    };
  }, [isMenuOpen, showVideo]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        // Only automatically close/open menu based on scroll on desktop view. 
        // Mobile users will manually open/close.
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
          if (scrolled) {
            setIsMenuOpen(false);
          } else {
            setIsMenuOpen(true);
          }
        }
      }

      const sections = ['home', 'problem', 'difference', 'features', 'how-it-works', 'wall-of-fame', 'faq', 'waitlist'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    onJoinWaitlist(); 
  };

  const floatingButtons = (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] flex flex-col gap-3 pointer-events-none">
        <motion.button
          onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
          onMouseEnter={(e) => { e.stopPropagation(); setCursorVariant('hover'); }}
          onMouseLeave={(e) => { e.stopPropagation(); setCursorVariant('default'); }}
          className={`w-12 h-12 md:w-14 md:h-14 bg-nomad-green text-nomad-charcoal rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-none relative z-[100] pointer-events-auto`}
        >
          <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }}>
             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>
        
        <AnimatePresence>
          {isScrolled && (
             <motion.button
               initial={{ opacity: 0, scale: 0.8, y: -10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.8, y: -10 }}
               transition={{ duration: 0.2 }}
               onClick={(e) => { e.stopPropagation(); onJoinWaitlist(); }}
               onMouseEnter={(e) => { e.stopPropagation(); setCursorVariant('hover'); }}
               onMouseLeave={(e) => { e.stopPropagation(); setCursorVariant('default'); }}
               title="Join Waitlist"
               className="md:hidden w-12 h-12 bg-[#FFD700] text-[#111] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-none relative z-[99] pointer-events-auto"
             >
                <ArrowDown className="w-5 h-5 -rotate-45" strokeWidth={3} />
             </motion.button>
          )}
        </AnimatePresence>
      </div>
  );

  return (
    <section ref={containerRef} id="hero-section" className="relative min-h-screen flex flex-col overflow-hidden bg-nomad-charcoal font-sans">
      
      {/* Background Image / Video with Parallax */}
      <motion.div className="absolute inset-0 z-0 origin-top" style={{ y: yBg, scale: 1.15 }}>
        <video 
          ref={bgVideoRef}
          src={assets.videos.heroBackground}
          autoPlay 
          loop 
          muted={!isSoundEnabled}
          playsInline
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-nomad-charcoal/40 mix-blend-multiply" />
      </motion.div>

      {/* Main Grid Container */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row w-full border-b border-white/10">
        
        {/* Left Column (Nav Panel) */}
        <motion.div 
          initial={false}
          animate={{ 
             width: (!isScrolled && isMenuOpen) ? (typeof window !== 'undefined' && window.innerWidth >= 1280 ? 280 : 240) : 0, 
             opacity: (!isScrolled && isMenuOpen) ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="hidden lg:flex flex-col border-r border-white/10 relative overflow-hidden shrink-0 bg-nomad-charcoal/80 backdrop-blur-sm z-30"
        >
          <div className="w-[240px] xl:w-[280px] h-full flex flex-col">
            <NavPanelContent 
               handleJoin={handleJoin} 
               setCursorVariant={setCursorVariant} 
               setShowVideo={setShowVideo} 
               activeSection={activeSection}
               isSoundEnabled={isSoundEnabled}
               toggleSound={toggleSound}
            />
          </div>
        </motion.div>

        {/* Center Column */}
        <div className="flex-1 flex flex-col relative justify-center items-center py-24 md:py-0 w-full overflow-hidden">
            {/* Grid Crosshairs */}
            <div className="absolute top-10 left-10 text-white/20 hidden md:block">+</div>
            <div className="absolute top-10 right-10 text-white/20 hidden md:block">+</div>
            <div className="absolute bottom-10 left-10 text-white/20 hidden md:block">+</div>
            <div className="absolute bottom-10 right-10 text-white/20 hidden md:block">+</div>
            
            {/* Huge Text block */}
            <motion.div 
               style={{ y: yText }}
               className="relative flex flex-col items-center justify-center text-center w-full px-2"
            >
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative inline-flex flex-col items-center justify-center z-10 w-full px-4"
              >
                <CountdownBadge />
                <h1 className="relative inline-block text-[13.5vw] md:text-[12vw] lg:text-[140px] xl:text-[170px] leading-[0.75] font-black font-display uppercase tracking-[-0.02em] text-white">
                  EVENTS
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="absolute top-[45%] left-[-2%] right-[-2%] h-[6px] md:h-[10px] lg:h-[15px] bg-nomad-green shadow-[0_0_15px_rgba(34,197,94,0.6)] -translate-y-1/2 pointer-events-none"
                  />
                </h1>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative z-10 w-full px-4 font-black font-display uppercase tracking-[-0.02em] text-[13.5vw] md:text-[12vw] lg:text-[140px] xl:text-[170px] leading-[0.75] flex justify-center mt-2 md:mt-4"
              >
                {/* SVG text wrapper to allow exact stroke-linejoin styling and fix the 'P' spike artifact */}
                <span className="opacity-0">EPICS</span>
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                  <text 
                    x="50%" y="50%" textAnchor="middle" dominantBaseline="central" dy="0.05em"
                    fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="0.02em" strokeLinejoin="round" 
                    className="font-display font-black uppercase tracking-[-0.02em]"
                    style={{ fontSize: "1em" }}
                  >
                    EPICS
                  </text>
                </svg>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-6 md:mt-8 max-w-xl text-nomad-ivory/80 text-sm md:text-base font-medium leading-relaxed drop-shadow-md z-10 px-4 mb-10 md:mb-12"
              >
                The ultimate event engagement platform. We help you turn your events into experiences. Ready to create, join and participate in experiences of a lifetime?
              </motion.p>
              
              <div className="flex flex-col items-center justify-center gap-8 md:gap-12 mt-2 z-20">
                {/* Watch Reel Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  onClick={() => setShowVideo(true)}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="group relative flex flex-row items-center backdrop-blur-md bg-[#111]/40 hover:bg-nomad-green border border-white/10 hover:border-nomad-green rounded-full p-2 cursor-none transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] shadow-2xl overflow-hidden w-[340px] md:w-[420px]"
                >
                  <div className="absolute left-2 group-hover:left-[calc(100%-3.5rem)] md:group-hover:left-[calc(100%-4rem)] w-12 h-12 md:w-14 md:h-14 rounded-full bg-nomad-green group-hover:bg-[#111] flex items-center justify-center text-[#111] group-hover:text-nomad-green transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover:shadow-none z-10">
                    <Play className="w-5 h-5 md:w-6 md:h-6 ml-1" fill="currentColor" />
                  </div>
                  <div className="flex-1 flex justify-center items-center h-12 md:h-14 pl-10 pr-2 md:pl-12 md:pr-2 group-hover:pr-10 group-hover:pl-2 md:group-hover:pr-12 md:group-hover:pl-2 transition-all duration-500">
                    <span className="text-white group-hover:text-[#111] text-xs min-[400px]:text-sm md:text-base font-black uppercase tracking-[0.1em] md:tracking-[0.15em] transition-colors duration-500 z-0 whitespace-nowrap">Watch App Announcement</span>
                  </div>
                </motion.button>

                <div className="relative flex justify-center pb-12 w-full">
                    {/* Center Floating Diamond Scroll Button */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      className="w-12 h-12 md:w-16 md:h-16 bg-white/5 backdrop-blur-sm rotate-45 border border-white/10 flex items-center justify-center cursor-none hover:bg-nomad-green transition-all duration-300 group"
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                       <div className="-rotate-45 flex flex-col items-center justify-center">
                         <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                            <ArrowDown strokeWidth={2.5} className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#111]" />
                         </motion.div>
                       </div>
                    </motion.div>
                </div>
              </div>
            </motion.div>
        </div>



      </div>

      {/* Floating Hamburger Button */}
      {typeof document !== 'undefined' && !showVideo && createPortal(
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] flex flex-col gap-3 pointer-events-none">
        <motion.button
          onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
          onMouseEnter={(e) => { e.stopPropagation(); setCursorVariant('hover'); }}
          onMouseLeave={(e) => { e.stopPropagation(); setCursorVariant('default'); }}
          className={`w-12 h-12 md:w-14 md:h-14 bg-nomad-green text-nomad-charcoal rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-none relative z-[100] pointer-events-auto`}
        >
          <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }}>
             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>
        
        <AnimatePresence>
          {isScrolled && (
             <motion.button
               initial={{ opacity: 0, scale: 0.8, y: -10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.8, y: -10 }}
               transition={{ duration: 0.2 }}
               onClick={(e) => { e.stopPropagation(); onJoinWaitlist(); }}
               onMouseEnter={(e) => { e.stopPropagation(); setCursorVariant('hover'); }}
               onMouseLeave={(e) => { e.stopPropagation(); setCursorVariant('default'); }}
               title="Join Waitlist"
               className="md:hidden w-12 h-12 bg-[#FFD700] text-[#111] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-none relative z-[99] pointer-events-auto"
             >
                <ArrowDown className="w-5 h-5 -rotate-45" strokeWidth={3} />
             </motion.button>
          )}
        </AnimatePresence>
      </div>
      , document.body)}

      {/* Fixed Sidebar Menu */}
      {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {isMenuOpen && (isScrolled || (typeof window !== 'undefined' && window.innerWidth < 1024)) && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[320px] bg-nomad-charcoal/95 backdrop-blur-xl border-l border-white/10 z-[50] flex flex-col pb-8 overflow-y-auto"
            data-lenis-prevent
          >
             <NavPanelContent 
               handleJoin={handleJoin} 
               setCursorVariant={setCursorVariant} 
               setShowVideo={setShowVideo} 
               activeSection={activeSection}
               isSoundEnabled={isSoundEnabled}
               toggleSound={toggleSound}
             />
          </motion.div>
        )}
      </AnimatePresence>
      , document.body)}
      
      {/* Video Modal */}
      {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
         {showVideo && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 lg:p-12 cursor-none"
             onClick={() => setShowVideo(false)}
             onMouseEnter={() => setCursorVariant('hover')}
             onMouseLeave={() => setCursorVariant('default')}
           >
              <div className="absolute top-6 right-6 md:top-8 md:right-8 text-white z-10 opacity-70 hover:opacity-100 transition-opacity">
                 <X className="w-10 h-10" />
              </div>
              <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.9, opacity: 0 }}
                 className="w-full max-w-[1400px] aspect-video bg-[#111] overflow-hidden relative rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                 onClick={(e) => e.stopPropagation()}
              >
                  <video 
                     ref={modalVideoRef}
                     src={assets.videos.demoVideo}
                     autoPlay 
                     loop
                     muted={!isSoundEnabled}
                     playsInline
                     className="w-full h-full object-cover"
                  />
              </motion.div>
           </motion.div>
         )}
      </AnimatePresence>
      , document.body)}

      {/* Tilted Marquee Strip */}
      <div className="relative z-20 bg-nomad-green overflow-hidden flex items-center py-4 border-y border-nomad-green shadow-[0_-10px_30px_rgba(34,197,94,0.2)]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex whitespace-nowrap items-center font-sans font-black text-xl uppercase tracking-widest text-[#111]"
        >
           {/* Duplicate content to ensure smooth seamless scrolling */}
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center">
               <span className="mx-6">THE NOMAD DIFFERENCE</span>
               <div className="w-3 h-3 bg-[#111] rotate-45" />
               <span className="mx-6">BEYOND THE NORM</span>
               <div className="w-3 h-3 bg-[#111] rotate-45" />
               <span className="mx-6">BREAK THE MOLD</span>
               <div className="w-3 h-3 bg-[#111] rotate-45" />
             </div>
           ))}
        </motion.div>
      </div>

    </section>
  );
}
