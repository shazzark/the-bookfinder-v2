// src/pages/About.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PrimaryButton from "../components/button/PrimaryButton";
import { useNavigate } from "react-router-dom";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AboutUs() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/discover");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b   to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-primary-600">BookFinder</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting readers with their next great adventure through the
            world's largest book discovery platform.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-6">
              <span className="text-3xl text-blue-600">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              To make book discovery effortless and help readers find exactly
              what they're looking for, whether it's their next favorite novel,
              a research resource, or a childhood classic.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mt-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "🔍",
                title: "Discover",
                description:
                  "Explore millions of books from global libraries and publishers",
              },
              {
                icon: "📖",
                title: "Preview",
                description:
                  "Read previews and excerpts before you decide to get the book",
              },
              {
                icon: "📚",
                title: "Access",
                description:
                  "Direct links to get books from various sources and retailers",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How BookFinder Works
          </h2>

          <motion.div
            className="space-y-10 max-w-3xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "1",
                title: "Search & Discover",
                description:
                  "Use our powerful search to find books by title, author, genre, or keywords. Browse curated collections and recommendations tailored to your interests.",
              },
              {
                step: "2",
                title: "Read Previews",
                description:
                  "Access free previews, excerpts, and sample chapters to help you decide if a book is right for you before committing to read it.",
              },
              {
                step: "3",
                title: "Get Your Book",
                description:
                  "Find direct links to purchase, borrow, or access books from various sources including online retailers, local libraries, and digital platforms.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-start"
                variants={fadeIn}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full flex-shrink-0 mb-4 md:mb-0 md:mr-6 text-lg font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {[
            { number: "10M+", label: "Books" },
            { number: "100K+", label: "Users" },
            { number: "25+", label: "Genres" },
            { number: "24/7", label: "Access" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center"
              variants={fadeIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="text-2xl md:text-3xl font-bold text-black mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-gradient-to-r from-primary-400 to-primary-300 rounded-2xl p-10 md:p-14 text-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Ready to Discover Your Next Favorite Book?
          </h2>
          <p className="text-black mb-8 max-w-2xl mx-auto">
            Join thousands of readers who find their next great read with
            BookFinder every day.
          </p>
          <PrimaryButton
            onClick={handleExploreClick}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
          >
            Start Exploring Now
          </PrimaryButton>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            CONNECTING READERS WITH GREAT BOOKS SINCE 2023
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs;
