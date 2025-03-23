import React, { useEffect, useState } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user')).userId;
  useEffect(() => {
    console.log(userId);
    if (userId) {
      console.log("----------");
      fetch(`http://localhost:8080/api/v1/order/${userId}`)
        .then((response) => {
          console.log("Response status:----------", response.status);
          return response.json();
        })
        .then((data) => {
          console.log("Bookings data:", data);
          setBookings(data);
        })
        .catch((error) => console.error('Error fetching bookings:-----------', error));
    }
  }, [userId]);

  const handleCancelBooking = (orderId) => {
    fetch(`http://localhost:8080/api/v1/order/${orderId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setBookings(bookings.filter((booking) => booking.orderId !== orderId));
          alert('Booking canceled successfully');
        } else {
          alert('Failed to cancel booking');
        }
      })
      .catch((error) => console.error('Error canceling booking:', error));
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-5">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-lg">
              <h3 className="text-xl font-semibold">{booking.movieTitle}</h3>
              <p><strong>Genre:</strong> {booking.movieGenres}</p>
              <p><strong>Language:</strong> {booking.movieLanguage}</p>
              <p><strong>Seats:</strong> {booking.seat ? booking.seat.join(', ') : 'N/A'}</p>
              <p><strong>Price:</strong> ₹{booking.moviePrice}</p>
              <p><strong>Date:</strong> {booking.orderDate}</p>
              {console.log(booking.orderId)}
              <button
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => handleCancelBooking(booking.orderId)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;