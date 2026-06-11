import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, ArrowDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToJoin: () => void;
  onNeverMind: () => void;
}

export default function WaitlistModal({ isOpen, onClose, onScrollToJoin, onNeverMind }: WaitlistModalProps) {
  const { setCursorVariant } = useAppContext();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-nomad-charcoal/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4 sm:p-6"
          >
            <div className="relative bg-nomad-charcoal p-6 sm:p-10 border border-white/10 shadow-3xl text-nomad-ivory rounded-[2rem] text-center overflow-hidden">
              
              <div className="absolute top-0 left-0 w-full h-2 bg-nomad-green" />

              <motion.button
                 onClick={onClose}
                 whileHover={{ scale: 1.1, rotate: 90 }}
                 whileTap={{ scale: 0.9 }}
                 className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 flex items-center justify-center text-nomad-ivory/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div className="py-6">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-nomad-green/10">
                   <img src="https://www.dropbox.com/scl/fi/eez8in6tuf5mgf3b4scz1/Nomad.svg?rlkey=6x9d65a0tljcelq7n6gmiy9px&st=g0vfrzvp&raw=1" alt="Nomad Logo" className="h-8 w-8 filter brightness-0 invert" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(50%) saturate(579%) hue-rotate(63deg) brightness(98%) contrast(93%)' }} />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tighter mb-4 text-white leading-none">
                  WAIT, DON'T<br/> LEAVE YET.
                </h2>
                
                <p className="text-nomad-ivory/60 font-medium tracking-wide mb-10 max-w-sm mx-auto">
                  We're launching the most highly anticipated event platform of the year soon. Make sure you're on the list.
                </p>

                <motion.button
                  onClick={onScrollToJoin}
                  onMouseEnter={() => setCursorVariant('waitlist')}
                  onMouseLeave={() => setCursorVariant('default')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-5 rounded-xl bg-[#FFD700] text-nomad-charcoal font-black text-lg uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center justify-center gap-3 mb-4 cursor-none"
                >
                  JOIN WAITLIST <ArrowDown className="w-5 h-5" />
                </motion.button>

                <button 
                  onClick={onNeverMind}
                  className="text-xs font-bold uppercase tracking-widest text-nomad-ivory/40 hover:text-white transition-colors"
                >
                  Never mind, I don't want early access
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
