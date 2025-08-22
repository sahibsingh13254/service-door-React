import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Screen Repair",
    description: "Cracked or broken screens replaced with genuine parts",
    price: "From ₹2,999",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&crop=center",
    features: ["Genuine parts", "Same-day service", "6-month warranty"]
  },
  {
    title: "Battery Replacement",
    description: "Restore your phone's battery life to like-new condition",
    price: "From ₹1,499",
    icon: "🔋",
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=200&h=200&fit=crop&crop=center",
    features: ["OEM batteries", "30-minute service", "1-year warranty"]
  },
  {
    title: "Camera Repair",
    description: "Fix blurry photos and camera issues",
    price: "From ₹2,199",
    icon: "📸",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop&crop=center",
    features: ["Professional tools", "Quality tested", "Warranty included"]
  },
  {
    title: "Water Damage",
    description: "Emergency water damage recovery and repair",
    price: "From ₹2,499",
    icon: "💧",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop&crop=center",
    features: ["24/7 emergency", "Data recovery", "Full diagnostics"]
  },
  {
    title: "TV Repair",
    description: "Professional TV repair for all brands and models",
    price: "From ₹1,999",
    icon: "📺",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop&crop=center",
    features: ["All brands", "Home service", "90-day warranty"]
  },
  {
    title: "Camera Equipment",
    description: "DSLR, mirrorless camera repair and maintenance",
    price: "From ₹3,499",
    icon: "📷",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop&crop=center",
    features: ["Expert technicians", "Genuine parts", "1-year warranty"]
  },
  {
    title: "Laptop Repair",
    description: "Complete laptop repair and maintenance services",
    price: "From ₹2,999",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&crop=center",
    features: ["Hardware repair", "Software issues", "Data recovery"]
  },
  {
    title: "Tablet Repair",
    description: "iPad and Android tablet repair services",
    price: "From ₹2,499",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop&crop=center",
    features: ["Screen replacement", "Battery service", "Port repair"]
  }
];

export default function Services() {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!servicesRef.current) return;

    // Animate service cards with stagger
    const cards = servicesRef.current.querySelectorAll(".service-card");
    
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={servicesRef}>
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-4">
          Professional Repairs
        </h2>
        <p className="copy-lg text-white/70 max-w-2xl mx-auto">
          From cracked screens to water damage, we handle all types of phone repairs with precision and care.
        </p>
      </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 transform hover:scale-105"
            >
              <div className="w-16 h-16 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-white/70 text-sm mb-4">{service.description}</p>
              <div className="text-2xl font-bold text-white mb-4">{service.price}</div>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-xs text-white/60 flex items-center">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href="/book" 
                className="block w-full mt-6 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 text-sm font-medium text-center"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
    </div>
  );
} 