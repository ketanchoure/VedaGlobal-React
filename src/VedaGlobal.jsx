import React, { useEffect } from "react";

const VedaGlobal = () => {
  useEffect(() => {
    const gsapScript = document.createElement("script");
    gsapScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js";
    gsapScript.async = true;
    document.body.appendChild(gsapScript);

    const scrollTriggerScript = document.createElement("script");
    scrollTriggerScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js";
    scrollTriggerScript.async = true;
    document.body.appendChild(scrollTriggerScript);

    gsapScript.onload = () => {
      if (window.gsap) {
        const gsap = window.gsap;
        const { ScrollTrigger } = window;

        gsap.registerPlugin(ScrollTrigger);

        // ✅ Page4 slideshow effect
        const images = document.querySelectorAll(".page4 .slide-img");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".page4",
            start: "top top",
            end: "+=6000", // adjust for longer/shorter scroll
            scrub: true,
            pin: true,
          },
        });

        images.forEach((img, i) => {
          tl.to(img, { opacity: 1, duration: 0.1 }, i)
            .to(img, { opacity: 0, duration: 0.5 }, i + 0.9);
        });
      }
    };

    // ✅ Menu toggle
    const menuOverlay = document.getElementById("menuOverlay");
    document.getElementById("openMenu")?.addEventListener("click", () => {
      menuOverlay.classList.remove("hidden");
    });
    document.getElementById("closeMenu")?.addEventListener("click", () => {
      menuOverlay.classList.add("hidden");
    });

    // ✅ Quote modal toggle
    const modal = document.getElementById("quoteModal");
    document.getElementById("openQuote")?.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
    document.getElementById("closeQuote")?.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className="font-sans text-gray-900">
        {/* Page 1 */}
        <div className="relative h-screen flex flex-col justify-between">
          {/* Background */}
          <img
            id="bgImage"
            src="./images/ship.jpg"
            alt="Ship"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Top */}
          <div className="relative z-10 flex items-center justify-between p-6">
            <h1 className="text-white text-4xl font-bold">Veda Global</h1>
            <button
              id="openQuote"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2"
            >
              Get Quote <i className="ri-arrow-right-up-line"></i>
            </button>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex flex-col items-center text-center gap-4 p-6">
            <h3 className="text-white text-2xl font-semibold">
              Premium Indian Spices and Honey, Delivered Globally
            </h3>
            <button
              id="openMenu"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              Menu <i className="ri-menu-fill"></i>
            </button>
            <h4 className="text-white text-lg max-w-2xl">
              Delivering premium Indian spices and honey with integrity
              worldwide.
            </h4>
          </div>
        </div>

        {/* Page 2 */}
        <div className="page2 bg-white py-20 px-6 text-center">
          <h4 className="text-xl md:text-2xl font-medium text-gray-700 max-w-4xl mx-auto">
            Welcome to the vibrant world of Veda Global, where the richness of
            Indian spices, cardamom, and honey is thoughtfully harvested and
            carefully delivered to your doorstep.
          </h4>
        </div>

        {/* Page 3 */}
        <div className="page3 py-20 px-6 bg-gray-50">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="flex gap-4">
              <img
                src="./images/greenchilli.jpg"
                alt="Green Chilli"
                className="w-1/2 h-64 object-cover rounded-xl shadow-lg"
              />
              <img
                src="./images/onion.jpg"
                alt="Onion"
                className="w-1/2 h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Experience the authentic flavors and natural goodness sourced
              directly from fertile lands and crafted with unwavering honesty
              and trust.
            </p>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold">Choose us</h2>
            <h2 className="text-2xl font-semibold mt-2">
              The Best in the Business
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our commitment to quality and sustainability ensures that every
              product reflects the true essence of nature, making your culinary
              journey exceptional and memorable.
            </p>
          </div>
        </div>

        {/* Page 4 - Slideshow */}
        <div className="page4 relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          {/* Images for slideshow */}
          <img
            src="./images/honey.jpg"
            alt="Honey"
            className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
          />
          <img
            src="./images/greenchilli.jpg"
            alt="Green Chilli"
            className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
          />
          <img
            src="./images/onion.jpg"
            alt="Onion"
            className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
          />
          <img
            src="./images/coconut.jpg"
            alt="Coconut"
            className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
          />
          <img
            src="./images/redchilli.jpg"
            alt="Red Chilli"
            className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
          />
          <img
            src="./images/cardamom.jpg"
            alt="Cardamom"
            className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
          />
        </div>

        {/* ✅ Page 5 - Contact Us */}
        <div
          id="contact"
          className="page5 bg-gray-100 py-20 px-6 text-center min-h-screen flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            📩 Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Have questions or need a quote? Get in touch with us today.
          </p>

          <form className="max-w-2xl mx-auto space-y-4 bg-white shadow-lg p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border rounded-lg px-4 py-2"
            />
            <textarea
              rows="5"
              placeholder="Message"
              className="w-full border rounded-lg px-4 py-2"
            ></textarea>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      <div
        id="quoteModal"
        className="fixed inset-0 hidden items-center justify-center bg-black/50 z-50"
      >
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
          <button
            id="closeQuote"
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-center mb-2">
            🚢 Get Your Free Quote!
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Fill in your details and our team will reach out soon.
          </p>
          <form className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Name"
                className="w-1/2 border rounded-lg px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-1/2 border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Phone"
                className="w-1/2 border rounded-lg px-3 py-2"
              />
              <select className="w-1/2 border rounded-lg px-3 py-2">
                <option>Country</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Company"
                className="w-1/2 border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Quantity"
                className="w-1/2 border rounded-lg px-3 py-2"
              />
            </div>
            <textarea
              placeholder="Message"
              rows="3"
              className="w-full border rounded-lg px-3 py-2"
            ></textarea>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg">
              Submit Request
            </button>
          </form>
        </div>
      </div>

      {/* Overlay Menu */}
      <div
        id="menuOverlay"
        className="fixed inset-0 hidden bg-black/70 z-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-xl shadow-lg p-8 relative w-80">
          <button
            id="closeMenu"
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
          <ul className="space-y-4 text-lg font-medium">
            <li>
              <a href="#home" className="hover:text-yellow-500">
                🏠 Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-yellow-500">
                ℹ️ About Us
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-yellow-500">
                🌿 Products
              </a>
            </li>
            <li>
              <a href="#quality" className="hover:text-yellow-500">
                ✅ Quality Standards
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-500">
                📩 Contact Us
              </a>
            </li>
            <li>
              <a href="#quote" className="hover:text-yellow-500">
                💬 Get a Quote
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VedaGlobal;
