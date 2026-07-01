import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Heart, MailOpen } from "lucide-react";

interface VirtualCardProps {
  onComplete: () => void;
}

export default function VirtualCard({ onComplete }: VirtualCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-20 relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
    >
      <div className="perspective-1000 w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-card"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.8, type: "spring", damping: 20 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-12 rounded-3xl shadow-2xl flex flex-col items-center text-center cursor-pointer hover:bg-white/15 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Heart className="w-16 h-16 text-pink-500 mb-6 animate-pulse fill-pink-500/20" />
              <h2 className="text-3xl font-serif italic text-white mb-2">A Letter for You</h2>
              <p className="text-white/60 text-sm uppercase tracking-widest mb-8">Tap to Open</p>
              
              <button className="px-8 py-3 rounded-full bg-pink-500 text-white text-xs font-bold tracking-widest uppercase hover:bg-pink-600 transition-colors shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-2">
                <MailOpen className="w-4 h-4" />
                Open Card
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="open-card"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", damping: 20 }}
              className="bg-white/95 backdrop-blur-xl p-10 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.3)] relative text-center"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-t-3xl" />
              
              <p className="text-pink-600 font-serif italic text-xl mb-6">My Dearest Mahanoor,</p>
              
              <p className="text-zinc-800 font-serif leading-relaxed text-lg mb-6">
                Before we begin this journey, I just want to remind you how incredibly special you are to me. Every beat of my heart belongs to you, today and always. Let's celebrate you.
              </p>
              
              <p className="text-pink-500 font-serif italic font-semibold text-xl mb-10">
                With all my love,<br/>Aqdas
              </p>

              <button 
                onClick={onComplete}
                className="px-8 py-3 rounded-full border-2 border-pink-500 text-pink-600 text-xs font-bold tracking-widest uppercase hover:bg-pink-50 transition-colors"
              >
                Continue
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
