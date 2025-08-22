import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How long does a typical repair take?",
    answer: "Most repairs are completed within 30-60 minutes. Screen repairs and battery replacements are typically done on the spot, while more complex repairs may take 1-2 hours."
  },
  {
    question: "Do you use genuine parts?",
    answer: "Yes, we use only genuine OEM parts or high-quality aftermarket parts that meet or exceed original specifications. All parts come with warranty coverage."
  },
  {
    question: "What areas do you service?",
    answer: "We provide mobile repair services throughout the city and surrounding areas. Contact us to confirm availability in your specific location."
  },
  {
    question: "Do you offer warranty on repairs?",
    answer: "Yes, all our repairs come with a minimum 6-month warranty. Screen repairs and battery replacements have extended warranty coverage."
  },
  {
    question: "Can you repair water-damaged phones?",
    answer: "Yes, we specialize in water damage recovery. Success rates depend on the extent of damage and how quickly you bring it in. We offer free diagnostics."
  },
  {
    question: "Do I need to make an appointment?",
    answer: "While walk-ins are welcome, we recommend booking an appointment to ensure availability and reduce wait times. Same-day appointments are often available."
  }
];

export default function FAQ() {
  const faqRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!faqRef.current) return;

    // Animate FAQ items with stagger
    const faqItems = faqRef.current.querySelectorAll(".faq-item");
    
    gsap.fromTo(
      faqItems,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={faqRef}>
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="copy-lg text-white/70 max-w-2xl mx-auto">
          Everything you need to know about our mobile repair services.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className={`text-2xl transition-transform duration-300 ${
                openIndex === index ? 'rotate-45' : 'rotate-0'
              }`}>
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 text-white/70 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-white/60 mb-4">Still have questions?</p>
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 text-sm font-medium"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
} 