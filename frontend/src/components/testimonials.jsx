import { useState, useEffect } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "I had a fantastic experience at the salon! My stylist was friendly and gave me the perfect haircut. I will definitely be coming back.",
      name: "Alice Johnson",
      service: "Haircut",
    },
    {
      quote:
        "The staff is amazing and my hair has never looked better! Highly recommend for coloring.",
      name: "Michael Smith",
      service: "Hair Coloring",
    },
    {
      quote:
        "Best salon in town! The ambience, the people, and the service are top-notch.",
      name: "Sophie Williams",
      service: "Makeup",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      className="px-6 py-16 text-center max-w-7xl mx-auto overflow-hidden"
    >
      <h2 className="text-4xl font-bold mb-12  ">WHAT OUR CLIENTS SAY</h2>

      <div className="relative w-full">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full px-4">
              <blockquote className="text-gray-600 italic">
                “{t.quote}”
              </blockquote>
              <div className="mt-4 text-sm text-gray-700">
                <p className="font-semibold">{t.name}</p>
                <p>• {t.service}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-black" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
