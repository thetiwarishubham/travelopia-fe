import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FlightTable.css';

const FlightTable = () => {
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://flight-status-mock.core.travelopia.cloud/flights');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setFlights(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching flight data:', error);
                setError('Error fetching data. Please try again later.');
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="table-container">
            <h2>Flight Table</h2>
            {error && <div className="error">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Airline</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Departure Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map(flight => (
                        <tr key={flight.id}>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.airline}</td>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td>{new Date(flight.departureTime).toLocaleString()}</td>
                            <td>{flight.status}</td>
                            <td>
                                <Link to={`/flight/${flight.id}`}>
                                    <button>View Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlightTable;
