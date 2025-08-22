import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create timeline for the section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate text elements with stagger
    const textElements = textRef.current?.querySelectorAll("h2, p, div");
    if (textElements) {
      tl.fromTo(
        textElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }

    // Animate image with scale and parallax
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      );

      // Add parallax effect to image
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-black">
      <div className="container-page py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={textRef}>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight opacity-0">
            Crystal‑clear repairs.
          </h2>
          <p className="copy-lg mt-4 opacity-0">
            Screens, batteries, cameras, back glass — fixed with precision tools and genuine parts.
          </p>
          <div className="mt-6 text-sm text-white/60 opacity-0">
            Same‑day in major neighborhoods. Transparent pricing.
          </div>
        </div>
        <div ref={imageRef} className="relative opacity-0">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&crop=center"
            alt="Phone repair technician working"
            className="w-full h-96 rounded-2xl shadow-2xl shadow-black/70 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          
          {/* Enhanced lighting effects */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
