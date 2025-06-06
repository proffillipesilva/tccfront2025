import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { myGetToken, onMessageListener } from './firebase';
import MyToast from './MyToast';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import EnterPage from './EnterPage';

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  myGetToken(setTokenFound);

  onMessageListener().then(payload => {
    console.log(payload)
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log({title: payload.notification.title, body: payload.notification.body});
  }).catch(err => console.log('failed: ', err));


  return (
    <div className="App">
      {show &&
      <MyToast key={"1"} notification={notification} duration={3000} onRemove={()=>{setShow(false)}} />
    }
       <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900 antialiased flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-600 to-red-800 p-4 shadow-md">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <div className="text-white text-2xl font-extrabold mb-4 sm:mb-0">
              My React App
            </div>
            <Link
                to="/enter"
                className="text-white hover:text-blue-200 transition duration-300 ease-in-out px-3 py-2 rounded-md font-medium text-lg"
              >
                Enter Page
              </Link>
            <div className="flex space-x-4 sm:space-x-6">
              <Link
                to="/"
                className="text-white hover:text-blue-200 transition duration-300 ease-in-out px-3 py-2 rounded-md font-medium text-lg"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-blue-200 transition duration-300 ease-in-out px-3 py-2 rounded-md font-medium text-lg"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-blue-200 transition duration-300 ease-in-out px-3 py-2 rounded-md font-medium text-lg"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enter" element={<EnterPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center text-sm">
          <div className="container mx-auto">
            © {new Date().getFullYear()} My React App. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
    </div>
  );
}

export default App;
