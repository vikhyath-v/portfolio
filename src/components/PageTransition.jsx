import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function PageTransition() {
  const location = useLocation();

  useEffect(() => {
    const curtain = document.getElementById("page-curtain");
    const playhead = document.getElementById("playhead");
    gsap.set(curtain, { scaleY: 0, transformOrigin: "bottom" });
    gsap.set(playhead, { left: "0%" });
  }, [location]);

  return (
    <>
      <div
        id="page-curtain"
        className="fixed inset-0 bg-custom-bg z-[100] pointer-events-none will-change-transform flex items-center justify-center"
        style={{ transform: "scaleY(0)", transformOrigin: "bottom" }}
      >
        <div className="w-full max-w-3xl px-8">
          {/* Timeline track */}
          <div className="relative w-full h-2 bg-gray-800 rounded-sm overflow-visible">
            {/* Timeline markers */}
            <div className="absolute inset-0 flex justify-between items-center px-1">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-px h-1 bg-gray-600"></div>
              ))}
            </div>
            
            {/* Playhead */}
            <div
              id="playhead"
              className="absolute top-1/2 -translate-y-1/2 will-change-transform"
              style={{ left: "0%" }}
            >
              {/* Playhead triangle */}
              <div className="relative flex flex-col items-center">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-blue-500"></div>
                <div className="w-0.5 h-8 bg-blue-500 -mt-px"></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-6 gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span className="text-gray-400 text-sm font-mono tracking-wider">LOADING</span>
          </div>
        </div>
      </div>
    </>
  );
}