import { motion } from "framer-motion";
import { FaBook, FaWarehouse, FaTruck, FaHome } from "react-icons/fa";

const steps = [
  {
    icon: <FaBook />,
    title: "Choose Your Book",
    text: "Browse thousands of books added by verified librarians.",
  },
  {
    icon: <FaWarehouse />,
    title: "Library Processing",
    text: "The library prepares your book securely for delivery.",
  },
  {
    icon: <FaTruck />,
    title: "Courier Dispatch",
    text: "Our courier picks up and tracks the delivery in real time.",
  },
  {
    icon: <FaHome />,
    title: "Delivered to You",
    text: "Books arrive safely at your doorstep.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-red-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-14">
          How <span className="text-red-700">BookCourier</span> Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-red-800 text-4xl mb-4 flex justify-center">
                {step.icon}
              </div>
              <h3 className="font-semibold text text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
