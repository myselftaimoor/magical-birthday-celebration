import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowDown } from "lucide-react";

interface CakeProps {
  onComplete: () => void;
}

export default function Cake({ onComplete }: CakeProps) {
  const [isCut, setIsCut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCut = () => {
    if (isCut) return;
    setIsCut(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#fbcfe8', '#ffffff']
    });
    setTimeout(onComplete, 4000);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase tracking-[0.4em] text-pink-400 font-semibold mb-2 block">Make a wish, sweetheart</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-white drop-shadow-lg mb-4">
          Time to cut the cake
        </h2>
      </div>

      <div className="relative w-72 h-72 md:w-96 md:h-96" ref={containerRef}>
        <AnimatePresence>
          {!isCut ? (
            <motion.div
              key="whole-cake"
              className="absolute inset-0 flex items-center justify-center"
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/20 rounded-full overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.2)] select-none pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800" 
                  alt="Birthday Cake"
                  className="w-full h-full object-cover opacity-80 pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Instruction */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-pulse z-10 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/90 font-bold flex items-center gap-2">
                  Drag knife down to cut <ArrowDown className="w-3 h-3" />
                </span>
              </div>

              {/* The interactive Knife */}
              <motion.div
                drag="y"
                dragConstraints={containerRef}
                dragElastic={0.1}
                onDrag={(e, info) => {
                  if (info.offset.y > 100) {
                    handleCut();
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-40 cursor-grab active:cursor-grabbing z-20 flex flex-col items-center drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
              >
                {/* Handle */}
                <div className="w-5 h-16 bg-gradient-to-b from-zinc-800 to-zinc-600 rounded-t-md border-b-4 border-amber-300 shadow-inner z-10" />
                {/* Blade */}
                <div className="w-3 h-28 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-b-full shadow-[0_0_20px_rgba(255,255,255,0.6)] -mt-1 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-white/80" />
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="cut-cake"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/20 rounded-full shadow-[0_0_50px_rgba(236,72,153,0.4)]"
            >
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-pulse" />
                <p className="text-white font-serif italic text-3xl drop-shadow-md">Happy Birthday,<br/>my love!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
