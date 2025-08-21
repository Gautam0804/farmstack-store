import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Globe } from "lucide-react";

// Motion Variants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home = () => {
  const navigate = useNavigate();

  const handleJoin = (role) => {
    if (role === "buyer") navigate("/buyer/register");
    else if (role === "seller") navigate("/seller/register");
  };

  return (
    <div className="bg-green-50 font-sans">

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-lime-100 via-green-100 to-green-200 overflow-hidden px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl bg-white/30 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white/20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-800 drop-shadow-sm">
            Grow <span className="text-lime-500">Naturally</span>, Eat <span className="text-green-700">Fresh</span>
          </h1>
          <p className="text-lg md:text-xl text-green-900/80 mb-10 font-light tracking-wide">
            Welcome to <span className="font-semibold text-green-800">FarmStack</span> – your gateway to organic, local, and farm-fresh produce.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => handleJoin("buyer")}
              className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-green-50 hover:scale-105 transition transform hover:-translate-y-1"
            >
              🛒 BUYER
            </button>

            <button
              onClick={() => handleJoin("seller")}
              className="bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-green-700 hover:scale-105 transition transform hover:-translate-y-1"
            >
              🌾SELLER
            </button>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Section */}
      <section className="bg-white py-20 px-6 md:px-20">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-12"
        >
          🌿 Why Choose <span className="text-green-600">FarmStack</span>?
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-center"
        >
          {[
            { title: "100% Organic", desc: "Grown naturally without chemicals.", icon: "https://cdn-icons-png.flaticon.com/512/2909/2909592.png" },
            { title: "Pure & Healthy", desc: "Boost immunity with nutrient-rich foods.", icon: "https://cdn-icons-png.flaticon.com/512/4205/4205250.png" },
            { title: "Farm-Fresh", desc: "Delivered straight from farms daily.", icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png" },
            { title: "Support Local Farmers", desc: "Every purchase uplifts small farmers.", icon: "https://cdn-icons-png.flaticon.com/512/2060/2060781.png" },
            { title: "Affordable Prices", desc: "Honest prices, no middlemen.", icon: "https://cdn-icons-png.flaticon.com/512/263/263115.png" },
            { title: "Eco-Friendly", desc: "Sustainable farming practices.", icon: "https://cdn-icons-png.flaticon.com/512/2903/2903720.png" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-lg shadow bg-green-50 border border-green-100 transition"
            >
              <img src={item.icon} alt={item.title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Who Benefits Section */}
      <section className="bg-green-50 py-20 px-6 md:px-20">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-12"
        >
          🌍 Who Benefits from <span className="text-green-600">FarmStack</span>?
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10"
        >
          {[
            { title: "Smallholder Farmers", desc: "Gain control of their data and share responsibly.", icon: "https://cdn-icons-png.flaticon.com/512/3076/3076401.png" },
            { title: "Extension Services", desc: "Match and send guidance to the right farmers.", icon: "https://cdn-icons-png.flaticon.com/512/3565/3565418.png" },
            { title: "Agricultural Ecosystem", desc: "Ecosystems benefit from aggregated, privacy-protected data.", icon: "https://cdn-icons-png.flaticon.com/512/854/854894.png" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl shadow-md p-8 border border-green-100 transition"
            >
              <img src={item.icon} alt={item.title} className="w-20 h-20 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-green-700 mb-3 text-center">{item.title}</h3>
              <p className="text-gray-600 text-center">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Impact Stats Section */}
      <section className="bg-white py-20 px-6 md:px-20">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-16"
        >
          📊 Our Impact
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-10 text-center"
        >
          {[
            { number: "5K+", label: "Happy Farmers" },
            { number: "20K+", label: "Satisfied Buyers" },
            { number: "50+", label: "Communities Served" },
            { number: "100%", label: "Organic Commitment" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.1 }}
              className="bg-green-50 rounded-2xl shadow-md p-10 border border-green-100"
            >
              <h3 className="text-4xl font-extrabold text-green-700 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-100 py-20 px-6 md:px-20">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-16"
        >
          🌟 Success Stories
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10"
        >
          {[
            { name: "Ramesh Kumar", role: "Farmer, Ranchi", story: "With FarmStack, I increased my crop yield by 25% last season. Platform connected me with real-time updates and guidance." },
            { name: "Gautam Yadav", role: "Agri Extension Officer", story: "FarmStack helps me reach farmers effectively, share best practices, and monitor adoption of sustainable methods." },
            { name: "EcoAgri NGO", role: "Partner Organization", story: "Empowered hundreds of smallholder farmers with data-driven solutions and better market linkages." },
          ].map((story, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
            >
              <p className="text-gray-600 italic mb-6">“{story.story}”</p>
              <h3 className="text-xl font-bold text-green-700">{story.name}</h3>
              <p className="text-sm text-green-600">{story.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Partners Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-20 px-6 md:px-20 overflow-hidden">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-16"
        >
          🤝 Our Trusted <span className="text-green-600">Partners</span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-10 items-center"
        >
          {[
            { name: "AgriTrust", logo: "https://placehold.co/200x100/4ade80/ffffff?text=AgriTrust" },
            { name: "GreenGrowth", logo: "https://placehold.co/200x100/22c55e/ffffff?text=GreenGrowth" },
            { name: "FarmAid", logo: "https://placehold.co/200x100/16a34a/ffffff?text=FarmAid" },
            { name: "CropConnect", logo: "https://placehold.co/200x100/15803d/ffffff?text=CropConnect" },
            { name: "AgroFuture", logo: "https://placehold.co/200x100/166534/ffffff?text=AgroFuture" },
          ].map((partner, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="w-48 h-32 rounded-3xl flex items-center justify-center p-4 bg-gradient-to-r from-green-200 to-lime-200 shadow-lg hover:shadow-xl hover:shadow-lime-400 transition-all transform hover:-translate-y-2"
            >
              <div className="bg-white rounded-full w-full h-full flex items-center justify-center p-4">
                <img src={partner.logo} alt={partner.name} className="max-h-16 object-contain transition-transform duration-300 hover:scale-105" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20 px-6 md:px-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-8">
            🌱 About <span className="text-green-600">FarmStack</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10">
            FarmStack is a digital platform empowering farmers, buyers, and 
            agricultural organizations. Our mission is to connect local producers 
            with communities, promote sustainability, and strengthen food security 
            with technology and trust.  
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-t from-green-900 via-green-800 to-green-900 text-gray-300 py-20 px-6 md:px-20 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-4">🌱 FarmStack</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering farmers, connecting buyers, and driving sustainable agriculture through technology and trust.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              📍 Ranchi, Jharkhand, India <br />
              📧 gautamprataapyadav.com <br />
              📞 +91 7091496503
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="text-gray-300 space-y-2">
              <li><Link to="/buyer/register" className="hover:text-lime-400">Join as Buyer</Link></li>
              <li><Link to="/seller/register" className="hover:text-lime-400">Join as Seller</Link></li>
              <li><Link to="/contact" className="hover:text-lime-400">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} FarmStack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
