import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Search from '../components/Search';
import { logout } from '../utils/Auth';

function NavBar({ user, onSearch, onLogin, onLogout, onCityChange }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/cities')
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error('Error fetching cities:', error));
  }, []);

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    onCityChange(city);
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const handleViewBookings = () => {
    navigate('/my-bookings');// Navigate to the bookings page
  };

  return (
    <div>
      <div className='navbar flex flex-col lg:flex-row container mx-auto py-4 bg-red-500 rounded relative z-10'>
        <div className='mx-5 mb-2 lg:mb-0'>
          <a className='text-4xl font-bold border border-red-200 bg-white rounded px-2 py-1' href='/'>
            Cinema 🍿
          </a>
        </div>

        {/* City Dropdown */}
        <div className='mx-5'>
          <select
            className='bg-white text-red-500 border border-red-300 rounded px-3 py-1 text-sm font-semibold cursor-pointer'
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value='' disabled>
              Select a city
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex-grow lg:flex lg:justify-end items-center'>
          <Search onSearch={onSearch} />
        </div>

        <div className='flex flex-col lg:flex-row justify-center items-center mr-5'>
          <div className='lg:flex lg:justify-center min-[200px]:space-x-8 sm:space-x-8 lg:space-x-4'>
            {user ? (
              <>
                {/* My Bookings Button */}
                <button
                  className='bg-white text-red-500 hover:text-white hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold cursor-pointer h-9'
                  onClick={handleViewBookings}
                >
                  My Bookings
                </button>
                
                {/* Logout Button */}
                <button
                  className='bg-white text-red-500 hover:text-white hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold cursor-pointer h-9'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className='bg-white text-red-500 hover:text-white hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold cursor-pointer h-9'
                  onClick={() => setShowLoginForm(true)}
                >
                  Login
                </button>
                <button
                  className='bg-white text-red-500 hover:text-white hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold cursor-pointer h-9'
                  onClick={() => setShowRegistrationForm(true)}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {(showLoginForm || showRegistrationForm) && (
        <div className='fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg popup'>
            {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} onLogin={onLogin} />}
            {showRegistrationForm && <RegistrationForm onClose={() => setShowRegistrationForm(false)} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
