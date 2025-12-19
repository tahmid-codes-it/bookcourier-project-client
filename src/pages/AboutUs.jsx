import React from "react";
import { useTheme } from "../context/ThemeContext";
import aboutImg from "../assets/book_stack.png";

const AboutUs = () => {
  const { dark } = useTheme();

  return (
    <div
      className={`min-h-screen px-6 py-12 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .floating {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Container */}
      <div
        className={`max-w-6xl mx-auto rounded-2xl shadow-xl p-8 md:p-12
        ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4">About BookCourier</h1>
          <p className="opacity-80 max-w-2xl mx-auto">
            Delivering books from libraries to your doorstep with care,
            speed, and reliability.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <img
            src={aboutImg}
            alt="Books"
            className="floating w-full max-h-[350px] object-contain"
          />

          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="opacity-80 leading-relaxed">
              BookCourier aims to bridge the gap between libraries and readers.
              Our mission is to make books easily accessible to everyone by
              providing a fast, affordable, and reliable delivery service.
              Whether you are a student, researcher, or book lover — we are
              here for you.
            </p>
          </div>
        </div>

        {/* Vision & Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Our Vision",
              text: "To become the most trusted book delivery platform, connecting readers with libraries worldwide.",
            },
            {
              title: "Our Values",
              text: "Knowledge, reliability, transparency, and customer satisfaction are at the heart of everything we do.",
            },
            {
              title: "Our Commitment",
              text: "We ensure safe handling of books and timely delivery while supporting libraries and education.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-md transition-transform hover:-translate-y-2
              ${dark ? "bg-gray-700" : "bg-gray-50"}`}
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="opacity-80">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">
            Why Choose BookCourier?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Fast & Secure Delivery",
              "Trusted Library Partners",
              "Affordable Pricing",
              "User-Friendly Platform",
            ].map((reason, index) => (
              <div
                key={index}
                className={`py-6 rounded-xl font-semibold shadow-sm
                ${dark ? "bg-gray-700" : "bg-gray-100"}`}
              >
                {reason}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
