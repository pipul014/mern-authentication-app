import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold ">
          
          <Link to="/" className="hover:text-blue-200 flex items-center"><House/>MY APP</Link>
        </div>
        <nav className="space-x-4">
          {!isLoggedIn && (
            <>
              <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded-md">Login</Link>
              <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded-md">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

