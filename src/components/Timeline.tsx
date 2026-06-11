import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useCountdown } from './Countdown';

export default function Timeline() {
  const { days, hours, minutes, seconds } = useCountdown();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startDate = new Date('2026-06-15T00:00:00Z').getTime();
    const endDate = new Date('2026-09-15T00:00:00Z').getTime();

    const updateProgress = () => {
      const now = new Date().getTime();
      if (now < startDate) {
        setProgress(0);
      } else if (now > endDate) {
        setProgress(100);
      } else {
        const totalDuration = endDate - startDate;
        const timePassed = now - startDate;
        setProgress((timePassed / totalDuration) * 100);
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    {
      date: "June 15, 2026",
      targetDate: "2026-06-15T00:00:00Z",
      title: "Nomad Announcement",
      description: "Nomad is officially announced to the world.",
      status: "upcoming"
    },
    {
      date: "July 15, 2026",
      targetDate: "2026-07-15T00:00:00Z",
      title: "Alpha Testing Begins",
      description: "A select group of early adopters will get the first hands-on experience with the Nomad platform.",
      status: "upcoming"
    },
    {
      date: "August 15, 2026",
      targetDate: "2026-08-15T00:00:00Z",
      title: "Live Event Testing",
      description: "Your event can be the first event that can go down in Nomad history.",
      status: "upcoming"
    },
    {
      date: "September 15, 2026",
      targetDate: "2026-09-15T00:00:00Z",
      title: "Public Launch",
      description: "Nomad officially goes live. The future of live events arrives.",
      status: "launch"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-nomad-ivory relative border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#FFD700] mb-4">The Roadmap</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-white mb-6">
            Countdown to <span className="text-nomad-green">Launch</span>
          </h3>
        </div>

        <div className="relative mt-24 pb-12 w-full max-w-6xl mx-auto">
          {/* Main timeline track */}
          <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-white/10 z-0">
            {/* Progress fill */}
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-nomad-green z-0"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-6 justify-between relative z-10">
            {milestones.map((milestone, index) => {
              const milestoneDate = new Date(milestone.targetDate).getTime();
              const isPassed = new Date().getTime() >= milestoneDate;

              return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-row lg:flex-col items-start lg:items-center relative w-full lg:w-1/4"
              >
                <div className="hidden lg:block absolute top-0 w-full h-[60px] cursor-default">
                   <div className={`absolute left-1/2 top-[28px] w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-300 hover:scale-150 ${isPassed ? 'bg-nomad-green shadow-[0_0_15px_rgba(0,255,102,0.5)]' : 'bg-[#333] border-2 border-white/20'}`}></div>
                </div>

                <div className="lg:hidden w-[2px] bg-white/10 absolute top-0 bottom-0 left-[7px] z-0"></div>
                <div className={`lg:hidden absolute left-[7px] top-6 w-4 h-4 rounded-full -translate-x-1/2 z-10 ${isPassed ? 'bg-nomad-green shadow-[0_0_15px_rgba(0,255,102,0.5)]' : 'bg-[#333] border-2 border-white/20'}`}></div>

                <div className="pl-8 lg:pl-0 pt-0 lg:pt-16 lg:text-center flex flex-col items-start lg:items-center relative w-full">
                  <div className={`font-mono text-sm tracking-widest uppercase mb-2 ${isPassed ? 'text-nomad-green' : 'text-white/40'}`}>
                    {milestone.date}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-3">{milestone.title}</h4>
                  <p className="text-white/60 leading-relaxed text-sm max-w-sm lg:hidden xl:block">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
