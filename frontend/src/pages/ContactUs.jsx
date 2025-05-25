import React from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-12 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-200 text-center mb-6 border-b border-zinc-700 pb-4">
          Contact Us
        </h1>

        <p className="text-zinc-300 text-center text-lg max-w-2xl mx-auto mb-10">
          We're here to help. If you have any questions, feedback, or need assistance, feel free to reach out to us. Our team typically responds within 24 hours.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-400 mb-2">
              <FaEnvelope /> Email
            </h2>
            <p className="text-zinc-400">support@booksy.com</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-400 mb-2">
              <FaPhoneAlt /> Phone
            </h2>
            <p className="text-zinc-400">+91 9591791704</p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl text-yellow-200 font-semibold mb-4 text-center">Send us a message</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
