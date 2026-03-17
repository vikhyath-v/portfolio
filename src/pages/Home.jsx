import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const nameRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(nameRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );
    
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1 }
    );
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center px-4 md:px-10">
      <h1 ref={nameRef} className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tight">
        VIKHYATH
      </h1>
      <p ref={titleRef} className="text-xl md:text-2xl text-gray-400 tracking-widest">
        DEVELOPER & CREATOR
      </p>
    </section>
  );
}