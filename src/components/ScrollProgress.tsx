import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar) return;

    // Create scroll progress animation
    gsap.to(progressBar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progressBar.style.transform = `scaleX(${self.progress})`;
        }
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
      <div 
        ref={progressRef}
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left transform scale-x-0"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
} 