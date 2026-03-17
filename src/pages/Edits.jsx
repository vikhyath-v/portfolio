import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Edits() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [works, setWorks] = useState([]);
  const playerRef = useRef(null);
  const titleRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const curtain = document.getElementById("page-curtain");
    const playhead = document.getElementById("playhead");
    
    if (titleRef.current) {
      gsap.set(titleRef.current, { y: 80, opacity: 0 });
    }
    if (galleryRef.current) {
      gsap.set(galleryRef.current.children, { y: 120, opacity: 0, scale: 0.9 });
    }
    
    if (curtain) {
      gsap.to(curtain, { 
        scaleY: 0, 
        duration: 0.6, 
        ease: "power3.inOut",
        delay: 0.3,
        transformOrigin: "top"
      });
    }
    if (playhead) {
      gsap.set(playhead, { left: "0%" });
    }
    
    getDocs(collection(db, "videos")).then((snap) => {
      const videosWithThumbnails = snap.docs.map((doc) => {
        const data = doc.data();
        const match = data.ytUrl.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
        const videoId = match ? match[1] : null;
        return {
          id: doc.id,
          ...data,
          thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : data.thumbnail
        };
      });
      setWorks(videosWithThumbnails);
    }).catch(err => console.error("Error fetching videos:", err));
  }, []);

  useEffect(() => {
    if (!works.length || !titleRef.current || !galleryRef.current) return;
    
    gsap.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5
    });

    gsap.to(galleryRef.current.children, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.7
    });
  }, [works]);

  const getYouTubeEmbed = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
  };

  const handleVideoClick = (url) => {
    setPlayingVideo(url);
    gsap.fromTo(playerRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  };

  const closeVideo = () => {
    gsap.to(playerRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => setPlayingVideo(null)
    });
  };

  return (
    <section id="edits" className="min-h-screen flex flex-col justify-center items-center px-4 md:px-10 py-20">
      <h2 ref={titleRef} className="text-4xl md:text-6xl font-extrabold mb-16 md:mb-24 tracking-tight">EDITS</h2>
      
      <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl">
        {works.map((work) => (
          <div
            key={work.id}
            className="relative cursor-pointer group overflow-hidden rounded-xl shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-3xl"
            onMouseEnter={() => setHoveredProject(work.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => handleVideoClick(work.ytUrl)}
          >
            <div className="aspect-video w-full overflow-hidden bg-gray-900">
              <img
                src={work.thumbnail}
                alt={work.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              
              {hoveredProject === work.id && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-all duration-500 ease-out">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-opacity-30">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                      <polygon points="8,5 19,12 8,19"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{work.title}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {playingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-500">
          <div ref={playerRef} className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={getYouTubeEmbed(playingVideo)}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 md:top-4 md:right-4 text-white hover:text-gray-300 transition-all duration-300 hover:rotate-90"
            >
              <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}