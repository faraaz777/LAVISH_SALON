function Footer() {
  return (
    <footer className="mt-16 bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Lavish.</h3>
          <p>© 2025 Lavish Hair Salon. All Rights Reserved.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Useful Links</h4>
          <ul className="space-y-1">
            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/book" className="hover:underline">
                Book a Seat
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contact Info</h4>
          <p>🕒 Mon–Sat 9:00 AM – 10:00 PM</p>
          <p>📞 +91-123456789</p>
          <p>📍 Mehdipatnam, Hyderabad</p>
          <p>📧 lavishsalon@gmail.com</p>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-400">
        Social links and icons can go here
      </div>
    </footer>
  );
}
export default Footer;
