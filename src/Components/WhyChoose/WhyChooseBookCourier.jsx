import { motion } from "framer-motion";
import {
  FaTruck,
  FaBookOpen,
  FaMapMarkedAlt,
  FaUserShield,
} from "react-icons/fa";

const reasons = [
  {
    icon: <FaBookOpen />,
    title: "Curated by Librarians",
    description:
      "Every book is added and maintained by verified librarians — no random sellers, no low-quality listings.",
  },
  {
    icon: <FaTruck />,
    title: "Book-Safe Delivery",
    description:
      "We treat books like valuables. Secure packaging, real-time tracking, and careful handling.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Nationwide Coverage",
    description:
      "From major cities to remote districts — BookCourier reaches readers everywhere.",
  },
  {
    icon: <FaUserShield />,
    title: "Reader-First Platform",
    description:
      "Transparent pricing, order tracking, easy cancellation — built for book lovers.",
  },
];

const WhyChooseBookCourier = () => {
  return (
    <section className="py-20 bg-bl ">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        {/* LEFT VISUAL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center"
        >
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-red-800 to-red-600 flex items-center justify-center text-white shadow-xl">
            <FaTruck size={80} />
            <span className="absolute -top-6 text-sm font-semibold">
              From Shelf to Doorstep
            </span>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold ">
            Why Choose <span className="text-red-800">BookCourier</span>
          </h2>

          <p className="text-gray-500 max-w-lg">
            We are not just another book store. We are a delivery-first platform
            designed specifically for books and readers.
          </p>

          <div className="space-y-4">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="flex gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="text-red-800 text-2xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold  text text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBookCourier;
