// App.jsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Welcome from "./components/welcome";
// import Services from "./components/Services";
// import Stylists from "./components/Stylists";
// import Testimonials from "./components/Testimonials";
// import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Welcome />
      <Services />
      <Stylists />
      <Testimonials />
      <Footer />
    </div>
  );
}
export default App;
// components/Hero.jsx



// components/Welcome.jsx


// components/Services.jsx

const serviceImages = ["/images/service1.jpg", "/images/service2.jpg", "/images/service3.jpg", "/images/service4.jpg"];

function Services() {
  return (
    <section className="px-6 py-16">
      <h2 className="text-center text-2xl font-bold mb-8">OUR SERVICES</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {serviceImages.map((src, index) => (
          <img key={index} src={src} alt={`Service ${index + 1}`} className="rounded-lg shadow-lg" />
        ))}
      </div>
    </section>
  );
}

// components/Stylists.jsx

const stylists = [
  { name: "SOPHIA MONROE", role: "COLOURIST", image: "/images/stylist1.jpg" },
  { name: "LILY CARTE", role: "STYLIST", image: "/images/stylist2.jpg" },
  { name: "EMMA DELGADO", role: "BARBER", image: "/images/stylist3.jpg" },
];

function Stylists() {
  return (
    <section className="px-6 py-16">
      <h2 className="text-center text-2xl font-bold mb-8">OUR STYLERS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stylists.map(({ name, role, image }, idx) => (
          <div key={idx} className="text-center">
            <img src={image} alt={name} className="w-full h-auto rounded-md shadow-md" />
            <div className="bg-black text-white mt-2 py-2 text-sm font-semibold">{name}</div>
            <p className="text-sm mt-1">{role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// components/Testimonials.jsx

function Testimonials() {
  return (
    <section className="px-6 py-16 text-center max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">WHAT OUR CLIENTS SAYS</h2>
      <blockquote className="text-gray-600 italic">
        “I had a fantastic experience at the salon! My stylist was friendly and gave me the perfect
        haircut. I will definitely be coming back.”
      </blockquote>
      <div className="mt-4 text-sm text-gray-700">
        <p className="font-semibold">Alice Johnson</p>
        <p>• Haircut</p>
      </div>
    </section>
  );
}

// components/Footer.jsx

function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Enrich.</h3>
          <p>© 2025 Enrich Hair Salon. All Rights Reserved.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Useful Links</h4>
          <ul className="space-y-1">
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/book" className="hover:underline">Book a Seat</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contact Info</h4>
          <p>🕒 Mon–Sat 9:00 AM – 10:00 PM</p>
          <p>📞 +91-9876543217</p>
          <p>📍 Mehdipatnam, Hyderabad</p>
          <p>📧 enrichsalon@gmail.com</p>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-400">Social links and icons can go here</div>
    </footer>
  );
}