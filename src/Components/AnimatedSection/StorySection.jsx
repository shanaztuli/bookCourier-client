const StorySection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-800 to-red-950 text-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4">
            From Library Shelf to Your Door
          </h2>
          <p className="text-gray-200 mb-6">
            BookCourier connects readers with libraries, ensuring books travel
            safely, quickly, and responsibly — no matter where you live.
          </p>
          <ul className="space-y-3 text-sm">
            <li>✔ Handled by verified libraries</li>
            <li>✔ Secure packaging for books</li>
            <li>✔ Nationwide delivery network</li>
            <li>✔ Reader-first experience</li>
          </ul>
        </div>

        <div className="bg-white/10 p-8 rounded-xl backdrop-blur">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
            alt="Books delivery"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default StorySection;
