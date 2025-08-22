import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CTA from "../components/CTA";
import ServiceSteps from "../components/ServiceSteps";
import FeatureRow from "../components/sections/FeatureRow";
import Services from "../components/sections/Services";
import FAQ from "../components/sections/FAQ";
import { useSmoothAnimations } from "../hooks/useSmoothAnimations";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize smooth scrolling
  useSmoothAnimations();

  useEffect(() => {
    // Set loaded state after a short delay to ensure everything is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div data-scroll-section>
      {/* Hero section */}
      <Hero />

      {/* Feature row: text + image split */}
      <section id="features" className="bg-black">
        <div className="container-page py-8">
          <FeatureRow />
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="bg-black">
        <div className="container-page py-8">
          <Services />
        </div>
      </section>

      {/* Call to action */}
      <section id="book" className="bg-black">
        <div className="container-page py-8">
          <CTA />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-black">
        <div className="container-page py-8">
          <FAQ />
        </div>
      </section>
    </div>
  );
}
