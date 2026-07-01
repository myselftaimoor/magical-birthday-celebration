import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Camera as CameraIcon } from "lucide-react";

interface CameraProps {
  onComplete: () => void;
}

export default function Camera({ onComplete }: CameraProps) {
  const [taken, setTaken] = useState(false);
  const [flash, setFlash] = useState(false);

  const takePicture = () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      setTaken(true);
      setTimeout(onComplete, 5000);
    }, 200);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-10 relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.4em] text-pink-400 font-semibold mb-2 block">Capture the moment</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-white drop-shadow-lg mb-4">
          Smile, my love
        </h2>
      </div>

      <div className="relative w-full max-w-sm aspect-[3/4] flex flex-col items-center justify-center">
        {!taken ? (
          <motion.div
            className="absolute inset-0 border-2 border-white/30 rounded-3xl flex flex-col items-center justify-between p-6 backdrop-blur-sm bg-white/5"
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Viewfinder corners */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-pink-400/50" />
            <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-pink-400/50" />
            <div className="absolute bottom-24 left-8 w-8 h-8 border-b-2 border-l-2 border-pink-400/50" />
            <div className="absolute bottom-24 right-8 w-8 h-8 border-b-2 border-r-2 border-pink-400/50" />

            <div className="flex-1 w-full flex items-center justify-center">
               <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
               </div>
            </div>

            <button 
              onClick={takePicture}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 transition-all text-black cursor-pointer"
            >
              <CameraIcon className="w-6 h-6" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-white p-4 pb-16 rounded-sm shadow-2xl w-full"
          >
             <div className="w-full aspect-square bg-zinc-200 overflow-hidden">
               <img 
                 src="https://res.cloudinary.com/dpqfefym0/image/upload/v1782923628/WhatsApp_Image_2026-07-01_at_21.27.35_fbe4xf.jpg" 
                 alt="Romantic couple holding hands" 
                 className="w-full h-full object-cover filter contrast-125 saturate-50"
               />
             </div>
             <div className="absolute bottom-4 left-0 right-0 text-center">
               <p className="font-serif text-black/80 text-xl italic font-medium">Forever Yours, Aqdas</p>
             </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
