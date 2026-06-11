import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Wallet, ShieldCheck, Trophy, Target, ClipboardList } from 'lucide-react';
import TiltCard from './TiltCard';
import { useAppContext } from '../context/AppContext';
import React, { useRef, useState, useEffect } from 'react';

export default function Features() {
  const { playHover, setCursorVariant } = useAppContext();
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isDesktop, setIsDesktop] = useState(false);
  const [activeTicket, setActiveTicket] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTicket((prev) => (prev + 1) % 6);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const features = [
    {
      icon: <MapPin strokeWidth={2} className="w-[28px] h-[28px]" />,
      title: "Proximity Missions",
      desc: "Unlock challenges near booths automatically."
    },
    {
      icon: <Wallet strokeWidth={2} className="w-[28px] h-[28px]" />,
      title: "Token Rewards",
      desc: "Earn and redeem for real sponsor goodies and merch."
    },
    {
      icon: <ShieldCheck strokeWidth={2} className="w-[28px] h-[28px]" />,
      title: "Organizer Command Center",
      desc: "Full control, moderation, analytics, and updates."
    },
    {
      icon: <Trophy strokeWidth={2} className="w-[28px] h-[28px]" />,
      title: "Live Leaderboards",
      desc: "Spark competition and drive venue-wide exploration."
    },
    {
      icon: <Target strokeWidth={2} className="w-[28px] h-[28px]" />,
      title: "Sponsor Boost",
      desc: "Targeted engagement with measurable ROI."
    },
    {
      icon: <ClipboardList strokeWidth={2} className="w-[28px] h-[28px]" />,
      title: "Seamless Management",
      desc: "Check-ins, notifications, and crowd intelligence."
    }
  ];

  return (
    <motion.section 
      ref={containerRef} 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 bg-nomad-charcoal text-nomad-ivory relative overflow-hidden"
    >
      {/* Background glow */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [150, -150]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nomad-green/5 rounded-full blur-[150px] pointer-events-none" 
      />

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex flex-col items-center"
      >
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="text-center mb-16 flex flex-col items-center"
        >
           <h2 className="text-[36px] sm:text-[44px] md:text-[60px] lg:text-[70px] leading-none font-black font-display uppercase tracking-[-0.03em] text-white">
             Why Nomad Wins
           </h2>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl w-full"
          onPointerEnter={(e) => { if (e.pointerType === 'mouse') setIsHovered(true); }}
          onPointerLeave={(e) => { if (e.pointerType === 'mouse') setIsHovered(false); }}
        >
          {features.map((feature, idx) => {
            const isActive = activeTicket === idx;
            return (
              <motion.div
                 key={idx}
                 variants={{ hidden: { opacity: 0, scale: 0.95, y: 50 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                 className="flex w-full h-full"
              >
                <TiltCard className="w-full h-full group">
                  {/* Outer Ticket Container */}
                  <div 
                    className={`relative flex w-full h-full bg-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-1 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:border-l-[3px] before:border-dotted before:border-[#1a1a1a]/80 before:z-10 after:absolute after:right-[58px] after:top-2 after:bottom-2 after:w-px after:border-r-[3px] after:border-dotted after:border-[#1a1a1a]/80 after:z-10 ${isActive ? '-translate-y-1' : ''}`}
                    onPointerEnter={(e) => {
                      if (e.pointerType === 'mouse') {
                        playHover();
                        setCursorVariant('hover');
                        setActiveTicket(idx);
                      }
                    }}
                    onPointerLeave={(e) => {
                       if (e.pointerType === 'mouse') setCursorVariant('default');
                    }}
                    onClick={() => {
                       // allow tap on mobile to set active ticket
                       setActiveTicket(idx);
                    }}
                  >
                     
                     {/* Left Cutout */}
                     <div className="absolute top-1/2 -left-4 w-8 h-8 bg-nomad-charcoal rounded-full -translate-y-1/2 z-20 transition-colors duration-500" />
                     
                     {/* Right Cutout */}
                     <div className="absolute top-1/2 -right-4 w-8 h-8 bg-nomad-charcoal rounded-full -translate-y-1/2 z-20 transition-colors duration-500" />

                     {/* Content Area */}
                   <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10 w-full overflow-hidden">
                      <div className="mb-10 relative z-20">
                          <h3 className={`text-[20px] md:text-[22px] font-bold font-sans mb-3 leading-tight tracking-tight transition-colors duration-500 ${isActive ? 'text-nomad-green' : 'text-white'}`}>
                            {feature.title}
                          </h3>
                          <p className={`font-medium leading-relaxed text-[14px] transition-colors duration-500 ${isActive ? 'text-white/80' : 'text-[#9ca3af]'}`}>
                            {feature.desc}
                          </p>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between w-full relative z-20">
                          <div className={`w-[30px] h-[30px] rounded-[10px] border-[1.5px] flex items-center justify-center font-bold text-xs pt-[1px] transition-colors duration-500 ${isActive ? 'border-nomad-green bg-nomad-green text-[#111] opacity-100' : 'border-[#404040] text-[#a1a1aa] opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green'}`}>
                             {idx + 1}
                          </div>
                      </div>

                      {/* Large Scaled Icon Background */}
                      <div className="absolute -bottom-8 -right-8 w-40 h-40 text-white/[0.03] transition-transform duration-700 pointer-events-none group-hover:scale-110 z-0">
                        {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-full h-full' })}
                      </div>
                   </div>

                   {/* Barcode Area */}
                   <div className="w-[60px] shrink-0 transition-colors flex items-center justify-end p-3 relative bg-[#262626] overflow-hidden">
                       {/* Scanner Line Animation */}
                       {isActive && (
                         <motion.div
                           initial={{ top: "-10%" }}
                           animate={{ top: "110%" }}
                           transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
                           className="absolute left-0 w-full h-[2px] bg-nomad-green shadow-[0_0_12px_rgba(34,197,94,1)] z-30"
                         />
                       )}
                       
                       {/* Rotated text */}
                       <span className={`text-[8px] font-mono tracking-widest absolute left-[8px] uppercase transition-colors duration-500 ${isActive ? 'text-nomad-green drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]' : 'text-[#888]'}`} style={{ writingMode: 'vertical-rl' }}>
                          D8D90DF2F
                       </span>
                       
                       {/* Barcode Lines */}
                       <div className="flex flex-col flex-1 h-[70%] gap-[2px] justify-center ml-4 opacity-[0.35]">
                           <div className="w-full h-[2px] bg-black"/>
                           <div className="w-full h-[4px] bg-black"/>
                           <div className="w-full h-[1px] bg-black"/>
                           <div className="w-full h-[3px] bg-black"/>
                           <div className="w-full h-[1px] bg-black"/>
                           <div className="w-full h-[5px] bg-black"/>
                           <div className="w-full h-[2px] bg-black"/>
                           <div className="w-full h-[1px] bg-black"/>
                           <div className="w-full h-[4px] bg-black"/>
                           <div className="w-full h-[2px] bg-black"/>
                           <div className="w-full h-[1px] bg-black"/>
                           <div className="w-full h-[3px] bg-black"/>
                           <div className="w-full h-[2px] bg-black"/>
                           <div className="w-full h-[1px] bg-black"/>
                           <div className="w-full h-[3px] bg-black"/>
                       </div>
                   </div>
                  </div>
                </TiltCard>
             </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
