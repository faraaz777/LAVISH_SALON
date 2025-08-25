import img1 from "../assets/style1.png";
import img2 from "../assets/style2.png";
import img3 from "../assets/style3.png";

const stylists = [
  { name: "SOPHIA MONROE", role: "COLOURIST", image: img1 },
  { name: "LILY CARTE", role: "STYLIST", image: img2 },
  { name: "EMMA DELGADO", role: "BARBER", image: img3 },
];

export default function Stylists() {
  return (
    <section id="staff" className="px-6 py-16">
      <h2 className="text-center text-2xl font-bold mb-8">OUR STYLERS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stylists.map(({ name, role, image }, idx) => (
          <div key={idx} className="text-center">
            <img
              src={image}
              alt={name}
              className="w-full h-auto rounded-md shadow-md"
            />
            <div className="bg-black text-white mt-2 py-2 text-sm font-semibold">
              {name}
            </div>
            <p className="text-sm mt-1">{role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
