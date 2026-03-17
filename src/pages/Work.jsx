import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const titleRef = useRef(null);
  const linksRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%"
        }
      }
    );

    gsap.fromTo(linksRef.current.children,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: linksRef.current,
          start: "top 75%"
        }
      }
    );
  }, []);

  const handleClick = (e, path) => {
    e.preventDefault();
    const curtain = document.getElementById("page-curtain");
    const playhead = document.getElementById("playhead");
    
    // Show curtain
    gsap.to(curtain, {
      scaleY: 1,
      transformOrigin: "bottom",
      duration: 0.5,
      ease: "power3.inOut"
    });
    
    // Animate playhead moving across timeline
    gsap.to(playhead, {
      left: "100%",
      duration: 1,
      ease: "power1.inOut",
      delay: 0.2,
      onComplete: () => {
        navigate(path);
      }
    });
  };

  return (
    <section id="work" className="min-h-screen flex flex-col justify-center items-center px-4 md:px-10 py-20">
      <h2 ref={titleRef} className="text-4xl md:text-6xl font-extrabold mb-20 md:mb-32 tracking-tight">WORK</h2>
      
      <div ref={linksRef} className="flex flex-col items-center gap-8">
        <button
          onClick={(e) => handleClick(e, '/edits')}
          className="text-5xl md:text-7xl font-bold tracking-wider hover:tracking-widest transition-all duration-500 ease-out hover:text-gray-400"
        >
          EDITS
        </button>
        
        <div className="w-64 md:w-96 h-px bg-gradient-to-r from-transparent via-custom-text to-transparent"></div>
        
        <button
          onClick={(e) => handleClick(e, '/projects')}
          className="text-5xl md:text-7xl font-bold tracking-wider hover:tracking-widest transition-all duration-500 ease-out hover:text-gray-400"
        >
          PROJECTS
        </button>
      </div>
    </section>
  );
}