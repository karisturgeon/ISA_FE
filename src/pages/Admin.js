import React, { useEffect, useState } from 'react';
import MESSAGES from '../lang/en.js';
import axios from 'axios';
import Loading from '../components/Loading';

const API = process.env.REACT_APP_API_URL;
const STRINGS = MESSAGES.ADMIN;

const Admin = () => {
  const [endpointHistory, setEndpointHistory] = useState([]);
  const [totalHistory, setTotalHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [endpointRes, totalRes] = await Promise.all([
          axios.get(`${API}endpoint_history`, { withCredentials: true }),
          axios.get(`${API}total_endpoint_history`, { withCredentials: true })
        ]);

        setEndpointHistory(endpointRes.data);
        setTotalHistory(totalRes.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
      
        let status = error.response?.status || STRINGS.unknown;
        let message = error.response?.statusText || STRINGS.unknownError;

        setError(`Error ${status}: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container mt-4">
      <h1>{STRINGS.adminDash}</h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>

      ) : (
        <>
          <h3>{STRINGS.endpointUsage}</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{STRINGS.count}</th>
                <th>{STRINGS.path}</th>
                <th>{STRINGS.method}</th>
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

          <h3>{STRINGS.userUsage}</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{STRINGS.count}</th>
                <th>{STRINGS.email}</th>
              </tr>
            </thead>
            <tbody>
              {totalHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.count}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

    </div>
  );
};

export default Admin;
