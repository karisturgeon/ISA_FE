import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MESSAGES from '../lang/en.js';
import Loading from '../components/Loading';

import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const STRINGS = MESSAGES.INDEX;


const Index = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    navigate('/activities');
  }
  const [endpointHistory, setEndpointHistory] = useState([]);
  const [error, setError] = useState({ code: null, message: null });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEndpointHistory = async () => {
      try {
        const response = await axios.get(`${API}user_endpoint_history`, {
          withCredentials: true,
        });
        setEndpointHistory(response.data);
        setError({ code: null, message: null });

      } catch (error) {
        console.error("Error fetching endpoint history:", error);

        if (error.response) {
          setError({
            code: error.response.status,
            message: error.response.data?.message || 'An error occurred while loading data.'
          });
        } else {
          setError({
            code: '',
            message: 'Could not connect to the server. Please try again later.'
          });
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchEndpointHistory();
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
    <div className="card-body d-flex flex-column text-center justify-content-center align-content-center">
    {loading ? (
  <Loading/>
    ) :error.message ? (
    <div className="alert alert-danger">
      <strong>Error {error.code}:</strong> {error.message}
      <p className="mt-3">
        Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to continue.
      </p>
    </div>
  ) : (
    <>
      <p>{STRINGS.generate}</p>
      <button onClick={handleSubmit} className="btn btn-primary mb-4">
        {STRINGS.go}
      </button>

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
    </>
  )}
</div>
</div>

  )

}



export default Index;
