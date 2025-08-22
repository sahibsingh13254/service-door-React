import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ref = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      cardRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
    )
    .fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Magnetic button effect
    const btn = ref.current.querySelector<HTMLButtonElement>("#magnet");
    if (!btn) return;

    const enter = () => gsap.to(btn, { 
      scale: 1.05, 
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
    });
    
    const leave = () => gsap.to(btn, { 
      scale: 1.0, 
      x: 0, 
      y: 0, 
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
    });
    
    const move = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.15;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.15;
      gsap.to(btn, { x: dx, y: dy, duration: 0.2, ease: "power2.out" });
    };

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    btn.addEventListener("mousemove", move);

    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
      btn.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div 
          ref={cardRef}
          className="card p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl"
        >
          <h3 
            ref={titleRef}
            className="text-2xl md:text-3xl font-semibold opacity-0"
          >
            Ready to fix your phone today?
          </h3>
          <p 
            ref={subtitleRef}
            className="mt-2 text-white/70 opacity-0"
          >
            Book a doorstep service in under a minute.
          </p>
          <div 
            ref={buttonsRef}
            className="mt-8 flex items-center justify-center gap-3 opacity-0"
          >
            <button 
              id="magnet" 
              className="btn btn-primary transform transition-all duration-300 hover:shadow-lg"
            >
              Book now
            </button>
            <a 
              href="/services" 
              className="inline-flex items-center px-5 py-3 rounded-md border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 transform hover:scale-105"
            >
              See pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}