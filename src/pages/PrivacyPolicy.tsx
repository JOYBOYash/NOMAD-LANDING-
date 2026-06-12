import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen text-white/80 font-medium">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-nomad-green hover:underline mb-8 font-bold uppercase tracking-widest text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-[40px] md:text-[60px] font-black font-display uppercase tracking-[-0.03em] text-white mb-8 border-b border-white/10 pb-6">
          Privacy <span className="text-nomad-green">Policy</span>
        </h1>
        
        <div className="space-y-8 text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, register for an event, participate in interactive features, or communicate with us. This may include your name, email address, physical location when using our geofencing features, and device information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">2. How We Use Information</h2>
            <p>The information we collect is used to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Provide, maintain, and improve our gamification platform.</li>
              <li>Deliver context-aware challenges and rewards via location services.</li>
              <li>Communicate with you regarding updates, support, and event specifics.</li>
              <li>Maintain the security and integrity of our systems and event environments.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">3. Info Sharing & Disclosure</h2>
            <p>We do not share your personal information with outside parties except as deeply necessary to provide our services—such as event organizers for the specific events you attend—and to comply with the law, or protect our rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">4. Security</h2>
            <p>We take strict measures to help protect information about you from loss, theft, misuse and unauthorized access. While we aim for robust security ecosystems, no transmission over the internet implies absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at: <br/>
            <a href="mailto:nomadlivesupport@gmail.com" className="text-nomad-green hover:underline mt-2 inline-block">nomadlivesupport@gmail.com</a></p>
          </section>

          <p className="border-t border-white/10 pt-8 mt-12 text-sm text-white/50">Last updated: June 9, 2026</p>
        </div>
      </motion.div>
    </div>
  );
}
