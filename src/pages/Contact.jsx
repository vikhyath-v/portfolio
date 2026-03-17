import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const titleRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(linksRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 75%"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-4 md:px-10 py-20">
      <h2 ref={titleRef} className="text-4xl md:text-6xl font-extrabold mb-16 md:mb-24 tracking-tight">
        CONTACT
      </h2>
      
      <div ref={linksRef} className="flex gap-8 md:gap-12">
        <a
          href="https://linkedin.com/in/vikhyath"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl md:text-5xl hover:text-blue-500 transition-colors duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/vikhyath-v"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl md:text-5xl hover:text-gray-400 transition-colors duration-300"
        >
          <FaGithub />
        </a>
        <a
          href="https://twitter.com/vikhyath"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl md:text-5xl hover:text-blue-400 transition-colors duration-300"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com/vikhyath"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl md:text-5xl hover:text-pink-500 transition-colors duration-300"
        >
          <FaInstagram />
        </a>
      </div>
    </section>
  );
}