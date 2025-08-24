import React from "react";

const AboutCIT = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-maroon-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full bg-gray-900 rounded-2xl shadow-2xl p-8 mt-16 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-maroon-600 shadow-lg mb-6">
          <img
            src="/HeroAko.png"
            alt="CIT Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-maroon-600 text-center">College of Information Technology</h1>
        <h2 className="text-lg font-semibold mb-4 text-gray-200 text-center">Website Profile</h2>
        <p className="text-base mb-6 text-gray-300 text-center">
          Welcome to the official website of the College of Information Technology.<br />
          Discover our programs, events, campus life, and more, all designed with a modern, technology-inspired look.
        </p>
        <div className="w-full mb-6">
          <h3 className="text-xl font-semibold mb-2 text-maroon-600">Website Features</h3>
          <ul className="list-disc list-inside text-gray-300 pl-2">
            <li>Modern, responsive design</li>
            <li>Animated hero section with tech effects</li>
            <li>Quick access to admissions, programs, and campus life</li>
            <li>Blog and events for CIT students</li>
            <li>Easy navigation for desktop and mobile</li>
          </ul>
        </div>
        <div className="w-full mb-6">
          <h3 className="text-xl font-semibold mb-2 text-maroon-600">Contact & Feedback</h3>
          <p className="text-gray-300">
            For suggestions or inquiries, please contact the CIT department or use the feedback form on the site.
          </p>
        </div>
        <div className="text-center mt-6">
          <a href="/" className="bg-maroon-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-maroon-700 transition-colors shadow">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutCIT;
