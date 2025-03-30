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
        console.log("Fetching endpoint history...");

        const response = await axios.get(`${API}user_endpoint_history`, {
          withCredentials: true,
          timeout: 5000,
        });
        setEndpointHistory(response.data);
        setError({ code: null, message: null });

      } catch (error) {
        console.error("Error fetching endpoint history:", error);

        if (error.response) {
          setError({
            code: error.response.status,
            message: error.response.data?.message || STRINGS.loadingError
          });
        } else {
          setError({
            code: '',
            message: STRINGS.connectFail
          });
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchEndpointHistory();
  }, []); // the empty [] tell react to only run this effect once 

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
    <div className="card-body d-flex flex-column text-center justify-content-center align-content-center">
    {loading ? (
  <Loading/>
    ) :error.message ? (
    <div className="alert alert-danger">
      <strong>{STRINGS.error} {error.code}:</strong> {error.message}
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
    </>
  )}
</div>
</div>

  )

}



export default Index;
