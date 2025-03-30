import React, { useEffect, useState } from 'react';
import MESSAGES from '../lang/en.js';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const STRINGS = MESSAGES.ADMIN;

const Admin = () => {
  const [endpointHistory, setEndpointHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEndpointHistory = async () => {
      try {
        const response = await axios.get(`${API}endpoint_history`, {
          withCredentials: true,
        });
        setEndpointHistory(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching endpoint history:", error);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEndpointHistory();
  }, []);

  return (
    <div className="container mt-4">
      <h1>{STRINGS.adminDash}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Count</th>
              <th>Path</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {endpointHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.count}</td>
                <td>{item.path}</td>
                <td>{item.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
