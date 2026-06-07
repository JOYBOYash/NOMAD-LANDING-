import { useState } from 'react';
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

  return (
    <section className="py-24 md:py-32 bg-[#111] text-nomad-ivory overflow-hidden relative border-b border-white/5">
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 80 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl mx-auto px-6 relative z-10 w-full"
      >
        
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-sm text-white/60 text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6 border border-white/10 rounded-full">
             Got Questions?
          </div>
          <h2 className="text-[40px] md:text-[60px] lg:text-[80px] font-black font-display uppercase tracking-tighter text-white leading-[0.9] mb-4">
            FREQUENTLY <br/> <span className="text-nomad-green">ASKED</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="border border-white/10 rounded-2xl bg-[#1a1a1a] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-sans font-black uppercase tracking-widest text-lg md:text-xl text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-nomad-green text-nomad-charcoal' : 'bg-white/5 text-white'}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-nomad-ivory/60 font-medium leading-relaxed max-w-2xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
      </motion.div>
    </section>
  );
}
