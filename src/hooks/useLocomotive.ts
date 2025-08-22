import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
export function useLocomotive() {
const scrollRef = useRef<LocomotiveScroll | null>(null);
useEffect(() => {
const el = document.querySelector("[data-scroll-container]") as HTMLElement | null;
if (!el) return;
const scroll = new LocomotiveScroll({ el, smooth: true, multiplier: 1.0 });
scrollRef.current = scroll;
const imgs = Array.from(document.images);
let loaded = 0;
const onImg = () => { loaded++; if (loaded === imgs.length) scroll.update(); };
imgs.forEach(img => img.complete ? onImg() : img.addEventListener("load", onImg));
return () => { scroll.destroy(); scrollRef.current = null; };
}, []);
return scrollRef;
}