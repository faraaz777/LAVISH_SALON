import  { useState } from "react";
import bookingimg from "../assets/booking.png";

export default function SalonBooking() {
  const fillDemoData = () => {
  
    setFormData({
      name: "Ahmed",
      email: "ahmed@example.com",
      phone: "1234567789",
      service: "Haircut",
      date: new Date().toISOString().split("T")[0],
      time: "11:00 AM - 12:00 PM",
      price: services["Haircut"],
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    price: 0,
  });

  // Services with prices
  const services = {
    Haircut: 300,
    Facial: 500,
    Manicure: 400,
    Pedicure: 450,
  };
  const redirectToHome = () => {
    window.location.href = "/";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "service") {
      setFormData({ ...formData, service: value, price: services[value] || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Create order on backend
    const res = await fetch("https://lavish-salon.onrender.com/api/bookings/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: formData.date,
        time: formData.time,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert("❌ Failed to create order: " + data.message);
      return;
    }

    // Razorpay options
    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: "Lavish Salon",
      description: `Booking for ${formData.service} at ${formData.time}`,
      order_id: data.order.id,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#3399cc" },
      handler: async function (response) {
        // Verify payment on backend
        const verifyRes = await fetch("https://lavish-salon.onrender.com/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: data.bookingId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert(
            `✅ Payment Verified!\nBooking Confirmed for ${formData.name}\nService: ${formData.service}\nTime: ${formData.time}\nAmount: ₹${formData.price}\nPayment ID: ${response.razorpay_payment_id}`
          );
redirectToHome();

        } else {
          alert("⚠️ Payment verification failed. Please contact support.");
        }
      },
    };

    // open Razorpay
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Generate time slots between 10AM - 6PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 17; hour++) {
      const startHour = hour > 12 ? hour - 12 : hour;
      const endHour = hour + 1 > 12 ? hour + 1 - 12 : hour + 1;
      const suffix = hour >= 12 ? "PM" : "AM";
      const nextSuffix = hour + 1 >= 12 ? "PM" : "AM";
      slots.push(`${startHour}:00 ${suffix} - ${endHour}:00 ${nextSuffix}`);
    }
    return slots;
  };

  return (
    <section className="min-h-screen flex">
      <div className="w-1/3 hidden md:block">
        <img
          src={bookingimg}
          alt="Salon"
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>

      <div className="w-2/3 flex items-center justify-center  ">
        <button
          className="w-10 h-10 border-2 border-gray-300 flex justify-center items-center rounded-full absolute top-4 left-1/3 mx-5 "
          onClick={() => {
            redirectToHome();
          }}
        >
          {"X"}
        </button>
        <div className="bg-white shadow-lg rounded-xl p-8 w-7/12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Salon Booking Form
          </h2>

          <form onSubmit={handlePayment} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Your Name"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Your Phone"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              >
              <option value="">Select Service</option>
              {Object.keys(services).map((service, idx) => (
                <option key={idx} value={service}>
                  {service} - ₹{services[service]}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
              />

            <select
              name="time"
              onChange={handleChange}
              required
              value={formData.time}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Time Slot</option>
              {generateTimeSlots().map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-1/2 bg-stone-950 text-white py-2  rounded-lg font-semibold hover:bg-slate-700 transition"
              disabled={formData.price === 0}
            >
              Book & Pay ₹{formData.price || ""}
            </button>
              <button
              type="button"
              onClick={fillDemoData}
              className="w-1/2 bg-pink-500 text-white px-4  font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Demo
            </button>
          </form>
       

        </div>


      </div>
    </section>
  );
}
