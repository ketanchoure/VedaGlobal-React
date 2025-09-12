import React, { useEffect, useState } from "react";
import "./VedaGlobal.css";
import axiosInstance from "./Axiosconfig";

const VedaGlobal = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form, e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/contact/create', form);

      setForm({ name: '', email: '', subject: '', message: '' });
      alert(res.data.message || 'message sent successfully!');
    } catch (e) {
      console.log(e)
      const errorMessage = e.response?.data?.error || 'Something went wrong. Please try again.';
      alert(errorMessage);
    }
  };

  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    quantity: '',
    message: ''
  });

  const handleQuoteChange = (e) => {
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value });
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/quote/create', quoteForm);
      alert(res.data.message || 'Quote request submitted successfully!');
      setQuoteForm({
        name: '',
        email: '',
        phone: '',
        country: '',
        company: '',
        quantity: '',
        message: ''
      });
      alert('request sent successfully!');
      setQuoteOpen(false); // Close modal after success
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.error || 'Failed to submit quote. Try again.';
      alert(errMsg);
    }
  };





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

        // Capsule loader animation
        const tl = gsap.timeline();
        tl.to(".loading", { width: "100%", duration: 0.7, delay: 0.3 })
          .to(".capsuleLogo", { scale: 2, duration: 0.5, opacity: 0 }, "a")
          .to(".capsul", { clipPath: "inset(0% 0% 0% 0%)" }, "a");

        // Background zoom
        gsap.timeline({
          scrollTrigger: {
            trigger: ".page1",
            start: "90% 80%",
            end: "155% 80%",
            scrub: true,
          },
        }).to("#bgImage", { scale: 1.05 });

        // Page4 slideshow with text
        const slides = gsap.utils.toArray(".slide");
        let slideTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".page4",
            start: "top top",
            end: "+=6000",
            scrub: true,
            pin: true,
          },
        });

        slides.forEach((slide, i) => {
          const img = slide.querySelector(".slide-img");
          const text = slide.querySelector(".slide-text");

          slideTl
            .to([img, text], { opacity: 1, duration: 0.5 }, i)
            .to([img, text], { opacity: 0, duration: 0.5 }, i + 0.9);
        });

      }
    };
  }, []);





  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className="font-sans text-gray-900">
        {/* Page 1 */}
        <div className="page1 relative h-screen flex flex-col justify-between overflow-hidden">
          {/* Capsule Loader */}
          <div className="capsuleBox">
            <div className="capsuleLogo">
              <h1>Veda Global</h1>
              <div className="loading"></div>
            </div>
          </div>

          {/* Background */}
          <div className="capsul bg-transparent relative flex flex-col h-full">
            <img
              id="bgImage"
              src="./images/ship.jpg"
              alt="Ship"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/50 z-10"></div>

            {/* Top Bar */}
            <div className="relative z-20 flex items-center justify-between p-6">
              <h1 className="text-white text-4xl md:text-6xl font-bold z-20">
                Veda Global
              </h1>
              <button
                onClick={() => setQuoteOpen(true)}
                className="bg-white hover:bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 z-20 relative"
              >
                Get Quote <i className="ri-arrow-right-up-line"></i>
              </button>
            </div>

            {/* Bottom Section */}
            <div className="relative z-20 flex flex-col items-center text-center gap-4 p-6 mt-auto">
              <h3 className="text-white text-2xl font-semibold z-20">
                Premium Indian Spices and Honey, Delivered Globally
              </h3>
              <button
                onClick={() => setMenuOpen(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 z-20 relative"
              >
                Menu <i className="ri-menu-fill"></i>
              </button>
              <h4 className="text-white text-lg max-w-2xl z-20">
                Delivering premium Indian spices and honey with integrity worldwide.
              </h4>
            </div>
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
        <div id="products" className="page3 py-20 px-6 bg-gray-50">
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
        </div>

        {/* Page 4 Slideshow */}
        <div className="page4 relative h-screen flex items-center justify-center text-white overflow-hidden">
          {/* Slide 1 */}
          <div className="slide absolute inset-0 w-full h-full flex items-center justify-center">
            <img
              src="./images/honey.jpg"
              alt="Honey"
              className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
            />
            <h2 className="slide-text absolute text-4xl md:text-6xl font-bold drop-shadow-lg opacity-0">
              Premium Honey
            </h2>
          </div>

          {/* Slide 2 */}
          <div className="slide absolute inset-0 w-full h-full flex items-center justify-center">
            <img
              src="./images/greenchilli.jpg"
              alt="Green Chilli"
              className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
            />
            <h2 className="slide-text absolute text-4xl md:text-6xl font-bold drop-shadow-lg opacity-0">
              Fresh Green Chilli
            </h2>
          </div>

          {/* Slide 3 */}
          <div className="slide absolute inset-0 w-full h-full flex items-center justify-center">
            <img
              src="./images/onion.jpg"
              alt="Onion"
              className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
            />
            <h2 className="slide-text absolute text-4xl md:text-6xl font-bold drop-shadow-lg opacity-0">
              Organic Onions
            </h2>
          </div>

          {/* Slide 4 */}
          <div className="slide absolute inset-0 w-full h-full flex items-center justify-center">
            <img
              src="./images/coconut.jpg"
              alt="Coconut"
              className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
            />
            <h2 className="slide-text absolute text-4xl md:text-6xl font-bold drop-shadow-lg opacity-0">
              Natural Coconuts
            </h2>
          </div>

          {/* Slide 5 */}
          <div className="slide absolute inset-0 w-full h-full flex items-center justify-center">
            <img
              src="./images/redchilli.jpg"
              alt="Red Chilli"
              className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
            />
            <h2 className="slide-text absolute text-4xl md:text-6xl font-bold drop-shadow-lg opacity-0">
              Red Chilli
            </h2>
          </div>

          {/* Slide 6 */}
          <div className="slide absolute inset-0 w-full h-full flex items-center justify-center">
            <img
              src="./images/cardamom.jpg"
              alt="Cardamom"
              className="slide-img absolute inset-0 w-full h-full object-cover opacity-0"
            />
            <h2 className="slide-text absolute text-4xl md:text-6xl font-bold drop-shadow-lg opacity-0">
              Finest Cardamom
            </h2>
          </div>
        </div>


        {/* Contact Form */}
        <div id="contact" className="contact py-20 px-6 bg-white text-center">
          <h2 className="text-3xl font-bold mb-6"> Contact Us</h2>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 text-left">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border rounded-lg px-3 py-2 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border rounded-lg px-3 py-2 w-full md:col-span-2"
            />
            <textarea
              placeholder="Your Message"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full md:col-span-2"
            ></textarea>
            <button type="submit" className="bg-blue-400 hover:bg-blue-500 text-black font-semibold py-2 rounded-lg md:col-span-2">
              Send Message
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-10 px-6" id="footer">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 footer-container">

            {/* About */}
            <div className="footer-about">
              <h2 className="text-2xl font-bold mb-4">Veda Global</h2>
              <p className="text-gray-400">
                Premium Indian Spices & Honey, Delivered Worldwide with Integrity.
              </p>
            </div>

            {/* Quick Links */}
            {/* Quick Links */}
            <div className="footer-links">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    🏠 Home
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="hover:text-blue-400"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    ℹ About
                  </a>
                </li> */}
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    🌿 Products
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="hover:text-blue-400"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("quality")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    ✅ Quality
                  </a>
                </li> */}
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    📩 Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      setQuoteOpen(true);

                    }}
                  >
                    💬 Get a Quote
                  </a>
                </li>
              </ul>
            </div>


            {/* Contact */}
            <div className="footer-contact">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400 flex items-center gap-2">
                <i className="ri-mail-line"></i> info@vedaglobal.com
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <i className="ri-phone-line"></i> +91 98765 43210
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <i className="ri-map-pin-line"></i> Mumbai, India
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-4 text-2xl social-icons">
                <a href="#" className="hover:text-blue-400"><i className="ri-facebook-fill"></i></a>
                <a href="#" className="hover:text-pink-400"><i className="ri-instagram-line"></i></a>
                <a href="#" className="hover:text-blue-600"><i className="ri-linkedin-box-fill"></i></a>
                <a href="#" className="hover:text-sky-400"><i className="ri-twitter-x-line"></i></a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom mt-10 border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-400">© 2025 Veda Global. All Rights Reserved.</p>
          </div>
        </footer>

      </div>

      {/* Quote Modal */}
      {quoteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-4xl shadow-lg w-full max-w-lg p-8 relative">
            <button
              onClick={() => setQuoteOpen(false)}
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
            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={quoteForm.name}
                  onChange={handleQuoteChange}
                  className="w-1/2 border rounded-lg px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={quoteForm.email}
                  onChange={handleQuoteChange}
                  className="w-1/2 border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Phone"
                  name="phone"
                  value={quoteForm.phone}
                  onChange={handleQuoteChange}
                  className="w-1/2 border rounded-lg px-3 py-2"
                />
                <select
                  name="country"
                  value={quoteForm.country}
                  onChange={handleQuoteChange}
                  className="w-1/2 border rounded-lg px-3 py-2">
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
                  name="company"
                  value={quoteForm.company}
                  onChange={handleQuoteChange}
                  className="w-1/2 border rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  name="quantity"
                  value={quoteForm.quantity}
                  onChange={handleQuoteChange}
                  className="w-1/2 border rounded-lg px-3 py-2"
                />
              </div>
              <textarea
                placeholder="Message"
                rows="3"
                name="message"
                value={quoteForm.message}
                onChange={handleQuoteChange}
                className="w-full border rounded-lg px-3 py-2"
              ></textarea>
              <button type="submit" className="w-full bg-blue-400 hover:bg-blue-500 text-black font-bold py-2 rounded-lg">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 relative w-80">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <ul className="space-y-4 text-lg font-medium">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  🏠 Home
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  ℹ️ About Us
                </a>
              </li> */}
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  🌿 Products
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    document.getElementById("quality")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  ✅ Quality Standards
                </a>
              </li> */}
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  📩 Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setQuoteOpen(true);

                  }}
                >
                  💬 Get a Quote
                </a>
              </li>
            </ul>

          </div>
        </div>
      )}
    </div>
  );
};

export default VedaGlobal;
