import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothAnimations() {
  useEffect(() => {
    // Initialize smooth animations
    const ctx = gsap.context(() => {
      // Add your animation logic here
    });

    return () => ctx.revert();
  }, []);
}

// Animation presets for Apple-like effects
export const animationPresets = {
  fadeInUp: {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  },
  fadeInLeft: {
    x: -60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  },
  fadeInRight: {
    x: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  },
  scaleIn: {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)",
  },
  slideInUp: {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
  },
  stagger: {
    stagger: 0.1,
    ease: "power3.out",
  },
};

// Hook for creating scroll-triggered animations
export function useScrollAnimation(
  selector: string,
  animation: any,
  triggerOptions: any = {}
) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        animation.from || animationPresets.fadeInUp,
        {
          ...animation.to || animationPresets.fadeInUp,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            ...triggerOptions,
          },
        }
      );
    });
  }, [selector, animation, triggerOptions]);
}

// Hook for parallax effects
export function useParallax(selector: string, speed: number = 0.5) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, [selector, speed]);
} 