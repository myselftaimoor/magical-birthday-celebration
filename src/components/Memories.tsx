import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronRight, Heart } from "lucide-react";

interface MemoriesProps {
  onComplete: () => void;
}

const MEMORIES = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923630/WhatsApp_Image_2026-07-01_at_21.25.13_dnydnr.jpg",
    caption: "Every moment with you is magic, my love...",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923630/WhatsApp_Image_2026-07-01_at_21.25.35_nh1ljl.jpg",
    caption: "You light up my darkest days, sweetheart.",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923629/WhatsApp_Image_2026-07-01_at_21.26.05_pxvgi2.jpg",
    caption: "Here's to the beautiful memories we've made...",
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923629/WhatsApp_Image_2026-07-01_at_21.26.26_kt6uja.jpg",
    caption: "And to forever with you, Mahanoor.",
  },
];

export default function Memories({ onComplete }: MemoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMemory = () => {
    if (currentIndex < MEMORIES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
    >
      <div className="relative w-full max-w-lg aspect-[4/5] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000 || offset.x < -100 || swipe > 10000 || offset.x > 100) {
                nextMemory();
              }
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotate: currentIndex % 2 === 0 ? 2 : -2, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, x: -300, rotate: -20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/10 p-4 pb-16 md:p-6 md:pb-20 rounded-3xl shadow-2xl flex flex-col cursor-grab active:cursor-grabbing"
          >
            <div className="flex-1 w-full relative rounded-2xl overflow-hidden bg-[#1a1a1a]">
              <motion.img
                src={MEMORIES[currentIndex].image}
                alt={`Memory ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 4, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-left z-20">
              <p className="text-[10px] text-pink-400 font-semibold uppercase tracking-[0.4em] mb-2">Chapter {currentIndex + 1}</p>
              <p className="font-serif text-white text-xl md:text-2xl italic drop-shadow-lg">
                {MEMORIES[currentIndex].caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div 
        className="mt-12 flex gap-6 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex gap-2">
          {MEMORIES.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextMemory}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors border border-white/20"
          aria-label="Next memory"
        >
          {currentIndex === MEMORIES.length - 1 ? (
            <Heart className="w-5 h-5 fill-current text-rose-400 animate-pulse" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
