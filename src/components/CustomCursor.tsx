import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouchInfo, setIsTouchInfo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { cursorVariant } = useAppContext();

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchInfo(isTouch);
    if (isTouch) return;

    const style = document.createElement('style');
    style.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(style);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    setIsVisible(true);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isTouchInfo || !isVisible) return null;

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      width: 12,
      height: 12,
      backgroundColor: "#22c55e",
      borderRadius: "0%",
      rotate: 45,
      border: "1px solid #22c55e",
    },
    hover: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      width: 24,
      height: 24,
      backgroundColor: "transparent",
      borderRadius: "0%",
      rotate: 135,
      border: "2px solid #22c55e",
    },
    waitlist: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
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
      animate={cursorVariant}
      variants={variants}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
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
  );
}
