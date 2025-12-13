const stats = [
  { value: "25K+", label: "Books Delivered" },
  { value: "1.2K+", label: "Libraries Connected" },
  { value: "64+", label: "Cities Covered" },
  { value: "98%", label: "Happy Readers" },
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text mb-4">Trusted Across the Country</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Libraries, readers, and institutions rely on BookCourier to move
          knowledge safely and efficiently.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-red-800">{stat.value}</h3>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
