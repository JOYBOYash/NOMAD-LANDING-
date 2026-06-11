import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Radio, Box, ArrowLeft, ArrowRight, Trophy, Map, Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const differenceCards = [
  {
    icon: Gamepad2,
    title: "Token\nRewards",
    desc: "Turn passive wandering into highly engaging quests and exclusive token rewards designed perfectly for your crowd."
  },
  {
    icon: Radio,
    title: "Proximity\nTriggers",
    desc: "Smart missions trigger based on actual attendee locations, directing traffic to where you need it most."
  },
  {
    icon: Box,
    title: "Platform\nAuthority",
    desc: "A powerful command center to spin up new engagement strategies, monitor heatmaps, and measure true sponsor ROI."
  },
  {
    icon: Trophy,
    title: "Live\nLeaderboards",
    desc: "Fuel friendly competition and keep attendees deeply engaged throughout the event with real-time scoring."
  },
  {
    icon: Map,
    title: "Dynamic\nRouting",
    desc: "Eliminate dead zones by intelligently routing traffic to under-visited booths and activated sponsor spaces."
  },
  {
    icon: Activity,
    title: "Sponsor\nAnalytics",
    desc: "Prove true ROI to your partners with deep, actionable insights on foot traffic, dwell time, and interaction rates."
  }
];

export default function Difference() {
  const { playHover, setCursorVariant } = useAppContext();
  const [centerIndex, setCenterIndex] = useState(0);

  const nextPage = () => setCenterIndex((prev) => (prev + 1) % differenceCards.length);
  const prevPage = () => setCenterIndex((prev) => (prev - 1 + differenceCards.length) % differenceCards.length);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 md:py-32 bg-nomad-charcoal text-white"
    >
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1400px] mx-auto px-6 w-full"
      >
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 lg:mb-16 gap-8">
          <motion.div
             variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
             className="max-w-2xl w-full"
          >
            <h2 className="text-[28px] max-w-full overflow-hidden text-ellipsis sm:text-[40px] md:text-[60px] lg:text-[70px] font-black font-display uppercase leading-[0.9] tracking-[-0.03em] text-white mb-6 break-words">
              THE NOMAD <br className="hidden md:block"/> DIFFERENCE.
            </h2>
            <p className="text-base md:text-[17px] text-[#9ca3af] font-medium leading-relaxed max-w-[420px]">
              Nomad fills the critical gap by combining gamification, rewards, and full organizer authority into a single ecosystem.
            </p>
          </motion.div>
          
          <motion.div 
             variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } }}
             className="flex flex-row items-center gap-4 shrink-0 mt-4 lg:mt-0"
          >
             <button 
               onClick={prevPage}
               onMouseEnter={() => {playHover(); setCursorVariant('hover');}}
               onMouseLeave={() => setCursorVariant('default')}
               className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-[#1c1c1c] flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-none pointer-events-auto"
             >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
             </button>
             <button 
               onClick={nextPage}
               onMouseEnter={() => {playHover(); setCursorVariant('hover');}}
               onMouseLeave={() => setCursorVariant('default')}
               className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-nomad-green flex items-center justify-center text-[#111] hover:scale-105 transition-transform cursor-none shadow-[0_0_20px_rgba(34,197,94,0.3)] pointer-events-auto"
             >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5px]" />
             </button>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="relative w-full h-[450px] md:h-[400px] flex items-center justify-center overflow-hidden lg:overflow-visible my-12">
           {differenceCards.map((card, idx) => {
              const Icon = card.icon;
              
              // Math for relative offset
              let offset = idx - centerIndex;
              if (offset < -2) offset += differenceCards.length;
              if (offset > 3) offset -= differenceCards.length;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isVisible = isCenter || isLeft || isRight;

              // positions
              let xPos = "0%";
              let scale = 0.9;
              let opacity = 0;
              let zIndex = 0;

              const sideOffset = "105%";
              const mobileSideOffset = "115%";

              if (isCenter) {
                xPos = "0%";
                scale = 1;
                opacity = 1;
                zIndex = 20;
              } else if (isLeft) {
                xPos = "-105%";
                scale = 0.85;
                opacity = 0.2;
                zIndex = 10;
              } else if (isRight) {
                xPos = "105%";
                scale = 0.85;
                opacity = 0.2;
                zIndex = 10;
              } else if (offset < -1) {
                xPos = "-200%";
                scale = 0.8;
                opacity = 0;
                zIndex = 0;
              } else {
                xPos = "200%";
                scale = 0.8;
                opacity = 0;
                zIndex = 0;
              }

              // Card Theme reversing for center
              const cardBg = isCenter ? 'bg-nomad-green' : 'bg-[#1c1c1c]';
              const cardBorder = isCenter ? 'border-none ring-1 ring-nomad-green/50 shadow-[0_0_40px_rgba(34,197,94,0.15)]' : 'border-nomad-green/30';
              const iconColor = isCenter ? 'text-[#111]' : 'text-nomad-green';
              const titleColor = isCenter ? 'text-[#111]' : 'text-white';
              const descColor = isCenter ? 'text-[#111]/80' : 'text-[#a1a1aa]';
              const dividerColor = isCenter ? 'border-[#111]/10' : 'border-white/5';

              return (
                 <motion.div
                    key={idx}
                    animate={{
                      x: xPos,
                      scale: isCenter ? 1.05 : scale, // Slight bump on center
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ 
                      clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                      pointerEvents: isVisible ? 'auto' : 'none'
                    }}
                    className={`absolute top-0 bottom-0 left-0 right-0 m-auto w-[85%] sm:w-[60%] md:w-[32%] max-w-[380px] h-[380px] p-6 md:p-8 flex flex-col items-start justify-start text-left border-l-[3px] transition-colors duration-500
                      ${cardBg} ${cardBorder} hover:border-nomad-green overflow-hidden group
                    `}
                 >
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />
                    {isCenter && (
                      <>
                        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-white/20 blur-3xl rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent to-[#111]/5 pointer-events-none" />
                        <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#111] opacity-20" />
                        <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-[#111] opacity-20" />
                      </>
                    )}
                    {!isCenter && (
                       <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-nomad-green/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 w-full relative z-10">
                       <div className={`shrink-0 transition-colors duration-500 ${iconColor} bg-white/5 p-4 rounded-2xl`}>
                         <Icon strokeWidth={1.5} className="w-10 h-10 md:w-12 md:h-12" />
                       </div>
                       <h3 className={`text-xl md:text-2xl font-black font-sans uppercase tracking-widest whitespace-pre-line leading-tight transition-colors duration-500 ${titleColor}`}>
                         {card.title}
                       </h3>
                    </div>
                    
                    <p className={`text-sm md:text-base font-medium leading-relaxed w-full border-t pt-6 mt-auto transition-colors duration-500 ${descColor} ${dividerColor} relative z-10`}>
                      {card.desc}
                    </p>
                 </motion.div>
              )
           })}
        </div>
      </motion.div>
    </motion.section>
  );
}
