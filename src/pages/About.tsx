import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "10,000+", label: "Phones Repaired" },
  { number: "4.9★", label: "Customer Rating" },
  { number: "50+", label: "Cities Covered" },
  { number: "24/7", label: "Support Available" }
];

const team = [
  {
    name: "Certified Technicians",
    description: "Our team consists of Apple-certified and Samsung-certified technicians with years of experience.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop&crop=center"
  },
  {
    name: "Genuine Parts",
    description: "We use only genuine OEM parts or high-quality aftermarket parts that meet original specifications.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center"
  },
  {
    name: "Quality Guarantee",
    description: "All our repairs come with a minimum 6-month warranty and quality guarantee.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop&crop=center"
  }
];

export default function About() {
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

    // Animate stats
    gsap.fromTo(
      ".stat-item",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate team cards
    gsap.fromTo(
      ".team-card",
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".team-section",
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
            About PhoneDoor
          </h1>
          <p className="page-subtitle copy-lg text-white/70 max-w-3xl mx-auto">
            We're revolutionizing phone repair by bringing professional service right to your doorstep. 
            No more waiting in queues or traveling to repair shops.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-white/70">
                <p>
                  PhoneDoor was born from a simple frustration: why should you have to 
                  travel to a repair shop when we can bring the workshop to you?
                </p>
                <p>
                  We started with a small team of certified technicians and a big vision: to make phone 
                  repair as convenient as ordering food delivery.
                </p>
                <p>
                  Today, we've repaired over 10,000 phones across 50+ cities, maintaining our commitment 
                  to quality, convenience, and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center"
                alt="Our team at work"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-20">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              Why Choose PhoneDoor?
            </h2>
            <p className="copy-lg text-white/70 max-w-2xl mx-auto">
              We combine convenience with quality to deliver the best phone repair experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 transform hover:scale-105"
              >
                <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{member.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {member.description}
                </p>
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
              Ready to experience the difference?
            </h2>
            <p className="copy-lg text-white/70 mb-8">
              Book your repair appointment and see why thousands of customers choose PhoneDoor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="btn btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Book Now
              </a>
              <a
                href="/how-it-works"
                className="btn btn-outline transform transition-all duration-300 hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

