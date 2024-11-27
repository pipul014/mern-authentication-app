import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedState = localStorage.getItem('isLoggedIn');
    return savedState === 'true';
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); 
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold ">
          <Link to="/" className="hover:text-blue-200 flex items-center">
            <House /> MY APP
          </Link>
        </div>
        <nav className="space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded-md">Login</Link>
              <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded-md">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded-md">Profile</Link>
              <button onClick={handleLogout} className="hover:bg-blue-700 px-3 py-2 rounded-md">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
