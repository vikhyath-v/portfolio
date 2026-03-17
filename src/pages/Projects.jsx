import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Projects() {
  const [projects, setProjects] = useState([]);
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
    
    // Sample projects data
    const sampleProjects = [
      {
        id: "1",
        title: "Intent OS",
        link: "https://medium.com/@bhatvikhyath31/intent-os-e6054e927da0"
      },
      {
        id: "2", 
        title: "EMQR",
        link: "https://emqr.netlify.app/"
      },
      {
        id: "3",
        title: "Portfolio",
        link: "https://vikhyath.pythonanywhere.com/"
      }
    ];
    
    setProjects(sampleProjects);
  }, []);

  useEffect(() => {
    if (!projects.length || !titleRef.current || !galleryRef.current) return;
    
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
  }, [projects]);

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center px-4 md:px-10 py-20">
      <h2 ref={titleRef} className="text-4xl md:text-6xl font-extrabold mb-16 md:mb-24 tracking-tight">PROJECTS</h2>
      
      <div ref={galleryRef} className="flex flex-col gap-6 md:gap-8 w-full max-w-2xl">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-6 py-4 border-b border-gray-700 hover:border-custom-text transition-all duration-300"
          >
            <h3 className="text-2xl md:text-3xl font-bold tracking-wide group-hover:tracking-wider transition-all duration-300">{project.title}</h3>
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}