import { useState } from "react";
import bookingimg from "../assets/booking.png";

export default function SalonBooking() {
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

    const res = await fetch(
      "https://lavish-salon.onrender.com/api/bookings/create-order",
      {
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
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert("❌ Failed to create order: " + data.message);
      return;
    }

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
        const verifyRes = await fetch(
          "https://lavish-salon.onrender.com/api/payments/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingId: data.bookingId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }
        );

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
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section (Hidden on Mobile) */}
      <div className="md:w-1/2 hidden md:block">
        <img
          src={bookingimg}
          alt="Salon"
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center relative bg-gray-50 p-6 sm:p-8">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 md:top-6 md:right-6 border border-gray-300 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
          onClick={redirectToHome}
        >
          ✕
        </button>

        <div className="bg-white shadow-xl rounded-xl w-full sm:w-11/12 md:w-4/5 lg:w-3/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
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
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Your Phone"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
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
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="">Select Time Slot</option>
              {generateTimeSlots().map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            {/* Buttons in 2 columns on larger screens, stacked on mobile */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={formData.price === 0}
                className="flex-1 bg-stone-900 text-white py-2 rounded-lg font-semibold hover:bg-stone-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Book & Pay ₹{formData.price || ""}
              </button>

              <button
                type="button"
                onClick={fillDemoData}
                className="flex-1 bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
              >
                Demo
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
