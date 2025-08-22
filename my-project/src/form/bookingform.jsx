import React, { useState } from "react";

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

  // Step 1: Create order on backend
  const res = await fetch("http://localhost:8000/api/bookings/create-order", {
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

  // Step 2: Razorpay options
  const options = {
    key: data.key,
    amount: data.amount,
    currency: data.currency,
    name: "Lavish Salon",
    description: `Booking for ${formData.service} at ${formData.time}`,
    order_id: data.order.id,
    handler: async function (response) {
      // Step 3: Verify payment on backend
      const verifyRes = await fetch("http://localhost:8000/api/bookings/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      } else {
        alert("⚠️ Payment verification failed. Please contact support.");
      }
    },
    prefill: {
      name: formData.name,
      email: formData.email,
      contact: formData.phone,
    },
    theme: {
      color: "#ff4081",
    },
  };

  // Step 4: Open Razorpay
  const rzp = new window.Razorpay(options);
  rzp.open();
};


  // Generate time slots between 10AM - 6PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 17; hour++) {
      const startHour = hour > 12 ? hour - 12 : hour;
      const endHour = (hour + 1) > 12 ? (hour + 1) - 12 : (hour + 1);
      const suffix = hour >= 12 ? "PM" : "AM";
      const nextSuffix = hour + 1 >= 12 ? "PM" : "AM";

      slots.push(`${startHour}:00 ${suffix} - ${endHour}:00 ${nextSuffix}`);
    }
    return slots;
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Salon Booking Form
      </h2>
      <form onSubmit={handlePayment} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />

        {/* Service & Price */}
        <select
          name="service"
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

        {/* Show Price */}
        {formData.price > 0 && (
          <div className="p-3 bg-gray-100 rounded-lg text-center font-semibold">
            Price: ₹{formData.price}
          </div>
        )}

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />

        <select
          name="time"
          onChange={handleChange}
          required
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
          className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
          disabled={formData.price === 0}
        >
          Book & Pay ₹{formData.price || ""}
        </button>
      </form>
    </div>
  );
}
