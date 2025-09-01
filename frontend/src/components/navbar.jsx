import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["HOME", "ABOUT", "SERVICES", "STAFF", "TESTIMONIALS"];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-lg z-50">
      <div className=" mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold font-[Miniver]">LAVISH.</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-gray-300 transition"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Book Now Button */}
        <div className="hidden md:block">
          <a
            href="/booking"
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            BOOK NOW
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-2 hover:text-gray-300 transition"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="/booking"
            className="block py-2 font-bold hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            BOOK NOW
          </a>
        </div>
      )}
    </nav>
  );
}
