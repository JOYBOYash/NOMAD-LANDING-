import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function CustomCursor() {
  const [isTouchInfo, setIsTouchInfo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { cursorVariant } = useAppContext();

  const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchInfo(isTouch);
    if (isTouch) return;

    const style = document.createElement('style');
    style.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(style);

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    setIsVisible(true);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (isTouchInfo || !isVisible) return null;

  const variants = {
    default: {
      x: "-50%",
      y: "-50%",
      width: 12,
      height: 12,
      backgroundColor: "#22c55e",
      borderRadius: "0%",
      rotate: 45,
      border: "1px solid #22c55e",
    },
    hover: {
      x: "-50%",
      y: "-50%",
      width: 24,
      height: 24,
      backgroundColor: "transparent",
      borderRadius: "0%",
      rotate: 135,
      border: "2px solid #22c55e",
    },
    waitlist: {
      x: "-50%",
      y: "-50%",
      width: 60,
      height: 60,
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderRadius: "0%",
      rotate: -45,
      border: "2px dashed #22c55e",
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-screen"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div
        animate={cursorVariant}
        variants={variants}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        className="flex items-center justify-center"
      >
        <AnimatePresence>
          {cursorVariant === 'waitlist' && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 45 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-bold text-nomad-green uppercase tracking-widest leading-none drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]"
            >
              Join
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
