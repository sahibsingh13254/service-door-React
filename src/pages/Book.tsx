import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Book() {
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    deviceModel: "", 
    issue: "", 
    address: "", 
    timeslot: "" 
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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

    // Animate title and form
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
    )
    .fromTo(
      ".booking-form",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.4"
    );
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setStatus("loading");
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus("success");
      setForm({ name: "", phone: "", deviceModel: "", issue: "", address: "", timeslot: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-black">
      <section className="py-20">
        <div className="container-page max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="page-title text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
              Book a Technician
            </h1>
            <p className="page-subtitle copy-lg text-white/70">
              Fill out the form below and our certified technician will arrive at your doorstep.
            </p>
          </div>

          <div className="booking-form bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <form onSubmit={submit} className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                  <input 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
                    name="name" 
                    placeholder="Enter your full name" 
                    value={form.name} 
                    onChange={onChange} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Phone Number</label>
                  <input 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
                    name="phone" 
                    placeholder="Enter your phone number" 
                    value={form.phone} 
                    onChange={onChange} 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Device Model</label>
                <input 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
                  name="deviceModel" 
                  placeholder="e.g., iPhone 13, Samsung Galaxy S21" 
                  value={form.deviceModel} 
                  onChange={onChange} 
                  required 
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Issue Description</label>
                <input 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
                  name="issue" 
                  placeholder="e.g., cracked screen, battery replacement" 
                  value={form.issue} 
                  onChange={onChange} 
                  required 
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Address</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 resize-none"
                  name="address" 
                  placeholder="Enter your complete address" 
                  value={form.address} 
                  onChange={onChange} 
                  rows={3}
                  required 
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Preferred Time Slot</label>
                <input 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
                  name="timeslot" 
                  placeholder="e.g., Tomorrow 3-5 PM" 
                  value={form.timeslot} 
                  onChange={onChange} 
                  required 
                />
              </div>

              <button 
                className="w-full bg-white text-black px-6 py-4 rounded-lg font-semibold hover:bg-white/90 transform transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed" 
                disabled={status === "loading"}
              >
                {status === "loading" ? "Booking..." : "Confirm Booking"}
              </button>

              {status === "success" && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center">
                  Booked successfully! We will contact you shortly to confirm your appointment.
                </div>
              )}
              
              {status === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              Need help? Call us at <span className="text-white">+91 98765 43210</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}