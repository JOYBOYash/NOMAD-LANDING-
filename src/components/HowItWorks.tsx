import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Setup Event", desc: "Organizer creates event and missions effortlessly." },
    { num: "02", title: "Join & Map", desc: "Attendees join via QR and receive their personalized map." },
    { num: "03", title: "Play & Earn", desc: "Complete proximity missions, climb leaderboards, earn tokens." },
    { num: "04", title: "Victory Lap", desc: "Redeem rewards and create lasting memories." },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered, steps.length]);

  return (
    <section className="py-24 md:py-32 bg-nomad-charcoal text-white border-b border-white/10 overflow-hidden relative">
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 80 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col items-center"
      >
        
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="mb-16 flex flex-col items-center justify-center text-center w-full"
        >
          <div className="inline-block bg-white/5 text-white/70 text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6 border border-white/10 shadow-sm rounded-full">
             Fast Integration
          </div>
          <h2 className="text-[28px] md:text-[36px] lg:text-[48px] font-black font-display uppercase tracking-[-0.02em] text-white leading-[1.1] mb-4 mt-2">
            FROM SETUP TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">CELEBRATION</span>
          </h2>
          <div className="text-sm md:text-base font-bold text-white/50 mt-4 max-w-md">
             In Minutes. Out of the box. No coding required.
          </div>
        </motion.div>

        <div 
          className="w-full flex flex-col relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            return (
            <motion.div 
              key={i}
              variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              onHoverStart={() => setActiveStep(i)}
              className="flex flex-col w-full group relative"
            >
              {/* Main Step Row (Circle + Card aligned centered) */}
              <div className="flex w-full items-center">
                {/* Number Circle Column */}
                <div className="flex justify-center shrink-0 mr-4 md:mr-8 w-14 md:w-20">
                   {/* Number Circle */}
                   <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center border-[1.5px] font-black font-sans text-xl md:text-3xl transition-all duration-500 z-10 shrink-0 ${isActive ? 'border-nomad-green text-nomad-green bg-[#111] shadow-[0_0_25px_rgba(34,197,94,0.25)] scale-[1.15]' : 'border-white/10 text-white/30 bg-[#111] group-hover:border-white/30 group-hover:text-white/50'}`}>
                     {step.num}
                   </div>
                </div>

                {/* Card Container */}
                <div className="flex-1">
                  <motion.div
                    animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                    className={`w-full h-full text-white p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative cursor-pointer border transition-colors duration-500 bg-[#111] ${isActive ? 'border-nomad-green/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'border-white/5 group-hover:border-white/10'}`}
                  >
                    <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-nomad-green/5' : 'bg-nomad-green/0'}`} />
                    
                    <div className="flex-1 relative z-10">
                      <h3 className={`text-2xl md:text-3xl font-sans font-black uppercase tracking-widest transition-colors duration-500 mb-2 ${isActive ? 'text-nomad-green' : 'text-white'}`}>
                         {step.title}
                      </h3>
                      <div className={`flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-white/80' : 'text-white/50'}`}>
                         <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-500 ${isActive ? 'bg-nomad-green animate-pulse' : 'bg-white/30'}`} /> {step.desc}
                      </div>
                    </div>
                    
                    <div className={`relative z-10 shrink-0 mt-4 md:mt-0 transition-all duration-500 hidden md:block ${isActive ? 'text-nomad-green translate-x-1' : 'text-white/30 opacity-50 group-hover:translate-x-1 group-hover:text-white/60'}`}>
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Connecting Line Row */}
              {i !== steps.length - 1 && (
                <div className="flex w-full">
                  <div className="flex justify-center shrink-0 mr-4 md:mr-8 w-14 md:w-20">
                     <div className={`w-[2px] h-[30px] md:h-[40px] my-3 md:my-4 transition-all duration-500 rounded-full ${isActive ? 'bg-gradient-to-b from-nomad-green to-white/10 scale-y-100 opacity-100 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-white/10 opacity-30'} ${activeStep === i + 1 ? 'bg-gradient-to-t from-nomad-green to-white/10 shadow-[0_0_10px_rgba(34,197,94,0.5)] opacity-100' : ''}`} />
                  </div>
                  <div className="flex-1" />
                </div>
              )}
            </motion.div>
          )})}
        </div>
      </motion.div>
    </section>
  );
}
