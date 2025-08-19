import React from "react";

import welimg from "../assesst/welimg.jpg";
export default function Welcome() {
  return (
    <section
      id="about"
      className="mt-16 px-6 py-16 text-center  mx-auto grid  grid-cols-2"
    >
      <h2 className="text-4xl font-bold mb-4 flex items-center  text-left justify-center">
        WELCOME TO <br />
        LAVISH SALON SALOON
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed max-w-xl mx-auto text-start">
        Welcome to <strong>Lavish Salon</strong>, where beauty and luxury
        converge. Our expert stylists are committed to enhancing your unique
        style with personalized care. Whether it's a chic haircut, vibrant
        color, or a relaxing spa treatment, we ensure every visit leaves you
        refreshed and confident. Step into our modern space, and let us pamper
        you with top-notch service and premium products. Your beauty is our
        passion.
      </p>
      <div className="col-span-2 flex justify-center mt-16">
        <img
          src={welimg}
          alt="Welcome to Lavish Salon"
          className=" pt-16  w-full max-w-7xl lg:ml-10"
        />
      </div>
    </section>
  );
}
