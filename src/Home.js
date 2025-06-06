import React, { useState } from 'react';
// Home Component
const Home = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Home Page</h2>
      <p className="text-gray-600 mb-4">Welcome to the Home page! Here's some sample data in a table.</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Age</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">City</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-800">1</td>
              <td className="py-3 px-4 text-sm text-gray-800">Alice</td>
              <td className="py-3 px-4 text-sm text-gray-800">30</td>
              <td className="py-3 px-4 text-sm text-gray-800">New York</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-800">2</td>
              <td className="py-3 px-4 text-sm text-gray-800">Bob</td>
              <td className="py-3 px-4 text-sm text-gray-800">24</td>
              <td className="py-3 px-4 text-sm text-gray-800">Los Angeles</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-800">3</td>
              <td className="py-3 px-4 text-sm text-gray-800">Charlie</td>
              <td className="py-3 px-4 text-sm text-gray-800">35</td>
              <td className="py-3 px-4 text-sm text-gray-800">Chicago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home