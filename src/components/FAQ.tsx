import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What makes Nomad different from other event apps?",
    answer: "Nomad is fundamentally built around gamification and tangible rewards. Instead of a glorified digital brochure, we provide a live ecosystem where attendees earn tokens for engaging with sponsors, exploring the venue, and completing proximity-based missions."
  },
  {
    question: "Do I need crypto knowledge to use the token system?",
    answer: "Absolutely not. While we use 'tokens' as a reward currency, the entire experience is seamlessly integrated into the app without requiring wallets, crypto, or blockchain knowledge. It's just pure, fun participation."
  },
  {
    question: "How do proximity missions work?",
    answer: "Organizers can set up geo-fenced zones or use QR-based check-ins. When an attendee enters a specific area—like a sponsor booth or a keynote stage—missions automatically trigger on their device, guiding their event journey."
  },
  {
    question: "Is this only for large-scale festivals?",
    answer: "Not at all! Nomad scales from intimate corporate retreats and private tech summits all the way up to massive music festivals. The gamification mechanics can be tailored to any crowd size."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setOpenIndex((current) => {
        if (current === null) return 0;
        return (current + 1) % faqs.length;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-24 md:py-32 bg-[#111] text-nomad-ivory overflow-hidden relative border-b border-white/5">
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 80 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl mx-auto px-6 relative z-10 w-full"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block bg-white/5 backdrop-blur-sm text-white/60 text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6 border border-white/10 rounded-full">
            Got Questions?
          </div>
          <h2 className="text-[32px] sm:text-[44px] md:text-[60px] lg:text-[72px] font-black font-display uppercase tracking-tighter text-white leading-[0.9]">
            FREQUENTLY <br/> <span className="text-nomad-green">ASKED</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div 
          className="flex flex-col border-t border-white/10 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
            <div 
              key={index}
              className="relative overflow-hidden transition-colors duration-500 border-b border-white/10 group bg-transparent hover:bg-white/[0.02]"
            >
              <button
                onClick={() => setOpenIndex(index)}
                className="w-full px-2 md:px-4 py-5 md:py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4 md:gap-8 pr-4">
                  <span className={`font-mono text-xs md:text-sm font-bold transition-colors ${isOpen ? 'text-nomad-green' : 'text-white/30 group-hover:text-white/50'}`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span className={`font-sans font-black uppercase tracking-wide text-base md:text-xl transition-all duration-300 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-nomad-green bg-nomad-green/10 text-nomad-green' : 'border-transparent text-white/30 group-hover:text-white'}`}>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 md:px-4 pb-6 pt-0 md:pl-[4.5rem] text-white/50 font-medium leading-relaxed text-sm md:text-base max-w-3xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Timer Line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent">
                {isOpen && !isHovered && (
                  <motion.div 
                    className="h-full bg-nomad-green"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    key={`timer-${index}`}
                  />
                )}
              </div>
            </div>
          )})}
        </div>
      </motion.div>
    </section>
  );
}
