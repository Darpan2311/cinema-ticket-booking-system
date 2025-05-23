import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { isLoggedIn, login, logout } from './utils/Auth';
import MyBookings from './pages/MyBookings';
function App() {
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const loggedInUser = isLoggedIn();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleSearch = (searchQuery) => {
    setSearchText(searchQuery);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    login(userData);
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar
          user={user}
          onSearch={handleSearch}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onCityChange={handleCityChange}
        />
        <Routes>
          <Route
            path='/'
            element={<Home searchText={searchText} user={user} selectedCity={selectedCity} />}
          />
           <Route path="/my-bookings" element={<MyBookings />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
