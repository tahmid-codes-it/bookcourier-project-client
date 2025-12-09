import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      title: "Borrow Books From Nearby Libraries",
      desc: "Request pick-up or delivery of any available book from partnered libraries.",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      title: "Fast & Reliable Book Delivery",
      desc: "Get books delivered to your home quickly and easily with BookCourier.",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      title: "Perfect For Students & Researchers",
      desc: "Save time by returning and borrowing books without visiting the library.",
    },
  ];

  return (
    <div className="pt-24"> 
      {/* top padding because navbar is fixed */}
      
      <div className="carousel w-full h-[450px] rounded-lg shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
          >
            {/* Background Image */}
            <img
              src={slide.img}
              className="w-full object-cover brightness-75"
              alt={slide.title}
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-start justify-center p-10 text-white">
              <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg mb-6 max-w-xl drop-shadow-lg">
                {slide.desc}
              </p>

              <Link
                to="/books"
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
              >
                View All Books
              </Link>
            </div>

            {/* Slider Buttons */}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${index === 0 ? slides.length : index}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${index === slides.length - 1 ? 1 : index + 2}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

