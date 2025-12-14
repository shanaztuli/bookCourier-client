import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    title: "Discover Your Next Favorite Book",
    description:
      "Explore thousands of books delivered safely and quickly to your doorstep.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    id: 2,
    title: "Fast & Reliable Book Delivery",
    description:
      "From libraries to your home — BookCourier delivers knowledge with care.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    id: 3,
    title: "Read More, Worry Less",
    description:
      "Choose from a wide range of books and enjoy seamless delivery.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
];

const HomeBanner = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[70vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full bg-cover bg-center relative flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
          
              <div className="absolute inset-0 bg-black/60" />

              {/* Content */}
              <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="max-w-xl text-lg mb-6">{slide.description}</p>
                <Link
                  to="/allBooks"
                  className="inline-block btn-primary transition px-6 py-3 rounded-md font-semibold"
                >
                  Browse All Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
