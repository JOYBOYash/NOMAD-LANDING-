import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      quote: "Nomad increased booth visits by 52% at our tech fest. Students loved the missions and rewards!",
      name: "Event Head",
      role: "SRM Chennai"
    },
    {
      quote: "Finally, real control and data. Best event tech I've used in India.",
      name: "Festival Organizer",
      role: "Bangalore"
    },
    {
      quote: "The engagement metrics were off the charts. Literally revolutionized how we organize events.",
      name: "Community Manager",
      role: "Mumbai Tech Week"
    },
    {
      quote: "Sponsors loved the direct engagement. Nomad is a must-have for any large scale college fest.",
      name: "Sponsorship Head",
      role: "IIT Delhi"
    },
    {
      quote: "Ticket sales went up by 30% through the gamified referral system. Incredible platform.",
      name: "Marketing Lead",
      role: "NH7 Weekender"
    },
    {
      quote: "The live leaderboard kept attendees engaged from start to finish.",
      name: "Student Coordinator",
      role: "BITS Pilani"
    },
    {
      quote: "Easiest check-in process we've ever experienced. No queues, no hassle.",
      name: "Operations Head",
      role: "Sunburn Goa"
    },
    {
      quote: "Insights helped us plan our next event much better. Highly recommended.",
      name: "Event Director",
      role: "Comic Con India"
    },
    {
      quote: "Vendor management was a breeze. Everything integrated seamlessly.",
      name: "Logistics Manager",
      role: "Zomaland"
    }
  ];

  const [holes, setHoles] = useState<{ x: number, y: number, id: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const nextTestimonials = () => {
    if (scrollRef.current) {
      // scroll by approximate width of 3 tickets on desktop, or 1 on mobile
      const scrollAmount = window.innerWidth < 1024 ? window.innerWidth * 0.85 : 420 * 3 + 64; 
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const prevTestimonials = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 1024 ? window.innerWidth * 0.85 : 420 * 3 + 64;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleTicketClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoles([...holes, { x, y, id: Math.random().toString() }]);
  };

  return (
    <section className="py-24 md:py-32 bg-[#111] text-nomad-ivory overflow-x-clip relative border-b border-nomad-charcoal/10">
      
      {/* Dual Hashtag Marquee - Crossed Caution Tapes (Relative flow to push content down) */}
      <div className="relative w-full h-[24rem] md:h-[32rem] overflow-visible z-50 pointer-events-none flex items-center justify-center mb-12 md:mb-16">
        
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
           
           <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-black font-display uppercase tracking-[-0.03em] text-white leading-[1.2] w-full max-w-7xl mx-auto text-center relative z-10">
              A BORING EVENT <span className="inline-flex items-center justify-center -mb-2 md:-mb-3 mx-2"><img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop" className="w-10 h-10 md:w-12 md:h-12 rounded-full grayscale border-2 border-white object-cover" alt="Event" /></span> IS A FORGOTTEN EVENT.
              THIS AREA OF <span className="text-nomad-green">ENGAGEMENT</span> DIVIDES AN <span className="inline-flex items-center justify-center -mb-2 md:-mb-3 mx-2"><img src="https://images.unsplash.com/photo-1511516172551-787db8c0be64?w=100&h=100&fit=crop" className="w-10 h-10 md:w-12 md:h-12 rounded-full grayscale border-2 border-white object-cover" alt="Event" /></span> EPIC EXPERIENCE FROM
              JUST ANOTHER <span className="inline-flex items-center justify-center -mb-2 md:-mb-3 mx-2"><div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-nomad-green flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div></span> WEEKEND.
           </h2>
        </motion.div>

        {/* Masonry Image Grid */}
        <motion.div 
           variants={{
             hidden: { opacity: 0, y: 80 },
             show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } }
           }}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, amount: 0.1 }}
           className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 w-full max-w-6xl mx-auto auto-rows-[250px] md:auto-rows-[300px] mb-24"
        >
           
           {/* Image 1 - Top Left Large */}
           <motion.div 
             variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
             className="md:col-span-5 md:row-span-2 relative rounded-[2rem] overflow-hidden group"
           >
              <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&auto=format&fit=crop" alt="Live Event" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-left">
                 <h4 className="text-2xl font-sans font-black uppercase text-white mb-1">Epic Moments</h4>
                 <p className="text-xs font-bold font-sans uppercase tracking-widest text-[#a1a1aa]">Main Stage</p>
              </div>
           </motion.div>

           {/* Image 2 - Top Right Half */}
           <motion.div 
             variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
             className="md:col-span-7 md:row-span-1 relative rounded-[2rem] overflow-hidden group"
           >
              <img src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000&auto=format&fit=crop" alt="Festival Crowd" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-left">
                 <h4 className="text-2xl font-sans font-black uppercase text-white mb-1">Massive crowds</h4>
                 <p className="text-xs font-bold font-sans uppercase tracking-widest text-[#a1a1aa]">Fully verified</p>
              </div>
           </motion.div>

           {/* Image 3 - Bottom Middle (Small Square) */}
           <motion.div 
             variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
             className="md:col-span-3 md:row-span-1 relative rounded-[2rem] overflow-hidden group border-2 border-nomad-green"
           >
              <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop" alt="Concert Vibes" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 text-left z-10 w-[calc(100%-48px)]">
                 <h4 className="text-xl font-sans font-black uppercase text-nomad-green mb-1 leading-tight">VIP <br/>Experiences</h4>
                 <p className="text-xs font-bold font-sans uppercase tracking-widest text-white/70 mt-2">Token Unlockable</p>
              </div>
           </motion.div>

           {/* Image 4 - Bottom Right Large */}
           <motion.div 
             variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
             className="md:col-span-4 md:row-span-1 relative rounded-[2rem] overflow-hidden group"
           >
              <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop" alt="DJ Set" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-left">
                 <h4 className="text-2xl font-sans font-black uppercase text-white mb-1">Live Authority</h4>
                 <p className="text-xs font-bold font-sans uppercase tracking-widest text-[#a1a1aa]">Organizer Dashboard</p>
              </div>
           </motion.div>

        </motion.div>

      </div>

      {/* Testimonials outside max-w-7xl to bleed correctly */}
      <div className="w-[100vw] max-w-[100vw] mt-24 relative z-10 left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
         <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between w-full mb-12 gap-6 text-center md:text-left">
           <h3 className="text-2xl md:text-4xl font-display font-black uppercase tracking-widest text-[#fff]">The Word Around</h3>
           <div className="flex gap-4">
             <button onClick={prevTestimonials} className="p-3 bg-white/10 rounded-full hover:bg-nomad-green hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-nomad-green/50 hover:scale-110 active:scale-95 cursor-none">
               <ChevronLeft className="w-6 h-6" />
             </button>
             <button onClick={nextTestimonials} className="p-3 bg-white/10 rounded-full hover:bg-nomad-green hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-nomad-green/50 hover:scale-110 active:scale-95 cursor-none">
               <ChevronRight className="w-6 h-6" />
             </button>
           </div>
         </div>
         
         <div className="relative w-full overflow-hidden py-4">
           <div 
             ref={scrollRef}
             className="flex gap-6 lg:gap-8 items-stretch overflow-x-auto snap-x snap-mandatory pb-12 px-[max(1rem,calc(50vw-40rem+1rem))] md:px-[max(1.5rem,calc(50vw-40rem+1.5rem))] w-full"
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
           >
               
               {/* Inline style specifically for webkit scrollbar hiding just for this container */}
               <style dangerouslySetInnerHTML={{__html: `
                 div::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
               `}} />
               
               {testimonials.map((t, i) => (
                 <motion.div
                   key={i}
                   onClick={handleTicketClick}
                   whileHover={{ y: -8, scale: 1.02 }}
                   whileTap={{ scale: 0.95 }}
                   transition={{ type: "spring", stiffness: 400, damping: 25 }}
                   className="snap-start relative bg-[#18181B] text-white p-8 md:p-10 w-[85vw] md:w-[40vw] lg:w-[420px] shrink-0 rounded-2xl cursor-crosshair shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-[#27272A] flex flex-col justify-between select-none min-h-[300px]"
                   style={{
                     backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
                   }}
                 >
                   {/* Ticket cutouts */}
                   <div className="absolute top-1/2 -left-6 w-12 h-12 rounded-full bg-[#111] -translate-y-1/2 shadow-inner border-r border-[#27272A] pointer-events-none"></div>
                   <div className="absolute top-1/2 -right-6 w-12 h-12 rounded-full bg-[#111] -translate-y-1/2 shadow-inner border-l border-[#27272A] pointer-events-none"></div>
                   
                   {/* Inner ticket border */}
                   <div className="absolute inset-4 border border-dashed border-[#ffffff]/10 rounded-xl pointer-events-none" />

                   {/* Punch holes */}
                   {holes.map((hole) => (
                      <motion.div 
                        key={hole.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute w-4 h-4 rounded-full bg-[#111] shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                        style={{ left: hole.x, top: hole.y }}
                      />
                   ))}

                   <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
                     <p className="text-[17px] md:text-[19px] font-sans font-bold text-white mb-8 leading-relaxed">
                       "{t.quote}"
                     </p>
                     <div className="flex items-center gap-4 mt-auto">
                       <div className="flex-1 border-t border-[#ffffff]/10 my-auto"></div>
                       <div className="text-right">
                         <h5 className="font-black font-sans tracking-widest uppercase text-sm text-nomad-green mb-1">{t.name}</h5>
                         <p className="text-white/40 text-xs font-sans font-bold tracking-wider">{t.role}</p>
                       </div>
                     </div>
                   </div>
                 </motion.div>
               ))}
               
           </div>
         </div>
      </div>
    </section>
  );
}
