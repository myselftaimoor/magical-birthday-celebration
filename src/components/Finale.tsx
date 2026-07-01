import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { useEffect, useState, useRef, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import { Music, Pause, Heart, Star, Sparkles } from "lucide-react";

const GALLERY = [
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923629/WhatsApp_Image_2026-07-01_at_21.29.32_ydvlak.jpg",
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923629/WhatsApp_Image_2026-07-01_at_21.29.33_vxu2zz.jpg",
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923628/WhatsApp_Image_2026-07-01_at_21.29.32_1_er8rlh.jpg"
];

const PETAL_IMAGES = [
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923630/WhatsApp_Image_2026-07-01_at_21.25.13_dnydnr.jpg",
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923630/WhatsApp_Image_2026-07-01_at_21.25.35_nh1ljl.jpg",
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923629/WhatsApp_Image_2026-07-01_at_21.26.05_pxvgi2.jpg",
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923629/WhatsApp_Image_2026-07-01_at_21.26.26_kt6uja.jpg",
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923628/WhatsApp_Image_2026-07-01_at_21.27.35_fbe4xf.jpg",
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923629/WhatsApp_Image_2026-07-01_at_21.29.32_ydvlak.jpg",
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923629/WhatsApp_Image_2026-07-01_at_21.29.33_vxu2zz.jpg",
  "https://res.cloudinary.com/dpqfefym0/image/upload/v1782923628/WhatsApp_Image_2026-07-01_at_21.29.32_1_er8rlh.jpg"
];

interface FinaleProps {
  toggleAudio: () => void;
  isAudioPlaying: boolean;
}

function InteractiveReasonCard({ index, reason }: { index: number, reason: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full h-32 md:h-40 cursor-pointer group"
      style={{ perspective: "1000px" }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateX: isOpen ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white/5 border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors shadow-lg" style={{ backfaceVisibility: "hidden" }}>
          <span className="text-pink-300 font-serif italic text-2xl font-semibold">Reason #{index + 1}</span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 bg-pink-900/40 border border-pink-400/50 rounded-2xl flex items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(236,72,153,0.3)]" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
          <p className="text-white font-serif md:text-lg italic leading-tight">{reason}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Finale({ toggleAudio, isAudioPlaying }: FinaleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const letterY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const galleryY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const galleryY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const galleryY3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    // Fire celebratory confetti on mount
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = (e: ReactMouseEvent | ReactTouchEvent) => {
    let clientX, clientY;
    
    // Check if the target is a button or interactive element, if so don't spawn hearts
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.tagName.toLowerCase() === 'button') {
      return;
    }

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as ReactMouseEvent).clientX;
      clientY = (e as ReactMouseEvent).clientY;
    }

    const colors = ['text-rose-400', 'text-pink-500', 'text-purple-400', 'text-red-500'];
    const newHeart = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2500);
  };

  return (
    <motion.div
      ref={containerRef}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      className="w-full relative z-10 pb-20 cursor-crosshair min-h-[200vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Floating Hearts Container */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, x: heart.x - 24, y: heart.y - 24 }}
            animate={{ 
              opacity: 0, 
              scale: 2, 
              y: heart.y - 150,
              x: heart.x - 24 + (Math.random() * 60 - 30) // slight sway
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={`fixed pointer-events-none z-[100] ${heart.color}`}
          >
            <Heart className="w-8 h-8 fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Music Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={toggleAudio}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 text-white transition-all shadow-[0_0_15px_rgba(236,72,153,0.2)] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] active:scale-95"
        >
          {isAudioPlaying ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5 text-pink-400" />}
        </button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="text-center flex flex-col items-center"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-pink-400 font-semibold mb-4 block">The Big One</span>
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-pink-400 mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] leading-tight"
            animate={{ backgroundPosition: ["0% center", "200% center"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% auto" }}
          >
            Happy
            <br />
            Birthday
            <br />
            <span className="text-5xl md:text-7xl lg:text-8xl mt-2 block hover:scale-105 transition-transform duration-500 cursor-pointer text-pink-300">My Love</span>
          </motion.h1>
        </motion.div>
        
        <motion.div 
           className="absolute bottom-10 animate-bounce"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2 }}
        >
          <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest mb-2 text-center">Tap Anywhere & Scroll Down</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* A Letter Section */}
      <section className="py-32 px-4 md:px-12 max-w-4xl mx-auto">
        <motion.div 
          style={{ y: letterY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group hover:bg-white/10 transition-colors duration-700"
        >
          <Heart className="absolute top-[-20px] right-[-20px] w-40 h-40 text-pink-500/10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
          <h2 className="text-3xl md:text-4xl font-serif italic mb-8 text-pink-300 group-hover:text-pink-400 transition-colors">My Dearest Mahanoor,</h2>
          <div className="space-y-6 text-white/80 font-serif text-lg md:text-xl leading-relaxed md:leading-loose">
            <p>
              Today is a celebration of you—the most beautiful soul I have ever known. Every single day with you feels like a dream, and I am endlessly grateful for the magic and light you bring into my life.
            </p>
            <p>
              You are my rock, my joy, and my greatest adventure. As you step into this beautiful new year, I promise to stand by your side, to hold your hand through it all, and to love you more with every passing second.
            </p>
            <p>
              May your birthday be as perfect and radiant as your smile. Here's to us, to our memories, and to forever together.
            </p>
            <p className="pt-6 text-pink-400 font-semibold italic text-xl">
              Forever Yours,<br/>Aqdas
            </p>
          </div>
        </motion.div>
      </section>

      {/* Memory Gallery */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif italic text-white drop-shadow-md mb-4">Our Beautiful Moments</h2>
          <p className="text-white/60 tracking-widest text-xs md:text-sm uppercase">A lifetime of love in every frame</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {GALLERY.map((img, i) => {
            // Apply different parallax speeds for a dynamic grid
            const y = i % 3 === 0 ? galleryY1 : i % 3 === 1 ? galleryY2 : galleryY3;
            
            return (
              <motion.div
                key={i}
                style={{ y }}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.2 }}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3, zIndex: 20 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-white/5 p-4 md:p-6"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative border border-white/20">
                  <img 
                    src={img} 
                    alt={`Memory ${i + 1}`} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 filter sepia-[0.3] group-hover:sepia-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                     <p className="text-pink-300 font-serif italic text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Perfect Moment {i + 1}</p>
                     <p className="text-white/70 text-xs uppercase tracking-widest mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">With you</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Reasons I Love You */}
      <section className="py-24 px-4 md:px-12 max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif italic text-pink-300 drop-shadow-md mb-4">Reasons I Love You</h2>
          <p className="text-white/60 tracking-widest text-xs md:text-sm uppercase">Tap to reveal</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "You always turn my bad mood into a good one without even trying.",
            "The way you understand me, even when I don’t say anything.",
            "You always know how to make me smile, no matter what.",
            "You reassure me and make me feel safe and important.",
            "You love me in a way that feels real, pure, and different.",
            "With you, everything feels easier, better, and more peaceful."
          ].map((reason, i) => (
            <InteractiveReasonCard key={i} index={i} reason={reason} />
          ))}
        </div>
      </section>

      {/* Interactive Stickers Area */}
      <section className="py-20 px-4 md:px-12 max-w-5xl mx-auto relative min-h-[500px]">
        <div className="text-center mb-12 relative z-20 pointer-events-none">
          <h2 className="text-3xl md:text-5xl font-serif italic text-white drop-shadow-md mb-4">Leave Your Mark</h2>
          <p className="text-white/60 tracking-widest text-xs md:text-sm uppercase">Drag the stickers around!</p>
        </div>

        {/* A Cute GIF to add more aesthetic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden mix-blend-screen"
        >
          <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRtdzE3ZTVwaWV3ZHBoMjR4Zm11bm5wdGVxeHV3NzZlbmRtcjBycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vz58J8shFW6BvqnYTm/giphy.gif" alt="Cute hearts" className="w-full h-full object-cover" />
        </motion.div>

        <div className="relative w-full h-[400px] border-2 border-dashed border-white/20 rounded-3xl bg-white/5 overflow-hidden touch-none" ref={containerRef}>
          {[
            { id: 1, text: "💖", rotate: 12, startX: 10, startY: 20 },
            { id: 2, text: "🦋", rotate: -15, startX: 80, startY: 40 },
            { id: 3, text: "🌸", rotate: 5, startX: 40, startY: 80 },
            { id: 4, text: "🥺", rotate: -20, startX: 20, startY: 200 },
            { id: 5, text: "✨", rotate: 10, startX: 60, startY: 150 },
            { id: 6, text: "🥰", rotate: -5, startX: 30, startY: 300 },
            { id: 7, text: "💋", rotate: 20, startX: 70, startY: 250 },
            { id: 8, text: "💌", rotate: -10, startX: 10, startY: 100 },
          ].map((sticker) => (
            <motion.div
              key={sticker.id}
              drag
              dragConstraints={containerRef}
              whileHover={{ scale: 1.3, zIndex: 50 }}
              whileDrag={{ scale: 1.5, zIndex: 100, rotate: 0 }}
              initial={{ left: `${sticker.startX}%`, top: `${sticker.startY}px`, rotate: sticker.rotate }}
              className="absolute text-5xl md:text-6xl cursor-grab active:cursor-grabbing hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] transition-shadow"
            >
              {sticker.text}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flower Petals of Memories */}
      <section className="py-32 px-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[800px]">
        <div className="text-center mb-24 relative z-20 pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-serif italic text-white drop-shadow-md mb-4">You Are My Universe</h2>
          <p className="text-white/60 tracking-widest text-xs md:text-sm uppercase">Every petal holds a memory of us</p>
        </div>

        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          {/* Center heart */}
          <motion.div 
            className="absolute z-10 w-24 h-24 md:w-32 md:h-32 bg-pink-500/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-pink-400/30 shadow-[0_0_50px_rgba(236,72,153,0.5)]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-pink-400 fill-pink-400/50" />
          </motion.div>

          {/* Petals */}
          {PETAL_IMAGES.map((img, i) => {
            const angle = (i * 360) / PETAL_IMAGES.length;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.15, type: "spring", damping: 15 }}
                className="absolute flex items-center justify-center z-20"
              >
                <div 
                  className="w-24 h-36 md:w-36 md:h-56 rounded-full overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.3)] border-2 border-pink-300/30 hover:z-50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] hover:scale-110 hover:border-pink-300 cursor-pointer"
                  style={{
                    transform: `rotate(${angle}deg) translateY(calc(-1 * clamp(140px, 25vw, 240px)))`
                  }}
                >
                  <img 
                    src={img} 
                    alt={`Petal memory ${i}`} 
                    className="w-full h-full object-cover filter saturate-125 transition-transform duration-500"
                    style={{ transform: `rotate(${-angle}deg) scale(1.6)` }} 
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/5 mt-20 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8 relative z-10"
        >
          <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-bounce" />
          <Star className="w-6 h-6 text-amber-200 animate-pulse" />
        </motion.div>
        <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.3em] relative z-10">Crafted with endless love for Mahanoor</p>
        <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-600/20 blur-[120px] rounded-full pointer-events-none" />
      </footer>
    </motion.div>
  );
}
