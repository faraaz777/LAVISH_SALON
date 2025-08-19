import img1 from "../assesst/image1.jpg";
import img2 from "../assesst/image2.jpg";
import img3 from "../assesst/image3.jpg";
import img4 from "../assesst/image4.jpg";

const serviceImages = [img1, img2, img3, img4];
function Services() {
  return (
    <section id="services" className="px-6 py-16 ">
      <h2 className="text-center text-2xl font-bold mb-16  ">OUR SERVICES</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {serviceImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Service ${index + 1}`}
            className="rounded-lg shadow-lg w-full h-full"
          />
        ))}
      </div>
    </section>
  );
}
export default Services;
