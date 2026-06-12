import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';

interface AppContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playPop: () => void;
  cursorVariant: 'default' | 'hover' | 'waitlist';
  setCursorVariant: (variant: 'default' | 'hover' | 'waitlist') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'waitlist'>('default');
  
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // We attempt to initialize AudioContext, but it'll be suspended until user interaction
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass && !audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass();
    }
  }, []);

  const initAudio = () => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(console.error);
    }
  };

  useEffect(() => {
    const unlockAudio = () => {
       if (audioCtxRef.current) {
         if (audioCtxRef.current.state === 'suspended') {
           audioCtxRef.current.resume();
         }
         const osc = audioCtxRef.current.createOscillator();
         const gain = audioCtxRef.current.createGain();
         gain.gain.value = 0;
         osc.connect(gain);
         gain.connect(audioCtxRef.current.destination);
         osc.start(audioCtxRef.current.currentTime);
         osc.stop(audioCtxRef.current.currentTime + 0.001);
       }
       document.removeEventListener('touchstart', unlockAudio, true);
       document.removeEventListener('pointerdown', unlockAudio, true);
       document.removeEventListener('click', unlockAudio, true);
    };

    document.addEventListener('touchstart', unlockAudio, true);
    document.addEventListener('pointerdown', unlockAudio, true);
    document.addEventListener('click', unlockAudio, true);

    return () => {
       document.removeEventListener('touchstart', unlockAudio, true);
       document.removeEventListener('pointerdown', unlockAudio, true);
       document.removeEventListener('click', unlockAudio, true);
    };
  }, []);

  const toggleSound = () => {
    setIsSoundEnabled(prev => {
      if (!prev) initAudio();
      return !prev;
    });
  };

  const playHover = () => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.02);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch(e) {
      console.error(e);
    }
  };

  const playClick = () => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);
      
      gainNode.gain.setValueAtTime(1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.03);
    } catch (e) {
      console.error(e);
    }
  };

  const playPop = () => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleGlobalTrigger = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, select, [role="button"], .cursor-none, [tabindex]')) {
        playClick();
      }
    };
    
    // Use capture phase for immediate response
    document.addEventListener('pointerdown', handleGlobalTrigger, true);
    return () => {
      document.removeEventListener('pointerdown', handleGlobalTrigger, true);
    };
  }, [isSoundEnabled]);

  return (
    <AppContext.Provider value={{ isSoundEnabled, toggleSound, playHover, playClick, playPop, cursorVariant, setCursorVariant }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
}
