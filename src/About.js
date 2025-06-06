import React, { useState } from 'react';
// About Component
const About = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
      <p className="text-gray-700 leading-relaxed">
        This is a simple demonstration of a React application using `react-router-dom` with `HashRouter` for navigation.
        The purpose is to showcase how different pages can be rendered based on the URL hash,
        and how Tailwind CSS can be used for styling to create a modern and responsive user interface.
        We believe in creating clean, maintainable, and user-friendly web experiences.
      </p>
      <p className="mt-4 text-gray-700 leading-relaxed">
        Feel free to explore the different pages and observe how the content changes without a full page reload.
        This approach is particularly useful for single-page applications (SPAs) where server-side routing isn't required
        or when deploying to static hosting environments.
      </p>
    </div>
  );
};

export default About;