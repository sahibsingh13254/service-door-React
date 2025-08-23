import Hero from "../components/Hero";
import FeatureRow from "../components/sections/FeatureRow";
import Services from "../components/sections/Services";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureRow />
      <Services />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
