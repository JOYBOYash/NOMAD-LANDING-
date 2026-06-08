import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Problem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % painPoints.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  const painPoints = [
    {
      title: "Scattered Apps",
      desc: "Attendees juggle multiple apps just to find what's happening. Broken navigation means endless confusion."
    },
    {
      title: "Low Traffic",
      desc: "Organizers fight low booth traffic and poor crowd control with passive attendees."
    },
    {
      title: "Wasted Budgets",
      desc: "Sponsors wasting budgets with zero measurable ROI as booths get ignored."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-nomad-charcoal text-nomad-ivory overflow-hidden relative border-b border-white/5">
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 80 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-6 relative z-10 w-full"
      >
        
        {/* Header Section mimicking the reference */}
        <div className="mb-16 md:mb-24 flex flex-col items-start max-w-5xl">
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <div className="text-sm font-bold uppercase tracking-widest text-[#FFD700] mb-4">The Real Problem</div>
            <h2 className="text-[32px] sm:text-[44px] md:text-[60px] lg:text-[80px] font-display font-black uppercase tracking-tighter leading-[0.9] text-white mb-6">
              EVENTS TODAY ARE <span className="text-nomad-green">STUCK</span> <br className="hidden md:block"/>
              IN THE PAST
            </h2>
            <p className="font-bold text-white/50 text-base md:text-lg leading-relaxed max-w-3xl">
              Attendees juggle multiple apps. Organizers fight low engagement and poor crowd control. Sponsors get ignored.
            </p>
          </motion.div>
        </div>

        {/* Content Section mimicking the reference lower half */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Large Image */}
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
            className="w-full aspect-square md:aspect-[4/3] lg:aspect-square relative rounded-[2rem] overflow-hidden"
          >
             <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop" alt="Boring Event" className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity opacity-80 hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-700" />
          </motion.div>

          {/* Right Column: Stack of Items */}
          <div className="flex flex-col w-full border-t border-white/10">
             {painPoints.map((item, i) => {
                 const isActive = activeIndex === i;
                 return (
                   <motion.div 
                     key={i} 
                     variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
                     onMouseEnter={() => { setActiveIndex(i); setIsHovered(true); }}
                     onMouseLeave={() => setIsHovered(false)}
                     className="py-6 md:py-8 border-b border-white/10 flex flex-col group cursor-default transition-all duration-300 relative"
                   >
                      <div className="flex items-center justify-between pointer-events-none">
                         <h3 className={`text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>
                            <span className={isActive ? 'text-nomad-green' : ''}>{item.title.split(' ')[0]}</span> {item.title.split(' ').slice(1).join(' ')}
                         </h3>
                         <motion.div 
                           animate={{ 
                             rotate: isActive ? 90 : 0,
                             scale: isActive ? 1.2 : 1,
                             color: isActive ? '#22c55e' : 'rgba(255,255,255,0.4)' 
                           }}
                           transition={{ duration: 0.4, ease: "easeOut" }}
                           className="text-4xl font-black origin-center select-none"
                         >
                            *
                         </motion.div>
                      </div>
                      
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-white/60 font-bold leading-relaxed max-w-lg text-sm md:text-base pr-8 pt-4 pb-2 pointer-events-none">
                               {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Progress Bar Line */}
                      {isActive && !isHovered && (
                        <motion.div
                          className="absolute bottom-[-1px] left-0 h-[2px] bg-nomad-green z-10"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 4, ease: "linear" }}
                        />
                      )}
                      {isActive && isHovered && (
                        <motion.div
                          className="absolute bottom-[-1px] left-0 h-[2px] bg-nomad-green z-10"
                          initial={{ width: "100%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0 }}
                        />
                      )}
                   </motion.div>
                 );
             })}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
