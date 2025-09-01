import img from "../assets/hrimg.jpg";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen bg-black text-white">
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
        <img
          src={img}
          alt="Salon Hero"
          className="absolute inset-0 w-full h-full object-cover z-0 "
        />

        <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 md:px-24">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            BEAUTY & <br /> HAIR SALON
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            CHANGE YOUR LOOK WITH OUR TALENTED STYLISTS.
          </p>
          <Link to="/booking" className="mt-6">
            <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full">
              BOOK A SEAT
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
