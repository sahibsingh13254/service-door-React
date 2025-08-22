import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;

    // Header scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    // GSAP scroll trigger for header background
    gsap.to(headerRef.current, {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(20px)",
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "50px top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.1) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        }
      }
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-xl border-b border-white/20 shadow-lg" 
          : "bg-black/40 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="container-page h-16 flex items-center justify-between">
        <a 
          href="/"
          className="text-white/90 hover:text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
        >
          PhoneDoor
        </a>
        
        <nav className="hidden sm:flex items-center gap-8 text-sm">
          <a 
            href="/services" 
            className="text-white/70 hover:text-white transition-all duration-300 relative group"
          >
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="/how-it-works" 
            className="text-white/70 hover:text-white transition-all duration-300 relative group"
          >
            How it works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="/about" 
            className="text-white/70 hover:text-white transition-all duration-300 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>
        
        <a 
          href="/book" 
          className="btn btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Book
        </a>
      </div>
    </header>
  );
}