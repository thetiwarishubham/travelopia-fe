import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/FlightDetails.css';

const FlightDetails = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`);
        if (!response.ok) {
            throw new Error('Flight not found');
          }
        const data = await response.json();
        setFlight(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching flight details:', error);
        setError('Flight not found');
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div className="detail-container"><h2>{error}</h2></div>;
  }

  if (!flight) return <div>Loading...</div>;

  return (
    <div>
      <h2>Flight Details</h2>
      <div>
        <p><b>Flight Number:</b> {flight.flightNumber}</p>
        <p><b>Airline:</b> {flight.airline}</p>
        <p><b>Origin:</b> {flight.origin}</p>
        <p><b>Destination:</b> {flight.destination}</p>
        <p><b>Departure Time:</b> {new Date(flight.departureTime).toLocaleString()}</p>
        <p><b>Status:</b> {flight.status}</p>
      </div>
    </div>
  );
};

export default FlightDetails;
