import { useState, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import VirtualCard from './components/VirtualCard';
import Welcome from './components/Welcome';
import Memories from './components/Memories';
import Cake from './components/Cake';
import Camera from './components/Camera';
import Finale from './components/Finale';
import Particles from './components/Particles';

export default function App() {
  const [stage, setStage] = useState<-1 | 0 | 1 | 2 | 3 | 4>(-1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleStart = () => {
    setHasStarted(true);
    setStage(1);
  };

  const toggleAudio = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isAudioPlaying) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <main className={`min-h-screen bg-[#1a0810] text-white relative font-sans selection:bg-rose-500/30 ${stage === 4 ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}`}>
      
      {hasStarted && (
        <div className="fixed top-[-1000px] left-[-1000px] opacity-0 pointer-events-none z-[-50]">
          <iframe 
            ref={iframeRef}
            width="10" 
            height="10" 
            src="https://www.youtube.com/embed/2Vv-BfVoq4g?enablejsapi=1&autoplay=1&loop=1&playlist=2Vv-BfVoq4g" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          ></iframe>
        </div>
      )}

      <Particles />
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-600 opacity-20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-pink-700 opacity-20 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/4 right-[5%] w-[40vw] h-[40vw] bg-red-800 opacity-20 rounded-full blur-[100px]"></div>
      </div>

      <AnimatePresence mode="wait">
        {stage === -1 && (
          <VirtualCard 
            key="card" 
            onComplete={() => {
              setHasStarted(true);
              setStage(0);
            }} 
          />
        )}

        {stage === 0 && (
          <Welcome key="welcome" onStart={handleStart} />
        )}
        
        {stage === 1 && (
          <Memories key="memories" onComplete={() => setStage(2)} />
        )}

        {stage === 2 && (
          <Cake key="cake" onComplete={() => setStage(3)} />
        )}

        {stage === 3 && (
          <Camera key="camera" onComplete={() => setStage(4)} />
        )}

        {stage === 4 && (
          <Finale key="finale" toggleAudio={toggleAudio} isAudioPlaying={isAudioPlaying} />
        )}
      </AnimatePresence>
    </main>
  );
}
