// App.jsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Welcome from "./components/welcome";
import Services from "./components/Services";
import Stylists from "./components/stylist";
import Footer from "./components/footer";
import BookingForm from "./form/bookingform";
import Testimonials from "./components/testimonials";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Welcome />
      <Services />
      <Stylists />
      <Testimonials />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/booking" element={<BookingForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
