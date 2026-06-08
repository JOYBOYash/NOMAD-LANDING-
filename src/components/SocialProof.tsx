import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Users, Target, Briefcase, Award, Megaphone, Globe } from 'lucide-react';
import WorldMap from './WorldMap';

export default function SocialProof() {
  return (
    <section className="py-24 md:py-32 bg-[#111] text-nomad-ivory overflow-x-clip relative border-b border-nomad-charcoal/10">
      
      {/* Cross out lines section container */}
      <div className="relative w-full flex flex-col items-center justify-center pt-16 mb-12 md:mb-16">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-center mb-16 md:mb-24 px-6"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[60px] lg:text-[70px] font-black font-display uppercase tracking-[-0.03em] leading-[0.9] text-white">
            Live your life <br className="hidden md:block" />
            <span className="text-nomad-green">like a Nomad!</span>
          </h2>
        </motion.div>

        {/* Dual Hashtag Marquee - Crossed Caution Tapes (Relative flow to push content down) */}
        <div className="relative w-full h-[18rem] md:h-[24rem] overflow-visible z-50 pointer-events-none flex items-center justify-center">
          
          {/* Tape 1 (Tilted Right) */}
        <div className="absolute w-[120vw] bg-[#FFD700] py-4 md:py-6 border-y-8 border-[#111] shadow-2xl origin-center" style={{ transform: 'rotate(8deg)' }}>
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex whitespace-nowrap min-w-max"
            >
              {Array(4).fill(0).map((_, i) => (
                <div key={'t1-'+i} className="flex items-center shrink-0 pr-12 gap-12">
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#TheNomad</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#TheNomadicStyle</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#BeMad</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#GoMadwithNomad</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#Nomadder</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#MadlyNomad</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#BadlyNomad</span>
                </div>
              ))}
            </motion.div>
        </div>

        {/* Tape 2 (Tilted Left) */}
        <div className="absolute w-[120vw] bg-[#FFD700] py-4 md:py-6 border-y-8 border-[#111] shadow-2xl origin-center" style={{ transform: 'rotate(-8deg)' }}>
            <motion.div 
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex whitespace-nowrap min-w-max -ml-24"
            >
              {Array(4).fill(0).map((_, i) => (
                <div key={'t2-'+i} className="flex items-center shrink-0 pr-12 gap-12">
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#TheNomad</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#TheNomadicStyle</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#BeMad</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#GoMadwithNomad</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#Nomadder</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#MadlyNomad</span>
                  <span className="text-[#111] font-black font-sans uppercase tracking-wider text-lg md:text-2xl">#BadlyNomad</span>
                </div>
              ))}
            </motion.div>
        </div>
      </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center mt-24 lg:mt-40">
        
        {/* Large Typographical Quote block */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-24 md:mb-32 relative inline-flex justify-center"
        >
           {/* Star/Burst decoration top right */}
           <div className="absolute -top-12 -right-16 text-nomad-green hidden md:block">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z"/></svg>
           </div>
           
           <div className="flex flex-col gap-2 md:gap-4 text-center w-full max-w-6xl mx-auto relative z-10 font-black font-display uppercase tracking-[-0.03em] leading-[1.1]">
              <span className="text-white/80 block text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px]">SHATTER THE STATUS QUO.</span>
              <span className="text-white block text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px]">MAKE YOUR NEXT <span className="text-nomad-green">EVENT LEGENDARY.</span></span>
           </div>
        </motion.div>

        {/* Ecosystem Features Grid */}
        <motion.div 
           variants={{
             hidden: { opacity: 0, y: 80 },
             show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } }
           }}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, amount: 0.1 }}
           className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full max-w-6xl mx-auto mb-24 relative z-10 px-4 md:px-0"
        >
           
           {/* Card 1: Social Connections */}
           <motion.div 
             variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
             className="lg:col-span-6 relative rounded-[2rem] bg-[#161616] p-8 md:p-12 flex flex-col items-center justify-center text-center overflow-hidden group border border-white/5 hover:border-nomad-green/30 transition-colors duration-500 min-h-[400px]"
           >
              {/* Top Left Icon Box */}
              <div className="absolute top-8 left-8 w-12 h-12 rounded-full border border-nomad-green/20 flex items-center justify-center text-nomad-green group-hover:scale-110 transition-transform duration-500 z-20">
                 <Users size={20} />
              </div>
              
              {/* Background Watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                 <Users size={280} />
              </div>

              <div className="relative z-10 max-w-sm mt-8">
                 <h3 className="text-[28px] md:text-[36px] font-black font-display uppercase tracking-tight text-white leading-[1.1] mb-6 group-hover:text-nomad-green transition-colors duration-500">
                   SQUAD UP. <br/> NEVER WANDER ALONE.
                 </h3>
                 <p className="text-white/60 font-medium text-[15px] leading-relaxed">
                   Sync with friends, forge new alliances, and coordinate meetups effortlessly. Follow attendees and map out your ultimate event experience as a united frontline.
                 </p>
              </div>
           </motion.div>

           {/* Card 2: Group Missions */}
           <motion.div 
             variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
             className="lg:col-span-6 relative rounded-[2rem] bg-[#161616] p-8 md:p-12 flex flex-col items-center justify-center text-center overflow-hidden group border border-white/5 hover:border-nomad-green/30 transition-colors duration-500 min-h-[400px]"
           >
              {/* Top Left Icon Box */}
              <div className="absolute top-8 left-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 z-20">
                 <Target size={20} />
              </div>

              {/* Background Watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                 <Target size={280} />
              </div>

              <div className="relative z-10 max-w-sm mt-8">
                 <h3 className="text-[28px] md:text-[36px] font-black font-display uppercase tracking-tight text-white leading-[1.1] mb-6 group-hover:text-nomad-green transition-colors">
                   CO-OP <br/> MISSIONS
                 </h3>
                 <p className="text-white/60 font-medium text-[15px] leading-relaxed">
                   Gather your crew. Tackle massive group-based geolocation challenges block-by-block and reap colossal token bounties together.
                 </p>
              </div>
           </motion.div>

           {/* Card 3: Professional Flex */}
           <motion.div 
             variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
             className="lg:col-span-4 relative rounded-[2rem] bg-[#161616] p-8 md:p-12 flex flex-col items-center justify-center text-center overflow-hidden group border border-white/5 hover:border-nomad-green/30 transition-colors duration-500 min-h-[350px]"
           >
              <div className="absolute top-8 left-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 z-20">
                 <Briefcase size={20} />
              </div>
              
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                 <Briefcase size={250} />
              </div>

              <div className="relative z-10 mt-8">
                 <h3 className="text-[22px] md:text-[26px] font-black font-display uppercase tracking-tight text-white leading-[1.15] mb-5 group-hover:text-nomad-green transition-colors">
                   THE PROFESSIONAL <br/> FLEX
                 </h3>
                 <p className="text-white/60 font-medium text-[14px] leading-relaxed">
                   Link your LinkedIn & GitHub. Turn physical handshakes into digital authority by publicly showcasing your elite event connections.
                 </p>
              </div>
           </motion.div>

           {/* Card 4: Creator Elite */}
           <motion.div 
             variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
             className="lg:col-span-4 relative rounded-[2rem] bg-[#161616] p-8 md:p-12 flex flex-col items-center justify-center text-center overflow-hidden group border border-white/5 hover:border-nomad-green/30 transition-colors duration-500 min-h-[350px]"
           >
              <div className="absolute top-8 left-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 z-20">
                 <Award size={20} />
              </div>

               <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none text-white">
                 <Megaphone size={250} />
              </div>

              <div className="relative z-10 mt-8">
                 <h3 className="text-[22px] md:text-[26px] font-black font-display uppercase tracking-tight text-white leading-[1.15] mb-5 group-hover:text-nomad-green transition-colors">
                   THE CREATOR <br/> ELITE
                 </h3>
                 <p className="text-white/60 font-medium text-[14px] leading-relaxed mt-auto">
                   Approved creators become event royalty. Generate hype, drive traffic, and get rewarded with hyper-exclusive loot and VIP access.
                 </p>
              </div>
           </motion.div>

           {/* Card 5: Thriving Ecosystem */}
           <motion.div 
             variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
             className="lg:col-span-4 relative rounded-[2rem] bg-[#161616] p-8 md:p-12 flex flex-col items-center justify-center text-center overflow-hidden group border border-white/5 hover:border-nomad-green/30 transition-colors duration-500 min-h-[350px]"
           >
              <div className="absolute top-8 left-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 z-20">
                 <Globe size={20} />
              </div>

              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                 <Globe size={250} />
              </div>

              <div className="relative z-10 mt-8">
                 <h3 className="text-[22px] md:text-[26px] font-black font-display uppercase tracking-tight text-white leading-[1.15] mb-5 group-hover:text-nomad-green transition-colors">
                   A THRIVING <br/> ECOSYSTEM
                 </h3>
                 <p className="text-white/60 font-medium text-[14px] leading-relaxed mt-auto">
                   We engineer an unstoppable flywheel where organizers, sponsors, creators, and every single participant wins together.
                 </p>
              </div>
           </motion.div>

        </motion.div>

      </div>

      {/* World Map Section */}
      <div className="w-full relative z-10 pt-12 md:pt-24 mt-12 md:mt-0 pb-20">
         <WorldMap />
      </div>
    </section>
  );
}
