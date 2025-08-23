import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLocoWithScrollTrigger() {
  const locoRef = useRef<any>(null);

  useEffect(() => {
    const onRefresh = () => {
      // Refresh logic
    };

    ScrollTrigger.addEventListener("refresh", onRefresh);

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
    };
  }, []);

  return locoRef;
}