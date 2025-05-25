import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-12 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-200 text-center mb-6 border-b border-zinc-700 pb-4">
          About Us
        </h1>

        {/* Description */}
        <p className="text-lg text-zinc-300 text-center max-w-3xl mx-auto mb-10">
          Welcome to <span className="text-blue-400 font-semibold">Booksy</span> — an online platform crafted for readers who crave great stories and knowledge. From bestsellers to hidden gems, we bring you a wide range of books across genres, making discovery easy and enjoyable.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-800 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold text-yellow-200 mb-2">Curated Selection</h2>
            <p className="text-zinc-400">
              We handpick books that matter — whether you're after inspiration, education, or entertainment, Booksy delivers titles worth your time.
            </p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold text-yellow-200 mb-2">Smooth Experience</h2>
            <p className="text-zinc-400">
              From browsing to checkout, our platform is built for simplicity and speed — so you can focus on what really matters: reading.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
  <p className="text-zinc-400 text-lg mb-4">
    Have a question, suggestion, or just want to say hello?
  </p>
  <Link
    to="/contact" // This should match the route path you've set in your React Router
    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
  >
    Contact Us
  </Link>
</div>
      </div>
    </div>
  );
};

export default AboutUs;
