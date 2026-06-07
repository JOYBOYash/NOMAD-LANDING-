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
    <section className="py-24 md:py-32 bg-[#171717] text-white">
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 80 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
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
            <h2 className="text-[40px] md:text-[60px] lg:text-[70px] font-black font-display uppercase leading-[0.9] tracking-[-0.03em] text-white mb-6">
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

              if (isCenter) {
                xPos = "0%";
                scale = 1.05;
                opacity = 1;
                zIndex = 20;
              } else if (isLeft) {
                xPos = "-105%"; 
                scale = 0.9;
                opacity = 0.4;
                zIndex = 10;
              } else if (isRight) {
                xPos = "105%";
                scale = 0.9;
                opacity = 0.4;
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
              const cardBorder = isCenter ? 'border-transparent' : 'border-nomad-green/50';
              const iconColor = isCenter ? 'text-[#111]' : 'text-nomad-green';
              const titleColor = isCenter ? 'text-[#111]' : 'text-white';
              const descColor = isCenter ? 'text-[#111]/80' : 'text-[#a1a1aa]';
              const dividerColor = isCenter ? 'border-[#111]/10' : 'border-white/5';

              return (
                 <motion.div
                    key={idx}
                    animate={{
                      x: xPos,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ 
                      clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                      pointerEvents: isVisible ? 'auto' : 'none'
                    }}
                    className={`absolute w-[85%] sm:w-[60%] md:w-[32%] max-w-[380px] h-full min-h-[320px] p-8 md:p-10 flex flex-col items-start justify-start text-left border-l-[3px] transition-colors duration-500
                      ${cardBg} ${cardBorder} hover:border-nomad-green
                    `}
                 >
                    <div className="flex items-center gap-6 mb-8 w-full">
                       <div className={`shrink-0 transition-colors duration-500 ${iconColor}`}>
                         <Icon strokeWidth={1.5} className="w-12 h-12 md:w-14 md:h-14" />
                       </div>
                       <h3 className={`text-xl md:text-2xl font-black font-sans uppercase tracking-widest whitespace-pre-line leading-tight transition-colors duration-500 ${titleColor}`}>
                         {card.title}
                       </h3>
                    </div>
                    
                    <p className={`text-sm md:text-base font-medium leading-relaxed w-full border-t pt-6 mt-auto transition-colors duration-500 ${descColor} ${dividerColor}`}>
                      {card.desc}
                    </p>
                 </motion.div>
              )
           })}
        </div>
      </motion.div>
    </section>
  );
}
