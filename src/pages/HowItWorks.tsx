import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Book Online",
    description: "Fill out our simple booking form with your device details and preferred time slot.",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center"
  },
  {
    number: "02", 
    title: "Technician Arrives",
    description: "Our certified technician arrives at your doorstep with all necessary tools and genuine parts.",
    icon: "🚗",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center"
  },
  {
    number: "03",
    title: "Quick Repair",
    description: "Professional repair completed in 30-60 minutes with quality guaranteed.",
    icon: "🔧",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop&crop=center"
  },
  {
    number: "04",
    title: "Test & Verify",
    description: "Thorough testing to ensure everything works perfectly before leaving.",
    icon: "✅",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center"
  }
];

export default function HowItWorks() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    // Animate page elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pageRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate title and subtitle
    tl.fromTo(
      ".page-title",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      ".page-subtitle",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    // Animate steps with stagger
    gsap.fromTo(
      ".step-card",
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".steps-container",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container-page text-center">
          <h1 className="page-title text-4xl sm:text-6xl font-semibold tracking-tight mb-6">
            How It Works
          </h1>
          <p className="page-subtitle copy-lg text-white/70 max-w-3xl mx-auto">
            Get your phone repaired in 4 simple steps. Our certified technicians bring the workshop to your doorstep.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container-page">
          <div className="steps-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-card group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 transform hover:scale-105"
              >
                {/* Step Number */}
                <div className="text-6xl font-bold text-white/20 mb-4">
                  {step.number}
                </div>

                {/* Step Image */}
                <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Progress Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-page text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              Ready to get started?
            </h2>
            <p className="copy-lg text-white/70 mb-8">
              Book your repair appointment now and get your phone fixed at your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="btn btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Book Now
              </a>
              <a
                href="/services"
                className="btn btn-outline transform transition-all duration-300 hover:scale-105"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 