import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Difference from './components/Difference';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import FooterCTA from './components/FooterCTA';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import { AppProvider, useAppContext } from './context/AppContext';
import CustomCursor from './components/CustomCursor';

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
        
        <div className="absolute mb-6 w-64 h-[2px] bg-white/10 overflow-hidden mix-blend-difference rounded-full">
           <motion.div 
             className="h-full bg-nomad-green w-full"
             style={{ transform: `translateX(${progress - 100}%)` }}
           />
        </div>
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

        <div className="absolute mt-6 text-nomad-green font-mono font-bold text-sm tracking-widest mix-blend-difference">
           {Math.floor(progress)}%
        </div>
      </motion.div>
    </motion.div>
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
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Show modal every time they leave unless they explicitly dismissed it permanently
      if (e.clientY <= 0 && !userDismissedModal && !isModalOpen && !isLoading) {
        setIsModalOpen(true);
      }
    };

    if (!isLoading) {
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.body.style.overflow = 'auto';
      };
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [userDismissedModal, isModalOpen, isLoading]);

  return (
    <div className="min-h-screen bg-nomad-charcoal text-nomad-ivory font-sans selection:bg-nomad-green selection:text-nomad-charcoal">
      <CustomCursor />
      
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-nomad-green z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <main>
        <section id="home"><Hero onJoinWaitlist={scrollToWaitlist} /></section>
        <section id="problem"><Problem /></section>
        <section id="difference"><Difference /></section>
        <section id="features"><Features /></section>
        <section id="how-it-works"><HowItWorks /></section>
        <section id="wall-of-fame"><SocialProof /></section>
        <section id="faq"><FAQ /></section>
        <section id="waitlist"><FooterCTA /></section>
      </main>

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

      {/* Mobile Sticky CTA */}
      <div className="sm:hidden fixed bottom-6 left-6 right-6 z-40">
        <motion.button 
          onClick={scrollToWaitlist}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-full bg-nomad-green text-nomad-charcoal font-black uppercase tracking-widest text-lg shadow-2xl shadow-nomad-green/40"
        >
          Join Waitlist
        </motion.button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
