import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const steps = [
{ title: "Describe issue", desc: "Screen, battery, camera, speaker, etc." },
{ title: "Pick a time", desc: "We come to your home or office." },
{ title: "On‑site repair", desc: "Most repairs done under 60 minutes." },
{ title: "Pay & warranty", desc: "Secure payment, 90‑day warranty." }
];

export default function ServiceSteps() {
const ref = useRef<HTMLDivElement | null>(null);

useEffect(() => {
if (!ref.current) return;
const cards = ref.current.querySelectorAll(".step");
gsap.from(cards, {
opacity: 0, y: 32, duration: 0.6, stagger: 0.12,
scrollTrigger: { trigger: ref.current, start: "top 80%" }
});
return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);

return (
<section className="py-20" ref={ref}>
<div className="max-w-7xl mx-auto px-4">
<h2 className="text-3xl font-semibold mb-10">How it works</h2>
<div className="grid md:grid-cols-4 gap-6">
{steps.map((s, i) => (
<div key={i} className="step card p-6">
<div className="text-blue-400 font-semibold">0{i + 1}</div>
<h3 className="text-xl font-semibold mt-2">{s.title}</h3>
<p className="mt-2 text-white/70">{s.desc}</p>
</div>
))}
</div>
</div>
<div className="mt-16 hr" />
</section>
);
}

