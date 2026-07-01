import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-pink-400 font-semibold mb-2">For My Sweetheart, Mahanoor</span>
        <h1 className="text-4xl md:text-6xl font-serif italic text-white leading-tight mb-6 drop-shadow-lg">
          A Journey of Our Love
        </h1>
        <p className="text-white/60 text-lg md:text-xl font-light tracking-wide mb-12">
          Turn up the volume for our perfect song. With love, Aqdas.
        </p>
      </motion.div>

      <motion.button
        onClick={onStart}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.4)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="group relative px-8 py-3 bg-white text-black rounded-full font-bold tracking-widest text-[10px] uppercase overflow-hidden flex items-center gap-3 transition-all hover:bg-white/90"
      >
        <Sparkles className="w-4 h-4 text-pink-500 group-hover:animate-spin-slow" />
        <span>Begin Experience</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </motion.button>
    </motion.div>
  );
}
