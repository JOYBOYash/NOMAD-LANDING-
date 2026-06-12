import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
          Terms of <span className="text-nomad-green">Service</span>
        </h1>
        
        <div className="space-y-8 text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">1. Acceptance of Terms</h2>
            <p>By accessing and using Nomad, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform. These Terms govern your access to the Nomad mobile and web platform, gamification mechanics, and digital rewards systems.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">2. User Conduct</h2>
            <p>We expect all users to respect the live nature of our ecosystem. You agree not to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Use location spoofing tools to falsify your presence at events.</li>
              <li>Exploit reward mechanics or attempt to artificially inflate your token balance.</li>
              <li>Harass other attendees or organizers.</li>
              <li>Upload malicious code or disrupt the infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">3. Platform Modifications</h2>
            <p>We reserve the right to modify, suspend, or discontinue any aspect of Nomad at any time without notice. We are constantly iterating to provide the best live event experience, which means features and reward mechanisms may change dynamically.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">4. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Nomad shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the service or attendance at partnered live events.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-sans">5. Contact Information</h2>
            <p>Contact us if you have any questions or require support regarding these Terms: <br/>
            <a href="mailto:nomadlivesupport@gmail.com" className="text-nomad-green hover:underline mt-2 inline-block">nomadlivesupport@gmail.com</a></p>
          </section>

          <p className="border-t border-white/10 pt-8 mt-12 text-sm text-white/50">Last updated: June 9, 2026</p>
        </div>
      </motion.div>
    </div>
  );
}

