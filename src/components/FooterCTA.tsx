import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { FormEvent, useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, onSnapshot, runTransaction } from 'firebase/firestore';

export default function FooterCTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Organizer');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { setCursorVariant } = useAppContext();

  const [peopleJoined, setPeopleJoined] = useState(0);

  useEffect(() => {
    if (!db) return;
    
    // Subscribe to a stats document where we keep track of the total count in realtime
    const unsub = onSnapshot(doc(db, 'stats', 'waitlist'), (docSnap) => {
      if (docSnap.exists()) {
        setPeopleJoined(docSnap.data().count || 0);
      }
    }, (error) => {
      console.warn("Could not load real-time counter. Make sure Firestore rules allow read access to stats/waitlist.");
    });
    
    return () => unsub();
  }, []);

  const benefits = [
    "Early access before public launch",
    "Free Premium Organizer plan for your first event",
    "Influence the product roadmap",
    "Exclusive founder updates"
  ];

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleJoin = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMessage('');

    if (!name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    try {
      if (!db) {
        throw new Error("Firebase is not connected. Please add your config in .env");
      }

      // Add user to waitlist
      await addDoc(collection(db, 'waitlist'), {
        name,
        email,
        role,
        createdAt: serverTimestamp(),
      });

      // Increment global counter securely via transaction
      const statRef = doc(db, 'stats', 'waitlist');
      await runTransaction(db, async (transaction) => {
        const statDoc = await transaction.get(statRef);
        if (!statDoc.exists()) {
          transaction.set(statRef, { count: 1 });
        } else {
          transaction.update(statRef, { count: (statDoc.data().count || 0) + 1 });
        }
      });

      setStatus('success');
    } catch (error: any) {
      console.error("Waitlist error:", error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to secure your spot. Try again.');
    }
  };

  return (
    <section id="join-waitlist" className="relative pb-40 pt-32 overflow-hidden bg-nomad-charcoal border-t border-nomad-ivory/10">
      
      {/* Background Graphic - Strong Current Green Gradient over Charcoal Black */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-nomad-green/20 to-nomad-charcoal/10" />
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-nomad-green/20 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 80 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } }
        }}
         initial="hidden"
         whileInView="show"
         viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
          <h2 className="text-[32px] md:text-[50px] lg:text-[64px] leading-[1.1] font-black font-display uppercase tracking-tighter text-nomad-ivory mb-6 w-full max-w-6xl mx-auto">
            DON'T MISS THE FUTURE OF <span className="text-nomad-green drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">LIVE EVENTS.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-nomad-ivory/80 mb-12 leading-relaxed font-medium">
            Join the waitlist today and be among the first to experience — and shape — the most engaging event platform in India.
          </p>
        </motion.div>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-2xl backdrop-blur-md"
          >
            
            <ul className="grid sm:grid-cols-2 gap-6 text-left mb-12 uppercase tracking-widest text-xs md:text-sm text-nomad-ivory/80 font-bold">
              {benefits.map((benefit, i) => (
                <motion.li 
                  key={i} 
                  variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                  className="flex items-center gap-4 border border-white/5 p-4 rounded-xl bg-black/20"
                >
                  <div className="w-2 h-2 bg-nomad-green rounded-full flex-shrink-0 shadow-[0_0_10px_#22C55E]" />
                  <span className="leading-tight">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col items-center border-t border-white/10 pt-10">
               {status === 'success' ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center p-8 bg-nomad-green/10 border border-nomad-green/30 rounded-2xl w-full"
                 >
                   <h3 className="text-2xl font-black text-nomad-green uppercase tracking-widest mb-2">You're on the list!</h3>
                   <p className="text-nomad-ivory/80 font-medium">Keep an eye on your inbox for updates.</p>
                 </motion.div>
               ) : (
                 <form onSubmit={handleJoin} className="w-full flex justify-center text-left max-w-2xl mt-4">
                   <div className="flex flex-col gap-4 w-full">
                     <AnimatePresence>
                       {status === 'error' && (
                         <motion.div
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 p-4 rounded-xl text-sm font-bold shadow-inner"
                         >
                           <AlertCircle className="w-5 h-5 flex-shrink-0" />
                           <p>{errorMessage}</p>
                         </motion.div>
                       )}
                     </AnimatePresence>
                     <div className="flex flex-col sm:flex-row gap-4">
                       <input 
                         type="text" 
                         required
                         value={name}
                         onChange={e => {
                           setName(e.target.value);
                           if (status === 'error') setStatus('idle');
                         }}
                         placeholder="Your Name"
                         className="flex-1 bg-white/10 px-4 py-4 rounded-xl text-nomad-ivory placeholder-nomad-ivory/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-nomad-green focus:border-transparent font-medium"
                       />
                       <input 
                         type="email" 
                         required
                         value={email}
                         onChange={e => {
                           setEmail(e.target.value);
                           if (status === 'error') setStatus('idle');
                         }}
                         placeholder="Your Email"
                         className="flex-1 bg-white/10 px-4 py-4 rounded-xl text-nomad-ivory placeholder-nomad-ivory/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-nomad-green focus:border-transparent font-medium"
                       />
                     </div>
                     
                     <div className="relative">
                       <select 
                         value={role}
                         onChange={e => setRole(e.target.value)}
                         className="w-full bg-white/10 px-4 py-4 rounded-xl text-nomad-ivory font-bold border border-white/20 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-nomad-green focus:border-transparent appearance-none text-sm cursor-pointer"
                       >
                         <option className="bg-nomad-charcoal">Organizer</option>
                         <option className="bg-nomad-charcoal">Attendee</option>
                         <option className="bg-nomad-charcoal">Sponsor</option>
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-nomad-ivory/50" />
                     </div>

                     <motion.button 
                       type="submit"
                       disabled={status === 'loading'}
                       onMouseEnter={() => setCursorVariant('waitlist')}
                       onMouseLeave={() => setCursorVariant('default')}
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       className="w-full mt-4 py-5 rounded-xl bg-[#FFD700] text-nomad-charcoal font-black text-lg uppercase tracking-widest transition-colors flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] disabled:opacity-70 cursor-none"
                     >
                       {status === 'loading' ? (
                         <>
                           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                             <AlertCircle className="w-5 h-5 opacity-0" /> {/* placeholder to keep height consistent */}
                             <div className="absolute inset-0 flex items-center justify-center border-2 border-nomad-charcoal border-t-transparent rounded-full" style={{ width: 20, height: 20 }} />
                           </motion.div>
                           <span>Securing Spot...</span>
                         </>
                       ) : 'Secure My Spot on the Waitlist'}
                     </motion.button>
                   </div>
                 </form>
               )}
               
               <div className="mt-8 flex items-center gap-3 bg-nomad-green/10 border border-nomad-green/20 px-5 py-3 rounded-full">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nomad-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-nomad-green"></span>
                  </span>
                  <p className="text-sm uppercase tracking-widest text-nomad-green font-bold">
                    <motion.span 
                      key={peopleJoined}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block min-w-[2ch] bg-nomad-green text-nomad-charcoal px-1.5 rounded-sm mx-1"
                    >
                      {peopleJoined}
                    </motion.span>
                    people have joined the waitlist
                  </p>
               </div>
            </div>
            
          </motion.div>
      </motion.div>
    </section>
  );
}
