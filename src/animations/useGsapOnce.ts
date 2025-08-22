import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function useGsapOnce<T extends HTMLElement>(animation: (el: T) => void) {
const ref = useRef<T | null>(null);
useEffect(() => {
if (!ref.current) return;
const ctx = gsap.context(() => animation(ref.current as T), ref);
return () => ctx.revert();
}, [animation]);
return ref;
}