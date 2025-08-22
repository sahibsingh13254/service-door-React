import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
gsap.registerPlugin(ScrollTrigger);
export function useLocoWithScrollTrigger() {
useEffect(() => {
const container = document.querySelector("[data-scroll-container]") as HTMLElement | null;
if (!container) return;
const loco = new LocomotiveScroll({ el: container, smooth: true });
loco.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(container, {
scrollTop(value) {
return arguments.length ? (loco as any).scrollTo(value, { duration: 0, disableLerp: true }) : (loco as any).scroll.instance.scroll.y;
},
getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; },
pinType: container.style.transform ? "transform" : "fixed"
});
const onRefresh = () => loco.update();
ScrollTrigger.addEventListener("refresh", onRefresh);
ScrollTrigger.refresh();
return () => {
ScrollTrigger.removeEventListener("refresh", onRefresh);
loco.destroy();
};
}, []);
}