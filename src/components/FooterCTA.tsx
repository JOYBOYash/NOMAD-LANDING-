import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { FormEvent, useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, onSnapshot, runTransaction } from 'firebase/firestore';
import ReCAPTCHA from 'react-google-recaptcha';

export default function FooterCTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Organizer');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
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

    if (import.meta.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaValue) {
      setStatus('error');
      setErrorMessage('Please verify that you are a human via ReCAPTCHA.');
      return;
    }

    setStatus('loading');
    
    try {
      if (!db) {
        throw new Error("Firebase is not connected. Please add your config in .env");
      }

      let emailSentStatus = false;

      // Send confirmation email via EmailJS (Free Tier)
      try {
        const emailJsServiceId = import.meta.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const emailJsTemplateId = import.meta.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const emailJsPublicKey = import.meta.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
          const { send } = await import('@emailjs/browser');
          await send(
            emailJsServiceId,
            emailJsTemplateId,
            {
              to_name: name,
              to_email: email,
              user_role: role,
              reply_to: "support@nomad.com", // Replace with your support email
            },
            emailJsPublicKey
          );
          emailSentStatus = true;
        } else {
          console.warn("EmailJS credentials are not fully configured in .env");
        }
      } catch (emailError) {
        console.error("Failed to send welcome email (Quota likely exceeded):", emailError);
        // We still consider the waitlist signup a success even if email fails
        // The boolean handles the manual "batch" process requirement later
      }

      // Add user to waitlist
      const waitlistDocRef = await addDoc(collection(db, 'waitlist'), {
        name,
        email,
        role,
        emailSent: emailSentStatus,
        createdAt: serverTimestamp(),
      });

      // If email failed to send (e.g. quota limit), store in a separate collection for manual batching
      if (!emailSentStatus) {
        await addDoc(collection(db, 'waitlist_pending_emails'), {
          waitlistId: waitlistDocRef.id,
          name,
          email,
          role,
          createdAt: serverTimestamp(),
        });
      }

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
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side: Copy & Benefits */}
          <motion.div variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } }} className="flex flex-col justify-between h-full">
            <div>
              <h2 className="text-[40px] md:text-[60px] lg:text-[80px] leading-[0.85] font-black font-display uppercase tracking-[-0.03em] text-white mb-8">
                DON'T MISS <br /> THE FUTURE OF <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-nomad-green to-emerald-300 drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">LIVE EVENTS.</span>
              </h2>
              <p className="max-w-md text-lg text-white/50 mb-12 font-medium leading-relaxed">
                Join the waitlist today and be among the first to experience the most engaging event platform. Shape the future with us.
              </p>

              <ul className="space-y-5 text-left uppercase tracking-widest text-sm text-white/80 font-bold mb-12">
                {benefits.map((benefit, i) => (
                  <motion.li 
                    key={i} 
                    variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full border border-nomad-green/30 bg-nomad-green/10 flex items-center justify-center flex-shrink-0 mt-[-2px] group-hover:bg-nomad-green group-hover:border-nomad-green transition-colors">
                      <div className="w-1.5 h-1.5 bg-nomad-green rounded-full group-hover:bg-[#111] transition-colors" />
                    </div>
                    <span className="text-white/60 group-hover:text-white transition-colors">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="inline-flex items-center self-start gap-3 bg-[#111] border border-white/10 px-6 py-4 rounded-full mt-auto">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nomad-green opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-nomad-green"></span>
               </span>
               <p className="text-xs uppercase tracking-widest text-white/60 font-bold">
                 <motion.span 
                   key={peopleJoined}
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="inline-block text-white pr-1.5 font-mono"
                 >
                   {peopleJoined}
                 </motion.span>
                 Waitlisted
               </p>
            </div>
          </motion.div>
          
          {/* Right Side: Form */}
          <motion.div 
            variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
            className="bg-transparent border border-white/10 rounded-none p-8 md:p-12 relative group backdrop-blur-sm"
          >
            {/* Subtle glow effect behind form */}
            <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Neon Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-nomad-green/0 via-nomad-green to-nomad-green/0 opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-nomad-green shadow-[0_0_20px_rgba(34,197,94,1)] animate-pulse" />

            <div className="relative z-10">
              <h3 className="text-2xl font-black font-display uppercase tracking-widest text-white mb-10 flex flex-col gap-1">
                <span>Reserve Your</span>
                <span className="text-nomad-green">Priority Access</span>
              </h3>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-10 bg-transparent border border-nomad-green/30 w-full"
                >
                  <CheckCircle className="w-16 h-16 text-nomad-green mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                  <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-3">Priority Secured</h3>
                  <p className="text-white/60 font-medium font-mono text-sm uppercase">Confirmation email sent. We'll reach out as release approaches.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleJoin} className="w-full flex flex-col gap-8">
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 text-xs uppercase tracking-widest font-bold"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p>{errorMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex flex-col gap-8 group/form">
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={e => {
                          setName(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        id="nomad-name"
                        className="peer w-full bg-transparent px-0 py-2 text-white placeholder-transparent border-b border-white/20 focus:outline-none focus:border-nomad-green transition-colors font-medium text-lg rounded-none"
                        placeholder="John Doe"
                      />
                      <label htmlFor="nomad-name" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-widest font-bold text-white/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:font-medium peer-placeholder-shown:text-white/30 peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-nomad-green peer-focus:uppercase peer-focus:font-bold pointer-events-none">
                        Full Name
                      </label>
                    </div>
                    
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        id="nomad-email"
                        className="peer w-full bg-transparent px-0 py-2 text-white placeholder-transparent border-b border-white/20 focus:outline-none focus:border-nomad-green transition-colors font-medium text-lg rounded-none"
                        placeholder="hello@example.com"
                      />
                      <label htmlFor="nomad-email" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-widest font-bold text-white/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:font-medium peer-placeholder-shown:text-white/30 peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-nomad-green peer-focus:uppercase peer-focus:font-bold pointer-events-none">
                        Email Address
                      </label>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">Primary Role</label>
                      <div 
                        className="relative outline-none"
                        tabIndex={0}
                        onBlur={(e) => {
                           if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                             setIsDropdownOpen(false);
                           }
                        }}
                      >
                        <div 
                          className="w-full bg-transparent px-0 py-2 text-white font-medium text-lg border-b border-white/20 hover:border-white/40 focus:border-nomad-green transition-colors cursor-none flex items-center justify-between"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                        >
                          <span>{role}</span>
                          <ChevronDown className={`w-5 h-5 text-white/30 transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-nomad-green' : ''}`} />
                        </div>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.ul
                              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                              animate={{ opacity: 1, y: 0, scaleY: 1 }}
                              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute top-full left-0 w-full mt-2 bg-[#0a0a0a] border border-nomad-green/30 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.15)] overflow-hidden z-50 origin-top"
                              onMouseEnter={() => setCursorVariant('hover')}
                              onMouseLeave={() => setCursorVariant('default')}
                            >
                              {['Organizer', 'Attendee', 'Sponsor'].map((option) => (
                                <motion.li 
                                  key={option}
                                  className={`px-4 py-3 cursor-none text-base font-medium transition-colors ${role === option ? 'text-nomad-green bg-white/5' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                                  onClick={() => {
                                    setRole(option);
                                    setIsDropdownOpen(false);
                                  }}
                                  whileTap={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                                  tabIndex={-1}
                                >
                                  {option}
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="relative">
                      {import.meta.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                        <ReCAPTCHA
                          sitekey={import.meta.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                          onChange={(value) => setRecaptchaValue(value)}
                          theme="dark"
                        />
                      ) : (
                        <p className="text-xs font-mono text-yellow-500 uppercase tracking-widest mt-2">ReCAPTCHA configuring...</p>
                      )}
                    </div>

                    <motion.button 
                      type="submit"
                      disabled={status === 'loading'}
                      onMouseEnter={() => setCursorVariant('waitlist')}
                      onMouseLeave={() => setCursorVariant('default')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 py-5 border border-nomad-green bg-nomad-green/10 text-nomad-green font-black text-[13px] uppercase tracking-widest transition-all flex justify-center items-center gap-3 hover:bg-nomad-green hover:text-[#111] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] disabled:opacity-50 cursor-none relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] hover:animate-[shimmer_1.5s_infinite]" />
                      {status === 'loading' ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                            <div className="flex items-center justify-center border-2 border-current border-t-transparent rounded-full" style={{ width: 16, height: 16 }} />
                          </motion.div>
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <span>JOIN WAITLIST</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
            
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
