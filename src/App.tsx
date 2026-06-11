import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Difference from './components/Difference';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Timeline from './components/Timeline';
import FooterCTA from './components/FooterCTA';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import { AppProvider, useAppContext } from './context/AppContext';
import CustomCursor from './components/CustomCursor';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut", delay: 0.3 } }}
    >
      {/* Top half sliding up */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/2 bg-nomad-charcoal flex items-end justify-center overflow-hidden z-20 border-b border-white/5"
        initial={{ y: 0 }}
        exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      >
        <motion.h1 
          className="text-white/5 font-display font-black text-[15vw] lg:text-[180px] tracking-tighter uppercase translate-y-1/2"
        >
          NOMAD
        </motion.h1>
      </motion.div>

      {/* Bottom half sliding down */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-nomad-charcoal flex items-start justify-center overflow-hidden z-20 border-t border-white/5"
        initial={{ y: 0 }}
        exit={{ y: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      >
        <motion.h1 
          className="text-white/5 font-display font-black text-[15vw] lg:text-[180px] tracking-tighter uppercase -translate-y-1/2"
        >
          NOMAD
        </motion.h1>
      </motion.div>

      {/* Progress Bar (Centered over everything) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[10vw] lg:translate-y-24 z-30 flex flex-col items-center pointer-events-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <div className="w-48 lg:w-64 h-[2px] bg-white/10 overflow-hidden rounded-full">
           <motion.div 
             className="h-full bg-nomad-green w-full"
             style={{ transform: `translateX(${progress - 100}%)` }}
           />
        </div>
        <div className="mt-4 text-nomad-green font-mono font-bold text-xs lg:text-sm tracking-widest">
           {Math.floor(progress)}%
        </div>
      </motion.div>
    </motion.div>
  );
}

function Home({ scrollToWaitlist }: { scrollToWaitlist: () => void }) {
  return (
    <main>
      <section id="home"><Hero onJoinWaitlist={scrollToWaitlist} /></section>
      <section id="problem"><Problem /></section>
      <section id="difference"><Difference /></section>
      <section id="features"><Features /></section>
      <section id="how-it-works"><HowItWorks /></section>
      <section id="wall-of-fame"><SocialProof /></section>
      <section id="faq"><FAQ /></section>
      <section id="timeline"><Timeline /></section>
      <section id="waitlist"><FooterCTA /></section>
    </main>
  );
}

function MainApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDismissedModal, setUserDismissedModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const { isSoundEnabled, toggleSound, setCursorVariant } = useAppContext();

  const scrollToWaitlist = () => {
    setIsModalOpen(false);
    const element = document.getElementById('join-waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Initialize Lenis exactly once
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    // @ts-ignore
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      // @ts-ignore
      delete window.lenis;
    };
  }, []);

  useEffect(() => {
    if (isLoading || isModalOpen) {
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
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Show modal every time they leave unless they explicitly dismissed it permanently
      if (e.clientY <= 0 && !userDismissedModal && !isModalOpen && !isLoading) {
        setIsModalOpen(true);
      }
    };

    if (!isLoading) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [userDismissedModal, isModalOpen, isLoading]);

  return (
    <div className="min-h-screen bg-nomad-charcoal text-nomad-ivory font-sans selection:bg-nomad-green selection:text-nomad-charcoal">
      <Helmet>
        <title>Nomad | The Future of Live Events</title>
        <meta name="description" content="Join the waitlist for Nomad, the most engaging platform for live events. Early access coming soon." />
        <meta property="og:title" content="Nomad | The Future of Live Events" />
        <meta property="og:description" content="Join the waitlist for Nomad, the most engaging platform for live events. Early access coming soon." />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Nomad | The Future of Live Events" />
        <meta property="twitter:description" content="Join the waitlist for Nomad, the most engaging platform for live events. Early access coming soon." />
      </Helmet>
      
      <CustomCursor />
      
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-nomad-green z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <Routes>
        <Route path="/" element={<Home scrollToWaitlist={scrollToWaitlist} />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>

      <Footer />
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onScrollToJoin={scrollToWaitlist} 
        onNeverMind={() => {
          setIsModalOpen(false);
          setUserDismissedModal(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <MainApp />
        </Router>
      </AppProvider>
    </HelmetProvider>
  );
}
