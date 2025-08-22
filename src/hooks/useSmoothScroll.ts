import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Set up smooth scrolling container
    container.style.height = "100vh";
    container.style.overflow = "hidden";
    container.style.position = "relative";

    // Create smooth scroll effect
    let currentY = 0;
    let targetY = 0;
    let ease = 0.075;

    const setHeight = () => {
      const height = container.scrollHeight;
      container.style.height = `${height}px`;
    };

    const smoothScroll = () => {
      targetY = window.scrollY;
      currentY = gsap.utils.interpolate(currentY, targetY, ease);
      
      container.style.transform = `translate3d(0, ${-currentY}px, 0)`;
      
      requestAnimationFrame(smoothScroll);
    };

    // Initialize
    setHeight();
    smoothScroll();

    // Update height on resize
    window.addEventListener("resize", setHeight);

    // Handle scroll events
    const handleScroll = () => {
      targetY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollContainerRef;
}

// Enhanced scroll to element with smooth animation
export function useScrollToElement() {
  const scrollToElement = (elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.offsetTop - offset;
    
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: elementPosition, autoKill: false },
      ease: "power3.inOut"
    });
  };

  return scrollToElement;
}

// Parallax scroll effect
export function useParallaxScroll(speed: number = 0.5) {
  const parallaxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = parallaxRef.current;
    if (!element) return;

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
  }, [speed]);

  return parallaxRef;
}

// Scroll progress indicator
export function useScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar) return;

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

  return progressRef;
} 