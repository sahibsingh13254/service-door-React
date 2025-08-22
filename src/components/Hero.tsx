import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const warrantyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Create a timeline for the hero animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Initial entrance animations
    const entranceTl = gsap.timeline();

    // Stagger the text elements
    entranceTl
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(
        subtitleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        buttonsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        phonesRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(
        warrantyRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.8"
      );

    // No movement - text stays in place
    // Removed parallax and floating animations

    // Stagger animation for service text elements
    const serviceTextElements = phonesRef.current?.querySelectorAll(".service-text-1, .service-text-2, .service-text-3, .service-text-4, .service-text-5, .service-text-6");
    if (serviceTextElements) {
      gsap.fromTo(
        serviceTextElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.8,
        }
      );
    }

    return () => {
      tl.kill();
      entranceTl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative isolate overflow-hidden bg-black">
      {/* Enhanced radial gradient for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.12),transparent_70%)]" />
      
      {/* Additional subtle gradients for Apple-like lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(30%_20%_at_80%_80%,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="container-page pt-20 pb-24 text-center">
        <h1 
          ref={titleRef}
          className="heading-hero opacity-0"
        >
          Phone repair at your doorstep.
        </h1>
        
        <p 
          ref={subtitleRef}
          className="copy-lg mt-4 opacity-0"
        >
          Fast, reliable, certified technicians — right where you are.
        </p>

        <div 
          ref={buttonsRef}
          className="mt-8 flex items-center justify-center gap-3 opacity-0"
        >
          <a 
            href="#book" 
            className="btn btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Book now
          </a>
          <a 
            href="#learn" 
            className="btn btn-outline transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Learn more
          </a>
        </div>

                <div
          ref={phonesRef}
          className="relative mt-16 max-w-4xl mx-auto opacity-0"
        >
          {/* Animated Service Text */}
          <div className="text-center space-y-8">
            <div className="service-text-1 opacity-0 transform translate-y-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white/90 mb-4">
                We're offering service at home
              </h3>
            </div>
            
            <div className="service-text-2 opacity-0 transform translate-y-8">
              <p className="text-xl md:text-2xl text-white/70 mb-6 font-semibold">
                Professional phone repair at your doorstep
              </p>
            </div>
            
            <div className="service-text-3 opacity-0 transform translate-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h4 className="text-2xl font-bold text-white mb-4">
                  At Good Price
                </h4>
                <p className="text-white/80 text-xl font-medium">
                  Quality repairs with competitive pricing
                </p>
              </div>
            </div>
            
            <div className="service-text-4 opacity-0 transform translate-y-8">
              <div className="flex flex-wrap justify-center gap-4 text-base text-white/60 font-medium">
                <span className="bg-white/10 px-4 py-2 rounded-full">✓ Same Day Service</span>
                <span className="bg-white/10 px-4 py-2 rounded-full">✓ Genuine Parts</span>
                <span className="bg-white/10 px-4 py-2 rounded-full">✓ Warranty Included</span>
              </div>
            </div>
            
            <div className="service-text-5 opacity-0 transform translate-y-8">
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h5 className="text-lg font-bold text-white mb-3">Expert Technicians</h5>
                  <p className="text-white/70 text-base">
                    Certified professionals with years of experience in phone repair
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h5 className="text-lg font-bold text-white mb-3">Convenient Service</h5>
                  <p className="text-white/70 text-base">
                    We come to you - no need to travel or wait in queues
                  </p>
                </div>
              </div>
            </div>
            
            <div className="service-text-6 opacity-0 transform translate-y-8">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/20">
                <h5 className="text-xl font-bold text-white mb-3">Why Choose Us?</h5>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-white/80">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏠</div>
                    <p className="font-semibold">Home Service</p>
                    <p>We come to you</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <p className="font-semibold">Fast Repair</p>
                    <p>Same day service</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <p className="font-semibold">Best Price</p>
                    <p>Competitive rates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p 
          ref={warrantyRef}
          className="mt-10 text-xs text-white/50 opacity-0"
        >
          Genuine parts. 6‑month warranty. Same‑day slots available.
        </p>
      </div>
    </section>
  );
}
